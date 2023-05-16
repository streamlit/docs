import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_81244(use_container_width: bool):
    import altair as alt
    import pandas as pd
    
    source = pd.DataFrame(
        [
            {"team": "Germany", "matchday": 1, "point": 0, "diff": -1},
            {"team": "Germany", "matchday": 2, "point": 3, "diff": 0},
            {"team": "Germany", "matchday": 3, "point": 3, "diff": -2},
            {"team": "Mexico", "matchday": 1, "point": 3, "diff": 1},
            {"team": "Mexico", "matchday": 2, "point": 6, "diff": 2},
            {"team": "Mexico", "matchday": 3, "point": 6, "diff": -1},
            {"team": "South Korea", "matchday": 1, "point": 0, "diff": -1},
            {"team": "South Korea", "matchday": 2, "point": 0, "diff": -2},
            {"team": "South Korea", "matchday": 3, "point": 3, "diff": 0},
            {"team": "Sweden", "matchday": 1, "point": 3, "diff": 1},
            {"team": "Sweden", "matchday": 2, "point": 3, "diff": 0},
            {"team": "Sweden", "matchday": 3, "point": 6, "diff": 3},
        ]
    )
    
    color_scale = alt.Scale(
        domain=["Germany", "Mexico", "South Korea", "Sweden"],
        range=["#000000", "#127153", "#C91A3C", "#0C71AB"],
    )
    
    chart = alt.Chart(source).mark_line().encode(
        x="matchday:O", y="rank:O", color=alt.Color("team:N", scale=color_scale)
    ).transform_window(
        rank="rank()",
        sort=[
            alt.SortField("point", order="descending"),
            alt.SortField("diff", order="descending"),
        ],
        groupby=["matchday"],
    ).properties(title="World Cup 2018: Group F Rankings")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_81244))
    get_chart_81244(use_container_width=True)
except Exception as e:
    st.exception(e)

