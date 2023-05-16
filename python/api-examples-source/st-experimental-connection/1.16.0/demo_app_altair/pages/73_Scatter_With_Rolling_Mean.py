import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_9222(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.seattle_weather()
    
    line = alt.Chart(source).mark_line(
        color='red',
        size=3
    ).transform_window(
        rolling_mean='mean(temp_max)',
        frame=[-15, 15]
    ).encode(
        x='date:T',
        y='rolling_mean:Q'
    )
    
    points = alt.Chart(source).mark_point().encode(
        x='date:T',
        y=alt.Y('temp_max:Q',
                axis=alt.Axis(title='Max Temp'))
    )
    
    chart = points + line
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_9222))
    get_chart_9222(use_container_width=True)
except Exception as e:
    st.exception(e)

