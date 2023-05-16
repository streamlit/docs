import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_5014(use_container_width: bool):
    import altair as alt
    import numpy as np
    import pandas as pd
    
    x = np.arange(100)
    source = pd.DataFrame({
      'x': x,
      'f(x)': np.sin(x / 5)
    })
    
    chart = alt.Chart(source).mark_line(
        point=alt.OverlayMarkDef(color="red")
    ).encode(
        x='x',
        y='f(x)'
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_5014))
    get_chart_5014(use_container_width=True)
except Exception as e:
    st.exception(e)

