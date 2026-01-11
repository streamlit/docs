from pathlib import Path
import streamlit as st

component_dir = Path(__file__).parent


@st.cache_data
def load_component_code():
    with open(component_dir / "stopwatch.css", "r") as f:
        CSS = f.read()
    with open(component_dir / "stopwatch.html", "r") as f:
        HTML = f.read()
    with open(component_dir / "stopwatch.js", "r") as f:
        JS = f.read()
    return HTML, CSS, JS


HTML, CSS, JS = load_component_code()

stopwatch = st.components.v2.component(
    name="stopwatch",
    html=HTML,
    css=CSS,
    js=JS
)