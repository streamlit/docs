---
title: Data display elements
slug: /library/api-reference/data
---

# Data display elements

When you're working with data, it is extremely valuable to visualize that
data quickly, interactively, and from multiple different angles. That's what
Streamlit is actually built and optimized for.

You can display data via [charts](#display-charts), and you can display it in
raw form. These are the Streamlit commands you can use to display raw data.

<TileContainer>
<RefCard href="/library/api-reference/data/st.dataframe">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Dataframes

Display a dataframe as an interactive table.

```python
st.dataframe(my_data_frame)
```

</RefCard>
<RefCard href="/library/api-reference/data/st.table">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Static tables

Display a static table.

```python
st.table(my_data_frame)
```

</RefCard>
<RefCard href="/library/api-reference/data/st.metric">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Metrics

Display a metric in big bold font, with an optional indicator of how the metric changed.

```python
st.metric("My metric", 42, 2)
```

</RefCard>
<RefCard href="/library/api-reference/data/st.json">
<Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />

#### Dicts and JSON

Display object or string as a pretty-printed JSON string.

```python
st.json(my_data_frame)
```

</RefCard>
</TileContainer>