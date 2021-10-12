---
title: Mutate charts
slug: /library/api-reference/mutate
---

# Mutate charts

Sometimes you display a chart or dataframe and want to modify live as the app
runs (for example, in a loop). Depending on what you're looking for, there are 3 different ways to
do this:

1. Using [`st.empty`](/library/api-reference/layout/st.empty) to replace a single element.
2. Using [`st.container`](/library/api-reference/layout/st.container) or
   [`st.columns`](/library/api-reference/layout/st.columns) to replace multiple elements.
3. Using `add_rows` to append data to specific types of elements.

Here we discuss that last case.

<Autofunction function="DeltaGenerator.add_rows" />
