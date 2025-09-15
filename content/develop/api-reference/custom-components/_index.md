---
title: Custom components
slug: /develop/api-reference/custom-components
description: Learn about Streamlit's custom components system for creating and integrating custom UI elements including HTML, iframe, and component declaration.
keywords: custom components, declare_component, html, iframe, frontend, react, javascript, custom ui, components v1
---

# Custom components

<TileContainer>

<RefCard href="/develop/api-reference/custom-components/st.components.v1.declare_component">

<h4>Declare a component</h4>

Create and register a custom component.

```python
from st.components.v1 import declare_component
declare_component(
    "custom_slider",
    "/frontend",
)
```

</RefCard>

<RefCard href="/develop/api-reference/custom-components/st.components.v1.html">

<h4>HTML</h4>

Display an HTML string in an iframe.

```python
from st.components.v1 import html
html(
    "<p>Foo bar.</p>"
)
```

</RefCard>

<RefCard href="/develop/api-reference/custom-components/st.components.v1.iframe">

<h4>iframe</h4>

Load a remote URL in an iframe.

```python
from st.components.v1 import iframe
iframe(
    "docs.streamlit.io"
)
```

</RefCard>

</TileContainer>
