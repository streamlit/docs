---
title: Layouts and Containers
slug: /library/api-reference/layout
---

# Layouts and Containers

## Complex layouts

Streamlit provides several options for controlling different elements are laid out on the screen.

<TileContainer>
<RefCard href="/library/api-reference/layout/st.sidebar">

<Image pure alt="screenshot" src="/images/api/sidebar.jpg" />

#### Sidebar

Display items in a sidebar.

```python
st.sidebar.write("This lives in the sidebar")
st.sidebar.button("Click me!")
```

</RefCard>
<RefCard href="/library/api-reference/layout/st.columns">

<Image pure alt="screenshot" src="/images/api/columns.jpg" />

#### Columns

Insert containers laid out as side-by-side columns.

```python
col1, col2 = st.columns(2)
col1.write("this is column 1")
col2.write("this is column 2")
```

</RefCard>
<RefCard href="/library/api-reference/layout/st.expander">

<Image pure alt="screenshot" src="/images/api/expander.jpg" />

#### Expander

Insert a multi-element container that can be expanded/collapsed.

```python
with st.expander("Open to see more"):
  st.write("This is more content")
```

</RefCard>
<RefCard href="/library/api-reference/layout/st.container">

<Image pure alt="screenshot" src="/images/api/container.jpg" />

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

<Image pure alt="screenshot" src="/images/api/empty.jpg" />

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
