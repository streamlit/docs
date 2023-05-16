import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_59581(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.co2_concentration.url
    
    base = alt.Chart(
        source,
        title="Carbon Dioxide in the Atmosphere"
    ).transform_calculate(
        year="year(datum.Date)"
    ).transform_calculate(
        decade="floor(datum.year / 10)"
    ).transform_calculate(
        scaled_date="(datum.year % 10) + (month(datum.Date)/12)"
    ).transform_window(
        first_date='first_value(scaled_date)',
        last_date='last_value(scaled_date)',
        sort=[{"field": "scaled_date", "order": "ascending"}],
        groupby=['decade'],
        frame=[None, None]
    ).transform_calculate(
      end="datum.first_date === datum.scaled_date ? 'first' : datum.last_date === datum.scaled_date ? 'last' : null"
    ).encode(
        x=alt.X(
            "scaled_date:Q",
            axis=alt.Axis(title="Year into Decade", tickCount=11)
        ),
        y=alt.Y(
            "CO2:Q",
            title="CO2 concentration in ppm",
            scale=alt.Scale(zero=False)
        )
    )
    
    line = base.mark_line().encode(
        color=alt.Color(
            "decade:O",
            scale=alt.Scale(scheme="magma"),
            legend=None
        )
    )
    
    text = base.encode(text="year:N")
    
    start_year = text.transform_filter(
      alt.datum.end == 'first'
    ).mark_text(baseline="top")
    
    end_year = text.transform_filter(
      alt.datum.end == 'last'
    ).mark_text(baseline="bottom")
    
    chart = (line + start_year + end_year).configure_text(
        align="left",
        dx=1,
        dy=3
    ).properties(width=600, height=375)
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_59581))
    get_chart_59581(use_container_width=True)
except Exception as e:
    st.exception(e)

