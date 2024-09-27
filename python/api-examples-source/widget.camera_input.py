import streamlit as st

picture = st.camera_input("Take a picture")

if picture:
    st.image(picture)
