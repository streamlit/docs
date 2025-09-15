---
title: st.dataframe
slug: /develop/api-reference/data/st.dataframe
description: st.dataframe displays a dataframe as an interactive table.
keywords: dataframe, table, data, pandas, interactive, display, sort, search
---

<Tip>

Learn more in our [Dataframes](/develop/concepts/design/dataframes) guide and check out our tutorial, [Get dataframe row-selections from users](/develop/tutorials/elements/dataframe-row-selections).

</Tip>

<Autofunction function="streamlit.dataframe" />

## Dataframe selections

<Autofunction function="DataframeState" />

<Autofunction function="DataframeSelectionState" />

<Autofunction function="DeltaGenerator.add_rows" />

## Interactivity

Dataframes displayed with `st.dataframe` are interactive. End users can sort, resize, search, and copy data to their clipboard. For on overview of features, read our [Dataframes](/develop/concepts/design/dataframes#additional-ui-features) guide.

## Configuring columns

You can configure the display and editing behavior of columns in `st.dataframe` and `st.data_editor` via the [Column configuration API](/develop/api-reference/data/st.column_config). We have developed the API to let you add images, charts, and clickable URLs in dataframe and data editor columns. Additionally, you can make individual columns editable, set columns as categorical and specify which options they can take, hide the index of the dataframe, and much more.

<Cloud name="doc-column-config-overview" query="embed_options=disable_scrolling" height="480px" />
