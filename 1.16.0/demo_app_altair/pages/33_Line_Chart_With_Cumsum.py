import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_41964(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.wheat()
    
    chart = alt.Chart(source).mark_line().transform_window(
        # Sort the data chronologically
        sort=[{'field': 'year'}],
        # Include all previous records before the current record and none after
        # (This is the default value so you could skip it and it would still work.)
        frame=[None, 0],
        # What to add up as you go
        cumulative_wheat='sum(wheat)'
    ).encode(
        x='year:O',
        # Plot the calculated field created by the transformation
        y='cumulative_wheat:Q'
    ).properties(width=600)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_41964))
    get_chart_41964(use_container_width=True)
except Exception as e:
    st.exception(e)

