import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_33524(use_container_width: bool):
    import numpy as np
    import altair as alt
    
    chart = alt.Chart().mark_arc(color="gold").encode(
        theta=alt.datum((5 / 8) * np.pi, scale=None),
        theta2=alt.datum((19 / 8) * np.pi),
        radius=alt.datum(100, scale=None),
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_33524))
    get_chart_33524(use_container_width=True)
except Exception as e:
    st.exception(e)

