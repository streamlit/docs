import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_8552(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.windvectors()
    
    chart = alt.Chart(source).mark_point(shape="wedge", filled=True).encode(
        latitude="latitude",
        longitude="longitude",
        color=alt.Color(
            "dir", scale=alt.Scale(domain=[0, 360], scheme="rainbow"), legend=None
        ),
        angle=alt.Angle("dir", scale=alt.Scale(domain=[0, 360], range=[180, 540])),
        size=alt.Size("speed", scale=alt.Scale(rangeMax=500)),
    ).project("equalEarth")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_8552))
    get_chart_8552(use_container_width=True)
except Exception as e:
    st.exception(e)

