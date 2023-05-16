import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_28245(use_container_width: bool):
    import altair as alt
    import pandas as pd
    
    source = pd.DataFrame(
        {"data":[1,1,1,1,1,1,1,1,1,1,
                 2,2,2,
                 3,3,
                 4,4,4,4,4,4]
        }
    )
    
    chart = alt.Chart(source).mark_circle(opacity=1).transform_window(
        id='rank()',
        groupby=['data']
    ).encode(
        alt.X('data:O'),
        alt.Y('id:O',
              axis=None,
              sort='descending')
    ).properties(height=100)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_28245))
    get_chart_28245(use_container_width=True)
except Exception as e:
    st.exception(e)

