import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_25457(use_container_width: bool):
    import altair as alt
    
    source = alt.sequence(start=0, stop=12.7, step=0.1, as_='x')
    
    chart = alt.Chart(source).mark_line().transform_calculate(
        sin='sin(datum.x)',
        cos='cos(datum.x)'
    ).transform_fold(
        ['sin', 'cos']
    ).encode(
        x='x:Q',
        y='value:Q',
        color='key:N'
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_25457))
    get_chart_25457(use_container_width=True)
except Exception as e:
    st.exception(e)

