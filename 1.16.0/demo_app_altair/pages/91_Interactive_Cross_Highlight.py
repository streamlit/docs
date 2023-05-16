import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_79301(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.movies.url
    
    pts = alt.selection(type="single", encodings=['x'])
    
    rect = alt.Chart(data.movies.url).mark_rect().encode(
        alt.X('IMDB_Rating:Q', bin=True),
        alt.Y('Rotten_Tomatoes_Rating:Q', bin=True),
        alt.Color('count()',
            scale=alt.Scale(scheme='greenblue'),
            legend=alt.Legend(title='Total Records')
        )
    )
    
    circ = rect.mark_point().encode(
        alt.ColorValue('grey'),
        alt.Size('count()',
            legend=alt.Legend(title='Records in Selection')
        )
    ).transform_filter(
        pts
    )
    
    bar = alt.Chart(source).mark_bar().encode(
        x='Major_Genre:N',
        y='count()',
        color=alt.condition(pts, alt.ColorValue("steelblue"), alt.ColorValue("grey"))
    ).properties(
        width=550,
        height=200
    ).add_selection(pts)
    
    chart = alt.vconcat(
        rect + circ,
        bar
    ).resolve_legend(
        color="independent",
        size="independent"
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_79301))
    get_chart_79301(use_container_width=True)
except Exception as e:
    st.exception(e)

