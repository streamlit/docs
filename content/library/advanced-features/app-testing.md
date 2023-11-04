---
title: Getting started with app testing
slug: /library/advanced-features/app-testing
---

# Getting started with app testing

Streamlit app testing enables developers to build and run headless tests that execute their app code directly, simulate user input, and inspect rendered outputs for correctness.

The provided class, AppTest, simulates a running app and provides methods to set up, manipulate, and inspect the app contents via API instead of a browser UI. It can be used to write automated tests of an app in various scenarios. These can then be run using a tool like [pytest](https://docs.pytest.org/). A typical pattern is to build a suite of tests for an app to ensure consistent functionality as the app evolves. The tests run locally and/or in a CI environment like Github Actions.

## Using pytest

We'll use `pytest` for our examples since it is one of the most Python test frameworks. To get started, be sure to install `pytest` into your environment:

```bash
pip install pytest
```

`pytest` uses a naming convention for files to conveniently execute tests. When you write tests, name your test scripts of the form `test_<name>.py` or `<name>_test.py`. For example, `test_myapp.py` or `myapp_test.py`. When calling `pytest` in a directory, all files named accordingly will be executed to produce test results. You can place test files anywhere in your repository, but it is common to collect tests into a designated `tests/` folder. For other ways to structure and execute tests, check out [How to invoke pytest](https://docs.pytest.org/how-to/usage.html) in the `pytest` docs.

Consider the following example:

```none
myproject/
├── app.py
└── tests/
    └── test_app.py
```

```python
"""app.py"""
import streamlit as st

# Initialize st.session_state.beans
beans = st.session_state.get("beans", 0)

st.title("Bean counter :paw_prints:")

addend = st.number_input("Beans to add", 0, 10)
if st.button("Add"):
    st.session_state.beans += addend
st.write(f"Toe beans counted: {st.session_state.beans}")
```

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

The main app file, `app.py` contains four elements when rendered: `st.title`, `st.number_input`, `st.button`, and `st.markdown`. Notice that `st.write` is used in the app. `st.write` determines the element to use based on type of data it receives. In this instance, the string argument will result in a markdown element being produced.

The testing script contains a single testing function. It simulates running the app, clicking the plus icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>add</i>) to increment the number input, then clicking the "**Add**" button. At the end it checks if the correct message is displayed.

Within the test function `test_increment_and_add`, let's look broadly at what's happening and then go into detail later on:

```python
    # Initialize the simulated app and execute the first script run
    at = AppTest.from_file("app.py").run()

    # Simulate clicking the increment button and the resulting script rerun
    at.number_input[0].increment().run()

    # Simulate clicking the Add button and the resulting script rerun
    at.button[0].click().run()

    # Check for the expected message at the end of the app
    assert at.markdown[0].value == "Toe beans counted: 1"

```

Two things might immediately jump out at you. First, notice that each run is explicitly called with the `.run()` method. Whether it's the first run of the app or a rerun resulting from a widget interaction, a test script must explicitly run the app at each appropriate time. Second, notice that elements are grabbed by order they appear on the page. `at.button` returns a list of all the buttons on the page. `at.button[0]` is thus the first button on the page. In this example, we only have one of each element so the script grabs the first instance by index in each case. We'll see later how to grab widgets by key or how to grab a subset of elements within a particular container.

### Try it out

1. Copy the files above.
2. Open a terminal and change directory to your project folder.
   ```bash
   cd myproject
   ```
3. Execute `pytest`:
   ```bash
   pytest
   ```

By executing `pytest` at the root of your project folder, all files within your project with the test prefix or suffix (`test_<name>.py` or `<name>_test.py`) will be executed. Within each matching file, `pytest` uses a similar naming convention for functions; a function beginning or ending in `test_` or `_test`, respectively, is counted as one test. You can also direct `pytest` to a particular directory in your project folder. For example, from the root of your project folder, you can tell `pytest` to only scan through your `tests/` directory to identify and run tests:

```bash
pytest tests/
```

### Handling file paths and imports with pytest

Imports and paths should written relative to the directory where `pytest` is called. For convenience, call `pytest` from the root of your project folder so you can provide the path to each of your app files also from the root of your project folder.

To illustrate the difference, if you change directory into the `myproject/tests` folder and execute `pytest` there, then the path to `app.py` would become `../app.py` instead.

```bash
cd myproject/tests
pytest
```

```python
at = AppTest.from_file("../app.py").run()
```
