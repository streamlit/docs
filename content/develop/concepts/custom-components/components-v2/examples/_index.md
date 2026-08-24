---
title: Quickstart examples
slug: /develop/concepts/custom-components/components-v2/examples
description: Get started quickly with Custom Components v2 through practical examples showing interactive buttons, data exchange, and complete component implementations.
keywords: custom components v2, quickstart, examples, interactive components, data exchange, component examples, getting started
---

# Quickstart examples

Get started with custom components v2 through these practical examples. Each example introduces a new concept to progressively build your understanding. To highlight each concept, the code on this page shows either a portion of the component example or a simplified version of it. Follow the links below each example to see the complete code for that example, including explanations.

## Two-step component process

Creating and using a custom component involves two distinct steps:

1. **Registration**: Define your component's HTML, CSS, and JavaScript with [`st.components.v2.component()`](/develop/api-reference/custom-components/st.components.v2.component).
2. **Mounting**: Mount a specific instance of your component to your app's frontend using the [`ComponentRenderer`](/develop/api-reference/custom-components/st.components.v2.types.componentrenderer) created during registration.

For detailed explanations, see [Component registration](/develop/concepts/custom-components/components-v2/register) and [Component mounting](/develop/concepts/custom-components/components-v2/mount).

## Hello world

This is a minimal static component that displays "Hello, World!" using the app's primary theme color. This component introduces the following concepts:

- Component registration with HTML and CSS using `st.components.v2.component()`
- Theme integration using CSS custom properties
- Mounting a component by calling the `ComponentRenderer`

<Cloud name="doc-components-v2-hello-world" height="200px" />

```python filename="streamlit_app.py"
import streamlit as st

hello_component = st.components.v2.component(
    name="hello_world",
    html="<h2>Hello, World!</h2>",
    css="h2 { color: var(--st-primary-color); }",
)

hello_component()
```

<IconLink
    href="/develop/concepts/custom-components/components-v2/examples/hello-world"
    icon="arrow_forward"
    label="View the full example"
    cssModuleIconClassName="IconRight"
/>

## Rich data

This is a component that receives various data types from Python. This component introduces the following concepts:

- Passing data from Python via the `data` parameter and accessing it in JavaScript
- Automatic dataframe and JSON serialization
- Passing an image as a Base64-encoded string
- Using a placeholder in the component's HTML and dynamically updating it with received data

<Cloud name="doc-components-v2-rich-data" height="400px" />

```python
data_component = st.components.v2.component(
    "data_display",
    html="""<div id="data-container">Loading data...</div>""",
    js="""
    export default function({ data, parentElement }) {
      const container = parentElement.querySelector("#data-container");
      const df = data.df;
      const userInfo = data.user_info;
      const imgBase64 = data.image_base64;
      container.innerHTML = `
        <h4>Dataframe: ${df}</h4>
        <h4>User Info: ${userInfo.name}</h4>
        <img src="data:image/png;base64,${imgBase64}" style="width: 25%;" />
      `;
    }
    """,
)

data_component(
    data={
        "df": df,                           # Arrow-serializable
        "user_info": {"name": "Alice"},     # JSON-serializable
        "image_base64": img_base64          # Base64 string
    }
)
```

<IconLink
    href="/develop/concepts/custom-components/components-v2/examples/rich-data"
    icon="arrow_forward"
    label="View the full example"
    cssModuleIconClassName="IconRight"
/>

## Simple button

This is an interactive button that sends events to Python. This component introduces the following concepts:

- Component registration with HTML, CSS, and JavaScript
- One-time trigger values sent from JavaScript with `setTriggerValue()`
- Callback functions using the `on_<trigger>_change` naming pattern
- Accessing trigger values from the component's return object

<Cloud name="doc-components-v2-simple-button" height="200px" />

```python filename="streamlit_app.py"
import streamlit as st

def handle_button_click():
    st.session_state.click_count += 1

st.session_state.setdefault("click_count", 0)

button_component = st.components.v2.component(
    "simple_button",
    html="""<button id="btn">Click me</button>""",
    css="""button { background-color: var(--st-primary-color); }""",
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

st.write(result.action)
st.write(f"Total clicks: {st.session_state.click_count}")
```

<IconLink
    href="/develop/concepts/custom-components/components-v2/examples/simple-button"
    icon="arrow_forward"
    label="View the full example"
    cssModuleIconClassName="IconRight"
/>

## Simple checkbox

This is a simple checkbox that reports a stateful value to Python. This component introduces the following concepts:

- Persistent state values sent from JavaScript with `setStateValue()`
- Callback functions with the `on_<state>_change` naming pattern
- Initializing a stateful component with the `data` and `default` parameters
- Using font from the app's theme
- Accessing state values from the component's return object

<Cloud name="doc-components-v2-simple-checkbox" height="200px" />

```python filename="streamlit_app.py"
import streamlit as st

checkbox_component = st.components.v2.component(
    "simple_checkbox",
    html="""
    <label class="checkbox-container">
        <input type="checkbox" id="checkbox" />
        <span>Enable feature</span>
    </label>
    """,
    css="""
    .checkbox-container {
        gap: 0.5rem;
        font-family: var(--st-font);
        color: var(--st-text-color);
    }
    """,
    js="""
    export default function({ parentElement, data, setStateValue }) {
        const checkbox = parentElement.querySelector("#checkbox");
        checkbox.checked = data?.checked ?? false;

        checkbox.onchange = () => {
            setStateValue("checked", checkbox.checked);
        };
    }
    """,
)

initial_state = True

result = checkbox_component(
    data={"checked": initial_state},
    default={"checked": initial_state},
    on_checked_change=lambda: None,
)

st.write(f"Current state: {'Enabled' if result.checked else 'Disabled'}")
```

<IconLink
    href="/develop/concepts/custom-components/components-v2/examples/simple-checkbox"
    icon="arrow_forward"
    label="View the full example"
    cssModuleIconClassName="IconRight"
/>

## Interactive counter

This is a counter with increment, decrement, and reset functionality. This component introduces the following concepts:

- Combining state and trigger values in one component
- Multiple event handlers

<Cloud name="doc-components-v2-interactive-counter" height="300px" />

```markup
<div class="counter">
  <h3>Count: <span id="display">0</span></h3>
  <div class="buttons">
    <button id="decrement">-1</button>
    <button id="increment">+1</button>
    <button id="reset">Reset</button>
  </div>
</div>
```

```javascript
export default function ({ parentElement, setStateValue, setTriggerValue }) {
  const incrementBtn = parentElement.querySelector("#increment");
  const decrementBtn = parentElement.querySelector("#decrement");
  const resetBtn = parentElement.querySelector("#reset");
  let count = 0;

  decrementBtn.onclick = () => {
    count--;
    setStateValue("count", count); // Persistent state
  };

  incrementBtn.onclick = () => {
    count++;
    setStateValue("count", count); // Persistent state
  };

  resetBtn.onclick = () => {
    count = 0;
    setTriggerValue("reset", true); // One-time event
    setStateValue("count", 0);
  };
}
```

<IconLink
    href="/develop/concepts/custom-components/components-v2/examples/interactive-counter"
    icon="arrow_forward"
    label="View the full example"
    cssModuleIconClassName="IconRight"
/>

## Text input

This is a text input component that demonstrates full bidirectional communication, including programmatic updates from Python. This component introduces the following concepts:

- Mounting a component with a key and reading component state from Session State
- Wrapping a component's raw mounting command to create a user-friendly mounting command
- Programmatic updates from Python via the `data` parameter
- Syncing frontend state without interrupting user input

<Cloud name="doc-components-v2-text-input" height="300px" />

```python
def textbox_component_wrapper(
    label, *, default="", key=None, on_change=lambda: None
):
    # Read current state from Session State
    component_state = st.session_state.get(key, {})
    value = component_state.get("value", default)

    # Pass current value to component
    data = {"label": label, "value": value}
    result = textbox_component(
        data=data,
        default={"value": value},
        key=key,
        on_value_change=on_change,
    )
    return result
```

```javascript
const input = parentElement.querySelector("input");
// Sync input value with data from Python
if (input.value !== data.value) {
  input.value = data.value ?? "";
}
```

<IconLink
    href="/develop/concepts/custom-components/components-v2/examples/text-input"
    icon="arrow_forward"
    label="View the full example"
    cssModuleIconClassName="IconRight"
/>

## Danger button

This is a hold-to-confirm button with frontend validation and visual feedback. This component introduces the following concepts:

- Frontend validation before sending data to Python
- Timed interactions with `requestAnimationFrame()`
- Visual feedback with CSS animations and transitions
- Rate limiting with cooldown periods
- Touch events for mobile support
- Layout control using the `width` parameter
- Cleanup functions for event listeners

<Cloud name="doc-components-v2-danger-button" height="500px" />

```javascript
function startHold() {
  startTime = Date.now();
  animationFrame = requestAnimationFrame(updateProgress);
}

function updateProgress() {
  const progressPercent = Math.min(elapsed / HOLD_DURATION, 1);

  if (progressPercent >= 1) {
    setTriggerValue("confirmed", true); // Only after 2 seconds
  } else {
    animationFrame = requestAnimationFrame(updateProgress);
  }
}
```

```python
result = danger_button(
    on_confirmed_change=on_delete_confirmed,
    width="content"  # Layout control
)
```

<IconLink
    href="/develop/concepts/custom-components/components-v2/examples/danger-button"
    icon="arrow_forward"
    label="View the full example"
    cssModuleIconClassName="IconRight"
/>

## Radial menu

This is a circular selection menu demonstrating state values for persistent selections. This component introduces the following concepts:

- CSS custom properties for dynamic positioning (`--i`, `--total`)
- A fixed-position backdrop for click-outside behavior
- Complex animations with CSS transitions

<Cloud name="doc-components-v2-radial-menu" height="300px" />

```python
result = radial_menu(
    data={"options": options, "selection": "burger"},
    default={"selection": "burger"},  # Avoids initial rerun
    on_selection_change=lambda: None,
)
```

```javascript
// Dynamic element creation
Object.entries(options).forEach(([value, icon], index) => {
  const button = document.createElement("button");
  button.style.setProperty("--i", index);
  button.style.setProperty("--total", Object.keys(options).length);
  // ...
});
```

<IconLink
    href="/develop/concepts/custom-components/components-v2/examples/radial-menu"
    icon="arrow_forward"
    label="View the full example"
    cssModuleIconClassName="IconRight"
/>

## What's next?

Now that you've seen these examples:

- Learn the fundamentals in [Component registration](/develop/concepts/custom-components/components-v2/register) and [Component mounting](/develop/concepts/custom-components/components-v2/mount).
- Understand [State versus trigger values](/develop/concepts/custom-components/components-v2/state-and-triggers) for advanced interactions.
- Explore [Theming and styling](/develop/concepts/custom-components/components-v2/theming) to make beautiful components.
- Build complex projects with [Package-based components](/develop/concepts/custom-components/components-v2/package-based).
