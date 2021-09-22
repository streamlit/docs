---
title: API Reference
slug: /library/api-reference
next: caching
previous: index.md
---

# API reference

Streamlit makes it easy for you to visualize, mutate, and share data. The API
reference is organized by activity type, like displaying data or optimizing
performance. Each section includes methods associated with the activity type,
including examples.

So browse our API below and click to learn move about any of our available commands!


## Display almost anything

<TileContainer>
<RefCard href="/library/api-reference/write-magic/st.write">

#### st.write

Write arguments to the app.

```python
st.write("Hello **world**!")
st.write(my_data_frame)
st.write(my_mpl_figure)
```

</RefCard>
<RefCard href="/library/api-reference/write-magic/magic">

#### Magic

Any time Streamlit sees either a variable or literal value on its own line, it automatically writes that to your app using `st.write`

```python
"Hello **world**!"
my_data_frame
my_mpl_figure
```

</RefCard>
</TileContainer>


## Text elements

<TileContainer>
<RefCard href="/library/api-reference/text/st.markdown">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Markdown

Display string formatted as Markdown.

```python
st.markdown("Hello **world**!")
```

</RefCard>
<RefCard href="/library/api-reference/text/st.title">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Title

Display text in title formatting.

```python
st.title("The app title")
```

</RefCard>
<RefCard href="/library/api-reference/text/st.header">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Header

Display text in header formatting.

```python
st.header("This is a header")
```

</RefCard>
<RefCard href="/library/api-reference/text/st.subheader">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Subheader

Display text in subheader formatting.

```python
st.subheader("This is a subheader")
```

</RefCard>
<RefCard href="/library/api-reference/text/st.caption">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Caption

Display text in small font.

```python
st.caption("This is written small caption text")
```

</RefCard>
<RefCard href="/library/api-reference/text/st.code">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Code block

Display a code block with optional syntax highlighting.

```python
st.code("a = 1234")
```

</RefCard>
<RefCard href="/library/api-reference/text/st.text">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Preformatted text

Write fixed-width and preformatted text.

```python
st.text("Hello world")
```

</RefCard>
<RefCard href="/library/api-reference/text/st.latex">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### LaTeX

Display mathematical expressions formatted as LaTeX.

```python
st.latex("$\int a x^2 \,dx$")
```

</RefCard>
<RefCard href="/library/api-reference/text/st.echo">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Echo

Use in a `with` block to draw some code on the app, then execute it.

```python
with st.echo():
  st.write('This code will be printed')
```

</RefCard>
</TileContainer>


## Data display elements

<TileContainer>
<RefCard href="/library/api-reference/data/st.dataframe">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Dataframes

Display a dataframe as an interactive table.

```python
st.dataframe(my_data_frame)
```

</RefCard>
<RefCard href="/library/api-reference/data/st.table">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Static tables

Display a static table.

```python
st.table(my_data_frame)
```

</RefCard>
<RefCard href="/library/api-reference/data/st.metric">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Metrics

Display a metric in big bold font, with an optional indicator of how the metric changed.

```python
st.metric("My metric", 42, 2)
```

</RefCard>
<RefCard href="/library/api-reference/data/st.json">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Dicts and JSON

Display object or string as a pretty-printed JSON string.

```python
st.json(my_data_frame)
```

</RefCard>
</TileContainer>


## Chart elements

<TileContainer>
<RefCard href="/library/api-reference/charts/st.line_chart">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Simple line charts

Display a line chart.

```python
st.line_chart(my_data_frame)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.area_chart">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Simple area charts

Display an area chart.

```python
st.area_chart(my_data_frame)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.bar_chart">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Simple bar charts

Display a bar chart.

```python
st.bar_chart(my_data_frame)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.map">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Scatterplots on maps

Display a map with points on it.

```python
st.map(my_data_frame)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.pyplot">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Matplotlib

Display a matplotlib.pyplot figure.

```python
st.pyplot(my_mpl_figure)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.altair_chart">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Altair

Display a chart using the Altair library.

```python
st.altair_chart(my_altair_chart)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.vega_lite_chart">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Vega-Lite

Display a chart using the Vega-Lite library.

```python
st.vega_lite_chart(my_vega_lite_chart)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.plotly_chart">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Plotly

Display an interactive Plotly chart.

```python
st.plotly_chart(my_plotly_chart)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.bokeh_chart">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Bokeh

Display an interactive Bokeh chart.

```python
st.bokeh_chart(my_bokeh_chart)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.pydeck_chart">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### PyDeck

Draw a chart using the PyDeck library.

```python
st.pydeck_chart(my_pydeck_chart)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.graphviz_chart">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### GraphViz

Display a graph using the dagre-d3 library.

```python
st.graphviz_chart(my_graphviz_spec)
```

</RefCard>
</TileContainer>


## Input widgets

<TileContainer>
<RefCard href="/library/api-reference/widgets/st.button">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Button

Display a button widget.

```python
clicked = st.button("Click me")
```

</RefCard>
<RefCard href="/library/api-reference/widgets/st.download_button">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Download button

Display a download button widget.

```python
st.download_button("Download file", file)
```

</RefCard>
<RefCard href="/library/api-reference/widgets/st.checkbox">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Checkbox

Display a checkbox widget.

```python
selected = st.checkbox("I agree")
```

</RefCard>
<RefCard href="/library/api-reference/widgets/st.radio">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Radio

Display a radio button widget.

```python
choice = st.radio("Pick one", ["cats", "dogs"])
```

</RefCard>
<RefCard href="/library/api-reference/widgets/st.selectbox">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Selectbox

Display a select widget.

```python
choice = st.selectbox("Pick one", ["cats", "dogs"])
```

</RefCard>
<RefCard href="/library/api-reference/widgets/st.multiselect">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Multiselect

Display a multiselect widget. The multiselect widget starts as empty.

```python
choices = st.multiselect("Buy", ["milk", "apples", "potatoes"])
```

</RefCard>
<RefCard href="/library/api-reference/widgets/st.slider">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Slider

Display a slider widget.

```python
number = st.slider("Pick a number", 0, 100)
```

</RefCard>
<RefCard href="/library/api-reference/widgets/st.select_slider">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Select-slider

Display a slider widget to select items from a list.

```python
size = st.select_slider("Pick a size", ["S", "M", "L"])
```

</RefCard>
<RefCard href="/library/api-reference/widgets/st.text_input">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Text input

Display a single-line text input widget.

```python
name = st.text_input("First name")
```

</RefCard>
<RefCard href="/library/api-reference/widgets/st.number_input">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Number input

Display a numeric input widget.

```python
choice = st.number_input("Pick a number", 0, 10)
```

</RefCard>
<RefCard href="/library/api-reference/widgets/st.text_area">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Text-area

Display a multi-line text input widget.

```python
text = st.text_area("Text to translate")
```

</RefCard>
<RefCard href="/library/api-reference/widgets/st.date_input">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Date input

Display a date input widget.

```python
date = st.date_input("Your birthday")
```

</RefCard>
<RefCard href="/library/api-reference/widgets/st.time_input">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Time input

Display a time input widget.

```python
time = st.time_input("Meeting time")
```

</RefCard>
<RefCard href="/library/api-reference/widgets/st.file_uploader">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### File Uploader

Display a file uploader widget.

```python
photo = st.file_uploader("Upload a photo")
```

</RefCard>
<RefCard href="/library/api-reference/widgets/st.color_picker">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Color picker

Display a color picker widget.

```python
color = st.color_picker("Pick a color")
```

</RefCard>
</TileContainer>


## Media elements

<TileContainer>
<RefCard href="/library/api-reference/media/st.image">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Image

Display an image or list of images.

```python
st.image(numpy_array)
st.image(image_bytes)
st.image(file)
st.image("https://example.com/myimage.png")
```

</RefCard>
<RefCard href="/library/api-reference/media/st.audio">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Audio

Display an audio player.

```python
st.audio(numpy_array)
st.audio(audio_bytes)
st.audio(file)
st.audio("https://example.com/myaudio.mp3", format="audio/mp3")
```

</RefCard>
<RefCard href="/library/api-reference/media/st.video">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Video

Display a video player.

```python
st.video(numpy_array)
st.video(video_bytes)
st.video(file)
st.video("https://example.com/myvideo.mp4", format="video/mp4")
```

</RefCard>
</TileContainer>


## Layouts and Containers

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


## Display progress and status

<TileContainer>
<RefCard href="/library/api-reference/status/st.progress">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Progress bar

Display a progress bar.

```python
for i in range(101):
  do_something()
  st.progress(i)
```

</RefCard>
<RefCard href="/library/api-reference/status/st.spinner">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Spinner

Temporarily displays a message while executing a block of code.

```python
st.spinner("Please wait...")
```

</RefCard>
<RefCard href="/library/api-reference/status/st.balloons">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Balloons

Draw celebratory balloons.

```python
do_something()

# Celebrate when all done!
st.balloons()
```

</RefCard>
<RefCard href="/library/api-reference/status/st.error">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Error box

Display error message.

```python
st.error("We encountered an error")
```

</RefCard>
<RefCard href="/library/api-reference/status/st.warning">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Warning box

Display warning message.

```python
st.warning("Unable to fetch image. Skipping...")
```

</RefCard>
<RefCard href="/library/api-reference/status/st.info">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Info box

Display an informational message.

```python
st.info("Dataset is updated every day at midnight.")
```

</RefCard>
<RefCard href="/library/api-reference/status/st.success">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Success box

Display a success message.

```python
st.success("Match found!")
```

</RefCard>
<RefCard href="/library/api-reference/status/st.exception">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Exception output

Display an exception.

```python
e = RuntimeError("This is an exception of type RuntimeError")
st.exception(e)
```

</RefCard>
</TileContainer>


## Control flow

<TileContainer>
<RefCard href="/library/api-reference/control-flow/st.stop">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Stop execution

Stops execution immediately.

```python
st.stop()
```

</RefCard>
<RefCard href="/library/api-reference/control-flow/st.form">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Forms

Create a form that batches elements together with a “Submit” button.

```python
with st.form():
  username = st.text_input("Username")
  password = st.text_input("Password")
  st.form_submit_button("Login")
```

</RefCard>
</TileContainer>


## Session State

<TileContainer>
<RefCard href="/library/api-reference/session-state">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Session State

Session State is a way to share variables between reruns, for each user session.

```python
st.session_state['key'] = value
```

</RefCard>
</TileContainer>


## Utilities

<TileContainer>
<RefCard href="/library/api-reference/utilities/st.set_page_config">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Set page title, favicon, and more

Configures the default settings of the page.

```python
st.set_page_config(
  title="My app",
  favicon=":shark:",
)
```

</RefCard>
<RefCard href="/library/api-reference/utilities/st.help">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Get help

Display object’s doc string, nicely formatted.

```python
st.help(st.write)
st.help(pd.DataFrame)
```

</RefCard>
</TileContainer>


## Mutate charts

<TileContainer>
<RefCard href="/library/api-reference/mutate">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Add rows

Concatenate a dataframe to the bottom of the current one.

```python
element = st.line_chart(df)
element.add_rows(df_with_extra_rows)
```

</RefCard>
</TileContainer>


## Optimize performance

<TileContainer>
<RefCard href="/library/api-reference/performance/st.cache">

#### Caching

Function decorator to memoize function executions.

```python
@st.cache(ttl=3600)
def run_long_computation(arg1, arg2):
  # Do stuff here
  return computation_output
```

</RefCard>
</TileContainer>
