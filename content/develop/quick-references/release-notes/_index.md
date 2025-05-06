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

## **Version 1.45.0 (latest)**

_Release date: April 29, 2025_

**Highlights**

- 🧑 Announcing the general availability of [`st.user`](https://docs.streamlit.io/develop/api-reference/user/st.user), a dict-like object to access information about the current user.

**Notable Changes**

- ➕ [`st.multiselect`](https://docs.streamlit.io/develop/api-reference/widgets/st.multiselect) and [`st.selectbox`](https://docs.streamlit.io/develop/api-reference/widgets/st.selectbox) have a new parameter to let users add new options.
- 🥸 [`st.context`](https://docs.streamlit.io/develop/api-reference/caching-and-state/st.context) has new attributes: `url`, `ip_address`, and `is_embedded`.
- ⚠️ Text [alerts](https://docs.streamlit.io/develop/api-reference/status/st.success) and [exceptions](https://docs.streamlit.io/develop/api-reference/status/st.exception) have a new `width` parameter ([#11142](https://github.com/streamlit/streamlit/pull/11142)).
- ⌨️ You can set the tab index for [`st.components.v1.html`](https://docs.streamlit.io/develop/api-reference/custom-components/st.components.v1.html) and [`st.components.v1.iframe`](https://docs.streamlit.io/develop/api-reference/custom-components/st.components.v1.iframe) ([#11065](https://github.com/streamlit/streamlit/pull/11065), [#7969](https://github.com/streamlit/streamlit/issues/7969)).
- 🌐 When you pass a CSS file's path to [`st.html`](https://docs.streamlit.io/develop/api-reference/text/st.html), Streamlit will automatically insert `<style>` tags and avoid creating extra space in the app ([#10979](https://github.com/streamlit/streamlit/pull/10979), [#9388](https://github.com/streamlit/streamlit/issues/9388), [#10027](https://github.com/streamlit/streamlit/issues/10027)).
- 😃 You can add an icon to the left of the value in [`st.text_input`](https://docs.streamlit.io/develop/api-reference/widgets/st.text_input) and [`st.number_input`](https://docs.streamlit.io/develop/api-reference/widgets/st.number_input).

**Other Changes**

- 🗑️ Per the scheduled deprecation, `st.experimental_audio_input` has been removed. Use `st.audio_input` instead.
- 💅 Various elements received styling tweaks for consistency and compatibility with advanced theming ([#10916](https://github.com/streamlit/streamlit/pull/10916), [#10930](https://github.com/streamlit/streamlit/pull/10930), [#10915](https://github.com/streamlit/streamlit/pull/10915), [#10944](https://github.com/streamlit/streamlit/pull/10944), [#10990](https://github.com/streamlit/streamlit/pull/10990), [#11033](https://github.com/streamlit/streamlit/pull/11033), [#11034](https://github.com/streamlit/streamlit/pull/11034)).
- ⚒️ The element toolbar sizing and spacing was adjusted for improved UX ([#11135](https://github.com/streamlit/streamlit/pull/11135), [#11155](https://github.com/streamlit/streamlit/pull/11155)).
- 🫥 Bug fix: Streamlit does not display a frontend error when displaying an empty dataframe ([#11100](https://github.com/streamlit/streamlit/pull/11100), [#11064](https://github.com/streamlit/streamlit/issues/11064)).
- 🔁 Bug fix: `st.context` retains its information when calling `st.rerun` ([#11113](https://github.com/streamlit/streamlit/pull/11113), [#11111](https://github.com/streamlit/streamlit/issues/11111)).
- 💩 Bug fix: `st.camera_input` has the correct color and hover effect when disabled ([#11116](https://github.com/streamlit/streamlit/pull/11116)).
- 🎤 Bug fix: `st.audio_input` has consistent color and hover effects with other widgets ([#11118](https://github.com/streamlit/streamlit/pull/11118)).
- ↔️ Bug fix: `st.logo` displays correctly when the sidebar is resized ([#11063](https://github.com/streamlit/streamlit/pull/11063), [#11062](https://github.com/streamlit/streamlit/issues/11062)).
- 📂 Bug fix: `st.file_uploader` can handle multi-part file extensions in its `type` parameter ([#11043](https://github.com/streamlit/streamlit/pull/11043), [#11041](https://github.com/streamlit/streamlit/issues/11041)). Thanks, [moutayam](https://github.com/moutayam)!
- 💈 Bug fix: `theme.fontFaces` correctly supports font style ([#11098](https://github.com/streamlit/streamlit/pull/11098), [#11097](https://github.com/streamlit/streamlit/issues/11097)).
- 🧹 Bug fix: `streamlit init` specifies file encoding to avoid errors in systems where UTF-8 is not the default ([#11090](https://github.com/streamlit/streamlit/pull/11090), [#11086](https://github.com/streamlit/streamlit/issues/11086)). Thanks, [ashm-dev](https://github.com/ashm-dev)!
- 📜 Bug fix: In the sidebar, space is reserved for the scrollbar to prevent flickering from resizing ([#10733](https://github.com/streamlit/streamlit/pull/10733), [#10310](https://github.com/streamlit/streamlit/issues/10310)).
- 🪱 Bug fix: `st.logo` supports SVGs defined with a `viewBox` ([#11038](https://github.com/streamlit/streamlit/pull/11038), [#10904](https://github.com/streamlit/streamlit/issues/10904)).
- ☠️ Bug fix: `st.date_input` raises an error in the UI if a user enters a date outside of the specified allowed range ([#10764](https://github.com/streamlit/streamlit/pull/10764), [#8475](https://github.com/streamlit/streamlit/issues/8475)).
- 👽 Bug fix: `st.snow` and `st.balloons` don't incorrectly rerun during a fragment rerun ([#11015](https://github.com/streamlit/streamlit/pull/11015), [#10961](https://github.com/streamlit/streamlit/issues/10961)).
- 👻 Bug fix: When updating `config.toml`during development, Streamlit will elegantly handle invalid TOML formatting and reload the configuration file on the next save ([#10857](https://github.com/streamlit/streamlit/pull/10857), [#1256](https://github.com/streamlit/streamlit/issues/1256), [#8320](https://github.com/streamlit/streamlit/issues/8320)).
- 🦋 Bug fix: Streamlit applies the correct hover effect when colored text is used in button labels ([#10996](https://github.com/streamlit/streamlit/pull/10996), [#8767](https://github.com/streamlit/streamlit/issues/8767)).
- 🦀 Bug fix: Streamlit ignores `__init__.py` and dotfiles in the `/pages` directory when automatically declaring pages in a multipage app ([#11009](https://github.com/streamlit/streamlit/pull/11009), [#11006](https://github.com/streamlit/streamlit/issues/11006)).
- ⏩ `st.write` received an optimization tweak for rendering strings ([#10985](https://github.com/streamlit/streamlit/pull/10985)).
- 🦎 Bug fix: `st.html` renders at 100% width for correct sizing ([#10976](https://github.com/streamlit/streamlit/pull/10976), [#10964](https://github.com/streamlit/streamlit/issues/10964)).
- 🐌 Bug fix: Page links become disabled if a client disconnects from the Streamlit server ([#10946](https://github.com/streamlit/streamlit/pull/10946), [#9198](https://github.com/streamlit/streamlit/issues/9198)).
- 🕸️ Bug fix: Streamlit supports newer emojis in page icons ([#10912](https://github.com/streamlit/streamlit/pull/10912), [#11154](https://github.com/streamlit/streamlit/pull/11154)).
- 🦗 Bug fix: `st.exception` only shows links to Google and ChatGPT when the app is being accessed through [`localhost`](http://localhost) ([#10971](https://github.com/streamlit/streamlit/pull/10971), [#10924](https://github.com/streamlit/streamlit/issues/10924)).
- 🦂 Bug fix: `st.chat_input` will expand to show multi-line placeholder text in most browsers. Firefox does not support this fix ([#10931](https://github.com/streamlit/streamlit/pull/10931), [#10611](https://github.com/streamlit/streamlit/issues/10611)).
- 🦟 Bug fix: Streamlit elegantly catches a `TypeError` when concurrent changes to rows and columns cause a failure in serialization ([#10954](https://github.com/streamlit/streamlit/pull/10954), [#10937](https://github.com/streamlit/streamlit/issues/10937)).
- 🦠 Bug fix: Streamlit cleanly handles non-ASCII characters in anchor links, which may change some anchors in existing apps ([#10929](https://github.com/streamlit/streamlit/pull/10925), [#8114](https://github.com/streamlit/streamlit/issues/8114)).
- 🪰 Bug fix: To prevent a race condition, session information is not immediately cleared unless a new session message is received ([#9886](https://github.com/streamlit/streamlit/pull/9886), [#9767](https://github.com/streamlit/streamlit/issues/9767)).
- 🪳 Bug fix: `streamlit config show` correctly displays `client.showErrorDetails` as a string instead of a list ([#10921](https://github.com/streamlit/streamlit/pull/10921), [#10913](https://github.com/streamlit/streamlit/issues/10913)).
- 🕷️ Bug fix: `st.selectbox` does not lose its value if a partial edit is abandoned ([#10891](https://github.com/streamlit/streamlit/pull/10891)).
- 🐞 Bug fix: `st.badge` doesn't falsely show `rainbow` as a color option ([#10896](https://github.com/streamlit/streamlit/pull/10896)).
- 🐝 Bug fix: To avoid a file lock conflict the occurs with some IDEs, Streamlit's file watcher utilities retries reading files when blocked ([#10868](https://github.com/streamlit/streamlit/pull/10868), [#4486](https://github.com/streamlit/streamlit/issues/4486)). Thanks, [Morridin](https://github.com/Morridin)!
- 🐜 Bug fix: `st.selectbox` and `st.multiselect` have consistent color and spacing for placeholder text ([#10865](https://github.com/streamlit/streamlit/pull/10865)).
- 🪲 Bug fix: Context managers correctly handle form elements ([#10752](https://github.com/streamlit/streamlit/pull/10752), [#8761](https://github.com/streamlit/streamlit/issues/8761)). Thanks, [SrGesus](https://github.com/SrGesus)!
- 🐛 Bug fix: `st.link_button` and `st.tabs` remain active when a client disconnects from a Streamlit server ([#10861](https://github.com/streamlit/streamlit/pull/10861)).

## Older versions of Streamlit

- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
