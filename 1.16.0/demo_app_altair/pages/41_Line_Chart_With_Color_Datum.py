import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_73940(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.movies()
    
    chart = alt.Chart(source).mark_line().encode(
        x=alt.X("IMDB_Rating", bin=True),
        y=alt.Y(
            alt.repeat("layer"), aggregate="mean", title="Mean of US and Worldwide Gross"
        ),
        color=alt.datum(alt.repeat("layer")),
    ).repeat(layer=["US_Gross", "Worldwide_Gross"])
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_73940))
    get_chart_73940(use_container_width=True)
except Exception as e:
    st.exception(e)

