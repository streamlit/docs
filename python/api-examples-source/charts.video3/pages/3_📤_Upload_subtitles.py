import streamlit as st

st.set_page_config(layout="centered")
from utils import colored_header

colored_header(
    "Upload subtitles",
    description="You can upload .VTT and .SRT files to `st.video` with `st.file_uploader`.",
)

with st.expander("Show code"):
    st.code(
        """
        import streamlit as st

        subtitles = st.file_uploader("Upload subtitles", accept_multiple_files=True)
        if subtitles:
            st.video("sintel-short.mp4", subtitles={file.name: file for file in subtitles})
        """
    )

with st.expander("Download example subtitle files", expanded=True):
    col1, col2 = st.columns(2)
    with open(
        "python/api-examples-source/charts.video3/subtitles-en.srt", "rb"
    ) as file:
        st.download_button(
            label="subtitles-en.srt",
            data=file,
            file_name="subtitles-en.srt",
            mime="text/vtt",
        )
    with open(
        "python/api-examples-source/charts.video3/subtitles-de.vtt", "rb"
    ) as file:
        st.download_button(
            label="subtitles-de.vtt",
            data=file,
            file_name="subtitles-de.vtt",
            mime="text/vtt",
        )

subtitles = st.file_uploader(
    "Upload subtitles", accept_multiple_files=True, type=["vtt", "srt"]
)

st.video(
    "python/api-examples-source/charts.video3/sintel-short.mp4",
    subtitles={file.name: file for file in subtitles},
)

if subtitles:
    st.caption(
        f"Now playing with the following subtitles: {', '.join([file.name for file in subtitles])}"
    )

st.caption(
    "The featured video by [Blender Foundation | www.sintel.org](https://durian.blender.org) is licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)"
)
