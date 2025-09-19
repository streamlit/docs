import io

import streamlit as st
from utils import colored_header

colored_header(
    "Pass dynamically generated subtitles as raw strings",
    description="You can pass dynamically generated (e.g. by an LLM) subtitles as raw strings to `st.video` to display subtitles on a video. The behavior is the same as with .VTT and .SRT files.",
)

with st.expander("Show code"):
    st.code(
        """
        import streamlit as st

        vtt = '''
        WEBVTT

        1
        00:00:18.700 --> 00:00:21.500
        This blade has a dark past.

        2
        00:00:22.800 --> 00:00:26.800
        It has shed much innocent blood.

        3
        00:00:29.000 --> 00:00:32.450
        You're a fool for traveling alone,
        so completely unprepared.

        4
        00:00:32.750 --> 00:00:35.800
        You're lucky your blood's still flowing.

        5
        00:00:36.250 --> 00:00:37.300
        Thank you.
        '''

        srt = '''
        1
        00:00:18,700 --> 00:00:21,500
        This blade has a dark past.

        2
        00:00:22,800 --> 00:00:26,800
        It has shed much innocent blood.

        3
        00:00:29,000 --> 00:00:32,450
        You're a fool for traveling alone,
        so completely unprepared.

        4
        00:00:32,750 --> 00:00:35,800
        You're lucky your blood's still flowing.

        5
        00:00:36,250 --> 00:00:37,300
        Thank you.
        '''

        st.video("sintel-short.mp4", subtitles={"English VTT": vtt, "English SRT": srt})
        """
    )

vtt = """
WEBVTT

1
00:00:18.700 --> 00:00:21.500
This blade has a dark past.

2
00:00:22.800 --> 00:00:26.800
It has shed much innocent blood.

3
00:00:29.000 --> 00:00:32.450
You're a fool for traveling alone,
so completely unprepared.

4
00:00:32.750 --> 00:00:35.800
You're lucky your blood's still flowing.

5
00:00:36.250 --> 00:00:37.300
Thank you.
"""

srt = """
1
00:00:18,700 --> 00:00:21,500
This blade has a dark past.

2
00:00:22,800 --> 00:00:26,800
It has shed much innocent blood.

3
00:00:29,000 --> 00:00:32,450
You're a fool for traveling alone,
so completely unprepared.

4
00:00:32,750 --> 00:00:35,800
You're lucky your blood's still flowing.

5
00:00:36,250 --> 00:00:37,300
Thank you.
"""

st.video(
    "python/api-examples-source/charts.video3/sintel-short.mp4",
    subtitles={"English VTT": vtt, "English SRT": srt},
    start_time=18,
)

colored_header(
    "Pass dynamically generated subtitles as io.BytesIO objects",
    description="You can also pass dynamically generated (e.g. by an LLM) subtitles as `io.BytesIO` objects to `st.video` to display subtitles on a video. The behavior is the same as with .VTT and .SRT files.",
)

with st.expander("Show code"):
    st.code(
        """
        import streamlit as st
        import io

        vtt = io.BytesIO(b'''WEBVTT

        1
        00:00:18.700 --> 00:00:21.500
        This blade has a dark past.

        2
        00:00:22.800 --> 00:00:26.800
        It has shed much innocent blood.

        3
        00:00:29.000 --> 00:00:32.450
        You're a fool for traveling alone,
        so completely unprepared.

        4
        00:00:32.750 --> 00:00:35.800
        You're lucky your blood's still flowing.

        5
        00:00:36.250 --> 00:00:37.300
        Thank you.
        ''')

        srt = io.BytesIO(b'''1
        00:00:18,700 --> 00:00:21,500
        This blade has a dark past.

        2
        00:00:22,800 --> 00:00:26,800
        It has shed much innocent blood.

        3
        00:00:29,000 --> 00:00:32,450
        You're a fool for traveling alone,
        so completely unprepared.

        4
        00:00:32,750 --> 00:00:35,800
        You're lucky your blood's still flowing.

        5
        00:00:36,250 --> 00:00:37,300
        Thank you.
        ''')

        st.video("sintel-short.mp4", subtitles={"English VTT": vtt, "English SRT": srt})
        """
    )

vtt = io.BytesIO(
    b"""WEBVTT

1
00:00:18.700 --> 00:00:21.500
This blade has a dark past.

2
00:00:22.800 --> 00:00:26.800
It has shed much innocent blood.

3
00:00:29.000 --> 00:00:32.450
You're a fool for traveling alone,
so completely unprepared.

4
00:00:32.750 --> 00:00:35.800
You're lucky your blood's still flowing.

5
00:00:36.250 --> 00:00:37.300
Thank you.
"""
)

srt = io.BytesIO(
    b"""1
00:00:18,700 --> 00:00:21,500
This blade has a dark past.

2
00:00:22,800 --> 00:00:26,800
It has shed much innocent blood.

3
00:00:29,000 --> 00:00:32,450
You're a fool for traveling alone,
so completely unprepared.

4
00:00:32,750 --> 00:00:35,800
You're lucky your blood's still flowing.

5
00:00:36,250 --> 00:00:37,300
Thank you.
"""
)

st.video(
    "python/api-examples-source/charts.video3/sintel-short.mp4",
    subtitles={"English VTT": vtt, "English SRT": srt},
    start_time=18,
)

st.caption(
    "The featured video by [Blender Foundation | www.sintel.org](https://durian.blender.org) is licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)"
)
