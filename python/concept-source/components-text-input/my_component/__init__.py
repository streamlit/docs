from pathlib import Path
import streamlit as st

_COMPONENT_DIR = Path(__file__).parent


@st.cache_data
def load_html():
    with open(_COMPONENT_DIR / "component.html", "r") as f:
        return f.read()


@st.cache_data
def load_js():
    with open(_COMPONENT_DIR / "component.js", "r") as f:
        return f.read()


HTML = load_html()
JS = load_js()

textbox_component = st.components.v2.component(
    name="simple_textbox",
    html=HTML,
    js=JS,
)


def textbox_component_wrapper(
    label, *, default="", key=None, on_change=lambda: None
):
    component_state = st.session_state.get(key, {})
    value = component_state.get("value", default)
    data = {"label": label, "value": value}
    result = textbox_component(
        data=data,
        default={"value": value},
        key=key,
        on_value_change=on_change,
    )
    return result
