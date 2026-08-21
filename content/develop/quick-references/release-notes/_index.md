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

## **Version 1.62.0 (latest)**

_Release date: August 19, 2026_

**Highlights**

- ✨ Introducing client-side validation and specialized email, URL, phone, and search types for [`st.text_input`](/develop/api-reference/widgets/st.text_input), with smart defaults for validation, autofill, mobile keyboards, icons, and placeholders ([#15752](https://github.com/streamlit/streamlit/pull/15752), [#15714](https://github.com/streamlit/streamlit/pull/15714), [#8790](https://github.com/streamlit/streamlit/issues/8790), [#7348](https://github.com/streamlit/streamlit/issues/7348), [#16385](https://github.com/streamlit/streamlit/pull/16385), [#6704](https://github.com/streamlit/streamlit/issues/6704), [#10744](https://github.com/streamlit/streamlit/issues/10744)).
- 🧩 Introducing the new `wrap` parameter, which lets you choose whether horizontal layouts, widgets, and labels wrap or remain on one scrollable or truncated row:
    - [`st.columns`](/develop/api-reference/layout/st.columns) and horizontal [`st.container`](/develop/api-reference/layout/st.container) layouts can remain on one horizontally scrollable row with `wrap=False` ([#16131](https://github.com/streamlit/streamlit/pull/16131), [#16367](https://github.com/streamlit/streamlit/pull/16367), [#5003](https://github.com/streamlit/streamlit/issues/5003), [#2313](https://github.com/streamlit/streamlit/issues/2313), [#16484](https://github.com/streamlit/streamlit/pull/16484), [#9544](https://github.com/streamlit/streamlit/issues/9544), [#12582](https://github.com/streamlit/streamlit/issues/12582)).
    - [`st.button`](/develop/api-reference/widgets/st.button) and other button-like controls, [`st.checkbox`](/develop/api-reference/widgets/st.checkbox), and [`st.toggle`](/develop/api-reference/widgets/st.toggle) can keep labels on one line when desired ([#16325](https://github.com/streamlit/streamlit/pull/16325), [#16470](https://github.com/streamlit/streamlit/pull/16470)).
    - [`st.multiselect`](/develop/api-reference/widgets/st.multiselect) can keep selected chips on one horizontally scrollable row ([#16509](https://github.com/streamlit/streamlit/pull/16509), [#12644](https://github.com/streamlit/streamlit/issues/12644)).
- 🆕 Announcing the public `streamlit.typing` namespace for stable imports of Streamlit-owned types, including fully typed selection and data editor state values ([#16094](https://github.com/streamlit/streamlit/pull/16094), [#16275](https://github.com/streamlit/streamlit/pull/16275), [#16295](https://github.com/streamlit/streamlit/pull/16295), [#7801](https://github.com/streamlit/streamlit/issues/7801), [#16351](https://github.com/streamlit/streamlit/pull/16351), [#16471](https://github.com/streamlit/streamlit/pull/16471)).

**Notable Changes**

- 🎨 Date and datetime inputs have a more accessible, keyboard-friendly editing experience:
    - [`st.date_input`](/develop/api-reference/widgets/st.date_input) now uses segmented fields and an accessible calendar for single dates and ranges ([#16460](https://github.com/streamlit/streamlit/pull/16460), [#7865](https://github.com/streamlit/streamlit/issues/7865), [#8556](https://github.com/streamlit/streamlit/issues/8556), [#12699](https://github.com/streamlit/streamlit/issues/12699), [#9667](https://github.com/streamlit/streamlit/issues/9667), [#7100](https://github.com/streamlit/streamlit/issues/7100), [#4941](https://github.com/streamlit/streamlit/issues/4941), [#9946](https://github.com/streamlit/streamlit/issues/9946)).
    - [`st.datetime_input`](/develop/api-reference/widgets/st.datetime_input) now offers segmented date and time fields with an integrated calendar and time editor ([#16501](https://github.com/streamlit/streamlit/pull/16501), [#16502](https://github.com/streamlit/streamlit/pull/16502)).
    - Bug fix: Date and datetime values stay within their input borders in narrow containers, and calendars indicate today's date ([#16565](https://github.com/streamlit/streamlit/pull/16565)).
- 📊 You can configure chart categorical, sequential, and diverging colors separately for light, dark, and sidebar themes ([#16357](https://github.com/streamlit/streamlit/pull/16357), [#16355](https://github.com/streamlit/streamlit/issues/16355)).
- 🔤 Theme font-weight settings support increments of 50 for finer typography control ([#16396](https://github.com/streamlit/streamlit/pull/16396), [#16354](https://github.com/streamlit/streamlit/issues/16354)).
- 👻 The long-deprecated `st.cache` command has been removed; use [`st.cache_data`](/develop/api-reference/caching-and-state/st.cache_data) or [`st.cache_resource`](/develop/api-reference/caching-and-state/st.cache_resource) instead ([#15787](https://github.com/streamlit/streamlit/pull/15787)).
- ☠️ Passing Matplotlib `savefig` keyword arguments to [`st.pyplot`](/develop/api-reference/charts/st.pyplot) is deprecated; save the figure directly and display it with `st.image` instead ([#16450](https://github.com/streamlit/streamlit/pull/16450)).
- 👻 Calling [`st.pyplot`](/develop/api-reference/charts/st.pyplot) without an explicit figure is no longer supported ([#16464](https://github.com/streamlit/streamlit/pull/16464)).

**Other Changes**

- 🪄 When Streamlit raises an uncaught error during local development, the error display can offer to install Streamlit's agent skills for supported coding agents ([#15693](https://github.com/streamlit/streamlit/pull/15693)).
- 📏 [`st.table`](/develop/api-reference/data/st.table) uses a 14-pixel font size consistent with other Streamlit widgets ([#16397](https://github.com/streamlit/streamlit/pull/16397), [#16389](https://github.com/streamlit/streamlit/issues/16389)).
- 🚨 Invalid enum-like parameter values consistently raise `StreamlitValueError` while preserving compatibility with existing specialized exception classes ([#16422](https://github.com/streamlit/streamlit/pull/16422)).
- 📦 Streamlit no longer requires the `tenacity` dependency for SQL and Snowflake connection retries ([#16497](https://github.com/streamlit/streamlit/pull/16497)).
- 🐛 Bug fix: [`st.popover`](/develop/api-reference/layout/st.popover) keeps its contents visible and scrollable in narrow or embedded viewports ([#16173](https://github.com/streamlit/streamlit/pull/16173), [#9340](https://github.com/streamlit/streamlit/issues/9340)).
- 🦋 Bug fix: [`st.pyplot`](/develop/api-reference/charts/st.pyplot) supports SVG output through `format="svg"` ([#16283](https://github.com/streamlit/streamlit/pull/16283), [#11489](https://github.com/streamlit/streamlit/issues/11489)).
- 🪲 Bug fix: `runner.cacheHashSeed` lets apps change the sample used to hash large pandas, Polars, and NumPy objects without invalidating existing caches by default ([#16284](https://github.com/streamlit/streamlit/pull/16284), [#14622](https://github.com/streamlit/streamlit/issues/14622)).
- 🐜 Bug fix: Heading anchors update when heading text changes during a rerun ([#16286](https://github.com/streamlit/streamlit/pull/16286), [#8793](https://github.com/streamlit/streamlit/issues/8793)).
- 🐝 Bug fix: Altair charts reconstructed with `alt.Chart.from_json` preserve their inline datasets ([#16288](https://github.com/streamlit/streamlit/pull/16288), [#6269](https://github.com/streamlit/streamlit/issues/6269)).
- 🐞 Bug fix: Nested [`st.fragment`](/develop/api-reference/execution-flow/st.fragment) functions with queued periodic reruns no longer execute twice and create duplicate element IDs ([#16314](https://github.com/streamlit/streamlit/pull/16314), [#10719](https://github.com/streamlit/streamlit/issues/10719)).
- 🕷️ Bug fix: Multiple Streamlit servers correctly advance to the next available port on Windows ([#16315](https://github.com/streamlit/streamlit/pull/16315), [#16296](https://github.com/streamlit/streamlit/issues/16296)).
- 🪳 Bug fix: Updating [`st.status`](/develop/api-reference/status/st.status) through a container created outside a fragment no longer corrupts the app's element tree ([#16316](https://github.com/streamlit/streamlit/pull/16316), [#16281](https://github.com/streamlit/streamlit/issues/16281)).
- 🪰 Bug fix: Streamlit falls back to MD5 for element IDs, cache keys, and file watching on FIPS-enabled systems whose BLAKE2b implementation rejects custom digest sizes ([#16324](https://github.com/streamlit/streamlit/pull/16324), [#15148](https://github.com/streamlit/streamlit/issues/15148)).
- 🦠 Bug fix: Embedded Streamlit-in-Snowflake apps can receive same-window authentication messages while retaining host-message spoofing protections ([#16327](https://github.com/streamlit/streamlit/pull/16327)).
- 🦟 Bug fix: Streamlit remains compatible with newer Starlette gzip middleware while preserving correct media, download, and range-response handling ([#16342](https://github.com/streamlit/streamlit/pull/16342), [#16344](https://github.com/streamlit/streamlit/pull/16344), [#16341](https://github.com/streamlit/streamlit/issues/16341), [#16462](https://github.com/streamlit/streamlit/pull/16462)).
- 🦂 Bug fix: Malformed WebSocket messages are rejected without exposing tracebacks or absolute server paths to the browser ([#16392](https://github.com/streamlit/streamlit/pull/16392), [#16391](https://github.com/streamlit/streamlit/issues/16391)).
- 🦗 Bug fix: The startup warning for `server.enableCORS=false` accurately describes CORS and XSRF behavior instead of claiming the setting is overridden ([#16393](https://github.com/streamlit/streamlit/pull/16393), [#16390](https://github.com/streamlit/streamlit/issues/16390)).
- 🕸️ Bug fix: Derived code and dataframe-header background colors respect custom theme background settings ([#16401](https://github.com/streamlit/streamlit/pull/16401), [#16398](https://github.com/streamlit/streamlit/issues/16398)).
- 🐌 Bug fix: Timelike [`st.slider`](/develop/api-reference/widgets/st.slider) values are validated against the frontend's safe numeric range instead of silently changing ([#16475](https://github.com/streamlit/streamlit/pull/16475), [#16474](https://github.com/streamlit/streamlit/issues/16474)).
- 🦎 Bug fix: [`st.toast`](/develop/api-reference/status/st.toast) notifications remain visible when immediately followed by `st.rerun()` ([#16498](https://github.com/streamlit/streamlit/pull/16498), [#7740](https://github.com/streamlit/streamlit/issues/7740)).
- 🦀 Bug fix: [`st.color_picker`](/develop/api-reference/widgets/st.color_picker) remains interactive inside dialogs ([#16541](https://github.com/streamlit/streamlit/pull/16541), [#16538](https://github.com/streamlit/streamlit/issues/16538)).
- 👽 Bug fix: [`st.metric`](/develop/api-reference/data/st.metric) restores its sparkline after chart data becomes empty and is populated again ([#16543](https://github.com/streamlit/streamlit/pull/16543), [#16539](https://github.com/streamlit/streamlit/issues/16539)).

## Older versions of Streamlit

- [2026 release notes](/develop/quick-reference/release-notes/2026)
- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
