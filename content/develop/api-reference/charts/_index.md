---
title: Chart elements
slug: /develop/api-reference/charts
description: Create interactive data visualizations with Streamlit's charting capabilities including simple charts, advanced visualization libraries, and community components.
keywords: charts, visualization, echarts, matplotlib, vega-lite, dashboards, cross-filtering, deck.gl, altair, plotly, bokeh, pydeck, graphviz, maps, line chart, bar chart, area chart, scatter chart
---

# Chart elements

Streamlit renders interactive charts natively, styled by your theme: [Vega-Lite](https://vega.github.io/vega-lite/) charts, including simple chart commands such as `st.line_chart` and `st.bar_chart`, [Apache ECharts](https://echarts.apache.org/) with `st.echarts_chart`, Plotly with `st.plotly_chart`, and [deck.gl](https://github.com/uber/deck.gl) maps with `st.pydeck_chart`. You can also show static [Matplotlib](https://matplotlib.org/) figures with `st.pyplot`. Altair, Vega-Lite, ECharts, Plotly, and pydeck charts support selections with `on_select`, so people can click a chart to cross-filter the rest of the page.

For new charts, start with the simple chart commands or `st.altair_chart`, and use `st.echarts_chart` for large datasets or data that changes often.

<Tip>

Rebuilding visuals from a Power BI or Tableau dashboard? See [Coming from a BI tool?](/develop/concepts/design/dashboards#coming-from-a-bi-tool) for a mapping of BI visuals, filters, and drill-downs to Streamlit.

</Tip>

## Simple chart elements

<TileContainer>
<RefCard href="/develop/api-reference/charts/st.area_chart">
<Image pure alt="screenshot" src="/images/api/area_chart.jpg" />

<h4>Simple area charts</h4>

Display an area chart.

```python
st.area_chart(my_data_frame)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.bar_chart">
<Image pure alt="screenshot" src="/images/api/bar_chart.jpg" />

<h4>Simple bar charts</h4>

Display a bar chart.

```python
st.bar_chart(my_data_frame)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.line_chart">
<Image pure alt="screenshot" src="/images/api/line_chart.jpg" />

<h4>Simple line charts</h4>

Display a line chart.

```python
st.line_chart(my_data_frame)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.scatter_chart">
<Image pure alt="screenshot" src="/images/api/scatter_chart.svg" />

<h4>Simple scatter charts</h4>

Display a scatter chart.

```python
st.scatter_chart(my_data_frame)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.map">
<Image pure alt="screenshot" src="/images/api/map.jpg" />

<h4>Scatterplots on maps</h4>

Display a map with points on it.

```python
st.map(my_data_frame)
```

</RefCard>
</TileContainer>

## Advanced chart elements

<TileContainer>
<RefCard href="/develop/api-reference/charts/st.pyplot">
<Image pure alt="screenshot" src="/images/api/pyplot.jpg" />

<h4>Matplotlib</h4>

Display a matplotlib.pyplot figure.

```python
st.pyplot(my_mpl_figure)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.altair_chart">
<Image pure alt="screenshot" src="/images/api/vega_lite_chart.jpg" />

<h4>Altair</h4>

Display a chart using the Altair library.

```python
st.altair_chart(my_altair_chart)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.vega_lite_chart">
<Image pure alt="screenshot" src="/images/api/vega_lite_chart.jpg" />

<h4>Vega-Lite</h4>

Display a chart using the Vega-Lite library.

```python
st.vega_lite_chart(my_vega_lite_chart)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.plotly_chart">
<Image pure alt="screenshot" src="/images/api/plotly_chart.jpg" />

<h4>Plotly</h4>

Display an interactive Plotly chart.

```python
st.plotly_chart(my_plotly_chart)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.pydeck_chart">
<Image pure alt="screenshot" src="/images/api/pydeck_chart.jpg" />

<h4>PyDeck</h4>

Display a chart using the PyDeck library.

```python
st.pydeck_chart(my_pydeck_chart)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.graphviz_chart">
<Image pure alt="screenshot" src="/images/api/graphviz_chart.jpg" />

<h4>GraphViz</h4>

Display a graph using the dagre-d3 library.

```python
st.graphviz_chart(my_graphviz_spec)
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.mermaid_chart">

<Image pure alt="screenshot" src="/images/api/mermaid_chart.jpg" />

<h4>Mermaid chart</h4>

Display a Mermaid diagram.

```python
st.mermaid_chart("graph LR\n  A --> B")
```

</RefCard>
<RefCard href="/develop/api-reference/charts/st.echarts_chart">

<Image pure alt="screenshot" src="/images/api/echarts_chart.jpg" />

<h4>ECharts</h4>

Display a chart using the Apache ECharts library.

```python
st.echarts_chart(my_echarts_option)
```

</RefCard>
</TileContainer>
