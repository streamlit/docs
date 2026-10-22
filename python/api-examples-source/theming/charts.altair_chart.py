import altair as alt
import streamlit as st
from vega_datasets import data


@st.cache_data
def get_chart():
    import altair as alt
    from vega_datasets import data

    source = data.cars()

    chart = (
        alt.Chart(source)
        .mark_circle()
        .encode(
            x="Horsepower",
            y="Miles_per_Gallon",
            color="Origin",
        )
        .interactive()
    )

    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])

    with tab1:
        st.altair_chart(
            chart, width="stretch", theme="streamlit"
        )
    with tab2:
        st.altair_chart(chart, width="stretch", theme=None)


try:
    get_chart()
except Exception as e:
    st.exception(e)
