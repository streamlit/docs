import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_59996(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.seattle_weather()
    brush = alt.selection(type='interval', encodings=['x'])
    
    bars = alt.Chart().mark_bar().encode(
        x='month(date):O',
        y='mean(precipitation):Q',
        opacity=alt.condition(brush, alt.OpacityValue(1), alt.OpacityValue(0.7)),
    ).add_selection(
        brush
    )
    
    line = alt.Chart().mark_rule(color='firebrick').encode(
        y='mean(precipitation):Q',
        size=alt.SizeValue(3)
    ).transform_filter(
        brush
    )
    
    chart = alt.layer(bars, line, data=source)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_59996))
    get_chart_59996(use_container_width=True)
except Exception as e:
    st.exception(e)

