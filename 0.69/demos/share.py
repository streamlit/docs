from streamlit import area_chart
from streamlit import bar_chart
from streamlit import line_chart

import streamlit as st
import pandas as pd
import numpy as np
import random

def share():
    st.write("""
    # Streamlit sharing is now available

    With Streamlit sharing, you can deploy your publicly hosted Github app
    with the press of one button all within your local environment. Simply
    hit `Deploy` from the menu options and share your app with the world.

    Learn more from our
    [blog post](http://blog.streamlit.io/introducing-streamlit-sharing/) or sign
    up [here](http://streamlit.io/sharing)!

    ----

    """)
    st.video("0.69/demos/share.mp4")
