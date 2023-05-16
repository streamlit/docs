import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_66929(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.cars()
    
    line = alt.Chart(source).mark_line().encode(
        x='Year',
        y='mean(Miles_per_Gallon)'
    )
    
    band = alt.Chart(source).mark_errorband(extent='ci').encode(
        x='Year',
        y=alt.Y('Miles_per_Gallon', title='Miles/Gallon'),
    )
    
    chart = band + line
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_66929))
    get_chart_66929(use_container_width=True)
except Exception as e:
    st.exception(e)

