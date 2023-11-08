---
title: Beyond the basics of app testing
slug: /library/advanced-features/app-testing/beyond-the-basics
---

# Beyond the basics of app testing

Now that you're comfortable with executing a basic test for a Streamlit app, let's cover the mutable attributes of [`AppTest`](/library/api-reference/app-testing/st.testing.v1.apptest):

- `AppTest.secrets`
- `AppTest.session_state`
- `AppTest.query_params`

For all three attributes, you can read and update values using dict-like syntax. You can use key notation but not attribute notation. For example, the `.secrets` attribute for `AppTest` accepts `at.secrets["my_key"]` but **_not_** `at.secrets.my_key`. This is differnt from how you can use the associated commands in the main library.

For these attributes, the typical pattern is to declare any values before executing the first run of the app. Values can be inspected at any time in a test. There are a few extra considerations for secrets and Session State which we'll cover now.

## Using secrets with app testing

Be careful not to include secrets directly in your tests. Recall this basic scenario from [Introduction to `pytest`](/library/advanced-features/app-testing/pytest-intro):

```none
myproject/
├── .streamlit/
│   ├── config.toml
│   └── secrets.toml
├── app.py
└── tests/
    └── test_app.py
```

```bash
cd myproject
pytest tests/
```

In the above scenario, your simulated app will have access to your `secrets.toml` file. However, since you don't want to commit your secrets to your repository, you may need to write tests where you securely pull your secrets into memory or use dummy secrets.

### Example: declaring secrets in a test

Within a test, declare each secret after initializing your `AppTest` instance but before the first run. (A missing secret may result in an app that doesn't run!) For example, consider the following secrets file and corresponding test initialization to manually assign the same secrets:

#### Secrets file

```toml
db_username = "Jane"
db_password = "mypassword"

[my_other_secrets]
things_i_like = ["Streamlit", "Python"]
```

#### Test file

```python
# Initialize an AppTest instance.
at = AppTest.from_file("app.py")
# Declare the secrets.
at.secrets["db_username"] = "Jane"
at.secrets["db_password"] = "mypassword"
at.secrets["my_other_secrets.things_i_like"] = ["Streamlit", "Python"]
# Run the app.
at.run()
```

Generally, you don't want to type your secrets directly into your test. You should instead use an API to pass them securely and anonymously if you need to use them in your test. If you are automating your tests with GitHub actions, check out their [Security guide](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions). Alternatively, you can manually declare dummy secrets in your tests.

## Working with Session State in app testing

Just like with secrets, the `.session_state` attribute for `AppTest` let's you read and update Session State values using key notation (`at.session_state["my_key"]`), but not attribute notation (`at.session_state.my_key`). By manually declaring values in Session State, you can directly jump to a specific state instead of simulating many steps to get there. Additionally, the testing framework does not provide native support for multipage apps. An instance of `AppTest` can only test one page. You need to manually declare Session State values if you want to simulate a user having data from another page.

### Example: testing a multipage app

Consider a simple multipage app where the first page can be used to modify a value in Session State. To test the second page, set Session State manually then run the simulated app within the test:

#### Project structure

```none
myproject/
├── pages/
│   └── second.py
├── first.py
└── tests/
    └── test_second.py
```

#### First app page

```python
"""first.py"""
import streamlit as st

st.session_state.magic_word = st.session_state.get("magic_word", "Streamlit")

new_word = st.text_input("Magic word:")

if st.button("Set the magic word"):
    st.session_state.magic_word = new_word
```

#### Second app page

```python
"""second.py"""
import streamlit as st

st.session_state.magic_word = st.session_state.get("magic_word", "Streamlit")

if st.session_state.magic_word == "Balloons":
    st.markdown(":balloon:")
```

#### Test file

```python
"""test_second.py"""
from streamlit.testing.v1 import AppTest

def test_balloons():
    at = AppTest.from_file("pages/second.py")
    at.session_state["magic_word"] = "Balloons"
    at.run()
    assert at.markdown[0].value == ":balloon:"
```

By setting the value `at.session_state["magic_word"] = "Balloons"` within the test, you can simulate a user navigating to `second.py` after entering and saving "Balloons" on `first.py`.
