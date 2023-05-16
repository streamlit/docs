import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_19651(use_container_width: bool):
    import pandas as pd
    import altair as alt
    
    source = pd.DataFrame({"values": [12, 23, 47, 6, 52, 19]})
    
    base = alt.Chart(source).encode(
        theta=alt.Theta("values:Q", stack=True),
        radius=alt.Radius("values", scale=alt.Scale(type="sqrt", zero=True, rangeMin=20)),
        color="values:N",
    )
    
    c1 = base.mark_arc(innerRadius=20, stroke="#fff")
    
    c2 = base.mark_text(radiusOffset=10).encode(text="values:Q")
    
    chart = c1 + c2
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_19651))
    get_chart_19651(use_container_width=True)
except Exception as e:
    st.exception(e)

