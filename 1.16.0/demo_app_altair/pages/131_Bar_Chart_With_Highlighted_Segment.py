import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_58426(use_container_width: bool):
    import altair as alt
    import pandas as pd
    from vega_datasets import data
    
    source = data.wheat()
    threshold = pd.DataFrame([{"threshold": 90}])
    
    bars = alt.Chart(source).mark_bar().encode(
        x="year:O",
        y="wheat:Q",
    )
    
    highlight = alt.Chart(source).mark_bar(color="#e45755").encode(
        x='year:O',
        y='baseline:Q',
        y2='wheat:Q'
    ).transform_filter(
        alt.datum.wheat > 90
    ).transform_calculate("baseline", "90")
    
    rule = alt.Chart(threshold).mark_rule().encode(
        y='threshold:Q'
    )
    
    chart = (bars + highlight + rule).properties(width=600)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_58426))
    get_chart_58426(use_container_width=True)
except Exception as e:
    st.exception(e)

