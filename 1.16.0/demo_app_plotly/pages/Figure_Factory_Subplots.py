import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import inspect

@st.experimental_memo
def get_chart_82884145():
    import plotly.figure_factory as ff
    import plotly.graph_objects as go
    
    import numpy as np
    
    ## Create first figure
    x1,y1 = np.meshgrid(np.arange(0, 2, .2), np.arange(0, 2, .2))
    u1 = np.cos(x1)*y1
    v1 = np.sin(x1)*y1
    
    fig1 = ff.create_quiver(x1, y1, u1, v1, name='Quiver')
    
    ## Create second figure
    x = np.linspace(-3, 3, 100)
    y = np.linspace(-3, 3, 100)
    Y, X = np.meshgrid(x, y)
    u = -1 - X**2 + Y
    v = 1 + X - Y**2
    
    fig2 = ff.create_streamline(x, y, u, v, arrow_scale=.1, name='Steamline')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_82884145))
    get_chart_82884145()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_87684158():
    for i in range(len(fig1.data)):
        fig1.data[i].xaxis='x1'
        fig1.data[i].yaxis='y1'
    
    fig1.layout.xaxis1.update({'anchor': 'y1'})
    fig1.layout.yaxis1.update({'anchor': 'x1', 'domain': [.55, 1]})
    
    for i in range(len(fig2.data)):
        fig2.data[i].xaxis='x2'
        fig2.data[i].yaxis='y2'
    
    # initialize xaxis2 and yaxis2
    fig2['layout']['xaxis2'] = {}
    fig2['layout']['yaxis2'] = {}
    
    fig2.layout.xaxis2.update({'anchor': 'y2'})
    fig2.layout.yaxis2.update({'anchor': 'x2', 'domain': [0, .45]})
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_87684158))
    get_chart_87684158()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_58303935():
    fig = go.Figure()
    fig.add_traces([fig1.data[0], fig2.data[0]])
    
    fig.layout.update(fig1.layout)
    fig.layout.update(fig2.layout)
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_58303935))
    get_chart_58303935()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_96508875():
    import plotly.graph_objects as go
    import plotly.figure_factory as ff
    
    table_data = [['Team', 'Wins', 'Losses', 'Ties'],
                  ['Montréal<br>Canadiens', 18, 4, 0],
                  ['Dallas Stars', 18, 5, 0],
                  ['NY Rangers', 16, 5, 0],
                  ['Boston<br>Bruins', 13, 8, 0],
                  ['Chicago<br>Blackhawks', 13, 8, 0],
                  ['LA Kings', 13, 8, 0],
                  ['Ottawa<br>Senators', 12, 5, 0]]
    
    fig = ff.create_table(table_data, height_constant=60)
    
    teams = ['Montréal Canadiens', 'Dallas Stars', 'NY Rangers',
             'Boston Bruins', 'Chicago Blackhawks', 'LA Kings', 'Ottawa Senators']
    GFPG = [3.54, 3.48, 3.0, 3.27, 2.83, 2.45, 3.18]
    GAPG = [2.17, 2.57, 2.0, 2.91, 2.57, 2.14, 2.77]
    
    trace1 = go.Scatter(x=teams, y=GFPG,
                        marker=dict(color='#0099ff'),
                        name='Goals For<br>Per Game',
                        xaxis='x2', yaxis='y2')
    trace2 = go.Scatter(x=teams, y=GAPG,
                        marker=dict(color='#404040'),
                        name='Goals Against<br>Per Game',
                        xaxis='x2', yaxis='y2')
    
    fig.add_traces([trace1, trace2])
    
    # initialize xaxis2 and yaxis2
    fig['layout']['xaxis2'] = {}
    fig['layout']['yaxis2'] = {}
    
    # Edit layout for subplots
    fig.layout.xaxis.update({'domain': [0, .5]})
    fig.layout.xaxis2.update({'domain': [0.6, 1.]})
    
    # The graph's yaxis MUST BE anchored to the graph's xaxis
    fig.layout.yaxis2.update({'anchor': 'x2'})
    fig.layout.yaxis2.update({'title': 'Goals'})
    
    # Update the margins to add a title and see graph x-labels.
    fig.layout.margin.update({'t':50, 'b':100})
    fig.layout.update({'title': '2016 Hockey Stats'})
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_96508875))
    get_chart_96508875()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_46122655():
    import plotly.graph_objects as go
    import plotly.figure_factory as ff
    
    # Add table data
    table_data = [['Team', 'Wins', 'Losses', 'Ties'],
                  ['Montréal<br>Canadiens', 18, 4, 0],
                  ['Dallas Stars', 18, 5, 0],
                  ['NY Rangers', 16, 5, 0],
                  ['Boston<br>Bruins', 13, 8, 0],
                  ['Chicago<br>Blackhawks', 13, 8, 0],
                  ['Ottawa<br>Senators', 12, 5, 0]]
    
    # Initialize a figure with ff.create_table(table_data)
    fig = ff.create_table(table_data, height_constant=60)
    
    # Add graph data
    teams = ['Montréal Canadiens', 'Dallas Stars', 'NY Rangers',
             'Boston Bruins', 'Chicago Blackhawks', 'Ottawa Senators']
    GFPG = [3.54, 3.48, 3.0, 3.27, 2.83, 3.18]
    GAPG = [2.17, 2.57, 2.0, 2.91, 2.57, 2.77]
    
    # Make traces for graph
    trace1 = go.Bar(x=teams, y=GFPG, xaxis='x2', yaxis='y2',
                    marker=dict(color='#0099ff'),
                    name='Goals For<br>Per Game')
    trace2 = go.Bar(x=teams, y=GAPG, xaxis='x2', yaxis='y2',
                    marker=dict(color='#404040'),
                    name='Goals Against<br>Per Game')
    
    # Add trace data to figure
    fig.add_traces([trace1, trace2])
    
    # initialize xaxis2 and yaxis2
    fig['layout']['xaxis2'] = {}
    fig['layout']['yaxis2'] = {}
    
    # Edit layout for subplots
    fig.layout.yaxis.update({'domain': [0, .45]})
    fig.layout.yaxis2.update({'domain': [.6, 1]})
    
    # The graph's yaxis2 MUST BE anchored to the graph's xaxis2 and vice versa
    fig.layout.yaxis2.update({'anchor': 'x2'})
    fig.layout.xaxis2.update({'anchor': 'y2'})
    fig.layout.yaxis2.update({'title': 'Goals'})
    
    # Update the margins to add a title and see graph x-labels.
    fig.layout.margin.update({'t':75, 'l':50})
    fig.layout.update({'title': '2016 Hockey Stats'})
    
    # Update the height because adding a graph vertically will interact with
    # the plot height calculated for the table
    fig.layout.update({'height':800})
    
    # Plot!
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_46122655))
    get_chart_46122655()
except Exception as e:
    st.exception(e)

