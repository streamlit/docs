---
title: "Component example: Hello world"
slug: /develop/concepts/custom-components/components-v2/examples/hello-world
description: A simple static component that displays themed text using Streamlit's CSS custom properties.
keywords: custom components v2, example, hello world, static component, theming
---

# Component example: Hello world

This is a minimal static component that displays "Hello, World!" using the app's primary theme color.

<Cloud name="doc-components-v2-hello-world" height="200px" />

## Key concepts demonstrated

This component demonstrates the following concepts:

- Component registration with HTML and CSS using [`st.components.v2.component()`](/develop/api-reference/custom-components/st.components.v2.component)
- Theme integration using CSS custom properties
- Mounting a component by calling the [`ComponentRenderer`](/develop/api-reference/custom-components/st.components.v2.types.componentrenderer)

## Complete code

```python filename="streamlit_app.py"
import streamlit as st

hello_component = st.components.v2.component(
    name="hello_world",
    html="<h2>Hello, World!</h2>",
    css="h2 { color: var(--st-primary-color); }",
)

hello_component()
```

## How it works

### Registration

The component is registered with the following parameters:

- `name`: `"hello_world"` is a unique identifier that Streamlit uses internally to retrieve the component's HTML and CSS code when an instance of the component is mounted.
- `html`: `"<h2>Hello, World!</h2>"` is the markup that Streamlit renders in the component's DOM.
- `css`: `"h2 { color: var(--st-primary-color); }"` uses a CSS custom property to apply the app's primary color to the component's heading element.

### Theming

Most theme configuration options can be converted from camel case to dash-case and used as CSS custom properties. For example, `theme.primaryColor` becomes `--st-primary-color`. In this example, `var(--st-primary-color)` is used to apply the app's primary color to the component's heading. If an app has a light and dark theme configured, the CSS custom property will reflect the value of the current theme. For more theme variables, see [Theming and styling](/develop/concepts/custom-components/components-v2/theming).

### Mounting

The registration command returns a [`ComponentRenderer`](/develop/api-reference/custom-components/st.components.v2.types.componentrenderer) that can be called to mount an instance of the component. In this example, the component is mounted by calling `hello_component()`. Because this is a static component with no interactivity, no additional parameters are needed to mount the component.
