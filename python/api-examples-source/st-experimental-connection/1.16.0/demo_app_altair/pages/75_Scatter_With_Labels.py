import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_52331(use_container_width: bool):
    import altair as alt
    import pandas as pd
    
    source = pd.DataFrame({
        'x': [1, 3, 5, 7, 9],
        'y': [1, 3, 5, 7, 9],
        'label': ['A', 'B', 'C', 'D', 'E']
    })
    
    points = alt.Chart(source).mark_point().encode(
        x='x:Q',
        y='y:Q'
    )
    
    text = points.mark_text(
        align='left',
        baseline='middle',
        dx=7
    ).encode(
        text='label'
    )
    
    chart = points + text
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_52331))
    get_chart_52331(use_container_width=True)
except Exception as e:
    st.exception(e)

