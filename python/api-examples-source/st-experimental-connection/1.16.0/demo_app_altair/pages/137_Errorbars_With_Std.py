import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_68326(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.barley()
    
    error_bars = alt.Chart(source).mark_errorbar(extent='stdev').encode(
      x=alt.X('yield:Q', scale=alt.Scale(zero=False)),
      y=alt.Y('variety:N')
    )
    
    points = alt.Chart(source).mark_point(filled=True, color='black').encode(
      x=alt.X('yield:Q', aggregate='mean'),
      y=alt.Y('variety:N'),
    )
    
    chart = error_bars + points
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_68326))
    get_chart_68326(use_container_width=True)
except Exception as e:
    st.exception(e)

