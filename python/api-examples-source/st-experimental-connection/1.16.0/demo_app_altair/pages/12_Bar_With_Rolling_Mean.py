import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_43307(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.wheat()
    
    bar = alt.Chart(source).mark_bar().encode(
        x='year:O',
        y='wheat:Q'
    )
    
    line = alt.Chart(source).mark_line(color='red').transform_window(
        # The field to average
        rolling_mean='mean(wheat)',
        # The number of values before and after the current value to include.
        frame=[-9, 0]
    ).encode(
        x='year:O',
        y='rolling_mean:Q'
    )
    
    chart = (bar + line).properties(width=600)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_43307))
    get_chart_43307(use_container_width=True)
except Exception as e:
    st.exception(e)

