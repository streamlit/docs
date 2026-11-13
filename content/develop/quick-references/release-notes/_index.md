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

Breaking changes are extremely rare, so existing apps keep running and gain each release's new features, performance improvements, and security fixes. If you use Streamlit's [agent skills](/develop/api-reference/cli/skills), they update with Streamlit, so your coding agent writes for the version you run. To bring an older app up to date with newer features, ask your coding agent: `/developing-with-streamlit Modernize my app`. For details, see [Modernize an existing app](/develop/concepts/ai-agents/coding-agents#modernize-an-existing-app).

</Tip>

## **Version 1.67.0 (latest)**

_Release date: November 5, 2026_

**Highlights**

- 🔲 Introducing [`st.grid`](/develop/api-reference/layout/st.grid), a responsive grid container for repeated tiles like metric cards, galleries, and dashboard cards that reflow with the available width ([#17800](https://github.com/streamlit/streamlit/pull/17800), [#11101](https://github.com/streamlit/streamlit/issues/11101)).
- 🤖 Announcing agent-accessible apps! When you turn on the experimental [`server.enableAgentApi`](/develop/concepts/configuration/agent-api-mcp) option, AI agents and other programs can use your app over HTTP or through an MCP endpoint that you can add to clients like Claude, ChatGPT, Cursor, and VS Code ([#17731](https://github.com/streamlit/streamlit/pull/17731), [#17510](https://github.com/streamlit/streamlit/pull/17510)).
- 🎨 Introducing a refreshed default theme! The built-in light and dark themes have a warmer palette, updated colors, and widget and sidebar borders shown by default, and `st.map` markers use your theme's primary color ([#17450](https://github.com/streamlit/streamlit/pull/17450), [#17467](https://github.com/streamlit/streamlit/pull/17467), [#17495](https://github.com/streamlit/streamlit/pull/17495), [#17493](https://github.com/streamlit/streamlit/pull/17493)).

**Notable Changes**

- 💾 You can limit the memory used by [`st.cache_data`](/develop/api-reference/caching-and-state/st.cache_data) with its new `max_size` parameter for each function, or across all functions with the new [`server.maxCacheDataSize`](/develop/api-reference/configuration/config.toml#server) configuration option ([#17552](https://github.com/streamlit/streamlit/pull/17552), [#17553](https://github.com/streamlit/streamlit/pull/17553), [#2911](https://github.com/streamlit/streamlit/issues/2911)).
- 🚩 The following widgets have a new `required` parameter to prevent users from committing or submitting an empty value:
  - [`st.date_input`](/develop/api-reference/widgets/st.date_input) ([#17165](https://github.com/streamlit/streamlit/pull/17165)).
  - [`st.time_input`](/develop/api-reference/widgets/st.time_input) ([#17420](https://github.com/streamlit/streamlit/pull/17420)).
  - [`st.datetime_input`](/develop/api-reference/widgets/st.datetime_input) ([#17565](https://github.com/streamlit/streamlit/pull/17565)).
  - [`st.text_area`](/develop/api-reference/widgets/st.text_area) ([#17590](https://github.com/streamlit/streamlit/pull/17590), [#17737](https://github.com/streamlit/streamlit/pull/17737)).
  - [`st.selectbox`](/develop/api-reference/widgets/st.selectbox) ([#17676](https://github.com/streamlit/streamlit/pull/17676)).
- 📐 [`st.dialog`](/develop/api-reference/execution-flow/st.dialog) accepts a pixel width, so you can size a dialog to fit fixed-width content. Invalid `width` values now raise an error instead of falling back to the small dialog ([#17412](https://github.com/streamlit/streamlit/pull/17412)).
- 🧭 [`st.Page`](/develop/api-reference/navigation/st.page) has a `help` parameter to describe each page in a navigation tooltip, which `st.page_link` also uses by default ([#17807](https://github.com/streamlit/streamlit/pull/17807)).
- 🪄 [`st.selectbox`](/develop/api-reference/widgets/st.selectbox) has an `icon` parameter to show an emoji or Material icon at the start of the field, like `st.text_input` ([#17850](https://github.com/streamlit/streamlit/pull/17850), [#17840](https://github.com/streamlit/streamlit/issues/17840)).
- 📊 [`st.echarts_chart`](/develop/api-reference/charts/st.echarts_chart) has new selection and data features:
  - Set `on_select` to return the point and brush selections that you enable in the chart's spec ([#16786](https://github.com/streamlit/streamlit/pull/16786)).
  - Dataframes in `dataset.source` are sent as Arrow, which makes large charts faster and displays values the same way as `st.dataframe` ([#17678](https://github.com/streamlit/streamlit/pull/17678)).
  - Dataframe-backed charts have a "Show data" toolbar action that displays the chart's data as a table ([#17708](https://github.com/streamlit/streamlit/pull/17708)).
- ⚡ [`st.altair_chart`](/develop/api-reference/charts/st.altair_chart) and [`st.vega_lite_chart`](/develop/api-reference/charts/st.vega_lite_chart) send selections as soon as a click or brush gesture ends, so selection reruns are faster and a form submitted right after includes the latest selection ([#17666](https://github.com/streamlit/streamlit/pull/17666)).
- 🔧 You can set a server-wide default TTL for [`st.connection`](/develop/api-reference/connections/st.connection) with the new [`runner.connectionDefaultTTL`](/develop/api-reference/configuration/config.toml#runner) configuration option ([#17248](https://github.com/streamlit/streamlit/pull/17248)).

**Other Changes**

- 📚 The bundled `developing-with-streamlit` agent skill has improved guidance on theming and CSS, Session State, testing with AppTest, dynamic containers, and performance ([#17473](https://github.com/streamlit/streamlit/pull/17473), [#17483](https://github.com/streamlit/streamlit/pull/17483), [#17496](https://github.com/streamlit/streamlit/pull/17496), [#17605](https://github.com/streamlit/streamlit/pull/17605), [#17674](https://github.com/streamlit/streamlit/pull/17674), [#17675](https://github.com/streamlit/streamlit/pull/17675), [#17724](https://github.com/streamlit/streamlit/pull/17724)).
- 📈 The docstrings for `st.pyplot`, `st.plotly_chart`, and `st.echarts_chart` and the bundled agent skill recommend Vega-based charts or `st.echarts_chart` with a dataframe source for new charts. `st.echarts_chart` also raises an error for unsupported ECharts GL map components instead of rendering a blank chart ([#17769](https://github.com/streamlit/streamlit/pull/17769), [#17810](https://github.com/streamlit/streamlit/pull/17810)).
- 🔢 `st.echarts_chart` tooltips accept `st.metric` number formats in `tooltip.valueFormatter`, so you can format tooltip values without JavaScript ([#17755](https://github.com/streamlit/streamlit/pull/17755)).
- 🧪 `AppTest` supports `st.data_editor`, file uploads in `st.chat_input`, and setting `st.user` and `st.context` for a test ([#17476](https://github.com/streamlit/streamlit/pull/17476), [#17464](https://github.com/streamlit/streamlit/pull/17464), [#17611](https://github.com/streamlit/streamlit/pull/17611)).
- 🔣 Type checkers infer a fixed-length tuple from `st.columns` when you pass an integer from 1 to 6 or a tuple of up to six widths, so a mismatched unpack is caught before the app runs ([#17498](https://github.com/streamlit/streamlit/pull/17498), [#17506](https://github.com/streamlit/streamlit/pull/17506)).
- 🚀 Charts, `st.metric`, and `st.dataframe` load faster because the "Show data" grid and Vega are downloaded only when needed ([#17846](https://github.com/streamlit/streamlit/pull/17846), [#17853](https://github.com/streamlit/streamlit/pull/17853)).
- ⏩ The Material Symbols icon font starts loading at app startup, so icons appear sooner on first load ([#17849](https://github.com/streamlit/streamlit/pull/17849), [#17839](https://github.com/streamlit/streamlit/issues/17839)).
- 📝 Corrected outdated docstrings and configuration help text, including for `client.toolbarMode` ([#17613](https://github.com/streamlit/streamlit/pull/17613)).
- 🐛 Bug fix: `st.echarts_chart` has better default layouts for titles with top legends, treemaps, and horizontal `markLine` labels ([#17885](https://github.com/streamlit/streamlit/pull/17885)).
- 🦋 Bug fix: Default tooltips in `st.echarts_chart` label each field and format dates when the chart's data is a dataframe in `dataset.source` ([#17883](https://github.com/streamlit/streamlit/pull/17883)).
- 🪲 Bug fix: The page keeps scrolling when the mouse wheel passes over an `st.echarts_chart` that zooms or pans with the wheel, such as a default treemap, until the pointer rests on the chart ([#17882](https://github.com/streamlit/streamlit/pull/17882), [#17507](https://github.com/streamlit/streamlit/pull/17507)).
- 🐜 Bug fix: When an `st.echarts_chart` spec can't be serialized, the error names the offending value and how to convert it ([#17881](https://github.com/streamlit/streamlit/pull/17881)).
- 🐝 Bug fix: The agent API matches browser behavior more closely and has more accurate snapshots, clearer error messages, and better MCP tool descriptions ([#17870](https://github.com/streamlit/streamlit/pull/17870), [#17871](https://github.com/streamlit/streamlit/pull/17871), [#17872](https://github.com/streamlit/streamlit/pull/17872), [#17880](https://github.com/streamlit/streamlit/pull/17880)).
- 🐞 Bug fix: `height="stretch"` dataframes and data editors fall back to their default height when no parent sets one, and they stay inside their parent while you resize them ([#17879](https://github.com/streamlit/streamlit/pull/17879), [#17662](https://github.com/streamlit/streamlit/pull/17662)).
- 🕷️ Bug fix: Dataframes and chart "Show data" tables no longer have extra space below them ([#17864](https://github.com/streamlit/streamlit/pull/17864)).
- 🪳 Bug fix: `st.echarts_chart` hides overlapping labels on time, value, and log axes by default ([#17858](https://github.com/streamlit/streamlit/pull/17858)).
- 🪰 Bug fix: `snowflake-callers-rights` connections use the container's protocol and port settings and no longer require a default database and schema ([#17848](https://github.com/streamlit/streamlit/pull/17848), [#17820](https://github.com/streamlit/streamlit/pull/17820)).
- 🦠 Bug fix: The range calendar in `st.date_input` no longer loses or double-commits the first date you pick ([#17833](https://github.com/streamlit/streamlit/pull/17833)).
- 🦟 Bug fix: Element calls no longer rewrite shared method attributes, which serialized concurrent script threads on free-threaded Python ([#17823](https://github.com/streamlit/streamlit/pull/17823), [#17801](https://github.com/streamlit/streamlit/issues/17801)).
- 🦂 Bug fix: Widgets don't rerun the app when an interaction leaves their value unchanged, like closing `st.multiselect` without changing it ([#17822](https://github.com/streamlit/streamlit/pull/17822)).
- 🦗 Bug fix: Keyed elements stay mounted when a rerun inserts content above them, so they keep their state, focus, and in-progress input ([#17804](https://github.com/streamlit/streamlit/pull/17804)).
- 🕸️ Bug fix: The global Streamlit meta-skill reliably finds a project's bundled agent skill on Windows, macOS, and Linux without creating or syncing Python environments ([#17803](https://github.com/streamlit/streamlit/pull/17803)).
- 🐌 Bug fix: Installing the bundled agent skills from the in-app prompt no longer fails when the server's console can't print the install summary, which mostly affected Windows ([#17802](https://github.com/streamlit/streamlit/pull/17802)).
- 🦎 Bug fix: Streamlit replaces pandas `inplace=` calls that pandas 3.1 deprecates, so `st.data_editor` row deletion and charts keep working on pandas 4 ([#17795](https://github.com/streamlit/streamlit/pull/17795)).
- 🦀 Bug fix: `st.vega_lite_chart` redraws when new data has the same shape as the old data, and Altair and built-in charts update their data in place instead of rebuilding the view ([#17793](https://github.com/streamlit/streamlit/pull/17793)).
- 👽 Bug fix: `st.dataframe` and `st.data_editor` with a fixed height expand to show more rows in fullscreen ([#17791](https://github.com/streamlit/streamlit/pull/17791), [#17771](https://github.com/streamlit/streamlit/issues/17771)).
- 🐛 Bug fix: `st.echarts_chart` and Vega-based charts use faster rendering defaults for very large datasets, so they no longer stall the browser ([#17788](https://github.com/streamlit/streamlit/pull/17788)).
- 🦋 Bug fix: Time axes in `st.echarts_chart` show midnight values as dates instead of with a `00:00:00` time ([#17781](https://github.com/streamlit/streamlit/pull/17781)).
- 🪲 Bug fix: `st.echarts_chart` logs chart errors to the browser console and can render again after an option fails ([#17780](https://github.com/streamlit/streamlit/pull/17780)).
- 🐜 Bug fix: `st.metric` sparklines and the dataframe column statistics menu no longer log a Vega-Lite version warning in the browser console ([#17778](https://github.com/streamlit/streamlit/pull/17778)).
- 🐝 Bug fix: Muted text, like placeholders and file uploader hints, meets WCAG AA contrast in the default light theme ([#17766](https://github.com/streamlit/streamlit/pull/17766), [#8289](https://github.com/streamlit/streamlit/issues/8289), [#8249](https://github.com/streamlit/streamlit/issues/8249), [#8276](https://github.com/streamlit/streamlit/issues/8276), [#8288](https://github.com/streamlit/streamlit/issues/8288), [#16149](https://github.com/streamlit/streamlit/issues/16149)).
- 🐞 Bug fix: Dollar amounts in Markdown, like `$315K of $1.46M`, render as plain text instead of being parsed as math ([#17753](https://github.com/streamlit/streamlit/pull/17753)).
- 🕷️ Bug fix: `st.echarts_chart` default colors are readable in dark mode. Candlestick charts also use green for rising and red for falling, matching `st.plotly_chart` ([#17750](https://github.com/streamlit/streamlit/pull/17750)).
- 🪳 Bug fix: Altair and Vega-Lite charts restore their interval brush rectangle after remounting or switching to fullscreen ([#17744](https://github.com/streamlit/streamlit/pull/17744)).
- 🪰 Bug fix: Element toolbars, like the one on `st.dataframe`, appear above an overlapping `st.segmented_control` option and stay clickable ([#17734](https://github.com/streamlit/streamlit/pull/17734)).
- 🦠 Bug fix: Printed apps follow the on-screen layout without charts, cards, metrics, or the sidebar overlapping or getting clipped ([#17727](https://github.com/streamlit/streamlit/pull/17727)).
- 🦟 Bug fix: `st.pydeck_chart` resets its camera when a rerun changes the chart's views, such as from a map view to a globe view ([#17701](https://github.com/streamlit/streamlit/pull/17701)).
- 🦂 Bug fix: Errors and docs for `@st.fragment(parallel=True)` no longer suggest writing to outside containers, which parallel fragments don't support ([#17688](https://github.com/streamlit/streamlit/pull/17688), [#17612](https://github.com/streamlit/streamlit/issues/17612)).
- 🦗 Bug fix: When script runs overlap, the frontend applies each run's completion to the run that finished, so stale elements are cleaned up correctly and `st.chat_input` and `st.text_input` re-enable at the right time ([#17686](https://github.com/streamlit/streamlit/pull/17686)).
- 🕸️ Bug fix: `st.dataframe`, `st.table`, and `st.data_editor` correctly display decimals, periods, intervals, categoricals, and other Arrow types ([#17684](https://github.com/streamlit/streamlit/pull/17684), [#5864](https://github.com/streamlit/streamlit/issues/5864)).
- 🐌 Bug fix: `st.plotly_chart(theme=None)` no longer applies the app's theme fonts and backgrounds, so light figures stay readable in dark mode ([#17671](https://github.com/streamlit/streamlit/pull/17671), [#17665](https://github.com/streamlit/streamlit/issues/17665)).
- 🦎 Bug fix: Custom themes that don't set `textColor` no longer log an invalid sidebar color warning in the browser console ([#17669](https://github.com/streamlit/streamlit/pull/17669), [#17638](https://github.com/streamlit/streamlit/issues/17638)).
- 🦀 Bug fix: When two pages in `st.navigation` resolve to the same URL pathname, the error names both pages ([#17646](https://github.com/streamlit/streamlit/pull/17646)).
- 👽 Bug fix: `st.feedback` supports the `persist_state` and `bind` parameters like other input widgets ([#17621](https://github.com/streamlit/streamlit/pull/17621)).
- 🐛 Bug fix: A `snowflake-callers-rights` connection raises an error if it's used from a session other than the one that created it, so queries can't run with another user's identity ([#17584](https://github.com/streamlit/streamlit/pull/17584)).
- 🦋 Bug fix: `st.audio_input` in the sidebar no longer shows an error after a successful recording ([#17583](https://github.com/streamlit/streamlit/pull/17583), [#17585](https://github.com/streamlit/streamlit/issues/17585)).
- 🪲 Bug fix: Help tooltips no longer open and stick when their trigger gets focus from a mouse click, such as after closing an `st.dialog` ([#17581](https://github.com/streamlit/streamlit/pull/17581), [#17562](https://github.com/streamlit/streamlit/issues/17562)).
- 🐜 Bug fix: Calling `.toast()` on the object returned by `st.toast` updates the toast in place again ([#17580](https://github.com/streamlit/streamlit/pull/17580), [#17522](https://github.com/streamlit/streamlit/issues/17522)).
- 🐝 Bug fix: The `st.chat_input` audio waveform stays visible after the text area expands, and recording works with a custom `height` ([#17579](https://github.com/streamlit/streamlit/pull/17579), [#17528](https://github.com/streamlit/streamlit/issues/17528)).
- 🐞 Bug fix: The error for a fragment writing to an outside container without a reserved position explains how to reserve one ([#17577](https://github.com/streamlit/streamlit/pull/17577), [#17563](https://github.com/streamlit/streamlit/issues/17563)).
- 🕷️ Bug fix: The "File change" prompt no longer goes missing when run on save is off ([#17551](https://github.com/streamlit/streamlit/pull/17551)).
- 🪳 Bug fix: The default time slider can reach the end of the day, and other sliders can reach a maximum that falls just past their last full step ([#17504](https://github.com/streamlit/streamlit/pull/17504), [#17494](https://github.com/streamlit/streamlit/issues/17494)).
- 🪰 Bug fix: Type hints for `st.components` match their runtime behavior ([#17501](https://github.com/streamlit/streamlit/pull/17501)).
- 🦠 Bug fix: Top navigation section dropdowns support arrow-key navigation and follow the expected Tab order, and Tab skips links hidden in the overflow menu ([#17423](https://github.com/streamlit/streamlit/pull/17423), [#17482](https://github.com/streamlit/streamlit/pull/17482), [#17339](https://github.com/streamlit/streamlit/issues/17339)).
- 🦟 Bug fix: Type checkers report unknown container methods, like `st.sidebar.echo()`, as errors ([#17475](https://github.com/streamlit/streamlit/pull/17475)).
- 🦂 Bug fix: Custom Components v2 events, `st.menu_button` selections, and `ButtonColumn` clicks are no longer lost when another widget updates while their rerun is queued ([#17471](https://github.com/streamlit/streamlit/pull/17471), [#17215](https://github.com/streamlit/streamlit/issues/17215)).
- 🦗 Bug fix: After `st.logout()`, a reconnecting client can't resume the logged-out session or its Session State ([#17310](https://github.com/streamlit/streamlit/pull/17310)).
- 🕸️ Bug fix: Timedelta columns in `st.dataframe` and `st.data_editor` display as readable durations, sort by value, and can be edited. `NumberColumn` also has a new `"duration"` format ([#16722](https://github.com/streamlit/streamlit/pull/16722), [#8949](https://github.com/streamlit/streamlit/issues/8949), [#9751](https://github.com/streamlit/streamlit/issues/9751)).

## Older versions of Streamlit

- [2026 release notes](/develop/quick-reference/release-notes/2026)
- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
