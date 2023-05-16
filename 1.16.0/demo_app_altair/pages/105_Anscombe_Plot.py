import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_66695(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.anscombe()
    
    chart = alt.Chart(source).mark_circle().encode(
        alt.X('X', scale=alt.Scale(zero=False)),
        alt.Y('Y', scale=alt.Scale(zero=False)),
        alt.Facet('Series', columns=2),
    ).properties(
        width=180,
        height=180,
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_66695))
    get_chart_66695(use_container_width=True)
except Exception as e:
    st.exception(e)

