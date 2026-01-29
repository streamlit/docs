from pathlib import Path
import streamlit as st

component_dir = Path(__file__).parent


@st.cache_data
def load_component_code():
    with open(component_dir / "button.css", "r") as f:
        CSS = f.read()
    with open(component_dir / "button.html", "r") as f:
        HTML = f.read()
    with open(component_dir / "button.js", "r") as f:
        JS = f.read()
    return HTML, CSS, JS


HTML, CSS, JS = load_component_code()

danger_button = st.components.v2.component(
    name="hold_to_confirm",
    html=HTML,
    css=CSS,
    js=JS,
)
