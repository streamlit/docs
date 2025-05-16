import streamlit as st
from streamlit.hello import streamlit_app
streamlit_app.run()

st.sidebar.caption(
    """This app uses
    [Playwrite USA Modern](https://fonts.google.com/specimen/Playwrite+US+Modern),
    [Quicksand](https://fonts.google.com/specimen/Quicksand), and
    [Sono](https://fonts.google.com/specimen/Sono) fonts."""
)