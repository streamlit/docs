---
title: Placeholders, help, and options
slug: /library/api-reference/utilities
---

# Placeholders, help, and options

There are a handful of methods that allow you to create placeholders in your
app, provide help using doc strings, get and modify configuration options and query parameters.

<TileContainer>
<RefCard href="/library/api-reference/utilities/st.set_page_config">

<h4>Set page title, favicon, and more</h4>

Configures the default settings of the page.

```python
st.set_page_config(
  page_title="My app",
  page_icon=":shark:",
)
```

</RefCard>
<RefCard href="/library/api-reference/utilities/st.echo">

<h4>Echo</h4>

Display some code on the app, then execute it. Useful for tutorials.

```python
with st.echo():
  st.write('This code will be printed')
```

</RefCard>
<RefCard href="/library/api-reference/utilities/st.help">

<h4>Get help</h4>

Display object’s doc string, nicely formatted.

```python
st.help(st.write)
st.help(pd.DataFrame)
```

</RefCard>

<RefCard href="/library/api-reference/utilities/st.experimental_get_query_params">

<h4>Get query parameters</h4>

Return the query parameters that are currently showing in the browser's URL bar.

```python
st.experimental_get_query_params()
```

</RefCard>

<RefCard href="/library/api-reference/utilities/st.experimental_set_query_params">

<h4>Set query parameters</h4>

Set the query parameters that are shown in the browser's URL bar.

```python
st.experimental_set_query_params(
  show_map=True,
  selected=["asia"]
)
```

</RefCard>
</TileContainer>
