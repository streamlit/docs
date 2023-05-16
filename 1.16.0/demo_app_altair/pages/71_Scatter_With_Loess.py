import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_72043(use_container_width: bool):
    import altair as alt
    import pandas as pd
    import numpy as np
    
    np.random.seed(1)
    
    source = pd.DataFrame({
        'x': np.arange(100),
        'A': np.random.randn(100).cumsum(),
        'B': np.random.randn(100).cumsum(),
        'C': np.random.randn(100).cumsum(),
    })
    
    base = alt.Chart(source).mark_circle(opacity=0.5).transform_fold(
        fold=['A', 'B', 'C'],
        as_=['category', 'y']
    ).encode(
        alt.X('x:Q'),
        alt.Y('y:Q'),
        alt.Color('category:N')
    )
    
    chart = base + base.transform_loess('x', 'y', groupby=['category']).mark_line(size=4)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_72043))
    get_chart_72043(use_container_width=True)
except Exception as e:
    st.exception(e)

