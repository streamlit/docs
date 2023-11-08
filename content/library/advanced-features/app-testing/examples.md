---
title: App testing example
slug: /library/advanced-features/app-testing/examples
---

# App testing example

## Testing a login page

Let's consider a login page. In this example, `secrets.toml` is not present. We'll manually declare dummy secrets directly in our tests. We'll be using `hmac` to compare a user's password to the secret value as a security best practice.

### Project summary

#### Login page behavior

The specifications of this page we want to test are:

- Before a user interacts with the app:
  - Their status is "unverified."
  - A password prompt is displayed.
- If a user types an incorrect password:
  - Their status is "incorrect."
  - An error message is displayed.
  - The password attempt is cleared from the input.
- If a user types a correct password:
  - Their status is "verified."
  - A confirmation message is displayed.
  - A logout button is displayed (without a login prompt).
- If a logged-in user clicks the **Log out** button:
  - Their status is "unverified."
  - A password prompt is displayed.

#### Login page project structure

```none
myproject/
├── app.py
└── tests/
    └── test_app.py
```

#### Login page Python file

```python
"""app.py"""
import streamlit as st
import hmac

st.session_state.status = st.session_state.get("status", "unverified")
st.title("My login page")


def check_password():
    if hmac.compare_digest(st.session_state.password, st.secrets.password):
        st.session_state.status = "verified"
    else:
        st.session_state.status = "incorrect"
    st.session_state.password = ""

def login_prompt():
    st.text_input("Enter password:", key="password", on_change=check_password)
    if st.session_state.status == "incorrect":
        st.warning("Incorrect password. Please try again.")

def logout():
    st.session_state.status = "unverified"

def welcome():
    st.success("Login successful.")
    st.button("Log out", on_click=logout)


if st.session_state.status != "verified":
    login_prompt()
    st.stop()
welcome()
```

#### Login page test file

```python
from streamlit.testing.v1 import AppTest

def test_no_interaction():
    at = AppTest.from_file("app.py")
    at.secrets["password"] = "streamlit"
    at.run()
    assert at.session_state["status"] == "unverified"
    assert len(at.text_input) == 1
    assert len(at.warning) == 0
    assert len(at.success) == 0
    assert len(at.button) == 0
    assert at.text_input[0].value == ""

def test_incorrect_password():
    at = AppTest.from_file("app.py")
    at.secrets["password"] = "streamlit"
    at.run()
    at.text_input[0].input("balloon").run()
    assert at.session_state["status"] == "incorrect"
    assert len(at.text_input) == 1
    assert len(at.warning) == 1
    assert len(at.success) == 0
    assert len(at.button) == 0
    assert at.text_input[0].value == ""
    assert "Incorrect password" in at.warning[0].value

def test_correct_password():
    at = AppTest.from_file("app.py")
    at.secrets["password"] = "streamlit"
    at.run()
    at.text_input[0].input("streamlit").run()
    assert at.session_state["status"] == "verified"
    assert len(at.text_input) == 0
    assert len(at.warning) == 0
    assert len(at.success) == 1
    assert len(at.button) == 1
    assert "Login successful" in at.success[0].value
    assert at.button[0].label == "Log out"

def test_log_out():
    at = AppTest.from_file("app.py")
    at.secrets["password"] = "streamlit"
    at.session_state["status"] = "verified"
    at.run()
    at.button[0].click().run()
    assert at.session_state["status"] == "unverified"
    assert len(at.text_input) == 1
    assert len(at.warning) == 0
    assert len(at.success) == 0
    assert len(at.button) == 0
    assert at.text_input[0].value == ""
```
