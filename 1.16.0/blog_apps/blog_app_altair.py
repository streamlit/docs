import altair as alt
import streamlit as st
from vega_datasets import data


@st.experimental_memo
def get_chart():

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
            chart,
            theme="streamlit",
            use_container_width=True,
        )
    with tab2:
        st.altair_chart(
            chart,
            theme=None,
            use_container_width=True,
        )


try:
    get_chart()
except Exception as e:
    st.exception(e)
