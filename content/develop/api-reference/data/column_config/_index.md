---
title: st.column_config
slug: /develop/api-reference/data/st.column_config
---

# Column configuration

When working with data in Streamlit, the `st.column_config` class is a powerful tool for configuring data display and interaction. Specifically designed for the `column_config` parameter in [`st.dataframe`](/develop/api-reference/data/st.dataframe) and [`st.data_editor`](/develop/api-reference/data/st.data_editor), it provides a suite of methods to tailor your columns to various data types - from simple text and numbers to lists, URLs, images, and more.

Whether it's translating temporal data into user-friendly formats or utilizing charts and progress bars for clearer data visualization, column configuration not only provides the user with an enriched data viewing experience but also ensures that you're equipped with the tools to present and interact with your data, just the way you want it.

<TileContainer>
<RefCard href="/develop/api-reference/data/st.column_config/st.column_config.column">
<Image src="/images/api/column_config.column.jpg" alt="screenshot" width={862} height={862} pure />

<h4>Column</h4>

Configure a generic column.

```python
Column("Streamlit Widgets", width="medium", help="Streamlit **widget** commands 🎈")
```

</RefCard>
<RefCard href="/develop/api-reference/data/st.column_config/st.column_config.textcolumn">
<Image src="/images/api/column_config.textcolumn.jpg" alt="screenshot" width={862} height={862} pure />

<h4>Text column</h4>

Configure a text column.

```python
TextColumn("Widgets", max_chars=50, validate="^st\.[a-z_]+$")
```

</RefCard>

<RefCard href="/develop/api-reference/data/st.column_config/st.column_config.numbercolumn">
<Image src="/images/api/column_config.numbercolumn.jpg" alt="screenshot" width={862} height={862} pure />

<h4>Number column</h4>

Configure a number column.

```python
NumberColumn("Price (in USD)", min_value=0, format="$%d")
```

</RefCard>

<RefCard href="/develop/api-reference/data/st.column_config/st.column_config.checkboxcolumn">
<Image src="/images/api/column_config.checkboxcolumn.jpg" alt="screenshot" width={862} height={862} pure />

<h4>Checkbox column</h4>

Configure a checkbox column.

```python
CheckboxColumn("Your favorite?", help="Select your **favorite** widgets")
```

</RefCard>

<RefCard href="/develop/api-reference/data/st.column_config/st.column_config.selectboxcolumn">
<Image src="/images/api/column_config.selectboxcolumn.jpg" alt="screenshot" width={862} height={862} pure />

<h4>Selectbox column</h4>

Configure a selectbox column.

```python
SelectboxColumn("App Category", options=["🤖 LLM", "📈 Data Viz"])
```

</RefCard>

<RefCard href="/develop/api-reference/data/st.column_config/st.column_config.datetimecolumn">
<Image src="/images/api/column_config.datetimecolumn.jpg" alt="screenshot" width={862} height={862} pure />

<h4>Datetime column</h4>

Configure a datetime column.

```python
DatetimeColumn("Appointment", min_value=datetime(2023, 6, 1), format="D MMM YYYY, h:mm a")
```

</RefCard>

<RefCard href="/develop/api-reference/data/st.column_config/st.column_config.datecolumn">
<Image src="/images/api/column_config.datecolumn.jpg" alt="screenshot" width={862} height={862} pure />

<h4>Date column</h4>

Configure a date column.

```python
DateColumn("Birthday", max_value=date(2005, 1, 1), format="DD.MM.YYYY")
```

</RefCard>

<RefCard href="/develop/api-reference/data/st.column_config/st.column_config.timecolumn">
<Image src="/images/api/column_config.timecolumn.jpg" alt="screenshot" width={862} height={862} pure />

<h4>Time column</h4>

Configure a time column.

```python
TimeColumn("Appointment", min_value=time(8, 0, 0), format="hh:mm a")
```

</RefCard>
<RefCard href="/develop/api-reference/data/st.column_config/st.column_config.jsoncolumn">
<Image src="/images/api/column_config.jsoncolumn.jpg" alt="screenshot" width={862} height={862} pure />

<h4>JSON column</h4>

Configure a JSON column.

```python
JSONColumn("Properties", width="medium")
```

</RefCard>
<RefCard href="/develop/api-reference/data/st.column_config/st.column_config.listcolumn">
<Image src="/images/api/column_config.listcolumn.jpg" alt="screenshot" width={862} height={862} pure />

<h4>List column</h4>

Configure a list column.

```python
ListColumn("Sales (last 6 months)", width="medium")
```

</RefCard>

<RefCard href="/develop/api-reference/data/st.column_config/st.column_config.linkcolumn">
<Image src="/images/api/column_config.linkcolumn.jpg" alt="screenshot" width={862} height={862} pure />

<h4>Link column</h4>

Configure a link column.

```python
LinkColumn("Trending apps", max_chars=100, validate="^https://.*$")
```

</RefCard>

<RefCard href="/develop/api-reference/data/st.column_config/st.column_config.imagecolumn">
<Image src="/images/api/column_config.imagecolumn.jpg" alt="screenshot" width={862} height={862} pure />

<h4>Image column</h4>

Configure an image column.

```python
ImageColumn("Preview Image", help="The preview screenshots")
```

</RefCard>

<RefCard href="/develop/api-reference/data/st.column_config/st.column_config.areachartcolumn">
<Image src="/images/api/column_config.areachartcolumn.jpg" alt="screenshot" width={862} height={862} pure />

<h4>Area chart column</h4>

Configure an area chart column.

```python
AreaChartColumn("Sales (last 6 months)" y_min=0, y_max=100)
```

</RefCard>

<RefCard href="/develop/api-reference/data/st.column_config/st.column_config.linechartcolumn">
<Image src="/images/api/column_config.linechartcolumn.jpg" alt="screenshot" width={862} height={862} pure />

<h4>Line chart column</h4>

Configure a line chart column.

```python
LineChartColumn("Sales (last 6 months)" y_min=0, y_max=100)
```

</RefCard>

<RefCard href="/develop/api-reference/data/st.column_config/st.column_config.barchartcolumn">
<Image src="/images/api/column_config.barchartcolumn.jpg" alt="screenshot" width={862} height={862} pure />

<h4>Bar chart column</h4>

Configure a bar chart column.

```python
BarChartColumn("Marketing spend" y_min=0, y_max=100)
```

</RefCard>

<RefCard href="/develop/api-reference/data/st.column_config/st.column_config.progresscolumn">
<Image src="/images/api/column_config.progresscolumn.jpg" alt="screenshot" width={862} height={862} pure />

<h4>Progress column</h4>

Configure a progress column.

```python
ProgressColumn("Sales volume", min_value=0, max_value=1000, format="$%f")
```

</RefCard>

</TileContainer>
