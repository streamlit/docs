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

## **Version 1.53.0 (latest)**

_Release date: January 14, 2025_

**Highlights**

- ❄️ You can create session-scoped [caller's rights connections](/develop/api-reference/connections/st.connections.snowflakeconnection) in Streamlit in Snowflake and other Snowpark Container Services environments.
- ⭐ Announcing experimental support for running Streamlit with Starlette with the new [`server.useStarlette`](/develop/api-reference/configuration/config.toml#server) configuration option.
- 🌐 Introducing [`st.App`](https://issues.streamlit.app/spec_renderer?pr=13449), an experimental ASGI-compatible entry point that enables custom HTTP routes, middleware, lifecycle hooks, and integration with Python web frameworks like FastAPI and Starlette ([#13537](https://github.com/streamlit/streamlit/pull/13537)).
- 🔑 You can expose OIDC ID and access tokens in [`st.user.tokens`](/develop/api-reference/user/st.user) ([#12044](https://github.com/streamlit/streamlit/pull/12044)). Thanks, [velochy](https://github.com/velochy)!

**Notable Changes**

- 🚪 [`st.logout`](/develop/api-reference/user/st.logout) logs users out of your identity provider, if supported by your OIDC setup ([#12693](https://github.com/streamlit/streamlit/pull/12693)). Thanks, [velochy](https://github.com/velochy)!
- 🌀 To prevent unwanted stale elements, especially in chat layouts, Streamlit treats spinners as transient elements and doesn't include them in the element refresh that happens with reruns ([#12826](https://github.com/streamlit/streamlit/pull/12826), [#9239](https://github.com/streamlit/streamlit/issues/9239), [#10199](https://github.com/streamlit/streamlit/issues/10199), [#13166](https://github.com/streamlit/streamlit/pull/13166)).
- 🧩 For custom components v2, style isolation is set in [`st.components.v2.component`](/develop/api-reference/custom-components/st.components.v2.component) instead of when an instance is mounted ([#13518](https://github.com/streamlit/streamlit/pull/13518)).
- 🎨 To access heading font size and weights in custom components without using JavaScript to parse an array, CSS custom properties in an app include individual properties for each heading font size and weight ([#13268](https://github.com/streamlit/streamlit/pull/13268)).
- ✂️ For custom components v2, `html`, `js`, and `css` are all fully optional ([#13511](https://github.com/streamlit/streamlit/pull/13511)).
- 🔗 [`BaseConnection`](/develop/api-reference/connections/st.connections.baseconnection) has a new class method to scope connections globally or by session ([#13506](https://github.com/streamlit/streamlit/pull/13506)).
- 💾 [`st.cache_data`](/develop/api-reference/caching-and-state/st.cache_data) and [`st.cache_resource`](/develop/api-reference/caching-and-state/st.cache_resource) can be scoped to a session ([#13482](https://github.com/streamlit/streamlit/pull/13482), [#6703](https://github.com/streamlit/streamlit/issues/6703)).
- 🧹 `st.cache_resource` has a new parameter `on_release` to use to clean up resources, like closing connections ([#13439](https://github.com/streamlit/streamlit/pull/13439), [#8674](https://github.com/streamlit/streamlit/issues/8674)).
- 🏷️ `st.multiselect` doesn't include `options` in widget identity when a `key` is provided ([#13448](https://github.com/streamlit/streamlit/pull/13448), [#7855](https://github.com/streamlit/streamlit/issues/7855)).
- 🔢 `st.number_input` doesn't include `min` and `max` in widget identity when a `key` is provided ([#13512](https://github.com/streamlit/streamlit/pull/13512), [#11277](https://github.com/streamlit/streamlit/issues/11277)).
- 📋 `st.selectbox` doesn't include `options` in widget identity when a `key` is provided ([#13383](https://github.com/streamlit/streamlit/pull/13383), [#6352](https://github.com/streamlit/streamlit/issues/6352), [#8496](https://github.com/streamlit/streamlit/issues/8496), [#4854](https://github.com/streamlit/streamlit/issues/4854)).
- 🎚️ You can format values for [`st.slider`](/develop/api-reference/widgets/st.slider) with a new `format` parameter ([#13392](https://github.com/streamlit/streamlit/pull/13392), [#13243](https://github.com/streamlit/streamlit/issues/13243)).
- 🖼️ [`st.dialog`](/develop/api-reference/execution-flow/st.dialog) has a new `icon` parameter to add an icon next to the dialog title ([#13244](https://github.com/streamlit/streamlit/pull/13244), [#13202](https://github.com/streamlit/streamlit/issues/13202)). Thanks, [KaranPradhan266](https://github.com/KaranPradhan266)!
- ✏️ You can configure [`st.data_editor`](/develop/api-reference/data/st.data_editor) to allow only adding or only deleting rows ([#13228](https://github.com/streamlit/streamlit/pull/13228), [#7091](https://github.com/streamlit/streamlit/issues/7091)).
- ➡️ You can display a [button](/develop/api-reference/widgets/st.button) icon on the right instead of the left with a new `icon_position` parameter ([#13150](https://github.com/streamlit/streamlit/pull/13150), [#13069](https://github.com/streamlit/streamlit/issues/13069)). Thanks, [SiddhantSadangi](https://github.com/SiddhantSadangi)!
- ↔️ [`st.columns`](/develop/api-reference/layout/st.columns), [`st.container`](/develop/api-reference/layout/st.container), and [`st.space`](/develop/api-reference/layout/st.space) support larger and smaller `gap` and `size` values ([#13345](https://github.com/streamlit/streamlit/pull/13345)).
- 📦 You can configure the maximum file size for [`st.file_uploader`](/develop/api-reference/widgets/st.file_uploader) and [`st.chat_input`](/develop/api-reference/chat/st.chat_input) with a new parameter that overrides the `server.maxUploadSize` configuration option ([#12816](https://github.com/streamlit/streamlit/pull/12816), [#12692](https://github.com/streamlit/streamlit/issues/12692), [#12579](https://github.com/streamlit/streamlit/issues/12579)). Thanks, [rishabhjain1712](https://github.com/rishabhjain1712)!
- 📐 You can configure the default width of the sidebar with [`st.set_page_config`](/develop/api-reference/configuration/st.set_page_config) ([#12154](https://github.com/streamlit/streamlit/pull/12154), [#11980](https://github.com/streamlit/streamlit/issues/11980)). Thanks, [jose-mindwayai](https://github.com/jose-mindwayai)!
- 📝 The `options` parameter in [`st.select_slider`](/develop/api-reference/widgets/st.select_slider) supports Markdown ([#12960](https://github.com/streamlit/streamlit/pull/12960), [#11774](https://github.com/streamlit/streamlit/issues/11774)). Thanks, [jensonjohnathon](https://github.com/jensonjohnathon)!
- 📊 The `delta` and `value` parameters in [`st.metric`](/develop/api-reference/data/st.metric) support Markdown ([#13094](https://github.com/streamlit/streamlit/pull/13094), [#11773](https://github.com/streamlit/streamlit/issues/11773)). Thanks, [jensonjohnathon](https://github.com/jensonjohnathon)!
- 🔣 You can configure number format in `st.metric` ([#13193](https://github.com/streamlit/streamlit/pull/13193), [#12229](https://github.com/streamlit/streamlit/issues/12229), [#6951](https://github.com/streamlit/streamlit/issues/6951)).
- 🌈 You can set the color of `st.metric` delta indicators from the basic color palette ([#13153](https://github.com/streamlit/streamlit/pull/13153), [#4052](https://github.com/streamlit/streamlit/issues/4052), [#6665](https://github.com/streamlit/streamlit/issues/6665)).

**Other Changes**

- 🔌 You can exclude the port from your Streamlit auth redirect URI to use the current port ([#12251](https://github.com/streamlit/streamlit/pull/12251), [#12249](https://github.com/streamlit/streamlit/issues/12249)). Thanks, [velochy](https://github.com/velochy)!
- 📛 Various custom components v2 types were semantically renamed ([#13515](https://github.com/streamlit/streamlit/pull/13515)).
- 📜 When an item is removed from `st.multiselect`, the scroll position of the drop down is preserved ([#13384](https://github.com/streamlit/streamlit/pull/13384), [#13317](https://github.com/streamlit/streamlit/issues/13317)). Thanks, [kagawa0710](https://github.com/kagawa0710)!
- 🐍 Pydantic sequences are treated as dataframe-like by Streamlit commands ([#13348](https://github.com/streamlit/streamlit/pull/13348), [#13344](https://github.com/streamlit/streamlit/issues/13344)).
- 🏠 The logo displayed by `st.logo` links to the app's homepage ([#13222](https://github.com/streamlit/streamlit/pull/13222), [#13155](https://github.com/streamlit/streamlit/issues/13155)).
- ⌨️ For improved accessibility, tooltips are keyboard focusable ([#13379](https://github.com/streamlit/streamlit/pull/13379), [#13330](https://github.com/streamlit/streamlit/issues/13330)).
- ⚓ For improved accessibility, anchor links are keyboard focusable ([#13378](https://github.com/streamlit/streamlit/pull/13378), [#13329](https://github.com/streamlit/streamlit/issues/13329)).
- 🗺️ `st.json` displays a tooltip on hover for each element to show its full path ([#13113](https://github.com/streamlit/streamlit/pull/13113), [#13057](https://github.com/streamlit/streamlit/issues/13057)).
- 💬 `st.chat_input` was redesigned for improved style and accessibility ([#13088](https://github.com/streamlit/streamlit/pull/13088), [#13223](https://github.com/streamlit/streamlit/pull/13223), [#13364](https://github.com/streamlit/streamlit/pull/13364), [#13532](https://github.com/streamlit/streamlit/pull/13532), [#13556](https://github.com/streamlit/streamlit/pull/13556), [#13546](https://github.com/streamlit/streamlit/pull/13546), [#13542](https://github.com/streamlit/streamlit/pull/13542), [#13535](https://github.com/streamlit/streamlit/pull/13535), [#13554](https://github.com/streamlit/streamlit/pull/13554), [#13553](https://github.com/streamlit/streamlit/pull/13553), [#13555](https://github.com/streamlit/streamlit/pull/13555), [#13547](https://github.com/streamlit/streamlit/pull/13547)).
- 💅 Various style updates for consistency ([#13536](https://github.com/streamlit/streamlit/pull/13536), [#13557](https://github.com/streamlit/streamlit/pull/13557)).
- 🔐 `st.auth` is compatible with Authlib version 1.6.6 ([#13333](https://github.com/streamlit/streamlit/pull/13333), [#13335](https://github.com/streamlit/streamlit/issues/13335), [#13424](https://github.com/streamlit/streamlit/pull/13424)).
- 👽 Bug fix: Embedded apps respect the theme embedding option when they are configured with a custom theme ([#13498](https://github.com/streamlit/streamlit/pull/13498), [#13496](https://github.com/streamlit/streamlit/issues/13496)). Thanks, [ranmocy](https://github.com/ranmocy)!
- 👻 Bug fix: `st.number_input` accounts for floating point precision when incrementing and decrementing its value ([#13484](https://github.com/streamlit/streamlit/pull/13484)).
- 🦀 Bug fix: `st.altair_chart` correctly displays HConcat and VConcat charts ([#13423](https://github.com/streamlit/streamlit/pull/13423), [#13410](https://github.com/streamlit/streamlit/issues/13410)).
- 🦋 Bug fix: `st.selectbox` is initialized correctly when its value is set from Session State ([#13438](https://github.com/streamlit/streamlit/pull/13438), [#13435](https://github.com/streamlit/streamlit/issues/13435)).
- 🦎 Bug fix: `st.html` indents list items correctly ([#13437](https://github.com/streamlit/streamlit/pull/13437), [#13426](https://github.com/streamlit/streamlit/issues/13426)).
- 🐌 Bug fix: A logger message for `SnowflakeConnection` references the correct URL to the Snowflake docs ([#13363](https://github.com/streamlit/streamlit/pull/13363), [#13361](https://github.com/streamlit/streamlit/issues/13361)).
- 🕸️ Bug fix: Tooltip text with newlines renders correctly ([#13365](https://github.com/streamlit/streamlit/pull/13365), [#13339](https://github.com/streamlit/streamlit/issues/13339)).
- 🦗 Bug fix: The DOM elements within `st.spinner` are properly aligned when showing elapsed time ([#13388](https://github.com/streamlit/streamlit/pull/13388), [#13387](https://github.com/streamlit/streamlit/issues/13387)).
- 🦂 Bug fix: Custom components v2 have the same cross-origin behavior as other elements in the app ([#13376](https://github.com/streamlit/streamlit/pull/13376)).
- 🦟 Bug fix: CSS custom properties in custom components handle null or unset values correctly ([#13240](https://github.com/streamlit/streamlit/pull/13240)).
- 🦠 Bug fix: Theme preference is persisted into new app sessions ([#13306](https://github.com/streamlit/streamlit/pull/13306), [#13280](https://github.com/streamlit/streamlit/issues/13280)).
- 🪰 Bug fix: `st.dialog` doesn't show stale elements from a previous dialog ([#13297](https://github.com/streamlit/streamlit/pull/13297), [#10907](https://github.com/streamlit/streamlit/issues/10907)).
- 🪳 Bug fix: `st.data_editor` behaves correctly when starting with a column of `None` values ([#13309](https://github.com/streamlit/streamlit/pull/13309), [#13305](https://github.com/streamlit/streamlit/issues/13305)).
- 🕷️ Bug fix: To correctly reflect edits to the theme configuration during development, theme settings are properly hashed ([#13173](https://github.com/streamlit/streamlit/pull/13173)).
- 🐞 Bug fix: In v2 custom components, app-level keyboard shortcuts (like `R` for rerun) are disabled in typing contexts to prevent unintentional usage ([#13264](https://github.com/streamlit/streamlit/pull/13264)).
- 🐝 Bug fix: Custom component v2 includes default values in component identity, unless a key is provided ([#13266](https://github.com/streamlit/streamlit/pull/13266)).
- 🐜 Bug fix: The sidebar navigation is correctly hidden when topbar navigation is used ([#13227](https://github.com/streamlit/streamlit/pull/13227), [#13224](https://github.com/streamlit/streamlit/issues/13224)).
- 🪲 Bug fix: `st.logo` displays the logo correctly when an app uses top navigation ([#13226](https://github.com/streamlit/streamlit/pull/13226), [#13225](https://github.com/streamlit/streamlit/issues/13225)).
- 🐛 Bug fix: Error messages are clearer when width or height are invalidly set to `0` ([#13206](https://github.com/streamlit/streamlit/pull/13206), [#12868](https://github.com/streamlit/streamlit/issues/12868)).

## Older versions of Streamlit

- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
