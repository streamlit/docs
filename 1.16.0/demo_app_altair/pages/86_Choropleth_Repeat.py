import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_90225(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    states = alt.topo_feature(data.us_10m.url, 'states')
    source = data.population_engineers_hurricanes.url
    variable_list = ['population', 'engineers', 'hurricanes']
    
    chart = alt.Chart(states).mark_geoshape().encode(
        alt.Color(alt.repeat('row'), type='quantitative')
    ).transform_lookup(
        lookup='id',
        from_=alt.LookupData(source, 'id', variable_list)
    ).properties(
        width=500,
        height=300
    ).project(
        type='albersUsa'
    ).repeat(
        row=variable_list
    ).resolve_scale(
        color='independent'
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_90225))
    get_chart_90225(use_container_width=True)
except Exception as e:
    st.exception(e)

