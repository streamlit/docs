---
title: Mutate charts
slug: /develop/concepts/elements-and-ui/mutate
description: st.add_rows appends a dataframe to the bottom of the current one in certain elements, for optimized data updates.
---

# Mutate charts

Sometimes you display a chart or dataframe and want to modify live as the app
runs (for example, in a loop). Depending on what you're looking for, there are 3 different ways to
do this:

1. Using [`st.empty`](/develop/api-reference/layout/st.empty) to replace a single element.
2. Using [`st.container`](/develop/api-reference/layout/st.container) or
   [`st.columns`](/develop/api-reference/layout/st.columns) to replace multiple elements.
3. Using `add_rows` to append data to specific types of elements.

Here we discuss that last case.

## The `.add_rows()` method

`st.dataframe`, `st.table`, and all chart functions can be mutated using the `.add_rows()` method to their output. In the following example, we use `my_data_element = st.line_chart(df)`. You can try the example with `st.table`, `st.dataframe`, and most of the other simple charts by just swapping out `st.line_chart`. Note that `st.dataframe` only shows the first ten rows by default and enables scrolling for additional rows. This means adding rows is not as visually apparent as it is with `st.table` or the chart elements.

```python
import streamlit as st
import pandas as pd
import numpy as np
import time

df = pd.DataFrame(np.random.randn(15, 3), columns=(["A", "B", "C"]))
my_data_element = st.line_chart(df)

for tick in range(10):
    time.sleep(.5)
    add_df = pd.DataFrame(np.random.randn(1, 3), columns=(["A", "B", "C"]))
    my_data_element.add_rows(add_df)

st.button("Regenerate")
```
