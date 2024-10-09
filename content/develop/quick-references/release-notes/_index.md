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

## **Version 1.39.0 (latest)**

_Release date: October 1, 2024_

**Highlights**

- 🎤 Introducing [`st.experimental_audio_input`](/develop/api-reference/widgets/st.audio_input) to let users record with their microphones!
- 📍 [`st.pydeck_chart`](/develop/api-reference/charts/st.pydeck_chart#chart-selections) can return selection events!

**Notable Changes**

- 😃 [`st.button`](/develop/api-reference/widgets/st.button), [`st.download_button`](/develop/api-reference/widgets/st.download_button), [`st.form_submit_button`](/develop/api-reference/execution-flow/st.form_submit_button), [`st.link_button`](/develop/api-reference/widgets/st.link_button), and [`st.popover`](/develop/api-reference/layout/st.popover) each have a new parameter to add an icon.
- 🏢 [`st.logo`](/develop/api-reference/media/st.logo) has a new parameter to adjust the size of your logo.
- 🧭 [`st.navigation`](/develop/api-reference/navigation/st.navigation) lets you display an always-expanded or collapsible menu using a new `expanded` parameter.
- ↕️ You can set `height` and `width` for [`st.map`](/develop/api-reference/charts/st.map) and [`st.pydeck_chart`](/develop/api-reference/charts/st.pydeck_chart).
- ↩️ Form submission behavior can be configured with a new `enter_to_submit` parameter ([#9480](https://github.com/streamlit/streamlit/pull/9480), [#7538](https://github.com/streamlit/streamlit/issues/7538), [#9406](https://github.com/streamlit/streamlit/pull/9406), [#8042](https://github.com/streamlit/streamlit/issues/8042)).
- ⏱️ A new config option, `server.disconnectedSessionTTL`, lets you set a minimum time before a disconnected session is cleaned up ([#9179](https://github.com/streamlit/streamlit/pull/9179)).
- 🤹 Dataframes support multi-index headers ([#9483](https://github.com/streamlit/streamlit/pull/9483), [#6319](https://github.com/streamlit/streamlit/issues/6319)).

**Other Changes**

- 🔑 Widget keys appear as HTML classes in the DOM with an `st-key-` prefix ([#9295](https://github.com/streamlit/streamlit/pull/9295), [#5437](https://github.com/streamlit/streamlit/issues/5437), [#3888](https://github.com/streamlit/streamlit/issues/3888)).
- 🔍 The `StreamlitAPIException` class has been extended into more specific exceptions for some of the most common errors ([#9318](https://github.com/streamlit/streamlit/pull/9318)).
- 🗺️ `st.map` and `st.pydeck_chart` have a full-screen toggle that matches the dataframe toolbar.
- ⬆️ Frontend dependencies for Vega have been upgraded ([#9443](https://github.com/streamlit/streamlit/pull/9443), [#9438](https://github.com/streamlit/streamlit/issues/9438)).
- 🕵️ Streamlit is compatible with Watchdog version 5 ([#9354](https://github.com/streamlit/streamlit/pull/9354)). Thanks, [RubenVanEldik](https://github.com/RubenVanEldik)!
- 🔁 Streamlit is compatible with Tenacity version 9 ([#9348](https://github.com/streamlit/streamlit/pull/9348)).
- 🔢 Bug fix: Column configuration will override any text or number format from `pandas.Styler` ([#9538](https://github.com/streamlit/streamlit/pull/9538), [#7329](https://github.com/streamlit/streamlit/issues/7329), [#7977](https://github.com/streamlit/streamlit/issues/7977)).
- 🦋 Bug fix: Deck GL zoom button has the correct border radius ([#9536](https://github.com/streamlit/streamlit/pull/9536)).
- 🦐 Bug fix: Embedded apps have the correct padding to avoid hiding elements ([#9524](https://github.com/streamlit/streamlit/pull/9524), [#9341](https://github.com/streamlit/streamlit/issues/9341)).
- 🎨 Bug fix: The `st.multiselect` placeholder text has the correct color ([#9523](https://github.com/streamlit/streamlit/pull/9523), [#9514](https://github.com/streamlit/streamlit/issues/9514)).
- 🧹 Bug fix: `st.json` scrolls horizontally instead of overflowing its container ([#9521](https://github.com/streamlit/streamlit/pull/9521), [#9520](https://github.com/streamlit/streamlit/issues/9520)).
- 🌬️ Bug fix: Bokeh charts (temporarily) don't have a fullscreen button to prevent horizontal scrolling ([#9528](https://github.com/streamlit/streamlit/pull/9528), [#2358](https://github.com/streamlit/streamlit/issues/2358)).
- 🐡 Bug fix: Users are correctly redirected if they add a trailing slash to a page URL ([#9500](https://github.com/streamlit/streamlit/pull/9500), [#9127](https://github.com/streamlit/streamlit/issues/9127)).
- 📁 Bug fix: `st.Page` warns developers against using subdirectories in `url_path`, which is not supported ([#9499](https://github.com/streamlit/streamlit/pull/9499)).
- 💩 Bug fix: Streamlit correctly calculates dataframe widths to prevent Minified React error #185: Maximum update depth exceeded ([#9490](https://github.com/streamlit/streamlit/pull/9490), [#7949](https://github.com/streamlit/streamlit/issues/7949)).
- ☠️ Bug fix: ScriptRunContext handles the active script hash to avoid a race condition where widgets lose state in a multipage app ([#9441](https://github.com/streamlit/streamlit/pull/9441), [#9100](https://github.com/streamlit/streamlit/issues/9100)).
- 🪱 Bug fix: PDFs don't appear as plain text when hosted through static file serving in Streamlit ([#9439](https://github.com/streamlit/streamlit/pull/9439), [#9425](https://github.com/streamlit/streamlit/issues/9425)).
- 👻 Bug fix: Fragment elements don't disappear when used with custom components and callbacks ([#9381](https://github.com/streamlit/streamlit/pull/9381), [#9389](https://github.com/streamlit/streamlit/pull/9389), [#9372](https://github.com/streamlit/streamlit/issues/9372)).
- 👽 Bug fix: Streamlit watches the correct directory for file changes ([#9453](https://github.com/streamlit/streamlit/pull/9453), [#7467](https://github.com/streamlit/streamlit/issues/7467)).
- 🦀 Bug fix: The sidebar navigation uses page count to determine when to display a "show more" button for more consistent behavior ([#9394](https://github.com/streamlit/streamlit/pull/9394)).
- 🦎 Bug fix: The internal script hash is updated at the beginning of a script run instead of the end for correct page routing when a script run is interrupted ([#9408](https://github.com/streamlit/streamlit/pull/9408), [#8975](https://github.com/streamlit/streamlit/issues/8975)).
- 🐌 Bug fix: Bold formatting in headers is ignored ([#9395](https://github.com/streamlit/streamlit/pull/9395), [#4248](https://github.com/streamlit/streamlit/issues/4428)).
- 🕸️ Bug fix: Streamlit correctly identifies the MIME type of more files to prevent custom components from not rendering ([#9390](https://github.com/streamlit/streamlit/pull/9390), [#9365](https://github.com/streamlit/streamlit/issues/9365)). Thanks, [t0mdavid-m](https://github.com/t0mdavid-m)!
- 🦗 Bug fix: The `client.showSidebarNavigation` configuration option works correctly with `st.navigation` ([#9379](https://github.com/streamlit/streamlit/pull/9379)).
- 🦂 Bug fix: Streamlit uses `example.com` instead of `test.com` in a health check to avoid unnecessary warnings ([#9371](https://github.com/streamlit/streamlit/pull/9371)). Thanks, [wyattscarpenter](https://github.com/wyattscarpenter)!
- 🦟 Bug fix: `st.Page` will raise an error if it tries to initialize a page with an empty path ([#9374](https://github.com/streamlit/streamlit/pull/9374), [#8892](https://github.com/streamlit/streamlit/issues/8892)).
- 🦠 Bug fix: An unchanged `st.dialog` can be programmatically reopened after a user has dismissed it ([#9333](https://github.com/streamlit/streamlit/pull/9333), [#9323](https://github.com/streamlit/streamlit/issues/9323)).
- 🪰 Bug fix: Streamlit will not remove underscores from declared page titles in `st.Page` ([#9375](https://github.com/streamlit/streamlit/pull/9375), [#8890](https://github.com/streamlit/streamlit/issues/8890)).
- 🪳 Bug fix: `st.logo` does not flicker when switching pages ([#9361](https://github.com/streamlit/streamlit/pull/9361), [#8815](https://github.com/streamlit/streamlit/issues/8815)).
- 🕷️ Bug fix: `st.data_editor` allows users to re-add a row with the same index after deleting it ([#8864](https://github.com/streamlit/streamlit/pull/8864), [#8854](https://github.com/streamlit/streamlit/issues/8854)).
- 🐞 Bug fix: `st.logo` maintains its aspect ratio when resized to fit within the sidebar width ([#9368](https://github.com/streamlit/streamlit/pull/9368)).
- 🐝 Bug fix: Streamlit correctly removes `st.logo` if not called during a rerun ([#9337](https://github.com/streamlit/streamlit/pull/9337), [#9336](https://github.com/streamlit/streamlit/issues/9336)).
- 🐜 Bug fix: `st.logo` does not flicker when the sidebar changes its state ([#9338](https://github.com/streamlit/streamlit/pull/9338)).
- 🪲 Bug fix: Streamlit renders `st.balloons` and `st.snow` in a React Portal for improved rendering and compatibility with `st.dialog` ([#9335](https://github.com/streamlit/streamlit/pull/9335), [#9236](https://github.com/streamlit/streamlit/issues/9236)).
- 🐛 Bug fix: Option labels are cleanly truncated when `st.multiselect` is displayed in a narrow container ([#9334](https://github.com/streamlit/streamlit/pull/9334), [#8213](https://github.com/streamlit/streamlit/issues/8213)).

## Older versions of Streamlit

- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
