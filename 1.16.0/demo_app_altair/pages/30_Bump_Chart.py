import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_80653(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    import pandas as pd
    
    stocks = data.stocks()
    source = stocks.groupby([pd.Grouper(key="date", freq="6M"),"symbol"]).mean().reset_index()
    
    chart = alt.Chart(source).mark_line(point = True).encode(
        x = alt.X("date:O", timeUnit="yearmonth", title="date"),
        y="rank:O",
        color=alt.Color("symbol:N")
    ).transform_window(
        rank="rank()",
        sort=[alt.SortField("price", order="descending")],
        groupby=["date"]
    ).properties(
        title="Bump Chart for Stock Prices",
        width=600,
        height=150,
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_80653))
    get_chart_80653(use_container_width=True)
except Exception as e:
    st.exception(e)

