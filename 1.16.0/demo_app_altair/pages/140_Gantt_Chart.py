import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_56029(use_container_width: bool):
    import altair as alt
    import pandas as pd
    
    source = pd.DataFrame([
        {"task": "A", "start": 1, "end": 3},
        {"task": "B", "start": 3, "end": 8},
        {"task": "C", "start": 8, "end": 10}
    ])
    
    chart = alt.Chart(source).mark_bar().encode(
        x='start',
        x2='end',
        y='task'
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_56029))
    get_chart_56029(use_container_width=True)
except Exception as e:
    st.exception(e)

