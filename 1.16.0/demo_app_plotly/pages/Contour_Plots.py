import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import inspect

@st.experimental_memo
def get_chart_77100278():
    import plotly.graph_objects as go
    
    fig = go.Figure(data =
        go.Contour(
            z=[[10, 10.625, 12.5, 15.625, 20],
               [5.625, 6.25, 8.125, 11.25, 15.625],
               [2.5, 3.125, 5., 8.125, 12.5],
               [0.625, 1.25, 3.125, 6.25, 10.625],
               [0, 0.625, 2.5, 5.625, 10]]
        ))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_77100278))
    get_chart_77100278()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_26744992():
    import plotly.graph_objects as go
    
    fig = go.Figure(data =
        go.Contour(
            z=[[10, 10.625, 12.5, 15.625, 20],
               [5.625, 6.25, 8.125, 11.25, 15.625],
               [2.5, 3.125, 5., 8.125, 12.5],
               [0.625, 1.25, 3.125, 6.25, 10.625],
               [0, 0.625, 2.5, 5.625, 10]],
            x=[-9, -6, -5 , -3, -1], # horizontal axis
            y=[0, 1, 4, 5, 7] # vertical axis
        ))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_26744992))
    get_chart_26744992()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_91811003():
    import plotly.graph_objects as go
    
    fig = go.Figure(data =
         go.Contour(
            z=[[10, 10.625, 12.5, 15.625, 20],
               [5.625, 6.25, 8.125, 11.25, 15.625],
               [2.5, 3.125, 5., 8.125, 12.5],
               [0.625, 1.25, 3.125, 6.25, 10.625],
               [0, 0.625, 2.5, 5.625, 10]],
            colorscale='Electric',
        ))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_91811003))
    get_chart_91811003()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_43992019():
    import plotly.graph_objects as go
    
    fig = go.Figure(data =
        go.Contour(
            z=[[10, 10.625, 12.5, 15.625, 20],
               [5.625, 6.25, 8.125, 11.25, 15.625],
               [2.5, 3.125, 5., 8.125, 12.5],
               [0.625, 1.25, 3.125, 6.25, 10.625],
               [0, 0.625, 2.5, 5.625, 10]],
            colorscale='Hot',
            contours=dict(
                start=0,
                end=8,
                size=2,
            ),
        ))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_43992019))
    get_chart_43992019()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_69250381():
    import plotly.graph_objects as go
    
    fig = go.Figure(data =
        go.Contour(
            z= [[10, 10.625, 12.5, 15.625, 20],
                  [5.625, 6.25, 8.125, 11.25, 15.625],
                  [2.5, 3.125, 5., 8.125, 12.5],
                  [0.625, 1.25, 3.125, 6.25, 10.625],
                  [0, 0.625, 2.5, 5.625, 10]],
            dx=10,
            x0=5,
            dy=10,
            y0=10,
        )
    )
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_69250381))
    get_chart_69250381()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_73470713():
    import plotly.graph_objs as go
    from plotly.subplots import make_subplots
    
    fig = make_subplots(rows=2, cols=2, subplot_titles=('connectgaps = False',
                                                            'connectgaps = True'))
    z = [[None, None, None, 12, 13, 14, 15, 16],
         [None, 1, None, 11, None, None, None, 17],
         [None, 2, 6, 7, None, None, None, 18],
         [None, 3, None, 8, None, None, None, 19],
         [5, 4, 10, 9, None, None, None, 20],
         [None, None, None, 27, None, None, None, 21],
         [None, None, None, 26, 25, 24, 23, 22]]
    
    fig.add_trace(go.Contour(z=z, showscale=False), 1, 1)
    fig.add_trace(go.Contour(z=z, showscale=False, connectgaps=True), 1, 2)
    fig.add_trace(go.Heatmap(z=z, showscale=False, zsmooth='best'), 2, 1)
    fig.add_trace(go.Heatmap(z=z, showscale=False, connectgaps=True, zsmooth='best'), 2, 2)
    
    fig['layout']['yaxis1'].update(title='Contour map')
    fig['layout']['yaxis3'].update(title='Heatmap')
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_73470713))
    get_chart_73470713()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_84198216():
    import plotly.graph_objects as go
    from plotly.subplots import make_subplots
    import numpy as np
    
    z =   [[2, 4, 7, 12, 13, 14, 15, 16],
           [3, 1, 6, 11, 12, 13, 16, 17],
           [4, 2, 7, 7, 11, 14, 17, 18],
           [5, 3, 8, 8, 13, 15, 18, 19],
           [7, 4, 10, 9, 16, 18, 20, 19],
           [9, 10, 5, 27, 23, 21, 21, 21],
           [11, 14, 17, 26, 25, 24, 23, 22]]
    
    fig = make_subplots(rows=1, cols=2,
                        subplot_titles=('Without Smoothing', 'With Smoothing'))
    
    fig.add_trace(go.Contour(z=z, line_smoothing=0), 1, 1)
    fig.add_trace(go.Contour(z=z, line_smoothing=0.85), 1, 2)
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_84198216))
    get_chart_84198216()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_7870505():
    import plotly.graph_objects as go
    
    fig = go.Figure(data=
        go.Contour(
            z=[[10, 10.625, 12.5, 15.625, 20],
               [5.625, 6.25, 8.125, 11.25, 15.625],
               [2.5, 3.125, 5., 8.125, 12.5],
               [0.625, 1.25, 3.125, 6.25, 10.625],
               [0, 0.625, 2.5, 5.625, 10]],
            # heatmap gradient coloring is applied between each contour level
            contours_coloring='heatmap' # can also be 'lines', or 'none'
        )
    )
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_7870505))
    get_chart_7870505()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_82739395():
    import plotly.graph_objects as go
    
    fig = go.Figure(data=
        go.Contour(
            z=[[10, 10.625, 12.5, 15.625, 20],
               [5.625, 6.25, 8.125, 11.25, 15.625],
               [2.5, 3.125, 5., 8.125, 12.5],
               [0.625, 1.25, 3.125, 6.25, 10.625],
               [0, 0.625, 2.5, 5.625, 10]],
            contours=dict(
                coloring ='heatmap',
                showlabels = True, # show labels on contours
                labelfont = dict( # label font properties
                    size = 12,
                    color = 'white',
                )
            )))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_82739395))
    get_chart_82739395()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_13238849():
    import plotly.graph_objects as go
    
    fig = go.Figure(data=
        go.Contour(
            z=[[10, 10.625, 12.5, 15.625, 20],
               [5.625, 6.25, 8.125, 11.25, 15.625],
               [2.5, 3.125, 5., 8.125, 12.5],
               [0.625, 1.25, 3.125, 6.25, 10.625],
               [0, 0.625, 2.5, 5.625, 10]],
            contours_coloring='lines',
            line_width=2,
        )
    )
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_13238849))
    get_chart_13238849()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_9153372():
    import plotly.graph_objects as go
    
    # Valid color strings are CSS colors, rgb or hex strings
    colorscale = [[0, 'gold'], [0.5, 'mediumturquoise'], [1, 'lightsalmon']]
    
    fig = go.Figure(data =
        go.Contour(
            z=[[10, 10.625, 12.5, 15.625, 20],
               [5.625, 6.25, 8.125, 11.25, 15.625],
               [2.5, 3.125, 5., 8.125, 12.5],
               [0.625, 1.25, 3.125, 6.25, 10.625],
               [0, 0.625, 2.5, 5.625, 10]],
            colorscale=colorscale)
    )
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_9153372))
    get_chart_9153372()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_886556():
    import plotly.graph_objects as go
    
    fig = go.Figure(data=
        go.Contour(
            z=[[10, 10.625, 12.5, 15.625, 20],
               [5.625, 6.25, 8.125, 11.25, 15.625],
               [2.5, 3.125, 5., 8.125, 12.5],
               [0.625, 1.25, 3.125, 6.25, 10.625],
               [0, 0.625, 2.5, 5.625, 10]],
            colorbar=dict(
                title='Color bar title', # title here
                titleside='right',
                titlefont=dict(
                    size=14,
                    family='Arial, sans-serif')
            )))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_886556))
    get_chart_886556()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_51754693():
    import plotly.graph_objects as go
    
    fig = go.Figure(data=
        go.Contour(
            z=[[10, 10.625, 12.5, 15.625, 20],
               [5.625, 6.25, 8.125, 11.25, 15.625],
               [2.5, 3.125, 5., 8.125, 12.5],
               [0.625, 1.25, 3.125, 6.25, 10.625],
               [0, 0.625, 2.5, 5.625, 10]],
            colorbar=dict(
                thickness=25,
                thicknessmode='pixels',
                len=0.6,
                lenmode='fraction',
                outlinewidth=0
            )
        ))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_51754693))
    get_chart_51754693()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_8717081():
    import plotly.graph_objects as go
    
    fig = go.Figure(data =
             go.Contour(
               z=[[10, 10.625, 12.5, 15.625, 20],
                  [5.625, 6.25, 8.125, 11.25, 15.625],
                  [2.5, 3.125, 5., 8.125, 12.5],
                  [0.625, 1.25, 3.125, 6.25, 10.625],
                  [0, 0.625, 2.5, 5.625, 10]],
               colorbar=dict(nticks=10, ticks='outside',
                             ticklen=5, tickwidth=1,
                             showticklabels=True,
                             tickangle=0, tickfont_size=12)
                ))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_8717081))
    get_chart_8717081()
except Exception as e:
    st.exception(e)

