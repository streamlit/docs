import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_98775(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.barley()
    
    chart = alt.Chart(source, title="The Morris Mistake").mark_point().encode(
        alt.X(
            'yield:Q',
            title="Barley Yield (bushels/acre)",
            scale=alt.Scale(zero=False),
            axis=alt.Axis(grid=False)
        ),
        alt.Y(
            'variety:N',
            title="",
            sort='-x',
            axis=alt.Axis(grid=True)
        ),
        color=alt.Color('year:N', legend=alt.Legend(title="Year")),
        row=alt.Row(
            'site:N',
            title="",
            sort=alt.EncodingSortField(field='yield', op='sum', order='descending'),
        )
    ).properties(
        height=alt.Step(20)
    ).configure_view(stroke="transparent")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_98775))
    get_chart_98775(use_container_width=True)
except Exception as e:
    st.exception(e)

