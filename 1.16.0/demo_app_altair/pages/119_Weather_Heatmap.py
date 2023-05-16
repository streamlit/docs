import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_16200(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    # Since the data is more than 5,000 rows we'll import it from a URL
    source = data.seattle_temps.url
    
    chart = alt.Chart(
        source,
        title="2010 Daily High Temperature (F) in Seattle, WA"
    ).mark_rect().encode(
        x='date(date):O',
        y='month(date):O',
        color=alt.Color('max(temp):Q', scale=alt.Scale(scheme="inferno")),
        tooltip=[
            alt.Tooltip('monthdate(date):T', title='Date'),
            alt.Tooltip('max(temp):Q', title='Max Temp')
        ]
    ).properties(width=550)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_16200))
    get_chart_16200(use_container_width=True)
except Exception as e:
    st.exception(e)

