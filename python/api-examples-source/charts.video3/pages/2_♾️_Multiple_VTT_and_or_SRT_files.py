import streamlit as st

st.set_page_config(layout="centered")
from utils import colored_header

colored_header(
    "Pass multiple .VTT and/or .SRT files",
    description="You can pass multiple .VTT and/or .SRT files to `st.video` to display subtitles on a video. The behavior is the same as with a single file. The video player will display the first track by default.\n\n Note: you can toggle between the tracks in the video player menu.",
)

with st.expander("Show code"):
    st.code(
        """
        import streamlit as st

        st.video("sintel-short.mp4", subtitles={"English": "subtitles-en.srt", "Spanish": "subtitles-es.vtt"})
        """
    )

st.video(
    "python/api-examples-source/charts.video3/sintel-short.mp4",
    subtitles={
        "English": "python/api-examples-source/charts.video3/subtitles-en.srt",
        "Español": "python/api-examples-source/charts.video3/subtitles-es.vtt",
    },
    start_time=18,
)

colored_header(
    "Pass multiple .VTT and/or .SRT files without a default track",
    description="You can pass multiple .VTT and/or .SRT files to `st.video` without specifying a default track. The video player will not display any subtitles by default. You will need to select a track from the video player menu.",
)

with st.expander("Show code"):
    st.code(
        """
        import streamlit as st

        st.video("sintel-short.mp4", subtitles={"":"", "German": "subtitles-de.vtt", "English": "subtitles-en.srt"})
        """
    )

st.video(
    "python/api-examples-source/charts.video3/sintel-short.mp4",
    subtitles={
        "None": "",
        "Deutsch": "python/api-examples-source/charts.video3/subtitles-de.vtt",
        "English": "python/api-examples-source/charts.video3/subtitles-en.srt",
    },
    start_time=18,
)

st.caption(
    "The featured video by [Blender Foundation | www.sintel.org](https://durian.blender.org) is licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)"
)
