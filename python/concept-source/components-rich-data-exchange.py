import pandas as pd
import streamlit as st
import base64
from pathlib import Path


_APP_DIR = Path(__file__).parent


# Create sample data
@st.cache_data
def create_sample_df():
    return pd.DataFrame(
        {
            "name": ["Alice", "Bob", "Charlie"],
            "city": ["New York", "London", "Tokyo"],
        }
    )


df = create_sample_df()


# Load an image and convert to bytes
@st.cache_data
def load_image_as_base64(image_path):
    with open(image_path, "rb") as img_file:
        img_bytes = img_file.read()
    return base64.b64encode(img_bytes).decode("utf-8")


img_base64 = load_image_as_base64(_APP_DIR / "favi.png")

# Serialization is automatically handled by Streamlit components
chart_component = st.components.v2.component(
    "data_display",
    html="""<div id="data-container">Loading data...</div>""",
    js="""
    export default function({ data, parentElement }) {
        const container = parentElement.querySelector("#data-container");

        const df = data.df;
        const userInfo = data.user_info;
        const imgBase64 = data.image_base64;

        container.innerHTML = `
            <h4>Dataframe: ${df}</h4>
            <h4>User Info: ${userInfo.name}</h4>
            <img src="data:image/png;base64,${imgBase64}" style="width: 25%;" />
        `;
    }
    """,
)

result = chart_component(
    data={
        "df": df,  # Arrow-serializable dataframe
        "user_info": {"name": "Alice"},  # JSON-serializable data
        "image_base64": img_base64,  # Image as base64 string
    }
)
