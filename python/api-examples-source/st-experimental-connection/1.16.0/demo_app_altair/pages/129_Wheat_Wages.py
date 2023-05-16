import streamlit as st
import altair as alt
import inspect
from vega_datasets import data

@st.experimental_memo
def get_chart_887(use_container_width: bool):
    import altair as alt
    from vega_datasets import data
    
    
    base_wheat = alt.Chart(data.wheat.url).transform_calculate(
        year_end="+datum.year + 5")
    
    base_monarchs = alt.Chart(data.monarchs.url).transform_calculate(
        offset="((!datum.commonwealth && datum.index % 2) ? -1: 1) * 2 + 95",
        off2="((!datum.commonwealth && datum.index % 2) ? -1: 1) + 95",
        y="95",
        x="+datum.start + (+datum.end - +datum.start)/2"
    )
    
    bars = base_wheat.mark_bar(**{"fill": "#aaa", "stroke": "#999"}).encode(
        x=alt.X("year:Q", axis=alt.Axis(format='d', tickCount=5)),
        y=alt.Y("wheat:Q", axis=alt.Axis(zindex=1)),
        x2=alt.X2("year_end")
    )
    
    area = base_wheat.mark_area(**{"color": "#a4cedb", "opacity": 0.7}).encode(
        x=alt.X("year:Q"),
        y=alt.Y("wages:Q")
    )
    
    area_line_1 = area.mark_line(**{"color": "#000", "opacity": 0.7})
    area_line_2 = area.mark_line(**{"yOffset": -2, "color": "#EE8182"})
    
    top_bars = base_monarchs.mark_bar(stroke="#000").encode(
        x=alt.X("start:Q"),
        x2=alt.X2("end"),
        y=alt.Y("y:Q"),
        y2=alt.Y2("offset"),
        fill=alt.Fill("commonwealth:N", legend=None, scale=alt.Scale(range=["black", "white"]))
    )
    
    top_text = base_monarchs.mark_text(**{"yOffset": 14, "fontSize": 9, "fontStyle": "italic"}).encode(
        x=alt.X("x:Q"),
        y=alt.Y("off2:Q"),
        text=alt.Text("name:N")
    )
    
    chart = (bars + area + area_line_1 + area_line_2 + top_bars + top_text).properties(
        width=900, height=400
    ).configure_axis(
        title=None, gridColor="white", gridOpacity=0.25, domain=False
    ).configure_view(
        stroke="transparent"
    )
    
    tab1, tab2 = st.tabs(["Streamlit theme (default)", "Altair native theme"])
    
    with tab1:
        st.altair_chart(chart, theme="streamlit", use_container_width=True)
    with tab2:
        st.altair_chart(chart, theme=None, use_container_width=True)

try:
    st.expander("See code").code(inspect.getsource(get_chart_887))
    get_chart_887(use_container_width=True)
except Exception as e:
    st.exception(e)

