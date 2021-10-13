---
title: Placeholders, help, and options
slug: /library/api-reference/utilities
---

# Placeholders, help, and options

There are a handful of methods that allow you to create placeholders in your
app, provide help using doc strings, and get and modify configuration options.

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
<RefCard href="/library/api-reference/text/st.echo">

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
</TileContainer>
