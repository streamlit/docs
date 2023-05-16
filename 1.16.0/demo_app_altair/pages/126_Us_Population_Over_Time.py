import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_54368(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.population.url
    
    pink_blue = alt.Scale(domain=('Male', 'Female'),
                          range=["steelblue", "salmon"])
    
    slider = alt.binding_range(min=1900, max=2000, step=10)
    select_year = alt.selection_single(name="year", fields=['year'],
                                       bind=slider, init={'year': 2000})
    
    chart = alt.Chart(source).mark_bar().encode(
        x=alt.X('sex:N', title=None),
        y=alt.Y('people:Q', scale=alt.Scale(domain=(0, 12000000))),
        color=alt.Color('sex:N', scale=pink_blue),
        column='age:O'
    ).properties(
        width=20
    ).add_selection(
        select_year
    ).transform_calculate(
        "sex", alt.expr.if_(alt.datum.sex == 1, "Male", "Female")
    ).transform_filter(
        select_year
    ).configure_facet(
        spacing=8
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_54368))
    get_chart_54368(use_container_width=True)
except Exception as e:
    st.exception(e)

