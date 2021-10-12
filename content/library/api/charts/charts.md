---
title: Chart elements
slug: /library/api-reference/charts
---

# Chart elements

Streamlit supports several different charting libraries, and our goal is to
continually add support for more. Right now, the most basic library in our
arsenal is [Matplotlib](https://matplotlib.org/). Then there are also
interactive charting libraries like [Vega
Lite](https://vega.github.io/vega-lite/) (2D charts) and
[deck.gl](https://github.com/uber/deck.gl) (maps and 3D charts). And
finally we also provide a few chart types that are "native" to Streamlit,
like `st.line_chart` and `st.area_chart`.

<TileContainer>
<RefCard href="/library/api-reference/charts/st.line_chart">
<Image pure alt="screenshot" src="/images/api/line_chart.jpg" />

#### Simple line charts

Display a line chart.

```python
st.line_chart(my_data_frame)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.area_chart">
<Image pure alt="screenshot" src="/images/api/area_chart.jpg" />

#### Simple area charts

Display an area chart.

```python
st.area_chart(my_data_frame)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.bar_chart">
<Image pure alt="screenshot" src="/images/api/bar_chart.jpg" />

#### Simple bar charts

Display a bar chart.

```python
st.bar_chart(my_data_frame)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.map">
<Image pure alt="screenshot" src="/images/api/map.jpg" />

#### Scatterplots on maps

Display a map with points on it.

```python
st.map(my_data_frame)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.pyplot">
<Image pure alt="screenshot" src="/images/api/pyplot.jpg" />

#### Matplotlib

Display a matplotlib.pyplot figure.

```python
st.pyplot(my_mpl_figure)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.altair_chart">
<Image pure alt="screenshot" src="/images/api/vega_lite_chart.jpg" />

#### Altair

Display a chart using the Altair library.

```python
st.altair_chart(my_altair_chart)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.vega_lite_chart">
<Image pure alt="screenshot" src="/images/api/vega_lite_chart.jpg" />

#### Vega-Lite

Display a chart using the Vega-Lite library.

```python
st.vega_lite_chart(my_vega_lite_chart)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.plotly_chart">
<Image pure alt="screenshot" src="/images/api/plotly_chart.jpg" />

#### Plotly

Display an interactive Plotly chart.

```python
st.plotly_chart(my_plotly_chart)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.bokeh_chart">
<Image pure alt="screenshot" src="/images/api/bokeh_chart.jpg" />

#### Bokeh

Display an interactive Bokeh chart.

```python
st.bokeh_chart(my_bokeh_chart)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.pydeck_chart">
<Image pure alt="screenshot" src="/images/api/pydeck_chart.jpg" />

#### PyDeck

Display a chart using the PyDeck library.

```python
st.pydeck_chart(my_pydeck_chart)
```

</RefCard>
<RefCard href="/library/api-reference/charts/st.graphviz_chart">
<Image pure alt="screenshot" src="/images/api/graphviz_chart.jpg" />

#### GraphViz

Display a graph using the dagre-d3 library.

```python
st.graphviz_chart(my_graphviz_spec)
```

</RefCard>
</TileContainer>
