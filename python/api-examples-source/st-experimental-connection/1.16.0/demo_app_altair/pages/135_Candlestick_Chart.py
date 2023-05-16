import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_41760(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    source = data.ohlc()
    
    open_close_color = alt.condition("datum.open <= datum.close",
                                     alt.value("#06982d"),
                                     alt.value("#ae1325"))
    
    base = alt.Chart(source).encode(
        alt.X('date:T',
              axis=alt.Axis(
                  format='%m/%d',
                  labelAngle=-45,
                  title='Date in 2009'
              )
        ),
        color=open_close_color
    )
    
    rule = base.mark_rule().encode(
        alt.Y(
            'low:Q',
            title='Price',
            scale=alt.Scale(zero=False),
        ),
        alt.Y2('high:Q')
    )
    
    bar = base.mark_bar().encode(
        alt.Y('open:Q'),
        alt.Y2('close:Q')
    )
    
    chart = rule + bar
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_41760))
    get_chart_41760(use_container_width=True)
except Exception as e:
    st.exception(e)

