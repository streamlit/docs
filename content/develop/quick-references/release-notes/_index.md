---
title: Release notes
slug: /develop/quick-reference/release-notes
description: A changelog of highlights and fixes for the latest version of Streamlit.
keywords: changelog, release notes, version history
---

# Release notes

This page lists highlights, bug fixes, and known issues for the latest release of Streamlit. If you're looking for information about nightly releases or experimental features, see [Pre-release features](/develop/quick-reference/prerelease).

## Upgrade Streamlit

<Tip>

To upgrade to the latest version of Streamlit, run:

```bash
pip install --upgrade streamlit
```

</Tip>

## **Version 1.54.0 (latest)**

_Release date: February 4, 2026_

**Notable Changes**

- 🎨 The `color` parameter of [`st.area_chart`](/develop/api-reference/charts/st.area_chart), [`st.bar_chart`](/develop/api-reference/charts/st.bar_chart), [`st.line_chart`](/develop/api-reference/charts/st.line_chart), and [`st.scatter_chart`](/develop/api-reference/charts/st.scatter_chart) support the basic color palette which can be configured with theming ([#13739](https://github.com/streamlit/streamlit/pull/13739), [#12694](https://github.com/streamlit/streamlit/issues/12694)).
- ☯️ You can use the new [`theme.chartDivergingColors`](/develop/api-reference/configuration/config.toml#theme) to set default diverging colors for Plotly, Altair, and Vega-Lite charts.
- 🔗 You can configure the display of error help links with a new configuration option, [`client.showErrorLinks`](/develop/api-reference/configuration/config.toml#client) ([#13472](https://github.com/streamlit/streamlit/pull/13472), [#11238](https://github.com/streamlit/streamlit/issues/11238)). Thanks, [karubian](https://github.com/karubian)!
- 😃 [`st.logo`](/develop/api-reference/media/st.logo) supports Material icons and emojis ([#13416](https://github.com/streamlit/streamlit/pull/13416)). Thanks, [rahuld109](https://github.com/rahuld109)!
- 🥷 To prevent widgets from resetting when you change a parameter, widgets are transitioning to an identity based only on their keys (if provided). The following widgets use only their key for their identity:
  - `st.dataframe` (with selections)
  - `st.area_chart`
  - `st.bar_chart`
  - `st.line_chart`
  - `st.scatter_chart`
  - `st.altair_chart`
  - `st.vegalite_chart`
  - `st.pydeck_chart`
  - `st.date_input`
  - `st.datetime_input`
  - `st.radio`
  - `st.select_slider`
- 👆 [`ListColumn`](/develop/api-reference/data/st.column_config/st.column_config.listcolumn) and [`MultiselectColumn`](/develop/api-reference/data/st.column_config/st.column_config.multiselectcolumn) let users select the text of their pills for copying ([#13663](https://github.com/streamlit/streamlit/pull/13663)).
- 👻 `st.experimental_get_query_params` and `st.experimental_set_query_params` have been removed. Use [`st.query_params`](/develop/api-reference/caching-and-state/st.query_params) instead.
- ☠️ `st.experimental_user` has been removed. Use [`st.user`](/develop/api-reference/user/st.user) instead.

**Other Changes**

- 👽 The warning about the proposed removal of `.add_rows()` shows in the browser. Please leave feedback ([#13063](https://github.com/streamlit/streamlit/issues/13063)).
- 🦎 When a `.streamlit/config.toml` file is created after a Streamlit app is running, the file watcher will recognize it without restarting the Streamlit server ([#13625](https://github.com/streamlit/streamlit/pull/13625), [#11296](https://github.com/streamlit/streamlit/issues/11296)).
- 🔐 Bug fix: Path security validation improves protection against Server-Side Request Forgery (SSRF) and path traversal vulnerabilities ([#13733](https://github.com/streamlit/streamlit/pull/13733)).
- 🕸️ Bug fix: Wildcard URLs display as `localhost` in the browser URL and console output ([#13720](https://github.com/streamlit/streamlit/pull/13720), [#13712](https://github.com/streamlit/streamlit/issues/13712)).
- 🦗 Bug fix: Modals and drop-down menus don't collapse the sidebar ([#13653](https://github.com/streamlit/streamlit/pull/13653)).
- 🦂 Bug fix: `st.bar_chart` doesn't raise a `KeyError` when sorting melted data ([#13695](https://github.com/streamlit/streamlit/pull/13695)).
- 🦟 Bug fix: `st.multiselect` and `st.selectbox` don't clear state when a custom class object is selected ([#13648](https://github.com/streamlit/streamlit/pull/13648), [#13646](https://github.com/streamlit/streamlit/issues/13646)).
- 🦠 Bug fix: Transient nodes used for spinners will correctly anchor themselves in the Streamlit DOM to avoid an empty delta path ([#13674](https://github.com/streamlit/streamlit/pull/13674)).
- 🪰 Bug fix: Snowflake connections will re-initialize if closed ([#13665](https://github.com/streamlit/streamlit/pull/13665)).
- 🪳 Bug fix: Nested containers under a spinner don't raise a `Bad delta path index` error ([#13659](https://github.com/streamlit/streamlit/pull/13659), [#13658](https://github.com/streamlit/streamlit/issues/13658)).
- 🕷️ Bug fix: `SnowflakeConnection.query()` correctly passes the `params` argument to caching ([#13652](https://github.com/streamlit/streamlit/pull/13652), [#13644](https://github.com/streamlit/streamlit/issues/13644)).
- 🐞 Bug fix: `client.toolbarMode="viewer"` correctly hides developer options from the settings menu ([#13623](https://github.com/streamlit/streamlit/pull/13623)).
- 🐝 Bug fix: When using the experimental Starlette configuration, Streamlit auth can log users out of your identity provider and surface user tokens, consistent with recent updates ([#13571](https://github.com/streamlit/streamlit/pull/13571)).
- 🐜 Bug fix: Streamlit will defensively not load packaged components with missing or invalid component names in their manifests ([#13612](https://github.com/streamlit/streamlit/pull/13612)).
- 🪲 Bug fix: The width of file chips in `st.chat_input` was increased to reduce filename truncation ([#13589](https://github.com/streamlit/streamlit/pull/13589)).
- 🐛 Bug fix: `st.bar_chart` doesn't raise an error about y-axis minimum and maximum when the bars have all the same value ([#13590](https://github.com/streamlit/streamlit/pull/13590), [#13584](https://github.com/streamlit/streamlit/issues/13584)).

## Older versions of Streamlit

- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
