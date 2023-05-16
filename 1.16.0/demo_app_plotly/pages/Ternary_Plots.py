import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import inspect

@st.experimental_memo
def get_chart_46274793():
    import plotly.express as px
    df = px.data.election()
    fig = px.scatter_ternary(df, a="Joly", b="Coderre", c="Bergeron")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_46274793))
    get_chart_46274793()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_49576640():
    import plotly.express as px
    df = px.data.election()
    fig = px.scatter_ternary(df, a="Joly", b="Coderre", c="Bergeron", hover_name="district",
        color="winner", size="total", size_max=15,
        color_discrete_map = {"Joly": "blue", "Bergeron": "green", "Coderre":"red"} )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_49576640))
    get_chart_49576640()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_92107987():
    import plotly.graph_objects as go
    
    rawData = [
        {'journalist':75,'developer':25,'designer':0,'label':'point 1'},
        {'journalist':70,'developer':10,'designer':20,'label':'point 2'},
        {'journalist':75,'developer':20,'designer':5,'label':'point 3'},
        {'journalist':5,'developer':60,'designer':35,'label':'point 4'},
        {'journalist':10,'developer':80,'designer':10,'label':'point 5'},
        {'journalist':10,'developer':90,'designer':0,'label':'point 6'},
        {'journalist':20,'developer':70,'designer':10,'label':'point 7'},
        {'journalist':10,'developer':20,'designer':70,'label':'point 8'},
        {'journalist':15,'developer':5,'designer':80,'label':'point 9'},
        {'journalist':10,'developer':10,'designer':80,'label':'point 10'},
        {'journalist':20,'developer':10,'designer':70,'label':'point 11'},
    ];
    
    def makeAxis(title, tickangle):
        return {
          'title': title,
          'titlefont': { 'size': 20 },
          'tickangle': tickangle,
          'tickfont': { 'size': 15 },
          'tickcolor': 'rgba(0,0,0,0)',
          'ticklen': 5,
          'showline': True,
          'showgrid': True
        }
    
    fig = go.Figure(go.Scatterternary({
        'mode': 'markers',
        'a': [i for i in map(lambda x: x['journalist'], rawData)],
        'b': [i for i in map(lambda x: x['developer'], rawData)],
        'c': [i for i in map(lambda x: x['designer'], rawData)],
        'text': [i for i in map(lambda x: x['label'], rawData)],
        'marker': {
            'symbol': 100,
            'color': '#DB7365',
            'size': 14,
            'line': { 'width': 2 }
        }
    }))
    
    fig.update_layout({
        'ternary': {
            'sum': 100,
            'aaxis': makeAxis('Journalist', 0),
            'baxis': makeAxis('<br>Developer', 45),
            'caxis': makeAxis('<br>Designer', -45)
        },
        'annotations': [{
          'showarrow': False,
          'text': 'Simple Ternary Plot with Markers',
            'x': 0.5,
            'y': 1.3,
            'font': { 'size': 15 }
        }]
    })
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_92107987))
    get_chart_92107987()
except Exception as e:
    st.exception(e)

