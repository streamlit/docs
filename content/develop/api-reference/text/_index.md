---
title: Text elements
slug: /develop/api-reference/text
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

<Image src="/images/api/markdown.jpg" alt="screenshot" width={600} height={568} pure />

<h4>Markdown</h4>

Display string formatted as Markdown.

```python
st.markdown("Hello **world**!")
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.title">

<Image src="/images/api/title.jpg" alt="screenshot" width={600} height={600} pure />

<h4>Title</h4>

Display text in title formatting.

```python
st.title("The app title")
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.header">

<Image src="/images/api/header.jpg" alt="screenshot" width={600} height={600} pure />

<h4>Header</h4>

Display text in header formatting.

```python
st.header("This is a header")
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.subheader">

<Image src="/images/api/subheader.jpg" alt="screenshot" width={600} height={600} pure />

<h4>Subheader</h4>

Display text in subheader formatting.

```python
st.subheader("This is a subheader")
```

</RefCard>
</TileContainer>

## Formatted text

<TileContainer>

<RefCard href="/develop/api-reference/text/st.caption">

<Image src="/images/api/caption.jpg" alt="screenshot" width={600} height={600} pure />

<h4>Caption</h4>

Display text in small font.

```python
st.caption("This is written small caption text")
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.code">

<Image src="/images/api/code.jpg" alt="screenshot" width={600} height={568} pure />

<h4>Code block</h4>

Display a code block with optional syntax highlighting.

```python
st.code("a = 1234")
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.echo">

<Image src="/images/api/code.jpg" alt="screenshot" width={600} height={568} pure />

<h4>Echo</h4>

Display some code on the app, then execute it. Useful for tutorials.

```python
with st.echo():
  st.write('This code will be printed')
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.text">

<Image src="/images/api/text.jpg" alt="screenshot" width={600} height={568} pure />

<h4>Preformatted text</h4>

Write fixed-width and preformatted text.

```python
st.text("Hello world")
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.latex">

<Image src="/images/api/latex.jpg" alt="screenshot" width={600} height={568} pure />

<h4>LaTeX</h4>

Display mathematical expressions formatted as LaTeX.

```python
st.latex("\int a x^2 \,dx")
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.divider">

<Image src="/images/api/divider.jpg" alt="screenshot" width={600} height={600} pure />

<h4>Divider</h4>

Display a horizontal rule.

```python
st.divider()
```

</RefCard>
</TileContainer>

## Utilities

<TileContainer>
<RefCard href="/develop/api-reference/text/st.help" size="half">

<h4>Get help</h4>

Display object’s doc string, nicely formatted.

```python
st.help(st.write)
st.help(pd.DataFrame)
```

</RefCard>
<RefCard href="/develop/api-reference/text/st.html" size="half">

<h4>Render HTML</h4>

Renders HTML strings to your app.

```python
st.html("<p>Foo bar.</p>")
```

</RefCard>
</TileContainer>

<ComponentSlider>
<ComponentCard href="https://github.com/tvst/st-annotated-text">

<Image src="/images/api/components/annotated-text.jpg" alt="screenshot" width={600} height={380} pure />

<h4>Annotated text</h4>

Display annotated text in Streamlit apps. Created by [@tvst](https://github.com/tvst).

```python
annotated_text("This ", ("is", "verb"), " some ", ("annotated", "adj"), ("text", "noun"), " for those of ", ("you", "pronoun"), " who ", ("like", "verb"), " this sort of ", ("thing", "noun"), ".")
```

</ComponentCard>

<ComponentCard href="https://github.com/andfanilo/streamlit-drawable-canvas">

<Image src="/images/api/components/drawable-canvas.jpg" alt="screenshot" width={600} height={380} pure />

<h4>Drawable Canvas</h4>

Provides a sketching canvas using [Fabric.js](http://fabricjs.com/). Created by [@andfanilo](https://github.com/andfanilo).

```python
st_canvas(fill_color="rgba(255, 165, 0, 0.3)", stroke_width=stroke_width, stroke_color=stroke_color, background_color=bg_color, background_image=Image.open(bg_image) if bg_image else None, update_streamlit=realtime_update, height=150, drawing_mode=drawing_mode, point_display_radius=point_display_radius if drawing_mode == 'point' else 0, key="canvas",)
```

</ComponentCard>

<ComponentCard href="https://github.com/gagan3012/streamlit-tags">

<Image src="/images/api/components/tags.jpg" alt="screenshot" width={600} height={380} pure />

<h4>Tags</h4>

Add tags to your Streamlit apps. Created by [@gagan3012](https://github.com/gagan3012).

```python
st_tags(label='# Enter Keywords:', text='Press enter to add more', value=['Zero', 'One', 'Two'], suggestions=['five', 'six', 'seven', 'eight', 'nine', 'three', 'eleven', 'ten', 'four'], maxtags = 4, key='1')
```

</ComponentCard>

<ComponentCard href="https://github.com/JohnSnowLabs/nlu">

<Image src="/images/api/components/nlu.jpg" alt="screenshot" width={600} height={380} pure />

<h4>NLU</h4>

Apply text mining on a dataframe. Created by [@JohnSnowLabs](https://github.com/JohnSnowLabs/).

```python
nlu.load('sentiment').predict('I love NLU! <3')
```

</ComponentCard>

<ComponentCard href="https://extras.streamlit.app/">

<Image src="/images/api/components/extras-mentions.jpg" alt="screenshot" width={600} height={380} pure />

<h4>Streamlit Extras</h4>

A library with useful Streamlit extras. Created by [@arnaudmiribel](https://github.com/arnaudmiribel/).

```python
mention(label="An awesome Streamlit App", icon="streamlit",  url="https://extras.streamlit.app",)
```

</ComponentCard>
</ComponentSlider>
