import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_60800(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.barley()
    
    bars = alt.Chart().mark_bar().encode(
        x='year:O',
        y=alt.Y('mean(yield):Q', title='Mean Yield'),
        color='year:N',
    )
    
    error_bars = alt.Chart().mark_errorbar(extent='ci').encode(
        x='year:O',
        y='yield:Q'
    )
    
    chart = alt.layer(bars, error_bars, data=source).facet(
        column='site:N'
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_60800))
    get_chart_60800(use_container_width=True)
except Exception as e:
    st.exception(e)

