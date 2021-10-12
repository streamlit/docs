---
title: Text elements
slug: /library/api-reference/text
---

# Text elements

Streamlit apps usually start with a call to `st.title` to set the
app's title. After that, there are 2 heading levels you can use:
`st.header` and `st.subheader`.

Pure text is entered with `st.text`, and Markdown with
`st.markdown`.

We also offer a "swiss-army knife" command called `st.write`, which accepts
multiple arguments, and multiple data types. And as described above, you can
also use [magic commands](/library/api-reference/write-magic/magic) in place of `st.write`.

<TileContainer>
<RefCard href="/library/api-reference/text/st.markdown">

<Image pure alt="screenshot" src="/images/api/markdown.jpg" />

#### Markdown

Display string formatted as Markdown.

```python
st.markdown("Hello **world**!")
```

</RefCard>
<RefCard href="/library/api-reference/text/st.title">

<Image pure alt="screenshot" src="/images/api/title.jpg" />

#### Title

Display text in title formatting.

```python
st.title("The app title")
```

</RefCard>
<RefCard href="/library/api-reference/text/st.header">

<Image pure alt="screenshot" src="/images/api/header.jpg" />

#### Header

Display text in header formatting.

```python
st.header("This is a header")
```

</RefCard>
<RefCard href="/library/api-reference/text/st.subheader">

<Image pure alt="screenshot" src="/images/api/subheader.jpg" />

#### Subheader

Display text in subheader formatting.

```python
st.subheader("This is a subheader")
```

</RefCard>
<RefCard href="/library/api-reference/text/st.caption">

<Image pure alt="screenshot" src="/images/api/caption.jpg" />

#### Caption

Display text in small font.

```python
st.caption("This is written small caption text")
```

</RefCard>
<RefCard href="/library/api-reference/text/st.code">

<Image pure alt="screenshot" src="/images/api/code.jpg" />

#### Code block

Display a code block with optional syntax highlighting.

```python
st.code("a = 1234")
```

</RefCard>
<RefCard href="/library/api-reference/text/st.text">

<Image pure alt="screenshot" src="/images/api/text.jpg" />

#### Preformatted text

Write fixed-width and preformatted text.

```python
st.text("Hello world")
```

</RefCard>
<RefCard href="/library/api-reference/text/st.latex">

<Image pure alt="screenshot" src="/images/api/latex.jpg" />

#### LaTeX

Display mathematical expressions formatted as LaTeX.

```python
st.latex("\int a x^2 \,dx")
```

</RefCard>
<RefCard href="/library/api-reference/text/st.echo">

<Image pure alt="screenshot" src="/images/api/echo.jpg" />

#### Echo

Display some code on the app, then execute it. Useful for tutorials.

```python
with st.echo():
  st.write('This code will be printed')
```

</RefCard>
</TileContainer>


