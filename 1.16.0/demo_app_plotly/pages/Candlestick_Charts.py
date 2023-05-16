import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import inspect

@st.experimental_memo
def get_chart_56799382():
    import plotly.graph_objects as go
    
    import pandas as pd
    from datetime import datetime
    
    df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv')
    
    fig = go.Figure(data=[go.Candlestick(x=df['Date'],
                    open=df['AAPL.Open'],
                    high=df['AAPL.High'],
                    low=df['AAPL.Low'],
                    close=df['AAPL.Close'])])
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_56799382))
    get_chart_56799382()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_15188618():
    import plotly.graph_objects as go
    import pandas as pd
    
    df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv')
    
    fig = go.Figure(data=[go.Candlestick(x=df['Date'],
                    open=df['AAPL.Open'], high=df['AAPL.High'],
                    low=df['AAPL.Low'], close=df['AAPL.Close'])
                         ])
    
    fig.update_layout(xaxis_rangeslider_visible=False)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_15188618))
    get_chart_15188618()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_70637952():
    import plotly.graph_objects as go
    import pandas as pd
    
    
    df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv')
    
    fig = go.Figure(data=[go.Candlestick(x=df['Date'],
                    open=df['AAPL.Open'], high=df['AAPL.High'],
                    low=df['AAPL.Low'], close=df['AAPL.Close'])
                          ])
    
    fig.update_layout(
        title='The Great Recession',
        yaxis_title='AAPL Stock',
        shapes = [dict(
            x0='2016-12-09', x1='2016-12-09', y0=0, y1=1, xref='x', yref='paper',
            line_width=2)],
        annotations=[dict(
            x='2016-12-09', y=0.05, xref='x', yref='paper',
            showarrow=False, xanchor='left', text='Increase Period Begins')]
    )
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_70637952))
    get_chart_70637952()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_68007654():
    import plotly.graph_objects as go
    import pandas as pd
    
    df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv')
    
    fig = go.Figure(data=[go.Candlestick(
        x=df['Date'],
        open=df['AAPL.Open'], high=df['AAPL.High'],
        low=df['AAPL.Low'], close=df['AAPL.Close'],
        increasing_line_color= 'cyan', decreasing_line_color= 'gray'
    )])
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_68007654))
    get_chart_68007654()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_64586748():
    import plotly.graph_objects as go
    from datetime import datetime
    
    open_data = [33.0, 33.3, 33.5, 33.0, 34.1]
    high_data = [33.1, 33.3, 33.6, 33.2, 34.8]
    low_data = [32.7, 32.7, 32.8, 32.6, 32.8]
    close_data = [33.0, 32.9, 33.3, 33.1, 33.1]
    dates = [datetime(year=2013, month=10, day=10),
             datetime(year=2013, month=11, day=10),
             datetime(year=2013, month=12, day=10),
             datetime(year=2014, month=1, day=10),
             datetime(year=2014, month=2, day=10)]
    
    fig = go.Figure(data=[go.Candlestick(x=dates,
                           open=open_data, high=high_data,
                           low=low_data, close=close_data)])
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_64586748))
    get_chart_64586748()
except Exception as e:
    st.exception(e)

