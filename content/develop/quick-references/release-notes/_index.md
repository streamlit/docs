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

## **Version 1.48.0 (latest)**

_Release date: August 5, 2025_

**Highlights**

- 💪 Announcing horizontal flex [containers](/develop/api-reference/layout/st.container)! Configure the alignment, direction, and gap of containers to create dynamic layouts.

**Notable Changes**

- 🪵 [`st.logout`](/develop/api-reference/user/st.logout) will log the user out of their identity provider if the server metadata includes `end_session_endpoint` ([#11901](https://github.com/streamlit/streamlit/pull/11901), [#11900](https://github.com/streamlit/streamlit/issues/11900)). Thanks, [velochy](https://github.com/velochy)!
- 💬 You can configure the dismissibility of [`st.dialog`](/develop/api-reference/execution-flow/st.dialog) and set callback functions ([#9504](https://github.com/streamlit/streamlit/pull/9504), [#12034](https://github.com/streamlit/streamlit/pull/12034)). Thanks, [souvikmaji](https://github.com/souvikmaji)!
- ↔️ You can set a `width` parameter for [buttons](/develop/api-reference/widgets/st.button) and [popovers](/develop/api-reference/layout/st.popover).
- 🧑‍💻 [`codeFontWeight`](/develop/api-reference/configuration/config.toml#sidebar-theme) can be configured separately in the sidebar.
- 📶 You can configure the WebSocket ping interval with the [`server.websocketPingInterval`](/develop/api-reference/configuration/config.toml#server) configuration option ([#12117](https://github.com/streamlit/streamlit/pull/12117), [#12108](https://github.com/streamlit/streamlit/issues/12108)).

**Other Changes**

- 🌀 The spinner design was unified across Streamlit commands ([#12031](https://github.com/streamlit/streamlit/pull/12031)).
- 💅 Design and style tweaks ([#12032](https://github.com/streamlit/streamlit/pull/12032), [#11989](https://github.com/streamlit/streamlit/pull/11989), [#11986](https://github.com/streamlit/streamlit/pull/11986), [#11999](https://github.com/streamlit/streamlit/pull/11999), [#12015](https://github.com/streamlit/streamlit/pull/12015), [#11995](https://github.com/streamlit/streamlit/pull/11995), [#11981](https://github.com/streamlit/streamlit/pull/11981), [#11964](https://github.com/streamlit/streamlit/pull/11964)).
- 🔄 Error logic and logging was improved to reduce confusion from `asyncio` runtime errors when unrelated errors are raised ([#12008](https://github.com/streamlit/streamlit/pull/12008)).
- 🪧 Dataframe column menus include an icon to show the column type and a button to copy the column name ([#11303](https://github.com/streamlit/streamlit/pull/11303)).
- 💽 For convenience, there are additional "extras" installation options ([#11760](https://github.com/streamlit/streamlit/pull/11760), [#8233](https://github.com/streamlit/streamlit/issues/8233)).
- 📁 Additional checks are performed to validate the extension of uploaded files, but app developers are still responsible for checking and handling the security of uploaded files ([#11884](https://github.com/streamlit/streamlit/pull/11884), [#11883](https://github.com/streamlit/streamlit/issues/11883)).
- 🔘 Button group widgets are identified by their command name in error messages ([#11769](https://github.com/streamlit/streamlit/pull/11769), [#11753](https://github.com/streamlit/streamlit/issues/11753)). Thanks, [bajajku](https://github.com/bajajku)!
- ⚔️ For `st.snow`, `st.balloons`, chat avatars, and media elements, the `crossorigin` property can be configured by hosts ([#12087](https://github.com/streamlit/streamlit/pull/12087), [#11948](https://github.com/streamlit/streamlit/pull/11948)).
- 🦗 Bug fix: Ctrl+C will stop a Streamlit server in Windows, even if there is no active session ([#12049](https://github.com/streamlit/streamlit/pull/12049), [#6855](https://github.com/streamlit/streamlit/issues/6855)).
- 🦂 Bug fix: `st.line_chart` uses the column order in the chart data instead of reordering them alphabetically ([#12092](https://github.com/streamlit/streamlit/pull/12092), [#12071](https://github.com/streamlit/streamlit/issues/12071)).
- 🦟 Bug fix: Menu items set in `st.set_page_config` are not hidden when `client.toolbarMode` is set to `"minimal"` ([#12091](https://github.com/streamlit/streamlit/pull/12091), [#12083](https://github.com/streamlit/streamlit/issues/12083)).
- 🦠 Bug fix: `theme.codeFontWeight` does not interfere with bold inline code ([#12074](https://github.com/streamlit/streamlit/pull/12074), [#11976](https://github.com/streamlit/streamlit/issues/11976)).
- 🪰 Bug fix: To allow fractional pixel values, heading font sizes in theming configuration aren't rounded ([#12077](https://github.com/streamlit/streamlit/pull/12077), [#11963](https://github.com/streamlit/streamlit/issues/11963)).
- 🪳 Bug fix: Altair 5.4.0 and 5.4.1 have been excluded to prevent an upstream bug with reading dataframes ([#12066](https://github.com/streamlit/streamlit/pull/12066), [#12064](https://github.com/streamlit/streamlit/issues/12064)).
- 🕷️ Bug fix: Dataframe scrollbars have been tweaked to avoid sizing problems ([#11936](https://github.com/streamlit/streamlit/pull/11936), [#11921](https://github.com/streamlit/streamlit/issues/11921), [#12053](https://github.com/streamlit/streamlit/issues/12053), [#11985](https://github.com/streamlit/streamlit/issues/11985)).
- 🐞 Bug fix: Linting accepts lists in addition to tuples for callback arguments in widgets ([#12039](https://github.com/streamlit/streamlit/pull/12039)).
- 🐝 Bug fix: To fix a deprecation warning, Altair theme syntax was updated ([#12050](https://github.com/streamlit/streamlit/pull/12050)).
- 🐜 Bug fix: `st.navigation` does not hide the menu when a single section is used with `position="top"` ([#12025](https://github.com/streamlit/streamlit/pull/12025), [#12029](https://github.com/streamlit/streamlit/issues/12029)).
- 🪲 Bug fix: The sidebar state does not reset when the window is resized ([#12024](https://github.com/streamlit/streamlit/pull/12024), [#12016](https://github.com/streamlit/streamlit/issues/12016)).
- 🐛 Bug fix: `st.pills` and `st.segmented_control` don't raise unintended `StreamlitDuplicateElementId` errors ([#11982](https://github.com/streamlit/streamlit/pull/11982), [#11975](https://github.com/streamlit/streamlit/issues/11975)).

## Older versions of Streamlit

- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
