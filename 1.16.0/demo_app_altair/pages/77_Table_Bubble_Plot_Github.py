import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_4974(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.github.url
    
    chart = alt.Chart(source).mark_circle().encode(
        x='hours(time):O',
        y='day(time):O',
        size='sum(count):Q'
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_4974))
    get_chart_4974(use_container_width=True)
except Exception as e:
    st.exception(e)

