import inspect

import plotly.express as px
import streamlit as st


@st.experimental_memo
def get_chart_1111():

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
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)


try:
    st.header("Custom colorscale")
    st.expander("See code").code(inspect.getsource(get_chart_1111))
    get_chart_1111()
except Exception as e:
    st.exception(e)


@st.experimental_memo
def get_chart_3333():
    df = px.data.gapminder()
    df_2007 = df.query("year==2007")

    fig = px.scatter(
        df_2007,
        x="gdpPercap",
        y="lifeExp",
        size="pop",
        color="continent",
        log_x=True,
        size_max=60,
        template="plotly_dark",
        title="Gapminder 2007: 'plotly_dark' theme",
    )

    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)


try:
    st.expander("See code").code(inspect.getsource(get_chart_3333))
    get_chart_3333()
except Exception as e:
    st.exception(e)

st.header("Custom grids")


@st.experimental_memo
def get_chart_4444():
    fig = px.line(y=[1, 0])
    fig.update_xaxes(showgrid=False)
    fig.update_yaxes(showgrid=False)

    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)


try:
    st.subheader("No grid")
    st.expander("See code").code(inspect.getsource(get_chart_4444))
    get_chart_4444()
except Exception as e:
    st.exception(e)


@st.experimental_memo
def get_chart_5555():
    fig = px.line(y=[1, 0])
    fig.update_xaxes(showgrid=True)
    fig.update_yaxes(showgrid=False)

    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)


try:
    st.subheader("Only vertical grid")
    st.expander("See code").code(inspect.getsource(get_chart_5555))
    get_chart_5555()
except Exception as e:
    st.exception(e)


@st.experimental_memo
def get_chart_6666():
    fig = px.line(y=[1, 0])
    fig.update_xaxes(showgrid=False)
    fig.update_yaxes(showgrid=True)

    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)


try:
    st.subheader("Only horizontal grid")
    st.expander("See code").code(inspect.getsource(get_chart_6666))
    get_chart_6666()
except Exception as e:
    st.exception(e)


@st.experimental_memo
def get_chart_7777():

    fig = px.line(y=[1, 0])
    fig.update_xaxes(showgrid=True)
    fig.update_yaxes(showgrid=True)

    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)


try:
    st.subheader("Both grid")
    st.expander("See code").code(inspect.getsource(get_chart_7777))
    get_chart_7777()
except Exception as e:
    st.exception(e)


@st.experimental_memo
def get_chart_8888():
    df = px.data.gapminder().query("year == 2007")

    fig = px.scatter(df, x="gdpPercap", y="lifeExp", hover_name="country", log_x=True)

    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)


try:
    st.subheader("Log axis")
    st.expander("See code").code(inspect.getsource(get_chart_8888))
    get_chart_8888()
except Exception as e:
    st.exception(e)
