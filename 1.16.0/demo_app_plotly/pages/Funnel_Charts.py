import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import inspect

@st.experimental_memo
def get_chart_90091149():
    import plotly.express as px
    data = dict(
        number=[39, 27.4, 20.6, 11, 2],
        stage=["Website visit", "Downloads", "Potential customers", "Requested price", "invoice sent"])
    fig = px.funnel(data, x='number', y='stage')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_90091149))
    get_chart_90091149()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_23633134():
    import plotly.express as px
    import pandas as pd
    stages = ["Website visit", "Downloads", "Potential customers", "Requested price", "invoice sent"]
    df_mtl = pd.DataFrame(dict(number=[39, 27.4, 20.6, 11, 3], stage=stages))
    df_mtl['office'] = 'Montreal'
    df_toronto = pd.DataFrame(dict(number=[52, 36, 18, 14, 5], stage=stages))
    df_toronto['office'] = 'Toronto'
    df = pd.concat([df_mtl, df_toronto], axis=0)
    fig = px.funnel(df, x='number', y='stage', color='office')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_23633134))
    get_chart_23633134()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_53116902():
    from plotly import graph_objects as go
    
    fig = go.Figure(go.Funnel(
        y = ["Website visit", "Downloads", "Potential customers", "Requested price", "invoice sent"],
        x = [39, 27.4, 20.6, 11, 2]))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_53116902))
    get_chart_53116902()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_28168342():
    from plotly import graph_objects as go
    
    fig = go.Figure()
    
    fig.add_trace(go.Funnel(
        name = 'Montreal',
        y = ["Website visit", "Downloads", "Potential customers", "Requested price"],
        x = [120, 60, 30, 20],
        textinfo = "value+percent initial"))
    
    fig.add_trace(go.Funnel(
        name = 'Toronto',
        orientation = "h",
        y = ["Website visit", "Downloads", "Potential customers", "Requested price", "invoice sent"],
        x = [100, 60, 40, 30, 20],
        textposition = "inside",
        textinfo = "value+percent previous"))
    
    fig.add_trace(go.Funnel(
        name = 'Vancouver',
        orientation = "h",
        y = ["Website visit", "Downloads", "Potential customers", "Requested price", "invoice sent", "Finalized"],
        x = [90, 70, 50, 30, 10, 5],
        textposition = "outside",
        textinfo = "value+percent total"))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_28168342))
    get_chart_28168342()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_7488403():
    import plotly.express as px
    fig = px.funnel_area(names=["The 1st","The 2nd", "The 3rd", "The 4th", "The 5th"],
                        values=[5, 4, 3, 2, 1])
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_7488403))
    get_chart_7488403()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_32603326():
    from plotly import graph_objects as go
    
    fig = go.Figure(go.Funnelarea(
        text = ["The 1st","The 2nd", "The 3rd", "The 4th", "The 5th"],
        values = [5, 4, 3, 2, 1]
        ))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_32603326))
    get_chart_32603326()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_50817751():
    from plotly import graph_objects as go
    
    fig = go.Figure(go.Funnelarea(
          values = [5, 4, 3, 2, 1], text = ["The 1st","The 2nd", "The 3rd", "The 4th", "The 5th"],
          marker = {"colors": ["deepskyblue", "lightsalmon", "tan", "teal", "silver"],
                    "line": {"color": ["wheat", "wheat", "blue", "wheat", "wheat"], "width": [0, 1, 5, 0, 4]}},
          textfont = {"family": "Old Standard TT, serif", "size": 13, "color": "black"}, opacity = 0.65))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_50817751))
    get_chart_50817751()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_90177478():
    from plotly import graph_objects as go
    
    fig = go.Figure()
    
    fig.add_trace(go.Funnelarea(
        scalegroup = "first", values = [500, 450, 340, 230, 220, 110], textinfo = "value",
        title = {"position": "top center", "text": "Sales for Sale Person A in U.S."},
        domain = {"x": [0, 0.5], "y": [0, 0.5]}))
    
    fig.add_trace(go.Funnelarea(
        scalegroup = "first", values = [600, 500, 400, 300, 200, 100], textinfo = "value",
        title = {"position": "top center", "text": "Sales of Sale Person B in Canada"},
        domain = {"x": [0, 0.5], "y": [0.55, 1]}))
    
    fig.add_trace(go.Funnelarea(
        scalegroup = "second", values = [510, 480, 440, 330, 220, 100], textinfo = "value",
        title = {"position": "top left", "text": "Sales of Sale Person A in Canada"},
        domain = {"x": [0.55, 1], "y": [0, 0.5]}))
    
    fig.add_trace(go.Funnelarea(
                scalegroup = "second", values = [360, 250, 240, 130, 120, 60],
                textinfo = "value", title = {"position": "top left", "text": "Sales of Sale Person B in U.S."},
                domain = {"x": [0.55, 1], "y": [0.55, 1]}))
    
    fig.update_layout(
                margin = {"l": 200, "r": 200}, shapes = [
                {"x0": 0, "x1": 0.5, "y0": 0, "y1": 0.5},
                {"x0": 0, "x1": 0.5, "y0": 0.55, "y1": 1},
                {"x0": 0.55, "x1": 1, "y0": 0, "y1": 0.5},
                {"x0": 0.55, "x1": 1, "y0": 0.55, "y1": 1}])
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_90177478))
    get_chart_90177478()
except Exception as e:
    st.exception(e)

