import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_25501(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.unemployment_across_industries.url
    
    chart = alt.Chart(source).mark_area().encode(
        alt.X('yearmonth(date):T',
            axis=alt.Axis(format='%Y', domain=False, tickSize=0)
        ),
        alt.Y('sum(count):Q', stack='center', axis=None),
        alt.Color('series:N',
            scale=alt.Scale(scheme='category20b')
        )
    ).interactive()
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_25501))
    get_chart_25501(use_container_width=True)
except Exception as e:
    st.exception(e)

