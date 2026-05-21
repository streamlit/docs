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

## **Version 1.57.0 (latest)**

_Release date: April 29, 2026_

**Highlights**

- 🚀 Introducing Starlette as the default web server! Streamlit now uses Starlette/Uvicorn instead of Tornado, bringing improved ASGI compatibility, better performance, and access to the modern Python async ecosystem. The underlying server is also exposed via `st.App` for advanced configuration ([#14553](https://github.com/streamlit/streamlit/pull/14553), [#439](https://github.com/streamlit/streamlit/issues/439), [#861](https://github.com/streamlit/streamlit/issues/861)).
- 🍿 Introducing [`st.bottom`](/develop/api-reference/layout/st.bottom) — a pinned container at the bottom of your app, perfect for chat inputs, toolbars, and persistent controls ([#14726](https://github.com/streamlit/streamlit/pull/14726), [#8564](https://github.com/streamlit/streamlit/issues/8564), [#8185](https://github.com/streamlit/streamlit/issues/8185)).

**Notable Changes**

- ✨ Introducing the `:shimmer[]` markdown directive — add animated loading text to your apps with `st.markdown(":shimmer[Loading...]")` for a polished streaming experience ([#14055](https://github.com/streamlit/streamlit/pull/14055), [#13247](https://github.com/streamlit/streamlit/issues/13247)).
- ⚡ Direct Polars-to-Arrow conversion now bypasses pandas entirely, improving performance and type fidelity for Polars DataFrames ([#14885](https://github.com/streamlit/streamlit/pull/14885), [#12913](https://github.com/streamlit/streamlit/issues/12913)).
- 👻 Removed deprecated `spec`, `use_container_width`, and `sharing` keyword arguments from [`st.plotly_chart`](/develop/api-reference/charts/st.plotly_chart) and [`st.vega_lite_chart`](/develop/api-reference/charts/st.vega_lite_chart) ([#14800](https://github.com/streamlit/streamlit/pull/14800)).
- 👻 Removed the deprecated `_get_websocket_headers` function. Use `st.context.headers` instead ([#14801](https://github.com/streamlit/streamlit/pull/14801)).
- 🧪 [`st.testing.v1.AppTest`](/develop/api-reference/app-testing/st.testing.v1.apptest) now supports [`st.pills`](/develop/api-reference/widgets/st.pills), [`st.segmented_control`](/develop/api-reference/widgets/st.segmented_control), and `st.dataframe` key lookups ([#14518](https://github.com/streamlit/streamlit/pull/14518), [#11361](https://github.com/streamlit/streamlit/issues/11361), [#11338](https://github.com/streamlit/streamlit/issues/11338)).
- 🔔 Alert elements (`st.info`, `st.warning`, `st.error`, `st.success`) have a new `title` parameter for adding a bold header to alert messages ([#14665](https://github.com/streamlit/streamlit/pull/14665), [#12417](https://github.com/streamlit/streamlit/issues/12417)).
- 🎨 [`st.menu_button`](/develop/api-reference/widgets/st.menu_button) and [`st.popover`](/develop/api-reference/layout/st.popover) now hide the chevron when using menu-style icon-only labels ([#14697](https://github.com/streamlit/streamlit/pull/14697)).
- 🎯 `st.App` is now available in the `st` namespace for programmatic app configuration ([#14722](https://github.com/streamlit/streamlit/pull/14722)).
- 🔑 `st.App` has a new `secrets` parameter to programmatically pass secrets instead of relying on `secrets.toml` files ([#14861](https://github.com/streamlit/streamlit/pull/14861), [#10543](https://github.com/streamlit/streamlit/issues/10543)).
- 🤖 Streamlit now bundles developing-with-streamlit AI agent skills in the pip package:
  - Core development skills for AI coding assistants ([#14745](https://github.com/streamlit/streamlit/pull/14745)).
  - App and theme templates for quick scaffolding ([#14746](https://github.com/streamlit/streamlit/pull/14746)).
- 💅 `st.video` and `st.map` now have rounded corners matching other Streamlit elements ([#14781](https://github.com/streamlit/streamlit/pull/14781), [#12806](https://github.com/streamlit/streamlit/issues/12806)).

**Other Changes**

- 🐛 Bug fix: [`st.dataframe`](/develop/api-reference/data/st.dataframe) no longer crashes with pandas 3 `ArrowStringArray` columns ([#14611](https://github.com/streamlit/streamlit/pull/14611), [#14609](https://github.com/streamlit/streamlit/issues/14609)).
- 🦋 Bug fix: Custom component v1 serialization now correctly downcasts large Arrow types instead of failing ([#14617](https://github.com/streamlit/streamlit/pull/14617), [#14608](https://github.com/streamlit/streamlit/issues/14608)).
- 🪲 Bug fix: `@st.cache_data` and `@st.cache_resource` now chain the original exception in `UnserializableReturnValueError` for better debugging ([#14655](https://github.com/streamlit/streamlit/pull/14655), [#14654](https://github.com/streamlit/streamlit/issues/14654)). Thanks, [mango766](https://github.com/mango766)!
- 🐜 Bug fix: CSS Color Level 4 color functions (`oklch`, `lab`, etc.) are now supported in color parameters ([#14674](https://github.com/streamlit/streamlit/pull/14674), [#14573](https://github.com/streamlit/streamlit/issues/14573)).
- 🐝 Bug fix: Query parameter space encoding is now consistent across all operations ([#14691](https://github.com/streamlit/streamlit/pull/14691), [#14671](https://github.com/streamlit/streamlit/issues/14671)).
- 🐞 Bug fix: [`st.data_editor`](/develop/api-reference/data/st.data_editor) correctly preserves `None` values with pandas 3.0+ ([#14694](https://github.com/streamlit/streamlit/pull/14694), [#14693](https://github.com/streamlit/streamlit/issues/14693)).
- 🕷️ Bug fix: Namespace package children are now correctly evicted when watched source files reload ([#14708](https://github.com/streamlit/streamlit/pull/14708), [#14704](https://github.com/streamlit/streamlit/issues/14704)).
- 🪳 Bug fix: [`st.radio`](/develop/api-reference/widgets/st.radio) now retains selections when using `format_func` with custom option objects ([#14815](https://github.com/streamlit/streamlit/pull/14815), [#14814](https://github.com/streamlit/streamlit/issues/14814)).
- 🪰 Bug fix: [`st.bar_chart`](/develop/api-reference/charts/st.bar_chart) axis labels now correctly swap when `horizontal=True` ([#14866](https://github.com/streamlit/streamlit/pull/14866), [#14830](https://github.com/streamlit/streamlit/issues/14830)).
- 🦠 Bug fix: [`st.text_area`](/develop/api-reference/widgets/st.text_area) with `height="content"` now sizes correctly on initial load ([#14884](https://github.com/streamlit/streamlit/pull/14884), [#14876](https://github.com/streamlit/streamlit/issues/14876)).
- 🦟 Bug fix: [`st.file_uploader`](/develop/api-reference/widgets/st.file_uploader) no longer shows duplicate equivalent file extensions in the accepted types display ([#14552](https://github.com/streamlit/streamlit/pull/14552), [#11991](https://github.com/streamlit/streamlit/issues/11991)).

## **Version 1.56.0**

_Release date: March 31, 2026_

**Highlights**

- 🍿 Introducing [`st.menu_button`](/develop/api-reference/widgets/st.menu_button) — a new widget that renders a dropdown button with a customizable popover container for building menus, toolbars, and action lists ([#13981](https://github.com/streamlit/streamlit/pull/13981), [#11409](https://github.com/streamlit/streamlit/issues/11409)).
- 🎁 Introducing [`st.iframe`](/develop/api-reference/text/st.iframe) — embed external URLs or raw HTML content directly in your app using an iframe ([#14433](https://github.com/streamlit/streamlit/pull/14433), [#12977](https://github.com/streamlit/streamlit/issues/12977)).
- 🔍 [`st.selectbox`](/develop/api-reference/widgets/st.selectbox) and [`st.multiselect`](/develop/api-reference/widgets/st.multiselect) now support a `filter_mode` parameter that lets users search and filter options by typing ([#14537](https://github.com/streamlit/streamlit/pull/14537), [#6160](https://github.com/streamlit/streamlit/issues/6160), [#7238](https://github.com/streamlit/streamlit/issues/7238)).

**Notable Changes**

- 📊 [`st.dataframe`](/develop/api-reference/data/st.dataframe) supports programmatically setting selections via the `selection` parameter ([#13594](https://github.com/streamlit/streamlit/pull/13594), [#10128](https://github.com/streamlit/streamlit/issues/10128)).
- 🎯 `st.dataframe` has a new `"single-row-required"` selection mode that always keeps exactly one row selected ([#14288](https://github.com/streamlit/streamlit/pull/14288), [#9253](https://github.com/streamlit/streamlit/issues/9253)).
- 📐 [`st.dataframe`](/develop/api-reference/data/st.dataframe) column configuration now supports an `alignment` parameter for controlling text alignment in columns ([#14333](https://github.com/streamlit/streamlit/pull/14333), [#12106](https://github.com/streamlit/streamlit/issues/12106)).
- 👀 The column visibility menu in `st.dataframe` is now always visible, making it easier to show and hide columns ([#14336](https://github.com/streamlit/streamlit/pull/14336), [#10649](https://github.com/streamlit/streamlit/issues/10649)).
- 🎹 `AudioColumn` and `VideoColumn` are now available in [`st.column_config`](/develop/api-reference/data/st.column_config) for displaying audio and video players directly in dataframes ([#14032](https://github.com/streamlit/streamlit/pull/14032), [#8345](https://github.com/streamlit/streamlit/issues/8345)).
- 🐍 Streamlit now supports pandas 3.x ([#13812](https://github.com/streamlit/streamlit/pull/13812), [#13211](https://github.com/streamlit/streamlit/issues/13211)).
- 🧭 [`st.navigation`](/develop/api-reference/navigation/st.navigation) has a new `expanded` parameter to control how many sidebar items are visible before collapsing ([#14051](https://github.com/streamlit/streamlit/pull/14051), [#9646](https://github.com/streamlit/streamlit/issues/9646)).
- 🔗 [`st.Page`](/develop/api-reference/navigation/st.page) now accepts external URLs, allowing you to add links to external sites in the navigation sidebar ([#13691](https://github.com/streamlit/streamlit/pull/13691), [#9025](https://github.com/streamlit/streamlit/issues/9025)). Thanks, [t0k0shi](https://github.com/t0k0shi)!
- 🖼 [`st.table`](/develop/api-reference/data/st.table) has new `hide_index` and `hide_header` parameters for cleaner table presentation ([#14113](https://github.com/streamlit/streamlit/pull/14113), [#8235](https://github.com/streamlit/streamlit/issues/8235), [#9251](https://github.com/streamlit/streamlit/issues/9251)).
- ⚡ [`st.link_button`](/develop/api-reference/widgets/st.link_button) now supports an `on_click` callback that triggers a rerun before navigating ([#14116](https://github.com/streamlit/streamlit/pull/14116), [#7453](https://github.com/streamlit/streamlit/issues/7453)).
- 📁 [`st.file_uploader`](/develop/api-reference/widgets/st.file_uploader) and [`st.chat_input`](/develop/api-reference/chat/st.chat_input) now accept file type shortcuts like `"image"`, `"audio"`, `"video"`, and `"document"` ([#14140](https://github.com/streamlit/streamlit/pull/14140)).
- 📏 `st.chat_input` has a new `height` parameter to control the initial height of the text area ([#14165](https://github.com/streamlit/streamlit/pull/14165), [#10724](https://github.com/streamlit/streamlit/issues/10724)).
- ✨ Alert elements (`st.info`, `st.warning`, `st.error`, `st.success`) now automatically extract a leading Material icon from the message body and display it as the alert icon ([#14173](https://github.com/streamlit/streamlit/pull/14173), [#10892](https://github.com/streamlit/streamlit/issues/10892)).
- 🪄 Streaming markdown now auto-completes incomplete syntax (e.g., unclosed bold, links, or code blocks) during streaming for a cleaner reading experience ([#13939](https://github.com/streamlit/streamlit/pull/13939)).
- 🏷 [`st.pills`](/develop/api-reference/widgets/st.pills) and [`st.segmented_control`](/develop/api-reference/widgets/st.segmented_control) now have a `required` parameter to enforce that at least one option is always selected ([#14414](https://github.com/streamlit/streamlit/pull/14414), [#9870](https://github.com/streamlit/streamlit/issues/9870)).
- 🔄 [`st.container`](/develop/api-reference/layout/st.container) has a new `autoscroll` parameter that automatically scrolls to the bottom as new content is added ([#14502](https://github.com/streamlit/streamlit/pull/14502), [#8836](https://github.com/streamlit/streamlit/issues/8836)).
- 🧩 `st.tabs`, `st.expander`, and `st.popover` now preserve their open/closed state across reruns ([#14332](https://github.com/streamlit/streamlit/pull/14332), [#14356](https://github.com/streamlit/streamlit/pull/14356)).
- 🛠 Static files served via `st.static/` now use native content types instead of a generic fallback ([#14090](https://github.com/streamlit/streamlit/pull/14090)).
- 🎥 Media elements now support relative static file serving URLs (e.g., `/app/static/video.mp4`) ([#14317](https://github.com/streamlit/streamlit/pull/14317), [#12104](https://github.com/streamlit/streamlit/issues/12104)).
- 🧪 `st.file_uploader` is now supported in AppTest for programmatic testing of file upload flows ([#14341](https://github.com/streamlit/streamlit/pull/14341), [#8093](https://github.com/streamlit/streamlit/issues/8093)).
- 🔧 Widget state duplication warnings are now logged to the console instead of displayed in the app UI ([#14141](https://github.com/streamlit/streamlit/pull/14141)).
- 📦 `BidiComponentResult` has been renamed to `ComponentResult` in the custom components v2 API ([#14253](https://github.com/streamlit/streamlit/pull/14253)).
- ⚙ The `_stcore/metrics` endpoint is now fully OpenMetrics-compliant ([#14538](https://github.com/streamlit/streamlit/pull/14538)).

**Other Changes**

- 🐛 Bug fix: Streamlit can now run with Python optimization flags (`-O` / `-OO`) ([#14171](https://github.com/streamlit/streamlit/pull/14171), [#14155](https://github.com/streamlit/streamlit/issues/14155)).
- 🦋 Bug fix: Reduced false-positive file change detections on Windows by adding a stability check to the file watcher ([#14174](https://github.com/streamlit/streamlit/pull/14174), [#13954](https://github.com/streamlit/streamlit/issues/13954)).
- 🪲 Bug fix: `st.text_area` with `height="content"` now correctly auto-sizes to fit content ([#14228](https://github.com/streamlit/streamlit/pull/14228), [#14222](https://github.com/streamlit/streamlit/issues/14222)).
- 🐜 Bug fix: Stale anchor links are no longer preserved when clearing transient nodes ([#14251](https://github.com/streamlit/streamlit/pull/14251), [#14249](https://github.com/streamlit/streamlit/issues/14249)).
- 🐝 Bug fix: `BidiComponentManager` is now properly initialized in AppTest mock runtime ([#14301](https://github.com/streamlit/streamlit/pull/14301), [#14274](https://github.com/streamlit/streamlit/issues/14274)). Thanks, [tysoncung](https://github.com/tysoncung)!
- 🐞 Bug fix: Streamlit is now compatible with Python 3.14's PEP 649 deferred annotation evaluation ([#14327](https://github.com/streamlit/streamlit/pull/14327), [#14324](https://github.com/streamlit/streamlit/issues/14324)).
- 🕷️ Bug fix: Tooltips on selected `st.multiselect` options are now restored ([#14353](https://github.com/streamlit/streamlit/pull/14353), [#14351](https://github.com/streamlit/streamlit/issues/14351)).
- 🪳 Bug fix: `server.port` is now correctly updated after binding to port 0 ([#14372](https://github.com/streamlit/streamlit/pull/14372), [#11308](https://github.com/streamlit/streamlit/issues/11308)). Thanks, [joanaarnauth](https://github.com/joanaarnauth)!
- 🪰 Bug fix: Bound query params are now correctly restored in the URL when navigating in multi-page apps ([#14374](https://github.com/streamlit/streamlit/pull/14374), [#14350](https://github.com/streamlit/streamlit/issues/14350)).
- 🦠 Bug fix: Restored the `reactJsonViewCompat` shim for the local dev server ([#14391](https://github.com/streamlit/streamlit/pull/14391)).
- 🦟 Bug fix: `st.exception` links no longer overflow their container at small viewport widths ([#14417](https://github.com/streamlit/streamlit/pull/14417), [#12870](https://github.com/streamlit/streamlit/issues/12870)).
- 🦂 Bug fix: Headings inside horizontal containers (`st.columns`) no longer have extra top padding ([#14419](https://github.com/streamlit/streamlit/pull/14419), [#12434](https://github.com/streamlit/streamlit/issues/12434)).
- 🦗 Bug fix: Programmatic dataframe selections now return `AttributeDictionary` for consistent dot-notation access ([#14455](https://github.com/streamlit/streamlit/pull/14455), [#14454](https://github.com/streamlit/streamlit/issues/14454)).
- 🕸️ Bug fix: Streaming markdown with color directives no longer shows rendering artifacts ([#14468](https://github.com/streamlit/streamlit/pull/14468), [#14460](https://github.com/streamlit/streamlit/issues/14460)).
- 🐌 Bug fix: The `session_duration` metric is now OpenMetrics-compliant ([#14476](https://github.com/streamlit/streamlit/pull/14476), [#14432](https://github.com/streamlit/streamlit/issues/14432)).
- 🦎 Bug fix: The main menu now has a visible border in dark mode ([#14529](https://github.com/streamlit/streamlit/pull/14529)).

## Older versions of Streamlit

- [2026 release notes](/develop/quick-reference/release-notes/2026)
- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
