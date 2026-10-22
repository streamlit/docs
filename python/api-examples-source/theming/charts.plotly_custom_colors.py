import plotly.express as px
import streamlit as st


@st.cache_data
def get_chart_1111():
    st.subheader("Define a custom colorscale")
    df = px.data.iris()  # replace with your own data source
    fig = px.scatter(
        df,
        x="sepal_width",
        y="sepal_length",
        color="sepal_length",
        color_continuous_scale="reds",
    )

    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, width="stretch", theme="streamlit")
    with tab2:
        st.plotly_chart(fig, width="stretch", theme=None)


try:
    get_chart_1111()
except Exception as e:
    st.exception(e)
