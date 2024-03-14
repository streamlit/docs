---
title: Mutate charts
slug: /develop/api-reference/mutate
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

<Autofunction function="DeltaGenerator.add_rows" />
