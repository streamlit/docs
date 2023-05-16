import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import inspect

@st.experimental_memo
def get_chart_47579095():
    import plotly.express as px
    
    df = px.data.gapminder().query("country=='Canada'")
    fig = px.line(df, x="year", y="lifeExp", title='Life expectancy in Canada')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_47579095))
    get_chart_47579095()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_72200008():
    import plotly.express as px
    
    df = px.data.gapminder().query("continent=='Oceania'")
    fig = px.line(df, x="year", y="lifeExp", color='country')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_72200008))
    get_chart_72200008()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_35798159():
    import plotly.express as px
    import pandas as pd
    
    df = pd.DataFrame(dict(
        x = [1, 3, 2, 4],
        y = [1, 2, 3, 4]
    ))
    fig = px.line(df, x="x", y="y", title="Unsorted Input") 
    
    df = df.sort_values(by="x")
    fig = px.line(df, x="x", y="y", title="Sorted Input") 
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_35798159))
    get_chart_35798159()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_50238021():
    import plotly.express as px
    
    df = px.data.gapminder().query("country in ['Canada', 'Botswana']")
    
    fig = px.line(df, x="lifeExp", y="gdpPercap", color="country", text="year")
    fig.update_traces(textposition="bottom right")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_50238021))
    get_chart_50238021()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_11625053():
    import plotly.express as px
    df = px.data.gapminder().query("continent == 'Oceania'")
    fig = px.line(df, x='year', y='lifeExp', color='country', markers=True)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_11625053))
    get_chart_11625053()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_51048942():
    import plotly.express as px
    df = px.data.gapminder().query("continent == 'Oceania'")
    fig = px.line(df, x='year', y='lifeExp', color='country', symbol="country")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_51048942))
    get_chart_51048942()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_93606325():
    import plotly.express as px
    
    df = px.data.stocks()
    fig = px.line(df, x='date', y="GOOG")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_93606325))
    get_chart_93606325()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_97173839():
    import plotly.express as px
    df = px.data.stocks(indexed=True)
    fig = px.line(df, facet_row="company", facet_row_spacing=0.01, height=200, width=200)
    
    # hide and lock down axes
    fig.update_xaxes(visible=False, fixedrange=True)
    fig.update_yaxes(visible=False, fixedrange=True)
    
    # remove facet/subplot labels
    fig.update_layout(annotations=[], overwrite=True)
    
    # strip down the rest of the plot
    fig.update_layout(
        showlegend=False,
        plot_bgcolor="white",
        margin=dict(t=10,l=10,b=10,r=10)
    )
    
    # disable the modebar for such a small plot
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_97173839))
    get_chart_97173839()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_23329750():
    import plotly.graph_objects as go
    import numpy as np
    
    x = np.arange(10)
    
    fig = go.Figure(data=go.Scatter(x=x, y=x**2))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_23329750))
    get_chart_23329750()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_30252616():
    import plotly.graph_objects as go
    
    # Create random data with numpy
    import numpy as np
    np.random.seed(1)
    
    N = 100
    random_x = np.linspace(0, 1, N)
    random_y0 = np.random.randn(N) + 5
    random_y1 = np.random.randn(N)
    random_y2 = np.random.randn(N) - 5
    
    # Create traces
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=random_x, y=random_y0,
                        mode='lines',
                        name='lines'))
    fig.add_trace(go.Scatter(x=random_x, y=random_y1,
                        mode='lines+markers',
                        name='lines+markers'))
    fig.add_trace(go.Scatter(x=random_x, y=random_y2,
                        mode='markers', name='markers'))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_30252616))
    get_chart_30252616()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_90910098():
    import plotly.graph_objects as go
    
    x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    
    fig = go.Figure()
    
    fig.add_trace(go.Scatter(
        x=x,
        y=[10, 20, None, 15, 10, 5, 15, None, 20, 10, 10, 15, 25, 20, 10],
        name = '<b>No</b> Gaps', # Style name/legend entry with html tags
        connectgaps=True # override default to connect the gaps
    ))
    fig.add_trace(go.Scatter(
        x=x,
        y=[5, 15, None, 10, 5, 0, 10, None, 15, 5, 5, 10, 20, 15, 5],
        name='Gaps',
    ))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_90910098))
    get_chart_90910098()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_42947925():
    import plotly.graph_objects as go
    import numpy as np
    
    x = np.array([1, 2, 3, 4, 5])
    y = np.array([1, 3, 2, 3, 1])
    
    fig = go.Figure()
    fig.add_trace(go.Scatter(x=x, y=y, name="linear",
                        line_shape='linear'))
    fig.add_trace(go.Scatter(x=x, y=y + 5, name="spline",
                        text=["tweak line smoothness<br>with 'smoothing' in line object"],
                        hoverinfo='text+name',
                        line_shape='spline'))
    fig.add_trace(go.Scatter(x=x, y=y + 10, name="vhv",
                        line_shape='vhv'))
    fig.add_trace(go.Scatter(x=x, y=y + 15, name="hvh",
                        line_shape='hvh'))
    fig.add_trace(go.Scatter(x=x, y=y + 20, name="vh",
                        line_shape='vh'))
    fig.add_trace(go.Scatter(x=x, y=y + 25, name="hv",
                        line_shape='hv'))
    
    fig.update_traces(hoverinfo='text+name', mode='lines+markers')
    fig.update_layout(legend=dict(y=0.5, traceorder='reversed', font_size=16))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_42947925))
    get_chart_42947925()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_57831802():
    import plotly.graph_objects as go
    import numpy as np
    
    title = 'Main Source for News'
    labels = ['Television', 'Newspaper', 'Internet', 'Radio']
    colors = ['rgb(67,67,67)', 'rgb(115,115,115)', 'rgb(49,130,189)', 'rgb(189,189,189)']
    
    mode_size = [8, 8, 12, 8]
    line_size = [2, 2, 4, 2]
    
    x_data = np.vstack((np.arange(2001, 2014),)*4)
    
    y_data = np.array([
        [74, 82, 80, 74, 73, 72, 74, 70, 70, 66, 66, 69],
        [45, 42, 50, 46, 36, 36, 34, 35, 32, 31, 31, 28],
        [13, 14, 20, 24, 20, 24, 24, 40, 35, 41, 43, 50],
        [18, 21, 18, 21, 16, 14, 13, 18, 17, 16, 19, 23],
    ])
    
    fig = go.Figure()
    
    for i in range(0, 4):
        fig.add_trace(go.Scatter(x=x_data[i], y=y_data[i], mode='lines',
            name=labels[i],
            line=dict(color=colors[i], width=line_size[i]),
            connectgaps=True,
        ))
    
        # endpoints
        fig.add_trace(go.Scatter(
            x=[x_data[i][0], x_data[i][-1]],
            y=[y_data[i][0], y_data[i][-1]],
            mode='markers',
            marker=dict(color=colors[i], size=mode_size[i])
        ))
    
    fig.update_layout(
        xaxis=dict(
            showline=True,
            showgrid=False,
            showticklabels=True,
            linecolor='rgb(204, 204, 204)',
            linewidth=2,
            ticks='outside',
            tickfont=dict(
                family='Arial',
                size=12,
                color='rgb(82, 82, 82)',
            ),
        ),
        yaxis=dict(
            showgrid=False,
            zeroline=False,
            showline=False,
            showticklabels=False,
        ),
        autosize=False,
        margin=dict(
            autoexpand=False,
            l=100,
            r=20,
            t=110,
        ),
        showlegend=False,
        plot_bgcolor='white'
    )
    
    annotations = []
    
    # Adding labels
    for y_trace, label, color in zip(y_data, labels, colors):
        # labeling the left_side of the plot
        annotations.append(dict(xref='paper', x=0.05, y=y_trace[0],
                                      xanchor='right', yanchor='middle',
                                      text=label + ' {}%'.format(y_trace[0]),
                                      font=dict(family='Arial',
                                                size=16),
                                      showarrow=False))
        # labeling the right_side of the plot
        annotations.append(dict(xref='paper', x=0.95, y=y_trace[11],
                                      xanchor='left', yanchor='middle',
                                      text='{}%'.format(y_trace[11]),
                                      font=dict(family='Arial',
                                                size=16),
                                      showarrow=False))
    # Title
    annotations.append(dict(xref='paper', yref='paper', x=0.0, y=1.05,
                                  xanchor='left', yanchor='bottom',
                                  text='Main Source for News',
                                  font=dict(family='Arial',
                                            size=30,
                                            color='rgb(37,37,37)'),
                                  showarrow=False))
    # Source
    annotations.append(dict(xref='paper', yref='paper', x=0.5, y=-0.1,
                                  xanchor='center', yanchor='top',
                                  text='Source: PewResearch Center & ' +
                                       'Storytelling with data',
                                  font=dict(family='Arial',
                                            size=12,
                                            color='rgb(150,150,150)'),
                                  showarrow=False))
    
    fig.update_layout(annotations=annotations)
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_57831802))
    get_chart_57831802()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_46283721():
    import plotly.graph_objects as go
    import numpy as np
    
    
    
    x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    x_rev = x[::-1]
    
    # Line 1
    y1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    y1_upper = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    y1_lower = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    y1_lower = y1_lower[::-1]
    
    # Line 2
    y2 = [5, 2.5, 5, 7.5, 5, 2.5, 7.5, 4.5, 5.5, 5]
    y2_upper = [5.5, 3, 5.5, 8, 6, 3, 8, 5, 6, 5.5]
    y2_lower = [4.5, 2, 4.4, 7, 4, 2, 7, 4, 5, 4.75]
    y2_lower = y2_lower[::-1]
    
    # Line 3
    y3 = [10, 8, 6, 4, 2, 0, 2, 4, 2, 0]
    y3_upper = [11, 9, 7, 5, 3, 1, 3, 5, 3, 1]
    y3_lower = [9, 7, 5, 3, 1, -.5, 1, 3, 1, -1]
    y3_lower = y3_lower[::-1]
    
    
    fig = go.Figure()
    
    fig.add_trace(go.Scatter(
        x=x+x_rev,
        y=y1_upper+y1_lower,
        fill='toself',
        fillcolor='rgba(0,100,80,0.2)',
        line_color='rgba(255,255,255,0)',
        showlegend=False,
        name='Fair',
    ))
    fig.add_trace(go.Scatter(
        x=x+x_rev,
        y=y2_upper+y2_lower,
        fill='toself',
        fillcolor='rgba(0,176,246,0.2)',
        line_color='rgba(255,255,255,0)',
        name='Premium',
        showlegend=False,
    ))
    fig.add_trace(go.Scatter(
        x=x+x_rev,
        y=y3_upper+y3_lower,
        fill='toself',
        fillcolor='rgba(231,107,243,0.2)',
        line_color='rgba(255,255,255,0)',
        showlegend=False,
        name='Ideal',
    ))
    fig.add_trace(go.Scatter(
        x=x, y=y1,
        line_color='rgb(0,100,80)',
        name='Fair',
    ))
    fig.add_trace(go.Scatter(
        x=x, y=y2,
        line_color='rgb(0,176,246)',
        name='Premium',
    ))
    fig.add_trace(go.Scatter(
        x=x, y=y3,
        line_color='rgb(231,107,243)',
        name='Ideal',
    ))
    
    fig.update_traces(mode='lines')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_46283721))
    get_chart_46283721()
except Exception as e:
    st.exception(e)

