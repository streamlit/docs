import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_74895(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.unemployment_across_industries.url
    
    base = alt.Chart(source).mark_area(
        color='goldenrod',
        opacity=0.3
    ).encode(
        x='yearmonth(date):T',
        y='sum(count):Q',
    )
    
    brush = alt.selection_interval(encodings=['x'],empty='all')
    background = base.add_selection(brush)
    selected = base.transform_filter(brush).mark_area(color='goldenrod')
    
    chart = background + selected
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_74895))
    get_chart_74895(use_container_width=True)
except Exception as e:
    st.exception(e)

