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

## **Version 1.63.0 (latest)**

_Release date: September 1, 2026_

**Highlights**

- 🎯 Introducing event-scoped fragment reruns, which let a widget callback rerun just one named fragment:
    - Name a fragment with `@st.fragment(key=…)` and target it with [`st.rerun`](/develop/api-reference/execution-flow/st.rerun)`("filters")` or `st.rerun(["alpha", "beta"])` from an `on_change` or `on_click` callback ([#16161](https://github.com/streamlit/streamlit/pull/16161)).
    - `st.rerun()` and `st.switch_page()` now take effect inside widget callbacks instead of being discarded with a warning; apps that relied on the previous no-op will now rerun ([#16158](https://github.com/streamlit/streamlit/pull/16158)).
- ✨ Introducing `on_change="ignore"`, a new mode that updates a widget in the browser without rerunning your app. Your script receives the buffered value on the next rerun, such as a button click, and the mode is available on [`st.slider`](/develop/api-reference/widgets/st.slider) and [`st.text_input`](/develop/api-reference/widgets/st.text_input) ([#14828](https://github.com/streamlit/streamlit/pull/14828), [#16605](https://github.com/streamlit/streamlit/pull/16605)).
- 🍿 Introducing `type="step"` for [`st.expander`](/develop/api-reference/layout/st.expander) and [`st.status`](/develop/api-reference/status/st.status), which renders containers as a connected timeline — well suited to showing an agent's or a pipeline's progress ([#16558](https://github.com/streamlit/streamlit/pull/16558), [#13248](https://github.com/streamlit/streamlit/issues/13248)).

**Notable Changes**

- 📐 The `wrap` parameter introduced in 1.62.0 extends to more commands:
    - [`st.pills`](/develop/api-reference/widgets/st.pills) and [`st.segmented_control`](/develop/api-reference/widgets/st.segmented_control) accept `wrap` to keep options on one horizontally scrollable row ([#16369](https://github.com/streamlit/streamlit/pull/16369), [#13516](https://github.com/streamlit/streamlit/issues/13516)).
    - [`st.markdown`](/develop/api-reference/text/st.markdown), [`st.title`](/develop/api-reference/text/st.title), `st.header`, `st.subheader`, `st.caption`, and `st.text` accept `wrap=False` to keep long copy on one ellipsized line ([#16617](https://github.com/streamlit/streamlit/pull/16617), [#12583](https://github.com/streamlit/streamlit/issues/12583)).
    - Controls placed directly in [`st.columns`](/develop/api-reference/layout/st.columns) now default to no wrapping so neighboring controls keep the same height; pass `wrap=True` to restore wrapping ([#16578](https://github.com/streamlit/streamlit/pull/16578)).
- 🔢 [`st.multiselect`](/develop/api-reference/widgets/st.multiselect) has a new `select_all` parameter to always show, never show, or threshold the "Select all" bulk action, and pressing Enter now selects the first row ([#16673](https://github.com/streamlit/streamlit/pull/16673), [#16537](https://github.com/streamlit/streamlit/issues/16537)).
- 🖼 `st.title`, `st.header`, and `st.subheader` have a new `icon` parameter that renders a leading emoji or Material Symbol scaled to the heading ([#16418](https://github.com/streamlit/streamlit/pull/16418), [#11752](https://github.com/streamlit/streamlit/issues/11752)).
- 🧪 [`AppTest`](/develop/api-reference/app-testing/st.testing.v1.apptest) is more robust: apps using unimplemented commands stay inspectable, interacting with a disabled widget raises, container keys are exposed through `at.container(key=…)` and `at.get_by_key()`, and `switch_page()` resolves pages registered by [`st.navigation`](/develop/api-reference/navigation/st.navigation) ([#16711](https://github.com/streamlit/streamlit/pull/16711), [#9814](https://github.com/streamlit/streamlit/issues/9814), [#12844](https://github.com/streamlit/streamlit/issues/12844), [#13163](https://github.com/streamlit/streamlit/issues/13163), [#16611](https://github.com/streamlit/streamlit/issues/16611)).
- ⚙ The new `runner.cacheBackgroundRefreshTTLMultiplier` config option widens or narrows the stale-while-revalidate window for `refresh_mode="background"` caches ([#16599](https://github.com/streamlit/streamlit/pull/16599)).

**Other Changes**

- 🚨 Invalid API usage raises specific `StreamlitAPIException` subclasses for missing, incompatible, out-of-range, and wrongly typed parameters instead of generic Streamlit, `TypeError`, or `ValueError` failures ([#16508](https://github.com/streamlit/streamlit/pull/16508), [#16637](https://github.com/streamlit/streamlit/pull/16637), [#16656](https://github.com/streamlit/streamlit/pull/16656), [#16668](https://github.com/streamlit/streamlit/pull/16668), [#16690](https://github.com/streamlit/streamlit/pull/16690), [#16701](https://github.com/streamlit/streamlit/pull/16701), [#16707](https://github.com/streamlit/streamlit/pull/16707)).
- 💓 [`st.spinner`](/develop/api-reference/status/st.spinner) keeps animating at a slower rate under `prefers-reduced-motion` and exposes its label as an accessible status, so paused motion is not mistaken for a hung app ([#16620](https://github.com/streamlit/streamlit/pull/16620), [#16598](https://github.com/streamlit/streamlit/issues/16598)).
- 🔗 `st.context` supports key notation so `st.context["timezone"]` matches `st.context.timezone`, `st.user.is_logged_in` is typed as `bool`, and the documented `st.user.tokens` names surface in autocompletion ([#16710](https://github.com/streamlit/streamlit/pull/16710)).
- 🐛 Bug fix: The install-skills prompt shown with local error messages sizes its action labels to match the card's text ([#16482](https://github.com/streamlit/streamlit/pull/16482)).
- 🦋 Bug fix: [`st.code`](/develop/api-reference/text/st.code) renders very long inputs instead of failing with a call-stack error, by skipping syntax highlighting past a line-count threshold ([#16567](https://github.com/streamlit/streamlit/pull/16567), [#11996](https://github.com/streamlit/streamlit/issues/11996)).
- 🪲 Bug fix: [`st.date_input`](/develop/api-reference/widgets/st.date_input) and [`st.datetime_input`](/develop/api-reference/widgets/st.datetime_input) no longer crash for values near Python's minimum and maximum dates when no explicit bounds are given ([#16582](https://github.com/streamlit/streamlit/pull/16582), [#7427](https://github.com/streamlit/streamlit/issues/7427)).
- 🐜 Bug fix: `st.menu_button` dropdowns and JSON path tooltips stay interactive inside [`st.dialog`](/develop/api-reference/execution-flow/st.dialog) ([#16583](https://github.com/streamlit/streamlit/pull/16583)).
- 🐝 Bug fix: Pressing Cmd/Ctrl+C no longer opens the clear-cache dialog when the modifier is released before the C key ([#16615](https://github.com/streamlit/streamlit/pull/16615)).
- 🐞 Bug fix: Markdown list items holding a long unbreakable token wrap inside narrow containers instead of overflowing them ([#16632](https://github.com/streamlit/streamlit/pull/16632), [#16618](https://github.com/streamlit/streamlit/issues/16618)).
- 🕷️ Bug fix: Type checkers infer the documented return types for [`st.plotly_chart`](/develop/api-reference/charts/st.plotly_chart), `st.pydeck_chart`, [`st.file_uploader`](/develop/api-reference/widgets/st.file_uploader), `st.chat_input`, and `st.selectbox` when arguments are omitted or not literals ([#16633](https://github.com/streamlit/streamlit/pull/16633), [#16630](https://github.com/streamlit/streamlit/issues/16630)).
- 🪳 Bug fix: Embedded apps forward the full guest-to-host `postMessage` stream to in-iframe hosts, which unblocks metrics events when `metricsUrl` is `"postMessage"` ([#16647](https://github.com/streamlit/streamlit/pull/16647), [#16644](https://github.com/streamlit/streamlit/issues/16644)).
- 🪰 Bug fix: Ctrl/Cmd+A selects the typed filter text in `st.multiselect` instead of being intercepted as a bulk-select shortcut ([#16650](https://github.com/streamlit/streamlit/pull/16650)).
- 🦠 Bug fix: `st.datetime_input` keeps a time entered before a date, so completing the date commits the time on screen instead of midnight ([#16664](https://github.com/streamlit/streamlit/pull/16664)).
- 🦟 Bug fix: Invalid-color errors render their valid formats as a list, and object reprs with uppercase hexadecimal addresses take the same `st.write` and `st.help` path on Windows as elsewhere ([#16683](https://github.com/streamlit/streamlit/pull/16683), [#16674](https://github.com/streamlit/streamlit/issues/16674), [#16677](https://github.com/streamlit/streamlit/issues/16677)).
- 🦂 Bug fix: The calendar header shows the year matching the visible grid when `min_value` and `max_value` cross a year boundary ([#16706](https://github.com/streamlit/streamlit/pull/16706), [#16686](https://github.com/streamlit/streamlit/issues/16686)).
- 🦗 Bug fix: File uploads no longer hang when in-process ASGI middleware such as Sentry has already read the request body ([#16709](https://github.com/streamlit/streamlit/pull/16709), [#16697](https://github.com/streamlit/streamlit/issues/16697)).
- 🕸️ Bug fix: Library warnings that previously appeared only as in-app alerts also log to the server console with a stack trace, so CLI users and coding agents can see them ([#16717](https://github.com/streamlit/streamlit/pull/16717)).

## Older versions of Streamlit

- [2026 release notes](/develop/quick-reference/release-notes/2026)
- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
