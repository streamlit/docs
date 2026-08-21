---
title: Execution flow
slug: /develop/api-reference/execution-flow
description: Control your app’s execution flow with forms, fragments, dialogs, and more.
keywords: execution flow, control flow, forms, fragments, dialogs, rerun, stop, form_submit_button, experimental_rerun, modal
---

# Execution flow

## Change execution

By default, Streamlit apps execute the script entirely, but we allow some functionality to handle control flow in your applications.

<TileContainer>

<RefCard href="/develop/api-reference/execution-flow/st.dialog" size="full">

<Image pure alt="screenshot" src="/images/api/dialog.jpg" />

<h4>Modal dialog</h4>

Insert a modal dialog that can rerun independently from the rest of the script.

```python
@st.dialog("Sign up")
def email_form():
    name = st.text_input("Name")
    email = st.text_input("Email")
```

</RefCard>

<RefCard href="/develop/api-reference/execution-flow/st.fragment">

<h4>Fragments</h4>

Define a fragment to rerun independently from the rest of the script.

```python
@st.fragment(run_every="10s")
def fragment():
    df = get_data()
    st.line_chart(df)
```

</RefCard>

<RefCard href="/develop/api-reference/execution-flow/st.rerun">

<h4>Rerun script</h4>

Rerun the script immediately.

```python
st.rerun()
```

</RefCard>

<RefCard href="/develop/api-reference/execution-flow/st.stop">

<h4>Stop execution</h4>

Stops execution immediately.

```python
st.stop()
```

</RefCard>

</TileContainer>

## Group multiple widgets

By default, Streamlit reruns your script everytime a user interacts with your app.
However, sometimes it's a better user experience to wait until a group of related
widgets is filled before actually rerunning the script. That's what `st.form` is for!

<TileContainer>
<RefCard href="/develop/api-reference/execution-flow/st.form" size="half">

<h4>Forms</h4>

Create a form that batches elements together with a “Submit" button.

```python
with st.form(key='my_form'):
    name = st.text_input("Name")
    email = st.text_input("Email")
    st.form_submit_button("Sign up")
```

</RefCard>

<RefCard href="/develop/api-reference/execution-flow/st.form_submit_button" size="half">

<h4>Form submit button</h4>

Display a form submit button.

```python
with st.form(key='my_form'):
    name = st.text_input("Name")
    email = st.text_input("Email")
    st.form_submit_button("Sign up")
```

</RefCard>

</TileContainer>
