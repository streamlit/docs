import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import inspect

@st.experimental_memo
def get_chart_83992296():
    import plotly.graph_objects as go
    
    fig = go.Figure(go.Waterfall(
        name = "20", orientation = "v",
        measure = ["relative", "relative", "total", "relative", "relative", "total"],
        x = ["Sales", "Consulting", "Net revenue", "Purchases", "Other expenses", "Profit before tax"],
        textposition = "outside",
        text = ["+60", "+80", "", "-40", "-20", "Total"],
        y = [60, 80, 0, -40, -20, 0],
        connector = {"line":{"color":"rgb(63, 63, 63)"}},
    ))
    
    fig.update_layout(
            title = "Profit and loss statement 2018",
            showlegend = True
    )
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_83992296))
    get_chart_83992296()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_69325092():
    import plotly.graph_objects as go
    
    fig = go.Figure()
    
    fig.add_trace(go.Waterfall(
        x = [["2016", "2017", "2017", "2017", "2017", "2018", "2018", "2018", "2018"],
            ["initial", "q1", "q2", "q3", "total", "q1", "q2", "q3", "total"]],
        measure = ["absolute", "relative", "relative", "relative", "total", "relative", "relative", "relative", "total"],
        y = [1, 2, 3, -1, None, 1, 2, -4, None],
        base = 1000
    ))
    
    fig.add_trace(go.Waterfall(
        x = [["2016", "2017", "2017", "2017", "2017", "2018", "2018", "2018", "2018"],
            ["initial", "q1", "q2", "q3", "total", "q1", "q2", "q3", "total"]],
        measure = ["absolute", "relative", "relative", "relative", "total", "relative", "relative", "relative", "total"],
        y = [1.1, 2.2, 3.3, -1.1, None, 1.1, 2.2, -4.4, None],
        base = 1000
    ))
    
    fig.update_layout(
        waterfallgroupgap = 0.5,
    )
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_69325092))
    get_chart_69325092()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_2812108():
    import plotly.graph_objects as go
    
    fig = go.Figure(go.Waterfall(
        x = [["2016", "2017", "2017", "2017", "2017", "2018", "2018", "2018", "2018"],
           ["initial", "q1", "q2", "q3", "total", "q1", "q2", "q3", "total"]],
        measure = ["absolute", "relative", "relative", "relative", "total", "relative", "relative", "relative", "total"],
        y = [10, 20, 30, -10, None, 10, 20, -40, None], base = 300,
        decreasing = {"marker":{"color":"Maroon", "line":{"color":"red", "width":2}}},
        increasing = {"marker":{"color":"Teal"}},
        totals = {"marker":{"color":"deep sky blue", "line":{"color":"blue", "width":3}}}
    ))
    
    fig.update_layout(title = "Profit and loss statement", waterfallgap = 0.3)
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_2812108))
    get_chart_2812108()
except Exception as e:
    st.exception(e)

