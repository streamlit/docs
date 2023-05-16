import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_53556(use_container_width: bool):
    import pandas as pd
    import altair as alt
    
    source = pd.DataFrame(
        {"category": ["a", "b", "c", "d", "e", "f"], "value": [4, 6, 10, 3, 7, 8]}
    )
    
    base = alt.Chart(source).encode(
        theta=alt.Theta("value:Q", stack=True), color=alt.Color("category:N", legend=None)
    )
    
    pie = base.mark_arc(outerRadius=120)
    text = base.mark_text(radius=140, size=20).encode(text="category:N")
    
    chart = pie + text
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_53556))
    get_chart_53556(use_container_width=True)
except Exception as e:
    st.exception(e)

