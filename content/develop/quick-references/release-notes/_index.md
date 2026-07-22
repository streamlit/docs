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

## **Version 1.60.0 (latest)**

_Release date: July 21, 2026_

**Highlights**

- ✨ You can now disable bulk data export app-wide with the new `client.disableDataExport` config option. When set, the CSV export button is hidden for [`st.dataframe`](/develop/api-reference/data/st.dataframe), [`st.data_editor`](/develop/api-reference/data/st.data_editor), and chart table views, and clipboard copy is disabled for read-only dataframes ([#15910](https://github.com/streamlit/streamlit/pull/15910), [#8402](https://github.com/streamlit/streamlit/issues/8402), [#11358](https://github.com/streamlit/streamlit/issues/11358)).

**Notable Changes**

- 🔒 Security hardening (**breaking changes**):
  - Streamlit now rejects host messages that appear to originate from child iframes or injected scripts, preventing origin spoofing (CWE-346) ([#15800](https://github.com/streamlit/streamlit/pull/15800)).
  - Client-supplied query strings are now capped at 512 KiB and 1,000 fields, guarding against unbounded resource allocation (CWE-770) ([#15803](https://github.com/streamlit/streamlit/pull/15803)).
  - New `server.maxWidgetStateSize` config option (default 25 MB) limits the widget state payload a client can send per script rerun, hardening against oversized widget and custom-component payloads ([#15804](https://github.com/streamlit/streamlit/pull/15804)).
- 📊 [`st.dataframe`](/develop/api-reference/data/st.dataframe) now preserves row selections when the user sorts the table ([#16020](https://github.com/streamlit/streamlit/pull/16020), [#8851](https://github.com/streamlit/streamlit/issues/8851)).
- 🎛 [`st.tabs`](/develop/api-reference/layout/st.tabs) has a new `height` parameter to set a fixed pixel height for the tab panel area ([#15847](https://github.com/streamlit/streamlit/pull/15847), [#12217](https://github.com/streamlit/streamlit/issues/12217)).
- 📐 The `gap` parameter in [`st.columns`](/develop/api-reference/layout/st.columns) now accepts integer pixel values in addition to the existing string presets ([#15850](https://github.com/streamlit/streamlit/pull/15850), [#13005](https://github.com/streamlit/streamlit/issues/13005)).
- 🎨 [`st.data_editor`](/develop/api-reference/data/st.data_editor) now uses `key` as the primary row identity when `num_rows="fixed"`, improving stability when the underlying data changes ([#15884](https://github.com/streamlit/streamlit/pull/15884)).
- 📈 Zero delta values in [`st.metric`](/develop/api-reference/data/st.metric) are now displayed in neutral grey instead of green or red, so a zero change no longer implies a positive or negative direction ([#15790](https://github.com/streamlit/streamlit/pull/15790), [#15005](https://github.com/streamlit/streamlit/issues/15005)).
- 🖌 Vega-Lite chart action buttons (download, copy spec to clipboard) are now integrated into the native Streamlit toolbar; the Vega-Lite action menu overlay has been removed ([#15806](https://github.com/streamlit/streamlit/pull/15806)).

**Other Changes**

- 🐛 Bug fix: Non-finite float values (e.g. `NaN`, `Inf`) in URL query params are now rejected to prevent unexpected behavior ([#15799](https://github.com/streamlit/streamlit/pull/15799)).
- 🦋 Bug fix: Dangerous URLs in Graphviz link attributes are now sanitized ([#15819](https://github.com/streamlit/streamlit/pull/15819)).
- 🪲 Bug fix: HTML in PyDeck chart tooltip interpolations is now escaped to prevent injection ([#15820](https://github.com/streamlit/streamlit/pull/15820)).
- 🐜 Bug fix: Dangerous URLs in `st.link_button` and `st.image` are now sanitized ([#15851](https://github.com/streamlit/streamlit/pull/15851)).
- 🐝 Bug fix: `st.selectbox` now virtualizes long dropdown option lists for better rendering performance ([#15870](https://github.com/streamlit/streamlit/pull/15870), [#15863](https://github.com/streamlit/streamlit/issues/15863)).
- 🐞 Bug fix: Viewport gutter is now preserved around dialogs on narrow screens ([#15875](https://github.com/streamlit/streamlit/pull/15875)).
- 🕷️ Bug fix: React Aria dialog overlays now stack correctly when multiple dialogs are open ([#15876](https://github.com/streamlit/streamlit/pull/15876), [#15859](https://github.com/streamlit/streamlit/issues/15859)).
- 🪳 Bug fix: The "Missing Submit Button" warning has been removed ([#15889](https://github.com/streamlit/streamlit/pull/15889), [#14247](https://github.com/streamlit/streamlit/issues/14247)).
- 🪰 Bug fix: `st.tabs` panels no longer stack visually after a widget rerun ([#15894](https://github.com/streamlit/streamlit/pull/15894), [#15893](https://github.com/streamlit/streamlit/issues/15893)).
- 🦠 Bug fix: `st.metric` area chart fill baseline is now drawn correctly ([#15907](https://github.com/streamlit/streamlit/pull/15907)).
- 🦟 Bug fix: `run_every` auto-rerun timers are now deduplicated per fragment, preventing duplicate reruns ([#15912](https://github.com/streamlit/streamlit/pull/15912)).
- 🦂 Bug fix: Redundant keyboard tab stop removed from the file uploader dropzone for better accessibility ([#15928](https://github.com/streamlit/streamlit/pull/15928)).
- 🦗 Bug fix: Auto-rerun correctly stops when a fragment is evicted ([#15932](https://github.com/streamlit/streamlit/pull/15932)).
- 🕸️ Bug fix: A PyArrow 25 thread initialization crash is now avoided ([#15947](https://github.com/streamlit/streamlit/pull/15947)).
- 🐌 Bug fix: Missing `httpx` error message for the auth extra is now surfaced correctly ([#15864](https://github.com/streamlit/streamlit/pull/15864)).
- 🦎 Bug fix: `st.App` with programmatic secrets now correctly honors the `expose_tokens` setting ([#15865](https://github.com/streamlit/streamlit/pull/15865)).
- 🦀 Bug fix: `RuntimeError: reentrant call inside _io.BufferedWriter` on Ctrl+C is fixed ([#15949](https://github.com/streamlit/streamlit/pull/15949), [#15740](https://github.com/streamlit/streamlit/issues/15740)). Thanks, [chang-pro](https://github.com/chang-pro)!
- 👽 Bug fix: File watcher no longer crashes on Windows drive-root paths ([#15951](https://github.com/streamlit/streamlit/pull/15951), [#12731](https://github.com/streamlit/streamlit/issues/12731)).
- 👻 Bug fix: Overlay stacking and dismissal inside popovers works correctly ([#15961](https://github.com/streamlit/streamlit/pull/15961)).
- 🐛 Bug fix: Mobile keyboard no longer appears for `st.selectbox` when `filter_mode=None` ([#15962](https://github.com/streamlit/streamlit/pull/15962)).
- 🦋 Bug fix: `st.selectbox` "No results" empty state is now styled correctly ([#15967](https://github.com/streamlit/streamlit/pull/15967)).
- 🪲 Bug fix: `IndexError` in number formatting for values ≥ 1 quadrillion is fixed ([#15971](https://github.com/streamlit/streamlit/pull/15971)). Thanks, [eeshsaxena](https://github.com/eeshsaxena)!
- 🐜 Bug fix: Type-to-search in `st.selectbox` is restored ([#15996](https://github.com/streamlit/streamlit/pull/15996), [#15985](https://github.com/streamlit/streamlit/issues/15985)).
- 🐝 Bug fix: Typing a value in `st.number_input` inside a form now correctly submits on the first Enter press ([#16013](https://github.com/streamlit/streamlit/pull/16013), [#13751](https://github.com/streamlit/streamlit/issues/13751)).
- 🐞 Bug fix: Hashing fallback warning messages are now more informative ([#16040](https://github.com/streamlit/streamlit/pull/16040), [#10957](https://github.com/streamlit/streamlit/issues/10957)).
- 🕷️ Bug fix: Inconsistent checkbox margin in a horizontal container within a column is fixed ([#16060](https://github.com/streamlit/streamlit/pull/16060), [#13162](https://github.com/streamlit/streamlit/issues/13162)).
- 🪳 Bug fix: Widgets inside a popover that is itself inside a dialog are now clickable ([#16067](https://github.com/streamlit/streamlit/pull/16067), [#16005](https://github.com/streamlit/streamlit/issues/16005)).
- 🪰 Bug fix: `st.echo` output now correctly includes decorators on the displayed function ([#16068](https://github.com/streamlit/streamlit/pull/16068), [#9252](https://github.com/streamlit/streamlit/issues/9252)).
- 🔩 Internal `TTLCache` implementation replaces the `cachetools` third-party dependency ([#16014](https://github.com/streamlit/streamlit/pull/16014)).

## Older versions of Streamlit

- [2026 release notes](/develop/quick-reference/release-notes/2026)
- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
