import streamlit as st
from pathlib import Path

# Get the current file's directory
_COMPONENT_DIR = Path(__file__).parent

@st.cache_data
def load_html():
    with open(_COMPONENT_DIR / "component.html", "r") as f:
        return f.read()

@st.cache_data
def load_css():
    with open(_COMPONENT_DIR / "component.css", "r") as f:
        return f.read()

@st.cache_data
def load_js():
    with open(_COMPONENT_DIR / "component.js", "r") as f:
        return f.read()

HTML = load_html()
CSS = load_css()
JS = load_js()
