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

## **Version 1.51.0 (latest)**

_Release date: October 29, 2025_

**Highlights**

- 🧩 Announcing [custom components](/develop/api-reference/custom-components/st.components.v2.component), version 2! Easily create frameless custom UI with bidirectional data flow.
- 🌗 Introducing custom [light and dark theme](/develop/concepts/configuration/theming) configuration! You can simultaneously define custom light and dark themes in your app.
- 🎨 Announcing [reusable themes](/develop/api-reference/configuration/config.toml#theme)! You can define a theme in a sharable file and use it as a base in other themes.
- 💫 Introducing [`st.space`](/develop/api-reference/layout/st.space) for adding vertical and horizontal spaces in your app.

**Notable Changes**

- 🔗 New configuration options, `theme.codeTextColor` and `theme.linkColor`, let you configure the color of code and link text.
- 📊 [`ProgressColumn`](/develop/api-reference/data/st.column_config/st.column_config.progresscolumn) has a new `color` parameter.
- 🌈 You can set `color="auto"` in [`MultiselectColumn`](/develop/api-reference/data/st.column_config/st.column_config.multiselectcolumn) to inherit colors from `theme.chartCategoricalColors`.
- 📌 `MultiselectColumn` has a `pinned` parameter to match other column types.
- ⭐ You can set a `default` value for [`st.feedback`](/develop/api-reference/widgets/st.feedback) ([#12578](https://github.com/streamlit/streamlit/pull/12578), [#9469](https://github.com/streamlit/streamlit/issues/9469)). Thanks, [andreasntr](https://github.com/andreasntr)!
- 👆 [`st.write_stream`](/develop/api-reference/write-magic/st.write_stream) has a `cursor` parameter to set a custom cursor for the typewriter effect.
- 🍿 [`st.popover`](/develop/api-reference/layout/st.popover) has a `type` parameter to match `st.button` styling options.
- 🔑 To prevent widgets from resetting when you change a parameter, widgets are transitioning to an identity based only on their keys (if provided). The following widgets use only their key for their identity:
  - `st.color_picker`
  - `st.segmented_control`
  - `st.radio`
  - `st.audio_input`
  - `st.slider`
  - `st.select_slider`
  - `st.chat_input`
  - `st.feedback`
  - `st.pills`
- ↕️ `st.dataframe`, `st.data_editor`, `st.altair_chart`, `st.pydeck_chart`, and all simple charts have height parameters to use with flex containers.
- ↔️ `st.plotly_chart`, `st.vega_lite_chart`, `st.altair_chart`, `st.pydeck_chart`, and all simple charts have width parameters to use with flex containers.
- 🐍 Due to end of life, Python 3.9 is no longer supported.

**Other Changes**

- ⚡ If you don’t pass a file to `streamlit run`, it will try `streamlit_app.py` by default ([#12599](https://github.com/streamlit/streamlit/pull/12599)).
- 🥷 `st.dataframe` hides its index column by default when row selections are enabled ([#12448](https://github.com/streamlit/streamlit/pull/12448), [#12237](https://github.com/streamlit/streamlit/issues/12237)). Thanks, [plumol](https://github.com/plumol)!
- 👩‍🎨 For compatibility with new theming options, the app settings menu no longer supports theme editing ([#12648](https://github.com/streamlit/streamlit/pull/12648)).
- 👋 The Streamlit hello app preloads its Python packages on its home page for a faster user experience ([#12617](https://github.com/streamlit/streamlit/pull/12617)).
- 👍 Slider thumbs don’t extend beyond the edge of their track ([#12549](https://github.com/streamlit/streamlit/pull/12549), [#4284](https://github.com/streamlit/streamlit/issues/4284)).
- ℹ️ Material icons and emojis were updated ([#12669](https://github.com/streamlit/streamlit/pull/12669)).
- 🦠 Bug fix: Pyplot charts render correctly in fragments, containers, and expanders ([#12807](https://github.com/streamlit/streamlit/pull/12807), [#12678](https://github.com/streamlit/streamlit/issues/12678), [#12763](https://github.com/streamlit/streamlit/issues/12763)).
- 🪰 Bug fix: Dataframes correctly resize and align when using `width="content"` ([#12682](https://github.com/streamlit/streamlit/pull/12682)).
- 🪳 Bug fix: Fuzzy search in select boxes is case insensitive ([#12849](https://github.com/streamlit/streamlit/pull/12849), [#11724](https://github.com/streamlit/streamlit/issues/11724)).
- 🕷️ Bug fix: 500 errors display correctly ([#12845](https://github.com/streamlit/streamlit/pull/12845)).
- 🐞 Bug fix: Deprecation warnings respect `client.showErrorDetails` ([#12794](https://github.com/streamlit/streamlit/pull/12794), [#12743](https://github.com/streamlit/streamlit/issues/12743)).
- 🐝 Bug fix: Path handling in the file watcher was improved to prevent a `ValueError` in Windows environments ([#12741](https://github.com/streamlit/streamlit/pull/12741), [#12731](https://github.com/streamlit/streamlit/issues/12731)).
- 🐜 Bug fix: `st.pills` shows its value when disabled ([#12555](https://github.com/streamlit/streamlit/pull/12555), [#12388](https://github.com/streamlit/streamlit/issues/12388)). Thanks, [davidsjoberg1](https://github.com/davidsjoberg1)!
- 🪲 Bug fix: Plotly charts hide overflow to prevent flickering behavior from scrollbars [(#12594](https://github.com/streamlit/streamlit/pull/12594)).
- 🐛 Bug fix: Streamlit’s handling of Altair charts was improved for thread safety and prevention of an “Unrecognized data set” race condition ([#12673](https://github.com/streamlit/streamlit/pull/12673), [#11911](https://github.com/streamlit/streamlit/pull/11911), [#11342](https://github.com/streamlit/streamlit/issues/11342), [#11906](https://github.com/streamlit/streamlit/issues/11906)).

## Older versions of Streamlit

- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
