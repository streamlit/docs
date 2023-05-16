import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_84551(use_container_width: bool):
    import altair as alt
    import pandas as pd
    
    source = pd.DataFrame([
          {'country': 'Great Britain', 'animal': 'cattle'},
          {'country': 'Great Britain', 'animal': 'cattle'},
          {'country': 'Great Britain', 'animal': 'cattle'},
          {'country': 'Great Britain', 'animal': 'pigs'},
          {'country': 'Great Britain', 'animal': 'pigs'},
          {'country': 'Great Britain', 'animal': 'sheep'},
          {'country': 'Great Britain', 'animal': 'sheep'},
          {'country': 'Great Britain', 'animal': 'sheep'},
          {'country': 'Great Britain', 'animal': 'sheep'},
          {'country': 'Great Britain', 'animal': 'sheep'},
          {'country': 'Great Britain', 'animal': 'sheep'},
          {'country': 'Great Britain', 'animal': 'sheep'},
          {'country': 'Great Britain', 'animal': 'sheep'},
          {'country': 'Great Britain', 'animal': 'sheep'},
          {'country': 'Great Britain', 'animal': 'sheep'},
          {'country': 'United States', 'animal': 'cattle'},
          {'country': 'United States', 'animal': 'cattle'},
          {'country': 'United States', 'animal': 'cattle'},
          {'country': 'United States', 'animal': 'cattle'},
          {'country': 'United States', 'animal': 'cattle'},
          {'country': 'United States', 'animal': 'cattle'},
          {'country': 'United States', 'animal': 'cattle'},
          {'country': 'United States', 'animal': 'cattle'},
          {'country': 'United States', 'animal': 'cattle'},
          {'country': 'United States', 'animal': 'pigs'},
          {'country': 'United States', 'animal': 'pigs'},
          {'country': 'United States', 'animal': 'pigs'},
          {'country': 'United States', 'animal': 'pigs'},
          {'country': 'United States', 'animal': 'pigs'},
          {'country': 'United States', 'animal': 'pigs'},
          {'country': 'United States', 'animal': 'sheep'},
          {'country': 'United States', 'animal': 'sheep'},
          {'country': 'United States', 'animal': 'sheep'},
          {'country': 'United States', 'animal': 'sheep'},
          {'country': 'United States', 'animal': 'sheep'},
          {'country': 'United States', 'animal': 'sheep'},
          {'country': 'United States', 'animal': 'sheep'}
        ])
    
    
    chart = alt.Chart(source).mark_text(size=45, baseline='middle').encode(
        alt.X('x:O', axis=None),
        alt.Y('animal:O', axis=None),
        alt.Row('country:N', header=alt.Header(title='')),
        alt.Text('emoji:N')
    ).transform_calculate(
        emoji="{'cattle': '🐄', 'pigs': '🐖', 'sheep': '🐏'}[datum.animal]"
    ).transform_window(
        x='rank()',
        groupby=['country', 'animal']
    ).properties(width=550, height=140)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_84551))
    get_chart_84551(use_container_width=True)
except Exception as e:
    st.exception(e)

