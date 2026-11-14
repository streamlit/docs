---
title: st.dataframe
slug: /develop/api-reference/data/st.dataframe
description: st.dataframe displays a dataframe as an interactive table, with sorting, search, column statistics, row selections for cross-filtering, and lazy loading for large data.
keywords: dataframe, table, data, pandas, polars, interactive, display, sort, search, large data, lazy loading, selections, cross-filtering, dashboard
---

<Tip>

Learn more in our [Dataframes](/develop/concepts/design/dataframes) guide and check out our tutorial, [Get dataframe row-selections from users](/develop/tutorials/elements/dataframe-row-selections). For lazy loading, cross-filtering, and drill-down in dashboards, see [Build advanced dashboards](/develop/concepts/design/dashboards).

</Tip>

<Autofunction function="streamlit.dataframe" />

## Dataframe selections

<Autofunction function="DataframeState" />

<Autofunction function="DataframeSelectionState" />

## Interactivity

Dataframes displayed with `st.dataframe` are interactive. End users can sort, resize, search, and copy data to their clipboard. For on overview of features, read our [Dataframes](/develop/concepts/design/dataframes#additional-ui-features) guide.

## Configuring columns

You can configure the display and editing behavior of columns in `st.dataframe` and `st.data_editor` via the [Column configuration API](/develop/api-reference/data/st.column_config). We have developed the API to let you add images, charts, and clickable URLs in dataframe and data editor columns. Additionally, you can make individual columns editable, set columns as categorical and specify which options they can take, hide the index of the dataframe, and much more.

<Cloud name="doc-column-config-overview" query="embed_options=disable_scrolling" height="480px" />

<GitHubIssuesHint label="feature:st.dataframe" name="st.dataframe" />
