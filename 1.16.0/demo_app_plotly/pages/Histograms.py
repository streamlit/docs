import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import inspect

@st.experimental_memo
def get_chart_44471063():
    import plotly.express as px
    df = px.data.tips()
    fig = px.histogram(df, x="total_bill")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_44471063))
    get_chart_44471063()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_32060187():
    import plotly.express as px
    df = px.data.tips()
    # Here we use a column with categorical data
    fig = px.histogram(df, x="day")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_32060187))
    get_chart_32060187()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_897230():
    import plotly.express as px
    df = px.data.tips()
    fig = px.histogram(df, x="total_bill", nbins=20)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_897230))
    get_chart_897230()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_12051914():
    import plotly.express as px
    
    df = px.data.stocks()
    fig = px.histogram(df, x="date")
    fig.update_layout(bargap=0.2)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_12051914))
    get_chart_12051914()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_73206188():
    import plotly.express as px
    df = px.data.tips()
    fig = px.histogram(df, x="day", category_orders=dict(day=["Thur", "Fri", "Sat", "Sun"]))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_73206188))
    get_chart_73206188()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_13220768():
    import plotly.express as px
    import numpy as np
    
    df = px.data.tips()
    # create the bins
    counts, bins = np.histogram(df.total_bill, bins=range(0, 60, 5))
    bins = 0.5 * (bins[:-1] + bins[1:])
    
    fig = px.bar(x=bins, y=counts, labels={'x':'total_bill', 'y':'count'})
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_13220768))
    get_chart_13220768()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_24585648():
    import plotly.express as px
    df = px.data.tips()
    fig = px.histogram(df, x="total_bill", histnorm='probability density')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_24585648))
    get_chart_24585648()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_94330290():
    import plotly.express as px
    df = px.data.tips()
    fig = px.histogram(df, x="total_bill",
                       title='Histogram of bills',
                       labels={'total_bill':'total bill'}, # can specify one label per df column
                       opacity=0.8,
                       log_y=True, # represent bars with log scale
                       color_discrete_sequence=['indianred'] # color of histogram bars
                       )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_94330290))
    get_chart_94330290()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_84753657():
    import plotly.express as px
    df = px.data.tips()
    fig = px.histogram(df, x="total_bill", color="sex")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_84753657))
    get_chart_84753657()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_81530344():
    import plotly.express as px
    df = px.data.tips()
    fig = px.histogram(df, x="total_bill", y="tip", histfunc='avg')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_81530344))
    get_chart_81530344()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_35523376():
    import plotly.express as px
    df = px.data.tips()
    fig = px.histogram(df, x="day", y="total_bill", category_orders=dict(day=["Thur", "Fri", "Sat", "Sun"]))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_35523376))
    get_chart_35523376()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_11685941():
    import plotly.express as px
    
    df = px.data.tips()
    fig = px.histogram(df, x="sex", y="total_bill", color="sex", pattern_shape="smoker")
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_11685941))
    get_chart_11685941()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_34144224():
    import plotly.express as px
    df = px.data.tips()
    fig = px.histogram(df, x="total_bill", color="sex", marginal="rug", # can be `box`, `violin`
                             hover_data=df.columns)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_34144224))
    get_chart_34144224()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_2006546():
    import plotly.express as px
    df = px.data.tips()
    fig = px.histogram(df, x="total_bill", y="tip", histfunc="avg", nbins=8, text_auto=True)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_2006546))
    get_chart_2006546()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_18328211():
    import plotly.graph_objects as go
    
    import numpy as np
    np.random.seed(1)
    
    x = np.random.randn(500)
    
    fig = go.Figure(data=[go.Histogram(x=x)])
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_18328211))
    get_chart_18328211()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_82607572():
    import plotly.graph_objects as go
    
    import numpy as np
    
    x = np.random.randn(500)
    fig = go.Figure(data=[go.Histogram(x=x, histnorm='probability')])
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_82607572))
    get_chart_82607572()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_19209618():
    import plotly.graph_objects as go
    
    import numpy as np
    
    y = np.random.randn(500)
    # Use `y` argument instead of `x` for horizontal histogram
    
    fig = go.Figure(data=[go.Histogram(y=y)])
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_19209618))
    get_chart_19209618()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_96774800():
    import plotly.graph_objects as go
    
    import numpy as np
    
    x0 = np.random.randn(500)
    # Add 1 to shift the mean of the Gaussian distribution
    x1 = np.random.randn(500) + 1
    
    fig = go.Figure()
    fig.add_trace(go.Histogram(x=x0))
    fig.add_trace(go.Histogram(x=x1))
    
    # Overlay both histograms
    fig.update_layout(barmode='overlay')
    # Reduce opacity to see both histograms
    fig.update_traces(opacity=0.75)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_96774800))
    get_chart_96774800()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_15331319():
    import plotly.graph_objects as go
    
    import numpy as np
    
    x0 = np.random.randn(2000)
    x1 = np.random.randn(2000) + 1
    
    fig = go.Figure()
    fig.add_trace(go.Histogram(x=x0))
    fig.add_trace(go.Histogram(x=x1))
    
    # The two histograms are drawn on top of another
    fig.update_layout(barmode='stack')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_15331319))
    get_chart_15331319()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_9378606():
    import plotly.graph_objects as go
    
    import numpy as np
    x0 = np.random.randn(500)
    x1 = np.random.randn(500) + 1
    
    fig = go.Figure()
    fig.add_trace(go.Histogram(
        x=x0,
        histnorm='percent',
        name='control', # name used in legend and hover labels
        xbins=dict( # bins used for histogram
            start=-4.0,
            end=3.0,
            size=0.5
        ),
        marker_color='#EB89B5',
        opacity=0.75
    ))
    fig.add_trace(go.Histogram(
        x=x1,
        histnorm='percent',
        name='experimental',
        xbins=dict(
            start=-3.0,
            end=4,
            size=0.5
        ),
        marker_color='#330C73',
        opacity=0.75
    ))
    
    fig.update_layout(
        title_text='Sampled Results', # title of plot
        xaxis_title_text='Value', # xaxis label
        yaxis_title_text='Count', # yaxis label
        bargap=0.2, # gap between bars of adjacent location coordinates
        bargroupgap=0.1 # gap between bars of the same location coordinates
    )
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_9378606))
    get_chart_9378606()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_36242528():
    import plotly.graph_objects as go
    
    numbers = ["5", "10", "3", "10", "5", "8", "5", "5"]
    
    fig = go.Figure()
    fig.add_trace(go.Histogram(x=numbers, name="count", texttemplate="%{x}", textfont_size=20))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_36242528))
    get_chart_36242528()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_5654625():
    import plotly.graph_objects as go
    
    import numpy as np
    
    x = np.random.randn(500)
    fig = go.Figure(data=[go.Histogram(x=x, cumulative_enabled=True)])
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_5654625))
    get_chart_5654625()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_69593794():
    import plotly.graph_objects as go
    
    x = ["Apples","Apples","Apples","Oranges", "Bananas"]
    y = ["5","10","3","10","5"]
    
    fig = go.Figure()
    fig.add_trace(go.Histogram(histfunc="count", y=y, x=x, name="count"))
    fig.add_trace(go.Histogram(histfunc="sum", y=y, x=x, name="sum"))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_69593794))
    get_chart_69593794()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_57965880():
    import plotly.graph_objects as go
    from plotly.subplots import make_subplots
    
    x = ['1970-01-01', '1970-01-01', '1970-02-01', '1970-04-01', '1970-01-02',
         '1972-01-31', '1970-02-13', '1971-04-19']
    
    fig = make_subplots(rows=3, cols=2)
    
    trace0 = go.Histogram(x=x, nbinsx=4)
    trace1 = go.Histogram(x=x, nbinsx = 8)
    trace2 = go.Histogram(x=x, nbinsx=10)
    trace3 = go.Histogram(x=x,
                          xbins=dict(
                          start='1969-11-15',
                          end='1972-03-31',
                          size='M18'), # M18 stands for 18 months
                          autobinx=False
                         )
    trace4 = go.Histogram(x=x,
                          xbins=dict(
                          start='1969-11-15',
                          end='1972-03-31',
                          size='M4'), # 4 months bin size
                          autobinx=False
                          )
    trace5 = go.Histogram(x=x,
                          xbins=dict(
                          start='1969-11-15',
                          end='1972-03-31',
                          size= 'M2'), # 2 months
                          autobinx = False
                          )
    
    fig.append_trace(trace0, 1, 1)
    fig.append_trace(trace1, 1, 2)
    fig.append_trace(trace2, 2, 1)
    fig.append_trace(trace3, 2, 2)
    fig.append_trace(trace4, 3, 1)
    fig.append_trace(trace5, 3, 2)
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_57965880))
    get_chart_57965880()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_59600106():
    import plotly.express as px
    df = px.data.tips()
    fig1 = px.bar(df, x='day', y='tip', height=300,
                  title='Stacked Bar Chart - Hover on individual items')
    fig2 = px.histogram(df, x='day', y='tip', histfunc='sum', height=300,
                        title='Histogram Chart')
    fig1.show()
    fig2.show()
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_59600106))
    get_chart_59600106()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_92546304():
    import plotly.graph_objects as go
    import numpy as np
    
    fig = go.Figure(go.Histogram(
        x=np.random.randint(7, size=100),
        bingroup=1))
    
    fig.add_trace(go.Histogram(
        x=np.random.randint(7, size=20),
        bingroup=1))
    
    fig.update_layout(
        barmode="overlay",
        bargap=0.1)
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_92546304))
    get_chart_92546304()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_28611634():
    import plotly.express as px
    
    df = px.data.tips()
    fig = px.histogram(df, x="day").update_xaxes(categoryorder='total ascending')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_28611634))
    get_chart_28611634()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_81023829():
    import plotly.express as px
    
    df = px.data.tips()
    fig = px.histogram(df, x="day", color="smoker").update_xaxes(categoryorder='total descending')
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_81023829))
    get_chart_81023829()
except Exception as e:
    st.exception(e)

