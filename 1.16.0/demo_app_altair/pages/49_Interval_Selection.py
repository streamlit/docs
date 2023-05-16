import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_47479(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.sp500.url
    
    brush = alt.selection(type='interval', encodings=['x'])
    
    base = alt.Chart(source).mark_area().encode(
        x = 'date:T',
        y = 'price:Q'
    ).properties(
        width=600,
        height=200
    )
    
    upper = base.encode(
        alt.X('date:T', scale=alt.Scale(domain=brush))
    )
    
    lower = base.properties(
        height=60
    ).add_selection(brush)
    
    chart = upper & lower
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_47479))
    get_chart_47479(use_container_width=True)
except Exception as e:
    st.exception(e)

