import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_82402(use_container_width: bool):
    import altair as alt
    import pandas as pd
    
    source = pd.DataFrame({'Activity': ['Sleeping', 'Eating', 'TV', 'Work', 'Exercise'],
                               'Time': [8, 2, 4, 8, 2]})
    
    chart = alt.Chart(source).transform_joinaggregate(
        TotalTime='sum(Time)',
    ).transform_calculate(
        PercentOfTotal="datum.Time / datum.TotalTime"
    ).mark_bar().encode(
        alt.X('PercentOfTotal:Q', axis=alt.Axis(format='.0%')),
        y='Activity:N'
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_82402))
    get_chart_82402(use_container_width=True)
except Exception as e:
    st.exception(e)

