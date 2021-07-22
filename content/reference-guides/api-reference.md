---
title: API Reference
slug: /reference-guides/api-reference
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
<RefCard href="/reference-guides/api-reference/write-magic#write">

#### st.write

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.write("Hello **world**!")
st.write(my_data_frame)
st.write(my_mpl_figure)
```

</RefCard>
<RefCard href="/reference-guides/api-reference/write-magic#magic">

#### Magic

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
"Hello **world**!"
my_data_frame
my_mpl_figure
```

</RefCard>
</TileContainer>


## Text elements

<TileContainer>
<RefCard href="/reference-guides/api-reference/text#markdown">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Markdown

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.markdown("Hello **world**!")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/text#title">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Title

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.title("The app title")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/text#header">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Header

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.header("This is a header")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/text#subheader">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Subheader

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.subheader("This is a subheader")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/text#caption">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Caption

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.caption("This is written small caption text")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/text#code">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Code block

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.code("a = 1234")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/text#text">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Preformatted text

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.text("Hello world")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/text#latex">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### LaTeX

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.latex("$\int a x^2 \,dx$")
```

</RefCard>
</TileContainer>


## Data display elements

<TileContainer>
<RefCard href="/reference-guides/api-reference/data#dataframe">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Dataframes

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.dataframe(my_data_frame)
```

</RefCard>
<RefCard href="/reference-guides/api-reference/data#table">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Static tables

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.table(my_data_frame)
```

</RefCard>
<RefCard href="/reference-guides/api-reference/data#json">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Dicts and JSON

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.json(my_data_frame)
```

</RefCard>
</TileContainer>


## Chart elements

<TileContainer>
<RefCard href="/reference-guides/api-reference/charts#line_chart">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Simple line charts

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.line_chart(my_data_frame)
```

</RefCard>
<RefCard href="/reference-guides/api-reference/charts#area_chart">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Simple area charts

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.area_chart(my_data_frame)
```

</RefCard>
<RefCard href="/reference-guides/api-reference/charts#bar_chart">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Simple bar charts

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.bar_chart(my_data_frame)
```

</RefCard>
<RefCard href="/reference-guides/api-reference/charts#map">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Scatterplots on maps

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.map(my_data_frame)
```

</RefCard>
<RefCard href="/reference-guides/api-reference/charts#pyplot">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Matplotlib

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.pyplot(my_mpl_figure)
```

</RefCard>
<RefCard href="/reference-guides/api-reference/charts#altair_chart">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Altair

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.altair_chart(my_altair_chart)
```

</RefCard>
<RefCard href="/reference-guides/api-reference/charts#vega_lite_chart">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Vega-Lite

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.vega_lite_chart(my_vega_lite_chart)
```

</RefCard>
<RefCard href="/reference-guides/api-reference/charts#plotly_chart">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Plotly

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.plotly_chart(my_plotly_chart)
```

</RefCard>
<RefCard href="/reference-guides/api-reference/charts#bokeh_chart">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Bokeh

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.bokeh_chart(my_bokeh_chart)
```

</RefCard>
<RefCard href="/reference-guides/api-reference/charts#pydeck_chart">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### PyDeck

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.pydeck_chart(my_pydeck_chart)
```

</RefCard>
<RefCard href="/reference-guides/api-reference/charts#graphviz_chart">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### GraphViz

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.graphviz_chart(my_graphviz_spec)
```

</RefCard>
</TileContainer>


## Input widgets

<TileContainer>
<RefCard href="/reference-guides/api-reference/widgets#button">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Button

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
clicked = st.button("Click me")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/widgets#checkbox">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Checkbox

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
selected = st.checkbox("I agree")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/widgets#radio">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Radio

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
choice = st.radio("Pick one", ["cats", "dogs"])
```

</RefCard>
<RefCard href="/reference-guides/api-reference/widgets#selectbox">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Selectbox

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
choice = st.selectbox("Pick one", ["cats", "dogs"])
```

</RefCard>
<RefCard href="/reference-guides/api-reference/widgets#multiselect">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Multiselect

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
choices = st.multiselect("Buy", ["milk", "apples", "potatoes"])
```

</RefCard>
<RefCard href="/reference-guides/api-reference/widgets#slider">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Slider

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
number = st.slider("Pick a number", 0, 100)
```

</RefCard>
<RefCard href="/reference-guides/api-reference/widgets#select_slider">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Select-slider

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
size = st.select_slider("Pick a size", ["S", "M", "L"])
```

</RefCard>
<RefCard href="/reference-guides/api-reference/widgets#text_input">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Text input

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
name = st.text_input("First name")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/widgets#number_input">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Number input

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
choice = st.number_input("Pick a number", 0, 10)
```

</RefCard>
<RefCard href="/reference-guides/api-reference/widgets#text_area">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Text-area

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
text = st.text_area("Text to translate")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/widgets#date_input">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Date input

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
date = st.date_input("Your birthday")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/widgets#time_input">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Time input

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
time = st.time_input("Meeting time")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/widgets#file_uploader">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### File Uploader

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
photo = st.file_uploader("Upload a photo")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/widgets#color_picker">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Color picker

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
color = st.color_picker("Pick a color")
```

</RefCard>
</TileContainer>


## Media elements

<TileContainer>
<RefCard href="/reference-guides/api-reference/media#image">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Image

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.image(numpy_array)
st.image(image_bytes)
st.image(file)
st.image("https://example.com/myimage.png")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/media#audio">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Audio

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.audio(numpy_array)
st.audio(audio_bytes)
st.audio(file)
st.audio("https://example.com/myaudio.mp3", format="audio/mp3")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/media#video">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Video

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

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
<RefCard href="/reference-guides/api-reference/layout#beta_columns">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Columns

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
col1, col2 = st.beta_columns(2)
col1.write("this is column 1")
col2.write("this is column 2")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/layout#beta_expander">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Expander

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
with st.beta_expander("Open to see more"):
  st.write("This is more content")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/layout#beta_container">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Container

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
c = st.container()
st.write("This will show last")
c.write("This will show first")
c.write("This will show second")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/layout#empty">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Empty

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

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
<RefCard href="/reference-guides/api-reference/status#progress">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Progress bar

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
for i in range(101):
  do_something()
  st.progress(i)
```

</RefCard>
<RefCard href="/reference-guides/api-reference/status#spinner">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Spinner

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.spinner("Please wait...")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/status#balloons">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Balloons

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
do_something()

# Celebrate when all done!
st.balloons()
```

</RefCard>
<RefCard href="/reference-guides/api-reference/status#error">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Error box

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.error("We encountered an error")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/status#warning">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Warning box

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.warning("Unable to fetch image. Skipping...")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/status#info">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Info box

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.info("Dataset is updated every day at midnight.")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/status#success">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Success box

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.success("Match found!")
```

</RefCard>
<RefCard href="/reference-guides/api-reference/status#exception">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Exception output

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
e = RuntimeError("This is an exception of type RuntimeError")
st.exception(e)
```

</RefCard>
</TileContainer>


## Control flow

<TileContainer>
<RefCard href="/reference-guides/api-reference/control-flow#stop">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Stop execution

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.stop()
```

</RefCard>
<RefCard href="/reference-guides/api-reference/control-flow#form">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Forms

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
with st.form():
  username = st.text_input("Username")
  password = st.text_input("Password")
  st.form_submit_button("Login")
```

</RefCard>
</TileContainer>


## Utilities

<TileContainer>
<RefCard href="/reference-guides/api-reference/utilities#set_page_config">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Set page title, favicon, and more

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.set_page_config(
  title="My app",
  favicon=":shark:",
)
```

</RefCard>
<RefCard href="/reference-guides/api-reference/utilities#help">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Get help

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
st.help(st.write)
st.help(pd.DataFrame)
```

</RefCard>
</TileContainer>


## Mutate charts

<TileContainer>
<RefCard href="/reference-guides/api-reference/mutate#add_rows">

<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Add rows

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
element = st.line_chart(df)
element.add_rows(df_with_extra_rows)
```

</RefCard>
</TileContainer>


## Optimize performance

<TileContainer>
<RefCard href="/reference-guides/api-reference/performance#cache">

#### Caching

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum amet at est quis id nisl sed vitae.

```python
@st.cache(ttl=3600)
def run_long_computation(arg1, arg2):
  # Do stuff here
  return computation_output
```

</RefCard>
</TileContainer>
