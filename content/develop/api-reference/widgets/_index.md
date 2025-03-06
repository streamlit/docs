---
title: Input widgets
slug: /develop/api-reference/widgets
---

# Input widgets

With widgets, Streamlit allows you to bake interactivity directly into your apps with buttons, sliders, text inputs, and more.

## Button elements

<TileContainer>
<RefCard href="/develop/api-reference/widgets/st.button">

<Image src="/images/api/button.svg" alt="screenshot" width={None} height={None} pure />

<h4>Button</h4>

Display a button widget.

```python
clicked = st.button("Click me")
```

</RefCard>

<RefCard href="/develop/api-reference/widgets/st.download_button">

<Image src="/images/api/download_button.svg" alt="screenshot" width={None} height={None} pure />

<h4>Download button</h4>

Display a download button widget.

```python
st.download_button("Download file", file)
```

</RefCard>

<RefCard href="/develop/api-reference/execution-flow/st.form_submit_button">

<Image src="/images/api/form_submit_button.svg" alt="screenshot" width={None} height={None} pure />

<h4>Form button</h4>

Display a form submit button. For use with `st.form`.

```python
st.form_submit_button("Sign up")
```

</RefCard>

<RefCard href="/develop/api-reference/widgets/st.link_button">

<Image src="/images/api/link_button.svg" alt="screenshot" width={None} height={None} pure />

<h4>Link button</h4>

Display a link button.

```python
st.link_button("Go to gallery", url)
```

</RefCard>

<RefCard href="/develop/api-reference/widgets/st.page_link">

<Image src="/images/api/page_link.jpg" alt="screenshot" width={862} height={862} pure />

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

<Image src="/images/api/checkbox.jpg" alt="screenshot" width={600} height={600} pure />

<h4>Checkbox</h4>

Display a checkbox widget.

```python
selected = st.checkbox("I agree")
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.color_picker">

<Image src="/images/api/color_picker.jpg" alt="screenshot" width={600} height={600} pure />

<h4>Color picker</h4>

Display a color picker widget.

```python
color = st.color_picker("Pick a color")
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.feedback">

<Image src="/images/api/feedback.jpg" alt="screenshot" width={862} height={862} pure />

<h4>Feedback</h4>

Display a rating or sentiment button group.

```python
st.feedback("stars")
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.multiselect">

<Image src="/images/api/multiselect.jpg" alt="screenshot" width={600} height={600} pure />

<h4>Multiselect</h4>

Display a multiselect widget. The multiselect widget starts as empty.

```python
choices = st.multiselect("Buy", ["milk", "apples", "potatoes"])
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.pills">

<Image src="/images/api/pills.jpg" alt="screenshot" width={862} height={862} pure />

<h4>Pills</h4>

Display a pill-button selection widget.

```python
st.pills("Tags", ["Sports", "AI", "Politics"])
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.radio">

<Image src="/images/api/radio.jpg" alt="screenshot" width={600} height={600} pure />

<h4>Radio</h4>

Display a radio button widget.

```python
choice = st.radio("Pick one", ["cats", "dogs"])
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.segmented_control">

<Image src="/images/api/segmented_control.jpg" alt="screenshot" width={862} height={862} pure />

<h4>Segmented control</h4>

Display a segmented-button selection widget.

```python
st.segmented_control("Filter", ["Open", "Closed", "All"])
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.select_slider">

<Image src="/images/api/select_slider.jpg" alt="screenshot" width={600} height={600} pure />

<h4>Select slider</h4>

Display a slider widget to select items from a list.

```python
size = st.select_slider("Pick a size", ["S", "M", "L"])
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.selectbox">

<Image src="/images/api/selectbox.jpg" alt="screenshot" width={600} height={600} pure />

<h4>Selectbox</h4>

Display a select widget.

```python
choice = st.selectbox("Pick one", ["cats", "dogs"])
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.toggle">

<Image src="/images/api/toggle.jpg" alt="screenshot" width={862} height={862} pure />

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

<Image src="/images/api/number_input.jpg" alt="screenshot" width={600} height={600} pure />

<h4>Number input</h4>

Display a numeric input widget.

```python
choice = st.number_input("Pick a number", 0, 10)
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.slider">

<Image src="/images/api/slider.jpg" alt="screenshot" width={600} height={600} pure />

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

<Image src="/images/api/date_input.jpg" alt="screenshot" width={600} height={600} pure />

<h4>Date input</h4>

Display a date input widget.

```python
date = st.date_input("Your birthday")
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.time_input">

<Image src="/images/api/time_input.jpg" alt="screenshot" width={600} height={600} pure />

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

<Image src="/images/api/text_input.jpg" alt="screenshot" width={600} height={600} pure />

<h4>Text input</h4>

Display a single-line text input widget.

```python
name = st.text_input("First name")
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.text_area">

<Image src="/images/api/text_area.jpg" alt="screenshot" width={600} height={600} pure />

<h4>Text area</h4>

Display a multi-line text input widget.

```python
text = st.text_area("Text to translate")
```

</RefCard>
<RefCard href="/develop/api-reference/chat/st.chat_input">

<Image src="/images/api/chat_input.jpg" alt="screenshot" width={1724} height={1724} pure />

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
<RefCard href="/develop/api-reference/widgets/st.audio_input">

<Image src="/images/api/audio_input.jpg" alt="screenshot" width={862} height={862} pure />

<h4>Audio input</h4>

Display a widget that allows users to record with their microphone.

```python
speech = st.audio_input("Record a voice message")
```

</RefCard>
<RefCard href="/develop/api-reference/data/st.data_editor">

<Image src="/images/api/data_editor.jpg" alt="screenshot" width={862} height={862} pure />

<h4>Data editor</h4>

Display a data editor widget.

```python
edited = st.data_editor(df, num_rows="dynamic")
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.file_uploader">

<Image src="/images/api/file_uploader.jpg" alt="screenshot" width={600} height={600} pure />

<h4>File uploader</h4>

Display a file uploader widget.

```python
data = st.file_uploader("Upload a CSV")
```

</RefCard>
<RefCard href="/develop/api-reference/widgets/st.camera_input">

<Image src="/images/api/camera_input.jpg" alt="screenshot" width={600} height={600} pure />

<h4>Camera input</h4>

Display a widget that allows users to upload images directly from a camera.

```python
image = st.camera_input("Take a picture")
```

</RefCard>
</TileContainer>

<ComponentSlider>

<ComponentCard href="https://github.com/okld/streamlit-elements">

<Image src="/images/api/components/elements.jpg" alt="screenshot" width={600} height={380} pure />

<h4>Streamlit Elements</h4>

Create a draggable and resizable dashboard in Streamlit. Created by [@okls](https://github.com/okls).

```python
from streamlit_elements import elements, mui, html

with elements("new_element"):
  mui.Typography("Hello world")
```

</ComponentCard>

<ComponentCard href="https://github.com/gagan3012/streamlit-tags">

<Image src="/images/api/components/tags.jpg" alt="screenshot" width={600} height={380} pure />

<h4>Tags</h4>

Add tags to your Streamlit apps. Created by [@gagan3012](https://github.com/gagan3012).

```python
from streamlit_tags import st_tags

st_tags(label='# Enter Keywords:', text='Press enter to add more', value=['Zero', 'One', 'Two'],
suggestions=['five', 'six', 'seven', 'eight', 'nine', 'three', 'eleven', 'ten', 'four'], maxtags = 4, key='1')
```

</ComponentCard>

<ComponentCard href="https://github.com/Wirg/stqdm">

<Image src="/images/api/components/stqdm.jpg" alt="screenshot" width={600} height={380} pure />

<h4>Stqdm</h4>

The simplest way to handle a progress bar in streamlit app. Created by [@Wirg](https://github.com/Wirg).

```python
from stqdm import stqdm

for _ in stqdm(range(50)):
    sleep(0.5)
```

</ComponentCard>

<ComponentCard href="https://github.com/innerdoc/streamlit-timeline">

<Image src="/images/api/components/timeline.jpg" alt="screenshot" width={600} height={380} pure />

<h4>Timeline</h4>

Display a Timeline in Streamlit apps using [TimelineJS](https://timeline.knightlab.com/). Created by [@innerdoc](https://github.com/innerdoc).

```python
from streamlit_timeline import timeline

with open('example.json', "r") as f:
  timeline(f.read(), height=800)
```

</ComponentCard>

<ComponentCard href="https://github.com/blackary/streamlit-camera-input-live">

<Image src="/images/api/components/camera-live.jpg" alt="screenshot" width={600} height={380} pure />

<h4>Camera input live</h4>

Alternative for st.camera_input which returns the webcam images live. Created by [@blackary](https://github.com/blackary).

```python
from camera_input_live import camera_input_live

image = camera_input_live()
st.image(value)
```

</ComponentCard>

<ComponentCard href="https://github.com/okld/streamlit-ace">

<Image src="/images/api/components/ace.jpg" alt="screenshot" width={600} height={380} pure />

<h4>Streamlit Ace</h4>

Ace editor component for Streamlit. Created by [@okld](https://github.com/okld).

```python
from streamlit_ace import st_ace

content = st_ace()
content
```

</ComponentCard>

<ComponentCard href="https://github.com/AI-Yash/st-chat">

<Image src="/images/api/components/chat.jpg" alt="screenshot" width={600} height={380} pure />

<h4>Streamlit Chat</h4>

Streamlit Component for a Chatbot UI. Created by [@AI-Yash](https://github.com/AI-Yash).

```python
from streamlit_chat import message

message("My message")
message("Hello bot!", is_user=True)  # align's the message to the right
```

</ComponentCard>

<ComponentCard href="https://github.com/victoryhb/streamlit-option-menu">

<Image src="/images/api/components/option-menu.jpg" alt="screenshot" width={600} height={380} pure />

<h4>Streamlit Option Menu</h4>

Select a single item from a list of options in a menu. Created by [@victoryhb](https://github.com/victoryhb).

```python
from streamlit_option_menu import option_menu

option_menu("Main Menu", ["Home", 'Settings'],
  icons=['house', 'gear'], menu_icon="cast", default_index=1)
```

</ComponentCard>

<ComponentCard href="https://extras.streamlit.app/">

<Image src="/images/api/components/extras-toggle.jpg" alt="screenshot" width={600} height={380} pure />

<h4>Streamlit Extras</h4>

A library with useful Streamlit extras. Created by [@arnaudmiribel](https://github.com/arnaudmiribel/).

```python
from streamlit_extras.stoggle import stoggle

stoggle(
    "Click me!", """🥷 Surprise! Here's some additional content""",)
```

</ComponentCard>

</ComponentSlider>
