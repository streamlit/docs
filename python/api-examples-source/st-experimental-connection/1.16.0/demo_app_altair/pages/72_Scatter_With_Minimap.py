import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_18264(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.seattle_weather()
    
    zoom = alt.selection_interval(encodings=["x", "y"])
    
    minimap = (
        alt.Chart(source)
        .mark_point()
        .add_selection(zoom)
        .encode(
            x="date:T",
            y="temp_max:Q",
            color=alt.condition(zoom, "weather", alt.value("lightgray")),
        )
        .properties(
            width=200,
            height=200,
            title="Minimap -- click and drag to zoom in the detail view",
        )
    )
    
    detail = (
        alt.Chart(source)
        .mark_point()
        .encode(
            x=alt.X(
                "date:T", scale=alt.Scale(domain={"selection": zoom.name, "encoding": "x"})
            ),
            y=alt.Y(
                "temp_max:Q",
                scale=alt.Scale(domain={"selection": zoom.name, "encoding": "y"}),
            ),
            color="weather",
        )
        .properties(width=600, height=400, title="Seattle weather -- detail view")
    )
    
    chart = detail | minimap
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_18264))
    get_chart_18264(use_container_width=True)
except Exception as e:
    st.exception(e)

