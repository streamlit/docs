import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_41204(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    counties = alt.topo_feature(data.us_10m.url, 'counties')
    source = data.unemployment.url
    
    chart = alt.Chart(counties).mark_geoshape().encode(
        color='rate:Q'
    ).transform_lookup(
        lookup='id',
        from_=alt.LookupData(source, 'id', ['rate'])
    ).project(
        type='albersUsa'
    ).properties(
        width=500,
        height=300
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_41204))
    get_chart_41204(use_container_width=True)
except Exception as e:
    st.exception(e)

