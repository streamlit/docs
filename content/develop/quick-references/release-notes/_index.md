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

- ✨ Introducing `streamlit.typing` (also available as `st.typing`), a public namespace for annotating Streamlit-owned types like `UploadedFile`, `DataframeState`, and `DataEditorState` ([#16295](https://github.com/streamlit/streamlit/pull/16295), [#16275](https://github.com/streamlit/streamlit/pull/16275), [#16351](https://github.com/streamlit/streamlit/pull/16351), [#7801](https://github.com/streamlit/streamlit/issues/7801)).
- 📐 Introducing wrap control for horizontal layouts and widgets. A new `wrap` parameter keeps columns, containers, and labels on one row instead of wrapping:
  - [`st.columns`](/develop/api-reference/layout/st.columns) `wrap=False` disables stacking on narrow viewports ([#16367](https://github.com/streamlit/streamlit/pull/16367), [#5003](https://github.com/streamlit/streamlit/issues/5003), [#2313](https://github.com/streamlit/streamlit/issues/2313)).
  - [`st.container`](/develop/api-reference/layout/st.container) `wrap=False` keeps a horizontal container in a single scrolling row ([#16484](https://github.com/streamlit/streamlit/pull/16484), [#9544](https://github.com/streamlit/streamlit/issues/9544), [#12582](https://github.com/streamlit/streamlit/issues/12582)).
  - Button-like elements (`st.button`, `st.download_button`, `st.link_button`, `st.form_submit_button`, `st.popover`, and `st.menu_button`) can ellipsize overflowing labels ([#16325](https://github.com/streamlit/streamlit/pull/16325)).
  - [`st.checkbox`](/develop/api-reference/widgets/st.checkbox) and [`st.toggle`](/develop/api-reference/widgets/st.toggle) can keep their labels on one row ([#16470](https://github.com/streamlit/streamlit/pull/16470)).
  - [`st.multiselect`](/develop/api-reference/widgets/st.multiselect) keeps selected chips in a single scrolling row ([#16509](https://github.com/streamlit/streamlit/pull/16509), [#12644](https://github.com/streamlit/streamlit/issues/12644)).

**Notable Changes**

- 🎯 [`st.text_input`](/develop/api-reference/widgets/st.text_input) adds `email`, `url`, `phone`, and `search` types, plus a `validate` parameter for client-side regex checks ([#16385](https://github.com/streamlit/streamlit/pull/16385), [#15714](https://github.com/streamlit/streamlit/pull/15714), [#6704](https://github.com/streamlit/streamlit/issues/6704), [#8790](https://github.com/streamlit/streamlit/issues/8790)).
- 📅 [`st.date_input`](/develop/api-reference/widgets/st.date_input) has been rebuilt with accessible segmented fields and keyboard calendar navigation ([#16460](https://github.com/streamlit/streamlit/pull/16460), [#7865](https://github.com/streamlit/streamlit/issues/7865), [#8556](https://github.com/streamlit/streamlit/issues/8556)).
- ⏱ [`st.datetime_input`](/develop/api-reference/widgets/st.datetime_input) uses the same segmented editor, with a time row in the calendar popover ([#16501](https://github.com/streamlit/streamlit/pull/16501), [#16502](https://github.com/streamlit/streamlit/pull/16502)).
- 🎨 Chart color theme options (`chartCategoricalColors`, `chartSequentialColors`, and `chartDivergingColors`) can now be set in `theme.light`, `theme.dark`, and sidebar sections ([#16357](https://github.com/streamlit/streamlit/pull/16357), [#16355](https://github.com/streamlit/streamlit/issues/16355)).
- 🔤 Theme font weights now accept 50-step values like 150 or 550 ([#16396](https://github.com/streamlit/streamlit/pull/16396), [#16354](https://github.com/streamlit/streamlit/issues/16354)).
- 🧠 When Streamlit raises an error during local development, an "Install skills" callout appears below the exception if agent skills aren't installed ([#15693](https://github.com/streamlit/streamlit/pull/15693)).
- ⚙ New `runner.cacheHashSeed` config option lets you change the sample used when hashing large cached objects ([#16284](https://github.com/streamlit/streamlit/pull/16284), [#14622](https://github.com/streamlit/streamlit/issues/14622)).
- 👻 **Breaking change:** The deprecated `st.cache` command has been removed. Use [`st.cache_data`](/develop/api-reference/caching-and-state/st.cache_data) or [`st.cache_resource`](/develop/api-reference/caching-and-state/st.cache_resource) instead ([#15787](https://github.com/streamlit/streamlit/pull/15787)).
- ❌ **Breaking change:** [`st.pyplot`](/develop/api-reference/charts/st.pyplot) now requires a figure. Calling it without one no longer uses Matplotlib's global figure ([#16464](https://github.com/streamlit/streamlit/pull/16464)).
- ☠️ **Breaking change:** Passing Matplotlib `savefig` keyword arguments to `st.pyplot` is deprecated. Save the figure and pass it to `st.image` instead ([#16450](https://github.com/streamlit/streamlit/pull/16450)).

**Other Changes**

- 🐛 Bug fix: `st.popover` contents stay within narrow and embedded viewports ([#16173](https://github.com/streamlit/streamlit/pull/16173), [#9340](https://github.com/streamlit/streamlit/issues/9340)).
- 🦋 Bug fix: `st.pyplot` supports `format="svg"` without crashing ([#16283](https://github.com/streamlit/streamlit/pull/16283), [#11489](https://github.com/streamlit/streamlit/issues/11489)).
- 🪲 Bug fix: Heading anchors update when heading text changes on rerun ([#16286](https://github.com/streamlit/streamlit/pull/16286), [#8793](https://github.com/streamlit/streamlit/issues/8793)).
- 🐜 Bug fix: Altair charts rebuilt with `alt.Chart.from_json` keep their inline data ([#16288](https://github.com/streamlit/streamlit/pull/16288), [#6269](https://github.com/streamlit/streamlit/issues/6269)).
- 🐝 Bug fix: Nested fragments with `run_every` no longer duplicate widgets when an ancestor rerun already rendered them ([#16314](https://github.com/streamlit/streamlit/pull/16314), [#10719](https://github.com/streamlit/streamlit/issues/10719)).
- 🐞 Bug fix: Hashing falls back to MD5 on FIPS builds where BLAKE2b rejects a custom digest size ([#16324](https://github.com/streamlit/streamlit/pull/16324), [#15148](https://github.com/streamlit/streamlit/issues/15148)).
- 🕷️ Bug fix: A malformed WebSocket `BackMsg` closes the connection instead of sending a traceback to the browser ([#16392](https://github.com/streamlit/streamlit/pull/16392), [#16391](https://github.com/streamlit/streamlit/issues/16391)).
- 🪳 Bug fix: The `server.enableCORS=false` startup warning no longer claims CORS is overridden to true ([#16393](https://github.com/streamlit/streamlit/pull/16393), [#16390](https://github.com/streamlit/streamlit/issues/16390)).
- 🪰 Bug fix: Derived `codeBackgroundColor` and `dataframeHeaderBackgroundColor` follow a custom background instead of the base theme ([#16401](https://github.com/streamlit/streamlit/pull/16401), [#16398](https://github.com/streamlit/streamlit/issues/16398)).
- 🦠 Bug fix: `st.slider` rejects date and time bounds outside the frontend-safe range instead of snapping silently ([#16475](https://github.com/streamlit/streamlit/pull/16475), [#16474](https://github.com/streamlit/streamlit/issues/16474)).
- 🦟 Bug fix: `st.toast` is preserved when `st.rerun()` follows immediately after ([#16498](https://github.com/streamlit/streamlit/pull/16498), [#7740](https://github.com/streamlit/streamlit/issues/7740)).
- 🦂 Bug fix: `st.color_picker` is interactive inside `st.dialog` again ([#16541](https://github.com/streamlit/streamlit/pull/16541), [#16538](https://github.com/streamlit/streamlit/issues/16538)).
- 🦗 Bug fix: `st.metric` sparklines reappear after chart data goes empty and is later populated ([#16543](https://github.com/streamlit/streamlit/pull/16543), [#16539](https://github.com/streamlit/streamlit/issues/16539)).
- 🕸️ Bug fix: `st.date_input` and `st.datetime_input` no longer overflow in narrow containers, and the calendar marks today ([#16565](https://github.com/streamlit/streamlit/pull/16565)).
- 📏 `st.table` uses 14px font to match other widgets ([#16397](https://github.com/streamlit/streamlit/pull/16397), [#16389](https://github.com/streamlit/streamlit/issues/16389)).
- 📦 Streamlit no longer depends on `tenacity` ([#16497](https://github.com/streamlit/streamlit/pull/16497)).
- 🔌 Streamlit is compatible with Starlette 1.4+ after gzip middleware updates ([#16344](https://github.com/streamlit/streamlit/pull/16344), [#16462](https://github.com/streamlit/streamlit/pull/16462), [#16341](https://github.com/streamlit/streamlit/issues/16341)).

## Older versions of Streamlit

- [2026 release notes](/develop/quick-reference/release-notes/2026)
- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
