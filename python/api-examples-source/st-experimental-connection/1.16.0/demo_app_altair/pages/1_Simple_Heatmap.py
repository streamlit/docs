import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_65259(use_container_width: bool):
    import altair as alt
    import numpy as np
    import pandas as pd
    
    # Compute x^2 + y^2 across a 2D grid
    x, y = np.meshgrid(range(-5, 5), range(-5, 5))
    z = x ** 2 + y ** 2
    
    # Convert this grid to columnar data expected by Altair
    source = pd.DataFrame({'x': x.ravel(),
                         'y': y.ravel(),
                         'z': z.ravel()})
    
    chart = alt.Chart(source).mark_rect().encode(
        x='x:O',
        y='y:O',
        color='z:Q'
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_65259))
    get_chart_65259(use_container_width=True)
except Exception as e:
    st.exception(e)

