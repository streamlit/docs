import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_1124(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.barley()
    
    points = alt.Chart(source).mark_point(
        filled=True,
        color='black'
    ).encode(
        x=alt.X('mean(yield)', title='Barley Yield'),
        y=alt.Y(
            'variety',
             sort=alt.EncodingSortField(
                 field='yield',
                 op='mean',
                 order='descending'
             )
        )
    ).properties(
        width=400,
        height=250
    )
    
    error_bars = points.mark_rule().encode(
        x='ci0(yield)',
        x2='ci1(yield)',
    )
    
    chart = points + error_bars
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_1124))
    get_chart_1124(use_container_width=True)
except Exception as e:
    st.exception(e)

