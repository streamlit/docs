---
title: Widget updating for every second input using session state
slug: /knowledge-base/using-streamlit/widget-updating-session-state
---

# Widget updating for every second input using session state

## Overview

You are using session state to store page interactions in your app. You expect that once the user presses a button, or interacts with a widget, your app will update and reflect the new values, but it doesn't. Instead, you have to click the button or interact with the widget twice to get the app to show the correct values.

## Solution

When using [state](/library/api-reference/session-state) to update widgets or values in your script you need to use the actual key and value pair that you stored in state and NOT the variable that you assigned to your widget.

Let's see this in an example, say you want a user to press a button and that would reset a slider.

To have the slider's value update on the button press we need to use the [callback function](/library/api-reference/session-state#use-callbacks-to-update-session-state) of the button, `on_click`.

```python
# the call back function for the button will add 1 to the
# slider value up to 10
def plus_one():
    if st.session_state["slider"] < 10:
        st.session_state.slider += 1
    else:
        pass
    return

# on calling the button, add the on_click parameter and pass
# the name of your callback function
add_one = st.button("Add one to the slider", on_click=plus_one, key="add_one")

# create the slider
slide_val = st.slider("Pick a number", 0, 10, key="slider")
```

## Relevant resources

- [Caching Sqlite DB connection resulting in glitchy rendering of the page](https://discuss.streamlit.io/t/caching-sqlite-db-connection-resulting-in-glitchy-rendering-of-the-page/19017)
- [Select all checkbox that is linked to selectbox of options](https://discuss.streamlit.io/t/select-all-checkbox-that-is-linked-to-selectbox-of-options/18521)
