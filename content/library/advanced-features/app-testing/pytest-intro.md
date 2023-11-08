---
title: Introduction to pytest
slug: /library/advanced-features/app-testing/pytest-intro
---

# Introduction to pytest

We'll use `pytest` for our examples since it is one of the most common Python test frameworks. This is a quick introduction to `pytest`. Using a simple Streamlit app and a simple test, this guide explains how to execute a test locally. For a more complete introduction to `pytest`, check out Real Python's guide to [Effective Python testing with pytest](https://realpython.com/pytest-python-testing/).

## How `pytest` is structured

`pytest` uses a naming convention for files and functions to conveniently execute tests. Name your test scripts of the form `test_<name>.py` or `<name>_test.py`. For example, `test_myapp.py` or `myapp_test.py`. Within your test scripts, each test is written as a funtion, also named to begin or end with `test`. For our examples, we will prefix all our test scripts and test functions with `test_`.

You can write as many tests (functions) within a single test script as you want. When calling `pytest` in a directory, all `test_<name>.py` files within it will be used for testing. This includes files within subdirectories. Each `test_<something>` function within those files will be executed as a test. You can place test files anywhere in your project directory, but it is common to collect tests into a designated `tests/` directory. For other ways to structure and execute tests, check out [How to invoke pytest](https://docs.pytest.org/how-to/usage.html) in the `pytest` docs.

### A simple pytest example

Consider the following project:

#### Project structure

```none
myproject/
├── app.py
└── tests/
    └── test_app.py
```

#### App file

```python
"""app.py"""
import streamlit as st

# Initialize st.session_state.beans
beans = st.session_state.get("beans", 0)

st.title("Bean counter :paw_prints:")

addend = st.number_input("Beans to add", 0, 10)
if st.button("Add"):
    st.session_state.beans += addend
st.markdown(f"Toe beans counted: {st.session_state.beans}")
```

#### Test file

```python
"""test_app.py"""
from streamlit.testing.v1 import AppTest

def test_increment_and_add():
    """A user increments the number input, then clicks Add"""
    at = AppTest.from_file("app.py").run()
    at.number_input[0].increment().run()
    at.button[0].click().run()
    assert at.markdown[0].value == "Toe beans counted: 1"
```

The main app file (`app.py`) contains four elements when rendered: `st.title`, `st.number_input`, `st.button`, and `st.markdown`. The test script (`test_app.py`) contains a single test (the function named `test_increment_and_add`). We'll cover how tests are written in more detail on the next page, but here's a brief explanation of what this test does:

1. Initialize the simulated app and execute the first script run.
   ```python
   at = AppTest.from_file("app.py").run()
   ```
2. Simulate a user clicking the plus icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>add</i>) to increment the number input (and the resulting script rerun).
   ```python
   at.number_input[0].increment().run()
   ```
3. Simulate a user clicking the "**Add**" button (and the resulting script rerun).
   ```python
   at.button[0].click().run()
   ```
4. Check if the correct message is displayed at the end.
   ```python
   assert at.markdown[0].value == "Toe beans counted: 1"
   ```

Assertions are the heart of tests. When the assertion is true, the test passes. Whne the assertion is false, the test fails. A test can have multiple assertions, but it is a good practice to keep tests tightly focused to simplify responding to failure.

## Try out a simple test with `pytest`

1. Install `pytest` into your Streamlit development environment:
   ```bash
   pip install pytest
   ```
2. Copy the files above into a new "myproject" directory.
3. Open a terminal and change directory to your project.
   ```bash
   cd myproject
   ```
4. Execute `pytest`:
   ```bash
   pytest
   ```

The test should execute successfully and your terminal should show something like this:

![A successfully completed test using pytest](/images/app-testing-pytest-intro.png)

By executing `pytest` at the root of your project directory, all Python files with the test prefix (`test_<name>.py`) will be scanned for test functions. Within each test file, each function with the test prefix will be executed as a test. You can also direct `pytest` to only scan your testing directory. For example, from the root of your project directory, execute:

```bash
pytest tests/
```

## Handling file paths and imports with `pytest`

Imports and paths within a test script should be relative to the directory where `pytest` is called. That is why the test function uses the path `app.py` instead of `../app.py` even though the app file is one directory up from the test script. In most cases, you'll call `pytest` from the directory containing your main app file. This is typically the root of your project directory.

Additionally, if `.streamlit/` is present in the directory where you call `pytest`, any `config.toml` and/or `secrets.toml` within it will be accessible to your simulated app.

### Basic scenario

In this commmon setup, your simulated app will have access to the `config.toml` and `secrets.toml` files if present.

```none
myproject/
├── .streamlit/
│   ├── config.toml
│   └── secrets.toml
├── app.py
└── tests/
    └── test_app.py
```

Within `test_app.py`:

```python
# Path to app file is relative the myproject/
at = AppTest.from_file("app.py").run()
```

```bash
cd myproject
pytest tests/
```
