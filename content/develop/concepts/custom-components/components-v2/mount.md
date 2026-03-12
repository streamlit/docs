---
title: Component mounting
slug: /develop/concepts/custom-components/components-v2/mount
description: Learn how to mount custom v2 components in your Streamlit app, pass data, handle callbacks, and access component values.
keywords: custom components v2, component mounting, ComponentRenderer, key, data, default, callbacks, component values
---

# Component mounting

After registering your component, you must mount your component in your Streamlit app. This creates a specific instance of the component and is equivalent to calling a native Streamlit command like `st.button()` or `st.text_input()`. This is where you pass data to the component and handle its output.

## Basic examples

### Hello world

This is the [hello world](/develop/concepts/custom-components/components-v2/examples/hello-world) component shown in the quickstart guide. It's a static component that displays "Hello, World!" using the app's theme colors.

```python
import streamlit as st

hello_component = st.components.v2.component(
    name="hello_world",
    html="<h2>Hello, World!</h2>",
    css="h2 { color: var(--st-primary-color); }",
)

hello_component() # Mount the component
hello_component(key="second_instance") # Mount another instance of the component
```

### Simple button

This is the [simple button](/develop/concepts/custom-components/components-v2/examples/simple-button) component shown in the quickstart guide. It's an interactive button that sends a trigger value to Python when clicked.

```python
import streamlit as st

button_component = st.components.v2.component(
    name="simple_button",
    html="""<button id="btn">Click me</button>""",
    css="button { background: var(--st-primary-color); color: white; }",
    js="""
    export default function(component) {
        const { setTriggerValue, parentElement } = component;
        parentElement.querySelector("button").onclick = () => {
            setTriggerValue("action", "button_clicked");
        };
    }
    """
)

result = button_component(on_action_change=lambda: None)
```

### Simple checkbox

This is the [simple checkbox](/develop/concepts/custom-components/components-v2/examples/simple-checkbox) component shown in the quickstart guide. It's a simple checkbox that reports a stateful value to Python when toggled.

```python
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

## Mounting parameters

All mounting parameters are keyword-only and optional. The available parameters are documented in the [`ComponentRenderer`](/develop/api-reference/custom-components/st.components.v2.types.componentrenderer) class.

### Component identity (`key`)

Components use the Python `key` parameter in the same manner as widgets. For a detailed overview of keys in widgets, see [Understanding widget behavior](/develop/concepts/architecture/widget-behavior#keys-help-distinguish-widgets-and-access-their-values).

Just like widgets, components have internally computed identities that help Streamlit match component mounting commands to their frontend instances.

- If you pass a key when you mount your component, Streamlit will update the existing frontend element when other parameters change.
- If you don't pass a key when you mount your component, Streamlit will create a new frontend element when other parameters change. This will reset the component's state.

Additionally, you must use keys to disambiguate between otherwise identical instances of the same component.

```python
# Multiple instances of the same component
result1 = my_component(key="first_instance")
result2 = my_component(key="second_instance")
```

In the hello world example, two instances of the same component are mounted. Because there is no other data passed to the instances, for Streamlit to compute unique identities, at least one of the instances must be given a key:

```python
hello_component() # Mount the component
hello_component(key="second_instance") # Mount another instance of the component
```

If you remove the key from the second instance, you would get a `StreamlitDuplicateElementID` error. This is the component's equivalent to a `DuplicateWidgetID` error.

<Note>

The `key` property available in JavaScript in the `FrontendRendererArgs` type isn't the same as the Python `key` parameter. On the frontend, the JavaScript `key` is a dynamically generated identifier that is only usable for a specific instance of the component. For example, the JavaScript `key` will change if you mount a component, navigate away from the page, and then navigate back to remount it.

</Note>

### State and trigger callbacks (`on_<trigger>_change` or `on_<state>_change`)

For each state and trigger value for your component, you must pass a callback function to the component mounting command. For example, if you have a trigger named `"click"`, then you must pass a callback function to the keyword argument `on_click_change`.

```python
result = my_component(on_action_change=lambda: None)
```

In general, to create a callback's keyword argument name, prefix your state or trigger name with `on_` and then suffix it with `_change`. If you don't need to execute any Python logic in a callback, you can pass `lambda: None` as the callback function.

Component callback functions work similarly to [widget callback functions](/develop/concepts/architecture/widget-behavior#order-of-operations). For components, `setStateValue()` and `setTriggerValue()` start the Python rerun process from the component's JavaScript code. However, there are two important distinctions compared to widget callback functions:

- Because components can have multiple states and triggers, a single component instance can have multiple callbacks and also execute multiple callbacks in one script rerun. This is explained in more detail on the next page, [Bidirectional communication](/develop/concepts/custom-components/components-v2/communicate).
- Component callback functions play an important role in shaping the component's result, which is accessed through the component's return value and Session State.

By passing a callback function for each of your component's state and trigger values, you ensure that all of your component's state and trigger values are consistently available in the component's result object:

- In the simple button example, the callback is set with `on_action_change=lambda: None`. Because the callback is defined, even trivially, the result returned by the component will always have an `action` attribute. This attribute has a value of `None` until the button is clicked.
- In the simple checkbox example, the callback is set with `on_checked_change=handle_checkbox_change`. Because the callback is defined, the result returned by the component will always have a `checked` attribute. The default value is configured with the `default` parameter and is `True`. Additionally, `handle_checkbox_change` executes custom logic each time the checkbox is toggled.

<Note>

The `None` default value for triggers isn't related to using `lambda: None` as the callback function. A trigger always has a default value of `None`, regardless of what callback function it has.

</Note>

### Customizing and updating an instance (`data` and `default`)

In a component mounting command, there are two parameters that you can use to customize and update a component instance: `data` and `default`.

The `data` parameter passes information from Python to your component's frontend. It supports JSON-serializable, Arrow-serializable, and raw bytes data. Commonly this is a single value or a dictionary of values that you retrieve in your JavaScript function.

```python
result = my_component(
    data={
        "df": df,                           # Arrow-serializable dataframe
        "user_info": {"name": "Alice"},     # JSON-serializable data
        "image_base64": img_base64          # Image as base64 string
    }
)
```

DataFrames are automatically serialized using Apache Arrow format, which provides efficient transfer and preserves data types. On the frontend, you can work with the Arrow data directly or convert it to other formats as needed.

The `default` parameter sets the initial values for your component's state _in Python_. This is a dictionary where each key is a state name. Each state name has an accompanying callback function passed as a keyword argument named `on_<state>_change`. Because `default` only sets the initial value in Python, you must appropriately pass data to the component's `data` parameter to ensure that the component is consistent with its intended initial state.

#### Initialize component state

In general, the `default` parameter is used to avoid a rerun of the script when the component is mounted. Otherwise, your component might need to immediately call `setStateValue()` when it's mounted to inform Python of its initial state. Unnecessary reruns are inefficient and might increase the chance of visual flickering.

The simple checkbox example demonstrates how to use the `default` parameter to avoid a rerun of the script when the component is mounted. An initial value of `True` is set for the `"checked"` state:

```python
initial_state = True

result = checkbox_component(
    data={"checked": initial_state},
    default={"checked": initial_state},
    on_checked_change=handle_checkbox_change,
    key="my_checkbox",
)
```

In the component's JavaScript function, the initial DOM state is set from the `"checked"` key in the `data` parameter:

```javascript
export default function ({ parentElement, data, setStateValue }) {
  const checkbox = parentElement.querySelector("#checkbox");

  // Initialize from data
  checkbox.checked = data?.checked ?? false;

  // Send state on change
  checkbox.addEventListener("change", () => {
    setStateValue("checked", checkbox.checked);
  });
}
```

In the previous example, if you remove `default={"checked": initial_state},` from the Python code, then the initial state of the `"checked"` key would be `None`, which would be out of sync with the frontend until the first user interaction. In this case, you would have to add `setStateValue("checked", data?.checked ?? false);` to the JavaScript code to ensure that the initial state is set correctly.

```diff
export default function({ parentElement, data, setStateValue }) {
    const checkbox = parentElement.querySelector("#checkbox");

    // Initialize from data
    checkbox.checked = data?.checked ?? false;
+   setStateValue("checked", data?.checked ?? false);

    // Send state on change
    checkbox.addEventListener("change", () => {
        setStateValue("checked", checkbox.checked);
    });
}
```

This causes an unnecessary rerun of the script when the component is mounted, which is why it's recommended to use the `default` parameter instead.

### Layout control (`width` and `height`)

To make your component compatible with the Streamlit layout system, you can pass `width` and `height` parameters to your component mounting command. These parameters match the same width and height parameters used in other Streamlit commands. Streamlit wraps your component in a `<div>` element and updates its `width` and `height` properties so that it behaves like other Streamlit elements.

```python
result = my_component(
    width="stretch",    # Full width
    height=400          # Fixed height
)
```

On the frontend, because Streamlit will size the `<div>` wrapper element correctly, it's generally recommended to set your component's CSS to `width: 100%; height: 100%`. If your component needs to know its exact measurements at runtime in JavaScript, you can use a [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) to get that information dynamically.

## Accessing component values

You can access the state and trigger values of a component through the mounting command's return value. Alternatively, if you mounted your component with a key, you can access the component values through Session State.

### Component return value

Component mounting commands return a [`BidiComponentResult`](/develop/api-reference/custom-components/st.components.v2.types.componentrenderer) object that provides access to state and trigger values. You can access each state or trigger value as an attribute of the result object.

```python
result = my_component(on_action_change=lambda: None)
st.write(result.action)
```

### Component values in Session State

If you mounted your component with a key, you can access the component values through Session State. The component's result object is stored in Session State under the key you provided.

```python
result = my_component(on_action_change=lambda: None, key="my_key")
st.write(st.session_state.my_key.action)
```

### State vs trigger behavior

State and trigger values have different behavior in relation to reruns. State values persist across reruns, while trigger values are transient and reset after each rerun. For more information about state and trigger values, see the [State vs trigger values](/develop/concepts/custom-components/components-v2/state-and-triggers) guide.
