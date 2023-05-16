import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_30838(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source=data.barley()
    
    bars = alt.Chart(source).mark_bar().encode(
        x=alt.X('sum(yield):Q', stack='zero'),
        y=alt.Y('variety:N'),
        color=alt.Color('site')
    )
    
    text = alt.Chart(source).mark_text(dx=-15, dy=3, color='white').encode(
        x=alt.X('sum(yield):Q', stack='zero'),
        y=alt.Y('variety:N'),
        detail='site:N',
        text=alt.Text('sum(yield):Q', format='.1f')
    )
    
    chart = bars + text
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_30838))
    get_chart_30838(use_container_width=True)
except Exception as e:
    st.exception(e)

