---
title: Bidirectional communication
slug: /develop/concepts/custom-components/components-v2/communicate
description: Learn how to exchange data between your custom v2 component and Python, including sending data to the frontend and receiving user interactions.
keywords: custom components v2, bidirectional communication, data exchange, setStateValue, setTriggerValue, callbacks, data parameter
---

# Bidirectional communication

Custom components v2 supports full bidirectional communication between your Python backend and JavaScript frontend. This enables you to:

- Send data from Python to your component via the `data` parameter
- Receive user actions in Python from your component's state and trigger values
- Create feedback loops where Python updates the component programmatically

The basic concepts of component communication are introduced in the [Component mounting](/develop/concepts/custom-components/components-v2/mount) guide. After you understand the basics, read this guide to learn how to create feedback loops where Python updates the component programmatically.

<Note>

This guide explains how to recreate behavior that's similar to native Streamlit widgets: setting a component's state from Session State. In general, you don't need to pass a component's state back into itself. This is just one pattern to manage a component's state through Session State.

However, because components can have multiple states and triggers, you must work with `st.session_state.<key>.<state>` for custom components instead of simply `st.session_state.<key>` like you do with native Streamlit widgets.

</Note>

## Prerequisites

Before you read this guide, you should understand the following concepts:

- [Component mounting](/develop/concepts/custom-components/components-v2/mount)
- [State vs trigger values](/develop/concepts/custom-components/components-v2/state-and-triggers)
- [Widget behavior](/develop/concepts/architecture/widget-behavior)

## The communication cycle

Custom components communicate through a cycle:

1. **Python → JavaScript**: Python sends data to your component via the `data` parameter.
2. **User interaction**: The user interacts with your component in the browser.
3. **JavaScript → Python**: Your component sends the result back via `setStateValue()` or `setTriggerValue()`.
4. **Python updates**: All related callback functions are executed and the component's result is updated in a script rerun.

For native Streamlit widgets, you can assign a key and set a widget's state through Session State. However, custom components don't automatically pass information from Session State to their associated component. To programmatically update a component from Python, you need to pass new data to the component's `data` parameter. If you want to set your component's state from Session State, you must pass the component's Session State values to the component's `data` parameter.

## Creating a feedback loop

Here's a text input component that demonstrates this pattern. This is the [text input](/develop/concepts/custom-components/components-v2/examples/text-input) component shown in the quickstart guide.

<Cloud name="doc-components-v2-text-input" height="300px" />

### The JavaScript side

Your component's JavaScript function must read `data` to initialize and update its state:

```javascript
export default function (component) {
  const { setStateValue, parentElement, data } = component;

  const label = parentElement.querySelector("label");
  label.innerText = data.label;

  const input = parentElement.querySelector("input");
  // Sync input value with data from Python
  if (input.value !== data.value) {
    input.value = data.value ?? "";
  }

  input.onkeydown = (e) => {
    if (e.key === "Enter") {
      setStateValue("value", e.target.value);
    }
  };

  input.onblur = (e) => {
    setStateValue("value", e.target.value);
  };
}
```

The conditional expression (`if (input.value !== data.value)`) updates the input field when Python sends new data. Because the Python code (in the next section) sets the state value using the `default` parameter, the component doesn't need to use `setStateValue()` here.

### The Python side

In Python, you can create a wrapper function that reads from Session State and passes updated data:

```python
def textbox_component_wrapper(
    label, *, default="", key=None, on_change=lambda: None
):
    # Read current state from Session State
    if key is not None:
        component_state = st.session_state.get(key, {})
        value = component_state.get("value", default)
    else:
        value = default

    # Pass current value back to component
    data = {"label": label, "value": value}
    result = textbox_component(
        data=data,
        default={"value": value},
        key=key,
        on_value_change=on_change,
    )
    return result
```

To create a clean mounting command, the wrapper lets you declare the component's label, initial value, key, and callback function. Within the
wrapper, when a key is provided, use the `get()` method on `st.session_state` to read the current component state. This prevents an error on the first script run, before the component is mounted.

The `get()` method is used twice. First, get the component state from its key. Component states are dictionaries of state and trigger values. In this case, the component has a single state named `"value"`. Then, from the component state, get the value of the the `"value"` state. If the `"value"` state isn't defined or no key is provided, use the provided default value.

Finally, within the wrapper, call the raw mounting command, passing in the current data. You can directly pass through the `key` and `on_change` values. However, `data` and `default` are constructed from the previous logic that uses the existing component state.

### Programmatic updates

With this pattern, you can update the component from Python by modifying Session State:

```python
if st.button("Set greeting"):
    st.session_state["my_textbox"]["value"] = "Hello World"

if st.button("Clear"):
    st.session_state["my_textbox"]["value"] = ""

result = textbox_component_wrapper("Enter text", key="my_textbox")
```

When you click a button, it modifies Session State. On the rerun, the wrapper reads the new value from Session State and passes it to the component via `data`. The JavaScript sees the updated `data.value` and updates the input field.

## Complete example

See the [Text input component example](/develop/concepts/custom-components/components-v2/examples/text-input) for the full working code.

## Key takeaways

1. **`data` is one-way**: Python sends data to JavaScript, but changes in JavaScript don't automatically update Python.
2. **State values bridge the gap**: Use `setStateValue()` to send user interactions back to Python.
3. **Session State enables control**: Store component state with a `key`, then read from Session State to update `data`.
4. **Sync carefully**: Check if the value has changed before updating DOM elements to avoid interfering with user input.
