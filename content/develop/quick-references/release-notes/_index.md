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

## **Version 1.64.0 (latest)**

_Release date: September 15, 2026_

**Highlights**

- ✨ Introducing [`st.echarts_chart`](/develop/api-reference/charts/st.echarts_chart), a new command that renders Apache ECharts options with Streamlit theming, and accepts dicts, JSON strings, or `pyecharts` charts ([#16785](https://github.com/streamlit/streamlit/pull/16785)).
- 🔀 Streamlit now supports async app code:
    - Each session gets a stable event loop on the script thread, so synchronous code that calls `asyncio.get_event_loop()` works ([#16167](https://github.com/streamlit/streamlit/pull/16167), [#744](https://github.com/streamlit/streamlit/issues/744)).
    - [`st.cache_data`](/develop/api-reference/caching-and-state/st.cache_data) and [`st.cache_resource`](/develop/api-reference/caching-and-state/st.cache_resource) cache the awaited result of coroutine functions ([#16168](https://github.com/streamlit/streamlit/pull/16168)).
- 🆕 Announcing live updates for [`st.text_input`](/develop/api-reference/widgets/st.text_input): set `live=True` and the widget commits while the user types, after a short pause ([#16662](https://github.com/streamlit/streamlit/pull/16662), [#4553](https://github.com/streamlit/streamlit/issues/4553)).

**Notable Changes**

- 🎛 The `on_change="ignore"` mode reaches three more widgets, so a new value updates the widget and any bound query parameter without a rerun:
    - [`st.number_input`](/develop/api-reference/widgets/st.number_input) ([#16649](https://github.com/streamlit/streamlit/pull/16649)).
    - [`st.select_slider`](/develop/api-reference/widgets/st.select_slider) ([#16776](https://github.com/streamlit/streamlit/pull/16776)).
    - [`st.selectbox`](/develop/api-reference/widgets/st.selectbox) ([#16862](https://github.com/streamlit/streamlit/pull/16862)).
- 👻 The `mapbox.token` config option is removed. Set the `MAPBOX_API_KEY` environment variable, or pass PyDeck `api_keys` instead ([#16774](https://github.com/streamlit/streamlit/pull/16774), [#16676](https://github.com/streamlit/streamlit/issues/16676), [#16678](https://github.com/streamlit/streamlit/issues/16678)).

**Other Changes**

- 🐛 Bug fix: [`st.dialog`](/develop/api-reference/execution-flow/st.dialog) hides a leftover dialog as soon as the next full-app run starts, so `st.rerun()` closes the modal before later blocking work ([#16901](https://github.com/streamlit/streamlit/pull/16901), [#9405](https://github.com/streamlit/streamlit/issues/9405)).
- 🦋 Bug fix: [`st.dataframe`](/develop/api-reference/data/st.dataframe) and [`st.data_editor`](/develop/api-reference/data/st.data_editor) convert list columns that PyArrow cannot serialize to strings, instead of raising when the nesting levels differ ([#16838](https://github.com/streamlit/streamlit/pull/16838), [#9380](https://github.com/streamlit/streamlit/issues/9380)).
- 🪲 Bug fix: Widgets after [`st.rerun`](/develop/api-reference/execution-flow/st.rerun) keep the values the user selected, instead of resetting to their defaults ([#16762](https://github.com/streamlit/streamlit/pull/16762), [#3533](https://github.com/streamlit/streamlit/issues/3533)).
- 🐜 Bug fix: Altair `mark_geoshape` charts render on first view, instead of showing an empty plot ([#16886](https://github.com/streamlit/streamlit/pull/16886), [#2910](https://github.com/streamlit/streamlit/issues/2910)).
- 🐝 Bug fix: [`st.pydeck_chart`](/develop/api-reference/charts/st.pydeck_chart) honors pydeck `views`, so OrbitView, GlobeView, and `map_provider=None` render as specified ([#16819](https://github.com/streamlit/streamlit/pull/16819), [#2590](https://github.com/streamlit/streamlit/issues/2590), [#2302](https://github.com/streamlit/streamlit/issues/2302), [#9933](https://github.com/streamlit/streamlit/issues/9933)).
- 🐞 Bug fix: `st.pydeck_chart` renders layers that declare deck.gl `extensions`, instead of showing an error box ([#16823](https://github.com/streamlit/streamlit/pull/16823)).
- 🕷️ Bug fix: Altair `binding_radio` and `binding_select` stay a single widget when `on_select` is enabled ([#16809](https://github.com/streamlit/streamlit/pull/16809), [#8765](https://github.com/streamlit/streamlit/issues/8765)).
- 🪳 Bug fix: Vega and Altair `bind=` controls use Streamlit fonts, colors, and focus rings ([#16813](https://github.com/streamlit/streamlit/pull/16813)).
- 🪰 Bug fix: Vega-Lite legend titles get more padding under the Streamlit theme, so the title is not stuck to the first entry ([#16818](https://github.com/streamlit/streamlit/pull/16818)).
- 🦠 Bug fix: Elements stay dimmed after you press Stop, until the run actually finishes ([#16839](https://github.com/streamlit/streamlit/pull/16839), [#9904](https://github.com/streamlit/streamlit/issues/9904)).
- 🦟 Bug fix: [`st.query_params`](/develop/api-reference/caching-and-state/st.query_params) skips a browser history entry when the query string does not change, so the Back button leaves the app ([#16831](https://github.com/streamlit/streamlit/pull/16831), [#9878](https://github.com/streamlit/streamlit/issues/9878)).
- 🦂 Bug fix: Custom Components v2 keep in-flight trigger values, so the value reaches Python instead of the script rerunning without it ([#16833](https://github.com/streamlit/streamlit/pull/16833), [#16732](https://github.com/streamlit/streamlit/issues/16732)).
- 🦗 Bug fix: [`st.download_button`](/develop/api-reference/widgets/st.download_button) encodes filenames that a quoted `Content-Disposition` header cannot hold, so the browser saves the full name ([#16646](https://github.com/streamlit/streamlit/pull/16646), [#16631](https://github.com/streamlit/streamlit/issues/16631)).
- 🕸️ Bug fix: [`st.slider`](/develop/api-reference/widgets/st.slider) swaps reversed `min_value` and `max_value` bounds, instead of truncating the range or raising an error about numbers you never passed ([#16716](https://github.com/streamlit/streamlit/pull/16716), [#16675](https://github.com/streamlit/streamlit/issues/16675)).
- 🐌 Bug fix: `st.number_input` raises a clear error when `min_value` is greater than `max_value` ([#16895](https://github.com/streamlit/streamlit/pull/16895)).
- 🦎 Bug fix: Widgets raise an actionable error for an `on_change` mode they do not support ([#16889](https://github.com/streamlit/streamlit/pull/16889)).
- 🦀 Bug fix: Streamlit classifies invalid `icon=` values more precisely, so an empty value means no icon and a URL raises an image error ([#16900](https://github.com/streamlit/streamlit/pull/16900)).
- 🐛 Bug fix: The error for a nested `url_path` names the invalid path and links to the issue you can upvote ([#16896](https://github.com/streamlit/streamlit/pull/16896)).
- 🦋 Bug fix: Exception traces in the browser hide Streamlit package frames, keep your `st.*` call site, and show chained exceptions ([#16718](https://github.com/streamlit/streamlit/pull/16718)).
- 🪲 Bug fix: Coalesced reruns dispatch only the callbacks that have not run yet ([#16765](https://github.com/streamlit/streamlit/pull/16765)).
- 🐜 Bug fix: [`st.button`](/develop/api-reference/widgets/st.button) and similar controls wait 500ms before they show a help tooltip on hover, so a pointer that crosses a control does not open one ([#16794](https://github.com/streamlit/streamlit/pull/16794), [#8686](https://github.com/streamlit/streamlit/issues/8686)).
- 🐝 Bug fix: [`st.radio`](/develop/api-reference/widgets/st.radio) exposes option captions as descriptions, so assistive tech reads the option text as the name ([#16811](https://github.com/streamlit/streamlit/pull/16811)).
- 🐞 Bug fix: `st.cache_resource` rejects async `validate` and `on_release` callbacks, instead of discarding the awaitable they return ([#16860](https://github.com/streamlit/streamlit/pull/16860)).
- 🕷️ Bug fix: [`AppTest`](/develop/api-reference/app-testing/st.testing.v1.AppTest) treats unknown element subtypes as `UnknownElement`, so `.run()` finishes against a newer Streamlit ([#16835](https://github.com/streamlit/streamlit/pull/16835)).
- 🪳 Bug fix: `AppTest` raises `AppTestError` when you call `set_value()` or `click()` on an element with no typed wrapper ([#16837](https://github.com/streamlit/streamlit/pull/16837)).
- 🪰 Bug fix: `AppTest` treats an empty [`st.chat_input`](/develop/api-reference/chat/st.chat_input) submit as a real value, and prints `ChatInputValue` without an error when `accept_file=True` ([#16857](https://github.com/streamlit/streamlit/pull/16857)).
- 🦠 Bug fix: `AppTest.session_state` supports the same dict methods as [`st.session_state`](/develop/api-reference/caching-and-state/st.session_state), which are `get`, `keys`, `items`, `values`, `to_dict`, `len`, and iteration ([#16897](https://github.com/streamlit/streamlit/pull/16897)).
- 🦟 Bug fix: `streamlit skills` installs the bundled agent skills where Claude Code reads them, and reports an incomplete install instead of success ([#16394](https://github.com/streamlit/streamlit/pull/16394)).

## Older versions of Streamlit

- [2026 release notes](/develop/quick-reference/release-notes/2026)
- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
