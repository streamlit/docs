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

## **Version 1.58.0 (latest)**

_Release date: May 28, 2026_

**Highlights**

- 🌟 Introducing `parallel=True` for [`@st.fragment`](/develop/api-reference/execution-flow/st.fragment), which lets fragments run concurrently for more responsive apps and background-style workflows ([#15214](https://github.com/streamlit/streamlit/pull/15214)).
- 🍿 Introducing `st.pagination` to help you build paged interfaces, e.g. for dataframes ([#14975](https://github.com/streamlit/streamlit/pull/14975), [#10785](https://github.com/streamlit/streamlit/issues/10785)).
- 🚀 Announcing `streamlit skills`, a new CLI command for installing AI agent skills ([#15116](https://github.com/streamlit/streamlit/pull/15116)).

**Notable Changes**

- 🔔 `st.App` now supports custom script error handling, letting you attach a custom exception handler to your app ([#14972](https://github.com/streamlit/streamlit/pull/14972), [#3426](https://github.com/streamlit/streamlit/issues/3426), [#8713](https://github.com/streamlit/streamlit/issues/8713)).
- 📐 [`st.expander`](/develop/api-reference/layout/st.expander) and [`st.status`](/develop/api-reference/status/st.status) have a new `type` parameter for a more compact visual style ([#14054](https://github.com/streamlit/streamlit/pull/14054), [#13246](https://github.com/streamlit/streamlit/issues/13246)).
- 👻 The deprecated `element.add_rows` feature has been removed ([#15034](https://github.com/streamlit/streamlit/pull/15034), [#299](https://github.com/streamlit/streamlit/issues/299), [#13063](https://github.com/streamlit/streamlit/issues/13063), [#7994](https://github.com/streamlit/streamlit/issues/7994), [#5860](https://github.com/streamlit/streamlit/issues/5860)).
- 👻 LangChain callback handler integration has been removed ([#15051](https://github.com/streamlit/streamlit/pull/15051)).

**Other Changes**

- 🐛 Query-parameter-bound widgets now keep the URL in sync when their values change through Session State ([#14744](https://github.com/streamlit/streamlit/pull/14744)).
- 🖌 Widget and icon sizing is more consistent across the app ([#15056](https://github.com/streamlit/streamlit/pull/15056), [#15098](https://github.com/streamlit/streamlit/pull/15098), [#13945](https://github.com/streamlit/streamlit/issues/13945)).
- ⏱ Streamlit reduces the timeout for external IP lookups to avoid startup freezes when the lookup is slow or unavailable ([#14984](https://github.com/streamlit/streamlit/pull/14984)).
- 🛡 [`st.markdown`](/develop/api-reference/text/st.markdown) now blocks `javascript:` and `vbscript:` URLs in Markdown links ([#15161](https://github.com/streamlit/streamlit/pull/15161)).
- 🐛 Bug fix: Streamlit now supports symlinks in Starlette static file serving ([#15112](https://github.com/streamlit/streamlit/pull/15112), [#13600](https://github.com/streamlit/streamlit/issues/13600)).
- 🦋 Bug fix: Fragment apps no longer crash because of stale auto-reruns ([#15130](https://github.com/streamlit/streamlit/pull/15130), [#15084](https://github.com/streamlit/streamlit/issues/15084)).
- 🪲 Bug fix: `blake2b` hashing now uses `usedforsecurity=False` for FIPS-compatible environments ([#15149](https://github.com/streamlit/streamlit/pull/15149), [#15148](https://github.com/streamlit/streamlit/issues/15148)). Thanks, [andriykislitsyn](https://github.com/andriykislitsyn)!
- 🐜 Bug fix: [`st.login`](/develop/api-reference/user/st.login) cookies now restore 30-day persistence with a `Max-Age` value ([#15194](https://github.com/streamlit/streamlit/pull/15194), [#15193](https://github.com/streamlit/streamlit/issues/15193)). Thanks, [GiovanniPaoloGibilisco](https://github.com/GiovanniPaoloGibilisco)!
- 🐝 Bug fix: OAuth PKCE behavior has been restored in the Starlette-based auth flow ([#15282](https://github.com/streamlit/streamlit/pull/15282), [#15115](https://github.com/streamlit/streamlit/issues/15115)).
- 🐞 Bug fix: OAuth no longer regresses with `MismatchingStateError` after upgrading to 1.57.0 ([#15048](https://github.com/streamlit/streamlit/pull/15048), [#14991](https://github.com/streamlit/streamlit/issues/14991)).
- 🕷️ Bug fix: Provider tokens now use `joserfc`, improving auth compatibility and token handling ([#15178](https://github.com/streamlit/streamlit/pull/15178), [#15170](https://github.com/streamlit/streamlit/issues/15170)).
- 🪳 Bug fix: [`st.vega_lite_chart`](/develop/api-reference/charts/st.vega_lite_chart) tooltips work again inside dialogs ([#15191](https://github.com/streamlit/streamlit/pull/15191), [#12390](https://github.com/streamlit/streamlit/issues/12390)). Thanks, [marawanokasha](https://github.com/marawanokasha)!
- 🪰 Bug fix: [`st.button`](/develop/api-reference/widgets/st.button) warns when a keyboard shortcut is reserved by the browser ([#15217](https://github.com/streamlit/streamlit/pull/15217), [#15216](https://github.com/streamlit/streamlit/issues/15216)).
- 🦠 Bug fix: [`st.markdown`](/develop/api-reference/text/st.markdown) shows its help icon again when `unsafe_allow_html=True` ([#15232](https://github.com/streamlit/streamlit/pull/15232), [#15211](https://github.com/streamlit/streamlit/issues/15211)).
- 🦟 Bug fix: Browser Back/Forward navigation now works for pages with Unicode URL paths ([#15281](https://github.com/streamlit/streamlit/pull/15281), [#15267](https://github.com/streamlit/streamlit/issues/15267)).
- 🦂 Bug fix: Programmatically closed popovers and expanders no longer reopen when you interact with another container ([#14945](https://github.com/streamlit/streamlit/pull/14945), [#14943](https://github.com/streamlit/streamlit/issues/14943)).
- 🦗 Bug fix: [`st.selectbox`](/develop/api-reference/widgets/st.selectbox) no longer hides its first option when exactly seven options are selected ([#14997](https://github.com/streamlit/streamlit/pull/14997), [#14989](https://github.com/streamlit/streamlit/issues/14989)).
- 🕸️ Bug fix: [`st.multiselect`](/develop/api-reference/widgets/st.multiselect) disables "Select all" for very large option lists to avoid performance problems ([#15301](https://github.com/streamlit/streamlit/pull/15301), [#14918](https://github.com/streamlit/streamlit/issues/14918), [#15299](https://github.com/streamlit/streamlit/issues/15299)).
- 🐌 Bug fix: Tables, dataframes, and data editors no longer accidentally overscroll during interaction ([#15309](https://github.com/streamlit/streamlit/pull/15309)). Thanks, [kantuni](https://github.com/kantuni)!

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
