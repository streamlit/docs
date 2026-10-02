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

## **Version 1.65.0 (latest)**

_Release date: October 2, 2026_

**Highlights**

- 🍿 Announcing side drawers for [`st.dialog`](/develop/api-reference/execution-flow/st.dialog): set `position="left"` or `position="right"` to open a dialog as a full-height drawer ([#16863](https://github.com/streamlit/streamlit/pull/16863), [#8186](https://github.com/streamlit/streamlit/issues/8186)).
- 🖼 Introducing the `alt` parameter, so you can give images, media, charts, maps, and data elements an accessible name for screen readers:
    - [`st.image`](/develop/api-reference/media/st.image) and [`st.pyplot`](/develop/api-reference/charts/st.pyplot) ([#17137](https://github.com/streamlit/streamlit/pull/17137)).
    - [`st.audio`](/develop/api-reference/media/st.audio), [`st.video`](/develop/api-reference/media/st.video), and [`st.pdf`](/develop/api-reference/media/st.pdf) ([#16568](https://github.com/streamlit/streamlit/pull/16568), [#17118](https://github.com/streamlit/streamlit/pull/17118)).
    - [`st.altair_chart`](/develop/api-reference/charts/st.altair_chart), [`st.vega_lite_chart`](/develop/api-reference/charts/st.vega_lite_chart), and the built-in `st.line_chart`, `st.bar_chart`, `st.area_chart`, and `st.scatter_chart` ([#17041](https://github.com/streamlit/streamlit/pull/17041), [#17069](https://github.com/streamlit/streamlit/pull/17069)).
    - [`st.echarts_chart`](/develop/api-reference/charts/st.echarts_chart), [`st.plotly_chart`](/develop/api-reference/charts/st.plotly_chart), [`st.graphviz_chart`](/develop/api-reference/charts/st.graphviz_chart), and [`st.mermaid_chart`](/develop/api-reference/charts/st.mermaid_chart) ([#17080](https://github.com/streamlit/streamlit/pull/17080), [#17081](https://github.com/streamlit/streamlit/pull/17081), [#17085](https://github.com/streamlit/streamlit/pull/17085), [#17096](https://github.com/streamlit/streamlit/pull/17096)).
    - [`st.map`](/develop/api-reference/charts/st.map) and [`st.pydeck_chart`](/develop/api-reference/charts/st.pydeck_chart) ([#17086](https://github.com/streamlit/streamlit/pull/17086)).
    - [`st.dataframe`](/develop/api-reference/data/st.dataframe), [`st.data_editor`](/develop/api-reference/data/st.data_editor), and [`st.table`](/develop/api-reference/data/st.table) ([#17125](https://github.com/streamlit/streamlit/pull/17125), [#17095](https://github.com/streamlit/streamlit/pull/17095)).
    - [`st.iframe`](/develop/api-reference/text/st.iframe) ([#17040](https://github.com/streamlit/streamlit/pull/17040), [#16607](https://github.com/streamlit/streamlit/issues/16607)).

**Notable Changes**

- 🎛 The `on_change="ignore"` mode reaches seven more widgets, so a new value updates the widget and any bound query parameter without a rerun:
    - [`st.checkbox`](/develop/api-reference/widgets/st.checkbox) and [`st.toggle`](/develop/api-reference/widgets/st.toggle) ([#16960](https://github.com/streamlit/streamlit/pull/16960)).
    - [`st.radio`](/develop/api-reference/widgets/st.radio) ([#16951](https://github.com/streamlit/streamlit/pull/16951)).
    - [`st.multiselect`](/develop/api-reference/widgets/st.multiselect) ([#16908](https://github.com/streamlit/streamlit/pull/16908)).
    - [`st.text_area`](/develop/api-reference/widgets/st.text_area) ([#17002](https://github.com/streamlit/streamlit/pull/17002)).
    - [`st.date_input`](/develop/api-reference/widgets/st.date_input) ([#17064](https://github.com/streamlit/streamlit/pull/17064)).
    - [`st.time_input`](/develop/api-reference/widgets/st.time_input) ([#17159](https://github.com/streamlit/streamlit/pull/17159)).
    - [`st.file_uploader`](/develop/api-reference/widgets/st.file_uploader) ([#17172](https://github.com/streamlit/streamlit/pull/17172)).
- 🛑 [`st.text_input`](/develop/api-reference/widgets/st.text_input) and [`st.number_input`](/develop/api-reference/widgets/st.number_input) have a new `required` parameter that blocks empty values from being committed or submitted in a form ([#16956](https://github.com/streamlit/streamlit/pull/16956), [#17023](https://github.com/streamlit/streamlit/pull/17023), [#13497](https://github.com/streamlit/streamlit/issues/13497)).
- 🔗 [`st.expander`](/develop/api-reference/layout/st.expander) and [`st.tabs`](/develop/api-reference/layout/st.tabs) support `bind="query-params"`, so you can share a URL that keeps an expander open or a tab selected ([#15462](https://github.com/streamlit/streamlit/pull/15462), [#16988](https://github.com/streamlit/streamlit/pull/16988)).
- 📋 You can paste a full date range into the start field of a range-mode `st.date_input` to set both dates at once ([#17004](https://github.com/streamlit/streamlit/pull/17004)).
- 🌈 The new `theme.dataframeHeaderTextColor` [config option](/develop/api-reference/configuration/config.toml#theme) sets the header text color for `st.dataframe` and `st.data_editor` ([#17181](https://github.com/streamlit/streamlit/pull/17181), [#16478](https://github.com/streamlit/streamlit/issues/16478)).
- 🧪 [`AppTest.query_params`](/develop/api-reference/app-testing/st.testing.v1.AppTest) returns single values as strings instead of one-item lists, so assertions like `at.query_params["x"] == ["1"]` need to become `== "1"` ([#17191](https://github.com/streamlit/streamlit/pull/17191)).

**Other Changes**

- 💡 Mistyped or removed `st.*` commands raise an `AttributeError` that suggests the correct name or replacement ([#16912](https://github.com/streamlit/streamlit/pull/16912)).
- 💬 Session State mutation errors show the exact `st.session_state[key]` expression and how to fix it ([#17016](https://github.com/streamlit/streamlit/pull/17016)).
- 📦 Streamlit can be installed alongside `websockets` 17.x ([#17113](https://github.com/streamlit/streamlit/pull/17113), [#17097](https://github.com/streamlit/streamlit/issues/17097)).
- 🐛 Bug fix: `st.query_params` follows the URL when browser back/forward changes only the query string on the same page ([#16989](https://github.com/streamlit/streamlit/pull/16989), [#13963](https://github.com/streamlit/streamlit/issues/13963)).
- 🦋 Bug fix: Widgets bound to query parameters restore their values from the URL on browser back/forward ([#16998](https://github.com/streamlit/streamlit/pull/16998), [#13853](https://github.com/streamlit/streamlit/issues/13853)).
- 🪲 Bug fix: Ctrl+C and SIGTERM stop the server even when an app script is stuck in a loop ([#17022](https://github.com/streamlit/streamlit/pull/17022), [#2975](https://github.com/streamlit/streamlit/issues/2975)).
- 🐜 Bug fix: Dialogs opened from a fragment stay responsive when that fragment reruns ([#17039](https://github.com/streamlit/streamlit/pull/17039), [#17011](https://github.com/streamlit/streamlit/issues/17011)).
- 🐝 Bug fix: Keyed widgets that first appear after a Session State write show the stored value instead of their default ([#17106](https://github.com/streamlit/streamlit/pull/17106), [#17093](https://github.com/streamlit/streamlit/issues/17093)).
- 🐞 Bug fix: `st.data_editor` keeps leading decimals, so typing `.07` commits `0.07` instead of `7` ([#16920](https://github.com/streamlit/streamlit/pull/16920), [#16909](https://github.com/streamlit/streamlit/issues/16909)).
- 🕷️ Bug fix: Clearing a dataframe selection through Session State a second time also unchecks the rows in the grid ([#17224](https://github.com/streamlit/streamlit/pull/17224), [#17195](https://github.com/streamlit/streamlit/issues/17195)).
- 🪳 Bug fix: `LinkColumn` shows the `:material/open_in_new:` icon in narrow columns instead of truncated text ([#17090](https://github.com/streamlit/streamlit/pull/17090), [#14782](https://github.com/streamlit/streamlit/issues/14782)).
- 🪰 Bug fix: `st.chat_input` placed in `st.bottom` no longer triggers scroll-to-bottom for the app ([#16980](https://github.com/streamlit/streamlit/pull/16980), [#16977](https://github.com/streamlit/streamlit/issues/16977)).
- 🦠 Bug fix: Pressing Enter in a form submits with the correct button when the first submit button is disabled ([#17171](https://github.com/streamlit/streamlit/pull/17171)).
- 🦟 Bug fix: Synchronous `st.cache_data` and `st.cache_resource` functions that return an awaitable raise a clear error instead of a confusing serialization failure ([#16921](https://github.com/streamlit/streamlit/pull/16921)).
- 🦂 Bug fix: `st.image` accepts the removed `use_column_width` parameter with a warning instead of raising a `TypeError` ([#16999](https://github.com/streamlit/streamlit/pull/16999)).
- 🦗 Bug fix: `st.image` and `st.pyplot` no longer use list indexes as alt text, and `st.image` links with unsafe URL schemes render as plain images ([#17136](https://github.com/streamlit/streamlit/pull/17136)).
- 🕸️ Bug fix: Element toolbar buttons include the element's `alt` text in their accessible names and have a 24px minimum target size ([#17211](https://github.com/streamlit/streamlit/pull/17211), [#17225](https://github.com/streamlit/streamlit/pull/17225), [#16148](https://github.com/streamlit/streamlit/issues/16148), [#17127](https://github.com/streamlit/streamlit/issues/17127)).
- 🐌 Bug fix: Range-mode `st.date_input` validation errors say the date is outside the allowed range instead of naming the wrong field ([#16983](https://github.com/streamlit/streamlit/pull/16983)).
- 🦎 Bug fix: Range-mode `st.date_input` cancels a half-finished calendar selection when the app changes its value ([#16984](https://github.com/streamlit/streamlit/pull/16984)).
- 🦀 Bug fix: `st.date_input` clears partly typed dates when a `clear_on_submit` form resets ([#16985](https://github.com/streamlit/streamlit/pull/16985)).
- 👽 Bug fix: `st.date_input` and `st.datetime_input` keep their clear and error icons visible in narrow layouts ([#16986](https://github.com/streamlit/streamlit/pull/16986)).
- 👻 Bug fix: Unchecked `st.checkbox` and `st.radio` options show a hover state again, matching secondary buttons ([#17034](https://github.com/streamlit/streamlit/pull/17034), [#17035](https://github.com/streamlit/streamlit/pull/17035)).
- 🐛 Bug fix: A custom `theme.borderColor` no longer fills the off track of `st.toggle` or the main menu's auto-rerun toggle ([#17079](https://github.com/streamlit/streamlit/pull/17079), [#17083](https://github.com/streamlit/streamlit/pull/17083)).
- 🦋 Bug fix: The visible sidebar border gets stronger on hover when `theme.showSidebarBorder` is enabled ([#17071](https://github.com/streamlit/streamlit/pull/17071), [#12803](https://github.com/streamlit/streamlit/issues/12803)).
- 🪲 Bug fix: Keyboard events without a key no longer throw errors in global hotkeys or non-dismissible dialogs ([#17105](https://github.com/streamlit/streamlit/pull/17105), [#17111](https://github.com/streamlit/streamlit/pull/17111), [#17082](https://github.com/streamlit/streamlit/issues/17082), [#17107](https://github.com/streamlit/streamlit/issues/17107)).
- 🐜 Bug fix: `CacheReplayClosureError` names the layout block instead of showing a `$THING` placeholder ([#17065](https://github.com/streamlit/streamlit/pull/17065)).
- 🐝 Bug fix: `AppTest` form widgets commit their values only when the form is submitted, matching the browser ([#16972](https://github.com/streamlit/streamlit/pull/16972)).
- 🐞 Bug fix: `AppTest.get()` accepts the same element names as `AppTest` attributes, such as `datetime_input` and `pills` ([#17000](https://github.com/streamlit/streamlit/pull/17000)).
- 🕷️ Bug fix: `AppTest` lists `st.expander` elements with an icon under `at.expander` instead of `at.status` ([#17162](https://github.com/streamlit/streamlit/pull/17162)).
- 🪳 Bug fix: `AppTest` supports `st.space` through `at.space` ([#17208](https://github.com/streamlit/streamlit/pull/17208)).

## Older versions of Streamlit

- [2026 release notes](/develop/quick-reference/release-notes/2026)
- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
