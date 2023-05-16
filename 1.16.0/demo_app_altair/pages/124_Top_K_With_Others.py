import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_61878(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.movies.url
    
    chart = alt.Chart(source).mark_bar().encode(
        x=alt.X("aggregate_gross:Q", aggregate="mean", title=None),
        y=alt.Y(
            "ranked_director:N",
            sort=alt.Sort(op="mean", field="aggregate_gross", order="descending"),
            title=None,
        ),
    ).transform_aggregate(
        aggregate_gross='mean(Worldwide_Gross)',
        groupby=["Director"],
    ).transform_window(
        rank='row_number()',
        sort=[alt.SortField("aggregate_gross", order="descending")],
    ).transform_calculate(
        ranked_director="datum.rank < 10 ? datum.Director : 'All Others'"
    ).properties(
        title="Top Directors by Average Worldwide Gross",
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_61878))
    get_chart_61878(use_container_width=True)
except Exception as e:
    st.exception(e)

