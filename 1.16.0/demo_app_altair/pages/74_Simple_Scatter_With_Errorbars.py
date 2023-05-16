import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_87861(use_container_width: bool):
    import altair as alt
    import pandas as pd
    import numpy as np
    
    # generate some data points with uncertainties
    np.random.seed(0)
    x = [1, 2, 3, 4, 5]
    y = np.random.normal(10, 0.5, size=len(x))
    yerr = 0.2
    
    # set up data frame
    source = pd.DataFrame({"x": x, "y": y, "yerr": yerr})
    
    # the base chart
    base = alt.Chart(source).transform_calculate(
        ymin="datum.y-datum.yerr",
        ymax="datum.y+datum.yerr"
    )
    
    # generate the points
    points = base.mark_point(
        filled=True,
        size=50,
        color='black'
    ).encode(
        x=alt.X('x', scale=alt.Scale(domain=(0, 6))),
        y=alt.Y('y', scale=alt.Scale(zero=False))
    )
    
    # generate the error bars
    errorbars = base.mark_errorbar().encode(
        x="x",
        y="ymin:Q",
        y2="ymax:Q"
    )
    
    chart = points + errorbars
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_87861))
    get_chart_87861(use_container_width=True)
except Exception as e:
    st.exception(e)

