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

## **Version 1.52.0 (latest)**

_Release date: December 3, 2025_

**Highlights**

- 📅 Introducing [`st.datetime_input`](/develop/api-reference/widgets/st.datetime_input) to set date and time in a single widget.
- 📩 To avoid blocking your script, you can pass a callable to [`st.download_button`](/develop/api-reference/widgets/st.download_button) for on-demand download generation ([#12942](https://github.com/streamlit/streamlit/pull/12942), [#5053](https://github.com/streamlit/streamlit/issues/5053)).

**Notable Changes**

- 🎤 [`st.chat_input`](/develop/api-reference/chat/st.chat_input) can optionally accept audio input ([#12836](https://github.com/streamlit/streamlit/pull/12836), [#13054](https://github.com/streamlit/streamlit/pull/13054)).
- 🎹 You can configure keyboard shortcuts for [buttons](/develop/api-reference/widgets/st.button) ([#12975](https://github.com/streamlit/streamlit/pull/12975), [#1291](https://github.com/streamlit/streamlit/issues/1291)).
- ❓ You can now pass query parameters to [`st.switch_page`](/develop/api-reference/navigation/st.switch_page) and [`st.page_link`](/develop/api-reference/widgets/st.page_link) ([#13027](https://github.com/streamlit/streamlit/pull/13027), [#8102](https://github.com/streamlit/streamlit/issues/8102), [#8112](https://github.com/streamlit/streamlit/issues/8112), [#13093](https://github.com/streamlit/streamlit/pull/13093)).
- 〰️ [`st.html`](/develop/api-reference/text/st.html) has a new `unsafe_allow_javascript` parameter to execute JavaScript ([#12918](https://github.com/streamlit/streamlit/pull/12918)).
- ⬆️ [`st.metric`](/develop/api-reference/data/st.metric) has a new `delta_arrow` parameter to configure the visibility and orientation of the delta arrow ([#12982](https://github.com/streamlit/streamlit/pull/12982), [#4775](https://github.com/streamlit/streamlit/issues/4775)).
- ⌨️ You can configure the horizontal alignment of [`st.markdown`](/develop/api-reference/text/st.markdown), `st.caption`, `st.title`, `st.header`, `st.subheader`, and `st.text` with a new `text_alignment` parameter ([#13032](https://github.com/streamlit/streamlit/pull/13032), [#4109](https://github.com/streamlit/streamlit/issues/4109), [#13034](https://github.com/streamlit/streamlit/pull/13034), [#13036](https://github.com/streamlit/streamlit/pull/13036)).
- 🌀 You can use a spinner everywhere you can set an `icon` and in the `avatar` parameter of [`st.chat_message`](/develop/api-reference/chat/st.chat_message). The spinner can't be used as a page favicon ([#13045](https://github.com/streamlit/streamlit/pull/13045), [#6415](https://github.com/streamlit/streamlit/issues/6415)).
- 🛠️ You can now add tooltips to [`st.badge`](/develop/api-reference/text/st.badge) ([#12897](https://github.com/streamlit/streamlit/pull/12897), [#12878](https://github.com/streamlit/streamlit/issues/12878)). Thanks, [marcolanfranchi](https://github.com/marcolanfranchi)!
- 🕳️ You can configure placeholder text for null values in [`st.dataframe`](/develop/api-reference/data/st.dataframe) and [`st.data_editor`](/develop/api-reference/data/st.data_editor) with a new `placeholder` parameter ([#12968](https://github.com/streamlit/streamlit/pull/12968), [#7360](https://github.com/streamlit/streamlit/issues/7360)).
- 🔑 To prevent widgets from resetting when you change a parameter, widgets are transitioning to an identity based only on their keys (if provided). The following widgets use only their key for their identity:
  - `st.file_uploader`
  - `st.camera_input`
- ↕️ `st.plotly_chart` has a height parameter to use with flex containers ([#12593](https://github.com/streamlit/streamlit/pull/12593)).
- ↔️ `st.container`, `st.dataframe`, and `st.data_editor` support `width="content"` ([#12848](https://github.com/streamlit/streamlit/pull/12848), [#12875](https://github.com/streamlit/streamlit/pull/12875), [#12391](https://github.com/streamlit/streamlit/issues/12391)).
- 🐍 Streamlit supports Python 3.14 and Vega-Altair 6!
- 👻 `st.bokeh_chart` has been removed. Use the `streamlit-bokeh` custom component instead.
- ☠️ `**kwargs` is deprecated in `st.vega_lite_chart` ([#13141](https://github.com/streamlit/streamlit/pull/13141)).
- 💩 The `.add_rows()` method is under consideration for removal. Please leave feedback ([#13063](https://github.com/streamlit/streamlit/issues/13063)).
- 👥 We're improving community contributions by using a public workflow for discussing feature specs ([#12248](https://github.com/streamlit/streamlit/pull/12248)).

**Other Changes**

- 🪥 For better performance, Streamlit uses `uvloop` if it's installed ([#13047](https://github.com/streamlit/streamlit/pull/13047)).
- 🧼 For improved performance, Markdown plugins are lazy loaded ([#13152](https://github.com/streamlit/streamlit/pull/13152)).
- 🧽 To improve load times, we reduced the bundle size ([#13071](https://github.com/streamlit/streamlit/pull/13071), [#13077](https://github.com/streamlit/streamlit/pull/13077), [#13099](https://github.com/streamlit/streamlit/pull/13099), [#13115](https://github.com/streamlit/streamlit/pull/13115), [#13128](https://github.com/streamlit/streamlit/pull/13128)).
- 🛁 To improve performance, we've refactored session context data ([#12788](https://github.com/streamlit/streamlit/pull/12788), [#12789](https://github.com/streamlit/streamlit/pull/12789), [#12790](https://github.com/streamlit/streamlit/pull/12790), [#12791](https://github.com/streamlit/streamlit/pull/12791)).
- 🚿 The hovering performance of `st.line_chart` was improved ([#13156](https://github.com/streamlit/streamlit/pull/13156), [#13154](https://github.com/streamlit/streamlit/issues/13154)).
- 🧹 `st.metric` was optimized to prevent poor hovering performance with large data sets ([#12983](https://github.com/streamlit/streamlit/pull/12983)).
- 👽 The `packaging` Python dependency is no longer version-capped ([#13073](https://github.com/streamlit/streamlit/pull/13073)).
- 🫥 For clarity, Streamlit logs a warning if you try to hide a non-range index when using `st.data_editor` with `num_rows="dynamic"`. A non-range index must be editable to add rows ([#12978](https://github.com/streamlit/streamlit/pull/12978), [#8263](https://github.com/streamlit/streamlit/issues/8263)).
- 🦋 Bug fix: Streamlit auth raises a warning instead of an error when browser back navigation revisits a consumed OAuth callback ([#13127](https://github.com/streamlit/streamlit/pull/13127), [#13101](https://github.com/streamlit/streamlit/issues/13101)).
- 🦀 Bug fix: The WebSocket timeout was increased on Android to improve `st.file_uploader` performance ([#13132](https://github.com/streamlit/streamlit/pull/13132), [#11419](https://github.com/streamlit/streamlit/issues/11419)).
- 🦎 Bug fix: Query parameters are preserved when using browser back and forward navigation ([#13129](https://github.com/streamlit/streamlit/pull/13129), [#9279](https://github.com/streamlit/streamlit/issues/9279)).
- 🐌 Bug fix: For custom components v2, the frontend key is correctly computed to be stable if it has a key in Python and otherwise change when its parameters change ([#12950](https://github.com/streamlit/streamlit/pull/12950)).
- 🕸️ Bug fix: Empty code blocks in Markdown don't display "undefined" ([#13074](https://github.com/streamlit/streamlit/pull/13074), [#12986](https://github.com/streamlit/streamlit/issues/12986)). Thanks, [ashm-dev](https://github.com/ashm-dev)!
- 🦗 Bug fix: `st.feeback` is prevented from wrapping ([#12970](https://github.com/streamlit/streamlit/pull/12970), [#12068](https://github.com/streamlit/streamlit/issues/12068)).
- 🦂 Bug fix: Custom components v2 don't raise a warning when placeholders are replaced as a result of the initial manifest scan ([#13043](https://github.com/streamlit/streamlit/pull/13043), [#13042](https://github.com/streamlit/streamlit/issues/13042)).
- 🦟 Bug fix: `st.audio_input` has the correct padding for its waveform ([#13010](https://github.com/streamlit/streamlit/pull/13010)).
- 🦠 Bug fix: The date and time icons in `st.data_editor` are visible in dark mode ([#12994](https://github.com/streamlit/streamlit/pull/12994), [#12852](https://github.com/streamlit/streamlit/issues/12852)). Thanks, [aritradhabal](https://github.com/aritradhabal)!
- 🪰 Bug fix: `st.pills` and `st.segmented_control` wrap correctly when `width="content"` ([#12969](https://github.com/streamlit/streamlit/pull/12969), [#12067](https://github.com/streamlit/streamlit/issues/12067), [#12879](https://github.com/streamlit/streamlit/pull/12879), [#12857](https://github.com/streamlit/streamlit/issues/12857)).
- 🪳 Bug fix: `st.color_picker` has a minimum width to prevent a pixel width below its intrinsic size ([#12962](https://github.com/streamlit/streamlit/pull/12962), [#12872](https://github.com/streamlit/streamlit/issues/12872)).
- 🕷️ Bug fix: Disabled widgets hide their borders ([#12949](https://github.com/streamlit/streamlit/pull/12949)).
- 🐞 `st.audio_input` and `st.chat_input` show a clearer message when microphone permissions are insufficient ([#12914](https://github.com/streamlit/streamlit/pull/12914)).
- 🐝 Bug fix: `st.navigation` uses the sidebar font and Streamlit falls back to its built-in fonts if a font can't be found ([#12948](https://github.com/streamlit/streamlit/pull/12948)).
- 🐜 Bug fix: `MultiselectColumn` doesn't raise a `ValueError` when adding new rows in `st.data_editor` ([#12860](https://github.com/streamlit/streamlit/pull/12860), [#12936](https://github.com/streamlit/streamlit/pull/12936), [#12815](https://github.com/streamlit/streamlit/issues/12815)). Thanks, [kkchemboli](https://github.com/kkchemboli)!
- 🪲 Bug fix: `MultiselectColumn` works correctly when the underlying dataframe has an empty column ([#12935](https://github.com/streamlit/streamlit/pull/12935), [#12842](https://github.com/streamlit/streamlit/issues/12842)).
- 🐛 Bug fix: `st.text_area` avoids negative height calculations that produce invalid CSS ([#12891](https://github.com/streamlit/streamlit/pull/12891), [#12867](https://github.com/streamlit/streamlit/issues/12867)).

## Older versions of Streamlit

- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
