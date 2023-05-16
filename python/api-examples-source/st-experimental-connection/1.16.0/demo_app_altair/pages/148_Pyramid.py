import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_25946(use_container_width: bool):
    import altair as alt
    import pandas as pd
    
    category = ['Sky', 'Shady side of a pyramid', 'Sunny side of a pyramid']
    color = ["#416D9D", "#674028", "#DEAC58"]
    df = pd.DataFrame({'category': category, 'value': [75, 10, 15]})
    
    chart = alt.Chart(df).mark_arc(outerRadius=80).encode(
        alt.Theta('value:Q', scale=alt.Scale(range=[2.356, 8.639])),
        alt.Color('category:N',
            scale=alt.Scale(domain=category, range=color),
            legend=alt.Legend(title=None, orient='none', legendX=160, legendY=50)),
        order='value:Q'
    ).properties(width=150, height=150).configure_view(strokeOpacity=0)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_25946))
    get_chart_25946(use_container_width=True)
except Exception as e:
    st.exception(e)

