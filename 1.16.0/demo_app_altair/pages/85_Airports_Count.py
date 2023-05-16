import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_62092(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    airports = data.airports.url
    states = alt.topo_feature(data.us_10m.url, feature='states')
    
    # US states background
    background = alt.Chart(states).mark_geoshape(
        fill='lightgray',
        stroke='white'
    ).properties(
        width=500,
        height=300
    ).project('albersUsa')
    
    # airport positions on background
    points = alt.Chart(airports).transform_aggregate(
        latitude='mean(latitude)',
        longitude='mean(longitude)',
        count='count()',
        groupby=['state']
    ).mark_circle().encode(
        longitude='longitude:Q',
        latitude='latitude:Q',
        size=alt.Size('count:Q', title='Number of Airports'),
        color=alt.value('steelblue'),
        tooltip=['state:N','count:Q']
    ).properties(
        title='Number of airports in US'
    )
    
    chart = background + points
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_62092))
    get_chart_62092(use_container_width=True)
except Exception as e:
    st.exception(e)

