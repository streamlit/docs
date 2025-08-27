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

## **Version 1.49.0 (latest)**

_Release date: August 26, 2025_

**Highlights**

- 📄 Introducing [`st.pdf`](/develop/api-reference/media/st.pdf) to beautifully render PDF documents in your app!
- ⛏️ Dataframes support [cell selections](/develop/api-reference/data/st.dataframe#dataframeselectionstate)!
- ✨ You can add sparklines to [`st.metric`](/develop/api-reference/data/st.metric)!
- 📂 Users can upload a directory of files with [`st.file_uploader`](/develop/api-reference/widgets/st.file_uploader) or [`st.chat_input`](/develop/api-reference/chat/st.chat_input).

**Notable Changes**

- 🏷️ You can configure the label of options in [`SelectboxColumn`](/develop/api-reference/data/st.column_config/st.column_config.selectboxcolumn) with a new `format_func` parameter ([#12232](https://github.com/streamlit/streamlit/pull/12232), [#6795](https://github.com/streamlit/streamlit/issues/6795)).
- 🍞 You can configure the duration of [`st.toast`](/develop/api-reference/status/st.toast) messages ([#11872](https://github.com/streamlit/streamlit/pull/11872), [#7047](https://github.com/streamlit/streamlit/issues/7047)).
- 🔑 [`st.form_submit_button`](/develop/api-reference/execution-flow/st.form_submit_button) has a `key` parameter ([#12190](https://github.com/streamlit/streamlit/pull/12190), [#12121](https://github.com/streamlit/streamlit/issues/12121)).
- 🌻 [Markdown](/develop/api-reference/text/st.markdown) and heading dividers can be yellow ([#12201](https://github.com/streamlit/streamlit/pull/12201)).
- 💬 [`st.dialog`](/develop/api-reference/execution-flow/st.dialog) widths have a larger option ([#12040](https://github.com/streamlit/streamlit/pull/12040), [#8904](https://github.com/streamlit/streamlit/issues/8904)).
- 💻 `st.dataframe` and `st.data_editor` have `width` and `height` to use with flex layouts ([#11930](https://github.com/streamlit/streamlit/pull/11930)).
- 🖼️ `st.image` and `st.pyplot` have a `width` parameter to use them with flex layouts ([#11952](https://github.com/streamlit/streamlit/pull/11952)).
- 📈 Users can access the underlying data of a Vega chart through the toolbar. This includes all data passed to the chart, even if it’s not displayed ([#10311](https://github.com/streamlit/streamlit/pull/10311)).
- ☠️ `st.bokeh_chart` is deprecated. Use the [`streamlit-bokeh`](https://github.com/streamlit/streamlit-bokeh) custom component instead.
- 🧹 We removed deprecated commands and parameters: `st.experimental_dialog`, `st.experimental_fragment`, and caching’s `experimental_allow_widgets` ([#12167](https://github.com/streamlit/streamlit/pull/12167)).

**Other Changes**

- 🏃‍♂️ For better performance, `st.slider` will not rerun the app until the user releases the slider thumb ([#11879](https://github.com/streamlit/streamlit/pull/11879), [#4541](https://github.com/streamlit/streamlit/issues/4541)).
- 💅 For improved custom theming, single mark charts use the first categorical chart color ([#12162](https://github.com/streamlit/streamlit/pull/12162)).
- 🌐 For `st.logo`, the `crossorigin` property can be configured by hosts ([#12226](https://github.com/streamlit/streamlit/pull/12226)).
- 🎨 The colored decoration line at the top of Streamlit apps was removed ([#12155](https://github.com/streamlit/streamlit/pull/12155)).
- 👻 The copy-to-clipboard function of multiple elements gives a checkmark feedback to users when they copy something ([#12141](https://github.com/streamlit/streamlit/pull/12141), [#12172](https://github.com/streamlit/streamlit/pull/12172)).
- 🦀 Bug fix: A column’s menu is not accessible when the column is hidden ([#12233](https://github.com/streamlit/streamlit/pull/12233), [#12230](https://github.com/streamlit/streamlit/issues/12230)). Thanks, [plumol](https://github.com/plumol)!
- 🦋 Bug fix: Streamlit correctly caches Pydantic models ([#12137](https://github.com/streamlit/streamlit/pull/12137), [#10348](https://github.com/streamlit/streamlit/issues/10348)).
- 🦎 Bug fix: `st.plotly_chart` correctly handles null selections ([#12222](https://github.com/streamlit/streamlit/pull/12222), [#12191](https://github.com/streamlit/streamlit/issues/12191)).
- 🐌 Bug fix: When using `accept_new_options=True` with `st.selectbox`, mobile users can access their keyboards ([#12219](https://github.com/streamlit/streamlit/pull/12219), [#12205](https://github.com/streamlit/streamlit/issues/12205)).
- 🕸️ Bug fix: Streamlit does not raise an error when the user’s email is empty and `server.showEmailPrompt` is false ([#12202](https://github.com/streamlit/streamlit/pull/12202), [#12166](https://github.com/streamlit/streamlit/issues/12166)). Thanks, [wyattscarpenter](https://github.com/wyattscarpenter)!
- 🦗 Bug fix: The drop area of `st.file_uploader` correctly truncates a long list of file types ([#12192](https://github.com/streamlit/streamlit/pull/12192), [#12189](https://github.com/streamlit/streamlit/issues/12189)).
- 🦂 Bug fix: The corner radius of `st.page_link` matches the navigation widget instead of the border radius configured for buttons ([#12181](https://github.com/streamlit/streamlit/pull/12181)).
- 🦟 Bug fix: Cached replay correctly handles element height and width for flex layouts ([#12183](https://github.com/streamlit/streamlit/pull/12183)).
- 🦠 Bug fix: When a client disconnects from a Streamlit server and the user dismisses the warning, the client will re-raise the warning while the app remains disconnected ([#12178](https://github.com/streamlit/streamlit/pull/12178), [#12113](https://github.com/streamlit/streamlit/issues/12113)).
- 🪰 Bug fix: Identity provider logout was reverted to prevent redirect failures in `st.logout()` ([#12179](https://github.com/streamlit/streamlit/pull/12179)).
- 🪳 Bug fix: Currency symbols in column configuration are narrowly formatted ([#11895](https://github.com/streamlit/streamlit/pull/11895)).
- 🕷️ Bug fix: Users can’t remove files from `st.file_uploader` while the widget is disabled ([#12180](https://github.com/streamlit/streamlit/pull/12180), [#12146](https://github.com/streamlit/streamlit/issues/12146)).
- 🐞 Bug fix: `pip install` works correctly in Windows ([#8952](https://github.com/streamlit/streamlit/pull/8952)). Thanks, [Dev-iL](https://github.com/Dev-iL)!
- 🐝 Bug fix: The drop-down menu for `st.time_input` uses theme colors consistently with other elements ([#12157](https://github.com/streamlit/streamlit/pull/12157)).
- 🐜 Bug fix: `st.toast` uses custom theme colors ([#12160](https://github.com/streamlit/streamlit/pull/12160), [#11951](https://github.com/streamlit/streamlit/issues/11951)).
- 🪲 Bug fix: The width handling of custom components was updated to work with horizontal containers ([#12148](https://github.com/streamlit/streamlit/pull/12148)).
- 🐛 Bug fix: `st.chat_input` correctly resizes itself after the user submits a long message ([#12132](https://github.com/streamlit/streamlit/pull/12132), [#12079](https://github.com/streamlit/streamlit/issues/12079)).

## Older versions of Streamlit

- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
