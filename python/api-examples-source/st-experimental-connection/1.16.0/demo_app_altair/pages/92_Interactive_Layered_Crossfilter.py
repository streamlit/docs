import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_96623(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = alt.UrlData(
        data.flights_2k.url,
        format={'parse': {'date': 'date'}}
    )
    
    brush = alt.selection(type='interval', encodings=['x'])
    
    # Define the base chart, with the common parts of the
    # background and highlights
    base = alt.Chart().mark_bar().encode(
        x=alt.X(alt.repeat('column'), type='quantitative', bin=alt.Bin(maxbins=20)),
        y='count()'
    ).properties(
        width=160,
        height=130
    )
    
    # gray background with selection
    background = base.encode(
        color=alt.value('#ddd')
    ).add_selection(brush)
    
    # blue highlights on the transformed data
    highlight = base.transform_filter(brush)
    
    chart = # layer the two charts & repeat
    alt.layer(
        background,
        highlight,
        data=source
    ).transform_calculate(
        "time",
        "hours(datum.date)"
    ).repeat(column=["distance", "delay", "time"])
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_96623))
    get_chart_96623(use_container_width=True)
except Exception as e:
    st.exception(e)

