import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_52888(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.movies.url
    
    chart = alt.Chart(source).transform_window(
        cumulative_count="count()",
        sort=[{"field": "IMDB_Rating"}],
    ).mark_area().encode(
        x="IMDB_Rating:Q",
        y="cumulative_count:Q"
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_52888))
    get_chart_52888(use_container_width=True)
except Exception as e:
    st.exception(e)

