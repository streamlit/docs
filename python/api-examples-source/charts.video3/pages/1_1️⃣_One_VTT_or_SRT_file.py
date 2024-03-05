import streamlit as st

st.set_page_config(layout="wide")
from utils import colored_header

col1, col2 = st.columns(2)

st.caption(
    "The featured video by [Blender Foundation | www.sintel.org](https://durian.blender.org) is licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)"
)


with col1:
    colored_header(
        "Pass a single .VTT file (without a label)",
        description="You can pass a single .VTT file to `st.video` to display subtitles on a video.\n\n Note: in the video player, you can toggle the subtitles on and off. Also notice the label 'default', which indicates the default track.",
    )

    with st.expander("Show code", expanded=True):
        st.code(
            """
            import streamlit as st

            st.video("sintel-short.mp4", subtitles="subtitles-en.vtt")

            # You can also pass pathlib.Path objects
            from pathlib import Path
            st.video("sintel-short.mp4", subtitles=Path("subtitles-en.vtt"))
            """
        )

    st.video(
        "python/api-examples-source/charts.video3/sintel-short.mp4",
        subtitles="python/api-examples-source/charts.video3/subtitles-en.vtt",
        start_time=18,
    )

    colored_header(
        "Pass a single .SRT file (without a label)",
        description="You can also pass a single .SRT file to `st.video` to display subtitles on a video. The behavior is the same as with .VTT files.",
    )

    with st.expander("Show code"):
        st.code(
            """
            import streamlit as st

            st.video("sintel-short.mp4", subtitles="subtitles-en.srt")
            """
        )

    st.video(
        "python/api-examples-source/charts.video3/sintel-short.mp4",
        subtitles="python/api-examples-source/charts.video3/subtitles-en.srt",
        start_time=18,
    )

with col2:
    colored_header(
        "Pass a single .VTT file (with a label)",
        description="You can pass a single .VTT file to `st.video` to display subtitles on a video. You can also specify a label for the track. \n\n Note: in the video player notice the label 'English', which indicates the default track is 'English'.",
    )

    with st.expander("Show code", expanded=True):
        st.code(
            """
            import streamlit as st

            st.video("sintel-short.mp4", subtitles={"English": "subtitles-en.vtt"})

            # You can also pass pathlib.Path objects
            from pathlib import Path
            st.video("sintel-short.mp4", subtitles={"English": Path("subtitles-en.vtt")})
            """
        )

    st.video(
        "python/api-examples-source/charts.video3/sintel-short.mp4",
        subtitles={
            "English": "python/api-examples-source/charts.video3/subtitles-en.vtt"
        },
        start_time=18,
    )

    colored_header(
        "Pass a single .SRT file (with a label)",
        description="You can also pass a single .SRT file to `st.video` to display subtitles on a video. The behavior is the same as with .VTT files.",
    )

    with st.expander("Show code"):
        st.code(
            """
            import streamlit as st

            st.video("sintel-short.mp4", subtitles={"English": "subtitles-en.srt"})
            """
        )

    st.video(
        "python/api-examples-source/charts.video3/sintel-short.mp4",
        subtitles={
            "English": "python/api-examples-source/charts.video3/subtitles-en.srt"
        },
        start_time=18,
    )
