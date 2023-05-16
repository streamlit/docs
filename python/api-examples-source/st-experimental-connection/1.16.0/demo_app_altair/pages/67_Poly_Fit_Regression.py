import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_78749(use_container_width: bool):
    import numpy as np
    import pandas as pd
    import altair as alt
    
    # Generate some random data
    rng = np.random.RandomState(1)
    x = rng.rand(40) ** 2
    y = 10 - 1.0 / (x + 0.1) + rng.randn(40)
    source = pd.DataFrame({"x": x, "y": y})
    
    # Define the degree of the polynomial fits
    degree_list = [1, 3, 5]
    
    base = alt.Chart(source).mark_circle(color="black").encode(
            alt.X("x"), alt.Y("y")
    )
    
    polynomial_fit = [
        base.transform_regression(
            "x", "y", method="poly", order=order, as_=["x", str(order)]
        )
        .mark_line()
        .transform_fold([str(order)], as_=["degree", "y"])
        .encode(alt.Color("degree:N"))
        for order in degree_list
    ]
    
    chart = alt.layer(base, *polynomial_fit)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_78749))
    get_chart_78749(use_container_width=True)
except Exception as e:
    st.exception(e)

