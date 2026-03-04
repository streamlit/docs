---
title: Using layouts and containers
slug: /develop/concepts/design/layouts-and-containers
description: Learn how to arrange and organize elements in your Streamlit app using containers, columns, tabs, expanders, flex layouts, and dynamic containers.
keywords: layouts, containers, columns, tabs, expander, popover, sidebar, flex layout, horizontal layout, st.empty, dynamic containers, nesting
---

# Using layouts and containers

By default, Streamlit renders elements top-to-bottom in the order they appear in your script. Containers let you group elements, arrange them side by side, hide them behind tabs or expanders, and control alignment and spacing. This guide walks through Streamlit's layout tools from the basics to advanced patterns.

## Summary

1. Use `st.sidebar` for persistent controls that stay visible across your app.
2. Use `st.columns` to place elements side by side.
3. Use `st.tabs`, `st.expander`, and `st.popover` to organize content behind collapsible or overlay containers.
4. Use `st.container` to group elements and control display order independently from script order.
5. Use `st.empty` to create a single-element placeholder that can be replaced or cleared.
6. Horizontal containers, gap, alignment, and `st.space` give you fine-grained control over flex layouts.
7. `st.tabs`, `st.expander`, and `st.popover` can track their open/closed state and trigger reruns when you set `on_change`.

## Writing into containers

There are two ways to add elements to a container: context managers and method calls.

With a **context manager** (`with`), everything inside the block is written to the container:

```python
import streamlit as st

with st.container():
    st.write("Text inside the container")
    st.button("A button inside the container")
```

With **method calls**, you call Streamlit commands directly on the container object:

```python
import streamlit as st

c = st.container()
c.write("Text inside the container")
c.button("A button inside the container")
```

Method calls are especially useful when you need to write into a container that was created earlier in your script, letting you display elements in a different order than the script executes. The previous two examples produce the same visual result.

## Basic containers

### `st.sidebar`

The sidebar is a persistent panel on the left side of your app. It's ideal for controls and filters that should stay visible while the user scrolls through the main content.

```python try
import streamlit as st

st.sidebar.selectbox("Choose a model", ["GPT-4", "Claude", "Gemini"])
st.sidebar.slider("Temperature", 0.0, 1.0, 0.7)

st.write("Main content area")
```

You can also use the context manager syntax:

```python try
import streamlit as st

with st.sidebar:
    st.selectbox("Choose a model", ["GPT-4", "Claude", "Gemini"])
```

### `st.container`

A plain container groups elements together. On its own, a container is invisible — it doesn't add any visual boundary. Its primary purpose is letting you write elements out of order. In the following example, the empty container is drawn first, and then text is drawn after it. Finally, text is drawn inside it, appearing before the previously drawn text.

```python try
import streamlit as st

header = st.container()
st.write("This runs first but appears second.")
header.write("This runs second but appears first.")
```

You can add a visible border with `border=True`:

```python try
import streamlit as st

with st.container(border=True):
    st.write("This has a border around it.")
```

### `st.columns`

Columns are the simplest way to place elements side by side. Each column gets a fixed share of the available width. Pass the number of equal columns or a list of relative widths:

```python try
import streamlit as st

col1, col2, col3 = st.columns(3)
col1.metric("Revenue", "$12K", "8%")
col2.metric("Users", "1,204", "12%")
col3.metric("Latency", "42ms", "-3%")
```

For unequal widths, pass a list:

```python try
import streamlit as st

left, right = st.columns([2, 1])
left.write("This column is twice as wide.")
right.write("This column is narrower.")
```

<Tip>

Columns are great for quick grid-like layouts, but they are not as adaptive as horizontal containers. If the screen width is too narrow, the columns will stack instead of flex wrapping. For more control over how elements flow and wrap, see [Horizontal containers](#horizontal-containers) in the flex layouts section below.

</Tip>

## Collapsible and overlay containers

### `st.expander`

An expander hides content behind a collapsible header. It's useful for secondary details, help text, or advanced options:

```python try
import streamlit as st

with st.expander("Show details"):
    st.write("Here are the details...")
    st.image("https://static.streamlit.io/examples/dice.jpg")
```

### `st.tabs`

Tabs organize content into labeled views. Only one tab is visible at a time, but by default all tab content runs on every rerun:

```python try
import streamlit as st

tab1, tab2, tab3 = st.tabs(["Chart", "Data", "Settings"])

with tab1:
    st.line_chart({"data": [1, 5, 2, 6, 2, 1]})
with tab2:
    st.dataframe({"col1": [1, 2, 3], "col2": [4, 5, 6]})
with tab3:
    st.checkbox("Show gridlines")
```

### `st.popover`

A popover displays content in a floating overlay triggered by a button. It's useful for settings or filters that shouldn't take up permanent space:

```python try
import streamlit as st

with st.popover("Filter settings"):
    st.checkbox("Include archived")
    st.slider("Min score", 0, 100, 50)
```

## Placeholder containers

### `st.empty`

`st.empty` creates a single-element placeholder. Each time you write to it, the previous content is replaced:

```python try
import streamlit as st
import time

placeholder = st.empty()

for i in range(5):
    placeholder.write(f"Iteration {i}")
    time.sleep(0.5)

placeholder.empty()
```

To replace multiple elements at once, nest a `st.container` inside `st.empty`:

```python try
import streamlit as st
import time

placeholder = st.empty()

with placeholder.container():
    st.write("First set of content")
    st.button("A button")

time.sleep(2)

with placeholder:
    st.write("Replacement content")
```

`st.empty` is the primary tool for updating your app's display in place. For more about updating and replacing elements, see [Update and replace elements](/develop/concepts/design/animate).

## Flex layouts

### Horizontal containers

Set `horizontal=True` on `st.container` to lay out its children in a horizontal row. Unlike columns, elements in a horizontal container size themselves based on their content and wrap to the next line when they overflow:

```python
import streamlit as st

with st.container(horizontal=True):
    st.button("One")
    st.button("Two")
    st.button("Three")
```

Horizontal containers are generally preferred over `st.columns` for side-by-side layouts because they adapt naturally to their content. Columns divide the available width into fixed proportions, which works well for simple grids but can waste space or cause awkward sizing when elements vary in width. Horizontal containers avoid this by letting each element take only the space it needs.

For example, a row of inputs with a submit button works well in a horizontal container without worrying about proportions:

```python
import streamlit as st

with st.container(horizontal=True):
    st.text_input("Name")
    st.text_input("Email")
    st.date_input("Birthday")
```

### Alignment

Containers and columns support vertical and horizontal alignment:

```python
import streamlit as st

with st.container(horizontal=True, horizontal_alignment="right"):
    st.button("Cancel")
    st.button("Submit")
```

For more information about alignment, see the [`st.container` API reference](/develop/api-reference/layout/st.container).

### Gap and spacing

Columns and containers accept a `gap` parameter to control spacing between child elements. Valid sizes range from `"xxsmall"` through `"xxlarge"`:

```python
import streamlit as st

col1, col2 = st.columns(2, gap="large")
col1.write("Wide gap between columns")
col2.write("See the space?")
```

For manual spacing, use `st.space`:

```python
import streamlit as st

st.write("Above")
st.space("large")
st.write("Below, with a large gap")
```

### Fixed-height and scrollable containers

Set `height` on a container to a pixel value to create a scrollable region:

```python
import streamlit as st

with st.container(height=200):
    for i in range(20):
        st.write(f"Line {i}")
```

## Dynamic containers

<Note>

Dynamic containers were introduced in v1.55.0. When `on_change` is set, containers become widget-like. This means that they track state, accept callbacks, and support keys. If you're unfamiliar with how Streamlit widgets manage state and identity, see [Widget behavior](/develop/concepts/architecture/widget-behavior) first.

</Note>

By default, `st.tabs`, `st.expander`, and `st.popover` are static: all of their content runs on every rerun regardless of whether they are open or closed. You can change this with the `on_change` parameter, which enables state tracking and reruns.

### Tracking open and closed state

Set `on_change="rerun"` to make a container track its state. The `.open` attribute on the returned container object tells you whether the container is currently open. This enables lazy loading of content in tabs and expanders.

```python
import streamlit as st
import time

tab1, tab2 = st.tabs(["Chart", "Data"], on_change="rerun")

if tab1.open:
    with st.spinner("Loading Tab 1..."):
        time.sleep(2)
    with tab1:
        st.line_chart({"data": [1, 5, 2, 6]})

if tab2.open:
    with st.spinner("Loading Tab 2..."):
        time.sleep(2)
    with tab2:
        st.dataframe({"col1": [1, 2, 3]})
```

### Using callbacks

Pass a callable to `on_change` to run a function when the user opens, closes, or switches containers. If you need to access the container's state in the callback, use a `key` and retrieve the state from `st.session_state`.

```python
import streamlit as st

def on_tab_change():
    st.toast(f"Tab changed to {st.session_state.tabs}!")

tab1, tab2 = st.tabs(["Input", "Output"], on_change=on_tab_change, key="tabs")
```

### Programmatic control

When you provide a `key` to a state-tracking container, you can manipulate the container's state through `st.session_state`:

```python
import streamlit as st

def toggle_expander():
    st.session_state.details = not st.session_state.details

exp = st.expander("Details", key="details", on_change="rerun")

with exp:
    st.write("Detailed content here")

st.button("Toggle expander", on_click=toggle_expander)
```

## Nesting containers

You can nest containers inside each other. For example, columns inside tabs or expanders inside columns:

```python try
import streamlit as st

tab1, tab2 = st.tabs(["Overview", "Details"])

with tab1:
    col1, col2 = st.columns(2)
    col1.metric("Users", "1,204")
    col2.metric("Revenue", "$12K")

with tab2:
    with st.expander("Advanced settings"):
        st.slider("Threshold", 0.0, 1.0, 0.5)
```
