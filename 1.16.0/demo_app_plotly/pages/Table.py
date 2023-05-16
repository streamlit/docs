import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import inspect

@st.experimental_memo
def get_chart_67650112():
    import plotly.graph_objects as go
    
    fig = go.Figure(data=[go.Table(header=dict(values=['A Scores', 'B Scores']),
                     cells=dict(values=[[100, 90, 80, 90], [95, 85, 75, 95]]))
                         ])
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_67650112))
    get_chart_67650112()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_19901006():
    import plotly.graph_objects as go
    
    fig = go.Figure(data=[go.Table(
        header=dict(values=['A Scores', 'B Scores'],
                    line_color='darkslategray',
                    fill_color='lightskyblue',
                    align='left'),
        cells=dict(values=[[100, 90, 80, 90], # 1st column
                           [95, 85, 75, 95]], # 2nd column
                   line_color='darkslategray',
                   fill_color='lightcyan',
                   align='left'))
    ])
    
    fig.update_layout(width=500, height=300)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_19901006))
    get_chart_19901006()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_37893177():
    import plotly.graph_objects as go
    import pandas as pd
    
    df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/2014_usa_states.csv')
    
    fig = go.Figure(data=[go.Table(
        header=dict(values=list(df.columns),
                    fill_color='paleturquoise',
                    align='left'),
        cells=dict(values=[df.Rank, df.State, df.Postal, df.Population],
                   fill_color='lavender',
                   align='left'))
    ])
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_37893177))
    get_chart_37893177()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_95663215():
    import plotly.graph_objects as go
    
    values = [['Salaries', 'Office', 'Merchandise', 'Legal', '<b>TOTAL<br>EXPENSES</b>'], #1st col
      ["Lorem ipsum dolor sit amet, tollit discere inermis pri ut. Eos ea iusto timeam, an prima laboramus vim. Id usu aeterno adversarium, summo mollis timeam vel ad",
      "Lorem ipsum dolor sit amet, tollit discere inermis pri ut. Eos ea iusto timeam, an prima laboramus vim. Id usu aeterno adversarium, summo mollis timeam vel ad",
      "Lorem ipsum dolor sit amet, tollit discere inermis pri ut. Eos ea iusto timeam, an prima laboramus vim. Id usu aeterno adversarium, summo mollis timeam vel ad",
      "Lorem ipsum dolor sit amet, tollit discere inermis pri ut. Eos ea iusto timeam, an prima laboramus vim. Id usu aeterno adversarium, summo mollis timeam vel ad",
      "Lorem ipsum dolor sit amet, tollit discere inermis pri ut. Eos ea iusto timeam, an prima laboramus vim. Id usu aeterno adversarium, summo mollis timeam vel ad"]]
    
    
    fig = go.Figure(data=[go.Table(
      columnorder = [1,2],
      columnwidth = [80,400],
      header = dict(
        values = [['<b>EXPENSES</b><br>as of July 2017'],
                      ['<b>DESCRIPTION</b>']],
        line_color='darkslategray',
        fill_color='royalblue',
        align=['left','center'],
        font=dict(color='white', size=12),
        height=40
      ),
      cells=dict(
        values=values,
        line_color='darkslategray',
        fill=dict(color=['paleturquoise', 'white']),
        align=['left', 'center'],
        font_size=12,
        height=30)
        )
    ])
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_95663215))
    get_chart_95663215()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_41368043():
    import plotly.graph_objects as go
    
    headerColor = 'grey'
    rowEvenColor = 'lightgrey'
    rowOddColor = 'white'
    
    fig = go.Figure(data=[go.Table(
      header=dict(
        values=['<b>EXPENSES</b>','<b>Q1</b>','<b>Q2</b>','<b>Q3</b>','<b>Q4</b>'],
        line_color='darkslategray',
        fill_color=headerColor,
        align=['left','center'],
        font=dict(color='white', size=12)
      ),
      cells=dict(
        values=[
          ['Salaries', 'Office', 'Merchandise', 'Legal', '<b>TOTAL</b>'],
          [1200000, 20000, 80000, 2000, 12120000],
          [1300000, 20000, 70000, 2000, 130902000],
          [1300000, 20000, 120000, 2000, 131222000],
          [1400000, 20000, 90000, 2000, 14102000]],
        line_color='darkslategray',
        # 2-D list of colors for alternating rows
        fill_color = [[rowOddColor,rowEvenColor,rowOddColor, rowEvenColor,rowOddColor]*5],
        align = ['left', 'center'],
        font = dict(color = 'darkslategray', size = 11)
        ))
    ])
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_41368043))
    get_chart_41368043()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_60403169():
    import plotly.graph_objects as go
    
    import pandas as pd
    
    colors = ['rgb(239, 243, 255)', 'rgb(189, 215, 231)', 'rgb(107, 174, 214)',
              'rgb(49, 130, 189)', 'rgb(8, 81, 156)']
    data = {'Year' : [2010, 2011, 2012, 2013, 2014], 'Color' : colors}
    df = pd.DataFrame(data)
    
    fig = go.Figure(data=[go.Table(
      header=dict(
        values=["Color", "<b>YEAR</b>"],
        line_color='white', fill_color='white',
        align='center', font=dict(color='black', size=12)
      ),
      cells=dict(
        values=[df.Color, df.Year],
        line_color=[df.Color], fill_color=[df.Color],
        align='center', font=dict(color='black', size=11)
      ))
    ])
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_60403169))
    get_chart_60403169()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_18862136():
    import plotly.graph_objects as go
    from plotly.colors import n_colors
    import numpy as np
    np.random.seed(1)
    
    colors = n_colors('rgb(255, 200, 200)', 'rgb(200, 0, 0)', 9, colortype='rgb')
    a = np.random.randint(low=0, high=9, size=10)
    b = np.random.randint(low=0, high=9, size=10)
    c = np.random.randint(low=0, high=9, size=10)
    
    fig = go.Figure(data=[go.Table(
      header=dict(
        values=['<b>Column A</b>', '<b>Column B</b>', '<b>Column C</b>'],
        line_color='white', fill_color='white',
        align='center',font=dict(color='black', size=12)
      ),
      cells=dict(
        values=[a, b, c],
        line_color=[np.array(colors)[a],np.array(colors)[b], np.array(colors)[c]],
        fill_color=[np.array(colors)[a],np.array(colors)[b], np.array(colors)[c]],
        align='center', font=dict(color='white', size=11)
        ))
    ])
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_18862136))
    get_chart_18862136()
except Exception as e:
    st.exception(e)

