---
title: Release notes
slug: /develop/quick-reference/release-notes
description: A changelog of highlights and fixes for each version of Streamlit.
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

## **Version 1.43.0 (latest)**

_Release date: March 4, 2025_

**Highlights**

- 📁 Announcing the option to accept files with [`st.chat_input`](/develop/api-reference/chat/st.chat_input)!
- 📒 Introducing a new column type for column configuration! Use [`JsonColumn`](/develop/api-reference/data/st.column_config/st.column_config.jsoncolumn) to show JSON-compatible objects.

**Notable Changes**

- 🏃 You can prevent [`st.download_button`](/develop/api-reference/widgets/st.download_button) from triggering a rerun by setting `on_click="ignore"` ([#10296](https://github.com/streamlit/streamlit/pull/10296), [#4382](https://github.com/streamlit/streamlit/issues/4382)).
- 🕑 You can access a user's timezone and timezone offset through [`st.context`](/develop/api-reference/caching-and-state/st.context) ([#10336](https://github.com/streamlit/streamlit/pull/10336)).
- ↕️ You can configure the row height in [`st.dataframe`](/develop/api-reference/data/st.dataframe) and [`st.data_editor`](/develop/api-reference/data/st.data_editor) with a new parameter ([#9549](https://github.com/streamlit/streamlit/pull/9549), [#7266](https://github.com/streamlit/streamlit/issues/7266), [#8632](https://github.com/streamlit/streamlit/issues/8632), [#5386](https://github.com/streamlit/streamlit/issues/5386)).
- 💅 `st.dataframe` and `st.data_editor` use `use_container_width=True` by default ([#10434](https://github.com/streamlit/streamlit/pull/10434)).
- 🤏 [Markdown](/develop/api-reference/text/st.markdown) has a small text directive ([#10487](https://github.com/streamlit/streamlit/pull/10487), [#10486](https://github.com/streamlit/streamlit/issues/10486)).
- 🧵 You can pass strings, paths, and callables to [`st.navigation`](/develop/api-reference/navigation/st.navigation) in place of `StreamlitPage` objects for convenience ([#10358](https://github.com/streamlit/streamlit/pull/10358), [#10069](https://github.com/streamlit/streamlit/issues/10069)). Thanks, [ashm-dev](https://github.com/ashm-dev)!
- 📈 Streamlit has a new custom component, [`streamlit-bokeh`](https://github.com/streamlit/streamlit-bokeh), to support the latest version of Bokeh ([#10374](https://github.com/streamlit/streamlit/pull/10374), [#5858](https://github.com/streamlit/streamlit/issues/5858)).
- 🔣 [`NumberColumn`](/develop/api-reference/data/st.column_config/st.column_config.numbercolumn), [`ProgressColumn`](/develop/api-reference/data/st.column_config/st.column_config.progresscolumn), [`DatetimeColumn`](/develop/api-reference/data/st.column_config/st.column_config.datetimecolumn), [`DateColumn`](/develop/api-reference/data/st.column_config/st.column_config.datecolumn), and [`TimeColumn`](/develop/api-reference/data/st.column_config/st.column_config.timecolumn) have preconfigured format options for ease of use ([#10179](https://github.com/streamlit/streamlit/pull/10179), [#8788](https://github.com/streamlit/streamlit/issues/8788), [#7702](https://github.com/streamlit/streamlit/issues/7702)).
- 🛎️ [Static file serving](/develop/concepts/configuration/serving-static-files) supports files with JSON, XML, and common font file extensions. ([#10417](https://github.com/streamlit/streamlit/pull/10417), [#10335](https://github.com/streamlit/streamlit/pull/10335), [#10337](https://github.com/streamlit/streamlit/pull/10337), [#10302](https://github.com/streamlit/streamlit/issues/10302)).

**Other Changes**

- 🥷 Users can hide dataframe columns ([#10264](https://github.com/streamlit/streamlit/pull/10264), [#6870](https://github.com/streamlit/streamlit/issues/6870)).
- 📅 Users can change the format of numbers, dates, and times in dataframes ([#10420](https://github.com/streamlit/streamlit/pull/10420)).
- ↔️ Users can auto-size column widths ([#10476](https://github.com/streamlit/streamlit/pull/10476)).
- 🐻‍❄️ Streamlit supports Polars dataframe and series hashing ([#10408](https://github.com/streamlit/streamlit/pull/10408), [#10347](https://github.com/streamlit/streamlit/issues/10347)).
- ☠️ `rich` is no longer a required dependency for Streamlit ([#10320](https://github.com/streamlit/streamlit/pull/10320)).
- 🦋 `st.file_uploader` has a better display format in narrow containers ([#10272](https://github.com/streamlit/streamlit/pull/10272)).
- 🦎 Bug fix: Tabs are prevented from having a width of zero to prevent flickering ([#10533](https://github.com/streamlit/streamlit/pull/10533)).
- 🐌 Bug fix: Column order is correctly displayed when set in column configuration ([#10445](https://github.com/streamlit/streamlit/pull/10445), [#10442](https://github.com/streamlit/streamlit/issues/10442)).
- 🕸️ Bug fix: We updated dataframe null handling to prevent deprecation warnings ([#10484](https://github.com/streamlit/streamlit/pull/10484)).
- 🦗 Bug fix: Elapsed time doesn't overflow for `st.audio_input` ([#10410](https://github.com/streamlit/streamlit/pull/10410), [#10373](https://github.com/streamlit/streamlit/issues/10373)). Thanks, [ashm-dev](https://github.com/ashm-dev)!
- 🦂 Bug fix: `st.altair_chart` does not show an incorrect "true" tooltip when the user makes a selection ([#10456](https://github.com/streamlit/streamlit/pull/10456), [#10448](https://github.com/streamlit/streamlit/issues/10448)).
- 🦟 Bug fix: Streamlit does not raise a RuntimeError when an `asyncio` event loop is not already running ([#10455](https://github.com/streamlit/streamlit/pull/10455), [#10452](https://github.com/streamlit/streamlit/issues/10452)).
- 🦠 Bug fix: The key for an internal MIME type is set correctly to avoid a browser warning ([#10404](https://github.com/streamlit/streamlit/pull/10404)).
- 🪰 Bug fix: `st.data_editor` automatically scrolls to the bottom when a user adds a row ([#10405](https://github.com/streamlit/streamlit/pull/10405), [#10351](https://github.com/streamlit/streamlit/issues/10351)).
- 🪳 Bug fix: Tooltips are suppressed on user-added rows in `st.data_editor` to prevent erroneous warnings ([#10398](https://github.com/streamlit/streamlit/pull/10398)).
- 🕷️ Bug fix: `st.logo` displays consistently when used with fragments and dialogs ([#10377](https://github.com/streamlit/streamlit/pull/10377), [#10350](https://github.com/streamlit/streamlit/issues/10350), [#10382](https://github.com/streamlit/streamlit/issues/10382)).
- 🐞 Bug fix: `st.graphviz_chart` has rounded corners for consistent style ([#10224](https://github.com/streamlit/streamlit/pull/10224)).
- 🐝 Bug fix: Streamlit raises a clear exception when an underscore is used in `provider` for `st.login` ([#10360](https://github.com/streamlit/streamlit/pull/10360), [#10356](https://github.com/streamlit/streamlit/issues/10356)).
- 🐜 Bug fix: The dataframe column menu displays correctly inside dialogs ([#10359](https://github.com/streamlit/streamlit/pull/10359), [#10357](https://github.com/streamlit/streamlit/issues/10357)).
- 🪲 Bug fix: Exception handling was adjusted for improved compatibility with Cython ([#10354](https://github.com/streamlit/streamlit/pull/10354), [#10353](https://github.com/streamlit/streamlit/issues/10353)). Thanks, [tutu-sol](https://github.com/tutu-sol)!
- 🐛 Bug fix: `st.pills` and `st.segmented_control` have consistent font sizes across browsers ([#10349](https://github.com/streamlit/streamlit/pull/10349)).

## Older versions of Streamlit

- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
