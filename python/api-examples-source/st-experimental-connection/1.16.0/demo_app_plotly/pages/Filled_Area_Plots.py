import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import inspect

@st.experimental_memo
def get_chart_94424738():
    import plotly.express as px
    df = px.data.gapminder()
    fig = px.area(df, x="year", y="pop", color="continent", line_group="country")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_94424738))
    get_chart_94424738()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_89373519():
    import plotly.express as px
    df = px.data.medals_long()
    
    fig = px.area(df, x="medal", y="count", color="nation",
                 pattern_shape="nation", pattern_shape_sequence=[".", "x", "+"])
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_89373519))
    get_chart_89373519()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_17975897():
    import plotly.graph_objects as go
    
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=[1, 2, 3, 4], y=[0, 2, 3, 5], fill='tozeroy')) # fill down to xaxis
    fig.add_trace(go.Scatter(x=[1, 2, 3, 4], y=[3, 5, 1, 7], fill='tonexty')) # fill to trace0 y
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_17975897))
    get_chart_17975897()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_35532020():
    import plotly.graph_objects as go
    
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=[1, 2, 3, 4], y=[0, 2, 3, 5], fill='tozeroy',
                        mode='none' # override default markers+lines
                        ))
    fig.add_trace(go.Scatter(x=[1, 2, 3, 4], y=[3, 5, 1, 7], fill='tonexty',
                        mode= 'none'))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_35532020))
    get_chart_35532020()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_27023877():
    import plotly.graph_objects as go
    
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=[1, 2, 3, 4], y=[3, 4, 8, 3],
        fill=None,
        mode='lines',
        line_color='indigo',
        ))
    fig.add_trace(go.Scatter(
        x=[1, 2, 3, 4],
        y=[1, 6, 2, 6],
        fill='tonexty', # fill area between trace0 and trace1
        mode='lines', line_color='indigo'))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_27023877))
    get_chart_27023877()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_75203451():
    import plotly.graph_objects as go
    
    x=['Winter', 'Spring', 'Summer', 'Fall']
    
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=x, y=[40, 60, 40, 10],
        hoverinfo='x+y',
        mode='lines',
        line=dict(width=0.5, color='rgb(131, 90, 241)'),
        stackgroup='one' # define stack group
    ))
    fig.add_trace(go.Scatter(
        x=x, y=[20, 10, 10, 60],
        hoverinfo='x+y',
        mode='lines',
        line=dict(width=0.5, color='rgb(111, 231, 219)'),
        stackgroup='one'
    ))
    fig.add_trace(go.Scatter(
        x=x, y=[40, 30, 50, 30],
        hoverinfo='x+y',
        mode='lines',
        line=dict(width=0.5, color='rgb(184, 247, 212)'),
        stackgroup='one'
    ))
    
    fig.update_layout(yaxis_range=(0, 100))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_75203451))
    get_chart_75203451()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_17599104():
    import plotly.graph_objects as go
    
    x=['Winter', 'Spring', 'Summer', 'Fall']
    fig = go.Figure()
    
    fig.add_trace(go.Scatter(
        x=x, y=[40, 20, 30, 40],
        mode='lines',
        line=dict(width=0.5, color='rgb(184, 247, 212)'),
        stackgroup='one',
        groupnorm='percent' # sets the normalization for the sum of the stackgroup
    ))
    fig.add_trace(go.Scatter(
        x=x, y=[50, 70, 40, 60],
        mode='lines',
        line=dict(width=0.5, color='rgb(111, 231, 219)'),
        stackgroup='one'
    ))
    fig.add_trace(go.Scatter(
        x=x, y=[70, 80, 60, 70],
        mode='lines',
        line=dict(width=0.5, color='rgb(127, 166, 238)'),
        stackgroup='one'
    ))
    fig.add_trace(go.Scatter(
        x=x, y=[100, 100, 100, 100],
        mode='lines',
        line=dict(width=0.5, color='rgb(131, 90, 241)'),
        stackgroup='one'
    ))
    
    fig.update_layout(
        showlegend=True,
        xaxis_type='category',
        yaxis=dict(
            type='linear',
            range=[1, 100],
            ticksuffix='%'))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_17599104))
    get_chart_17599104()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_17965049():
    import plotly.graph_objects as go
    
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=[0,0.5,1,1.5,2], y=[0,1,2,1,0],
                        fill='toself', fillcolor='darkviolet',
                        hoveron = 'points+fills', # select where hover is active
                        line_color='darkviolet',
                        text="Points + Fills",
                        hoverinfo = 'text+x+y'))
    
    fig.add_trace(go.Scatter(x=[3,3.5,4,4.5,5], y=[0,1,2,1,0],
                        fill='toself', fillcolor = 'violet',
                        hoveron='points',
                        line_color='violet',
                        text="Points only",
                        hoverinfo='text+x+y'))
    
    fig.update_layout(
        title = "hover on <i>points</i> or <i>fill</i>",
        xaxis_range = [0,5.2],
        yaxis_range = [0,3]
    )
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_17965049))
    get_chart_17965049()
except Exception as e:
    st.exception(e)

