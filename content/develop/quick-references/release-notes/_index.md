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

## **Version 1.66.0 (latest)**

_Release date: October 14, 2026_

**Highlights**

- 📐 Introducing the `theme.paddingTop` and `theme.paddingBottom` [config options](/develop/api-reference/configuration/config.toml#theme), so you can set the space between the app chrome and your page content, with optional `[theme.sidebar]` overrides ([#17350](https://github.com/streamlit/streamlit/pull/17350), [#6336](https://github.com/streamlit/streamlit/issues/6336)).
- 🎛 Announcing `on_change="ignore"` for every stateful widget, so a new value updates the widget and any bound query parameter without a rerun, and Python receives it on the next rerun ([#5827](https://github.com/streamlit/streamlit/issues/5827)). This release adds the remaining widgets:
    - [`st.pills`](/develop/api-reference/widgets/st.pills) and [`st.segmented_control`](/develop/api-reference/widgets/st.segmented_control) ([#17307](https://github.com/streamlit/streamlit/pull/17307), [#17452](https://github.com/streamlit/streamlit/pull/17452)).
    - [`st.feedback`](/develop/api-reference/widgets/st.feedback) ([#17281](https://github.com/streamlit/streamlit/pull/17281)).
    - [`st.color_picker`](/develop/api-reference/widgets/st.color_picker) ([#17209](https://github.com/streamlit/streamlit/pull/17209)).
    - [`st.datetime_input`](/develop/api-reference/widgets/st.datetime_input) ([#17267](https://github.com/streamlit/streamlit/pull/17267)).
    - [`st.camera_input`](/develop/api-reference/widgets/st.camera_input) and [`st.audio_input`](/develop/api-reference/widgets/st.audio_input) ([#17246](https://github.com/streamlit/streamlit/pull/17246), [#17328](https://github.com/streamlit/streamlit/pull/17328)).
    - [`st.data_editor`](/develop/api-reference/data/st.data_editor) ([#17347](https://github.com/streamlit/streamlit/pull/17347)).
    - [`st.pagination`](/develop/api-reference/widgets/st.pagination) ([#17397](https://github.com/streamlit/streamlit/pull/17397)).

**Notable Changes**

- 🧭 Apps have a "Skip to main content" link and `<main>` and `<nav>` landmarks for keyboard and screen-reader users. Custom CSS selectors like `section[data-testid="stMain"]` should drop the tag ([#17418](https://github.com/streamlit/streamlit/pull/17418), [#17338](https://github.com/streamlit/streamlit/issues/17338), [#17416](https://github.com/streamlit/streamlit/issues/17416)).
- 🧪 [`AppTest`](/develop/api-reference/app-testing/st.testing.v1.AppTest) supports more elements:
    - `at.form` and `at.form_submit_button` let you look up forms by key and click their submit buttons ([#17229](https://github.com/streamlit/streamlit/pull/17229)).
    - `at.link_button` and `at.page_link` ([#17308](https://github.com/streamlit/streamlit/pull/17308)).
    - `at.progress`, `at.html`, and `at.help` ([#17280](https://github.com/streamlit/streamlit/pull/17280)).
    - `at.pagination` can select a page for the next run ([#17322](https://github.com/streamlit/streamlit/pull/17322)).
    - `at.audio_input` and `at.camera_input` can stage a recording or photo for the next run ([#17346](https://github.com/streamlit/streamlit/pull/17346), [#17459](https://github.com/streamlit/streamlit/pull/17459)).
- 🐍 Streamlit supports Python 3.15 ([#17426](https://github.com/streamlit/streamlit/pull/17426), [#17422](https://github.com/streamlit/streamlit/issues/17422)).
- 👻 Due to end of life, Python 3.10 is no longer supported. The minimum supported versions of NumPy, pandas, Pillow, and PyArrow are raised to releases with Python 3.11 wheels ([#17315](https://github.com/streamlit/streamlit/pull/17315)).

**Other Changes**

- 📦 `httptools` is now an optional dependency. Install `streamlit[performance]` to keep Uvicorn's faster HTTP parser ([#16554](https://github.com/streamlit/streamlit/pull/16554)).
- 💿 Streamlit no longer requires the `toml` dependency ([#17315](https://github.com/streamlit/streamlit/pull/17315), [#17342](https://github.com/streamlit/streamlit/pull/17342)).
- ⚠ Streamlit logs a startup warning when `websockets` 17 or later is installed with `uvicorn` older than 0.52.0, a combination that can break the WebSocket handshake behind proxies that forward non-ASCII headers ([#17115](https://github.com/streamlit/streamlit/pull/17115), [#16030](https://github.com/streamlit/streamlit/issues/16030)).
- 🐛 Bug fix: [`st.switch_page`](/develop/api-reference/navigation/st.switch_page) and [`st.page_link`](/develop/api-reference/widgets/st.page_link) reject Windows network and device paths before resolving them, so untrusted input can't trigger an SMB connection ([#17301](https://github.com/streamlit/streamlit/pull/17301)).
- 🦋 Bug fix: A disabled [`st.download_button`](/develop/api-reference/widgets/st.download_button) with a callable `data` argument no longer registers a download that can run the callable ([#17288](https://github.com/streamlit/streamlit/pull/17288)).
- 🪲 Bug fix: Apps embedded in an iframe sandboxed without `allow-same-origin` render instead of staying blank ([#17409](https://github.com/streamlit/streamlit/pull/17409), [#17402](https://github.com/streamlit/streamlit/issues/17402)).
- 🐜 Bug fix: A run that is stopped or replaced while waiting for another run's cached value exits promptly instead of holding a thread ([#17340](https://github.com/streamlit/streamlit/pull/17340)).
- 🐝 Bug fix: Streamlit logs an error at startup when `secrets.toml` can't be parsed, instead of silently continuing with empty secrets ([#17428](https://github.com/streamlit/streamlit/pull/17428)).
- 🐞 Bug fix: Checking for a missing `st.*` attribute with `hasattr` or `getattr` no longer imports modules, which could raise a `RuntimeError` in code that iterates `sys.modules` ([#17311](https://github.com/streamlit/streamlit/pull/17311), [#17298](https://github.com/streamlit/streamlit/issues/17298)).
- 🕷️ Bug fix: A fragment callback that only calls `st.switch_page` or `st.stop` no longer logs a false warning about displaying elements ([#17292](https://github.com/streamlit/streamlit/pull/17292)).
- 🪳 Bug fix: Keyed containers no longer trigger React key warnings or remount while a rerun is in progress ([#17456](https://github.com/streamlit/streamlit/pull/17456)).
- 🪰 Bug fix: Side-by-side elements line up better: `height="stretch"` elements in horizontal containers match the tallest element in their row, and vertically aligned [`st.columns`](/develop/api-reference/layout/st.columns) fill the row height ([#17392](https://github.com/streamlit/streamlit/pull/17392)).
- 🦠 Bug fix: Stretch-height charts fall back to their default height when nothing gives them one, and stretch-height containers and forms grow to fit their content ([#17410](https://github.com/streamlit/streamlit/pull/17410), [#17424](https://github.com/streamlit/streamlit/pull/17424)).
- 🦟 Bug fix: [`st.echarts_chart`](/develop/api-reference/charts/st.echarts_chart) tooltips use the theme's font weight and round long numbers ([#17333](https://github.com/streamlit/streamlit/pull/17333)).
- 🦂 Bug fix: [`st.pydeck_chart`](/develop/api-reference/charts/st.pydeck_chart) tooltips appear at the cursor instead of above it ([#17313](https://github.com/streamlit/streamlit/pull/17313), [#17309](https://github.com/streamlit/streamlit/issues/17309)).
- 🦗 Bug fix: Buttons, checkboxes, toggles, and other labels show a hover tooltip only when their text is cut off ([#17266](https://github.com/streamlit/streamlit/pull/17266), [#17264](https://github.com/streamlit/streamlit/issues/17264)).
- 🕸️ Bug fix: Muted icon buttons in widgets, such as clear and microphone buttons, share one color treatment and are no longer tinted by a custom `theme.grayColor` ([#17231](https://github.com/streamlit/streamlit/pull/17231)).
- 🐌 Bug fix: Screen readers skip Material icons and decorative images, and icon-only controls have accessible names ([#17170](https://github.com/streamlit/streamlit/pull/17170), [#12873](https://github.com/streamlit/streamlit/issues/12873)).
- 🦎 Bug fix: The sidebar's expand and collapse buttons report their state with `aria-expanded`. Custom CSS or scripts that read `aria-expanded` on the sidebar should use `data-collapsed` instead ([#17293](https://github.com/streamlit/streamlit/pull/17293)).
- 🦀 Bug fix: [`st.date_input`](/develop/api-reference/widgets/st.date_input) and `st.datetime_input` have a calendar button that keyboard users can reach with Tab and that reports its state to screen readers ([#17294](https://github.com/streamlit/streamlit/pull/17294), [#17296](https://github.com/streamlit/streamlit/pull/17296), [#17316](https://github.com/streamlit/streamlit/pull/17316)).
- 👽 Bug fix: [`st.selectbox`](/develop/api-reference/widgets/st.selectbox) and `st.multiselect` let screen readers announce the active option while you type ([#17295](https://github.com/streamlit/streamlit/pull/17295), [#16841](https://github.com/streamlit/streamlit/issues/16841)).
- 👻 Bug fix: Type hints for [`st.connection`](/develop/api-reference/connections/st.connection), `st.query_params`, `st.secrets`, and `st.session_state` match runtime behavior more closely ([#17245](https://github.com/streamlit/streamlit/pull/17245), [#17419](https://github.com/streamlit/streamlit/pull/17419), [#17460](https://github.com/streamlit/streamlit/pull/17460), [#17466](https://github.com/streamlit/streamlit/pull/17466)).
- 🐛 Bug fix: `AppTest` layout collections such as `at.expander` and `at.tabs` can be looked up by key ([#17256](https://github.com/streamlit/streamlit/pull/17256)).
- 🦋 Bug fix: `AppTest` keeps `persist_state="page"` widget values and selected tabs across reruns of the same page ([#17305](https://github.com/streamlit/streamlit/pull/17305), [#17249](https://github.com/streamlit/streamlit/issues/17249)).
- 🪲 Bug fix: `AppTest` renders imported Custom Components v2, including `st.pdf`, in every `AppTest` instance in the same process ([#17331](https://github.com/streamlit/streamlit/pull/17331), [#17216](https://github.com/streamlit/streamlit/issues/17216)).

## Older versions of Streamlit

- [2026 release notes](/develop/quick-reference/release-notes/2026)
- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
