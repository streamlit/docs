---
title: Layouts and Containers
slug: /library/api-reference/layout
---

# Layouts and Containers

## Add widgets to sidebar

Not only can you add interactivity to your report with widgets, you can organize them into a sidebar with `st.sidebar.[element_name]`. Each element that's passed to `st.sidebar` is pinned to the left, allowing users to focus on the content in your app. The only elements that aren't supported are `st.echo` and `st.spinner`.

Here's an example of how you'd add a selectbox to your sidebar.

```python
import streamlit as st

add_selectbox = st.sidebar.selectbox(
    "How would you like to be contacted?",
    ("Email", "Home phone", "Mobile phone")
)
```

## Complex layouts

In addition to the sidebar, you have a few other options for controlling how your app is laid out.

<TileContainer>
<RefCard href="/library/api-reference/layout/st.columns">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Columns

Insert containers laid out as side-by-side columns.

```python
col1, col2 = st.columns(2)
col1.write("this is column 1")
col2.write("this is column 2")
```

</RefCard>
<RefCard href="/library/api-reference/layout/st.expander">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Expander

Insert a multi-element container that can be expanded/collapsed.

```python
with st.expander("Open to see more"):
  st.write("This is more content")
```

</RefCard>
<RefCard href="/library/api-reference/layout/st.container">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Container

Insert a multi-element container.

```python
c = st.container()
st.write("This will show last")
c.write("This will show first")
c.write("This will show second")
```

</RefCard>
<RefCard href="/library/api-reference/layout/st.empty">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Empty

Insert a single-element container.

```python
c = st.empty()
st.write("This will show last")
c.write("This will be replaced")
c.write("This will show first")
```

</RefCard>
</TileContainer>
