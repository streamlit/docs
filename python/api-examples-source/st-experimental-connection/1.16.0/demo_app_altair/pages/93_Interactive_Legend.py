import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_39196(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.unemployment_across_industries.url
    
    selection = alt.selection_multi(fields=['series'], bind='legend')
    
    chart = alt.Chart(source).mark_area().encode(
        alt.X('yearmonth(date):T', axis=alt.Axis(domain=False, format='%Y', tickSize=0)),
        alt.Y('sum(count):Q', stack='center', axis=None),
        alt.Color('series:N', scale=alt.Scale(scheme='category20b')),
        opacity=alt.condition(selection, alt.value(1), alt.value(0.2))
    ).add_selection(
        selection
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_39196))
    get_chart_39196(use_container_width=True)
except Exception as e:
    st.exception(e)

