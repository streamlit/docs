import io
from datetime import datetime, time

import pandas as pd
import streamlit as st
import webvtt

st.set_page_config(layout="wide")
from utils import colored_header, data_to_webvtt, vtt_string_to_dataframe

colored_header(
    "Edit subtitles (Data annotation use case)",
    description="You can live edit the subtitles in the table below. The video player will update automatically.",
)


@st.cache_data
def load_data():
    with open("python/api-examples-source/charts.video3/subtitles-en.vtt", "rb") as f:
        vtt_string = f.read()
    df = vtt_string_to_dataframe(vtt_string.decode("utf-8"))
    return df


df = load_data()

col1, col2 = st.columns(2)

with col1:
    edited_df = st.data_editor(
        df,
        use_container_width=True,
        column_config={
            "text": st.column_config.TextColumn(
                "Subtitle text",
                help="The subtitle text to be displayed from the start time to the end time. 🎈",
            ),
            "start": st.column_config.TimeColumn(
                "Start time",
                help="The start time of the subtitle. 🕒",
            ),
            "end": st.column_config.TimeColumn(
                "End time",
                help="The end time of the subtitle. 🕒",
            ),
        },
    )

webvtt_string = data_to_webvtt(edited_df.to_dict(orient="records"))

col2.video(
    "python/api-examples-source/charts.video3/sintel-short.mp4",
    subtitles={"English": webvtt_string},
)
col2.caption(
    "The featured video by [Blender Foundation | www.sintel.org](https://durian.blender.org) is licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)"
)
