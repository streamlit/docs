---
title: Display charts
category: Reference Guides / API Reference
---

# Display charts

Streamlit supports several different charting libraries, and our goal is to
continually add support for more. Right now, the most basic library in our
arsenal is [Matplotlib](https://matplotlib.org/). Then there are also
interactive charting libraries like [Vega
Lite](https://vega.github.io/vega-lite/) (2D charts) and
[deck.gl](https://github.com/uber/deck.gl) (maps and 3D charts). And
finally we also provide a few chart types that are "native" to Streamlit,
like `st.line_chart` and `st.area_chart`.

<Autofunction function="streamlit.line_chart" />
<Autofunction function="streamlit.area_chart" />
<Autofunction function="streamlit.bar_chart" />
<Autofunction function="streamlit.pyplot" />
<Autofunction function="streamlit.altair_chart" />
<Autofunction function="streamlit.vega_lite_chart" />
<Autofunction function="streamlit.plotly_chart" />
<Autofunction function="streamlit.bokeh_chart" />
<Autofunction function="streamlit.pydeck_chart" />
<Autofunction function="streamlit.graphviz_chart" />
<Autofunction function="streamlit.map" />
