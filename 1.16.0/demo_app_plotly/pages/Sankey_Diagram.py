import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import inspect

@st.experimental_memo
def get_chart_58002525():
    import plotly.graph_objects as go
    
    fig = go.Figure(data=[go.Sankey(
        node = dict(
          pad = 15,
          thickness = 20,
          line = dict(color = "black", width = 0.5),
          label = ["A1", "A2", "B1", "B2", "C1", "C2"],
          color = "blue"
        ),
        link = dict(
          source = [0, 1, 0, 2, 3, 3], # indices correspond to labels, eg A1, A2, A1, B1, ...
          target = [2, 3, 3, 4, 4, 5],
          value = [8, 4, 2, 8, 4, 2]
      ))])
    
    fig.update_layout(title_text="Basic Sankey Diagram", font_size=10)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_58002525))
    get_chart_58002525()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_25713448():
    import plotly.graph_objects as go
    import urllib, json
    
    url = 'https://raw.githubusercontent.com/plotly/plotly.js/master/test/image/mocks/sankey_energy.json'
    response = urllib.request.urlopen(url)
    data = json.loads(response.read())
    
    # override gray link colors with 'source' colors
    opacity = 0.4
    # change 'magenta' to its 'rgba' value to add opacity
    data['data'][0]['node']['color'] = ['rgba(255,0,255, 0.8)' if color == "magenta" else color for color in data['data'][0]['node']['color']]
    data['data'][0]['link']['color'] = [data['data'][0]['node']['color'][src].replace("0.8", str(opacity))
                                        for src in data['data'][0]['link']['source']]
    
    fig = go.Figure(data=[go.Sankey(
        valueformat = ".0f",
        valuesuffix = "TWh",
        # Define nodes
        node = dict(
          pad = 15,
          thickness = 15,
          line = dict(color = "black", width = 0.5),
          label =  data['data'][0]['node']['label'],
          color =  data['data'][0]['node']['color']
        ),
        # Add links
        link = dict(
          source =  data['data'][0]['link']['source'],
          target =  data['data'][0]['link']['target'],
          value =  data['data'][0]['link']['value'],
          label =  data['data'][0]['link']['label'],
          color =  data['data'][0]['link']['color']
    ))])
    
    fig.update_layout(title_text="Energy forecast for 2050<br>Source: Department of Energy & Climate Change, Tom Counsell via <a href='https://bost.ocks.org/mike/sankey/'>Mike Bostock</a>",
                      font_size=10)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_25713448))
    get_chart_25713448()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_9439537():
    import plotly.graph_objects as go
    import urllib, json
    
    url = 'https://raw.githubusercontent.com/plotly/plotly.js/master/test/image/mocks/sankey_energy.json'
    response = urllib.request.urlopen(url)
    data = json.loads(response.read())
    
    fig = go.Figure(data=[go.Sankey(
        valueformat = ".0f",
        valuesuffix = "TWh",
        node = dict(
          pad = 15,
          thickness = 15,
          line = dict(color = "black", width = 0.5),
          label =  data['data'][0]['node']['label'],
          color =  data['data'][0]['node']['color']
        ),
        link = dict(
          source =  data['data'][0]['link']['source'],
          target =  data['data'][0]['link']['target'],
          value =  data['data'][0]['link']['value'],
          label =  data['data'][0]['link']['label']
      ))])
    
    fig.update_layout(
        hovermode = 'x',
        title="Energy forecast for 2050<br>Source: Department of Energy & Climate Change, Tom Counsell via <a href='https://bost.ocks.org/mike/sankey/'>Mike Bostock</a>",
        font=dict(size = 10, color = 'white'),
        plot_bgcolor='black',
        paper_bgcolor='black'
    )
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_9439537))
    get_chart_9439537()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_51638299():
    import plotly.graph_objects as go
    
    fig = go.Figure(data=[go.Sankey(
        node = dict(
          pad = 15,
          thickness = 20,
          line = dict(color = "black", width = 0.5),
          label = ["A1", "A2", "B1", "B2", "C1", "C2"],
          customdata = ["Long name A1", "Long name A2", "Long name B1", "Long name B2",
                        "Long name C1", "Long name C2"],
          hovertemplate='Node %{customdata} has total value %{value}<extra></extra>',
          color = "blue"
        ),
        link = dict(
          source = [0, 1, 0, 2, 3, 3], # indices correspond to labels, eg A1, A2, A2, B1, ...
          target = [2, 3, 3, 4, 4, 5],
          value = [8, 4, 2, 8, 4, 2],
          customdata = ["q","r","s","t","u","v"],
          hovertemplate='Link from node %{source.customdata}<br />'+
            'to node%{target.customdata}<br />has value %{value}'+
            '<br />and data %{customdata}<extra></extra>',
      ))])
    
    fig.update_layout(title_text="Basic Sankey Diagram", font_size=10)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_51638299))
    get_chart_51638299()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_39587052():
    import plotly.graph_objects as go
    
    fig = go.Figure(go.Sankey(
        arrangement = "snap",
        node = {
            "label": ["A", "B", "C", "D", "E", "F"],
            "x": [0.2, 0.1, 0.5, 0.7, 0.3, 0.5],
            "y": [0.7, 0.5, 0.2, 0.4, 0.2, 0.3],
            'pad':10},  # 10 Pixels
        link = {
            "source": [0, 0, 1, 2, 5, 4, 3, 5],
            "target": [5, 3, 4, 3, 0, 2, 2, 3],
            "value": [1, 2, 1, 1, 1, 1, 1, 2]}))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_39587052))
    get_chart_39587052()
except Exception as e:
    st.exception(e)

