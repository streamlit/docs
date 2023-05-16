import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_15607(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.us_employment()
    
    chart = alt.Chart(source).mark_bar().encode(
        x="month:T",
        y="nonfarm_change:Q",
        color=alt.condition(
            alt.datum.nonfarm_change > 0,
            alt.value("steelblue"),  # The positive color
            alt.value("orange")  # The negative color
        )
    ).properties(width=600)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_15607))
    get_chart_15607(use_container_width=True)
except Exception as e:
    st.exception(e)

