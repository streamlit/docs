import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_63523(use_container_width: bool):
    import altair as alt
    import pandas as pd
    
    source = pd.DataFrame({
        'project': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        'score': [25, 57, 23, 19, 8, 47, 8],
        'goal': [25, 47, 30, 27, 38, 19, 4]
    })
    
    bar = alt.Chart(source).mark_bar().encode(
        x='project',
        y='score'
    ).properties(
        width=alt.Step(40)  # controls width of bar.
    )
    
    tick = alt.Chart(source).mark_tick(
        color='red',
        thickness=2,
        size=40 * 0.9,  # controls width of tick.
    ).encode(
        x='project',
        y='goal'
    )
    
    chart = bar + tick
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_63523))
    get_chart_63523(use_container_width=True)
except Exception as e:
    st.exception(e)

