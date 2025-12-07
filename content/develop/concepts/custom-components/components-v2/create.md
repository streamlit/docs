---
title: Create custom v2 components
slug: /develop/concepts/custom-components/components-v2/create
description: Learn how to create Streamlit custom components v2 with inline development, from basic registration to mounting components with rich interactions.
keywords: custom components v2, create components, inline components, component registration, component mounting, bidirectional communication
---

# Create custom v2 components

Components v2 provides a modern, flexible approach to extending Streamlit with custom functionality. This guide will introduce the necessary concepts for creating custom components using the inline development approach. For package-based components, see the [Package-based Components](/develop/concepts/custom-components/components-v2/package-based) guide.

## Two-step component process

Creating and using a custom component involves two distinct steps:

1. **Registration**: Define your component's structure (HTML, CSS, JavaScript).
2. **Mounting**: Create and display an instance of your component in your app with specific data.

## Step 1: Component registration

Registration is where you define what your component looks like and how it behaves. Use [`st.components.v2.component()`](/develop/api-reference/custom-components/st.components.v2.component) to register a component:

```python
# Register a component
my_component = st.components.v2.component(
    name="my_button",
    html="<button id='btn'>Click me!</button>",
    css="button { background: var(--st-primary-color); color: white; }",
    js="""
    export default function(component) {
        const { parentElement, setTriggerValue } = component;

        parentElement.querySelector("button").onclick = () => {
            setTriggerValue("clicked", true);
        };
    }
    """
)
```

### Registration parameters

- `name` (required) is a unique identifier for your component type. This is used internally by Streamlit for each instance to retrieve its HTML, CSS, and JavaScript code. Avoid registering multiple components with the same name.
- `html` (optional) is the HTML markup for your component. It defines the visual structure of your component. In the previous example, this is a single HTML button element.
- `css` (optional) is the CSS styling for your component. In the previous example, the CSS sets the button's background color to the primary color from the Streamlit theme and sets the text color to white.
- `js` (optional) is the JavaScript logic for your component. In the previous example, the JavaScript listens for a click event on the button and sets the `clicked` trigger value to `true`.

For inline component development, the HTML, CSS, and JavaScript code must be raw code as strings. File references are only supported for package-based components.

When you use a path in the `st.components.v2.component()` call, the paths are resolved on the frontend. For a package-based component, Streamlit serves the contents of the package's asset directory, which makes those resources available to your app's frontend and accessible through relative paths. Streamlit doesn't serve an asset directory for inline components. For more information, see [Package-based components](/develop/concepts/custom-components/components-v2/package-based).

<Important>

A component must have either `html`, `js`, or both defined! You cannot register a component with only CSS. If you only need to inject CSS, use `st.html()` instead.

</Important>

### JavaScript function requirements

Your JavaScript code must export a default function that follows this exact signature:

```javascript
export default function (component) {
  // Your component logic here

  // Optional: return cleanup function
  return () => {
    // Cleanup logic (remove event listeners, clear timers, etc.)
  };
}
```

The `component` parameter provides these essential properties as documented in the [`ComponentArgs`](/develop/api-reference/custom-components/component-v2-lib-componentargs) type. These properties are typically destructured into local variables for easier access.

```javascript
export default function (component) {
  const { name, key, data, parentElement, setStateValue, setTriggerValue } =
    component;

  // Your component logic here
}
```

- `name` (string): Component name from your Python registration.
- `key` (string): Unique identifier for this component instance. Use this to assist with tracking unique instances of your component in the DOM, especially if your component acts outside of its `parentElement`.
- `data` (any): All data passed from Python via the `data` parameter. Use this to customize a component instance.
- `parentElement` (HTMLElement): The DOM element where your component is mounted. Use this to interact with the component's internal DOM elements.
- `setStateValue` (function): JS function to communicate stateful values to your Python backend. The first argument is the state key name, and the second argument is the value to set.
- `setTriggerValue` (function): JS function to communicate event-based trigger values to your Python backend. The first argument is the trigger key name, and the second argument is the value to set.

<Warning>

Don't directly overwrite or replace `parentElement.innerHTML`. If you do, you will overwrite the HTML, CSS, and JavaScript code that was registered with the component. If you need to inject content from `data`, do one of the following things:

- Create a placeholder element within `html` to update.
- Append children to `parentElement`.

</Warning>

### Basic registration examples

#### Simple HTML component

In the following examples, we'll register a simple component that displays "Hello, World!" in a heading. We use the primary color from the Streamlit theme for the heading color. For more information about making your components theme-aware, see the [Theming & styling](/develop/concepts/custom-components/components-v2/theming) guide. This example is completed at the end of this guide in the [Complete examples](#simple-html-component-complete-example) section.

```python
import streamlit as st

hello_component = st.components.v2.component(
    name="hello_world",
    html="<h2>Hello, World!</h2>",
    css="h2 { color: var(--st-primary-color); }"
)
```

#### Using files for inline components

For larger components, you can organize your code into separate files. However, for inline component development, you must pass raw HTML, CSS, and JavaScript code to your component. Similar to the [Quickstart examples](/develop/concepts/custom-components/components-v2/quickstart), you can read the files and pass their contents to your inline component. For package-based components, you can pass file references instead. For more information, see [Package-based components](/develop/concepts/custom-components/components-v2/package-based).

```
my_app/
├── streamlit_app.py          # Entrypoint file
└── component/
    ├── component.css         # Component styles
    ├── component.html        # Component HTML
    └── component.js          # Component JavaScript
```

```python
# Load HTML, CSS, and JS from external files
@st.cache_data
def load_component_code():
    with open("component/component.css", "r") as f:
        CSS = f.read()
    with open("component/component.html", "r") as f:
        HTML = f.read()
    with open("component/component.js", "r") as f:
        JS = f.read()
    return HTML, CSS, JS

HTML, CSS, JS = load_component_code()

file_component = st.components.v2.component(
    name="file_based",
    html=HTML,
    css=CSS,
    js=JS,
)
```

#### Interactive component

In the following example, we'll register a component that displays a counter and a button to increment the counter. The counter value is stored in the component's state and is updated when the button is clicked. The component also triggers an event when the button is clicked. The component properties are destructured within the function signature directly. This example is completed at the end of this guide in the [Complete examples](#interactive-counter-complete-example) section.

```python
import streamlit as st

counter_component = st.components.v2.component(
    name="counter",
    html="""
    <div class="counter">
        <span id="count">0</span>
        <button id="increment">+</button>
    </div>
    """,
    js="""
    export default function({ parentElement, setStateValue }) {
        let count = 0;
        const display = parentElement.querySelector('#count');
        const button = parentElement.querySelector('#increment');

        button.onclick = () => {
            count++;
            display.textContent = count;
            setStateValue('count', count);
        };
    }
    """
)
```

### Sending state and trigger values to Python

You can send state and trigger values to Python by calling `setStateValue()` or `setTriggerValue()` in your JavaScript code. For both functions, the first argument is the state or trigger key name, and the second argument is the value to set.

```javascript
setStateValue("count", count);
setTriggerValue("clicked", true);
```

Both `setStateValue()` and `setTriggerValue()` will trigger a rerun of the script. For each call in JavaScript, the associated callback function in Python will be executed as a prefix to the script run. If you make multiple calls to `setStateValue()` or `setTriggerValue()` within the same event handler, their callbacks will be executed in the order they were called before the script run. However, for `setStateValue()`, the callback function will only be executed if the state value changed as a result of the call. This is described later, in [Event callbacks](#event-callbacks-on_trigger_change-or-on_state_change) section.

## Step 2: Component mounting

After registering your component, you must mount your component in your Streamlit app. This creates a specific instance of the component and is equivalent to calling native Streamlit commands like `st.button()` or `st.text_input()`. This is where you pass data to the component and handle its output.

```python
import streamlit as st

# Register the component
my_component = st.components.v2.component(
    # ... component registration code ...
)

# Mount the component
result = my_component(
    key="unique_instance",
    data={"initial_value": 42},
    on_clicked_change=lambda: None)
)
```

### Mounting parameters

All mounting parameters are keyword-only and optional. The available parameters are documented in the [`BidiComponentCallable`](/develop/api-reference/custom-components/st.components.v2.types.bidicomponentcallable) class.

#### Component identity (`key`)

Components use the Python `key` parameter in the same manner as widgets. For a detailed overview of keys in widgets, see [Understanding widget behavior](/develop/concepts/architecture/widget-behavior#keys-help-distinguish-widgets-and-access-their-values).

Just like widgets, components have internally computed identities that help Streamlit match component mounting commands to their frontend instances.

- If you pass a key when you mount your component, Streamlit will update the existing frontend elements when other parameters change.
- If you don't pass a key when you mount your component, Streamlit will create new frontend elements when other parameters change. This will reset the component's state values.

Additionally, you must use keys to disambiguate between otherwise identical instances of the same component.

```python
# Multiple instances of the same component
result1 = my_component(key="first_instance")
result2 = my_component(key="second_instance")
```

<Note>

The `key` property available in the `ComponentArgs` type isn't the same as the Python `key` parameter. On the frontend, the JavaScript `key` is a dynamically generated identifier that is only usable for a specific instance of the component. For example, the JavaScript `key` will change if you mount a component, navigate away from the page, and then navigate back to remount it.

</Note>

#### Customizing and updating an instance (`data` and `default`)

In a component mounting command, there are two parameters that you can use to customize and update a component instance: `data` and `default`.

The `data` parameter passes information from Python to your component's frontend. It supports JSON-serializable, Arrow-serializable, and raw bytes data. Commonly this is a single value or a dictionary of values that you retrieve in your JavaScript function.

This code snippet is from the [Rich data exchange](/develop/concepts/custom-components/components-v2/quickstart#rich-data-exchange) quickstart example. It demonstrates passing a dictionary of values to the component's `data` parameter.

```python
result = chart_component(
    data={
        "df": df,                           # Arrow-serializable dataframe
        "user_info": {"name": "Alice"},     # JSON-serializable data
        "image_base64": img_base64          # Image as base64 string
    }
)
```

<Note>

DataFrames are automatically serialized using Apache Arrow format, which provides efficient transfer and preserves data types. On the frontend, you can work with the Arrow data directly or convert it to other formats as needed.

</Note>

The `default` parameter sets the initial values for component state _in Python_. This is a dictionary where each key is a state key name. Each state key has an accompanying callback function passed as a keyword argument named `on_<key>_change`. Because `default` only sets the initial value in Python, you must appropriately pass data to the component's `data` parameter to ensure that the component is consistent with its initial state.

In general, the `default` parameter is used to avoid a rerun of the script when the component is mounted. If your component immediately calls `setStateValue()` when it's mounted, this can increase the chance of visual flickering. Hense, use the `default` parameter to avoid an unnecessary rerun.

The following example demonstrates how to use the `default` parameter to avoid a rerun of the script when the component is mounted. The simple checkbox is given an initial state of `True`.

```python
import streamlit as st

simple_component = st.components.v2.component(
    name="counter",
    html="""<input type="checkbox" />""",
    js="""
    export default function({ parentElement, data, setStateValue, key }) {
        const checkbox = parentElement.querySelector("input[type='checkbox']");
        const enabled = data.enabled;

        // Initialize checkbox state
        checkbox.checked = enabled;

        // Update state when checkbox is toggled
        checkbox.addEventListener("change", () => {
            setStateValue("enabled", checkbox.checked);
        });
    }
    """
)

initial_state = True

result = simple_component(
    data={"enabled": initial_state},
    default={"enabled": initial_state},
    on_enabled_change=lambda: None
)
result
```

In the previous example, if the default wasn't set, then the initial state of the `"enabled"` key would be `None`. Thus, the return value would not be consistent with the component's state until the first user interaction triggers the event listener.

#### Layout control (`width` and `height`)

To make your component compatible with the Streamlit layout system, you can pass `width` and `height` parameters to your component mounting command. These parameters match the same width and height parameters used throughout other Streamlit commands. Streamlit wraps your component in a `<div>` element and updates its `width` and `height` properties so that it behaves like other Streamlit elements.

```python
result = my_component(
    width="stretch",    # Full width
    height=400         # Fixed height
)
```

On the frontend, it's generally recommended to set your component's CSS to `width: 100%; height: 100%`, since Streamlit will size the `<div>` wrapper element correctly. If your component needs to know its exact measurements at runtime in JavaScript, you can use a `ResizeObserver` to get that information dynamically.

#### Theming and styling (`isolate_styles`)

Custom Components v2 provides style isolation options to control whether or not to sandbox your component in a shadow root. This is useful to prevent your component's styles from leaking to the rest of the page and to prevent the page's styles from leaking into your component.

```python
result = my_component(
    isolate_styles=True  # Default behavior uses a shadow root
)
```

For more information about theming and styling, see the [Theming & styling](/develop/concepts/custom-components/components-v2/theming) guide.

#### Event callbacks (`on_<trigger>_change` or `on_<state>_change`)

For each state and trigger value for your component, you must pass a callback function. This callback function ensures that all state and trigger key-value pairs are consistently available in the component's result object. To create the callback function's keyword argument name, add an `on_` prefix and `_change` suffix to trigger or state key name (`on_<trigger or state key name>_change`). These callback functions can be empty (`lambda: None`) or contain your own response logic. Whenever your JavaScript code calls `setStateValue()` or `setTriggerValue()`, your app will immediately rerun, executing the associated callback as a prefix to the script run. If you make multiple calls to `setStateValue()` or `setTriggerValue()` within the same event handler, their callbacks will be executed before the script run, in the order they were called. However, for `setStateValue()`, the callback function will only be executed if the state value changed as a result of the call.

Continuing the [Interactive component](#interactive-component) example from the previous section, we add a callback function for the `count` state value.

```python
# Define callback function for the count state value
def handle_count_change():
    # Called when the component calls setStateValue('count', value)
    st.toast("Count was updated!")

# Mount the counter component with callback
result = counter_component(
    on_count_change=handle_count_change,
    key="counter_1"
)
```

## Accessing component values

You can access the state and trigger values of a component through the mounting command's return value. Alternatively, if you mounted your component with a key, you can access the component values through Session State.

### Component return value

Components return a [`BidiComponentResult`](/develop/api-reference/custom-components/st.components.v2.types.bidicomponentresult) object that provides access to component state and trigger values. From the previous example, you can access the `count` state value as `result.count`.

```python
# Access the current count value
st.write(f"Current count: {result.count}")
```

### Component values in Session State

If you mounted your component with a key, you can access the component values through Session State. In the previous example, you can equivalently access the `count` state value as `st.session_state.counter_1.count`.

```python
# Access the current count value
st.write(f"Current count: {st.session_state.counter_1.count}")
```

### State vs trigger behavior

State and trigger values have different behavior in relation to reruns. State values persist across reruns, while trigger values are transient and reset after each rerun. For more information about state and trigger values, see the [State vs Triggers](/develop/concepts/custom-components/components-v2/state-and-triggers) guide.

## Complete examples

### Simple HTML component complete example

### Interactive counter complete example

Here's the complete example from the previous sections that demonstrates both registration and mounting. We've added some minimal CSS to make the component look more Streamlit-like and theme-compatible. For more information about theming and styling, see the [Theming & styling](/develop/concepts/custom-components/components-v2/theming) guide.

```python
import streamlit as st

counter_component = st.components.v2.component(
    name="counter",
    html="""
    <div class="counter">
        <span id="count">0</span>
        <button id="increment">+</button>
    </div>
    """,
    css="""
    .counter {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        border: 1px solid var(--st-border-color);
        border-radius: var(--st-base-radius);
        font-family: var(--st-font);
    }
    #count {
        font-size: var(--st-base-font-size);
        color: var(--st-text-color);
    }
    #increment {
        background: var(--st-primary-color);
        color: white;
        border: none;
        border-radius: var(--st-button-radius);
        padding: 4px 8px;
        font-family: var(--st-font);
        font-size: var(--st-base-font-size);
    }
    #increment:hover {
        opacity: 0.8;
    }
    """,
    js="""
    export default function({ parentElement, setStateValue }) {
        let count = 0;
        const display = parentElement.querySelector('#count');
        const button = parentElement.querySelector('#increment');

        button.onclick = () => {
            count++;
            display.textContent = count;
            setStateValue('count', count);
        };
    }
    """
)

# Define callback function for the count state value
def handle_count_change():
    # Called when the component calls setStateValue('count', value)
    st.toast("Count was updated!")

# Mount the counter component with callback
result = counter_component(
    on_count_change=handle_count_change,
    key="counter_1"
)

# Access the current count value
st.write(f"Current count: {result.count}")

# Access the current count value in Session State
st.write(f"Current count: {st.session_state.counter_1.count}")
```

## What's next?

Now that you understand the basics of component registration and mounting:

- Learn about [State vs triggers](/develop/concepts/custom-components/v2/state-and-triggers) for advanced component communication.
- Explore [Theming and styling](/develop/concepts/custom-components/v2/theming) to make your components look great.
- Discover [Package-based components](/develop/concepts/custom-components/v2/package-based) for complex projects.
- Check out the [JavaScript API reference](/develop/api-reference/custom-components/) for complete frontend documentation.
