---
title: Release notes
slug: /develop/quick-reference/release-notes
description: A changelog of highlights and fixes for each version of Streamlit.
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

## **Version 1.41.0 (latest)**

_Release date: December 10, 2024_

**Notable Changes**

- 🔲 [`st.metric`](/develop/api-reference/data/st.metric) and [`st.columns`](/develop/api-reference/layout/st.columns) have a parameter to show an optional border ([#9927](https://github.com/streamlit/streamlit/pull/9927), [#9928](https://github.com/streamlit/streamlit/pull/9928)).
- 🎨 Text and background color in [Markdown](/develop/api-reference/text/st.markdown) can use the "primary" color from the `theme.primaryColor` configuration option ([#9676](https://github.com/streamlit/streamlit/pull/9676)).
- 🥶 You can freeze columns with [column configuration](/develop/api-reference/data/st.column_config) to make them always visible when scrolling horizontally ([#9535](https://github.com/streamlit/streamlit/pull/9535), [#7078](https://github.com/streamlit/streamlit/issues/7078)).
- 3️⃣ The `type` parameter for [buttons](/develop/api-reference/widgets/st.button) accepts a new option, `"tertiary"` ([#9923](https://github.com/streamlit/streamlit/pull/9923)).
- 🚶‍♂️ Streamlit supports `pathlib.Path` objects everywhere you can use a string path ([#9711](https://github.com/streamlit/streamlit/pull/9711), [#9783](https://github.com/streamlit/streamlit/pull/9783)).
- ⏱️ [`st.date_input`](/develop/api-reference/widgets/st.date_input) and [`st.time_input`](/develop/api-reference/widgets/st.time_input) accept ISO formatted strings for initial values ([#9753](https://github.com/streamlit/streamlit/pull/9753)).
- 💬 [`st.write_stream`](/develop/api-reference/write-magic/st.write_stream) accepts async generators, which it converts internally to sync generators ([#8724](https://github.com/streamlit/streamlit/pull/8724), [#8161](https://github.com/streamlit/streamlit/issues/8161)).
- 🪵 The [`client.showErrorDetails`](/develop/api-reference/configuration/config.toml#client) configuration option has additional values to show or hide more information ([#9909](https://github.com/streamlit/streamlit/pull/9909)).
- 🔎 When Streamlit shows stack traces in the app for uncaught exceptions, internal code is omitted or reduced for easier debugging ([#9913](https://github.com/streamlit/streamlit/pull/9913)).
- 📈 [`st.line_chart`](/develop/api-reference/charts/st.line_chart) shows tooltips for the nearest point on hover ([#9674](https://github.com/streamlit/streamlit/pull/9674)).
- 🌐 [`st.html`](/develop/api-reference/utilities/st.html) will attempt to convert non-string objects with `._repr_html_()` before falling back to `str()` ([#9877](https://github.com/streamlit/streamlit/pull/9877)).
- 🐍 Streamlit supports Python 3.13 and no longer supports Python 3.8 ([#9635](https://github.com/streamlit/streamlit/pull/9635)).

**Other Changes**

- 🔣 Material Symbols have been updated with the latest icons ([#9813](https://github.com/streamlit/streamlit/pull/9813), [#9810](https://github.com/streamlit/streamlit/issues/9810)).
- 👽 Streamlit supports Watchdog version 6 ([#9785](https://github.com/streamlit/streamlit/pull/9785)). Thanks, [RubenVanEldik](https://github.com/RubenVanEldik).
- 🌀 Bug fix: Streamlit only shows cached function spinners on cache misses and doesn't show spinners for nested cached functions ([#9956](https://github.com/streamlit/streamlit/pull/9956), [#9951](https://github.com/streamlit/streamlit/issues/9951)).
- 🔈 Bug fix: Streamlit's audio buffer handles channels better to correctly play audio recordings in Firefox ([#9885](https://github.com/streamlit/streamlit/pull/9885), [#9799](https://github.com/streamlit/streamlit/issues/9799)).
- 🦊 Bug fix: URL patterns are matched correctly to allow Community Cloud developer tools to display correctly in Firefox ([#9849](https://github.com/streamlit/streamlit/pull/9849), [#9848](https://github.com/streamlit/streamlit/issues/9848)).
- ☠️ Bug fix: Corrected a performance and alignment problem with containers ([#9901](https://github.com/streamlit/streamlit/pull/9901), [#9456](https://github.com/streamlit/streamlit/issues/9456), [#9560](https://github.com/streamlit/streamlit/issues/9560)).
- 👻 Bug fix: `st.rerun` will raise an error if an invalid `scope` is passed to it ([#9911](https://github.com/streamlit/streamlit/pull/9911), [#9908](https://github.com/streamlit/streamlit/issues/9908)).
- 🦋 Bug fix: Dataframe toolbars show correctly in dialogs ([#9897](https://github.com/streamlit/streamlit/pull/9897), [#9461](https://github.com/streamlit/streamlit/issues/9461)).
- 🦀 Bug fix: `LinkColumn` regex for `display_text` uses the correct URI decoding ([#9895](https://github.com/streamlit/streamlit/pull/9895), [#9893](https://github.com/streamlit/streamlit/issues/9893)).
- 🦎 Bug fix: `st.dataframe` has correct type hinting when `on_selection="ignore"` ([#9898](https://github.com/streamlit/streamlit/pull/9898), [#9669](https://github.com/streamlit/streamlit/issues/9669)).
- 🐌 Bug fix: Padding is applied consistently for wide and centered layout mode ([#9882](https://github.com/streamlit/streamlit/pull/9882), [#9707](https://github.com/streamlit/streamlit/issues/9707)).
- 🕸️ Bug fix: `st.graphviz_chart` is displayed correctly when `use_container_width=True` ([#9867](https://github.com/streamlit/streamlit/pull/9867), [#9866](https://github.com/streamlit/streamlit/issues/9866)).
- 🦗 Bug fix: The overloaded definitions of `st.pills` and `st.segmented_control` use the correct selection-mode default ([#9801](https://github.com/streamlit/streamlit/pull/9801)). Thanks, [RubenVanEldik](https://github.com/RubenVanEldik)!
- 🦂 Bug fix: `st.text_area` (and other widgets) are correctly submitted in a form when using `Ctrl+Enter` ([#9847](https://github.com/streamlit/streamlit/pull/9847), [#9841](https://github.com/streamlit/streamlit/issues/9841)).
- 🦟 Bug Fix: `st.write` renders `DeltaGenerator` objects with [`st.help`](http://st.help) ([#9828](https://github.com/streamlit/streamlit/pull/9828), [#9827](https://github.com/streamlit/streamlit/issues/9827)).
- 🦠 Bug fix: `st.text_area` correctly matches the value in Session State when used with a key ([#9829](https://github.com/streamlit/streamlit/pull/9829), [#9825](https://github.com/streamlit/streamlit/issues/9825)).
- 🪰 Bug fix: `st.text_input` does not trigger a rerun when a user submits an unchanged value ([#9826](https://github.com/streamlit/streamlit/pull/9826)).
- 🪳 Bug fix: Improved styling for `st.exception` to fix overflow and incorrect padding ([#9818](https://github.com/streamlit/streamlit/pull/9818), [#9817](https://github.com/streamlit/streamlit/issues/9817), [#9816](https://github.com/streamlit/streamlit/issues/9816)).
- 🕷️ Bug fix: Large dataframe don't overflow and cover the dataframe toolbar in fullscreen mode ([#9803](https://github.com/streamlit/streamlit/pull/9803), [#9798](https://github.com/streamlit/streamlit/issues/9798)).
- 🐞 Bug fix: `st.audio_input` shows the correct time on recording in time zones with a half-hour offset ([#9791](https://github.com/streamlit/streamlit/pull/9791), [#9631](https://github.com/streamlit/streamlit/issues/9631)).
- 🐝 Bug fix: In iOS, `st.number_input` shows a number pad instead of a keyboard when in focus ([#9766](https://github.com/streamlit/streamlit/pull/9766), [#9763](https://github.com/streamlit/streamlit/issues/9763)).
- 🐜 Bug fix: Widget keys containing hyphens are correctly added to HTML classes in the DOM with an `st-key-` prefix ([#9793](https://github.com/streamlit/streamlit/pull/9793)).
- 🪲 Bug fix: Audio files created by `st.audio_input` include a timestamp to ensure unique file names ([#9768](https://github.com/streamlit/streamlit/pull/9768)).
- 🐛 Bug fix: Double slash URL pathnames do not create a 301 redirect ([#9754](https://github.com/streamlit/streamlit/pull/9754), [#9690](https://github.com/streamlit/streamlit/issues/9690)).

## Older versions of Streamlit

- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
