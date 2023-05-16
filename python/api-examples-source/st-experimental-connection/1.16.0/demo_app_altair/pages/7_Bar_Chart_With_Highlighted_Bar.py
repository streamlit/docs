import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_35550(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.wheat()
    
    chart = alt.Chart(source).mark_bar().encode(
        x='year:O',
        y="wheat:Q",
        # The highlight will be set on the result of a conditional statement
        color=alt.condition(
            alt.datum.year == 1810,  # If the year is 1810 this test returns True,
            alt.value('orange'),     # which sets the bar orange.
            alt.value('steelblue')   # And if it's not true it sets the bar steelblue.
        )
    ).properties(width=600)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_35550))
    get_chart_35550(use_container_width=True)
except Exception as e:
    st.exception(e)

