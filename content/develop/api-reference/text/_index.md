---
title: Text elements
slug: /develop/api-reference/text
description: Display and format text in Streamlit apps with titles, headers, markdown, code blocks, captions, badges, and other text formatting components.
keywords: text elements, title, header, subheader, markdown, text formatting, code blocks, caption, badge, divider, latex, html, text display
---

# Text elements

Streamlit apps usually start with a call to `st.title` to set the
app's title. After that, there are 2 heading levels you can use:
`st.header` and `st.subheader`.

Pure text is entered with `st.text`, and Markdown with
`st.markdown`.

We also offer a "swiss-army knife" command called `st.write`, which accepts
multiple arguments, and multiple data types. And as described above, you can
also use [magic commands](/develop/api-reference/write-magic/magic) in place of `st.write`.

## Headings and body text

<TileContainer>
<RefCard href="/develop/api-reference/text/st.markdown">

<Image pure alt="screenshot" src="/images/api/markdown.jpg" />

<h4>Markdown</h4>

Display string formatted as Markdown.

```python
st.markdown("Hello **world**!")
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.title">

<Image pure alt="screenshot" src="/images/api/title.jpg" />

<h4>Title</h4>

Display text in title formatting.

```python
st.title("The app title")
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.header">

<Image pure alt="screenshot" src="/images/api/header.jpg" />

<h4>Header</h4>

Display text in header formatting.

```python
st.header("This is a header")
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.subheader">

<Image pure alt="screenshot" src="/images/api/subheader.jpg" />

<h4>Subheader</h4>

Display text in subheader formatting.

```python
st.subheader("This is a subheader")
```

</RefCard>
</TileContainer>

## Formatted text

<TileContainer>

<RefCard href="/develop/api-reference/text/st.badge">

<Image pure alt="screenshot" src="/images/api/badge.jpg" />

<h4>Badge</h4>

Display a small, colored badge.

```python
st.badge("New")
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.caption">

<Image pure alt="screenshot" src="/images/api/caption.jpg" />

<h4>Caption</h4>

Display text in small font.

```python
st.caption("This is written small caption text")
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.code">

<Image pure alt="screenshot" src="/images/api/code.jpg" />

<h4>Code block</h4>

Display a code block with optional syntax highlighting.

```python
st.code("a = 1234")
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.echo">

<Image pure alt="screenshot" src="/images/api/code.jpg" />

<h4>Echo</h4>

Display some code on the app, then execute it. Useful for tutorials.

```python
with st.echo():
  st.write('This code will be printed')
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.text">

<Image pure alt="screenshot" src="/images/api/text.jpg" />

<h4>Preformatted text</h4>

Write fixed-width and preformatted text.

```python
st.text("Hello world")
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.latex">

<Image pure alt="screenshot" src="/images/api/latex.jpg" />

<h4>LaTeX</h4>

Display mathematical expressions formatted as LaTeX.

```python
st.latex("\int a x^2 \,dx")
```

</RefCard><RefCard href="/develop/api-reference/text/st.divider">

<Image pure alt="screenshot" src="/images/api/divider.jpg" />

<h4>Divider</h4>

Display a horizontal rule.

```python
st.divider()
```

</RefCard>
</TileContainer>

## Utilities

<TileContainer>
<RefCard href="/develop/api-reference/text/st.help">

<h4>Get help</h4>

Display object’s doc string, nicely formatted.

```python
st.help(st.write)
st.help(pd.DataFrame)
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.html">

<h4>Render HTML</h4>

Renders HTML strings to your app.

```python
st.html("<p>Foo bar.</p>")
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.iframe">

<h4>Iframe</h4>

Display content in an iframe

```python
st.iframe("https://docs.streamlit.io")
st.iframe("<p>Streamlit is cool.</p>")
st.iframe("my_content.html")
```

</RefCard>
</TileContainer>
