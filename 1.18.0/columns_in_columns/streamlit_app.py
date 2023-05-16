import numpy as np
import pandas as pd
import streamlit as st

st.write(
    f'<span style="font-size: 78px; line-height: 1">🪆</span>',
    unsafe_allow_html=True,
)

"""
# Columns inside columns

Streamlit 1.18 introduces support for nested `st.columns`! Just do:

```python
col1, col2 = st.columns()

# Now add subcolumns...
subcol1, subcol2 = col1.columns()
subcol1.write("Inside a nested column 🎈")
```

This is possible up to one level of nesting in the main area of the app but not in the 
sidebar ([read more](https://docs.streamlit.io/knowledge-base/using-streamlit/why-streamlit-restrict-nested-columns)). 
Below are some examples for the types of layouts you can create now!
"""

st.caption(
    "[Code for this demo](https://github.com/streamlit/release-demos/blob/master/1.18.0/columns_in_columns/streamlit_app.py)"
)

"---"

"## Example 1"

col1, col2 = st.columns(2, gap="medium")

right_side = col1.radio(
    "Show on right side 👉", ["Chart", "Image", "Map"], horizontal=True
)

subcol1, subcol2 = col1.columns(2)
subcol1.text_input("Text input 1")
subcol2.text_input("Text input 2")
col1.text_area("Text Area 1")

subcol1, subcol2, subcol3, subcol4 = col1.columns(4)
subcol1.checkbox("One")
subcol2.checkbox("Two")
subcol3.checkbox("Three")
subcol4.checkbox("Four")

if right_side == "Chart":
    col2.bar_chart(np.random.rand(100))
elif right_side == "Image":
    col2.image(
        "https://streamlit.io/images/brand/streamlit-logo-primary-colormark-darktext.png",
        use_column_width=True,
    )
elif right_side == "Map":
    points = [(55.22, 21.01), (52.52, 13.40)]
    df = pd.DataFrame(points, columns=["lat", "lon"])
    col2.map(df)
else:
    raise ValueError(f"Unexpected right_side: {right_side}")

"---"
"## Example 2"

col1, col2 = st.columns([2, 1], gap="medium")

subcol1, subcol2 = col1.columns([1, 2])
subcol1.metric("A metric", 123456, 123)
subcol2.line_chart(np.random.rand(10), height=200)

subcol1, subcol2 = col1.columns([1, 2])
subcol1.metric("A metric", 123456, 123)
subcol2.line_chart(np.random.rand(10), height=200)

subcol1, subcol2 = col1.columns([1, 2])
subcol1.metric("A metric", 123456, 123)
subcol2.line_chart(np.random.rand(10), height=200)

col2.write(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting."
)
col2.write(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting."
)

"---"
"## Example 3"
col1, col2 = st.columns([1, 2], gap="medium")
with col1:
    st.line_chart(np.random.rand(10), height=250)
    st.line_chart(np.random.rand(10), height=250)

with col2:
    with st.expander("Show charts", expanded=True):
        subcol1, subcol2 = st.columns(2)
        subcol1.line_chart(np.random.rand(10), height=250)
        subcol2.line_chart(np.random.rand(10), height=250)
    st.expander("Show dataframe").dataframe(
        np.random.rand(10, 10), use_container_width=True, height=250
    )

    with st.expander("Show charts"):
        subcol1, subcol2 = st.columns(2)
        subcol1.line_chart(np.random.rand(10), height=250)
        subcol2.line_chart(np.random.rand(10), height=250)
