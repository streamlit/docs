import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_33644(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.cars()
    
    brush = alt.selection(type='interval', resolve='global')
    
    base = alt.Chart(source).mark_point().encode(
        y='Miles_per_Gallon',
        color=alt.condition(brush, 'Origin', alt.ColorValue('gray')),
    ).add_selection(
        brush
    ).properties(
        width=250,
        height=250
    )
    
    chart = base.encode(x='Horsepower') | base.encode(x='Acceleration')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_33644))
    get_chart_33644(use_container_width=True)
except Exception as e:
    st.exception(e)

