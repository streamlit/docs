import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_58065(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.stocks()
    
    highlight = alt.selection(type='single', on='mouseover',
                              fields=['symbol'], nearest=True)
    
    base = alt.Chart(source).encode(
        x='date:T',
        y='price:Q',
        color='symbol:N'
    )
    
    points = base.mark_circle().encode(
        opacity=alt.value(0)
    ).add_selection(
        highlight
    ).properties(
        width=600
    )
    
    lines = base.mark_line().encode(
        size=alt.condition(~highlight, alt.value(1), alt.value(3))
    )
    
    chart = points + lines
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_58065))
    get_chart_58065(use_container_width=True)
except Exception as e:
    st.exception(e)

