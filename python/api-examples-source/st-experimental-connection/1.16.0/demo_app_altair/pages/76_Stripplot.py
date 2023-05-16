import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_14471(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.movies.url
    
    stripplot =  alt.Chart(source, width=40).mark_circle(size=8).encode(
        x=alt.X(
            'jitter:Q',
            title=None,
            axis=alt.Axis(values=[0], ticks=True, grid=False, labels=False),
            scale=alt.Scale(),
        ),
        y=alt.Y('IMDB_Rating:Q'),
        color=alt.Color('Major_Genre:N', legend=None),
        column=alt.Column(
            'Major_Genre:N',
            header=alt.Header(
                labelAngle=-90,
                titleOrient='top',
                labelOrient='bottom',
                labelAlign='right',
                labelPadding=3,
            ),
        ),
    ).transform_calculate(
        # Generate Gaussian jitter with a Box-Muller transform
        jitter='sqrt(-2*log(random()))*cos(2*PI*random())'
    ).configure_facet(
        spacing=0
    ).configure_view(
        stroke=None
    )
    
    chart = stripplot
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_14471))
    get_chart_14471(use_container_width=True)
except Exception as e:
    st.exception(e)

