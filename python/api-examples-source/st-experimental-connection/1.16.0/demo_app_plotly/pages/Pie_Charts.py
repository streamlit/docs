import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import inspect

@st.experimental_memo
def get_chart_33355037():
    import plotly.express as px
    df = px.data.gapminder().query("year == 2007").query("continent == 'Europe'")
    df.loc[df['pop'] < 2.e6, 'country'] = 'Other countries' # Represent only large countries
    fig = px.pie(df, values='pop', names='country', title='Population of European continent')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_33355037))
    get_chart_33355037()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_80959353():
    import plotly.express as px
    # This dataframe has 244 lines, but 4 distinct values for `day`
    df = px.data.tips()
    fig = px.pie(df, values='tip', names='day')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_80959353))
    get_chart_80959353()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_31354151():
    import plotly.express as px
    df = px.data.tips()
    fig = px.pie(df, values='tip', names='day', color_discrete_sequence=px.colors.sequential.RdBu)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_31354151))
    get_chart_31354151()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_70941163():
    import plotly.express as px
    df = px.data.tips()
    fig = px.pie(df, values='tip', names='day', color='day',
                 color_discrete_map={'Thur':'lightcyan',
                                     'Fri':'cyan',
                                     'Sat':'royalblue',
                                     'Sun':'darkblue'})
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_70941163))
    get_chart_70941163()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_92765665():
    import plotly.express as px
    df = px.data.gapminder().query("year == 2007").query("continent == 'Americas'")
    fig = px.pie(df, values='pop', names='country',
                 title='Population of American continent',
                 hover_data=['lifeExp'], labels={'lifeExp':'life expectancy'})
    fig.update_traces(textposition='inside', textinfo='percent+label')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_92765665))
    get_chart_92765665()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_63301528():
    import plotly.graph_objects as go
    
    labels = ['Oxygen','Hydrogen','Carbon_Dioxide','Nitrogen']
    values = [4500, 2500, 1053, 500]
    
    fig = go.Figure(data=[go.Pie(labels=labels, values=values)])
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_63301528))
    get_chart_63301528()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_58558701():
    import plotly.graph_objects as go
    colors = ['gold', 'mediumturquoise', 'darkorange', 'lightgreen']
    
    fig = go.Figure(data=[go.Pie(labels=['Oxygen','Hydrogen','Carbon_Dioxide','Nitrogen'],
                                 values=[4500,2500,1053,500])])
    fig.update_traces(hoverinfo='label+percent', textinfo='value', textfont_size=20,
                      marker=dict(colors=colors, line=dict(color='#000000', width=2)))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_58558701))
    get_chart_58558701()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_52588326():
    import plotly.express as px
    
    df = px.data.gapminder().query("continent == 'Asia'")
    fig = px.pie(df, values='pop', names='country')
    fig.update_traces(textposition='inside')
    fig.update_layout(uniformtext_minsize=12, uniformtext_mode='hide')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_52588326))
    get_chart_52588326()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_50060850():
    import plotly.graph_objects as go
    
    labels = ['Oxygen','Hydrogen','Carbon_Dioxide','Nitrogen']
    values = [4500, 2500, 1053, 500]
    
    fig = go.Figure(data=[go.Pie(labels=labels, values=values, textinfo='label+percent',
                                 insidetextorientation='radial'
                                )])
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_50060850))
    get_chart_50060850()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_28108359():
    import plotly.graph_objects as go
    
    labels = ['Oxygen','Hydrogen','Carbon_Dioxide','Nitrogen']
    values = [4500, 2500, 1053, 500]
    
    # Use `hole` to create a donut-like pie chart
    fig = go.Figure(data=[go.Pie(labels=labels, values=values, hole=.3)])
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_28108359))
    get_chart_28108359()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_58389920():
    import plotly.graph_objects as go
    
    labels = ['Oxygen','Hydrogen','Carbon_Dioxide','Nitrogen']
    values = [4500, 2500, 1053, 500]
    
    # pull is given as a fraction of the pie radius
    fig = go.Figure(data=[go.Pie(labels=labels, values=values, pull=[0, 0, 0.2, 0])])
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_58389920))
    get_chart_58389920()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_27116324():
    import plotly.graph_objects as go
    from plotly.subplots import make_subplots
    
    labels = ["US", "China", "European Union", "Russian Federation", "Brazil", "India",
              "Rest of World"]
    
    # Create subplots: use 'domain' type for Pie subplot
    fig = make_subplots(rows=1, cols=2, specs=[[{'type':'domain'}, {'type':'domain'}]])
    fig.add_trace(go.Pie(labels=labels, values=[16, 15, 12, 6, 5, 4, 42], name="GHG Emissions"),
                  1, 1)
    fig.add_trace(go.Pie(labels=labels, values=[27, 11, 25, 8, 1, 3, 25], name="CO2 Emissions"),
                  1, 2)
    
    # Use `hole` to create a donut-like pie chart
    fig.update_traces(hole=.4, hoverinfo="label+percent+name")
    
    fig.update_layout(
        title_text="Global Emissions 1990-2011",
        # Add annotations in the center of the donut pies.
        annotations=[dict(text='GHG', x=0.18, y=0.5, font_size=20, showarrow=False),
                     dict(text='CO2', x=0.82, y=0.5, font_size=20, showarrow=False)])
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_27116324))
    get_chart_27116324()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_19117824():
    import plotly.graph_objects as go
    from plotly.subplots import make_subplots
    
    labels = ['1st', '2nd', '3rd', '4th', '5th']
    
    # Define color sets of paintings
    night_colors = ['rgb(56, 75, 126)', 'rgb(18, 36, 37)', 'rgb(34, 53, 101)',
                    'rgb(36, 55, 57)', 'rgb(6, 4, 4)']
    sunflowers_colors = ['rgb(177, 127, 38)', 'rgb(205, 152, 36)', 'rgb(99, 79, 37)',
                         'rgb(129, 180, 179)', 'rgb(124, 103, 37)']
    irises_colors = ['rgb(33, 75, 99)', 'rgb(79, 129, 102)', 'rgb(151, 179, 100)',
                     'rgb(175, 49, 35)', 'rgb(36, 73, 147)']
    cafe_colors =  ['rgb(146, 123, 21)', 'rgb(177, 180, 34)', 'rgb(206, 206, 40)',
                    'rgb(175, 51, 21)', 'rgb(35, 36, 21)']
    
    # Create subplots, using 'domain' type for pie charts
    specs = [[{'type':'domain'}, {'type':'domain'}], [{'type':'domain'}, {'type':'domain'}]]
    fig = make_subplots(rows=2, cols=2, specs=specs)
    
    # Define pie charts
    fig.add_trace(go.Pie(labels=labels, values=[38, 27, 18, 10, 7], name='Starry Night',
                         marker_colors=night_colors), 1, 1)
    fig.add_trace(go.Pie(labels=labels, values=[28, 26, 21, 15, 10], name='Sunflowers',
                         marker_colors=sunflowers_colors), 1, 2)
    fig.add_trace(go.Pie(labels=labels, values=[38, 19, 16, 14, 13], name='Irises',
                         marker_colors=irises_colors), 2, 1)
    fig.add_trace(go.Pie(labels=labels, values=[31, 24, 19, 18, 8], name='The Night Café',
                         marker_colors=cafe_colors), 2, 2)
    
    # Tune layout and hover info
    fig.update_traces(hoverinfo='label+percent+name', textinfo='none')
    fig.update(layout_title_text='Van Gogh: 5 Most Prominent Colors Shown Proportionally',
               layout_showlegend=False)
    
    fig = go.Figure(fig)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_19117824))
    get_chart_19117824()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_7491711():
    import plotly.graph_objects as go
    from plotly.subplots import make_subplots
    
    labels = ["Asia", "Europe", "Africa", "Americas", "Oceania"]
    
    fig = make_subplots(1, 2, specs=[[{'type':'domain'}, {'type':'domain'}]],
                        subplot_titles=['1980', '2007'])
    fig.add_trace(go.Pie(labels=labels, values=[4, 7, 1, 7, 0.5], scalegroup='one',
                         name="World GDP 1980"), 1, 1)
    fig.add_trace(go.Pie(labels=labels, values=[21, 15, 3, 19, 1], scalegroup='one',
                         name="World GDP 2007"), 1, 2)
    
    fig.update_layout(title_text='World GDP')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_7491711))
    get_chart_7491711()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_97840939():
    import plotly.graph_objects as go
    
    fig =go.Figure(go.Sunburst(
        labels=["Eve", "Cain", "Seth", "Enos", "Noam", "Abel", "Awan", "Enoch", "Azura"],
        parents=["", "Eve", "Eve", "Seth", "Seth", "Eve", "Eve", "Awan", "Eve" ],
        values=[10, 14, 12, 10, 2, 6, 6, 4, 4],
    ))
    fig.update_layout(margin = dict(t=0, l=0, r=0, b=0))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_97840939))
    get_chart_97840939()
except Exception as e:
    st.exception(e)

