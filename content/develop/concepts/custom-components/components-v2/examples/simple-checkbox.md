---
title: "Component example: Simple checkbox"
slug: /develop/concepts/custom-components/components-v2/examples/simple-checkbox
description: A simple checkbox component that sends persistent state values to Python.
keywords: custom components v2, example, checkbox, state values, setStateValue, callbacks
---

# Component example: Simple checkbox

This is a simple checkbox that sends a state value to Python when toggled, demonstrating persistent state communication.

<Cloud name="doc-components-v2-simple-checkbox" height="200px" />

## Key concepts demonstrated

This component demonstrates the following concepts:

- Persistent state values sent from JavaScript with `setStateValue()`
- Callback functions with the `on_<state>_change` naming pattern
- Initializing a stateful component with the `data` and `default` parameters
- Using font from the app's theme
- Accessing state values from the component's return object

## Complete code

```python filename="streamlit_app.py"
import streamlit as st


def handle_checkbox_change():
    st.toast(f"Checkbox is now: {st.session_state.my_checkbox.checked}")


checkbox_component = st.components.v2.component(
    "simple_checkbox",
    html="""
    <label class="checkbox-container">
        <input type="checkbox" id="checkbox" />
        <span class="label-text">Enable feature</span>
    </label>
    """,
    css="""
    .checkbox-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-family: var(--st-font);
        color: var(--st-text-color);
        cursor: pointer;
    }
    input[type="checkbox"] {
        width: 1.25rem;
        height: 1.25rem;
        accent-color: var(--st-primary-color);
        cursor: pointer;
    }
    """,
    js="""
    export default function({ parentElement, data, setStateValue }) {
        const checkbox = parentElement.querySelector("#checkbox");

        // Initialize from data
        checkbox.checked = data?.checked ?? false;

        // Send state on change
        checkbox.addEventListener("change", () => {
            setStateValue("checked", checkbox.checked);
        });
    }
    """,
)

initial_state = True

result = checkbox_component(
    data={"checked": initial_state},
    default={"checked": initial_state},
    on_checked_change=handle_checkbox_change,
    key="my_checkbox",
)

st.write(f"Current state: {'Enabled' if result.checked else 'Disabled'}")
```

## How it works

### State values vs trigger values

This example uses `setStateValue()` instead of `setTriggerValue()`. State and trigger values have the following key differences:

- State values persist across reruns. Use state values for data that represents the current state of your component.
- Trigger values reset after each rerun. Use trigger values for one-time events like button clicks.

### The `default` parameter

The `default` parameter sets the initial value in Python without triggering a rerun:

```python
result = checkbox_component(
    data={"checked": initial_state},
    default={"checked": initial_state},  # Matches data
    on_checked_change=handle_checkbox_change,
)
```

To set a default value for a state value, you must also have an accompanying callback function, even if it's an empty one like `lambda: None`. The `on_checked_change` callback ensures that the `"checked"` attribute is available for the component and the `default` parameter sets its initial value in Python.

If you set a default value without an associated callback function, the mounting command will raise an error because it won't recognize the state name. Conversely, if you declare a callback function without a default value, the state will be `None` until the component calls `setStateValue()` from JavaScript.

### The `data` parameter

The JavaScript code reads `data.checked` to initialize the checkbox state on the frontend:

```javascript
checkbox.checked = data?.checked ?? false;
```

This is a common pattern for initializing component state: `default` initializes the state in Python and `data` is used to intialize the state on the frontend. Some components might not have more than one initial state, in which case you can use the `default` parameter alone.
