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


## Display text

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


## Display data

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


## Display charts

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


## Layouts and Containers
## Display progress and status
## Control flow
## Page options and settings
## Others
## Mutate data
## Optimize performance
