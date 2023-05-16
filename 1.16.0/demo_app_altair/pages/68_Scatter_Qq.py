import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_53370(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.normal_2d.url
    
    base = alt.Chart(source).transform_quantile(
        'u',
        step=0.01,
        as_ = ['p', 'v']
    ).transform_calculate(
        uniform = 'quantileUniform(datum.p)',
        normal = 'quantileNormal(datum.p)'
    ).mark_point().encode(
        alt.Y('v:Q')
    )
    
    chart = base.encode(x='uniform:Q') | base.encode(x='normal:Q')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_53370))
    get_chart_53370(use_container_width=True)
except Exception as e:
    st.exception(e)

