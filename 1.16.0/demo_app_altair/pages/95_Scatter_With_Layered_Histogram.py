import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_7522(use_container_width: bool):
    import altair as alt
    import pandas as pd
    import numpy as np
    
    # generate fake data
    source = pd.DataFrame({'gender': ['M']*1000 + ['F']*1000,
                   'height':np.concatenate((np.random.normal(69, 7, 1000),
                                           np.random.normal(64, 6, 1000))),
                   'weight': np.concatenate((np.random.normal(195.8, 144, 1000),
                                            np.random.normal(167, 100, 1000))),
                   'age': np.concatenate((np.random.normal(45, 8, 1000),
                                            np.random.normal(51, 6, 1000)))
            })
    
    selector = alt.selection_single(empty='all', fields=['gender'])
    
    color_scale = alt.Scale(domain=['M', 'F'],
                            range=['#1FC3AA', '#8624F5'])
    
    base = alt.Chart(source).properties(
        width=250,
        height=250
    ).add_selection(selector)
    
    points = base.mark_point(filled=True, size=200).encode(
        x=alt.X('mean(height):Q',
                scale=alt.Scale(domain=[0,84])),
        y=alt.Y('mean(weight):Q',
                scale=alt.Scale(domain=[0,250])),
        color=alt.condition(selector,
                            'gender:N',
                            alt.value('lightgray'),
                            scale=color_scale),
    )
    
    hists = base.mark_bar(opacity=0.5, thickness=100).encode(
        x=alt.X('age',
                bin=alt.Bin(step=5), # step keeps bin size the same
                scale=alt.Scale(domain=[0,100])),
        y=alt.Y('count()',
                stack=None,
                scale=alt.Scale(domain=[0,350])),
        color=alt.Color('gender:N',
                        scale=color_scale)
    ).transform_filter(
        selector
    )
    
    
    chart = points | hists
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_7522))
    get_chart_7522(use_container_width=True)
except Exception as e:
    st.exception(e)

