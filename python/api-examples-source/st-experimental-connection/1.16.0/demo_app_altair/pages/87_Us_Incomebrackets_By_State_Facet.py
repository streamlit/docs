import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_85855(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    states = alt.topo_feature(data.us_10m.url, 'states')
    source = data.income.url
    
    chart = alt.Chart(source).mark_geoshape().encode(
        shape='geo:G',
        color='pct:Q',
        tooltip=['name:N', 'pct:Q'],
        facet=alt.Facet('group:N', columns=2),
    ).transform_lookup(
        lookup='id',
        from_=alt.LookupData(data=states, key='id'),
        as_='geo'
    ).properties(
        width=300,
        height=175,
    ).project(
        type='albersUsa'
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_85855))
    get_chart_85855(use_container_width=True)
except Exception as e:
    st.exception(e)

