import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_77699(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.countries.url
    
    chart = alt.layer(
        data=source
    ).transform_filter(
        filter={"field": 'country',
                "oneOf": ["China", "India", "United States", "Indonesia", "Brazil"]}
    ).transform_filter(
        filter={'field': 'year',
                "oneOf": [1955, 2000]}
    )
    
    chart += alt.Chart().mark_line(color='#db646f').encode(
        x='life_expect:Q',
        y='country:N',
        detail='country:N'
    )
    # Add points for life expectancy in 1955 & 2000
    chart += alt.Chart().mark_point(
        size=100,
        opacity=1,
        filled=True
    ).encode(
        x='life_expect:Q',
        y='country:N',
        color=alt.Color('year:O',
            scale=alt.Scale(
                domain=['1955', '2000'],
                range=['#e6959c', '#911a24']
            )
        )
    ).interactive()
    
    chart = chart
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_77699))
    get_chart_77699(use_container_width=True)
except Exception as e:
    st.exception(e)

