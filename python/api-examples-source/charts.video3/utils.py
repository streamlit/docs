import io
import itertools
from datetime import datetime, time

import pandas as pd
import streamlit as st
import webvtt


def icon(emoji: str):
    """Shows an emoji as a Notion-style page icon."""
    st.write(
        f'<span style="font-size: 78px; line-height: 1">{emoji}</span>',
        unsafe_allow_html=True,
    )


HEADER_COLOR_CYCLE = itertools.cycle(
    [
        "#00c0f2",  # light-blue-70",
        "#ffbd45",  # "orange-70",
        "#00d4b1",  # "blue-green-70",
        "#1c83e1",  # "blue-70",
        "#803df5",  # "violet-70",
        "#ff4b4b",  # "red-70",
        "#21c354",  # "green-70",
        "#faca2b",  # "yellow-80",
    ]
)


def space(num_lines=1):
    """Adds empty lines to the Streamlit app."""
    for _ in range(num_lines):
        st.write("")


def colored_header(label, description=None, color=None):
    """Shows a header with a colored underline and an optional description."""
    space(num_lines=2)
    if color is None:
        color = next(HEADER_COLOR_CYCLE)
    st.subheader(label)
    st.write(
        f'<hr style="background-color: {color}; margin-top: 0; margin-bottom: 0; height: 3px; border: none; border-radius: 3px;">',
        unsafe_allow_html=True,
    )
    if description:
        st.caption(description)


def time_to_webvtt_timestamp(t: time):
    """Convert a datetime.time object to a WebVTT timestamp string."""
    return f"{t.strftime('%H:%M:%S')}.000"


def string_to_time(s: str):
    """Convert a string to a datetime.time object."""
    return datetime.strptime(s, "%H:%M:%S.%f").time()


def vtt_string_to_dataframe(vtt_string: str) -> pd.DataFrame:
    time_epsilon = pd.Timedelta("00:00:00.1")

    buffer = io.StringIO(vtt_string)

    vtt = webvtt.read_buffer(buffer=buffer)

    df = pd.DataFrame(
        [
            [
                pd.to_datetime(v.start),
                pd.to_datetime(v.end),
                v.text.splitlines()[-1],
            ]
            for v in vtt
        ],
        columns=["start", "end", "text"],
    )
    df = df.where(df.end - df.start > time_epsilon).dropna()
    df["start"] = df["start"].apply(time_to_webvtt_timestamp)
    df["end"] = df["end"].apply(time_to_webvtt_timestamp)
    df["start"] = df["start"].apply(string_to_time)
    df["end"] = df["end"].apply(string_to_time)
    return df


def data_to_webvtt(data) -> str:
    webvtt_content = "WEBVTT\n\n"

    for index, entry in enumerate(data, start=1):
        start_time = time_to_webvtt_timestamp(entry["start"])
        end_time = time_to_webvtt_timestamp(entry["end"])
        text = entry["text"].replace("\n", " ")

        webvtt_content += f"{index}\n{start_time} --> {end_time}\n{text}\n\n"

    return webvtt_content
