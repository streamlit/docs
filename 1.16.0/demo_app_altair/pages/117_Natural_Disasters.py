import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_64313(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.disasters.url
    
    chart = alt.Chart(source).mark_circle(
        opacity=0.8,
        stroke='black',
        strokeWidth=1
    ).encode(
        alt.X('Year:O', axis=alt.Axis(labelAngle=0)),
        alt.Y('Entity:N'),
        alt.Size('Deaths:Q',
            scale=alt.Scale(range=[0, 4000]),
            legend=alt.Legend(title='Annual Global Deaths')
        ),
        alt.Color('Entity:N', legend=None)
    ).properties(
        width=450,
        height=320
    ).transform_filter(
        alt.datum.Entity != 'All natural disasters'
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_64313))
    get_chart_64313(use_container_width=True)
except Exception as e:
    st.exception(e)

