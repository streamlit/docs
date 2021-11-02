---
title: How to download a Pandas DataFrame as a CSV?
slug: /knowledge-base/using-streamlit/how-download-pandas-dataframe-csv
---

# How to download a Pandas DataFrame as a CSV?

Starting with v0.88, [`st.download_button`](/library/api-reference/widgets/st.download_button) is natively built into Streamlit. Check out the [release notes](https://blog.streamlit.io/0-88-0-release-notes/), [API](/library/api-reference/widgets/st.download_button), and a [sample app](https://share.streamlit.io/streamlit/release-demos/0.88/0.88/streamlit_app.py).

## Example usage

```python
import streamlit as st
import pandas as pd

df = pd.read_csv("dir/file.csv")

@st.cache
def convert_df(df):
   return df.to_csv().encode('utf-8')


csv = convert_df(df)

st.download_button(
   "Press to Download",
   csv,
   "file.csv",
   "text/csv",
   key='download-csv'
)
```

Additional resources:

- https://blog.streamlit.io/0-88-0-release-notes/
- https://share.streamlit.io/streamlit/release-demos/0.88/0.88/streamlit_app.py
- https://docs.streamlit.io/library/api-reference/widgets/st.download_button
