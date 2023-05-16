import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_58875(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    # Since the data is more than 5,000 rows we'll import it from a URL
    source = data.zipcodes.url
    
    chart = alt.Chart(source).transform_calculate(
        "leading digit", alt.expr.substring(alt.datum.zip_code, 0, 1)
    ).mark_circle(size=3).encode(
        longitude='longitude:Q',
        latitude='latitude:Q',
        color='leading digit:N',
        tooltip='zip_code:N'
    ).project(
        type='albersUsa'
    ).properties(
        width=650,
        height=400
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_58875))
    get_chart_58875(use_container_width=True)
except Exception as e:
    st.exception(e)

