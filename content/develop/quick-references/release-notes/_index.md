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

## **Version 1.44.0 (latest)**

_Release date: March 25, 2025_

**Highlights**

- 💈 Introducing [advanced theming options](/develop/api-reference/configuration/config.toml#theme)! Use an assortment of configuration options to customize the appearance of your app. Change the fonts, colors, and roundness of your app without CSS.
- 👮 Introducing [`st.badge`](/develop/api-reference/text/st.badge) to insert a colored badge element. You can also include badges in Markdown using a new directive.
- 🏗️ Use [`streamlit init`](/develop/api-reference/cli/init) in your terminal to create all the local files you need for a new Streamlit app.

**Notable Changes**

- 🤖 [`st.exception`](/develop/api-reference/status/st.exception) includes links to open Google or ChatGPT with the contents of the exception. This include uncaught exceptions displayed in the app.
- 🗺️ You can access the user's locale through [`st.context`](/develop/api-reference/caching-and-state/st.context#contextlocale) ([#10563](https://github.com/streamlit/streamlit/pull/10563)).

**Other Changes**

- 📄 When using a `pages/` directory to automatically generate a multipage app, no pages (including the entrypoint file) can have the same inferred URL pathname ([#10276](https://github.com/streamlit/streamlit/pull/10276)).
- 🏎️ To improve performance, Streamlit uses the React 18 `createRoot` API for its frontend ([#10453](https://github.com/streamlit/streamlit/pull/10453)).
- 📝 To improve compatibility with AI tools, script compilation errors are logged when `logger.level="error"` and not just when `logger.level="debug"` ([#10826](https://github.com/streamlit/streamlit/pull/10826)).
- 🪵 Streamlit automatically enables more detailed logging if `rich` is installed ([#10650](https://github.com/streamlit/streamlit/pull/10650)).
- 🔢 `st.slider` and `st.number_input` raise an error when assigned a value in excess of a declared minimum or maximum ([#9964](https://github.com/streamlit/streamlit/pull/9964), [#9342](https://github.com/streamlit/streamlit/issues/9342)).
- 🛠️ `st.table` support pandas `Styler.set_tooltips()` ([#10561](https://github.com/streamlit/streamlit/pull/10561), [#10553](https://github.com/streamlit/streamlit/issues/10553)).
- ℹ️ Material symbols have been updated to the latest icon set ([#10813](https://github.com/streamlit/streamlit/pull/10813), [#10717](https://github.com/streamlit/streamlit/pull/10717)).
- 🦋 Visual tweaks to headers ([#10599](https://github.com/streamlit/streamlit/pull/10599)).
- 🦀 Bug fix: `st.html` displays correctly when used inside `st.tabs` ([#10825](https://github.com/streamlit/streamlit/pull/10825), [#10815](https://github.com/streamlit/streamlit/issues/10815)).
- 🦎 Bug fix: For backwards compatibility, `theme.font="sans serfi"` is internally converted to the new `theme.font="sans-serif"` ([#10789](https://github.com/streamlit/streamlit/pull/10789), [#10786](https://github.com/streamlit/streamlit/issues/10786)).
- 🐌 Bug fix: When using `st.secrets`, if Streamlit can't find the `secrets.toml` file, it will raise a `FileNotFoundError` ([#10508](https://github.com/streamlit/streamlit/pull/10508), [#8559](https://github.com/streamlit/streamlit/issues/8559)).
- 🕸️ Bug fix: `st.secrets` raises a clear `TypeError` if you try to assign a value to an attribute ([#10698](https://github.com/streamlit/streamlit/pull/10698), [#10107](https://github.com/streamlit/streamlit/issues/10107)).
- 🦗 Bug fix: In single-page apps, `st.page_link` does not highlight external links as if they are the current page ([#10690](https://github.com/streamlit/streamlit/pull/10690), [#10689](https://github.com/streamlit/streamlit/issues/10689)).
- 🦂 Bug fix: `st.poppover` displays at the correct width when using the `help` parameter ([#10709](https://github.com/streamlit/streamlit/pull/10709), [#10693](https://github.com/streamlit/streamlit/issues/10693)).
- 🦟 Bug fix: All components (and custom components) that read their width from the DOM initially load with a width of -1 px to prevent flickering ([#10712](https://github.com/streamlit/streamlit/pull/10712), [#10672](https://github.com/streamlit/streamlit/pull/10672), [#10663](https://github.com/streamlit/streamlit/pull/10663), [#10644](https://github.com/streamlit/streamlit/issues/10644)).
- 🦠 Bug fix: When `st.number_input` is configured to use integers, the default minimum and maximum values will prevent integer overflow ([#10655](https://github.com/streamlit/streamlit/pull/10655), [#6740](https://github.com/streamlit/streamlit/issues/6740)).
- 🪰 Bug fix: `st.navigation` uses immutable types to prevent mypy errors ([#10670](https://github.com/streamlit/streamlit/pull/10670)).
- 🪳 Bug fix: Custom components correctly inherit font from theme configuration ([#10661](https://github.com/streamlit/streamlit/pull/10661), [#10660](https://github.com/streamlit/streamlit/issues/10660)).
- 🕷️ Bug fix: Dataframes correctly support Dask data objects ([#10662](https://github.com/streamlit/streamlit/pull/10662)).
- 🐞 Bug fix: Button widths are correct when using the `help` parameter ([#10658](https://github.com/streamlit/streamlit/pull/10658), [#10648](https://github.com/streamlit/streamlit/issues/10648), [#10656](https://github.com/streamlit/streamlit/issues/10656)).
- 🐝 Bug fix: Scrolling is disabled when hovering over `st.number_input` to prevent accidental value changes ([#10642](https://github.com/streamlit/streamlit/pull/10642), [#8867](https://github.com/streamlit/streamlit/issues/8867)).
- 🐜 Bug fix: `st.chat_input` gives a clear error in the UI when the file size limit is exceeded ([#10530](https://github.com/streamlit/streamlit/pull/10530)).
- 🪲 Bug fix: The favicon and Markdown emojis use the same SVG emoji source for consistency ([#10539](https://github.com/streamlit/streamlit/pull/10539), [#6822](https://github.com/streamlit/streamlit/issues/6822)).
- 🐛 Bug fix: The dataframe search bar is more responsive to width ([#10534](https://github.com/streamlit/streamlit/pull/10534), [#10532](https://github.com/streamlit/streamlit/issues/10532)).

## Older versions of Streamlit

- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
