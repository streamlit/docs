import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_35197(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.flights_5k.url
    
    brush = alt.selection_interval(encodings=['x'])
    
    base = alt.Chart(source).transform_calculate(
        time="hours(datum.date) + minutes(datum.date) / 60"
    ).mark_bar().encode(
        y='count():Q'
    ).properties(
        width=600,
        height=100
    )
    
    chart = alt.vconcat(
      base.encode(
        alt.X('time:Q',
          bin=alt.Bin(maxbins=30, extent=brush),
          scale=alt.Scale(domain=brush)
        )
      ),
      base.encode(
        alt.X('time:Q', bin=alt.Bin(maxbins=30)),
      ).add_selection(brush)
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_35197))
    get_chart_35197(use_container_width=True)
except Exception as e:
    st.exception(e)

