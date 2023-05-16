import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_28408(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.seattle_weather()
    
    base = alt.Chart(source).encode(
        alt.X('month(date):T', axis=alt.Axis(title=None))
    )
    
    area = base.mark_area(opacity=0.3, color='#57A44C').encode(
        alt.Y('average(temp_max)',
              axis=alt.Axis(title='Avg. Temperature (°C)', titleColor='#57A44C')),
        alt.Y2('average(temp_min)')
    )
    
    line = base.mark_line(stroke='#5276A7', interpolate='monotone').encode(
        alt.Y('average(precipitation)',
              axis=alt.Axis(title='Precipitation (inches)', titleColor='#5276A7'))
    )
    
    chart = alt.layer(area, line).resolve_scale(
        y = 'independent'
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_28408))
    get_chart_28408(use_container_width=True)
except Exception as e:
    st.exception(e)

