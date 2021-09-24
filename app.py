import streamlit as st
import pandas as pd
from generate_app import make_streamlit_app_from_md_docs

st.sidebar.write('# ✍️ __Docs to Streamlit__ app!')
st.sidebar.write('''This app was generated using script `generate_app.py`.  

It takes Markdown files for docs in `content/library/api` and generate a Streamlit app out of them.

To avoid execution errors, we disregarded docs cards where code blocks contained following patterns:
- `download_button`
- `line_chart`
- `my_`
- `do_something`
- `set_page_config`
- `stop`
- `numpy_array`
- `run_long_computation`
- `echo`
'''
)

refresh = st.sidebar.button("Refresh docs")
if refresh:
    make_streamlit_app_from_md_docs()

st.write('''### Columns

Insert containers laid out as side-by-side columns.

''')


with st.echo():
    col1, col2 = st.columns(2)
    col1.write("this is column 1")
    col2.write("this is column 2")

st.write('''### Expander

Insert a multi-element container that can be expanded/collapsed.

''')


with st.echo():
    with st.expander("Open to see more"):
        st.write("This is more content")

st.write('''### Container

Insert a multi-element container.

''')


with st.echo():
    c = st.container()
    st.write("This will show last")
    c.write("This will show first")
    c.write("This will show second")

st.write('''### Empty

Insert a single-element container.

''')


with st.echo():
    c = st.empty()
    st.write("This will show last")
    c.write("This will be replaced")
    c.write("This will show first")

st.write('''### Spinner

Temporarily displays a message while executing a block of code.

''')


with st.echo():
    st.spinner("Please wait...")

st.write('''### Error box

Display error message.

''')


with st.echo():
    st.error("We encountered an error")

st.write('''### Warning box

Display warning message.

''')


with st.echo():
    st.warning("Unable to fetch image. Skipping...")

st.write('''### Info box

Display an informational message.

''')


with st.echo():
    st.info("Dataset is updated every day at midnight.")

st.write('''### Success box

Display a success message.

''')


with st.echo():
    st.success("Match found!")

st.write('''### Exception output

Display an exception.

''')


with st.echo():
    e = RuntimeError("This is an exception of type RuntimeError")
    st.exception(e)

st.write('''### Get help

Display object’s doc string, nicely formatted.

''')


with st.echo():
    st.help(st.write)
    st.help(pd.DataFrame)

st.write('''### Markdown

Display string formatted as Markdown.

''')


with st.echo():
    st.markdown("Hello **world**!")

st.write('''### Title

Display text in title formatting.

''')


with st.echo():
    st.title("The app title")

st.write('''### Header

Display text in header formatting.

''')


with st.echo():
    st.header("This is a header")

st.write('''### Subheader

Display text in subheader formatting.

''')


with st.echo():
    st.subheader("This is a subheader")

st.write('''### Caption

Display text in small font.

''')


with st.echo():
    st.caption("This is written small caption text")

st.write('''### Code block

Display a code block with optional syntax highlighting.

''')


with st.echo():
    st.code("a = 1234")

st.write('''### Preformatted text

Write fixed-width and preformatted text.

''')


with st.echo():
    st.text("Hello world")

st.write('''### LaTeX

Display mathematical expressions formatted as LaTeX.

''')


with st.echo():
    st.latex("$\int a x^2 \,dx$")

st.write('''### Metrics

Display a metric in big bold font, with an optional indicator of how the metric changed.

''')


with st.echo():
    st.metric("My metric", 42, 2)

st.write('''### Button

Display a button widget.

''')


with st.echo():
    clicked = st.button("Click me")

st.write('''### Checkbox

Display a checkbox widget.

''')


with st.echo():
    selected = st.checkbox("I agree")

st.write('''### Radio

Display a radio button widget.

''')


with st.echo():
    choice = st.radio("Pick one", ["cats", "dogs"])

st.write('''### Selectbox

Display a select widget.

''')


with st.echo():
    choice = st.selectbox("Pick one", ["cats", "dogs"])

st.write('''### Multiselect

Display a multiselect widget. The multiselect widget starts as empty.

''')


with st.echo():
    choices = st.multiselect("Buy", ["milk", "apples", "potatoes"])

st.write('''### Slider

Display a slider widget.

''')


with st.echo():
    number = st.slider("Pick a number", 0, 100)

st.write('''### Select-slider

Display a slider widget to select items from a list.

''')


with st.echo():
    size = st.select_slider("Pick a size", ["S", "M", "L"])

st.write('''### Text input

Display a single-line text input widget.

''')


with st.echo():
    name = st.text_input("First name")

st.write('''### Number input

Display a numeric input widget.

''')


with st.echo():
    choice = st.number_input("Pick a number", 0, 10)

st.write('''### Text-area

Display a multi-line text input widget.

''')


with st.echo():
    text = st.text_area("Text to translate")

st.write('''### Date input

Display a date input widget.

''')


with st.echo():
    date = st.date_input("Your birthday")

st.write('''### Time input

Display a time input widget.

''')


with st.echo():
    time = st.time_input("Meeting time")

st.write('''### File Uploader

Display a file uploader widget.

''')


with st.echo():
    photo = st.file_uploader("Upload a photo")

st.write('''### Color picker

Display a color picker widget.

''')


with st.echo():
    color = st.color_picker("Pick a color")
