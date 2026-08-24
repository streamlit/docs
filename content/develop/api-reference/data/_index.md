---
title: Data elements
slug: /develop/api-reference/data
description: Display and interact with raw data in Streamlit using dataframes, tables, metrics, and data editors for quick, interactive data visualization and manipulation.
keywords: data elements, dataframes, tables, data editor, metrics, data visualization, interactive data, pandas, data display, streamlit data
---

# Data elements

When you're working with data, it is extremely valuable to visualize that
data quickly, interactively, and from multiple different angles. That's what
Streamlit is actually built and optimized for.

You can display data via [charts](#display-charts), and you can display it in
raw form. These are the Streamlit commands you can use to display and interact with raw data.

<TileContainer>
<RefCard href="/develop/api-reference/data/st.dataframe">
<Image pure alt="screenshot" src="/images/api/dataframe.jpg" />

<h4>Dataframes</h4>

Display a dataframe as an interactive table.

```python
st.dataframe(my_data_frame)
```

</RefCard>
<RefCard href="/develop/api-reference/data/st.data_editor">

<Image pure alt="screenshot" src="/images/api/data_editor.jpg" />

<h4>Data editor</h4>

Display a data editor widget.

```python
edited = st.data_editor(df, num_rows="dynamic")
```

</RefCard>
<RefCard href="/develop/api-reference/data/st.column_config">

<Image pure alt="screenshot" src="/images/api/column_config.jpg" />

<h4>Column configuration</h4>

Configure the display and editing behavior of dataframes and data editors.

```python
st.column_config.NumberColumn("Price (in USD)", min_value=0, format="$%d")
```

</RefCard>

<RefCard href="/develop/api-reference/data/st.table">
<Image pure alt="screenshot" src="/images/api/table.jpg" />

<h4>Static tables</h4>

Display a static table.

```python
st.table(my_data_frame)
```

</RefCard>
<RefCard href="/develop/api-reference/data/st.metric">
<Image pure alt="screenshot" src="/images/api/metric.jpg" />

<h4>Metrics</h4>

Display a metric in big bold font, with an optional indicator of how the metric changed.

```python
st.metric("My metric", 42, 2)
```

</RefCard>
<RefCard href="/develop/api-reference/data/st.json">
<Image pure alt="screenshot" src="/images/api/json.jpg" />

<h4>Dicts and JSON</h4>

Display object or string as a pretty-printed JSON string.

```python
st.json(my_dict)
```

</RefCard>
</TileContainer>
