---
title: st.dataframe
slug: /library/api-reference/data/st.dataframe
description: st.dataframe displays a dataframe as an interactive table.
---

<Tip>

This page only contains information on the `st.dataframe` API. For a deeper dive into working with DataFrames read [Dataframes](/library/advanced-features/dataframes).

</Tip>

<Autofunction function="streamlit.dataframe" />

<br />

`st.dataframe` supports the `use_container_width` parameter to stretch across the full container width:

```python
import pandas as pd
import streamlit as st

# Cache the dataframe so it's only loaded once
@st.cache_data
def load_data():
    return pd.DataFrame(
        {
            "first column": [1, 2, 3, 4],
            "second column": [10, 20, 30, 40],
        }
    )

# Boolean to resize the dataframe, stored as a session state variable
st.checkbox("Use container width", value=False, key="use_container_width")

df = load_data()

# Display the dataframe and allow the user to stretch the dataframe
# across the full width of the container, based on the checkbox value
st.dataframe(df, use_container_width=st.session_state.use_container_width)
```

<Cloud src="https://doc-dataframe2.streamlit.app/?embed=true" height="350" />

## Column configuration

<TileContainer>
<RefCard href="/library/api-reference/data/st.column_config/st.column_config.column">
<Image pure alt="screenshot" src="/images/api/column_config.column.jpg" />

#### Column

Configure a generic column.

```python
Column("Streamlit Widgets", width="medium", help="Streamlit **widget** commands 🎈")
```

</RefCard>
<RefCard href="/library/api-reference/data/st.column_config/st.column_config.textcolumn">
<Image pure alt="screenshot" src="/images/api/column_config.textcolumn.jpg" />

#### Text column

Configure a text column.

```python
TextColumn("Widgets", max_chars=50, validate="^st\.[a-z_]+$")
```

</RefCard>

<RefCard href="/library/api-reference/data/st.column_config/st.column_config.numbercolumn">
<Image pure alt="screenshot" src="/images/api/column_config.numbercolumn.jpg" />

#### Number column

Configure a number column.

```python
NumberColumn("Price (in USD)", min_value=0, format="$%d")
```

</RefCard>

<RefCard href="/library/api-reference/data/st.column_config/st.column_config.checkboxcolumn">
<Image pure alt="screenshot" src="/images/api/column_config.checkboxcolumn.jpg" />

#### Checkbox column

Configure a checkbox column.

```python
CheckboxColumn("Your favorite?", help="Select your **favorite** widgets")
```

</RefCard>

<RefCard href="/library/api-reference/data/st.column_config/st.column_config.selectboxcolumn">
<Image pure alt="screenshot" src="/images/api/column_config.selectboxcolumn.jpg" />

#### Selectbox column

Configure a selectbox column.

```python
SelectboxColumn("App Category", options=["🤖 LLM", "📈 Data Viz"])
```

</RefCard>

<RefCard href="/library/api-reference/data/st.column_config/st.column_config.datetimecolumn">
<Image pure alt="screenshot" src="/images/api/column_config.datetimecolumn.jpg" />

#### Datetime column

Configure a datetime column.

```python
DatetimeColumn("Appointment", min_value=datetime(2023, 6, 1), format="D MMM YYYY, h:mm a")
```

</RefCard>

<RefCard href="/library/api-reference/data/st.column_config/st.column_config.datecolumn">
<Image pure alt="screenshot" src="/images/api/column_config.datecolumn.jpg" />

#### Date column

Configure a date column.

```python
DateColumn("Birthday", max_value=date(2005, 1, 1), format="DD.MM.YYYY")
```

</RefCard>

<RefCard href="/library/api-reference/data/st.column_config/st.column_config.timecolumn">
<Image pure alt="screenshot" src="/images/api/column_config.timecolumn.jpg" />

#### Time column

Configure a time column.

```python
TimeColumn("Appointment", min_value=time(8, 0, 0), format="hh:mm a")
```

</RefCard>
<RefCard href="/library/api-reference/data/st.column_config/st.column_config.listcolumn">
<Image pure alt="screenshot" src="/images/api/column_config.listcolumn.jpg" />

#### List column

Configure a list column.

```python
ListColumn("Sales (last 6 months)", width="medium")
```

</RefCard>

<RefCard href="/library/api-reference/data/st.column_config/st.column_config.linkcolumn">
<Image pure alt="screenshot" src="/images/api/column_config.linkcolumn.jpg" />

#### Link column

Configure a link column.

```python
LinkColumn("Trending apps", max_chars=100, validate="^https://.*$")
```

</RefCard>

<RefCard href="/library/api-reference/data/st.column_config/st.column_config.imagecolumn">
<Image pure alt="screenshot" src="/images/api/column_config.imagecolumn.jpg" />

#### Image column

Configure an image column.

```python
ImageColumn("Preview Image", help="The preview screenshots")
```

</RefCard>

<RefCard href="/library/api-reference/data/st.column_config/st.column_config.linechcolumn">
<Image pure alt="screenshot" src="/images/api/column_config.linechartcolumn.jpg" />

#### Line chart column

Configure a line chart column.

```python
LineChartColumn("Sales (last 6 months)" y_min=0, y_max=100)
```

</RefCard>

<RefCard href="/library/api-reference/data/st.column_config/st.column_config.barchartcolumn">
<Image pure alt="screenshot" src="/images/api/column_config.barchartcolumn.jpg" />

#### Bar chart column

Configure a bar chart column.

```python
BarChartColumn("Marketing spend" y_min=0, y_max=100)
```

</RefCard>

<RefCard href="/library/api-reference/data/st.column_config/st.column_config.progresscolumn">
<Image pure alt="screenshot" src="/images/api/column_config.progresscolumn.jpg" />

#### Progress column

Configure a progress column.

```python
ProgressColumn("Sales volume", min_value=0, max_value=1000, format="$%f")
```

</RefCard>

</TileContainer>

### Interactivity

Dataframes displayed as interactive tables with `st.dataframe` have the following interactive features:

- **Column sorting**: sort columns by clicking on their headers.
- **Column resizing**: resize columns by dragging and dropping column header borders.
- **Table (height, width) resizing**: resize tables by dragging and dropping the bottom right corner of tables.
- **Search**: search through data by clicking a table, using hotkeys (`⌘ Cmd + F` or `Ctrl + F`) to bring up the search bar, and using the search bar to filter data.
- **Copy to clipboard**: select one or multiple cells, copy them to clipboard, and paste them into your favorite spreadsheet software.

<Image src="/images/dataframe-ui.gif" />
