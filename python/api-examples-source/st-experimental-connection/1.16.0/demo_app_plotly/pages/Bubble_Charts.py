import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import inspect

@st.experimental_memo
def get_chart_65442000():
    import plotly.express as px
    df = px.data.gapminder()
    
    fig = px.scatter(df.query("year==2007"), x="gdpPercap", y="lifeExp",
    	         size="pop", color="continent",
                     hover_name="country", log_x=True, size_max=60)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_65442000))
    get_chart_65442000()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_98774632():
    import plotly.graph_objects as go
    
    fig = go.Figure(data=[go.Scatter(
        x=[1, 2, 3, 4], y=[10, 11, 12, 13],
        mode='markers',
        marker_size=[40, 60, 80, 100])
    ])
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_98774632))
    get_chart_98774632()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_4132212():
    import plotly.graph_objects as go
    
    fig = go.Figure(data=[go.Scatter(
        x=[1, 2, 3, 4], y=[10, 11, 12, 13],
        mode='markers',
        marker=dict(
            color=['rgb(93, 164, 214)', 'rgb(255, 144, 14)',
                   'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
            opacity=[1, 0.8, 0.6, 0.4],
            size=[40, 60, 80, 100],
        )
    )])
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_4132212))
    get_chart_4132212()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_27314237():
    import plotly.graph_objects as go
    
    size = [20, 40, 60, 80, 100, 80, 60, 40, 20, 40]
    fig = go.Figure(data=[go.Scatter(
        x=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        y=[11, 12, 10, 11, 12, 11, 12, 13, 12, 11],
        mode='markers',
        marker=dict(
            size=size,
            sizemode='area',
            sizeref=2.*max(size)/(40.**2),
            sizemin=4
        )
    )])
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_27314237))
    get_chart_27314237()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_82106813():
    import plotly.graph_objects as go
    
    fig = go.Figure(data=[go.Scatter(
        x=[1, 2, 3, 4], y=[10, 11, 12, 13],
        text=['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
        mode='markers',
        marker=dict(
            color=['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
            size=[40, 60, 80, 100],
        )
    )])
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_82106813))
    get_chart_82106813()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_19077817():
    import plotly.graph_objects as go
    
    fig = go.Figure(data=[go.Scatter(
        x=[1, 3.2, 5.4, 7.6, 9.8, 12.5],
        y=[1, 3.2, 5.4, 7.6, 9.8, 12.5],
        mode='markers',
        marker=dict(
            color=[120, 125, 130, 135, 140, 145],
            size=[15, 30, 55, 70, 90, 110],
            showscale=True
            )
    )])
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_19077817))
    get_chart_19077817()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_16063037():
    import plotly.graph_objects as go
    import plotly.express as px
    import pandas as pd
    import math
    
    # Load data, define hover text and bubble size
    data = px.data.gapminder()
    df_2007 = data[data['year']==2007]
    df_2007 = df_2007.sort_values(['continent', 'country'])
    
    hover_text = []
    bubble_size = []
    
    for index, row in df_2007.iterrows():
        hover_text.append(('Country: {country}<br>'+
                          'Life Expectancy: {lifeExp}<br>'+
                          'GDP per capita: {gdp}<br>'+
                          'Population: {pop}<br>'+
                          'Year: {year}').format(country=row['country'],
                                                lifeExp=row['lifeExp'],
                                                gdp=row['gdpPercap'],
                                                pop=row['pop'],
                                                year=row['year']))
        bubble_size.append(math.sqrt(row['pop']))
    
    df_2007['text'] = hover_text
    df_2007['size'] = bubble_size
    sizeref = 2.*max(df_2007['size'])/(100**2)
    
    # Dictionary with dataframes for each continent
    continent_names = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
    continent_data = {continent:df_2007.query("continent == '%s'" %continent)
                                  for continent in continent_names}
    
    # Create figure
    fig = go.Figure()
    
    for continent_name, continent in continent_data.items():
        fig.add_trace(go.Scatter(
            x=continent['gdpPercap'], y=continent['lifeExp'],
            name=continent_name, text=continent['text'],
            marker_size=continent['size'],
            ))
    
    # Tune marker appearance and layout
    fig.update_traces(mode='markers', marker=dict(sizemode='area',
                                                  sizeref=sizeref, line_width=2))
    
    fig.update_layout(
        title='Life Expectancy v. Per Capita GDP, 2007',
        xaxis=dict(
            title='GDP per capita (2000 dollars)',
            gridcolor='white',
            type='log',
            gridwidth=2,
        ),
        yaxis=dict(
            title='Life Expectancy (years)',
            gridcolor='white',
            gridwidth=2,
        ),
        paper_bgcolor='rgb(243, 243, 243)',
        plot_bgcolor='rgb(243, 243, 243)',
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_16063037))
    get_chart_16063037()
except Exception as e:
    st.exception(e)

