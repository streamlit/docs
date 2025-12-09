import streamlit as st
from radial_dial_component import radial_dial

st.title("Radial Dial")
st.caption("A display-only component with smooth transitions")

st.subheader("CPU Temperature")
temp = st.slider("Adjust temperature", 30, 100, 45)
radial_dial(
    key="temp_dial",
    data={
        "value": temp,
        "min": 30,
        "max": 100,
        "min_label": "Cool",
        "max_label": "Hot",
        "unit": "°C",
        "title": "CPU Temperature"
    }
)