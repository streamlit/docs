import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_16817(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.cars()
    
    # Configure the options common to all layers
    brush = alt.selection(type='interval')
    base = alt.Chart(source).add_selection(brush)
    
    # Configure the points
    points = base.mark_point().encode(
        x=alt.X('Miles_per_Gallon', title=''),
        y=alt.Y('Horsepower', title=''),
        color=alt.condition(brush, 'Origin', alt.value('grey'))
    )
    
    # Configure the ticks
    tick_axis = alt.Axis(labels=False, domain=False, ticks=False)
    
    x_ticks = base.mark_tick().encode(
        alt.X('Miles_per_Gallon', axis=tick_axis),
        alt.Y('Origin', title='', axis=tick_axis),
        color=alt.condition(brush, 'Origin', alt.value('lightgrey'))
    )
    
    y_ticks = base.mark_tick().encode(
        alt.X('Origin', title='', axis=tick_axis),
        alt.Y('Horsepower', axis=tick_axis),
        color=alt.condition(brush, 'Origin', alt.value('lightgrey'))
    )
    
    chart = # Build the chart
    y_ticks | (points & x_ticks)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_16817))
    get_chart_16817(use_container_width=True)
except Exception as e:
    st.exception(e)

