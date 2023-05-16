import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_74954(use_container_width: bool):
    import pandas as pd
    import altair as alt
    import numpy as np
    np.random.seed(42)
    
    # Generating Data
    source = pd.DataFrame({
        'Trial A': np.random.normal(0, 0.8, 1000),
        'Trial B': np.random.normal(-2, 1, 1000),
        'Trial C': np.random.normal(3, 2, 1000)
    })
    
    chart = alt.Chart(source).transform_fold(
        ['Trial A', 'Trial B', 'Trial C'],
        as_=['Experiment', 'Measurement']
    ).mark_bar(
        opacity=0.3,
        binSpacing=0
    ).encode(
        alt.X('Measurement:Q', bin=alt.Bin(maxbins=100)),
        alt.Y('count()', stack=None),
        alt.Color('Experiment:N')
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_74954))
    get_chart_74954(use_container_width=True)
except Exception as e:
    st.exception(e)

