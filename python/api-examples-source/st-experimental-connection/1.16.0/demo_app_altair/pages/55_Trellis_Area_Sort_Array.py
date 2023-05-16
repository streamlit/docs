import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_63582(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.stocks()
    
    chart = alt.Chart(source).transform_filter(
        alt.datum.symbol != 'GOOG'
    ).mark_area().encode(
        x='date:T',
        y='price:Q',
        color='symbol:N',
        row=alt.Row('symbol:N', sort=['MSFT', 'AAPL', 'IBM', 'AMZN'])
    ).properties(height=50, width=400)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_63582))
    get_chart_63582(use_container_width=True)
except Exception as e:
    st.exception(e)

