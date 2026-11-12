---
title: Choosing and using charts
slug: /develop/concepts/design/charts
description: Learn which Streamlit chart command to use for each kind of visualization, how to keep charts consistent across a page, how to read chart selections, and how to chart large datasets.
keywords: charts, choose a chart, chart selection, st.line_chart, st.bar_chart, st.altair_chart, st.echarts_chart, st.plotly_chart, st.pyplot, st.map, st.pydeck_chart, st.mermaid_chart, st.graphviz_chart, vega-lite, echarts, large datasets, accessible charts, alt text
---

# Choosing and using charts

Streamlit has native commands for several charting libraries. They differ in which chart types they support, how interactive they are, how well they match your app's theme, and how they handle large data. This guide helps you pick a chart command and use it well.

## Summary

1. Start with the simple charts, like `st.line_chart` and `st.bar_chart`. Move to `st.altair_chart` when you need more control.
2. Use `st.echarts_chart` for chart types and in-chart features that Vega-Lite doesn't have, like sankey diagrams, gauges, and zoom sliders.
3. Prefer `st.echarts_chart` over `st.plotly_chart` for interactive charts. Use Plotly for 3D and scientific charts, and use `st.pyplot` only for Matplotlib figures you already have.
4. Prefer one charting library per page, and set chart colors in your theme instead of per chart.
5. Pass `alt` to every chart so assistive technologies can describe it.
6. Aggregate large data before you chart it, and use `st.echarts_chart` for very large or frequently changing series.

## Choose a chart command

The Vega-based charts (`st.line_chart`, `st.bar_chart`, `st.area_chart`, `st.scatter_chart`, `st.altair_chart`, and `st.vega_lite_chart`) and `st.echarts_chart` follow your app's theme, including light and dark mode. They're interactive and send dataframes to the browser efficiently as Arrow. For `st.echarts_chart`, this applies when you pass the dataframe in `dataset.source`. Prefer these commands for most charts.

| Need                                                                                                                   | Use                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A quick line, bar, area, or scatter chart from a dataframe                                                             | [`st.line_chart`](/develop/api-reference/charts/st.line_chart), [`st.bar_chart`](/develop/api-reference/charts/st.bar_chart), [`st.area_chart`](/develop/api-reference/charts/st.area_chart), [`st.scatter_chart`](/develop/api-reference/charts/st.scatter_chart)                                                                                                                                      |
| Chart titles, custom tooltips, layers, dual axes, log scales, faceting, aggregation, binning, or regression            | [`st.altair_chart`](/develop/api-reference/charts/st.altair_chart) (Altair is installed with Streamlit)                                                                                                                                                                                                                                                                                                 |
| Brushing one chart to filter linked views                                                                              | `st.altair_chart`                                                                                                                                                                                                                                                                                                                                                                                       |
| An existing Vega-Lite JSON specification                                                                               | [`st.vega_lite_chart`](/develop/api-reference/charts/st.vega_lite_chart)                                                                                                                                                                                                                                                                                                                                |
| Network graphs, trees, sankey, chord, sunburst, treemap, gauge, radar, funnel, calendar heatmap, or candlestick charts | [`st.echarts_chart`](/develop/api-reference/charts/st.echarts_chart)                                                                                                                                                                                                                                                                                                                                    |
| A built-in zoom slider, in-chart toolbox, or color-range filter                                                        | `st.echarts_chart` (`dataZoom`, `toolbox`, and `visualMap`)                                                                                                                                                                                                                                                                                                                                             |
| Values that animate when a widget changes the data                                                                     | `st.echarts_chart`                                                                                                                                                                                                                                                                                                                                                                                      |
| Line, bar, or scatter charts with more than about 100,000 points                                                       | `st.echarts_chart` (see [Chart large datasets](#chart-large-datasets))                                                                                                                                                                                                                                                                                                                                  |
| An existing ECharts option, JSON string, or `pyecharts` chart                                                          | `st.echarts_chart`                                                                                                                                                                                                                                                                                                                                                                                      |
| 3D surfaces, meshes, or volumes; violin, ternary, or carpet plots; or an existing Plotly figure                        | [`st.plotly_chart`](/develop/api-reference/charts/st.plotly_chart)                                                                                                                                                                                                                                                                                                                                      |
| An existing Matplotlib or seaborn figure                                                                               | [`st.pyplot`](/develop/api-reference/charts/st.pyplot) (a static image)                                                                                                                                                                                                                                                                                                                                 |
| Points on a map                                                                                                        | [`st.map`](/develop/api-reference/charts/st.map)                                                                                                                                                                                                                                                                                                                                                        |
| Layered, 3D, or interactive geospatial data                                                                            | [`st.pydeck_chart`](/develop/api-reference/charts/st.pydeck_chart)                                                                                                                                                                                                                                                                                                                                      |
| Flowcharts, sequence diagrams, or entity-relationship diagrams                                                         | [`st.mermaid_chart`](/develop/api-reference/charts/st.mermaid_chart)                                                                                                                                                                                                                                                                                                                                    |
| A diagram that needs Graphviz layout engines or clusters                                                               | [`st.graphviz_chart`](/develop/api-reference/charts/st.graphviz_chart)                                                                                                                                                                                                                                                                                                                                  |
| A small trend inside a metric or table cell                                                                            | `chart_data` in [`st.metric`](/develop/api-reference/data/st.metric), or [`LineChartColumn`](/develop/api-reference/data/st.column_config/st.column_config.linechartcolumn), [`BarChartColumn`](/develop/api-reference/data/st.column_config/st.column_config.barchartcolumn), and [`AreaChartColumn`](/develop/api-reference/data/st.column_config/st.column_config.areachartcolumn) in `st.dataframe` |

A good rule of thumb: start with a simple chart and move to `st.altair_chart` when the simple chart runs out of options. Move to `st.echarts_chart` for the chart types and features in the table that Vega-Lite doesn't have, rather than to redraw a plain line, bar, or scatter chart.

## Keep charts consistent

Charting libraries differ in their tooltips, legends, toolbars, zoom behavior, and selection gestures. When you mix libraries on a page, the charts look and behave inconsistently. Prefer one charting library per page, and ideally across your whole app.

- Default to Vega-based charts. The simple charts and `st.altair_chart` share one look, so you can freely mix them.
- If a page needs several chart types that only ECharts has, like a sankey diagram next to a gauge, consider drawing the page's other charts with `st.echarts_chart` too.
- A single ECharts chart on an otherwise Vega-based page is fine.
- For operational dashboards with KPIs, monitoring, or several charts driven by the same filters, consider `st.echarts_chart` for every chart. Filter changes animate from the old values to the new values, and time series can have a zoom slider. For analytical dashboards with aggregation, faceting, or linked brushing, consider `st.altair_chart`.
- Sparklines in `st.metric` and chart columns in `st.dataframe` fit next to either library.

Keep each chart's default `theme="streamlit"` so all charts use your app's fonts and colors. To change the chart palette, set [`chartCategoricalColors` and `chartSequentialColors`](/develop/api-reference/configuration/config.toml#theme) in your theme configuration instead of setting colors on each chart.

## Give charts accessible names

Pass the keyword-only `alt` parameter to every chart, map, and diagram. Screen readers announce it as the chart's name. Describe the chart's takeaway or subject in plain text instead of naming the chart type or listing data.

```python
st.bar_chart(
    df,
    x="category",
    y="revenue",
    alt="Revenue by product line, highest for Enterprise",
)
```

Markdown isn't rendered in `alt`, so screen readers announce Markdown syntax literally. For `st.echarts_chart`, `alt` replaces the description that ECharts generates from your data, so make it at least as informative.

## Simple charts

The simple chart commands take a dataframe and column names. Use `color` to group series, `stack` to stack bars and areas, `horizontal` and `sort` to arrange bars, and `size` to size scatter points.

```python
import streamlit as st
from vega_datasets import data

df = data.seattle_weather()

st.line_chart(df, x="date", y=["temp_max", "temp_min"], alt="Daily temperatures in Seattle")

precipitation = df.groupby("weather", as_index=False)["precipitation"].sum()
st.bar_chart(precipitation, x="weather", y="precipitation", alt="Total precipitation by weather type")
```

If your column names are cryptic, use `x_label` and `y_label` to give the axes readable names. For example, for a dataframe with `dt` and `rev` columns:

```python
st.line_chart(df, x="dt", y="rev", x_label="Date", y_label="Revenue", alt="Revenue over time")
```

Move to `st.altair_chart` when you need a chart title, custom tooltips, layered or dual-axis charts, log scales, faceting, transforms, or selections.

## Altair for advanced Vega-Lite charts

[Altair](https://altair-viz.github.io/) is installed with Streamlit and gives you the full power of Vega-Lite:

```python
import altair as alt
import streamlit as st
from vega_datasets import data

df = data.stocks()

chart = (
    alt.Chart(df)
    .mark_line()
    .encode(
        x=alt.X("date:T", title="Date"),
        y=alt.Y("price:Q", title="Price (USD)"),
        color=alt.Color("symbol:N", title="Company"),
        tooltip=["date:T", "symbol:N", alt.Tooltip("price:Q", format="$,.2f")],
    )
    .properties(title="Stock prices")
)
st.altair_chart(chart, alt="Stock prices of five tech companies, 2000 to 2010")
```

Altair normally limits charts to 5,000 rows. Streamlit sends chart data separately, so this limit doesn't apply and you don't need `alt.data_transformers.disable_max_rows()`.

## Apache ECharts

`st.echarts_chart` accepts an [ECharts option](https://echarts.apache.org/en/option.html) as a dictionary, a JSON string, or a `pyecharts` chart. When your data is in a dataframe, pass it as `dataset.source` instead of converting columns into lists for `series.data` or `xAxis.data`. Always do this for more than about 1,000 rows. Streamlit sends a dataframe source as Arrow, which is faster than inline values, and the chart's toolbar gets a **Show data** button that displays the dataframe as a table.

```python
import pandas as pd
import streamlit as st

df = pd.DataFrame(
    {
        "product": ["Matcha", "Milk tea", "Cocoa"],
        "2025": [43.3, 83.1, 86.4],
        "2026": [85.8, 73.4, 65.2],
    }
)

st.echarts_chart(
    {
        "legend": {},
        "tooltip": {"trigger": "axis", "valueFormatter": "dollar"},
        "dataset": {"source": df},
        "xAxis": {"type": "category"},
        "yAxis": {},
        "series": [{"type": "bar"}, {"type": "bar"}],
    },
    alt="Sales by product for 2025 and 2026, Matcha up the most",
)
```

Keep these points in mind:

- Streamlit doesn't send the dataframe index. Call `df.reset_index()` to plot it.
- Graph, sankey, tree, treemap, sunburst, and other series that don't read `dataset` take their data in `series.data` (and `series.links`) instead.
- Options must be JSON-compatible. JavaScript callbacks, like `formatter` functions, aren't supported. To format tooltip values without JavaScript, set `tooltip.valueFormatter` to a number format like `"dollar"`, `"compact"`, or `"%,d visits"`, as you would in `st.metric`. String templates like `"{b}: {c}"` also work in labels and tooltips.
- On a category axis, ECharts reads numbers as 0-based category positions. Pass category labels as strings, and cast numeric category columns, like years, with `.astype(str)`.
- Text in the option is plain text. Put formatted copy in `st.markdown` next to the chart.
- When a rerun changes the data, the chart animates from the old values to the new values. Set `key` to give the chart a stable identity. Without a key, moving the chart, or changing the spec of a chart with selections, resets it and replays its entry animation.

## Chart selections

`st.altair_chart`, `st.vega_lite_chart`, `st.echarts_chart`, `st.plotly_chart`, and `st.pydeck_chart` can return the user's selection to your app when you set `on_select="rerun"` or pass a callback. Each library enables selections differently:

| Command                                    | Enable selections with                                                                                 | Read the selection from                                |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| `st.altair_chart` and `st.vega_lite_chart` | A named selection parameter, like `alt.selection_point("name")` or `alt.selection_interval("name")`    | `event.selection.<name>`                               |
| `st.echarts_chart`                         | `selectedMode` on a series for points, or a `brush` component for regions                              | `event.selection.selected` and `event.selection.areas` |
| `st.plotly_chart`                          | No extra configuration. Use `selection_mode` to limit selections to `"points"`, `"box"`, or `"lasso"`. | `event.selection.points`                               |
| `st.pydeck_chart`                          | An `id` on each selectable layer. Use `selection_mode="multi-object"` to select several objects.       | `event.selection.objects`                              |

For example, here's an Altair chart where the user can brush a date range:

```python
import altair as alt
import streamlit as st
from vega_datasets import data

df = data.seattle_weather()

brush = alt.selection_interval(name="brush", encodings=["x"])
chart = (
    alt.Chart(df)
    .mark_bar()
    .encode(x="date:T", y="precipitation:Q")
    .add_params(brush)
)
event = st.altair_chart(chart, on_select="rerun", key="weather_chart")
st.write(event.selection.brush)
```

- `st.echarts_chart` has no `selection_mode` parameter. You must enable selections in the ECharts option with `selectedMode` or a `brush` component. Otherwise, the chart never returns a selection.
- ECharts graph and sankey series report selected nodes and edges separately, which makes `st.echarts_chart` a good choice when users should click through network and flow charts.
- Set `key` on Altair, Vega-Lite, ECharts, and pydeck charts to keep the selection when the data changes. Plotly selections reset whenever the figure changes, even with a key.
- To annotate the returned event, import `VegaLiteState`, `EChartsState`, `PlotlyState`, or `PydeckState` from `streamlit.typing`.

## Chart large datasets

Every row in a chart is sent to and processed in the browser. From about 10,000 points per chart, rendering in the browser takes longer than your Python code. Choose the chart command by the number of points:

| Points per chart     | Recommendation                                                               |
| -------------------- | ---------------------------------------------------------------------------- |
| Up to about 10,000   | Any chart command. Choose by features.                                       |
| 10,000 to 100,000    | A Vega-based chart or `st.echarts_chart`.                                    |
| 100,000 to 1,000,000 | `st.echarts_chart`. For dense lines, add `"sampling": "lttb"` to the series. |
| More than 1,000,000  | Aggregate the data first.                                                    |

- Aggregate in pandas, Polars, or SQL before charting. Vega-Lite transforms like `aggregate` and `bin` also run in the browser, on every row.
- If a chart's data changes often, like with filters or live data, prefer `st.echarts_chart` from about 50,000 points. It updates faster than Vega-based charts. Reruns that don't change a chart's data are cheap for every chart command.
- For `st.echarts_chart`, always pass large data as a dataframe in `dataset.source`, never as lists.
- Cache data loading with [`st.cache_data`](/develop/api-reference/caching-and-state/st.cache_data), and put charts that refresh on a timer in a [fragment](/develop/concepts/architecture/fragments) with `run_every`.
- If the data loads slowly, wrap the loading code and the chart in [`st.skeleton`](/develop/api-reference/status/st.skeleton) so the chart's space is reserved while it loads. For more information, see [Optimizing app performance](/develop/concepts/design/performance).

Streamlit automatically sets some rendering options for large charts. Vega-based charts with more than 2,000 per-row marks, like points and bars, render to a canvas instead of SVG. This includes the hover points of `st.line_chart`, but not the lines and areas of an Altair chart. For charts without selections, `st.echarts_chart` turns on ECharts' `large` mode for big scatter and bar series and hides symbols on long line series.

## Plotly and Matplotlib

The Vega-based charts and `st.echarts_chart` cover ordinary 2D charts and match your app's theme more closely, so prefer them for new charts. If you're used to Plotly for interactive charts, `st.echarts_chart` is usually the closest replacement. It has hover tooltips, zooming, an in-chart toolbox, animated updates, and selections, and it stays fast with large datasets. Plotly selections also reset whenever the figure changes, while ECharts selections persist when you set a `key`.

- Use `st.plotly_chart` for charts that neither Vega-Lite nor ECharts draws: 3D charts, scientific traces like violin, ternary, or carpet plots, or a Plotly figure you already have. Browsers allow only a few WebGL contexts per page, so limit the number of WebGL-based Plotly charts on a page.
- `st.pyplot` displays a Matplotlib figure as a static image without zoom, hover, or selections. It doesn't follow your app's theme and renders on the server every rerun. Use it for a figure you already have, or for libraries that only produce Matplotlib output, like seaborn or statsmodels. Pass a `Figure`, not an `Axes`. For example, pandas' `.plot()` returns an `Axes`, so pass its `.get_figure()` result.

## Maps and diagrams

- `st.map` draws points on a basemap without an API token, and its markers use your theme's primary color by default. Use `st.pydeck_chart` for polygons, arcs, hexagons, heatmaps, 3D, tooltips, multiple layers, or selections.
- `st.mermaid_chart` draws flowcharts, sequence diagrams, entity-relationship diagrams, and other Mermaid diagrams, styled for light and dark mode.
- `st.graphviz_chart` is for diagrams that need Graphviz layout engines or clusters. It doesn't adapt to your theme, so set node, edge, and font colors explicitly if your app uses a dark theme. Otherwise, prefer `st.mermaid_chart`.
