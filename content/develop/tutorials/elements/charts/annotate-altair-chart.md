---
title: Annotate an Altair chart
slug: /develop/tutorials/elements/annotate-an-altair-chart
description: Learn how to annotate Altair charts in Streamlit with text, images, and emojis using layered charts for enhanced data visualization.
keywords: Altair charts, chart annotation, layered charts, data visualization, chart text, chart images, chart emojis, visualization tutorial
---

# Annotate an Altair chart

Altair allows you to annotate your charts with text, images, and emojis. You can do this by overlaying two charts to create a [layered chart](https://altair-viz.github.io/user_guide/compound_charts.html#layered-charts).

## Applied concepts

- Use layered charts in Altair to create annotations.

## Prerequisites

- This tutorial requires the following Python libraries:

  ```txt
  streamlit
  altair>=4.0.0
  vega_datasets
  ```

- This tutorial assumes you have a clean working directory called `your-repository`.
- You should have a basic understanding of the Vega-Altair charting library.

## Summary

In this example, you will create a time-series chart to track the evolution of stock prices. The chart will have two layers: a data layer and an
annotation layer. Each layer is an `altair.Chart` object. You will combine the two charts with the `+` opterator to create a layered chart.

Within the data layer, you'll add a multi-line tooltip to show information about datapoints. To learn more about multi-line tooltips, see this [example](https://altair-viz.github.io/gallery/multiline_tooltip.html) in Vega-Altair's documentation. You'll add another tooltip to the annotation layer.

Here's a look at what you'll build:

<Collapse title="Complete code" expanded={false}>

```python
import streamlit as st
import altair as alt
import pandas as pd
from vega_datasets import data


@st.cache_data
def get_data():
    source = data.stocks()
    source = source[source.date.gt("2004-01-01")]
    return source


stock_data = get_data()

hover = alt.selection_single(
    fields=["date"],
    nearest=True,
    on="mouseover",
    empty="none",
)

lines = (
    alt.Chart(stock_data, title="Evolution of stock prices")
    .mark_line()
    .encode(
        x="date",
        y="price",
        color="symbol",
    )
)

points = lines.transform_filter(hover).mark_circle(size=65)

tooltips = (
    alt.Chart(stock_data)
    .mark_rule()
    .encode(
        x="yearmonthdate(date)",
        y="price",
        opacity=alt.condition(hover, alt.value(0.3), alt.value(0)),
        tooltip=[
            alt.Tooltip("date", title="Date"),
            alt.Tooltip("price", title="Price (USD)"),
        ],
    )
    .add_selection(hover)
)

data_layer = lines + points + tooltips

ANNOTATIONS = [
    ("Sep 01, 2007", 450, "🙂", "Something's going well for GOOG & AAPL."),
    ("Nov 01, 2008", 220, "🙂", "The market is recovering."),
    ("Dec 01, 2007", 750, "😱", "Something's going wrong for GOOG & AAPL."),
    ("Dec 01, 2009", 680, "😱", "A hiccup for GOOG."),
]
annotations_df = pd.DataFrame(
    ANNOTATIONS, columns=["date", "price", "marker", "description"]
)
annotations_df.date = pd.to_datetime(annotations_df.date)

annotation_layer = (
    alt.Chart(annotations_df)
    .mark_text(size=20, dx=-10, dy=0, align="left")
    .encode(x="date:T", y=alt.Y("price:Q"), text="marker", tooltip="description")
)

combined_chart = data_layer + annotation_layer
st.altair_chart(combined_chart, use_container_width=True)
```

</Collapse>

<Cloud name="doc-annotate-altair" height="450px" />

## Build the example

### Initialize your app

1. In `your_repository`, create a file named `app.py`.
1. In a terminal, change directories to `your_repository`, and start your app:

   ```bash
   streamlit run app.py
   ```

   Your app will be blank because you still need to add code.

1. In `app.py`, write the following:

   ```python
    import streamlit as st
    import altair as alt
    import pandas as pd
    from vega_datasets import data
   ```

   You'll be using these libraries as follows:
   - You'll download a dataset using [`vega_datasets`](https://pypi.org/project/vega-datasets/).
   - You'll maniputate the data using `pandas`.
   - You'll define a chart using `altair`.

1. Save your `app.py` file, and view your running app.
1. In your app, select "**Always rerun**", or press the "**A**" key.

   Your preview will be blank but will automatically update as you save changes to `app.py`.

1. Return to your code.

### Build the data layer

You'll build an interactive time-series chart of the stock prices with a multi-line tooltip. The x-axis represents the date, and the y-axis represents the stock price.

1. Import data from `vega_datasets`.

   ```python
   @st.cache_data
   def get_data():
       source = data.stocks()
       source = source[source.date.gt("2004-01-01")]
       return source

   stock_data = get_data()
   ```

   The `@st.cache_data` decorator turns `get_data()` into a cahced function. Streamlit will only download the data once since the data will be saved in a cache. For more information about caching, see [Caching overview](/develop/concepts/architecture/caching).

1. Define a mouseover selection event in Altair.

   ```python
   hover = alt.selection_single(
       fields=["date"],
       nearest=True,
       on="mouseover",
       empty="none",
   )
   ```

   This defines a mouseover selection for points. `fields=["date"]` allows Altair to identify other points with the same date. You will use this to create a vertical line highlight when a user hovers over a point.

1. Define a basic line chart to graph the five series in your data set.

   ```python
   lines = (
       alt.Chart(stock_data, title="Evolution of stock prices")
       .mark_line()
       .encode(
           x="date",
           y="price",
           color="symbol",
       )
   )
   ```

1. Draw points on the lines and highlight them based on the mouseover selection.

   ```python
   points = lines.transform_filter(hover).mark_circle(size=65)
   ```

   Since the mouseover selection includes `fields=["date"]`, Altair will draw circles on each series at the same date.

1. Draw a vertical rule at the location of the mouseover selection.

   ```python
   tooltips = (
       alt.Chart(stock_data)
       .mark_rule()
       .encode(
           x="yearmonthdate(date)",
           y="price",
           opacity=alt.condition(hover, alt.value(0.3), alt.value(0)),
           tooltip=[
               alt.Tooltip("date", title="Date"),
               alt.Tooltip("price", title="Price (USD)"),
           ],
       )
       .add_selection(hover)
   )
   ```

   The `opacity` parameter ensures each vertical line is only visible when it's part of a mouseover selection. Each `alt.Tooltip` adds a line to your multi-line tooltip.

1. Combine the lines, points, and tooltips into a single chart.

   ```python
   data_layer = lines + points + tooltips
   ```

1. Optional: Test out your code by rendering your data layer.

   ```python
   st.altair_chart(data_layer, use_container_width=True)
   ```

   Save your file and examine the chart in your app. Use your mouse to hover over points. Observe the circle marks, vertical line, and tooltip as you hover over a point. Delete the line or keep it at the end of your app to be updated as you continue.

### Build the annotation layer

Now that you have the first chart that shows the data, you can annotate it with text and an emoji. In this section, you'll add some emojis and tooltips to mark specifc points of interest.

1. Create a list of annotations.

   ```python
   ANNOTATIONS = [
       ("Sep 01, 2007", 450, "🙂", "Something's going well for GOOG & AAPL."),
       ("Nov 01, 2008", 220, "🙂", "The market is recovering."),
       ("Dec 01, 2007", 750, "😱", "Something's going wrong for GOOG & AAPL."),
       ("Dec 01, 2009", 680, "😱", "A hiccup for GOOG."),
   ]
   annotations_df = pd.DataFrame(
       ANNOTATIONS, columns=["date", "price", "marker", "description"]
   )
   annotations_df.date = pd.to_datetime(annotations_df.date)
   ```

   The first two columns ("date" and "price") determine where Altair will place the marker. The third column ("marker") determines what icon Altair will place. The last column ("description") will fill in the associated tooltip.

1. Create a scatter plot with the x-axis representing the date and the y-axis representing the height ("price") of each annotation.

   ```python
   annotation_layer = (
       alt.Chart(annotations_df)
       .mark_text(size=20, dx=-10, dy=0, align="left")
       .encode(x="date:T", y=alt.Y("price:Q"), text="marker", tooltip="description")
   )
   ```

   The `dx=-10, dy=0` inside of `.mark_text()` offsets the icons so they are centered at the coordinate in your annotations dataframe. The four columns are passed to the chart through the `.encode()` method. If you want to use the same marker for all points, you can remove `text="marker"` from the `.encode()` method and add the marker to `.mark_text()`. For example, `.mark_text(text="🥳")` would make all the icons be "🥳". For more information about `.mark_text()`, see Altair's [documentation](https://altair-viz.github.io/user_guide/marks.html).

### Combine the chart layers

1. Define the combined chart.

   ```python
   combined_chart = data_layer + annotation_layer
   ```

1. Display the chart in Streamlit.

   ```python
   st.altair_chart(combined_chart, use_container_width=True)
   ```

## Next steps

Play around with your new app.

- If you want to use custom images instead of text or emojis to annotation your chart, you can replace the line containing `.mark_text()` with `.mark_image()`. For some URL string stored in a variable `IMAGE_URL`, you could do something like this:

  ```python
  .mark_image(
      width=12,
      height=12,
      url=IMAGE_URL,
  )
  ```

- If you want to enable panning and zooming for your chart, add `.interactive()` when you define your combined chart:

  ```python
  combined_chart = (data_layer + annotation_layer).interactive()
  ```
