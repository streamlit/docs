---
title: Widget updating for every second input using session state
slug: /knowledge-base/using-streamlit/widget-updating-session-state
---

# Widget updating for every second input using session state

## Overview

## Solution

When using [state](/library/api-reference/session-state) to update widgets or values in your script you need to use the actual key and value pair that you stored in state and NOT the variable that you assigned to your widget.

Let's see this in an example, say you want a user to press a button and that would reset a slider.

To have the slider's value update on the button press we need to use the call back function of the button, `on_click`.

```python
def plus_one():
    if st.session_state["slider"] < 10:
        st.session_state.slider += 1
    else:
        pass
    return

add_one = st.button("Add one to the slider", on_click=plus_one, key="add_one")

slide_val = st.slider("Pick a number", 0, 10, key="slider")
```

## Relevant resources

- [title](link to post)
