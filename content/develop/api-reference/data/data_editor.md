---
title: st.data_editor
slug: /develop/api-reference/data/st.data_editor
description: st.data_editor display a data editor widget that allows you to edit dataframes and many other data structures in a table-like UI.
keywords: st.data_editor, data editor, edit dataframes, editable table, data structures, table ui, interactive data editing, streamlit data editor
---

<Tip>

This page only contains information on the `st.data_editor` API. For an overview of working with dataframes and to learn more about the data editor's capabilities and limitations, read [Dataframes](/develop/concepts/design/dataframes).

</Tip>

<Autofunction function="streamlit.data_editor" oldName="streamlit.experimental_data_editor" />

### Configuring columns

You can configure the display and editing behavior of columns in `st.dataframe` and `st.data_editor` via the [Column configuration API](/develop/api-reference/data/st.column_config). We have developed the API to let you add images, charts, and clickable URLs in dataframe and data editor columns. Additionally, you can make individual columns editable, set columns as categorical and specify which options they can take, hide the index of the dataframe, and much more.

<Cloud name="doc-column-config-overview" query="embed_options=disable_scrolling" height="480px" />
