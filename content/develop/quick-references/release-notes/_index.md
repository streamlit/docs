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

## **Version 1.40.0 (latest)**

_Release date: November 6, 2024_

**Highlights**

- 💊 Introducing [`st.pills`](/develop/api-reference/widgets/st.pills) to create a single- or multi-select group of pill-buttons.
- 🎛️ Introducing [`st.segmented_control`](/develop/api-reference/widgets/st.segmented_control) to create a segmented button or button group.
- 🎤 Announcing the general availability of [`st.audio_input`](), a widget to let users record sound with their microphones.

**Notable Changes**

- ➡️ Markdown renders a limited set of typographical symbols (arrows and comparators).
- <img src="/logo.svg" style={{ display: "inline-block", width: "1em" }} /> You can use `:streamlit:` to render the Streamlit logo in [Markdown](/develop/api-reference/text/st.markdown).
- 🐍 [`st.text`](/develop/api-reference/text/st.text) wraps text and no longer uses monospace font.
- 🪣 You can set `use_container_width` for [`st.image`](/develop/api-reference/media/st.image). `use_column_width` is deprecated.
- 📅 [`st.date_input`](/develop/api-reference/widgets/st.date_input) infers the first day of the week from the user's locale ([#9706](https://github.com/streamlit/streamlit/pull/9706), [#5215](https://github.com/streamlit/streamlit/issues/5215)).

**Other Changes**

- 🎶 Streamlit's CLI tool accepts array values for configuration options ([#9577](https://github.com/streamlit/streamlit/pull/9577)).
- ⛓️ Static file serving supports symlinks ([#9147](https://github.com/streamlit/streamlit/pull/9147), [#9146](https://github.com/streamlit/streamlit/issues/9146)). Thanks, [link89](https://github.com/link89)!
- 🚀 Streamlit provides helpful links for deployment when an app is running locally ([#9681](https://github.com/streamlit/streamlit/pull/9681)).
- ↕️ The fullscreen button for charts matches with the dataframe toolbar ([#9721](https://github.com/streamlit/streamlit/pull/9721)).
- 🏃 The running-man icon has a brief delay before rendering to avoid an unnecessary flicker for fast running apps ([#9732](https://github.com/streamlit/streamlit/pull/9732)).
- 🖇️ The `ComponentRequestHandler` allows symlinks ([#9588](https://github.com/streamlit/streamlit/pull/9588)).
- 👆 Streamlit works with `pillow` version 11 ([#9742](https://github.com/streamlit/streamlit/pull/9742)). Thanks, [hauntsaninja](https://github.com/hauntsaninja)!
- 🗺️ Deck.gl was upgraded to version 9.0.33 ([#9636](https://github.com/streamlit/streamlit/pull/9636)).
- 🦠 Bug fix: `st.latex` stays center-aligned when using the `help` keyword argument ([#9698](https://github.com/streamlit/streamlit/pull/9698), [#9682](https://github.com/streamlit/streamlit/issues/9682)). Thanks, [emmagarr](https://github.com/emmagarr)!
- 🪰 Bug fix: Apps correctly access local storage on Android ([#9744](https://github.com/streamlit/streamlit/pull/9744), [#9740](https://github.com/streamlit/streamlit/issues/9740)).
- 🕷️ Bug fix: Cached class methods can be cleared ([#9642](https://github.com/streamlit/streamlit/pull/9642), [#9633](https://github.com/streamlit/streamlit/issues/9633)).
- 🐞 Bug fix: Streamlit clears fragment auto-reruns when a user changes pages. This prevents an invalid index ([#9617](https://github.com/streamlit/streamlit/pull/9617)).
- 🐝 Bug fix: `st.page_link` margins are correct ([#9625](https://github.com/streamlit/streamlit/pull/9625)).
- 🐜 Bug fix: Form widgets show submission instructions when in focus ([#9576](https://github.com/streamlit/streamlit/pull/9576), [#7079](https://github.com/streamlit/streamlit/issues/7079)).
- 🪲 Bug fix: `st.navigation` correctly reconciles `client.showSidebarNavigation` ([#9589](https://github.com/streamlit/streamlit/pull/9589), [#9581](https://github.com/streamlit/streamlit/issues/9581)).
- 🐛 Bug fix: `st.text_area` requires a minimum height of 68px which fits two lines ([#9561](https://github.com/streamlit/streamlit/pull/9561), [#9217](https://github.com/streamlit/streamlit/issues/9217)).
- 💅 Bug fix: Various styling fixes ([#9529](https://github.com/streamlit/streamlit/pull/9529), [#8131](https://github.com/streamlit/streamlit/issues/8131), [#9555](https://github.com/streamlit/streamlit/pull/9555), [#9496](https://github.com/streamlit/streamlit/issues/9496), [#9554](https://github.com/streamlit/streamlit/pull/9554), [#9349](https://github.com/streamlit/streamlit/issues/9349), [#7739](https://github.com/streamlit/streamlit/issues/7739)).

## Older versions of Streamlit

- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
