import plotly.express as px
import streamlit as st


@st.cache_data
def get_chart():
    df = px.data.gapminder()

    fig = px.scatter(
        df.query("year==2007"),
        x="gdpPercap",
        y="lifeExp",
        size="pop",
        color="continent",
        hover_name="country",
        log_x=True,
        size_max=60,
    )

    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, width="stretch", theme="streamlit")
    with tab2:
        st.plotly_chart(fig, width="stretch", theme=None)


try:
    get_chart()
except Exception as e:
    st.exception(e)
