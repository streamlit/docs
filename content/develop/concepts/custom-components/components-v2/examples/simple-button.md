---
title: "Component example: Simple button"
slug: /develop/concepts/custom-components/components-v2/examples/simple-button
description: An interactive button component that sends trigger values to Python when clicked.
keywords: custom components v2, example, button, trigger values, setTriggerValue, callbacks
---

# Component example: Simple button

This is an interactive button that sends events to Python. It demonstrates basic frontend-to-backend communication.

<Cloud name="doc-components-v2-simple-button" height="200px" />

## Key concepts demonstrated

This component demonstrates the following concepts:

- Component registration with HTML, CSS, and JavaScript
- One-time trigger values sent from JavaScript with `setTriggerValue()`
- Callback functions using the `on_<trigger>_change` naming pattern
- Accessing trigger values from the component's return object

## Complete code

```python filename="streamlit_app.py"
import streamlit as st

if "click_count" not in st.session_state:
    st.session_state.click_count = 0


def handle_button_click():
    st.session_state.click_count += 1


button_component = st.components.v2.component(
    "simple_button",
    html="""<button id="btn">Click me</button>""",
    css="""
    button {
      border: none;
      padding: .5rem;
      border-radius: var(--st-button-radius);
      background-color: var(--st-primary-color);
      color: white;
    }
    """,
    js="""
    export default function(component) {
      const { setTriggerValue, parentElement } = component;
        parentElement.querySelector("button").onclick = () => {
            setTriggerValue("action", "button_clicked");
        };
    }
    """,
)

result = button_component(on_action_change=handle_button_click)

if result.action:
    st.write(f"Button clicked! Total clicks: {st.session_state.click_count}")
```

## How it works

### Trigger values

When the button is clicked, `setTriggerValue("action", "button_clicked")` sends a one-time event to Python. The makes the component's `"action"` attribute return the string `"button_clicked"` in Python.

### Callback registration

The `on_action_change` parameter registers a callback that runs when the trigger fires. The callback name follows the pattern `on_<trigger_name>_change`. Always register a callback for trigger values, even an empty one like `lambda: None`. This ensures the result object always has an attribute for the trigger. In this example, if a callback isn't defined, `"action"` won't exist as a result attribute until the trigger fires. This can cause an `AttributeError` if you try to access it before the trigger fires.

In this example, the callback is used to increment the value of `st.session_state.click_count`. This is a simple way to track the number of times the button has been clicked. Alternatively, you could use a state value in your component to track the number of clicks. For an example of a component that uses a state value to track the number of clicks, see the [interactive counter](/develop/concepts/custom-components/components-v2/examples/interactive-counter) example.

### Accessing the trigger

The trigger value is accessible via `result.action`. Trigger values are transient, just like `st.button()` values. However, you can configure triggers to return different data types and values for different events. In this example, the `"action"` attribute returns the string `"button_clicked"` when the button is clicked and `None` otherwise. You can create complex components that return different values to indicate different user actions.
