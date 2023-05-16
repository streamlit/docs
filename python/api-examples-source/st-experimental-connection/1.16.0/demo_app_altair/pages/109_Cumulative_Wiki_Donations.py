import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_19705(use_container_width: bool):
    import altair as alt
    
    source = "https://frdata.wikimedia.org/donationdata-vs-day.csv"
    
    chart = alt.Chart(source).mark_line().encode(
        alt.X('monthdate(date):T', title='Month', axis=alt.Axis(format='%B')),
        alt.Y('max(ytdsum):Q', title='Cumulative Donations', stack=None),
        alt.Color('year(date):O', legend=alt.Legend(title='Year')),
        alt.Order('year(data):O')
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_19705))
    get_chart_19705(use_container_width=True)
except Exception as e:
    st.exception(e)

