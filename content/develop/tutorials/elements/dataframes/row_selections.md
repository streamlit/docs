---
title: Get dataframe row-selections from users
slug: /develop/tutorials/elements/dataframe-row-selections
---

# Get dataframe row-selections from users

Streamlit offers two commands for rendering beautiful, interactive dataframes in your app. If you need users to edit data, add rows, or delete rows, use `st.data_editor`. If you don't want users to change the data in your dataframe, use `st.dataframe`. Users can sort and search through data rendered with `st.dataframe`. Additionally, you can activate selections to work with users' row and column selections.

This tutorial uses row selections which were introduced in Streamlit version 1.35.0. For an older workaround using `st.data_editor`, see [Get dataframe row-selections (`streamlit<1.35.0`)](/develop/tutorials/elements/dataframe-row-selections-old).

## Applied concepts

- Use row selections to filter a dataframe.

## Prerequisites

- The following must be installed in your Python environment:

  ```text
  streamlit>=1.35.0
  ```

- You should have a clean working directory called `your-repository`.
- You should have a basic understanding of fragments and `st.dataframe`.
