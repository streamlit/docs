import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_4167(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.cars()
    
    # Brush for selection
    brush = alt.selection(type='interval')
    
    # Scatter Plot
    points = alt.Chart(source).mark_point().encode(
        x='Horsepower:Q',
        y='Miles_per_Gallon:Q',
        color=alt.condition(brush, 'Cylinders:O', alt.value('grey'))
    ).add_selection(brush)
    
    # Base chart for data tables
    ranked_text = alt.Chart(source).mark_text().encode(
        y=alt.Y('row_number:O',axis=None)
    ).transform_window(
        row_number='row_number()'
    ).transform_filter(
        brush
    ).transform_window(
        rank='rank(row_number)'
    ).transform_filter(
        alt.datum.rank<20
    )
    
    # Data Tables
    horsepower = ranked_text.encode(text='Horsepower:N').properties(title='Horsepower')
    mpg = ranked_text.encode(text='Miles_per_Gallon:N').properties(title='MPG')
    origin = ranked_text.encode(text='Origin:N').properties(title='Origin')
    text = alt.hconcat(horsepower, mpg, origin) # Combine data tables
    
    chart = # Build chart
    alt.hconcat(
        points,
        text
    ).resolve_legend(
        color="independent"
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_4167))
    get_chart_4167(use_container_width=True)
except Exception as e:
    st.exception(e)

