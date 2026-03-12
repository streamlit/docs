---
title: Component registration
slug: /develop/concepts/custom-components/components-v2/register
description: Learn how to register custom v2 components with HTML, CSS, and JavaScript to define their structure and behavior.
keywords: custom components v2, component registration, st.components.v2.component, HTML, CSS, JavaScript, FrontendRendererArgs
---

# Component registration

When you register your component, you define what it looks like and how it behaves:

- To define your component's HTML, CSS, and JavaScript, use [`st.components.v2.component()`](/develop/api-reference/custom-components/st.components.v2.component).
- In your component's JavaScript code, to send and receive communications with Python, use the properties of the [`FrontendRendererArgs`](/develop/api-reference/custom-components/component-v2-lib-frontendrendererargs) type.
- In your component's CSS, to make your component theme-aware, use [CSS custom properties](/develop/concepts/custom-components/components-v2/theming#using-css-custom-properties).

For simplicity and to help you get started with less prerequisite knowledge, this guide uses inline component development. For components that are larger, reusable, or distributed, you should use package-based development. The practical difference is that package-based components let you self-host assets and reference those assets, including component code, by a relative path. Contrastingly, inline components require you to pass raw HTML, CSS, and JavaScript code to your component registration command.

After you learn about custom components with inline development, you can proceed to [package-based development](/develop/concepts/custom-components/components-v2/package-based) where you'll need to understand the basics of [Python packaging](https://packaging.python.org/en/latest/overview/), too.

## Prerequisites

To read this guide, you should be familiar with the basic syntax and concepts of HTML, CSS, and JavaScript. If you want to build an interactive component, you should also know how Streamlit's native widgets work. For more information about Streamlit widgets, see the [Widget behavior](/develop/concepts/architecture/widget-behavior) guide.

## Basic examples

Here are some basic examples of component registration. The parameters are explained in the next section.

### Hello world

This is the [hello world](/develop/concepts/custom-components/components-v2/examples/hello-world) component shown in the quickstart guide. It's a static component that displays "Hello, World!" using the app's theme colors.

```python
hello_component = st.components.v2.component(
    name="hello_world",
    html="<h2>Hello, World!</h2>",
    css="h2 { color: var(--st-primary-color); }",
)
```

### Simple button

This is the [simple button](/develop/concepts/custom-components/components-v2/examples/simple-button) component shown in the quickstart guide. It's an interactive button that sends a trigger value to Python when clicked.

```python
button_component = st.components.v2.component(
    name="simple_button",
    html="""<button id="btn">Click me</button>""",
    css="button { background: var(--st-primary-color); color: white; }",
    js="""
    export default function(component) {
        const { parentElement, setTriggerValue } = component;

        parentElement.querySelector("button").onclick = () => {
            setTriggerValue("action", "button_clicked");
        };
    }
    """
)
```

## Registration parameters

### Internal component identifier (`name`)

`name` is a unique identifier for your component. This is used internally by Streamlit to retrieve the HTML, CSS, and JavaScript code when a component instance is mounted. To avoid collisions, Streamlit prefixes component names with the modules they are imported from. For inline components that aren't imported, you must use unique names.

### Component content (`html`, `css`, and `js`)

`html`, `css`, and `js` are all optional parameters that define your component's markup, styling, and logic, respectively:

- In the hello world example, `html` contains a single heading element and `css` styles it with the Streamlit theme's primary color. Because it's a static component, it doesn't need any JavaScript logic.
- In the simple button example, `html` contains a single button element, `css` styles it with the Streamlit theme's primary color, and the default function in `js` listens for clicks and sets a trigger value.

### Theming and styling (`isolate_styles`)

Custom Components v2 provides style isolation options to control whether or not to sandbox your component in a shadow root. This is useful to prevent your component's styles from leaking to the rest of the page and to prevent the page's styles from leaking into your component. By default, Streamlit uses a shadow root for your component.

```python
my_component = st.components.v2.component(
    name="my_component",
    html="<div class='my-style'>Isolated content</div>",
    css=".my-style { color: red; }",
    isolate_styles=True  # Default behavior uses a shadow root
)
```

For more information about theming and styling, see the [Theming and styling](/develop/concepts/custom-components/components-v2/theming) guide.

## JavaScript function requirements

Your JavaScript code must export a default function that follows this exact signature:

```javascript
export default function (component) {
  // Your component logic here

  return () => {
    // Cleanup logic (remove event listeners, clear timers, etc.)
  };
}
```

The `component` argument in your exported default function provides essential properties described in the [`FrontendRendererArgs`](/develop/api-reference/custom-components/component-v2-lib-frontendrendererargs) type. These properties are typically destructured into local variables for easier access:

```javascript
export default function (component) {
  const { name, key, data, parentElement, setStateValue, setTriggerValue } =
    component;
  // Your component logic here
}
```

- `name` (string): Component name from your Python registration.
- `key` (string): Unique identifier for a component instance. Use this to assist with tracking unique instances of your component in the DOM, especially if your component acts outside of its `parentElement`.
- `data` (any): All data passed from Python via the `data` parameter. Use this to customize a component instance or to receive feedback data from your Python backend.
- `parentElement` (HTMLElement of ShadowRoot): The DOM element where your component is mounted. Use this to interact with the component's internal DOM elements.
- `setStateValue` (function): JavaScript function to communicate stateful values to your Python backend. The first argument is the state key name, and the second argument is the value to set.
- `setTriggerValue` (function): JavaScript function to communicate event-based trigger values to your Python backend. The first argument is the trigger key name, and the second argument is the value to set.

<div style={{ maxWidth: '60%', margin: 'auto' }}>
<Image alt="Component communication cycle" src="/images/component-communication-cycle.svg" />
</div>

<Warning>

Don't directly overwrite or replace `parentElement.innerHTML`. If you do, you will overwrite the HTML, CSS, and JavaScript code that was registered with the component. If you need to inject content from `data`, do one of the following things:

- Create a placeholder element within `html` to update.
- Append children to `parentElement`.

</Warning>

## Using files for inline components

For larger components, you can organize your code into separate files. However, for inline components, you must pass raw HTML, CSS, and JavaScript code when you register them. You can read the files and pass their contents to your inline component. For package-based components, you can pass file references instead. Typically, if you have a component that uses multiple files, package-based components is preferred over inline components.

If you use multiple files for your inline component, use a context manager to read the files and pass their contents to your inline component.

<Note>

This pattern isn't recommended, especially for development, because you might need to restart your Streamlit server to see changes in your non-Python code.

</Note>

```none filename="Directory structure"
my_app/
├── streamlit_app.py
└── component.html
```

```python
with open("my_component/my_html.html", "r") as f:
        HTML = f.read()

file_component = st.components.v2.component(
    name="antipattern_file_based",
    html=HTML
)
```

## Sending values to Python

You can send state and trigger values to Python by calling `setStateValue()` or `setTriggerValue()` in your JavaScript code. For both functions, the first argument is the state or trigger name, and the second argument is the value to set.

```javascript
setStateValue("count", count);
setTriggerValue("clicked", true);
```

Both `setStateValue()` and `setTriggerValue()` trigger a rerun of the script. On the next page, you'll learn about mounting your component, which includes defining callback functions for each state and trigger value. Custom components handle callbacks similarly to native Streamlit widgets, like `st.button()`. However, because components can have multiple states and triggers, a single component instance can have multiple callbacks and also execute multiple callbacks in one script rerun. This is explained in more detail on the next page, [Bidirectional communication](/develop/concepts/custom-components/components-v2/communicate).
