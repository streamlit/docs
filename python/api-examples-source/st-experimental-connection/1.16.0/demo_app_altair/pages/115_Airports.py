import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_99637(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    airports = data.airports()
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
    points = alt.Chart(airports).mark_circle(
        size=10,
        color='steelblue'
    ).encode(
        longitude='longitude:Q',
        latitude='latitude:Q',
        tooltip=['name', 'city', 'state']
    )
    
    chart = background + points
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_99637))
    get_chart_99637(use_container_width=True)
except Exception as e:
    st.exception(e)

