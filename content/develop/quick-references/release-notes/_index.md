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

## **Version 1.55.0 (latest)**

_Release date: March 3, 2026_

**Highlights**

- 🍿 Introducing dynamic containers: [`st.tabs`](/develop/api-reference/layout/st.tabs), [`st.popover`](/develop/api-reference/layout/st.popover), and [`st.expander`](/develop/api-reference/layout/st.expander) can rerun the app when they are opened or closed by setting the `on_change` parameter. If a key is also provided, you can programmatically open and close them, too.
- 🖇️ Announcing widget binding! Most non-trigger widgets have a `bind` parameter to simplify syncing widget state with query parameters.

**Notable Changes**

- 🔗 [`st.image`](/develop/api-reference/media/st.image) has a `link` parameter to make images clickable with HTTP/HTTPS URLs ([#14139](https://github.com/streamlit/streamlit/pull/14139), [#9836](https://github.com/streamlit/streamlit/issues/9836)).
- 🥷 [`st.Page`](/develop/api-reference/navigation/st.page) has a `visibility` parameter that lets you hide pages in the navigation menu while keeping them routable ([#13905](https://github.com/streamlit/streamlit/pull/13905), [#10738](https://github.com/streamlit/streamlit/issues/10738)).
- 🎨 [Markdown](/develop/api-reference/text/st.markdown) supports arbitrary CSS colors for text foreground and background ([#14041](https://github.com/streamlit/streamlit/pull/14041), [#7808](https://github.com/streamlit/streamlit/issues/7808)).
- 📐 [`st.metric`](/develop/api-reference/data/st.metric) has a `delta_description` parameter to display descriptive text next to delta values ([#13848](https://github.com/streamlit/streamlit/pull/13848), [#13690](https://github.com/streamlit/streamlit/issues/13690)).
- 📏 You can configure the font weight and size for [`st.metric`](/develop/api-reference/data/st.metric) with the new `metricValueFontWeight` and `metricValueFontSize` configuration options ([#13550](https://github.com/streamlit/streamlit/pull/13550), [#12300](https://github.com/streamlit/streamlit/issues/12300)). Thanks, [kagawa0710](https://github.com/kagawa0710)!
- 🏓 [`st.table`](/develop/api-reference/data/st.table) has `height` and `width` parameters ([#13850](https://github.com/streamlit/streamlit/pull/13850), [#10775](https://github.com/streamlit/streamlit/issues/10775), [#10820](https://github.com/streamlit/streamlit/issues/10820)).
- 📈 [`st.altair_chart`](/develop/api-reference/charts/st.altair_chart) and [`st.vega_lite_chart`](/develop/api-reference/charts/st.vega_lite_chart) support selections on multi-view charts ([#13591](https://github.com/streamlit/streamlit/pull/13591), [#8643](https://github.com/streamlit/streamlit/issues/8643)).
- 🔑 To prevent widgets from resetting when you change a parameter, widgets are transitioning to an identity based only on their keys (if provided). The following widgets use only their key for their identity:
  - [`st.pills`](/develop/api-reference/widgets/st.pills)
  - [`st.segmented_control`](/develop/api-reference/widgets/st.segmented_control)
- 📂 [`st.markdown`](/develop/api-reference/text/st.markdown) accepts `width="auto"` to adapt its default behavior depending on the flex layout of its container ([#13841](https://github.com/streamlit/streamlit/pull/13841)).
- 🌐 Added a new `client.allowedOrigins` config option to let you customize which origins can send cross-origin `postMessage` ([#13829](https://github.com/streamlit/streamlit/pull/13829), [#6389](https://github.com/streamlit/streamlit/issues/6389)).

**Other Changes**

- 🖋️ Page titles in `st.Page` and section labels in `st.navigation` support Markdown ([#14053](https://github.com/streamlit/streamlit/pull/14053), [#14010](https://github.com/streamlit/streamlit/pull/14010), [#11771](https://github.com/streamlit/streamlit/issues/11771)).
- 🧹 Common block elements in widget labels are auto-escaped for convenience ([#13887](https://github.com/streamlit/streamlit/pull/13887), [#7359](https://github.com/streamlit/streamlit/issues/7359)).
- 🏄‍♂️ `st.multiselect` lets users select all options or all currently filtered options with a single click ([#13795](https://github.com/streamlit/streamlit/pull/13795), [#4714](https://github.com/streamlit/streamlit/issues/4714)).
- 💅 Improved the design of `st.multiselect` and `st.selectbox` ([#13004](https://github.com/streamlit/streamlit/pull/13004)). Thanks, [rishi-kumar0612](https://github.com/rishi-kumar0612)!
- ‼️ All widget drop-downs were restyled for consistency ([#13796](https://github.com/streamlit/streamlit/pull/13796), [#13797](https://github.com/streamlit/streamlit/pull/13797), [#13798](https://github.com/streamlit/streamlit/pull/13798)).
- ↔️ For better accessibility, `st.tabs` displays navigation arrows when the tabs overflow their container horizontally ([#13987](https://github.com/streamlit/streamlit/pull/13987), [#5552](https://github.com/streamlit/streamlit/issues/5552)).
- 📝 The app menu was redesigned ([#14101](https://github.com/streamlit/streamlit/pull/14101)):
  - Improved accessibility ([#13878](https://github.com/streamlit/streamlit/pull/13878), [#14131](https://github.com/streamlit/streamlit/pull/14131)).
  - Added a copy button for the Streamlit version ([#13791](https://github.com/streamlit/streamlit/pull/13791)).
  - Removed the settings menu, surfacing the theme selector and rerun settings in the main menu ([#13937](https://github.com/streamlit/streamlit/pull/13937), [#13988](https://github.com/streamlit/streamlit/pull/13988), [#14048](https://github.com/streamlit/streamlit/pull/14048)).
- 🔍 Improved `streamlit config show` output to better distinguish theme value sources ([#13761](https://github.com/streamlit/streamlit/pull/13761)).
- ♥️ To improve behavior in hosted environments, the Streamlit server acknowledges client heartbeats ([#13810](https://github.com/streamlit/streamlit/pull/13810)).
- 🔣 Extended `sprintf` to support `,` as a thousands separator in `NumberColumn`, `ProgressColumn`, `st.number_input`, `st.slider`, and `st.metric` ([#13284](https://github.com/streamlit/streamlit/pull/13284), [#1301](https://github.com/streamlit/streamlit/issues/1301)).
- ⬆️ Added support for cachetools 7.x ([#13839](https://github.com/streamlit/streamlit/pull/13839), [#13801](https://github.com/streamlit/streamlit/issues/13801)).
- ☠️ Added a deprecation notice to `SnowparkConnection` for better visibility ([#14125](https://github.com/streamlit/streamlit/pull/14125)).
- 🦀 Bug fix: `st.spinner` avoids a race condition when used right before a cache miss ([#13849](https://github.com/streamlit/streamlit/pull/13849), [#13634](https://github.com/streamlit/streamlit/issues/13634)).
- 🦎 Bug fix: `st.date_input` values are normalized in Session State to prevent a type error ([#14123](https://github.com/streamlit/streamlit/pull/14123), [#14109](https://github.com/streamlit/streamlit/issues/14109)).
- 🐌 Bug fix: `st.metric` with sparklines display correctly in horizontal flex containers ([#14110](https://github.com/streamlit/streamlit/pull/14110), [#13785](https://github.com/streamlit/streamlit/issues/13785)).
- 🕸️ Bug fix: `SQLConnection.query()` caches results at the instance level instead of the class level ([#14094](https://github.com/streamlit/streamlit/pull/14094), [#14077](https://github.com/streamlit/streamlit/issues/14077)).
- 🦗 Bug fix: `st.segmented_control` has consistent border styling on hover ([#14067](https://github.com/streamlit/streamlit/pull/14067), [#12802](https://github.com/streamlit/streamlit/issues/12802)).
- 🦂 Bug fix: `st.date_input` and `st.datetime_input` remove validation marks when they are cleared ([#14066](https://github.com/streamlit/streamlit/pull/14066), [#14052](https://github.com/streamlit/streamlit/issues/14052)).
- 🦟 Bug fix: Fixed a rendering regression for `vconcat` charts in Altair with faceted children ([#14065](https://github.com/streamlit/streamlit/pull/14065), [#14050](https://github.com/streamlit/streamlit/issues/14050)).
- 🦠 Bug fix: `st.Page` raised an exception if it's passed a URL path of only slashes ([#14005](https://github.com/streamlit/streamlit/pull/14005), [#13952](https://github.com/streamlit/streamlit/issues/13952)). Thanks, [nileshhadalgi016](https://github.com/nileshhadalgi016)!
- 🪰 Bug fix: The code block copy button was moved into a toolbar to prevent text overlap ([#14024](https://github.com/streamlit/streamlit/pull/14024), [#12958](https://github.com/streamlit/streamlit/issues/12958)).
- 🪳 Bug fix: `st.tabs` retain their state when rendered after a transitional element like `st.spinner` ([#14023](https://github.com/streamlit/streamlit/pull/14023), [#14018](https://github.com/streamlit/streamlit/issues/14018)).
- 🕷️ Bug fix: Treemap and sunburst Plotly charts support selections ([#13935](https://github.com/streamlit/streamlit/pull/13935), [#9001](https://github.com/streamlit/streamlit/issues/9001)).
- 🐞 Bug fix: Fixed a width regression for layered `vconcat` charts in Altair ([#13980](https://github.com/streamlit/streamlit/pull/13980), [#13974](https://github.com/streamlit/streamlit/issues/13974)).
- 🐝 Bug fix: `st.multiselect` raises an exception when `max_selections` isn't positive ([#13966](https://github.com/streamlit/streamlit/pull/13966), [#13965](https://github.com/streamlit/streamlit/issues/13965)).
- 🐜 Bug fix: When a user adds a row to `st.data_editor`, all columns, including hidden ones, are initialized ([#13916](https://github.com/streamlit/streamlit/pull/13916), [#13915](https://github.com/streamlit/streamlit/issues/13915)).
- 🪲 Bug fix: `st.select_slider` doesn't apply its format function twice in `AppTest` ([#13837](https://github.com/streamlit/streamlit/pull/13837), [#13832](https://github.com/streamlit/streamlit/issues/13832)).
- 🐛 Bug fix: Content in collapsed expanders is not included in page search ([#13818](https://github.com/streamlit/streamlit/pull/13818)).

## Older versions of Streamlit

- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
