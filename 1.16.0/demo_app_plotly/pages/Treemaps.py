import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import inspect

@st.experimental_memo
def get_chart_30299095():
    import plotly.express as px
    fig = px.treemap(
        names = ["Eve","Cain", "Seth", "Enos", "Noam", "Abel", "Awan", "Enoch", "Azura"],
        parents = ["", "Eve", "Eve", "Seth", "Seth", "Eve", "Eve", "Awan", "Eve"]
    )
    fig.update_traces(root_color="lightgrey")
    fig.update_layout(margin = dict(t=50, l=25, r=25, b=25))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_30299095))
    get_chart_30299095()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_43531298():
    import plotly.express as px
    df = px.data.tips()
    fig = px.treemap(df, path=[px.Constant("all"), 'day', 'time', 'sex'], values='total_bill')
    fig.update_traces(root_color="lightgrey")
    fig.update_layout(margin = dict(t=50, l=25, r=25, b=25))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_43531298))
    get_chart_43531298()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_68636849():
    import plotly.express as px
    import numpy as np
    df = px.data.gapminder().query("year == 2007")
    fig = px.treemap(df, path=[px.Constant("world"), 'continent', 'country'], values='pop',
                      color='lifeExp', hover_data=['iso_alpha'],
                      color_continuous_scale='RdBu',
                      color_continuous_midpoint=np.average(df['lifeExp'], weights=df['pop']))
    fig.update_layout(margin = dict(t=50, l=25, r=25, b=25))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_68636849))
    get_chart_68636849()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_52302702():
    import plotly.express as px
    df = px.data.tips()
    fig = px.treemap(df, path=[px.Constant("all"), 'sex', 'day', 'time'], 
                     values='total_bill', color='day')
    fig.update_layout(margin = dict(t=50, l=25, r=25, b=25))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_52302702))
    get_chart_52302702()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_30507421():
    import plotly.express as px
    df = px.data.tips()
    fig = px.treemap(df, path=[px.Constant("all"), 'sex', 'day', 'time'], 
                     values='total_bill', color='time')
    fig.update_layout(margin = dict(t=50, l=25, r=25, b=25))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_30507421))
    get_chart_30507421()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_82052330():
    import plotly.express as px
    df = px.data.tips()
    fig = px.treemap(df, path=[px.Constant("all"), 'sex', 'day', 'time'], 
                     values='total_bill', color='time',
                      color_discrete_map={'(?)':'lightgrey', 'Lunch':'gold', 'Dinner':'darkblue'})
    fig.update_layout(margin = dict(t=50, l=25, r=25, b=25))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_82052330))
    get_chart_82052330()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_1001956():
    import plotly.express as px
    import pandas as pd
    vendors = ["A", "B", "C", "D", None, "E", "F", "G", "H", None]
    sectors = ["Tech", "Tech", "Finance", "Finance", "Other",
               "Tech", "Tech", "Finance", "Finance", "Other"]
    regions = ["North", "North", "North", "North", "North",
               "South", "South", "South", "South", "South"]
    sales = [1, 3, 2, 4, 1, 2, 2, 1, 4, 1]
    df = pd.DataFrame(
        dict(vendors=vendors, sectors=sectors, regions=regions, sales=sales)
    )
    df["all"] = "all" # in order to have a single root node
    print(df)
    fig = px.treemap(df, path=['all', 'regions', 'sectors', 'vendors'], values='sales')
    fig.update_traces(root_color="lightgrey")
    fig.update_layout(margin = dict(t=50, l=25, r=25, b=25))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_1001956))
    get_chart_1001956()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_15906625():
    import plotly.graph_objects as go
    
    fig = go.Figure(go.Treemap(
        labels = ["Eve","Cain", "Seth", "Enos", "Noam", "Abel", "Awan", "Enoch", "Azura"],
        parents = ["", "Eve", "Eve", "Seth", "Seth", "Eve", "Eve", "Awan", "Eve"],
        root_color="lightgrey"
    ))
    
    fig.update_layout(margin = dict(t=50, l=25, r=25, b=25))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_15906625))
    get_chart_15906625()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_98776756():
    import plotly.graph_objects as go
    from plotly.subplots import make_subplots
    
    labels = ["Eve", "Cain", "Seth", "Enos", "Noam", "Abel", "Awan", "Enoch", "Azura"]
    parents = ["", "Eve", "Eve", "Seth", "Seth", "Eve", "Eve", "Awan", "Eve"]
    
    fig = make_subplots(
        cols = 2, rows = 1,
        column_widths = [0.4, 0.4],
        subplot_titles = ('branchvalues: <b>remainder<br />&nbsp;<br />', 'branchvalues: <b>total<br />&nbsp;<br />'),
        specs = [[{'type': 'treemap', 'rowspan': 1}, {'type': 'treemap'}]]
    )
    
    fig.add_trace(go.Treemap(
        labels = labels,
        parents = parents,
        values =  [10, 14, 12, 10, 2, 6, 6, 1, 4],
        textinfo = "label+value+percent parent+percent entry+percent root",
        root_color="lightgrey"
    ),row = 1, col = 1)
    
    fig.add_trace(go.Treemap(
        branchvalues = "total",
        labels = labels,
        parents = parents,
        values = [65, 14, 12, 10, 2, 6, 6, 1, 4],
        textinfo = "label+value+percent parent+percent entry",
        root_color="lightgrey"
    ),row = 1, col = 2)
    
    fig.update_layout(margin = dict(t=50, l=25, r=25, b=25))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_98776756))
    get_chart_98776756()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_1047423():
    import plotly.graph_objects as go
    
    values = [0, 11, 12, 13, 14, 15, 20, 30]
    labels = ["container", "A1", "A2", "A3", "A4", "A5", "B1", "B2"]
    parents = ["", "container", "A1", "A2", "A3", "A4", "container", "B1"]
    
    fig = go.Figure(go.Treemap(
        labels = labels,
        values = values,
        parents = parents,
        marker_colors = ["pink", "royalblue", "lightgray", "purple", 
                         "cyan", "lightgray", "lightblue", "lightgreen"]
    ))
    
    fig.update_layout(margin = dict(t=50, l=25, r=25, b=25))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_1047423))
    get_chart_1047423()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_34595119():
    import plotly.graph_objects as go
    
    values = [0, 11, 12, 13, 14, 15, 20, 30]
    labels = ["container", "A1", "A2", "A3", "A4", "A5", "B1", "B2"]
    parents = ["", "container", "A1", "A2", "A3", "A4", "container", "B1"]
    
    fig = go.Figure(go.Treemap(
        labels = labels,
        values = values,
        parents = parents,
        root_color="lightblue"
    ))
    
    fig.update_layout(
        treemapcolorway = ["pink", "lightgray"],
        margin = dict(t=50, l=25, r=25, b=25)
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_34595119))
    get_chart_34595119()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_67250202():
    import plotly.graph_objects as go
    
    values = [0, 11, 12, 13, 14, 15, 20, 30]
    labels = ["container", "A1", "A2", "A3", "A4", "A5", "B1", "B2"]
    parents = ["", "container", "A1", "A2", "A3", "A4", "container", "B1"]
    
    fig = go.Figure(go.Treemap(
        labels = labels,
        values = values,
        parents = parents,
        marker_colorscale = 'Blues'
    ))
    
    fig.update_layout(margin = dict(t=50, l=25, r=25, b=25))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_67250202))
    get_chart_67250202()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_37030037():
    import plotly.graph_objects as go
    from plotly.subplots import make_subplots
    import pandas as pd
    
    df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/sales_success.csv')
    print(df.head())
    
    levels = ['salesperson', 'county', 'region'] # levels used for the hierarchical chart
    color_columns = ['sales', 'calls']
    value_column = 'calls'
    
    def build_hierarchical_dataframe(df, levels, value_column, color_columns=None):
        """
        Build a hierarchy of levels for Sunburst or Treemap charts.
    
        Levels are given starting from the bottom to the top of the hierarchy,
        ie the last level corresponds to the root.
        """
        df_all_trees = pd.DataFrame(columns=['id', 'parent', 'value', 'color'])
        for i, level in enumerate(levels):
            df_tree = pd.DataFrame(columns=['id', 'parent', 'value', 'color'])
            dfg = df.groupby(levels[i:]).sum()
            dfg = dfg.reset_index()
            df_tree['id'] = dfg[level].copy()
            if i < len(levels) - 1:
                df_tree['parent'] = dfg[levels[i+1]].copy()
            else:
                df_tree['parent'] = 'total'
            df_tree['value'] = dfg[value_column]
            df_tree['color'] = dfg[color_columns[0]] / dfg[color_columns[1]]
            df_all_trees = df_all_trees.append(df_tree, ignore_index=True)
        total = pd.Series(dict(id='total', parent='',
                                  value=df[value_column].sum(),
                                  color=df[color_columns[0]].sum() / df[color_columns[1]].sum()))
        df_all_trees = df_all_trees.append(total, ignore_index=True)
        return df_all_trees
    
    
    df_all_trees = build_hierarchical_dataframe(df, levels, value_column, color_columns)
    average_score = df['sales'].sum() / df['calls'].sum()
    
    fig = make_subplots(1, 2, specs=[[{"type": "domain"}, {"type": "domain"}]],)
    
    fig.add_trace(go.Treemap(
        labels=df_all_trees['id'],
        parents=df_all_trees['parent'],
        values=df_all_trees['value'],
        branchvalues='total',
        marker=dict(
            colors=df_all_trees['color'],
            colorscale='RdBu',
            cmid=average_score),
        hovertemplate='<b>%{label} </b> <br> Sales: %{value}<br> Success rate: %{color:.2f}',
        name=''
        ), 1, 1)
    
    fig.add_trace(go.Treemap(
        labels=df_all_trees['id'],
        parents=df_all_trees['parent'],
        values=df_all_trees['value'],
        branchvalues='total',
        marker=dict(
            colors=df_all_trees['color'],
            colorscale='RdBu',
            cmid=average_score),
        hovertemplate='<b>%{label} </b> <br> Sales: %{value}<br> Success rate: %{color:.2f}',
        maxdepth=2
        ), 1, 2)
    
    fig.update_layout(margin = dict(t=50, l=25, r=25, b=25))
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_37030037))
    get_chart_37030037()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_68639295():
    import plotly.graph_objects as go
    
    import pandas as pd
    
    df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/96c0bd/sunburst-coffee-flavors-complete.csv')
    
    fig = go.Figure()
    
    fig.add_trace(go.Treemap(
        ids = df.ids,
        labels = df.labels,
        parents = df.parents,
        maxdepth=3,
        root_color="lightgrey"
    ))
    
    fig.update_layout(margin = dict(t=50, l=25, r=25, b=25))
    
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_68639295))
    get_chart_68639295()
except Exception as e:
    st.exception(e)



@st.experimental_memo
def get_chart_8690132():
    import plotly.graph_objects as go
    import pandas as pd
    
    df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/96c0bd/sunburst-coffee-flavors-complete.csv')
    
    fig = go.Figure(go.Treemap(
        ids = df.ids,
        labels = df.labels,
        parents = df.parents,
        pathbar_textfont_size=15,
        root_color="lightgrey"
    ))
    fig.update_layout(
        uniformtext=dict(minsize=10, mode='hide'),
        margin = dict(t=50, l=25, r=25, b=25)
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Plotly native theme"])
    with tab1:
        st.plotly_chart(fig, theme="streamlit")
    with tab2:
        st.plotly_chart(fig, theme=None)

try:
    st.expander("See code").code(inspect.getsource(get_chart_8690132))
    get_chart_8690132()
except Exception as e:
    st.exception(e)

