import streamlit as st
from vega_datasets import data


@st.cache_data
def get_chart():
    source = data.cars()

    chart = {
        "mark": "point",
        "encoding": {
            "x": {
                "field": "Horsepower",
                "type": "quantitative",
            },
            "y": {
                "field": "Miles_per_Gallon",
                "type": "quantitative",
            },
            "color": {"field": "Origin", "type": "nominal"},
            "shape": {"field": "Origin", "type": "nominal"},
        },
    }

    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Vega-Lite native theme"])

    with tab1:
        st.vega_lite_chart(
            source, chart, width="stretch", theme="streamlit"
        )
    with tab2:
        st.vega_lite_chart(
            source, chart, width="stretch", theme=None
        )


try:
    get_chart()
except Exception as e:
    st.exception(e)
