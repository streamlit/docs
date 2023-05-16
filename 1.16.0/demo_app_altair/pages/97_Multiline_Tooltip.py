import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_44361(use_container_width: bool):
    import altair as alt
    import pandas as pd
    import numpy as np
    
    np.random.seed(42)
    source = pd.DataFrame(np.cumsum(np.random.randn(100, 3), 0).round(2),
                        columns=['A', 'B', 'C'], index=pd.RangeIndex(100, name='x'))
    source = source.reset_index().melt('x', var_name='category', value_name='y')
    
    # Create a selection that chooses the nearest point & selects based on x-value
    nearest = alt.selection(type='single', nearest=True, on='mouseover',
                            fields=['x'], empty='none')
    
    # The basic line
    line = alt.Chart(source).mark_line(interpolate='basis').encode(
        x='x:Q',
        y='y:Q',
        color='category:N'
    )
    
    # Transparent selectors across the chart. This is what tells us
    # the x-value of the cursor
    selectors = alt.Chart(source).mark_point().encode(
        x='x:Q',
        opacity=alt.value(0),
    ).add_selection(
        nearest
    )
    
    # Draw points on the line, and highlight based on selection
    points = line.mark_point().encode(
        opacity=alt.condition(nearest, alt.value(1), alt.value(0))
    )
    
    # Draw text labels near the points, and highlight based on selection
    text = line.mark_text(align='left', dx=5, dy=-5).encode(
        text=alt.condition(nearest, 'y:Q', alt.value(' '))
    )
    
    # Draw a rule at the location of the selection
    rules = alt.Chart(source).mark_rule(color='gray').encode(
        x='x:Q',
    ).transform_filter(
        nearest
    )
    
    chart = # Put the five layers into a chart and bind the data
    alt.layer(
        line, selectors, points, rules, text
    ).properties(
        width=600, height=300
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_44361))
    get_chart_44361(use_container_width=True)
except Exception as e:
    st.exception(e)

