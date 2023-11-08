---
title: Introduction to Streamlit app testing
slug: /library/advanced-features/app-testing/app-testing-intro
---

# Introduction to Streamlit app testing

Now that you understand the basics of `pytest`, let's dive into using Streamlit's app testing framework. We'll cover:

- How to initialize and run a simulated app.
- How to retrieve elements.
- How to manipulate widgets.
- How to inspect elements.

On the next page, we'll cover more advanced scenarios like working with secrets, Session State, or multipage apps.

## How to initialize and run a simulated app

To test a Streamlit app, you must first initialize an instance of [`AppTest`](/library/api-reference/app-testing/st.testing.v1.apptest) with the code for one page of your app. There are three methods for initializing a simulated app. These are provided as class methods to `AppTest`. We will focus on `AppTest.from_file()` which allows you to provide a path to a page of your app. This is the most common scenario for building automated tests during app development. `AppTest.from_string()` and `AppTest.from_function()` may be useful for some simple or experimental scenarios.

### A simple app testing example

Let's continue with the example from our [Introduction to `pytest`](/library/advanced-features/app-testing/pytest-intro):

#### The project structure

```none
myproject/
├── app.py
└── tests/
    └── test_app.py
```

#### The app file

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

#### The test file

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

Look at the first line in our test function:

```python
at = AppTest.from_file("app.py").run()
```

This is doing two things and is equivalent to:

```python
# Initialize the app
at = AppTest.from_file("app.py")
# Run the app
at.run()
```

`AppTest.from_file()` returns an instance of `AppTest`, initialized with the contents of `app.py`. The `.run()` method is used to run the app for the first time. Looking at the test, notice that the `.run()` method manually executes each script run. Whether it's the first run of the app or a rerun resulting from a widget interaction, a test must explicitly run the app each time.

## How to retrieve elements

The attributes of the `AppTest` class return collections of elements. In the example, `at.number_input` returns a colleciton of all `st.number_input` elements in the app. Thus, `at.number_input[0]` is the first such element in the app. Similarly, `at.markdown` returns a collection of all `st.markdown` elements where `at.markdown[0]` is the first such element. You can also retrieve widgets by their key, if one is specified. Be sure to read the current list of supported elements in the "Attributes" section of the [`AppTest`](/library/api-reference/app-testing/st.testing.v1.apptest) class.

### Retrieve elements by index

Each attribute of `AppTest` returns a sequence of the associated element type. `at.button` returns a sequence of all buttons (both `st.button` and `st.form_submit_button`). `at.header` returns a sequence of all `st.header` elements. You can also use the `.get()` method and pass the name of the attribute. `at.get("button")` and `at.get("header")` are the equivalent examples, respectively.

The returned sequence of elements are ordered by appearance on the page. If containers are used to insert elements in a different order, these sequences may not match the order they are executed in your code. Consider the following example where containers are used switch the order of two buttons on the page:

```python
import streamlit as st

first = st.container()
second = st.container()

second.button("A")
first.button("B")
```

If the above app was tested, `at.button[0]` would correspond to the button labeled "B" and `at.button[1]` would correspond to the button labeled "A". These assertions would be true:

```python
assert at.button[0].label == "B"
assert at.button[1].label == "A"
```

### Retrieve widgets by key

You can retrieve keyed widgets by their keys instead of their order on the page. The key of the widget is passed as an argument to the property. Consider this app and the following (true) assertions:

```python
import streamlit as st

st.button("Next", key="submit")
st.button("Back", key="cancel")
```

```python
assert at.button(key="submit").label == "Next"
assert at.button("cancel").label = "Back"
```

### Retrieve containers

You can also narrow down your sequences of elements by retrieving specific containers. Each retrieved container has the same attributes as `AppTest`. For example, `at.sidebar.checkbox` returns a sequence of all checkboxes in the sidebar. `at.main.selectbox` returns the sequence of all selectboxes in the main body of the app (not in the sidebar).

For `AppTest.columns` and `AppTest.tabs`, a sequence of containers is returned. So `at.columns[0].button` would be the sequence of all buttons in the first column of the app.

## How to manipulate widgets

All widgets have a universal `.set_value()` method. Additionally, many widgets have specific methods for manipulating their value. The names of [Testing element classes](/library/api-reference/app-testing/testing-element-classes) closely match the names of the `AppTest` attributes. For example, look at the return type of [`AppTest.button`](/library/api-reference/app-testing/st.testing.v1.apptest#apptestbutton) to see the corresponding class of [`Button`](/library/api-reference/app-testing/testing-element-classes#sttestingv1element_treebutton). Aside from setting the value of a button with `set_value()`, you can also use `.click()`. Check out each testing class for its specific methods.

## How to inspect elements

All elements, including widgets, have a universal `.value` property. This returns the contents of the element. For widgets, this is same as the return value or value in Session State. Additionally, you can check many other details for widgets like labels or disabled status. Many parameters are available for inspection, but not all. Use linting software to see what is currently supported. Here's an example:

```python
import streamlit as st

st.selectbox("A", [1,2,3], None, help="Pick a number", placeholder="Pick me")
```

```python
assert at.selectbox[0].value == None
assert at.selectbox[0].label == "A"
assert at.selectbox[0].options == ["1","2","3"]
assert at.selectbox[0].index == None
assert at.selectbox[0].help == "Pick a number"
assert at.selectbox[0].placeholder == "Pick me"
assert at.selectbox[0].disabled == False
```

<Tip>

Note that the `options` for `st.selectbox` were declared as integers, but asserted as strings. As noted in the documentation for [`st.selectbox`](/library/api-reference/widgets/st.selectbox), options are cast internally to strings. If you ever find yourself getting unexpected results, be sure to check the documentation carefully for any notes about recasting types internally.

</Tip>
