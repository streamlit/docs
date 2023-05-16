import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_87694(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.barley.url
    
    chart = alt.Chart(source).mark_point().encode(
        alt.X('median(yield):Q', scale=alt.Scale(zero=False)),
        y='variety:O',
        color='year:N',
        facet=alt.Facet('site:O', columns=2),
    ).properties(
        width=200,
        height=100,
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_87694))
    get_chart_87694(use_container_width=True)
except Exception as e:
    st.exception(e)

