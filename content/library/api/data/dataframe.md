---
title: st.dataframe
slug: /library/api-reference/data/st.dataframe
description: st.dataframe displays a dataframe as an interactive table.
---

<Autofunction function="streamlit.dataframe" />

### Interactivity

Dataframes displayed as interactive tables with `st.dataframe` have the following interactive features:

- **Column sorting**: sort columns by clicking on their headers.
- **Column resizing**: resize columns by dragging and dropping column header borders.
- **Table (height, width) resizing**: resize tables by dragging and dropping the bottom right corner of tables.
- **Search**: search through data by clicking a table, using hotkeys (`⌘ Cmd + F` or `Ctrl + F`) to bring up the search bar, and using the search bar to filter data.
- **Copy to clipboard**: select one or multiple cells, copy them to clipboard, and paste them into your favorite spreadsheet software.

<Image src="/images/dataframe-ui.gif" />

<Note>

Copy to clipboard does not currently work on Streamlit Cloud.

</Note>
