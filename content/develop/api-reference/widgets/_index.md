---
title: Input widgets
slug: /develop/api-reference/widgets
description: Add interactivity to Streamlit apps with input widgets including buttons, sliders, text inputs, selectboxes, file uploaders, and more interactive components.
keywords: input widgets, interactive widgets, buttons, sliders, text input, selectbox, checkbox, radio, file upload, user input, form controls, interactive elements
---

# Input widgets

With widgets, Streamlit allows you to bake interactivity directly into your apps with buttons, sliders, text inputs, and more.

## Button elements

<TileContainer>
<RefCard href="/develop/api-reference/widgets/st.button">

<Image pure alt="screenshot" src="/images/api/button.svg" />

<h4>Button</h4>

Display a button widget.

```python
clicked = st.button("Click me")
```

</RefCard>

<RefCard href="/develop/api-reference/widgets/st.download_button">

<Image pure alt="screenshot" src="/images/api/download_button.svg" />

<h4>Download button</h4>

Display a download button widget.

```python
st.download_button("Download file", file)
```

</RefCard>

<RefCard href="/develop/api-reference/execution-flow/st.form_submit_button">

<Image pure alt="screenshot" src="/images/api/form_submit_button.svg" />

<h4>Form button</h4>

Display a form submit button. For use with `st.form`.

```python
st.form_submit_button("Sign up")
```

</RefCard>

<RefCard href="/develop/api-reference/widgets/st.link_button">

<Image pure alt="screenshot" src="/images/api/link_button.svg" />

<h4>Link button</h4>

Display a link button.

```python
st.link_button("Go to gallery", url)
```

</RefCard>

<RefCard href="/develop/api-reference/widgets/st.menu_button">

<Image pure alt="screenshot" src="/images/api/menu_button.jpg" />

<h4>Menu button</h4>

Display a menu button.

```python
st.menu_button("Export", options=["CSV", "JSON", "PDF"])
```

</RefCard>

<RefCard href="/develop/api-reference/widgets/st.page_link">

<Image pure alt="screenshot" src="/images/api/page_link.jpg" />

<h4>Page link</h4>

Display a link to another page in a multipage app.

```python
st.page_link("app.py", label="Home", icon="🏠")
st.page_link("pages/profile.py", label="My profile")
```

</RefCard>

</TileContainer>

## Selection elements

<TileContainer>

<RefCard href="/develop/api-reference/widgets/st.checkbox">

<Image pure alt="screenshot" src="/images/api/checkbox.jpg" />

<h4>Checkbox</h4>

Display a checkbox widget.

```python
selected = st.checkbox("I agree")
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.color_picker">

<Image pure alt="screenshot" src="/images/api/color_picker.jpg" />

<h4>Color picker</h4>

Display a color picker widget.

```python
color = st.color_picker("Pick a color")
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.feedback">

<Image pure alt="screenshot" src="/images/api/feedback.jpg" />

<h4>Feedback</h4>

Display a rating or sentiment button group.

```python
st.feedback("stars")
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.multiselect">

<Image pure alt="screenshot" src="/images/api/multiselect.jpg" />

<h4>Multiselect</h4>

Display a multiselect widget. The multiselect widget starts as empty.

```python
choices = st.multiselect("Buy", ["milk", "apples", "potatoes"])
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.pills">

<Image pure alt="screenshot" src="/images/api/pills.jpg" />

<h4>Pills</h4>

Display a pill-button selection widget.

```python
st.pills("Tags", ["Sports", "AI", "Politics"])
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.radio">

<Image pure alt="screenshot" src="/images/api/radio.jpg" />

<h4>Radio</h4>

Display a radio button widget.

```python
choice = st.radio("Pick one", ["cats", "dogs"])
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.segmented_control">

<Image pure alt="screenshot" src="/images/api/segmented_control.jpg" />

<h4>Segmented control</h4>

Display a segmented-button selection widget.

```python
st.segmented_control("Filter", ["Open", "Closed", "All"])
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.select_slider">

<Image pure alt="screenshot" src="/images/api/select_slider.jpg" />

<h4>Select slider</h4>

Display a slider widget to select items from a list.

```python
size = st.select_slider("Pick a size", ["S", "M", "L"])
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.selectbox">

<Image pure alt="screenshot" src="/images/api/selectbox.jpg" />

<h4>Selectbox</h4>

Display a select widget.

```python
choice = st.selectbox("Pick one", ["cats", "dogs"])
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.toggle">

<Image pure alt="screenshot" src="/images/api/toggle.jpg" />

<h4>Toggle</h4>

Display a toggle widget.

```python
activated = st.toggle("Activate")
```

</RefCard>

</TileContainer>

## Numeric input elements

<TileContainer>
<RefCard href="/develop/api-reference/widgets/st.number_input">

<Image pure alt="screenshot" src="/images/api/number_input.jpg" />

<h4>Number input</h4>

Display a numeric input widget.

```python
choice = st.number_input("Pick a number", 0, 10)
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.slider">

<Image pure alt="screenshot" src="/images/api/slider.jpg" />

<h4>Slider</h4>

Display a slider widget.

```python
number = st.slider("Pick a number", 0, 100)
```

</RefCard>

</TileContainer>

## Date and time input elements

<TileContainer>

<RefCard href="/develop/api-reference/widgets/st.date_input">

<Image pure alt="screenshot" src="/images/api/date_input.jpg" />

<h4>Date input</h4>

Display a date input widget.

```python
date = st.date_input("Your birthday")
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.datetime_input">

<Image pure alt="screenshot" src="/images/api/datetime_input.jpg" />

<h4>Datetime input</h4>

Display a datetime input widget.

```python
datetime = st.datetime_input("Schedule your event")
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.time_input">

<Image pure alt="screenshot" src="/images/api/time_input.jpg" />

<h4>Time input</h4>

Display a time input widget.

```python
time = st.time_input("Meeting time")
```

</RefCard>

</TileContainer>

## Text input elements

<TileContainer>

<RefCard href="/develop/api-reference/widgets/st.text_input">

<Image pure alt="screenshot" src="/images/api/text_input.jpg" />

<h4>Text input</h4>

Display a single-line text input widget.

```python
name = st.text_input("First name")
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.text_area">

<Image pure alt="screenshot" src="/images/api/text_area.jpg" />

<h4>Text area</h4>

Display a multi-line text input widget.

```python
text = st.text_area("Text to translate")
```

</RefCard>
<RefCard href="/develop/api-reference/chat/st.chat_input">

<Image pure alt="screenshot" src="/images/api/chat_input.jpg" />

<h4>Chat input</h4>

Display a chat input widget.

```python
prompt = st.chat_input("Say something")
if prompt:
    st.write(f"The user has sent: {prompt}")
```

</RefCard>

</TileContainer>

## Other input elements

<TileContainer>
<RefCard href="/develop/api-reference/widgets/st.pagination">

<Image pure alt="screenshot" src="/images/api/pagination.jpg" />

<h4>Pagination</h4>

Display a pagination widget.

```python
page = st.pagination(10)
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.audio_input">

<Image pure alt="screenshot" src="/images/api/audio_input.jpg" />

<h4>Audio input</h4>

Display a widget that allows users to record with their microphone.

```python
speech = st.audio_input("Record a voice message")
```

</RefCard>
<RefCard href="/develop/api-reference/data/st.data_editor">

<Image pure alt="screenshot" src="/images/api/data_editor.jpg" />

<h4>Data editor</h4>

Display a data editor widget.

```python
edited = st.data_editor(df, num_rows="dynamic")
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.file_uploader">

<Image pure alt="screenshot" src="/images/api/file_uploader.jpg" />

<h4>File uploader</h4>

Display a file uploader widget.

```python
data = st.file_uploader("Upload a CSV")
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.camera_input">

<Image pure alt="screenshot" src="/images/api/camera_input.jpg" />

<h4>Camera input</h4>

Display a widget that allows users to upload images directly from a camera.

```python
image = st.camera_input("Take a picture")
```

</RefCard>
</TileContainer>
