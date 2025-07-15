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

## **Version 1.47.0 (latest)**

_Release date: July 15, 2025_

**Highlights**

- 🎨 Streamlit has additional [theming configuration](/develop/api-reference/configuration/config.toml#theme) options!
  - `theme.baseFontWeight`: Set the root font weight of text in the app.
  - `theme.chartCategoricalColors`: Configure default categorical colors for Plotly, Altair, and Vega-Lite charts.
  - `theme.chartSequentialColors`: Configure default sequential colors for Plotly, Altair, and Vega-Lite charts.
  - `theme.codeFontWeight`: Set the font weight of code text.
  - `theme.dataframeHeaderBackgroundColor`: Set the background color of dataframe headers.
  - `theme.headingFontSizes`: Set the font sizes of headings.
  - `theme.headingFontWeights`: Set the font weights of headings.
  - `theme.linkUnderline`: Configure whether to underline links.

**Notable Changes**

- 💬 You can set the unsubmitted value of [`st.chat_input`](/develop/api-reference/chat/st.chat_input) through Session State ([#10175](https://github.com/streamlit/streamlit/pull/10175), [#7166](https://github.com/streamlit/streamlit/issues/7166)).
- ↔️ You can set a `width` parameter for [`st.html`](/develop/api-reference/text/st.html), [`st.feedback`](/develop/api-reference/widgets/st.feedback), [`st.pills`](/develop/api-reference/widgets/st.pills), [`st.segmented_control`](/develop/api-reference/widgets/st.segmented_control), and [`st.multiselect`](/develop/api-reference/widgets/st.multiselect).
- ↕️ You can set a `height` parameter for [`st.metric`](/develop/api-reference/data/st.metric) and [`st.text_area`](/develop/api-reference/widgets/st.text_area).
- 👩‍💻 [`st.code`](/develop/api-reference/text/st.code) and [`st.form`](/develop/api-reference/execution-flow/st.form) can have `height="stretch"`.
- 🧑‍💻 [`st.code`](/develop/api-reference/text/st.code) can have `width="content"`.
- ⏱️ You can show the elapsed time with the spinner for cached functions using the `show_time` parameter ([#11469](https://github.com/streamlit/streamlit/pull/11469), [#10647](https://github.com/streamlit/streamlit/issues/10647)). Thanks, [Darkace01](https://github.com/Darkace01)!
- `server.showEmailPrompt` lets you configure whether to show the email prompt (for locally running apps).
- 💾 [`NumberColumn`](/develop/api-reference/data/st.column_config/st.column_config.numbercolumn) and [`ProgressColumn`](/develop/api-reference/data/st.column_config/st.column_config.progresscolumn) support `"bytes"` as a predefined format ([#11288](https://github.com/streamlit/streamlit/pull/11288), [#11287](https://github.com/streamlit/streamlit/issues/11287)). Thanks, [cgivre](https://github.com/cgivre)!
- ⚙️ Column configuration accepts pixel widths for columns ([#11838](https://github.com/streamlit/streamlit/pull/11838)).
- ℹ️ The `display_text` parameter of [`LinkColumn`](/develop/api-reference/data/st.column_config/st.column_config.linkcolumn) accepts a Material icon ([#11690](https://github.com/streamlit/streamlit/pull/11690), [#7004](https://github.com/streamlit/streamlit/issues/7004)).
- 🖊️ The `title` parameter of [`st.dialog`](/develop/api-reference/execution-flow/st.dialog) accepts Markdown ([#11763](https://github.com/streamlit/streamlit/pull/11763), [#11755](https://github.com/streamlit/streamlit/issues/11755)).
- 🧩 To support proxying requests for custom components, in [`declare_component`](/develop/api-reference/custom-components/st.components.v1.declare_component), you can set both `url` and `path` ([#11698](https://github.com/streamlit/streamlit/pull/11698)).

**Other Changes**

- 🧭 Section labels in the sidebar navigation widget are collapsible ([#11863](https://github.com/streamlit/streamlit/pull/11863)).
- 📂 The "Deploy" button is hidden when the "File change" notification is visible in the app chrome ([#11834](https://github.com/streamlit/streamlit/pull/11834)).
- 🔝 When using top navigation in an app, the header has more padding ([#11836](https://github.com/streamlit/streamlit/pull/11836)).
- 🪜 In `NumberColumn`, the precision from `step` will override the display precision from `format`, unless `format` is a printf string ([#11835](https://github.com/streamlit/streamlit/pull/11835)).
- 📅 When `st.date_input` accepts a date range, the widget displays a quick-select option below the calendar for common date ranges ([#10166](https://github.com/streamlit/streamlit/pull/10166), [#11108](https://github.com/streamlit/streamlit/issues/11108)).
- 🏋️ Dataframes support font weight defined in `pandas` `Styler` objects ([#11705](https://github.com/streamlit/streamlit/pull/11705), [#6461](https://github.com/streamlit/streamlit/issues/6461)).
- 🫥 The about dialog does not show by default in the app menu. The current Streamlit version is displayed in the settings dialog ([#10091](https://github.com/streamlit/streamlit/pull/10091)).
- 💅 `st.metric` uses a background color for the delta value, like `st.badge` ([#11678](https://github.com/streamlit/streamlit/pull/11678)).
- 💻 IDEs can give type hints for `.clear()` on cached functions ([#11793](https://github.com/streamlit/streamlit/pull/11793), [#11821](https://github.com/streamlit/streamlit/pull/11821)). Thanks, [whitphx](https://github.com/whitphx)!
- 🔄 Bug swap: To prevent a multipage app regression, `st.context.theme` does not automatically rerun the app on first load. In some cases, `st.context.theme` may not be correct until the first rerun ([#11870](https://github.com/streamlit/streamlit/pull/11870), [#11797](https://github.com/streamlit/streamlit/issues/11797)).
- 🧹 Bug fix: `st.chat_input` displays correctly at the bottom of the screen in mobile view ([#11896](https://github.com/streamlit/streamlit/pull/11896), [#11722](https://github.com/streamlit/streamlit/issues/11722), [#11891](https://github.com/streamlit/streamlit/issues/11891)).
- ⏳ Bug fix: When a WebSocket reconnects, the app will fully rerun to prevent missing fragments ([#11890](https://github.com/streamlit/streamlit/pull/11890), [#11660](https://github.com/streamlit/streamlit/issues/11660)).
- 🪱 Bug fix: To reduce `No such file or directory` errors, the file watcher has more robust exception handling and clearer logging ([#11871](https://github.com/streamlit/streamlit/pull/11871), [#11841](https://github.com/streamlit/streamlit/pull/11841), [#11809](https://github.com/streamlit/streamlit/issues/11809), [#11728](https://github.com/streamlit/streamlit/issues/11728)).
- 💩 Bug fix: Vega-Lite facet charts do not flicker ([#11833](https://github.com/streamlit/streamlit/pull/11833)).
- ☠️ Bug fix: When the initial sidebar state is set to `"collapsed"`, the sidebar correctly loads in a collapsed state without flickering open ([#11861](https://github.com/streamlit/streamlit/pull/11861), [#11848](https://github.com/streamlit/streamlit/issues/11848)).
- 👽 Bug fix: To prevent apps from being out of sync with their current code at a later time, Streamlit clears the script cache when all file watchers disconnect ([#11876](https://github.com/streamlit/streamlit/pull/11876), [#11739](https://github.com/streamlit/streamlit/pull/11739)). Thanks, [diwu-sf](https://github.com/diwu-sf)!
- 👻 Bug fix: Inline code in tooltips has the same relative size as inline code in other Markdown text ([#11877](https://github.com/streamlit/streamlit/pull/11877)).
- 🦀 Bug fix: `st.multiselect` and `st.selectbox` display the correct placeholder text when `accept_new_options=True` ([#11623](https://github.com/streamlit/streamlit/pull/11623), [#11609](https://github.com/streamlit/streamlit/issues/11609)).
- 🦋 Bug fix: The column visibility menu can be closed by toggling the toolbar icon ([#11857](https://github.com/streamlit/streamlit/pull/11857), [#11801](https://github.com/streamlit/streamlit/issues/11801)).
- 🦎 Bug fix: Progress bar columns in dataframes have the correct padding between the bar and its label ([#11685](https://github.com/streamlit/streamlit/pull/11685)).
- 🐌 Bug fix: The warning indicator in a dataframe cell adapts to theme configuration ([#11682](https://github.com/streamlit/streamlit/pull/11682)).
- 🕸️ Bug fix: To fix multiple visual and UX bugs in dataframe, `glide-data-grid` was updated ([#11677](https://github.com/streamlit/streamlit/pull/11677), [#8310](https://github.com/streamlit/streamlit/issues/8310), [#9498](https://github.com/streamlit/streamlit/issues/9498), [#9471](https://github.com/streamlit/streamlit/issues/9471)).
- 🦗 Bug fix: In the sidebar navigation widget, font spacing and weight were adjust for visual clarity ([#11814](https://github.com/streamlit/streamlit/pull/11814)).
- 🦂 Bug fix: Altair charts correctly resize in width to match their container ([#11807](https://github.com/streamlit/streamlit/pull/11807), [#11802](https://github.com/streamlit/streamlit/issues/11802)).
- 🦟 Bug fix: The running-man icon matches the theme configuration ([#11461](https://github.com/streamlit/streamlit/pull/11461), [#11371](https://github.com/streamlit/streamlit/issues/11371)). Thanks, [TreavVasu](https://github.com/TreavVasu)!
- 🦠 Bug fix: The top header background is correctly opaque when it contains elements ([#11787](https://github.com/streamlit/streamlit/pull/11787), [#11785](https://github.com/streamlit/streamlit/issues/11785)).
- 🪰 Bug fix: Extra top padding is removed when printing ([#11798](https://github.com/streamlit/streamlit/pull/11798)).
- 🪳 Bug fix: Markdown inline code displays correctly when `unsafe_allow_html=True` ([#11817](https://github.com/streamlit/streamlit/pull/11817), [#11800](https://github.com/streamlit/streamlit/issues/11800)). Thanks, [bajajku](https://github.com/bajajku)!
- 🕷️ Bug fix: The WebSocket ping interval does not exceed the timeout interval ([#11693](https://github.com/streamlit/streamlit/pull/11693), [#11670](https://github.com/streamlit/streamlit/issues/11670)).
- 🐞 Bug fix: The sidebar state initialized correctly on Community Cloud and page content slides and resizes correctly in response to the sidebar ([#11732](https://github.com/streamlit/streamlit/pull/11732), [#11702](https://github.com/streamlit/streamlit/issues/11702), [#11710](https://github.com/streamlit/streamlit/issues/11710)).
- 🐝 Bug fix: The timer in `st.spinner` uses system time to prevent pausing when the user focuses on another browser tab ([#11756](https://github.com/streamlit/streamlit/pull/11756), [#11720](https://github.com/streamlit/streamlit/issues/11720)).
- 🐜 Bug fix: Empty containers with borders and empty expanders are visible before elements are added to them ([#11669](https://github.com/streamlit/streamlit/pull/11669)).
- 🪲 Bug fix: `st.audio_input` and `st.camera_input` have consistent appearances ([#11699](https://github.com/streamlit/streamlit/pull/11699), [#11700](https://github.com/streamlit/streamlit/issues/11700)).
- 🐛 Bug fix: To prevent a race condition, the file watcher correctly applies a lock to watched paths ([#11692](https://github.com/streamlit/streamlit/pull/11692), [#11691](https://github.com/streamlit/streamlit/issues/11691)).

## Older versions of Streamlit

- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
