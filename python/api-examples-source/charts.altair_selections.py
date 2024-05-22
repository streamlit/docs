import streamlit as st
import pandas as pd
import numpy as np
import altair as alt


@st.cache_data
def load_data():
    return pd.DataFrame(np.random.randn(20, 3), columns=["a", "b", "c"])


df = load_data()

chart = (
    alt.Chart(df)
    .mark_circle()
    .encode(x="a", y="b", size="c", color="c", tooltip=["a", "b", "c"])
    .add_params(
        alt.selection_interval("interval_selection"),
        alt.selection_point("point_selection"),
    )
)

st.altair_chart(chart, key="alt_chart", on_select="rerun")

st.session_state.alt_chart
