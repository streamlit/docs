import numpy as np
import pandas as pd
import streamlit as st
from streamlit.components.v1 import iframe


@st.cache_data
def get_empty_grid() -> pd.DataFrame:
    return pd.DataFrame(np.zeros((10, 10))).replace(0, "").astype(str)


st.set_page_config(layout="wide", page_title="Data Editor", page_icon="🧮")

st.title("📥 Clipboard")
st.caption("This is a demo of the `st.experimental_data_editor`.")
GOOGLE_SHEET_URL = (
    "https://docs.google.com/spreadsheets/d/1Z0zd-5dF_HfqUaDDq4BWAOnsdlGCjkbTNwDZMBQ1dOY/edit#gid=0"
)

left, right = st.columns(2)

with left:
    """Here's an empty grid... It's not yet super useful."""

    empty_grid = pd.DataFrame(np.zeros((20, 4))).replace(0, "").astype(str)
    df = st.experimental_data_editor(empty_grid, use_container_width=True, height=600)

with right:
    st.write(
        f"""Want to fill it real quick? Just copy the data from [this Google Sheet]({GOOGLE_SHEET_URL}) and paste it in!"""
    )

    names = [
        "Nicholas Nguyen",
        "Patrick Fuentes",
        "Sheri Stewart",
        "Gabrielle Mckee",
        "Thomas Bell",
        "Joshua Anderson",
        "Leslie Gray",
        "Patricia Young",
        "Kathleen Fowler",
        "Seth Moreno",
        "Timothy Mason",
        "Matthew Trujillo",
        "Robert Nguyen",
        "Shelly Boyle",
        "Harry Mitchell",
        "Stephanie Chavez",
        "Donald Cuevas",
        "April Gonzalez",
        "Jason Taylor",
    ]

    iframe(
        src="https://docs.google.com/spreadsheets/d/1Z0zd-5dF_HfqUaDDq4BWAOnsdlGCjkbTNwDZMBQ1dOY/edit#gid=0",
        height=600,
    )

if any(name in names for name in df[0].values):
    if "🎉" not in st.session_state:
        st.balloons()
        st.session_state["🎉"] = True
