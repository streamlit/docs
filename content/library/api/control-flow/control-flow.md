---
title: Control flow
slug: /library/api-reference/control-flow
---

# Control flow

## Stop execution

By default, Streamlit apps execute the script entirely, but we allow some functionality to handle control flow in your applications.

<TileContainer>
<RefCard href="/library/api-reference/control-flow/st.stop">

#### Stop execution

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
<RefCard href="/library/api-reference/control-flow/st.form">

#### Forms

Create a form that batches elements together with a “Submit” button.

```python
with st.form(key="my_form):
    username = st.text_input("Username")
    password = st.text_input("Password")
    st.form_submit_button("Login")
```

</RefCard>

<RefCard href="/library/api-reference/control-flow/st.form_submit_button">

#### Form submit button

Display a form submit button.

```python
with st.form(key="my_form"):
    username = st.text_input("Username")
    password = st.text_input("Password")
    st.form_submit_button("Login")
```

</RefCard>

</TileContainer>
