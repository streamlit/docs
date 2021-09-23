---
title: Input widgets
slug: /library/api-reference/widgets
---

# Input widgets

With widgets, Streamlit allows you to bake interactivity directly into your apps with buttons, sliders, text inputs, and more.

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