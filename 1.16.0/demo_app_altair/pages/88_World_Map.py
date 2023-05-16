import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_1590(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    # Data generators for the background
    sphere = alt.sphere()
    graticule = alt.graticule()
    
    # Source of land data
    source = alt.topo_feature(data.world_110m.url, 'countries')
    
    chart = # Layering and configuring the components
    alt.layer(
        alt.Chart(sphere).mark_geoshape(fill='lightblue'),
        alt.Chart(graticule).mark_geoshape(stroke='white', strokeWidth=0.5),
        alt.Chart(source).mark_geoshape(fill='ForestGreen', stroke='black')
    ).project(
        'naturalEarth1'
    ).properties(width=600, height=400).configure_view(stroke=None)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_1590))
    get_chart_1590(use_container_width=True)
except Exception as e:
    st.exception(e)

