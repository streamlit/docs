import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_99776(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    from altair import datum
    
    source = data.iris()
    
    chart = alt.Chart(source).transform_window(
        index='count()'
    ).transform_fold(
        ['petalLength', 'petalWidth', 'sepalLength', 'sepalWidth']
    ).transform_joinaggregate(
         min='min(value)',
         max='max(value)',
         groupby=['key']
    ).transform_calculate(
        minmax_value=(datum.value-datum.min)/(datum.max-datum.min),
        mid=(datum.min+datum.max)/2
    ).mark_line().encode(
        x='key:N',
        y='minmax_value:Q',
        color='species:N',
        detail='index:N',
        opacity=alt.value(0.5)
    ).properties(width=500)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_99776))
    get_chart_99776(use_container_width=True)
except Exception as e:
    st.exception(e)

