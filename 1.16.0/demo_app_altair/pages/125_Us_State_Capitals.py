import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_91875(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    states = alt.topo_feature(data.us_10m.url, 'states')
    capitals = data.us_state_capitals.url
    
    # US states background
    background = alt.Chart(states).mark_geoshape(
        fill='lightgray',
        stroke='white'
    ).properties(
        title='US State Capitols',
        width=650,
        height=400
    ).project('albersUsa')
    
    # Points and text
    hover = alt.selection(type='single', on='mouseover', nearest=True,
                          fields=['lat', 'lon'])
    
    base = alt.Chart(capitals).encode(
        longitude='lon:Q',
        latitude='lat:Q',
    )
    
    text = base.mark_text(dy=-5, align='right').encode(
        alt.Text('city', type='nominal'),
        opacity=alt.condition(~hover, alt.value(0), alt.value(1))
    )
    
    points = base.mark_point().encode(
        color=alt.value('black'),
        size=alt.condition(~hover, alt.value(30), alt.value(100))
    ).add_selection(hover)
    
    chart = background + points + text
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_91875))
    get_chart_91875(use_container_width=True)
except Exception as e:
    st.exception(e)

