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

## **Version 1.61.0 (latest)**

_Release date: August 4, 2026_

**Highlights**

- ⚡ Introducing lazy loading for [`st.dataframe`](/develop/api-reference/data/st.dataframe): large dataframes now load their rows on demand automatically, so the browser stays responsive. A new `lazy` parameter lets you turn this on or off explicitly, and Polars `LazyFrame` objects are supported natively ([#15756](https://github.com/streamlit/streamlit/pull/15756)).
- 🍿 [`st.cache_data`](/develop/api-reference/caching-and-state/st.cache_data) and [`st.cache_resource`](/develop/api-reference/caching-and-state/st.cache_resource) have a new `refresh_mode="background"` option that refreshes expired cache values in the background, so your app keeps serving the previous value without waiting ([#16057](https://github.com/streamlit/streamlit/pull/16057), [#5871](https://github.com/streamlit/streamlit/issues/5871)).

**Notable Changes**

- 🎯 [`st.metric`](/develop/api-reference/data/st.metric) has a new `icon` parameter to display an icon next to the metric label ([#15805](https://github.com/streamlit/streamlit/pull/15805), [#12298](https://github.com/streamlit/streamlit/issues/12298)).
- ⏱ [`st.time_input`](/develop/api-reference/widgets/st.time_input) received a major revamp with editable time segments, a new `format` parameter to control the hour cycle (12-hour, 24-hour, or localized), seconds granularity when `step` is under 60 seconds, paste support, and improved form behavior with Enter-to-submit ([#16126](https://github.com/streamlit/streamlit/pull/16126), [#16128](https://github.com/streamlit/streamlit/pull/16128), [#16096](https://github.com/streamlit/streamlit/pull/16096), [#15647](https://github.com/streamlit/streamlit/pull/15647), [#6423](https://github.com/streamlit/streamlit/issues/6423), [#8234](https://github.com/streamlit/streamlit/issues/8234)).
- 👥 [`st.multiselect`](/develop/api-reference/widgets/st.multiselect) has improved tag accessibility, including keyboard navigation between tags and WAI-ARIA-aligned dropdown focus ([#16200](https://github.com/streamlit/streamlit/pull/16200), [#16109](https://github.com/streamlit/streamlit/issues/16109)).
- 📥 [`st.download_button`](/develop/api-reference/widgets/st.download_button) now infers a missing `file_name` and `mime` from a file object's name when you pass data opened from disk ([#16061](https://github.com/streamlit/streamlit/pull/16061)). Thanks, [SoMika00](https://github.com/SoMika00)!
- 🚪 [`st.Page`](/develop/api-reference/navigation/st.page) is now a proper class, so `isinstance(page, st.Page)` behaves as expected (`StreamlitPage` remains a backward-compatible alias) ([#16268](https://github.com/streamlit/streamlit/pull/16268)).
- 🔒 New `server.allowedHosts` config option lets deployments with known hostnames restrict incoming WebSocket handshakes ([#16147](https://github.com/streamlit/streamlit/pull/16147)).
- 🛡 The `disabled` widget parameter is now enforced server-side, so a disabled widget never accepts a value from the browser ([#16209](https://github.com/streamlit/streamlit/pull/16209)).
- 👻 **Breaking change:** The deprecated `use_column_width` parameter has been removed from [`st.image`](/develop/api-reference/media/st.image). Use the `width` parameter instead ([#15786](https://github.com/streamlit/streamlit/pull/15786)).
- ☠️ **Breaking change:** Passing local file paths as strings to [`st.html`](/develop/api-reference/utilities/st.html) and [`st.iframe`](/develop/api-reference/utilities/st.iframe) is deprecated. Use a `pathlib.Path` object to load local files instead ([#16150](https://github.com/streamlit/streamlit/pull/16150)).

**Other Changes**

- 🐛 Bug fix: `AppTest` now converts a script file path to its parent directory before adding it to `sys.path` ([#15775](https://github.com/streamlit/streamlit/pull/15775)). Thanks, [ishaanlabs-gg](https://github.com/ishaanlabs-gg)!
- 🦋 Bug fix: An unclean WebSocket close now reconnects to the existing session, preserving widget values, `st.session_state`, and run count instead of restarting the app ([#15909](https://github.com/streamlit/streamlit/pull/15909), [#8901](https://github.com/streamlit/streamlit/issues/8901)).
- 🪲 Bug fix: The in-app "install skills" nudge is now suppressed when an install would only conflict, and reports why ([#15966](https://github.com/streamlit/streamlit/pull/15966)).
- 🐜 Bug fix: `st.selectbox` fuzzy search matches non-contiguous substrings again, fixing a regression since 1.59.0 ([#16009](https://github.com/streamlit/streamlit/pull/16009), [#16003](https://github.com/streamlit/streamlit/issues/16003)). Thanks, [LuC-9](https://github.com/LuC-9)!
- 🐝 Bug fix: `st.popover` placed inside `st.sidebar` no longer renders off-screen ([#16087](https://github.com/streamlit/streamlit/pull/16087), [#9387](https://github.com/streamlit/streamlit/issues/9387)).
- 🐞 Bug fix: Pressing Escape in `st.selectbox` now clears the typed search query and restores the committed label ([#16088](https://github.com/streamlit/streamlit/pull/16088), [#16004](https://github.com/streamlit/streamlit/issues/16004)).
- 🕷️ Bug fix: `st.bar_chart` and other built-in charts no longer fail on column names containing a `.` ([#16089](https://github.com/streamlit/streamlit/pull/16089), [#7714](https://github.com/streamlit/streamlit/issues/7714)).
- 🪳 Bug fix: `st.expander` no longer stays clipped after a rapid open/close interaction interrupts its animation ([#16090](https://github.com/streamlit/streamlit/pull/16090), [#16027](https://github.com/streamlit/streamlit/issues/16027)).
- 🪰 Bug fix: Right-side padding is preserved when a `st.code` block is scrolled horizontally to the end ([#16091](https://github.com/streamlit/streamlit/pull/16091), [#8206](https://github.com/streamlit/streamlit/issues/8206)).
- 🦠 Bug fix: `AppTest` multipage path handling is now deterministic and better documented ([#16122](https://github.com/streamlit/streamlit/pull/16122), [#8429](https://github.com/streamlit/streamlit/issues/8429), [#8154](https://github.com/streamlit/streamlit/issues/8154)).
- 🦟 Bug fix: `AppTest` now clears stale elements on each rerun, so its element tree no longer accumulates duplicate widgets from earlier runs ([#16123](https://github.com/streamlit/streamlit/pull/16123), [#9128](https://github.com/streamlit/streamlit/issues/9128), [#12566](https://github.com/streamlit/streamlit/issues/12566)).
- 🦂 Bug fix: An open `st.data_editor` cell edit is now committed when you click outside the grid ([#16132](https://github.com/streamlit/streamlit/pull/16132), [#7868](https://github.com/streamlit/streamlit/issues/7868)).
- 🦗 Bug fix: `@st.fragment(run_every=...)` no longer raises a `TypeError` when Sentry's threading integration is enabled ([#16140](https://github.com/streamlit/streamlit/pull/16140), [#16139](https://github.com/streamlit/streamlit/issues/16139)).
- 🕸️ Bug fix: `st.data_editor` row additions no longer silently overwrite existing rows for non-`RangeIndex` DataFrames ([#16144](https://github.com/streamlit/streamlit/pull/16144)).
- 🐌 Bug fix: `st.Page` now rejects network paths and null bytes before touching the filesystem ([#16146](https://github.com/streamlit/streamlit/pull/16146)).
- 🦎 Bug fix: Mermaid config keys hardened by Streamlit can no longer be overridden by inline `%%{init}%%` directives in diagram source ([#16151](https://github.com/streamlit/streamlit/pull/16151)).
- 🦀 Bug fix: The `st.multiselect` dropdown background now matches the sidebar theme ([#16163](https://github.com/streamlit/streamlit/pull/16163), [#11348](https://github.com/streamlit/streamlit/issues/11348)).
- 👽 Bug fix: Plotly Sankey charts now honor layout fonts set via `fig.update_layout(font=...)` ([#16164](https://github.com/streamlit/streamlit/pull/16164), [#11031](https://github.com/streamlit/streamlit/issues/11031)).
- 👻 Bug fix: `st.data_editor` `NumberColumn` now preserves IME composition, so CJK input is no longer cut off after the first composed digit ([#16165](https://github.com/streamlit/streamlit/pull/16165), [#16129](https://github.com/streamlit/streamlit/issues/16129)).
- 🐛 Bug fix: A dataframe header background configured with an alpha channel now renders stably instead of shifting color on hover ([#16166](https://github.com/streamlit/streamlit/pull/16166), [#11950](https://github.com/streamlit/streamlit/issues/11950)).
- 🦋 Bug fix: Downloading an Altair/Vega-Lite chart as PNG now respects display DPI for a higher-resolution export ([#16170](https://github.com/streamlit/streamlit/pull/16170), [#8177](https://github.com/streamlit/streamlit/issues/8177)).
- 🪲 Bug fix: Fragments nested inside a shared container no longer lose their children after the enclosing parent fragment reruns ([#16171](https://github.com/streamlit/streamlit/pull/16171), [#12514](https://github.com/streamlit/streamlit/issues/12514)).
- 🐜 Bug fix: An `st.selectbox` near the bottom of the sidebar now flips its dropdown up instead of clipping past the viewport ([#16199](https://github.com/streamlit/streamlit/pull/16199), [#16181](https://github.com/streamlit/streamlit/issues/16181)).
- 🐝 Bug fix: `st.help` no longer shows "page.run()" as the header in multipage apps ([#16244](https://github.com/streamlit/streamlit/pull/16244), [#11430](https://github.com/streamlit/streamlit/issues/11430)).
- 🐞 Bug fix: `st.pills` and `st.segmented_control` keep the current selection highlighted when a `format_func` changes an option's label between reruns ([#16271](https://github.com/streamlit/streamlit/pull/16271), [#16269](https://github.com/streamlit/streamlit/issues/16269)).
- 🕷️ Bug fix: `st.download_button` now accepts `io.StringIO` data as documented ([#16272](https://github.com/streamlit/streamlit/pull/16272), [#16270](https://github.com/streamlit/streamlit/issues/16270)).
- 🪳 Bug fix: Port auto-increment is restored on Windows, so a second `streamlit run` no longer binds an in-use port ([#16315](https://github.com/streamlit/streamlit/pull/16315), [#16296](https://github.com/streamlit/streamlit/issues/16296)).
- 🪰 Bug fix: An `st.status` opened on a container declared outside a fragment no longer blanks the app ([#16316](https://github.com/streamlit/streamlit/pull/16316), [#16281](https://github.com/streamlit/streamlit/issues/16281)).
- 🦠 Bug fix: The host message guard again accepts same-window self-posts, restoring embedded Streamlit-in-Snowflake auth delivery ([#16327](https://github.com/streamlit/streamlit/pull/16327)).
- 📦 Streamlit no longer depends on GitPython and inspects local repositories via the `git` CLI instead ([#16241](https://github.com/streamlit/streamlit/pull/16241)).

## Older versions of Streamlit

- [2026 release notes](/develop/quick-reference/release-notes/2026)
- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
