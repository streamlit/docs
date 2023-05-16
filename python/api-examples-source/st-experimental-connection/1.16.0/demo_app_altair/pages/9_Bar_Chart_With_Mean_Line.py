import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_31083(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.wheat()
    
    bar = alt.Chart(source).mark_bar().encode(
        x='year:O',
        y='wheat:Q'
    )
    
    rule = alt.Chart(source).mark_rule(color='red').encode(
        y='mean(wheat):Q'
    )
    
    chart = (bar + rule).properties(width=600)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_31083))
    get_chart_31083(use_container_width=True)
except Exception as e:
    st.exception(e)

