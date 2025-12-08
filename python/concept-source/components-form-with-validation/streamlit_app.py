import streamlit as st
from my_component import HTML, CSS, JS

form_component = st.components.v2.component(
    "contact_form",
    html=HTML,
    css=CSS,
    js=JS,
)


# Handle form actions
def handle_form_action():
    # Process submission
    # if submission_failed:
    #     submission = st.session_state.message_form.submit
    #     st.session_state.message_form.draft=submission
    pass


# Use the component
form_state = st.session_state.get("message_form", {})
result = form_component(
    data={"draft": form_state.get("draft", {})},
    default={"draft": form_state.get("draft", {})},
    on_draft_change=lambda: None,
    on_submit_change=handle_form_action,
    key="message_form",
)

if result.submit:
    st.write("Message Submitted:")
    result.submit
else:
    st.write("Current Draft:")
    result.draft
