import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import inspect

@st.experimental_memo
def get_chart_49243206():
    import plotly.express as px
    data_canada = px.data.gapminder().query("country == 'Canada'")
    fig = px.bar(data_canada, x='year', y='pop')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_49243206))
    get_chart_49243206()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_18324866():
    import plotly.express as px
    
    long_df = px.data.medals_long()
    
    fig = px.bar(long_df, x="nation", y="count", color="medal", title="Long-Form Input")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_18324866))
    get_chart_18324866()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_23673117():
    import plotly.express as px
    
    wide_df = px.data.medals_wide()
    
    fig = px.bar(wide_df, x="nation", y=["gold", "silver", "bronze"], title="Wide-Form Input")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_23673117))
    get_chart_23673117()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_26647117():
    import plotly.express as px
    
    df = px.data.gapminder().query("country == 'Canada'")
    fig = px.bar(df, x='year', y='pop',
                 hover_data=['lifeExp', 'gdpPercap'], color='lifeExp',
                 labels={'pop':'population of Canada'}, height=400)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_26647117))
    get_chart_26647117()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_94217570():
    import plotly.express as px
    
    df = px.data.gapminder().query("continent == 'Oceania'")
    fig = px.bar(df, x='year', y='pop',
                 hover_data=['lifeExp', 'gdpPercap'], color='country',
                 labels={'pop':'population of Canada'}, height=400)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_94217570))
    get_chart_94217570()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_86694585():
    import plotly.express as px
    df = px.data.tips()
    fig = px.bar(df, x="sex", y="total_bill", color='time')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_86694585))
    get_chart_86694585()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_60315438():
    import plotly.express as px
    df = px.data.tips()
    fig = px.bar(df, x="sex", y="total_bill",
                 color='smoker', barmode='group',
                 height=400)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_60315438))
    get_chart_60315438()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_6066925():
    import plotly.express as px
    df = px.data.tips()
    fig = px.histogram(df, x="sex", y="total_bill",
                 color='smoker', barmode='group',
                 height=400)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_6066925))
    get_chart_6066925()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_11730596():
    import plotly.express as px
    df = px.data.tips()
    fig = px.histogram(df, x="sex", y="total_bill",
                 color='smoker', barmode='group',
                 histfunc='avg',
                 height=400)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_11730596))
    get_chart_11730596()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_67383100():
    import plotly.express as px
    df = px.data.medals_long()
    
    fig = px.bar(df, x="medal", y="count", color="nation", text_auto=True)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_67383100))
    get_chart_67383100()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_35261309():
    import plotly.express as px
    df = px.data.medals_long()
    
    fig = px.bar(df, x="medal", y="count", color="nation", text="nation")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_35261309))
    get_chart_35261309()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_86828274():
    import plotly.express as px
    
    df = px.data.gapminder().query("continent == 'Europe' and year == 2007 and pop > 2.e6")
    fig = px.bar(df, y='pop', x='country', text_auto='.2s',
                title="Default: various text sizes, positions and angles")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_86828274))
    get_chart_86828274()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_23019721():
    import plotly.express as px
    
    df = px.data.gapminder().query("continent == 'Europe' and year == 2007 and pop > 2.e6")
    fig = px.bar(df, y='pop', x='country', text_auto='.2s',
                title="Controlled text sizes, positions and angles")
    fig.update_traces(textfont_size=12, textangle=0, textposition="outside", cliponaxis=False)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_23019721))
    get_chart_23019721()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_12145018():
    import plotly.express as px
    df = px.data.medals_long()
    
    fig = px.bar(df, x="medal", y="count", color="nation",
                 pattern_shape="nation", pattern_shape_sequence=[".", "x", "+"])
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_12145018))
    get_chart_12145018()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_3814273():
    import plotly.express as px
    df = px.data.tips()
    fig = px.bar(df, x="sex", y="total_bill", color="smoker", barmode="group",
                 facet_row="time", facet_col="day",
                 category_orders={"day": ["Thur", "Fri", "Sat", "Sun"],
                                  "time": ["Lunch", "Dinner"]})
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_3814273))
    get_chart_3814273()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_7792780():
    import plotly.graph_objects as go
    animals=['giraffes', 'orangutans', 'monkeys']
    
    fig = go.Figure([go.Bar(x=animals, y=[20, 14, 23])])
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_7792780))
    get_chart_7792780()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_4631718():
    import plotly.graph_objects as go
    animals=['giraffes', 'orangutans', 'monkeys']
    
    fig = go.Figure(data=[
        go.Bar(name='SF Zoo', x=animals, y=[20, 14, 23]),
        go.Bar(name='LA Zoo', x=animals, y=[12, 18, 29])
    ])
    # Change the bar mode
    fig.update_layout(barmode='group')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_4631718))
    get_chart_4631718()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_62190580():
    import plotly.graph_objects as go
    animals=['giraffes', 'orangutans', 'monkeys']
    
    fig = go.Figure(data=[
        go.Bar(name='SF Zoo', x=animals, y=[20, 14, 23]),
        go.Bar(name='LA Zoo', x=animals, y=[12, 18, 29])
    ])
    # Change the bar mode
    fig.update_layout(barmode='stack')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_62190580))
    get_chart_62190580()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_55699827():
    import plotly.graph_objects as go
    
    x = ['Product A', 'Product B', 'Product C']
    y = [20, 14, 23]
    
    # Use the hovertext kw argument for hover text
    fig = go.Figure(data=[go.Bar(x=x, y=y,
                hovertext=['27% market share', '24% market share', '19% market share'])])
    # Customize aspect
    fig.update_traces(marker_color='rgb(158,202,225)', marker_line_color='rgb(8,48,107)',
                      marker_line_width=1.5, opacity=0.6)
    fig.update_layout(title_text='January 2013 Sales Report')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_55699827))
    get_chart_55699827()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_50349494():
    import plotly.graph_objects as go
    
    x = ['Product A', 'Product B', 'Product C']
    y = [20, 14, 23]
    
    # Use textposition='auto' for direct text
    fig = go.Figure(data=[go.Bar(
                x=x, y=y,
                text=y,
                textposition='auto',
            )])
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_50349494))
    get_chart_50349494()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_3201280():
    import plotly.express as px
    
    df = px.data.gapminder().query("continent == 'Europe' and year == 2007 and pop > 2.e6")
    fig = px.bar(df, y='pop', x='country', text='pop')
    fig.update_traces(texttemplate='%{text:.2s}', textposition='outside')
    fig.update_layout(uniformtext_minsize=8, uniformtext_mode='hide')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_3201280))
    get_chart_3201280()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_68279038():
    import plotly.graph_objects as go
    
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    fig = go.Figure()
    fig.add_trace(go.Bar(
        x=months,
        y=[20, 14, 25, 16, 18, 22, 19, 15, 12, 16, 14, 17],
        name='Primary Product',
        marker_color='indianred'
    ))
    fig.add_trace(go.Bar(
        x=months,
        y=[19, 14, 22, 14, 16, 19, 15, 14, 10, 12, 12, 16],
        name='Secondary Product',
        marker_color='lightsalmon'
    ))
    
    # Here we modify the tickangle of the xaxis, resulting in rotated labels.
    fig.update_layout(barmode='group', xaxis_tickangle=-45)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_68279038))
    get_chart_68279038()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_81583906():
    import plotly.graph_objects as go
    
    colors = ['lightslategray',] * 5
    colors[1] = 'crimson'
    
    fig = go.Figure(data=[go.Bar(
        x=['Feature A', 'Feature B', 'Feature C',
           'Feature D', 'Feature E'],
        y=[20, 14, 23, 25, 22],
        marker_color=colors # marker color can be a single color value or an iterable
    )])
    fig.update_layout(title_text='Least Used Feature')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_81583906))
    get_chart_81583906()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_47729864():
    import plotly.graph_objects as go
    
    fig = go.Figure(data=[go.Bar(
        x=[1, 2, 3, 5.5, 10],
        y=[10, 8, 6, 4, 2],
        width=[0.8, 0.8, 0.8, 3.5, 4] # customize width here
    )])
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_47729864))
    get_chart_47729864()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_21261285():
    import plotly.graph_objects as go
    import numpy as np
    
    labels = ["apples","oranges","pears","bananas"]
    widths = np.array([10,20,20,50])
    
    data = {
        "South": [50,80,60,70],
        "North": [50,20,40,30]
    }
    
    fig = go.Figure()
    for key in data:
        fig.add_trace(go.Bar(
            name=key,
            y=data[key],
            x=np.cumsum(widths)-widths,
            width=widths,
            offset=0,
            customdata=np.transpose([labels, widths*data[key]]),
            texttemplate="%{y} x %{width} =<br>%{customdata[1]}",
            textposition="inside",
            textangle=0,
            textfont_color="white",
            hovertemplate="<br>".join([
                "label: %{customdata[0]}",
                "width: %{width}",
                "height: %{y}",
                "area: %{customdata[1]}",
            ])
        ))
    
    fig.update_xaxes(
        tickvals=np.cumsum(widths)-widths/2,
        ticktext= ["%s<br>%d" % (l, w) for l, w in zip(labels, widths)]
    )
    
    fig.update_xaxes(range=[0,100])
    fig.update_yaxes(range=[0,100])
    
    fig.update_layout(
        title_text="Marimekko Chart",
        barmode="stack",
        uniformtext=dict(mode="hide", minsize=10),
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_21261285))
    get_chart_21261285()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_73253323():
    import plotly.graph_objects as go
    
    years = ['2016','2017','2018']
    
    fig = go.Figure()
    fig.add_trace(go.Bar(x=years, y=[500, 600, 700],
                    base=[-500,-600,-700],
                    marker_color='crimson',
                    name='expenses'))
    fig.add_trace(go.Bar(x=years, y=[300, 400, 700],
                    base=0,
                    marker_color='lightslategrey',
                    name='revenue'
                    ))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_73253323))
    get_chart_73253323()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_41722352():
    import plotly.graph_objects as go
    
    years = [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003,
             2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012]
    
    fig = go.Figure()
    fig.add_trace(go.Bar(x=years,
                    y=[219, 146, 112, 127, 124, 180, 236, 207, 236, 263,
                       350, 430, 474, 526, 488, 537, 500, 439],
                    name='Rest of world',
                    marker_color='rgb(55, 83, 109)'
                    ))
    fig.add_trace(go.Bar(x=years,
                    y=[16, 13, 10, 11, 28, 37, 43, 55, 56, 88, 105, 156, 270,
                       299, 340, 403, 549, 499],
                    name='China',
                    marker_color='rgb(26, 118, 255)'
                    ))
    
    fig.update_layout(
        title='US Export of Plastic Scrap',
        xaxis_tickfont_size=14,
        yaxis=dict(
            title='USD (millions)',
            titlefont_size=16,
            tickfont_size=14,
        ),
        legend=dict(
            x=0,
            y=1.0,
            bgcolor='rgba(255, 255, 255, 0)',
            bordercolor='rgba(255, 255, 255, 0)'
        ),
        barmode='group',
        bargap=0.15, # gap between bars of adjacent location coordinates.
        bargroupgap=0.1 # gap between bars of the same location coordinate.
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_41722352))
    get_chart_41722352()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_90229861():
    import plotly.graph_objects as go
    x = [1, 2, 3, 4]
    
    fig = go.Figure()
    fig.add_trace(go.Bar(x=x, y=[1, 4, 9, 16]))
    fig.add_trace(go.Bar(x=x, y=[6, -8, -4.5, 8]))
    fig.add_trace(go.Bar(x=x, y=[-15, -3, 4.5, -8]))
    fig.add_trace(go.Bar(x=x, y=[-1, 3, -3, -4]))
    
    fig.update_layout(barmode='relative', title_text='Relative Barmode')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_90229861))
    get_chart_90229861()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_7479479():
    import plotly.graph_objects as go
    
    x=['b', 'a', 'c', 'd']
    fig = go.Figure(go.Bar(x=x, y=[2,5,1,9], name='Montreal'))
    fig.add_trace(go.Bar(x=x, y=[1, 4, 9, 16], name='Ottawa'))
    fig.add_trace(go.Bar(x=x, y=[6, 8, 4.5, 8], name='Toronto'))
    
    fig.update_layout(barmode='stack', xaxis={'categoryorder':'category ascending'})
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_7479479))
    get_chart_7479479()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_35434107():
    import plotly.graph_objects as go
    
    x=['b', 'a', 'c', 'd']
    fig = go.Figure(go.Bar(x=x, y=[2,5,1,9], name='Montreal'))
    fig.add_trace(go.Bar(x=x, y=[1, 4, 9, 16], name='Ottawa'))
    fig.add_trace(go.Bar(x=x, y=[6, 8, 4.5, 8], name='Toronto'))
    
    fig.update_layout(barmode='stack', xaxis={'categoryorder':'array', 'categoryarray':['d','a','c','b']})
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_35434107))
    get_chart_35434107()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_41706020():
    import plotly.graph_objects as go
    
    x=['b', 'a', 'c', 'd']
    fig = go.Figure(go.Bar(x=x, y=[2,5,1,9], name='Montreal'))
    fig.add_trace(go.Bar(x=x, y=[1, 4, 9, 16], name='Ottawa'))
    fig.add_trace(go.Bar(x=x, y=[6, 8, 4.5, 8], name='Toronto'))
    
    fig.update_layout(barmode='stack', xaxis={'categoryorder':'total descending'})
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_41706020))
    get_chart_41706020()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_18127008():
    import plotly.graph_objects as go
    x = [
        ["BB+", "BB+", "BB+", "BB", "BB", "BB"],
        [16, 17, 18, 16, 17, 18,]
    ]
    fig = go.Figure()
    fig.add_bar(x=x,y=[1,2,3,4,5,6])
    fig.add_bar(x=x,y=[6,5,4,3,2,1])
    fig.update_layout(barmode="relative")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_18127008))
    get_chart_18127008()
except Exception as e:
    st.exception(e)

