import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import inspect

@st.experimental_memo
def get_chart_94527939():
    # x and y given as array_like objects
    import plotly.express as px
    fig = px.scatter(x=[0, 1, 2, 3, 4], y=[0, 1, 4, 9, 16])
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_94527939))
    get_chart_94527939()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_15845953():
    # x and y given as DataFrame columns
    import plotly.express as px
    df = px.data.iris() # iris is a pandas DataFrame
    fig = px.scatter(df, x="sepal_width", y="sepal_length")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_15845953))
    get_chart_15845953()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_26626453():
    import plotly.express as px
    df = px.data.iris()
    fig = px.scatter(df, x="sepal_width", y="sepal_length", color="species",
                     size='petal_length', hover_data=['petal_width'])
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_26626453))
    get_chart_26626453()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_75953516():
    import plotly.express as px
    df = px.data.iris()
    fig = px.scatter(df, x="sepal_width", y="sepal_length", color='petal_length')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_75953516))
    get_chart_75953516()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_58079212():
    import plotly.express as px
    df = px.data.iris()
    fig = px.scatter(df, x="sepal_width", y="sepal_length", color="species", symbol="species")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_58079212))
    get_chart_58079212()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_83681550():
    import plotly.express as px
    df = px.data.medals_long()
    
    fig = px.scatter(df, y="nation", x="count", color="medal", symbol="medal")
    fig.update_traces(marker_size=10)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_83681550))
    get_chart_83681550()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_13516346():
    import plotly.express as px
    df = px.data.iris()
    df["e"] = df["sepal_width"]/100
    fig = px.scatter(df, x="sepal_width", y="sepal_length", color="species",
                     error_x="e", error_y="e")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_13516346))
    get_chart_13516346()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_15982158():
    import plotly.express as px
    df = px.data.iris()
    fig = px.scatter(df, x="sepal_length", y="sepal_width", marginal_x="histogram", marginal_y="rug")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_15982158))
    get_chart_15982158()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_53923166():
    import plotly.express as px
    df = px.data.tips()
    fig = px.scatter(df, x="total_bill", y="tip", color="smoker", facet_col="sex", facet_row="time")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_53923166))
    get_chart_53923166()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_16696371():
    import plotly.express as px
    
    df = px.data.tips()
    fig = px.scatter(df, x="total_bill", y="tip", trendline="ols")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_16696371))
    get_chart_16696371()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_90267654():
    import plotly.express as px
    import numpy as np
    
    t = np.linspace(0, 2*np.pi, 100)
    
    fig = px.line(x=t, y=np.cos(t), labels={'x':'t', 'y':'cos(t)'})
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_90267654))
    get_chart_90267654()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_68359488():
    import plotly.express as px
    df = px.data.gapminder().query("continent == 'Oceania'")
    fig = px.line(df, x='year', y='lifeExp', color='country')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_68359488))
    get_chart_68359488()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_99955152():
    import plotly.express as px
    df = px.data.gapminder().query("continent == 'Oceania'")
    fig = px.line(df, x='year', y='lifeExp', color='country', markers=True)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_99955152))
    get_chart_99955152()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_14678032():
    import plotly.express as px
    df = px.data.gapminder().query("continent == 'Oceania'")
    fig = px.line(df, x='year', y='lifeExp', color='country', symbol="country")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_14678032))
    get_chart_14678032()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_4448703():
    import plotly.express as px
    
    df = px.data.stocks()
    fig = px.line(df, x='date', y="GOOG")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_4448703))
    get_chart_4448703()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_20464139():
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
    st.expander("See code").code(inspect.getsource(get_chart_20464139))
    get_chart_20464139()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_43007560():
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
    st.expander("See code").code(inspect.getsource(get_chart_43007560))
    get_chart_43007560()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_36896327():
    import plotly.graph_objects as go
    import numpy as np
    
    N = 1000
    t = np.linspace(0, 10, 100)
    y = np.sin(t)
    
    fig = go.Figure(data=go.Scatter(x=t, y=y, mode='markers'))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_36896327))
    get_chart_36896327()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_51964683():
    import plotly.graph_objects as go
    
    # Create random data with numpy
    import numpy as np
    np.random.seed(1)
    
    N = 100
    random_x = np.linspace(0, 1, N)
    random_y0 = np.random.randn(N) + 5
    random_y1 = np.random.randn(N)
    random_y2 = np.random.randn(N) - 5
    
    fig = go.Figure()
    
    # Add traces
    fig.add_trace(go.Scatter(x=random_x, y=random_y0,
                        mode='markers',
                        name='markers'))
    fig.add_trace(go.Scatter(x=random_x, y=random_y1,
                        mode='lines+markers',
                        name='lines+markers'))
    fig.add_trace(go.Scatter(x=random_x, y=random_y2,
                        mode='lines',
                        name='lines'))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_51964683))
    get_chart_51964683()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_18144288():
    import plotly.graph_objects as go
    
    fig = go.Figure(data=go.Scatter(
        x=[1, 2, 3, 4],
        y=[10, 11, 12, 13],
        mode='markers',
        marker=dict(size=[40, 60, 80, 100],
                    color=[0, 1, 2, 3])
    ))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_18144288))
    get_chart_18144288()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_61097592():
    import plotly.graph_objects as go
    import numpy as np
    
    
    t = np.linspace(0, 10, 100)
    
    fig = go.Figure()
    
    fig.add_trace(go.Scatter(
        x=t, y=np.sin(t),
        name='sin',
        mode='markers',
        marker_color='rgba(152, 0, 0, .8)'
    ))
    
    fig.add_trace(go.Scatter(
        x=t, y=np.cos(t),
        name='cos',
        marker_color='rgba(255, 182, 193, .9)'
    ))
    
    # Set options common to all traces with fig.update_traces
    fig.update_traces(mode='markers', marker_line_width=2, marker_size=10)
    fig.update_layout(title='Styled Scatter',
                      yaxis_zeroline=False, xaxis_zeroline=False)
    
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_61097592))
    get_chart_61097592()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_92580274():
    import plotly.graph_objects as go
    import pandas as pd
    
    data= pd.read_csv("https://raw.githubusercontent.com/plotly/datasets/master/2014_usa_states.csv")
    
    fig = go.Figure(data=go.Scatter(x=data['Postal'],
                                    y=data['Population'],
                                    mode='markers',
                                    marker_color=data['Population'],
                                    text=data['State'])) # hover text goes here
    
    fig.update_layout(title='Population of USA States')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_92580274))
    get_chart_92580274()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_88373299():
    import plotly.graph_objects as go
    import numpy as np
    
    fig = go.Figure(data=go.Scatter(
        y = np.random.randn(500),
        mode='markers',
        marker=dict(
            size=16,
            color=np.random.randn(500), #set color equal to a variable
            colorscale='Viridis', # one of plotly colorscales
            showscale=True
        )
    ))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_88373299))
    get_chart_88373299()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_65303910():
    import plotly.graph_objects as go
    import numpy as np
    
    N = 100000
    fig = go.Figure(data=go.Scattergl(
        x = np.random.randn(N),
        y = np.random.randn(N),
        mode='markers',
        marker=dict(
            color=np.random.randn(N),
            colorscale='Viridis',
            line_width=1
        )
    ))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_65303910))
    get_chart_65303910()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_34266746():
    import plotly.graph_objects as go
    import numpy as np
    
    N = 100000
    r = np.random.uniform(0, 1, N)
    theta = np.random.uniform(0, 2*np.pi, N)
    
    fig = go.Figure(data=go.Scattergl(
        x = r * np.cos(theta), # non-uniform distribution
        y = r * np.sin(theta), # zoom to see more points at the center
        mode='markers',
        marker=dict(
            color=np.random.randn(N),
            colorscale='Viridis',
            line_width=1
        )
    ))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_34266746))
    get_chart_34266746()
except Exception as e:
    st.exception(e)

