import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_57737(use_container_width: bool):
    import pandas as pd
    import altair as alt
    
    source = pd.DataFrame({"category": [1, 2, 3, 4, 5, 6], "value": [4, 6, 10, 3, 7, 8]})
    
    chart = alt.Chart(source).mark_arc(innerRadius=50).encode(
        theta=alt.Theta(field="value", type="quantitative"),
        color=alt.Color(field="category", type="nominal"),
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_57737))
    get_chart_57737(use_container_width=True)
except Exception as e:
    st.exception(e)

