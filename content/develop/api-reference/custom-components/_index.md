---
title: Custom components
slug: /develop/api-reference/custom-components
description: Use Streamlit's custom components to create and integrate custom UI elements in your app.
keywords: custom components, declare_component, html, iframe, frontend, react, javascript, custom ui, components v1, components v2
---

# Custom components

Streamlit custom components extend your app beyond built-in widgets with custom UI elements. V2 components offer better performance and multiple callbacks without iframes, while V1 components run in iframes with single callbacks.

## V2 custom components

### Backend (Python)

<TileContainer>

<RefCard href="/develop/api-reference/custom-components/st.components.v2.component">

<h4>Register</h4>

Register a custom component.

```python
my_component = st.components.v2.component(
    html=HTML,
    js=JS
)
my_component()
```

</RefCard>

<RefCard href="/develop/api-reference/custom-components/st.components.v2.types.bidicomponentcallable">

<h4>Mount</h4>

Mount a custom component.

```python
my_component = st.components.v2.component(
    html=HTML,
    js=JS
)
my_component()
```

</RefCard>

</TileContainer>

### Frontend (TypeScript)

<TileContainer>

<RefCard href="/develop/api-reference/custom-components/component-v2-lib">

<h4>npm support code</h4>

Support code published through npm.

```bash
npm i @streamlit/component-v2-lib
```

</RefCard>

<RefCard href="/develop/api-reference/custom-components/component-v2-lib-component">

<h4>Component</h4>

Type alias for the component function.

```typescript
import { Component } from "@streamlit/component-v2-lib";
```

</RefCard>

<RefCard href="/develop/api-reference/custom-components/component-v2-lib-componentargs">

<h4>ComponentArgs</h4>

Type alias for the component arguments.

```typescript
import { ComponentArgs } from "@streamlit/component-v2-lib";
```

</RefCard>

<RefCard href="/develop/api-reference/custom-components/component-v2-lib-componentstate">

<h4>ComponentState</h4>

Type alias for the component state.

```typescript
import { ComponentState } from "@streamlit/component-v2-lib";
```

</RefCard>

<RefCard href="/develop/api-reference/custom-components/component-v2-lib-optionalcomponentcleanupfunction" size="two-third">

<h4>OptionalComponentCleanupFunction</h4>

Type alias for the component cleanup function.

```typescript
import { OptionalComponentCleanupFunction } from "@streamlit/component-v2-lib";
```

</RefCard>

</TileContainer>

## V1 custom components

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
