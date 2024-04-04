import streamlit as st
from streamlit import config
from utils import icon

st.set_page_config(page_title="Video Subtitles Demo", page_icon="📹")
config.set_option("client.showErrorDetails", True)

icon("📹")

st.title("Video Subtitles Demo")

st.markdown(
    """
Welcome to the feature demo of subtitles support for `st.video`!

This feature adds a `subtitles` parameter to `st.video` to display subtitles on videos, supporting several input types.

- Subtitle support is available in Streamlit 1.32.0 and later.
- Get started by reading the docstring for `st.video` below (or read the [documentation](https://docs.streamlit.io/develop/api-reference/media/st.video) for additional details).
- 👈 Check out the demos of all supported input types by visiting the other pages in the sidebar. 
"""
)


with st.expander("📚 Show docstring"):
    st.help(st.video)
