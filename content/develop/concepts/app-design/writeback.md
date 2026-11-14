---
title: Edit and write back data
slug: /develop/concepts/design/writeback
description: Build apps that act in Python with Streamlit. Collect edits with editable tables and forms, validate them, and write decisions back to your warehouse or database for review and approval queues, sign-offs, data-quality triage, and planning input.
keywords: writeback, write back, apps that act, editable table, data editor, st.data_editor, forms, approvals, approval workflow, review queue, sign-off, data quality, planning, input, crud, database writes, snowflake writeback, human in the loop
---

# Edit and write back data

Most dashboards are read-only. Apps that act let people make the decision in the same app as the data: review and approval queues, forecast sign-offs, data-quality triage, planning input, and approving what an AI agent proposes. In Streamlit, the table people edit, the validation rules, and the write to your database are the same Python script, so your data team can review the whole flow.

To see a complete example, try the [apps that act demo](https://apps-that-act-demo.streamlit.app/):

<Cloud name="apps-that-act-demo" height="640px" />

## The building blocks

- **Editable tables.** [`st.data_editor`](/develop/api-reference/data/st.data_editor) shows a dataframe that people can edit like a spreadsheet. Use [column configuration](/develop/api-reference/data/st.column_config) to choose which columns are editable, and to add dropdowns, checkboxes, and number or date pickers. With `num_rows="dynamic"`, people can add and delete rows.
- **Forms.** [`st.form`](/develop/api-reference/execution-flow/st.form) batches several inputs, so the app reruns only when people submit.
- **Validation.** Check edits in Python before you write them, and show what's wrong with [`st.error`](/develop/api-reference/status/st.error). For faster feedback, [`st.text_input`](/develop/api-reference/widgets/st.text_input) also validates in the browser with its `validate` parameter, but browser-side checks don't replace checks in Python.
- **Confirmation.** Use [`st.dialog`](/develop/api-reference/execution-flow/st.dialog) to confirm a change before it's saved, and [`st.toast`](/develop/api-reference/status/st.toast) to confirm it afterward.
- **Writes.** Use [`st.connection`](/develop/api-reference/connections/st.connection) to write to Snowflake or any SQL database. Data access runs on the server, so credentials never reach the browser.
- **Identity.** With [`st.login`](/develop/api-reference/user/st.login), [`st.user`](/develop/api-reference/user/st.user) tells you who approved what, so you can record it with each change.

## Example: a review queue

This app shows flagged payments that don't have a decision yet, lets a signed-in reviewer approve or reject each one, and writes the decisions back to the database in one transaction:

```python
import streamlit as st
from sqlalchemy import text

if not st.user.is_logged_in:
    st.button("Log in to review", on_click=st.login)
    st.stop()

conn = st.connection("sql")

flagged = conn.query(
    """
    SELECT id, account, amount, reason FROM flagged_payments
    WHERE id NOT IN (SELECT payment_id FROM decisions)
    """,
    ttl=0,
    index_col="id",
)
flagged["decision"] = "Pending"

edited = st.data_editor(
    flagged,
    disabled=["account", "amount", "reason"],
    column_config={
        "decision": st.column_config.SelectboxColumn(
            "Decision", options=["Pending", "Approve", "Reject"], required=True
        ),
    },
    key="review",
)

decided = edited[edited["decision"] != "Pending"]

if st.button("Save decisions", type="primary", disabled=decided.empty):
    with conn.session as session:
        for row in decided.itertuples():
            session.execute(
                text(
                    "INSERT INTO decisions (payment_id, decision, reviewer) "
                    "VALUES (:id, :decision, :reviewer)"
                ),
                {"id": row.Index, "decision": row.decision, "reviewer": st.user.email},
            )
        session.commit()
    st.toast(f"Saved {len(decided)} decisions.")
    st.rerun()
```

The query leaves out payments that already have a decision, so saved rows drop out of the queue, and `st.rerun()` shows the shorter queue right away. The table is indexed by payment ID, so pending edits don't carry over to different rows. Requiring sign-in means every decision records who made it.

## Review what agents propose

Apps that act are a natural place for people to stay in control of AI. Let an agent or model draft the decisions, such as suggested categories, forecast adjustments, or data-quality fixes, and show them in an editable table. A person reviews, corrects, and approves them, and only approved changes are written back.

When the [agent API](/develop/concepts/ai-agents/agent-access) is on, an AI agent can also fill in the app's forms and widgets and leave the final approval to a person. Agents can't edit `st.data_editor` tables yet, and browser-side checks such as `required` and `validate` don't run for them, so validate in Python everything an agent can submit.

## Test the flow

Writes are worth testing. With [`AppTest`](/develop/concepts/app-testing), you can set an `st.data_editor`'s edits through `at.session_state`, click the save button, and check what your app wrote, without a browser. Point the app at a test database or mock the connection in your tests.
