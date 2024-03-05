import streamlit as st

st.set_page_config(layout="centered")
from streamlit import config
from utils import colored_header

config.set_option("client.showErrorDetails", True)

colored_header(
    "YouTube is unsupported",
    description="You can't use pass subtitles to `st.video` when using a YouTube video. This is because YouTube's IFrame API does not expose a way to pass subtitles to the video player.",
)

with st.expander("Show code"):
    st.code(
        """
        import streamlit as st

        st.video("https://www.youtube.com/watch?v=0TSXM-BGqHU", subtitles={"English": "subtitles-en.vtt"})
        """
    )

st.video(
    "https://www.youtube.com/watch?v=0TSXM-BGqHU",
    subtitles={"English": "python/api-examples-source/charts.video3/subtitles-en.vtt"},
)
