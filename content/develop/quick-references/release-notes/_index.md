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

## **Version 1.59.0 (latest)**

_Release date: July 6, 2026_

**Highlights**

- ✨ Introducing [`ButtonColumn`](/develop/api-reference/data/st.column_config/st.column_config.buttoncolumn) — a new column type for [`st.dataframe`](/develop/api-reference/data/st.dataframe) and [`st.data_editor`](/develop/api-reference/data/st.data_editor) that renders clickable buttons inside table cells, letting users trigger actions directly from a row ([#14544](https://github.com/streamlit/streamlit/pull/14544), [#7015](https://github.com/streamlit/streamlit/issues/7015)).
- 📊 [`st.dataframe`](/develop/api-reference/data/st.dataframe) has a new column statistics submenu — click the dropdown icon in any column header to see per-column summary stats ([#14307](https://github.com/streamlit/streamlit/pull/14307), [#13148](https://github.com/streamlit/streamlit/issues/13148)).
- 🍿 Introducing [`st.skeleton`](/develop/api-reference/status/st.skeleton) — a new element that renders animated loading placeholders, making it easy to give users visual feedback while content is loading ([#15169](https://github.com/streamlit/streamlit/pull/15169), [#8032](https://github.com/streamlit/streamlit/issues/8032)).
- 🎨 Introducing [`st.mermaid_chart`](/develop/api-reference/charts/st.mermaid_chart) — render Mermaid diagrams directly in your app, letting you embed flowcharts, sequence diagrams, and more. Mermaid also works from [`st.markdown`](/develop/api-reference/text/st.markdown) ([#14022](https://github.com/streamlit/streamlit/pull/14022), [#10721](https://github.com/streamlit/streamlit/issues/10721)).

**Notable Changes**

- 🎛 [`st.chat_input`](/develop/api-reference/chat/st.chat_input) has a new `submit_mode` parameter that controls widget behavior after the user submits a message, e.g. showing a stop button or disabling the chat input ([#14344](https://github.com/streamlit/streamlit/pull/14344), [#8323](https://github.com/streamlit/streamlit/issues/8323), [#11854](https://github.com/streamlit/streamlit/issues/11854)).
- 📋 [`st.dataframe`](/develop/api-reference/data/st.dataframe) and [`st.data_editor`](/develop/api-reference/data/st.data_editor) support a new [`MarkdownColumn`](/develop/api-reference/data/st.column_config/st.column_config.markdowncolumn) type in `st.column_config` that renders Markdown text inside table cells ([#13931](https://github.com/streamlit/streamlit/pull/13931), [#10211](https://github.com/streamlit/streamlit/issues/10211)).
- 🔗 [`st.markdown`](/develop/api-reference/text/st.markdown) has a new `anchors` parameter for adding linkable heading anchors to Markdown content ([#15722](https://github.com/streamlit/streamlit/pull/15722), [#13913](https://github.com/streamlit/streamlit/issues/13913)).
- 💻 You can now launch Streamlit apps directly with `python app.py` or `uv run app.py` using the new `App.run()` entry point — no more `streamlit run` required ([#15563](https://github.com/streamlit/streamlit/pull/15563), [#9450](https://github.com/streamlit/streamlit/issues/9450), [#11420](https://github.com/streamlit/streamlit/issues/11420)).
- 🧩 [`st.fragment`](/develop/api-reference/execution-flow/st.fragment) can now write to containers defined outside the fragment. Fragments can update any part of your app — including elements created before the fragment — without triggering a full rerun ([#15623](https://github.com/streamlit/streamlit/pull/15623), [#15620](https://github.com/streamlit/streamlit/pull/15620), [#10481](https://github.com/streamlit/streamlit/issues/10481)).
- 📎 [`st.chat_input`](/develop/api-reference/chat/st.chat_input) now supports pasting files directly into the input field ([#15558](https://github.com/streamlit/streamlit/pull/15558), [#10307](https://github.com/streamlit/streamlit/issues/10307)).
- 🤖 [`st.write_stream`](/develop/api-reference/write-magic/st.write_stream) now supports OpenAI Responses API streams in addition to the existing Chat Completions streams ([#15559](https://github.com/streamlit/streamlit/pull/15559), [#11061](https://github.com/streamlit/streamlit/issues/11061)).
- 🔒 [`st.set_page_config`](/develop/api-reference/configuration/st.set_page_config) supports a new `"locked"` option for `initial_sidebar_state` that prevents users from toggling the sidebar open or closed ([#15459](https://github.com/streamlit/streamlit/pull/15459), [#15411](https://github.com/streamlit/streamlit/issues/15411)).
- 💅 Widgets have a new `persist_state` parameter for finer control over how widget state is preserved across reruns ([#15645](https://github.com/streamlit/streamlit/pull/15645)).
- 📷 [`st.camera_input`](/develop/api-reference/widgets/st.camera_input) has a new `resolution` parameter to control the captured image resolution ([#15766](https://github.com/streamlit/streamlit/pull/15766), [#4320](https://github.com/streamlit/streamlit/issues/4320)).
- 🧪 [`AppTest`](/develop/api-reference/app-testing/st.testing.v1.apptest) now supports testing `st.download_button` and `st.image` ([#15528](https://github.com/streamlit/streamlit/pull/15528), [#9003](https://github.com/streamlit/streamlit/issues/9003)).
- 💾 Programmatic secrets now support list values ([#15491](https://github.com/streamlit/streamlit/pull/15491)).
- ⌨ You can now look up Streamlit API documentation from the CLI with `streamlit docs <command>` ([#15547](https://github.com/streamlit/streamlit/pull/15547)).
- 🔐 A new `server.xsrfCookieSameSite` config option lets you customize the `SameSite` attribute of the XSRF cookie for deployments with specific cross-site requirements ([#15634](https://github.com/streamlit/streamlit/pull/15634), [#5793](https://github.com/streamlit/streamlit/issues/5793), [#9397](https://github.com/streamlit/streamlit/issues/9397)).
- 💡 Streamlit now recommends installing AI coding skills on app startup to improve your development workflow with AI coding assistants ([#15437](https://github.com/streamlit/streamlit/pull/15437), [#15473](https://github.com/streamlit/streamlit/pull/15473)).
- ⚙ The `/_stcore/metrics` endpoint now reports memory stats in a less detailed (cheaper) form by default ([#15472](https://github.com/streamlit/streamlit/pull/15472)).
- 👻 The deprecated Snowpark connection type has been removed. Migrate to a supported connection type ([#15784](https://github.com/streamlit/streamlit/pull/15784)).
- 👻 The deprecated [`st.bokeh_chart`](/develop/api-reference/charts/st.bokeh_chart) command has been removed. Use the [`streamlit-bokeh`](https://github.com/streamlit/streamlit-bokeh) component instead ([#15636](https://github.com/streamlit/streamlit/pull/15636)).

**Other Changes**

- ⚡ VegaLite charts now use Vega's native resize API for faster rendering when the container size changes ([#15302](https://github.com/streamlit/streamlit/pull/15302)).
- 🎨 The pagination widget's selected-state styling has been redesigned ([#15550](https://github.com/streamlit/streamlit/pull/15550)).
- 🔧 Various fixes related to the Baseweb library removal ([#15737](https://github.com/streamlit/streamlit/pull/15737)).
- 🐛 Bug fix: The metrics endpoint no longer errors when SQLAlchemy connections are present ([#15334](https://github.com/streamlit/streamlit/pull/15334)).
- 🦋 Bug fix: `@st.fragment(run_every=...)` no longer raises a `TypeError` in `_run_with_thread_state` ([#15376](https://github.com/streamlit/streamlit/pull/15376)).
- 🪲 Bug fix: Named Snowflake connections defined in config files are now correctly discovered and used ([#15382](https://github.com/streamlit/streamlit/pull/15382)).
- 🐜 Bug fix: P-mode PIL palette images are now hashed correctly to prevent hash collisions ([#15397](https://github.com/streamlit/streamlit/pull/15397)).
- 🐝 Bug fix: The server now correctly binds to IPv6 dual-stack wildcards for the default address ([#15400](https://github.com/streamlit/streamlit/pull/15400)).
- 🐞 Bug fix: Stale and invalid auth cookies are now cleared on login ([#15420](https://github.com/streamlit/streamlit/pull/15420)).
- 🕷️ Bug fix: `widgetMgr` is synced correctly to fix lazy loading in `tab.open` ([#15460](https://github.com/streamlit/streamlit/pull/15460)).
- 🪳 Bug fix: Installed Custom Component v2 components are now correctly discovered in `AppTest` ([#15488](https://github.com/streamlit/streamlit/pull/15488)).
- 🪰 Bug fix: [`st.pills`](/develop/api-reference/widgets/st.pills) and [`st.segmented_control`](/develop/api-reference/widgets/st.segmented_control) callbacks now fire correctly after selection ([#15522](https://github.com/streamlit/streamlit/pull/15522)).
- 🦠 Bug fix: The page title is no longer reset to the default on rerun ([#15527](https://github.com/streamlit/streamlit/pull/15527)).
- 🦟 Bug fix: The "Missing Submit Button" warning no longer flashes briefly on app load ([#15561](https://github.com/streamlit/streamlit/pull/15561)).
- 🦂 Bug fix: Streamlit now defaults to the polling file watcher in WSL environments, avoiding inotify issues ([#15562](https://github.com/streamlit/streamlit/pull/15562)).
- 🦗 Bug fix: `AppTest` now correctly handles formatted labels in `format_func` widgets ([#15564](https://github.com/streamlit/streamlit/pull/15564)).
- 🕸️ Bug fix: The invalid session upload error message now explains multi-replica deployment as a possible cause ([#15635](https://github.com/streamlit/streamlit/pull/15635)).
- 🐌 Bug fix: [`st.selectbox`](/develop/api-reference/widgets/st.selectbox) no longer loses its selection when `format_func` depends on object identity ([#15639](https://github.com/streamlit/streamlit/pull/15639)).
- 🦎 Bug fix: Pressing Escape no longer clears the current selection in [`st.multiselect`](/develop/api-reference/widgets/st.multiselect) ([#15646](https://github.com/streamlit/streamlit/pull/15646)).
- 🦀 Bug fix: `StreamlitPage` now validates that its `source` matches the registered page, catching misconfiguration earlier ([#15721](https://github.com/streamlit/streamlit/pull/15721), [#10572](https://github.com/streamlit/streamlit/issues/10572)).
- 👽 Bug fix: [`st.dataframe`](/develop/api-reference/data/st.dataframe) no longer intercepts the Ctrl+F keyboard shortcut when the search bar is disabled ([#15764](https://github.com/streamlit/streamlit/pull/15764)).
- 🐛 Bug fix: Column headers in [`st.dataframe`](/develop/api-reference/data/st.dataframe) no longer wrap text in the column header menu ([#15772](https://github.com/streamlit/streamlit/pull/15772)).

## Older versions of Streamlit

- [2026 release notes](/develop/quick-reference/release-notes/2026)
- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
