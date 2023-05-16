import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_2480(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.gapminder_health_income.url
    
    chart = alt.Chart(source).mark_circle().encode(
        alt.X('income:Q', scale=alt.Scale(type='log')),
        alt.Y('health:Q', scale=alt.Scale(zero=False)),
        size='population:Q'
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_2480))
    get_chart_2480(use_container_width=True)
except Exception as e:
    st.exception(e)

