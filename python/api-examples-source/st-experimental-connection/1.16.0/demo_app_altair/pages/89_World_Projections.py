import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_23153(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = alt.topo_feature(data.world_110m.url, 'countries')
    
    base = alt.Chart(source).mark_geoshape(
        fill='#666666',
        stroke='white'
    ).properties(
        width=300,
        height=180
    )
    
    projections = ['equirectangular', 'mercator', 'orthographic', 'gnomonic']
    charts = [base.project(proj).properties(title=proj)
              for proj in projections]
    
    chart = alt.concat(*charts, columns=2)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_23153))
    get_chart_23153(use_container_width=True)
except Exception as e:
    st.exception(e)

