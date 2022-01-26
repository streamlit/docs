---
title: Placeholders, help, and options
slug: /library/api-reference/utilities
---

# Placeholders, help, and options

There are a handful of methods that allow you to create placeholders in your
app, provide help using doc strings, get and modify configuration options and query parameters.

<TileContainer>
<RefCard href="/library/api-reference/utilities/st.set_page_config">

#### Set page title, favicon, and more

Configures the default settings of the page.

```python
st.set_page_config(
  title="My app",
  favicon=":shark:",
)
```

</RefCard>
<RefCard href="/library/api-reference/utilities/st.echo">

<!--<Image pure alt="screenshot" src="/images/api/echo.jpg" />-->

#### Echo

Display some code on the app, then execute it. Useful for tutorials.

```python
with st.echo():
  st.write('This code will be printed')
```

</RefCard>
<RefCard href="/library/api-reference/utilities/st.help">

#### Get help

Display object’s doc string, nicely formatted.

```python
st.help(st.write)
st.help(pd.DataFrame)
```

</RefCard>

<RefCard href="/library/api-reference/utilities/st.experimental_show">

#### st.experimental_show

Write arguments and argument names to your app for debugging purposes.

```python
df = pd.DataFrame({
  'first column': [1, 2, 3, 4],
  'second column': [10, 20, 30, 40],
 })
st.experimental_show(df)
```

</RefCard>

<RefCard href="/library/api-reference/utilities/st.experimental_get_query_params">

#### Get query paramters

Return the query parameters that are currently showing in the browser's URL bar.

```python
st.experimental_get_query_params()
```

</RefCard>

<RefCard href="/library/api-reference/utilities/st.experimental_set_query_params">

#### Set query paramters

Set the query parameters that are shown in the browser's URL bar.

```python
st.experimental_set_query_params(
  show_map=True,
  selected=["asia"]
)
```

</RefCard>
</TileContainer>
