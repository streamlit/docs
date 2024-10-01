---
title: Release notes
slug: /develop/quick-reference/release-notes
description: A changelog of highlights and fixes for each version of Streamlit.
keywords: changelog, release notes, version history
---

# Release notes

This page lists highlights, bug fixes, and known issues for official Streamlit releases. If you're looking for information about nightly releases, beta features, or experimental features, see [Try pre-release features](/develop/quick-reference/prerelease).

<Tip>

To upgrade to the latest version of Streamlit, run:

```bash
pip install --upgrade streamlit
```

</Tip>

The latest version of Streamlit is 1.39.0.

## **Version 1.39.0**

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

## **Version 1.38.0**

_Release date: August 27, 2024_

**Highlights**

- 📈 Streamlit natively supports more dataframe formats! Use dataframe and series objects from popular libraries like Dask, Modin, Numpy, pandas, Polars, PyArrow, Snowpark, Xarray, and more. Use database cursors compliant with the Python Database API Specification 2.0. Use anything that supports the Python dataframe interchange protocol. See the [docs](/develop/api-reference/data/st.dataframe).

**Notable Changes**

- ↔️ You can control the initial expansion state of [`st.json`](/develop/api-reference/data/st.json) elements.
- 🧑‍💻 You can choose to wrap lines in [`st.code`](/develop/api-reference/text/st.code).
- 🕵️ Streamlit supports Kubernetes style secrets so you can use Snowflake Snowpark Container Services secret format ([#9078](https://github.com/streamlit/streamlit/pull/9078)).
- ⤴️ Breaking change: We removed a patch that allows custom validators in `pydantic<2.0` ([#9257](https://github.com/streamlit/streamlit/pull/9257)).
- 💔 Breaking change: We removed the experimental cache replay feature from caching decorators ([#9305](https://github.com/streamlit/streamlit/pull/9305)).

**Other Changes**

- 🌐 For better app efficiency, a WebSocket reconnect will not trigger a rerun unless a script run was interrupted ([#9083](https://github.com/streamlit/streamlit/pull/9083)).
- 👋 We updated our `streamlit hello` app to use Google Material icons.
- ⌨️ `st.number_input`, `st.selectbox`, `st.slider`, `st.select_slider`, and [`st.radio`](http://st.radio) provide more precise type hinting for their return values ([#9048](https://github.com/streamlit/streamlit/pull/9048), [#9296](https://github.com/streamlit/streamlit/pull/9296), [#8717](https://github.com/streamlit/streamlit/issues/8717)). Thanks, [Asaurus1](https://github.com/Asaurus1)!
- ⭐ [`st.feedback`](http://st.feedback) provides more precise type hinting for its return value ([#9216](https://github.com/streamlit/streamlit/pull/9216)). Thanks, [wyattscarpenter](https://github.com/wyattscarpenter)!
- 💅 We improved theme management for embedded apps via `postMessage` ([#9103](https://github.com/streamlit/streamlit/pull/9103)).
- 🌱 Bug fix: Within the sidebar, the image for `st.logo` resizes along with the sidebar width ([#9298](https://github.com/streamlit/streamlit/pull/9298), [#8707](https://github.com/streamlit/streamlit/issues/8707)).
- 🪹 Bug fix: When a parent fragment updates, Streamlit cleans up child fragments correctly ([#9246](https://github.com/streamlit/streamlit/pull/9246), [#9233](https://github.com/streamlit/streamlit/issues/9233), [#9267](https://github.com/streamlit/streamlit/issues/9267)).
- 💩 Bug fix: Elements unstale within a fragment rerun as they are updated instead of all together at the end of the fragment rerun ([#9285](https://github.com/streamlit/streamlit/pull/9285)).
- 🪱 Bug fix: If a block type changes during a rerun, Streamlit discards the child elements of that block to prevent improper visual artifacts, like `st.tabs` causing a blank page ([#9276](https://github.com/streamlit/streamlit/pull/9276), [#9259](https://github.com/streamlit/streamlit/issues/9259), [#8676](https://github.com/streamlit/streamlit/issues/8676)).
- ☠️ Bug fix: Widget state is preserved when page reruns are interrupted with another rerun ([#9187](https://github.com/streamlit/streamlit/pull/9187), [#9163](https://github.com/streamlit/streamlit/issues/9163)). Thanks, [dannyopts](https://github.com/dannyopts)!
- 👽 Bug fix: `options` in `st.selectbox`, `st.multiselect`, `st.radio`, and `st.select_slider` correctly use `dict_items` ([#9241](https://github.com/streamlit/streamlit/pull/9241), [#9237](https://github.com/streamlit/streamlit/issues/9237), [#5377](https://github.com/streamlit/streamlit/issues/5377)).
- 👻 Bug fix: A `SelectboxColumn` index will show with the correct, grayed-out styling in a dataframe ([#9231](https://github.com/streamlit/streamlit/pull/9231), [#8772](https://github.com/streamlit/streamlit/issues/8772)).
- 🦀 Bug fix: `st.write_stream` will not immediately fail when receiving an empty chunk ([#9234](https://github.com/streamlit/streamlit/pull/9234), [#9227](https://github.com/streamlit/streamlit/issues/9227)).
- 🦋 Bug fix: Streamlit won't auto-scroll to an empty anchor, if present ([#9206](https://github.com/streamlit/streamlit/pull/9206), [#9203](https://github.com/streamlit/streamlit/issues/9203)).
- 🦎 Bug fix: We changed the handling of `scriptRunId` to prevent `st.tabs` from showing extra, empty tabs in fragments ([#9186](https://github.com/streamlit/streamlit/pull/9186), [#9158](https://github.com/streamlit/streamlit/issues/9158), [#9215](https://github.com/streamlit/streamlit/pull/9215)).
- 🐌 Bug fix: Automatically rerunning fragments don't raise `FragmentStorageKeyError` to prevent a possible race condition ([#9183](https://github.com/streamlit/streamlit/pull/9183), [#9080](https://github.com/streamlit/streamlit/issues/9080)).
- 🕸️ Bug fix: We improved `st.plotly_chart`'s handling of the pass-through keyword argument `config` ([#9190](https://github.com/streamlit/streamlit/pull/9190), [#9134](https://github.com/streamlit/streamlit/issues/9134)).
- 🦗 Bug fix: Markdown in all `label` parameters correctly ignores headers ([#9189](https://github.com/streamlit/streamlit/pull/9189), [#9141](https://github.com/streamlit/streamlit/issues/9141)).
- 🦂 Bug fix: We reverted a change to fragments which caused some widgets to lose state in some circumstances ([#9178](https://github.com/streamlit/streamlit/pull/9178), [#9171](https://github.com/streamlit/streamlit/issues/9171)).
- 🦟 Bug fix: The deprecation warnings for `st.experimental_fragment` and `st.experimental_dialog` only show when the commands are called. This prevents custom components which use them from raising premature warnings on import ([#9170](https://github.com/streamlit/streamlit/pull/9170), [#9143](https://github.com/streamlit/streamlit/issues/9143)).
- 🦠 Bug fix: `st.code` shows syntax highlighting for diff code when `language="diff"` ([#9172](https://github.com/streamlit/streamlit/pull/9172), [#8687](https://github.com/streamlit/streamlit/issues/8687)).
- 🪰 Bug fix: Streamlit commands that raise `ScriptControlException` execute as expected in try-except blocks ([#9167](https://github.com/streamlit/streamlit/pull/9167), [#9155](https://github.com/streamlit/streamlit/issues/9155), [#9182](https://github.com/streamlit/streamlit/issues/9182)).
- 🪳 Bug fix: The `value` for `st.date_input` has the correct type for linting ([#9149](https://github.com/streamlit/streamlit/pull/9149)). Thanks, [wyattscarpenter](https://github.com/wyattscarpenter)!
- 🕷️ Bug fix: We updated `plotly.js` to support `hoversubplots="axis"` ([#9144](https://github.com/streamlit/streamlit/pull/9144), [#9118](https://github.com/streamlit/streamlit/issues/9118)).
- 🐞 Bug fix: We stabilized the identity of [`st.map`](http://st.map) instances so the command doesn't create multiple maps when its parameters are updated ([#9092](https://github.com/streamlit/streamlit/pull/9092), [#8329](https://github.com/streamlit/streamlit/issues/8329)).
- 🐝 Bug fix: You can now clear the cache for cached class instance methods ([#9101](https://github.com/streamlit/streamlit/pull/9101), [#8638](https://github.com/streamlit/streamlit/issues/8638)).
- 🐜 Bug fix: Copy buttons work correctly in dialogs ([#9130](https://github.com/streamlit/streamlit/pull/9130), [#9112](https://github.com/streamlit/streamlit/issues/9112)).
- 🪲 Bug fix: Streamlit magic works consistently in for-else, while-else, try-else, try-except, and match blocks ([#9110](https://github.com/streamlit/streamlit/pull/9110), [#9109](https://github.com/streamlit/streamlit/issues/9109)). Thanks, [whitphx](https://github.com/whitphx)!
- 🐛 Bug fix: When printing an app, the bottom container will always print at the end without overlapping other content ([#9129](https://github.com/streamlit/streamlit/pull/9129)).

## **Version 1.37.0**

_Release date: July 25, 2024_

**Highlights**

- 🍪 Introducing [`st.context`](/develop/api-reference/utilities/st.context) to read headers and cookies!
- ⭐ Introducing [`st.feedback`](/develop/api-reference/widgets/st.feedback) to collect ratings and sentiment from your users!
- 👟 Announcing the general availability of [`st.fragment`](/develop/api-reference/execution-flow/st.fragment), a decorator that lets you rerun functions independently of the whole page.
- 🍿 Announcing the general availability of [`st.dialog`](/develop/api-reference/execution-flow/st.dialog), a decorator that lets you create modal dialogs.

**Notable Changes**

- ℹ️ You can use icons from the Material Symbols library in [Markdown](/develop/api-reference/text/st.markdown)!
- 📈 You can pass `graphviz.Source` objects to [`st.graphviz_chart`](/develop/api-reference/charts/st.graphviz_chart).
- 📊 You can modify the stacking behavior for [`st.bar_chart`](/develop/api-reference/charts/st.bar_chart) and [`st.area_chart`](/develop/api-reference/charts/st.area_chart).
- 🔭 Within a fragment, you can scope [`st.rerun`](/develop/api-reference/execution-flow/st.rerun) to the fragment.
- 🪺 Streamlit supports nested fragments ([#8931](https://github.com/streamlit/streamlit/pull/8931), [#8635](https://github.com/streamlit/streamlit/issues/8635)).
- 📞 Fragments can be used in callback functions ([#8916](https://github.com/streamlit/streamlit/pull/8916), [#8591](https://github.com/streamlit/streamlit/issues/8591)).

**Other Changes**

- ⭕ Material Symbols are rounded instead of outlined ([#8998](https://github.com/streamlit/streamlit/pull/8998)).
- 🔢 Streamlit supports Numpy version 2.0 ([#8940](https://github.com/streamlit/streamlit/pull/8940)).
- 😄 We've updated emoji validation for new emojis ([#8923](https://github.com/streamlit/streamlit/pull/8923)).
- 👻 We've removed several experimental commands with new, generally available versions ([#8943](https://github.com/streamlit/streamlit/pull/8943)).
- ☠️ We've removed deprecated configuration options per their announced expiration date ([#9005](https://github.com/streamlit/streamlit/pull/9005), [#9013](https://github.com/streamlit/streamlit/pull/9013), [#9018](https://github.com/streamlit/streamlit/pull/9018)).
- 🦎 Bug fix: Nested fragments rerun correctly when a child fragment precedes a widget in the parent fragment ([#9114](https://github.com/streamlit/streamlit/pull/9114)).
- 🐌 Bug fix: Streamlit validates file paths before performing additional checks when using static file serving for improved security ([#8990](https://github.com/streamlit/streamlit/pull/8990)).
- 🕸️ Bug fix: [`st.map`](http://st.map) displays at the correct width inside `st.expander` ([#9070](https://github.com/streamlit/streamlit/pull/9070), [#8004](https://github.com/streamlit/streamlit/issues/8004)).
- 🦗 Bug fix: Streamlit displays the correct (Windows) path for `secrets.toml` in an error message ([#9061](https://github.com/streamlit/streamlit/pull/9061), [#6147](https://github.com/streamlit/streamlit/issues/6147)).
- 🦂 Bug fix: `st.switch_page` correctly clears non-embed query parameters when the user switches pages ([#9059](https://github.com/streamlit/streamlit/pull/9059), [#9050](https://github.com/streamlit/streamlit/issues/9050)).
- 🦟 Bug fix: Custom themes display correctly for multipage elements like `st.page_link` ([#8994](https://github.com/streamlit/streamlit/pull/8994), [#8978](https://github.com/streamlit/streamlit/issues/8978)).
- 🦠 Bug fix: `st.snow` and `st.balloons` don't show in prints ([#9053](https://github.com/streamlit/streamlit/pull/9053), [#7790](https://github.com/streamlit/streamlit/issues/7790)).
- 🪰 Bug fix: We've improved the default formatting for `st.number_input` ([#9035](https://github.com/streamlit/streamlit/pull/9035), [#7163](https://github.com/streamlit/streamlit/issues/7163)).
- 🪳 Bug fix: An `st.navigation` example was corrected ([#9027](https://github.com/streamlit/streamlit/pull/9027), [#9026](https://github.com/streamlit/streamlit/issues/9026)). Thanks, [mahotd](https://github.com/mahotd)!
- 🕷️ Bug fix: Dialogs no longer have a brief delay when closing ([#9023](https://github.com/streamlit/streamlit/pull/9023), [#8747](https://github.com/streamlit/streamlit/issues/8747)).
- 🦀 Bug fix: Streamlit correctly raises a `KeyError` when encountered in a fragment instead of a misleading, fragment-related error ([#9011](https://github.com/streamlit/streamlit/pull/9011), [#8494](https://github.com/streamlit/streamlit/issues/8494)).
- 🐞 Bug fix: Streamlit doesn't clear `MediaFileManager` on fragment reruns to prevent invalid references ([#9010](https://github.com/streamlit/streamlit/pull/9010), [#8932](https://github.com/streamlit/streamlit/issues/8932)).
- 🐝 Bug fix: Custom themes are correctly removed when deleted ([#8989](https://github.com/streamlit/streamlit/pull/8989), [#8962](https://github.com/streamlit/streamlit/issues/8962)).
- 🐜 Bug fix: Streamlit supports non-unix style paths for correct multipage routing in Windows ([#8988](https://github.com/streamlit/streamlit/pull/8988), [#8958](https://github.com/streamlit/streamlit/issues/8958)).
- 🪲 Bug fix: Using `st.rerun` in a fragment will not cause the app's main body content to render in the fragment in rare events ([#8798](https://github.com/streamlit/streamlit/pull/8798)).
- 🐛 Bug fix: When an exception is raised within a fragment, Streamlit shows the error message within the fragment ([#8868](https://github.com/streamlit/streamlit/pull/8868)).

## **Version 1.36.0**

_Release date: June 20, 2024_

**Highlights**

- 🧭 Introducing [`st.navigation`](/develop/api-reference/navigation/st.navigation) and [`st.Page`](/develop/api-reference/navigation/st.page) for a new way to define multipage apps! Check out the [docs](/develop/concepts/multipage-apps/overview) to learn more.

**Notable Changes**

- 📊 [`st.bar_chart`](/develop/api-reference/charts/st.bar_chart) can render charts horizontally.
- ℹ️ [`st.expander`](/develop/api-reference/layout/st.expander) supports adding an icon next to its label.
- 🏗️ [`st.columns`](/develop/api-reference/layout/st.columns) lets you set vertical alignment.
- 📲 Custom components support callback functions ([#8633](https://github.com/streamlit/streamlit/pull/8633), [#3977](https://github.com/streamlit/streamlit/issues/3977)).
- 📥 Fragments no longer support rendering widgets outside of their main body ([#8756](https://github.com/streamlit/streamlit/pull/8756)).
- 🏷️ You can now customize axis labels for [`st.area_chart`](/develop/api-reference/charts/st.area_chart), [`st.bar_chart`](/develop/api-reference/charts/st.bar_chart), [`st.line_chart`](/develop/api-reference/charts/st.line_chart), and [`st.scatter_chart`](/develop/api-reference/charts/st.scatter_chart).
- ⌛ The caching parameter `experimental_allow_widgets` is deprecated ([#8817](https://github.com/streamlit/streamlit/pull/8817)).
- ❌ Streamlit no longer supports legacy caching. `st.cache` is now an alias for `st.cache_data` and `st.cache_resource` ([#8737](https://github.com/streamlit/streamlit/pull/8737)).
- ⬆️ Streamlit supports `protobuf` version 5 ([#8627](https://github.com/streamlit/streamlit/pull/8627)).

**Other Changes**

- ✨ Streamlit Hello uses `st.navigation` and `st.Page`, the new, preferred method for declaring multipage apps ([#8806](https://github.com/streamlit/streamlit/pull/8806)).
- 🧹 Streamlit no longer appends "· Streamlit" to the page title of apps, unless running on Community Cloud ([#8900](https://github.com/streamlit/streamlit/pull/8900)).
- 🦋 Streamlit magic and `st.write` use `st.json` to display `st.secrets` ([#8659](https://github.com/streamlit/streamlit/pull/8659), [#2905](https://github.com/streamlit/streamlit/issues/2905)).
- 🔍 Streamlit doesn't automatically check for newer version on PyPi ([#8841](https://github.com/streamlit/streamlit/pull/8841), [#8453](https://github.com/streamlit/streamlit/issues/8453)).
- 🐌 Bug fix: Custom component functions require importing `streamlit.components.v1` ([#8666](https://github.com/streamlit/streamlit/pull/8666), [#8644](https://github.com/streamlit/streamlit/issues/8644)).
- 🕸️ Bug fix: Reverted change to handle Altairs `resolve_scale` method since it caused a regression ([#8845](https://github.com/streamlit/streamlit/pull/8845), [#8642](https://github.com/streamlit/streamlit/issues/8642)).
- 🦗 Bug fix: Images in Markdown do not overflow the Markdown container ([#8794](https://github.com/streamlit/streamlit/pull/8794)).
- 🦂 Bug fix: Clarified the error message for `st.selectbox` when `index` is larger than the size of `options` ([#8775](https://github.com/streamlit/streamlit/pull/8775), [#8771](https://github.com/streamlit/streamlit/issues/8771)).
- 🦟 Bug fix: Streamlit correctly handles non-widget elements with IDs ([#8770](https://github.com/streamlit/streamlit/pull/8770), [#8768](https://github.com/streamlit/streamlit/issues/8768)).
- 🦠 Bug fix: Docstrings correctly identify when `use_container_width=True` is the default ([#8809](https://github.com/streamlit/streamlit/pull/8809)).
- 🪰 Bug fix: Streamlit has a consistent minimum element height for better vertical alignment ([#8797](https://github.com/streamlit/streamlit/pull/8797), [#8835](https://github.com/streamlit/streamlit/pull/8835), [#8027](https://github.com/streamlit/streamlit/issues/8027), [#8706](https://github.com/streamlit/streamlit/issues/8706)).
- 🪳 Bug fix: Added check to ensure `SessionInfo` is initialized before performing actions ([#8779](https://github.com/streamlit/streamlit/pull/8779), [#8321](https://github.com/streamlit/streamlit/issues/8321), [#7549](https://github.com/streamlit/streamlit/issues/7549)).
- 🕷️ Bug fix: Dataframe use raw numbers without formatting by default ([#8708](https://github.com/streamlit/streamlit/pull/8708), [#8695](https://github.com/streamlit/streamlit/issues/8695)).
- 🐞 Bug fix: Updated the error message for disallowed writes to Session State ([#8720](https://github.com/streamlit/streamlit/pull/8720), [#8715](https://github.com/streamlit/streamlit/issues/8715)).
- 🐝 Bug fix: Streamlit doesn't initialize `LocalSourcesWatcher` if file watching is disabled ([#8741](https://github.com/streamlit/streamlit/pull/8741), [#8738](https://github.com/streamlit/streamlit/issues/8738)).
- 🐜 Bug fix: `st.experimental_dialog` no longer has an invalid default value for `title` ([#8729](https://github.com/streamlit/streamlit/pull/8729)).
- 🪲 Bug fix: Removed deprecated kwargs in [`ast.Call`](http://ast.Call) to prevent type error ([#8711](https://github.com/streamlit/streamlit/pull/8711)). Thanks, [JelleZijlstra](https://github.com/JelleZijlstra)!
- 🐛 Bug fix: `st.experimental_dialog` is explicitly exported to avoid a type checking error ([#8728](https://github.com/streamlit/streamlit/pull/8728), [#8712](https://github.com/streamlit/streamlit/issues/8712)).

## **Version 1.35.0**

_Release date: May 23, 2024_

**Highlights**

- 📈 Announcing user selections for charts! Use [`st.plotly_chart`](/develop/api-reference/charts/st.plotly_chart), [`st.altair_chart`](/develop/api-reference/charts/st.altair_chart), and [`st.vega_lite_chart`](/develop/api-reference/charts/st.vega_lite_chart) to make chart widgets for even more interactive apps.
- 🚣‍♂️ Announcing user selections for dataframes. Get row and column selections from users with [`st.dataframe`](/develop/api-reference/data/st.dataframe).
- 💼 Introducing [`st.logo`](/develop/api-reference/media/st.logo) to add an image in the sidebar, above navigation.

**Notable Changes**

- 🔗 [`st.page_link`](/develop/api-reference/widgets/st.page_link) supports Material icons ([#8593](https://github.com/streamlit/streamlit/pull/8593)).
- ⚓ Anchor button for headers display inline at the end of headers for a more beautiful and consistent appearance ([#8587](https://github.com/streamlit/streamlit/pull/8587)).
- 🈂️ [`SQLConnection`](/develop/api-reference/connections/st.connections.sqlconnection) accepts `query` as a `sqlalchemy.URL.create` parameter so you can specify character sets ([#8581](https://github.com/streamlit/streamlit/pull/8581)). Thanks, [LucianLiu6](https://github.com/LucianLiu6)!

**Other Changes**

- 🕸️ Bug fix: A fallback method was added for CSV downloads to increase browser compatibility ([#8452](https://github.com/streamlit/streamlit/pull/8452), [#8210](https://github.com/streamlit/streamlit/issues/8210)).
- 🦗 Bug fix: Column config is deep-copied when cloned to prevent unintentional modifications ([#8677](https://github.com/streamlit/streamlit/pull/8677)).
- 🦂 Bug fix: `st.data_editor` renders correctly when using `num_rows=dynamic` with null values in added rows ([#8640](https://github.com/streamlit/streamlit/pull/8640), [#7458](https://github.com/streamlit/streamlit/issues/7458)).
- 🦟 Bug fix: `streamlit run` will display the `localhost` address when initializing Streamlit with `server.headless=true` ([#8647](https://github.com/streamlit/streamlit/pull/8647), [#8629](https://github.com/streamlit/streamlit/issues/8629)).
- 🦠 Bug fix: Scroll margin matches the new toolbar (app chrome) height ([#8641](https://github.com/streamlit/streamlit/pull/8641), [#8554](https://github.com/streamlit/streamlit/pull/8554)).
- 🪰 Bug fix: Enum coercion is compatible with StrEnum ([#8622](https://github.com/streamlit/streamlit/pull/8622), [#8500](https://github.com/streamlit/streamlit/issues/8500)). Thanks, [97k](https://github.com/97k)!
- 🪳 Bug fix: Focus is returned to chat input after clicking submit for a better mobile experience ([#8637](https://github.com/streamlit/streamlit/pull/8637)).
- 🕷️ Bug fix: Internal parameter and view names for Altair charts are stabilized for better performance ([#8628](https://github.com/streamlit/streamlit/pull/8628)).
- 🐞 Bug fix: Typing was improved for `st.query_params.update()` and `st.query_params.from_dict()` ([#8614](https://github.com/streamlit/streamlit/pull/8614), [#8613](https://github.com/streamlit/streamlit/issues/8613)). Thanks, [Asaurus1](https://github.com/Asaurus1)!
- 🐝 Bug fix: The fullscreen button no longer appears for `st.table` to prevent unwanted side scrolling ([#8621](https://github.com/streamlit/streamlit/pull/8621), [#2358](https://github.com/streamlit/streamlit/issues/2358)).
- 🐜 Bug fix: Streamlit correctly clears stale elements when using `st.rerun` ([#8599](https://github.com/streamlit/streamlit/pull/8599), [#8360](https://github.com/streamlit/streamlit/issues/8360)).
- 🪲 Bug fix: Custom components can be executed standalone for testing and scripting ([#8620](https://github.com/streamlit/streamlit/pull/8620), [#8606](https://github.com/streamlit/streamlit/issues/8606)).
- 👻 Bug fix: Plotly charts no longer render cached data when updated ([#8191](https://github.com/streamlit/streamlit/pull/8191), [#5902](https://github.com/streamlit/streamlit/issues/5902))
- 👽 Plotly chart widths will not overflow its parent container when rendered in a bordered container ([#8191](https://github.com/streamlit/streamlit/pull/8191), [#8244](https://github.com/streamlit/streamlit/issues/8244)).
- 🦀 Plotly charts using `webgl` render correctly on M1/M2 chipsets for macOS ([#8191](https://github.com/streamlit/streamlit/pull/8191), [#8169](https://github.com/streamlit/streamlit/issues/8169)).
- 🦋 Plotly charts are sized correctly when rendered vertically adjacent ([#8191](https://github.com/streamlit/streamlit/pull/8191), [#7597](https://github.com/streamlit/streamlit/issues/7597)).
- 🦎 Bug fix: Plotly charts retain their state when the app window is resized ([#8191](https://github.com/streamlit/streamlit/pull/8191), [#6324](https://github.com/streamlit/streamlit/issues/6324)).
- 🐛 Bug fix: Plotly charts in `st.tabs` no longer flicker when changing tabs ([#8191](https://github.com/streamlit/streamlit/pull/8191), [#8575](https://github.com/streamlit/streamlit/issues/8575)).
- 🐌 Bug fix: Plotly charts respect `use_container_width` if this parameter is changed between reruns ([#8191](https://github.com/streamlit/streamlit/pull/8191), [#8576](https://github.com/streamlit/streamlit/issues/8576)).

## **Version 1.34.0**

_Release date: May 2, 2024_

**Highlights**

- 🍿 Introducing `st.experimental_dialog`! Create a modal overlay that can also rerun independently from the rest of your app. Check out the [docs](/develop/api-reference/execution-flow/st.dialog) to learn how.

**Notable Changes**

- 🔣 `st.toast`, `st.chat_message`, `st.set_page_config`, `st.info`, `st.success`, `st.error`, and `st.warning` can use Google Material Symbols for their icons.
- 🌈 [Markdown](/develop/api-reference/text/st.markdown) supports background colors for text. Check out the [feature demo app](https://background-colors.streamlit.app/).
- 🎥 [`st.audio`](/develop/api-reference/media/st.audio) and [`st.video`](/develop/api-reference/media/st.video) can now be set to autoplay. `st.video` can be muted.
- 🗃️ You can [clear specific cached values](/develop/api-reference/caching-and-state/st.cache_data#cachedfuncclear) for a cached function. Thanks, [OscarSaharoy](https://github.com/OscarSaharoy)!
- ❓ You can now set all query parameters with a single call to [`st.query_params.from_dict`](/develop/api-reference/caching-and-state/st.query_params#stquery_paramsfrom_dict). Thanks, [Asaurus1](https://github.com/Asaurus1)!

**Other Changes**

- 🔲 Streamlit supports Modin and Snowpark pandas DataFrames and Series ([#8506](https://github.com/streamlit/streamlit/pull/8506)).
- ⏱️ Improved support for `period` data types in `st.dataframe` and `st.data_editor` ([#7987](https://github.com/streamlit/streamlit/pull/7987)).
- 🗺️ Streamlit supports using `pydeck-carto` with `st.pydeck_chart` ([#8422](https://github.com/streamlit/streamlit/pull/8422)).
- ❄️ Additional `snowflake` requirements were updated to allow Python versions 3.8 to 3.11 ([#8538](https://github.com/streamlit/streamlit/pull/8538)).
- 🍞 `st.toast` received visual improvements and now appears in the top right ([#8433](https://github.com/streamlit/streamlit/pull/8433)).
- 🦋 Visual tweaks for dialogs and modals.
- 🦀 Bug fix: `st.write_stream` returns an empty string when passed a generator with no yield ([#8560](https://github.com/streamlit/streamlit/pull/8560)).
- 🦎 Bug fix: Widgets that support `None` values can be correctly set to `None` through Session State ([#8529](https://github.com/streamlit/streamlit/pull/8529), [#7649](https://github.com/streamlit/streamlit/issues/7649)).
- 🐌 Bug fix: If the initial value for `st.date_input` is not set and today's date falls outside the declared minimum or maximum, then the minimum or maximum will be used instead, whichever is closer ([#8519](https://github.com/streamlit/streamlit/pull/8519), [#6167](https://github.com/streamlit/streamlit/issues/6167)).
- 🕸️ Bug fix: Altair's `resolve_scale` method is handled correctly ([#8497](https://github.com/streamlit/streamlit/pull/8497), [#1667](https://github.com/streamlit/streamlit/issues/1667)).
- 🦗 Bug fix: `st.multiselects` correctly handles sets when passed to `options` or `default` ([#8471](https://github.com/streamlit/streamlit/pull/8471), [#8466](https://github.com/streamlit/streamlit/issues/8466)).
- 🦂 Bug fix: `st.status` does not show the expander toggle when empty ([#8369](https://github.com/streamlit/streamlit/pull/8369)).
- 🦟 Bug fix: The width of `vconcat` charts in Vega and Altair is set correctly ([#8498](https://github.com/streamlit/streamlit/pull/8498), [#2751](https://github.com/streamlit/streamlit/issues/2751)).
- 🦠 Bug fix: Apps print beautifully and no longer show excessive whitespace ([#8502](https://github.com/streamlit/streamlit/pull/8502), [#7815](https://github.com/streamlit/streamlit/issues/7815)).
- 🪰 Bug fix: Invalid escape sequences were removed to avoid warnings from `pytest` ([#8510](https://github.com/streamlit/streamlit/pull/8510), [#8501](https://github.com/streamlit/streamlit/issues/8501)).
- 🪳 Bug fix: `st.file_uploader` callback is correctly executed once per file selection after the first selection ([#8493](https://github.com/streamlit/streamlit/pull/8493), [#4877](https://github.com/streamlit/streamlit/issues/4877)).
- 🕷️ Bug fix: Streamlit is compatible down to `pillow` version 7.1.0 instead of 9.1.0 ([#8492](https://github.com/streamlit/streamlit/pull/8492), [#8486](https://github.com/streamlit/streamlit/issues/8486)).
- 🐞 Bug fix: Widget values are correctly dropped when a script run is interrupted by switching pages ([#8425](https://github.com/streamlit/streamlit/pull/8425), [#7338](https://github.com/streamlit/streamlit/issues/7338)).
- 🐝 Bug fix: Apps in dark mode will return to dark mode after printing ([#8469](https://github.com/streamlit/streamlit/pull/8469), [#7879](https://github.com/streamlit/streamlit/issues/7879)).
- 🐜 Bug fix: Component ready state is dynamic to avoid race conditions that caused blank apps in Safari ([#8434](https://github.com/streamlit/streamlit/pull/8434), [#8362](https://github.com/streamlit/streamlit/issues/8362)).
- 🪲 Bug fix: `st.slider` yields a Python error when `min_value` is less than or equal to `max_value` ([#8413](https://github.com/streamlit/streamlit/pull/8413), [#8342](https://github.com/streamlit/streamlit/issues/8342)).
- 🐛 Bug fix: Time is offset correctly for Vega and Altair ([#8278](https://github.com/streamlit/streamlit/pull/8278), [#4342](https://github.com/streamlit/streamlit/issues/4342)).

## **Version 1.33.0**

_Release date: April 4, 2024_

**Highlights**

- 👟 Introducing [`st.experimental_fragment`](/develop/api-reference/execution-flow/st.fragment) to decorate functions and rerun them independently of the whole page. Check out the [docs](/develop/concepts/architecture/fragments) and give your apps a speed boost!
- 🌐 Introducing `st.html` to insert custom HTML into your app! Check out the [docs](/develop/api-reference/utilities/st.html) for how to use it.

**Notable Changes**

- 📺 [`st.audio`](/develop/api-reference/media/st.audio) and [`st.video`](/develop/api-reference/media/st.video) allow looping and setting an end time ([#8203](https://github.com/streamlit/streamlit/pull/8203), [#8348](https://github.com/streamlit/streamlit/pull/8348)).
- 🔁 `AppTest` allows switching pages with [`AppTest.switch_page`](/develop/api-reference/app-testing/st.testing.v1.apptest#apptestswitch_page) ([#8280](https://github.com/streamlit/streamlit/pull/8280)).
- 🧪 `format_func` is accessible in `AppTest` for widgets that use it ([#8189](https://github.com/streamlit/streamlit/pull/8189), [#8019](https://github.com/streamlit/streamlit/issues/8019), [#7679](https://github.com/streamlit/streamlit/issues/7679)).
- 📈 Column configuration now includes [`AreaChartColumn`](/develop/api-reference/data/st.column_config/st.column_config.areachartcolumn). [`LineChartColumn`](/develop/api-reference/data/st.column_config/st.column_config.linechartcolumn) no longer shows area ([#8237](https://github.com/streamlit/streamlit/pull/8237)).
- 🚧 Breaking change: [`st.write`](/develop/api-reference/write-magic/st.write) will no longer set `unsafe_allow_html=True` when passed an object containing a `_repr_html_` method. For more information, see PR [#8238](https://github.com/streamlit/streamlit/pull/8238).

**Other Changes**

- 🖱️Users can click on the widget label to focus on input for `st.number_input`, `st.text_input`, and `st.text_area` ([#8155](https://github.com/streamlit/streamlit/pull/8155)). Thanks, [filiptammergard](https://github.com/filiptammergard)!
- ⬆️ Streamlit supports `packaging` version 24.x ([#8338](https://github.com/streamlit/streamlit/pull/8338), [#8328](https://github.com/streamlit/streamlit/issues/8328)).
- 🕸️ Bug fix: Streamlit now watches for changes to imported modules in addition to pages ([#8372](https://github.com/streamlit/streamlit/pull/8372)). Thanks, [zyxue](https://github.com/zyxue)!
- 🦗 Bug fix: Overflowing toast messages are correctly truncated ([#8337](https://github.com/streamlit/streamlit/pull/8337), [#8330](https://github.com/streamlit/streamlit/issues/8330)).
- 🦂 Bug fix: `st.status` correctly updates to complete when using LangChain's `StreamlitCallbackHandler` ([#8331](https://github.com/streamlit/streamlit/pull/8311)).
- 🦟 Bug fix: Custom components no longer show white backgrounds in dark themes ([#8242](https://github.com/streamlit/streamlit/pull/8242), [#8156](https://github.com/streamlit/streamlit/issues/8156), [#7813](https://github.com/streamlit/streamlit/issues/7813)).
- 🦠 Bug fix: Content area width is reduced when a fullscreen icon would otherwise cause horizontal overflow ([#8279](https://github.com/streamlit/streamlit/pull/8279), [#6990](https://github.com/streamlit/streamlit/issues/6990)).
- 🪰 Bug fix: Custom components with undefined frame heights will render with a height of 0 ([#8290](https://github.com/streamlit/streamlit/pull/8290), [#8285](https://github.com/streamlit/streamlit/issues/8285)).
- 🪳 Bug fix: Restored a check for active sessions to prevent apps from needlessly running when no users are connected ([#8294](https://github.com/streamlit/streamlit/pull/8294)).
- 🕷️ Bug fix: Custom themes have precedence over embedding options ([#8021](https://github.com/streamlit/streamlit/pull/8021), [#7118](https://github.com/streamlit/streamlit/issues/7118)).
- 🐞 Bug fix: Reverted the async timer to expire session storage cache to address computational efficiency ([#8281](https://github.com/streamlit/streamlit/pull/8281)).
- 🐝 Bug fix: When using `st.popover` with `use_container_width=True`, the popover container's minimum width will match the popover button ([#8266](https://github.com/streamlit/streamlit/pull/8266), [#8261](https://github.com/streamlit/streamlit/issues/8261)).
- 🐜 Bug fix: Using `st.rerun` with a triggering widget in `AppTest` no longer creates an infinite loop ([#8264](https://github.com/streamlit/streamlit/pull/8264), [#7768](https://github.com/streamlit/streamlit/issues/7768)).
- 🪲 Bug fix: URLs are correctly decoded in `LinkColumn` if regex is used or if not using fully qualified URLs ([#8258](https://github.com/streamlit/streamlit/pull/8258), [#7064](https://github.com/streamlit/streamlit/issues/7064)).
- 🐛 Bug fix: `st.query_params` only sends one `ForwardMsg` when updating multiple parameters ([#8205](https://github.com/streamlit/streamlit/pull/8205), [#8199](https://github.com/streamlit/streamlit/issues/8199)). Thanks, [Asaurus1](https://github.com/Asaurus1)!

## **Version 1.32.0**

_Release date: March 7, 2024_

**Highlights**

- 🍿 Introducing `st.popover` to create popover elements in your Streamlit apps. Check out [the docs](/develop/api-reference/layout/st.popover) to see how to use it!

**Notable Changes**

- 📺 You can now pass subtitles to [`st.video`](/develop/api-reference/media/st.video)! Check out our [feature demo](https://doc-video-subtitle-inputs.streamlit.app/).
- ⚗️ [`AppTest`](/develop/api-reference/app-testing/st.testing.v1.apptest) includes support for `st.expander` and `st.status`.
- 🧪 [`AppTest.from_function`](/develop/api-reference/app-testing/st.testing.v1.apptest#apptestfrom_function) accepts a function that takes arguments and/or returns a value.
- 🧩 The timeout warning for custom components was replaced with an element skeleton to improve the UX for slow-loading components, especially in some cloud-hosted platforms ([#8179](https://github.com/streamlit/streamlit/pull/8179), [#7046](https://github.com/streamlit/streamlit/issues/7046)).
- 📄 `st.switch_page` and `st.page_link` received significant improvements to path handling, performance, and visual appearance (see below for details).
- 🦀 Bug fix: Streamlit uses `glide-data-grid` version 6.0.4 to fix a variety of dataframe issues ([#7779](https://github.com/streamlit/streamlit/pull/7779), [#6900](https://github.com/streamlit/streamlit/issues/6900), [#7032](https://github.com/streamlit/streamlit/issues/7032), [#7727](https://github.com/streamlit/streamlit/issues/7727), [#6810](https://github.com/streamlit/streamlit/issues/6810), [#7930](https://github.com/streamlit/streamlit/issues/7930), [#7949](https://github.com/streamlit/streamlit/issues/7949), [#7831](https://github.com/streamlit/streamlit/issues/7831), [#8168](https://github.com/streamlit/streamlit/issues/8168)).
- 💦 Bug fix: We've plugged a significant memory leak in the coroutine loop. Apps that generate a large number of small messages between client and server will benefit greatly ([#8068](https://github.com/streamlit/streamlit/pull/8068), [#7989](https://github.com/streamlit/streamlit/issues/7989), [#6510](https://github.com/streamlit/streamlit/issues/6510)).

**Other Changes**

- 💪 Multiple modules are now lazy-loaded to speed up Streamlit's import time ([#8150](https://github.com/streamlit/streamlit/pull/8150), [#8143](https://github.com/streamlit/streamlit/pull/8143), [#8134](https://github.com/streamlit/streamlit/pull/8134), [#8113](https://github.com/streamlit/streamlit/pull/8113), [#8125](https://github.com/streamlit/streamlit/pull/8125), [#8111](https://github.com/streamlit/streamlit/pull/8111), [#8109](https://github.com/streamlit/streamlit/pull/8109), [#6066](https://github.com/streamlit/streamlit/issues/6066)).
- 🖼️ `st.write` supports `PIL` images ([#8039](https://github.com/streamlit/streamlit/pull/8039)).
- 🔗 `st.radio` allows markdown links within the items passed to `options` ([#8028](https://github.com/streamlit/streamlit/pull/8028), [#7992](https://github.com/streamlit/streamlit/issues/7992)).
- 💀 The `deprecation.showPyplotGlobalUse` config option is deprecated and will be removed in the subsequent release ([#8133](https://github.com/streamlit/streamlit/pull/8133)).
- 🤖 Streamlit supports AzureOpenAI chat stream ([#8107](https://github.com/streamlit/streamlit/pull/8107), [#8084](https://github.com/streamlit/streamlit/issues/8084)).
- 🌐 The `/healthz` endpoint supports the HTTP HEAD method ([#8145](https://github.com/streamlit/streamlit/pull/8145), [#8144](https://github.com/streamlit/streamlit/issues/8144)). Thanks, [rahulmistri1997](https://github.com/rahulmistri1997)!
- 🌀 The `cache` parameter for `st.spinner` is now private (`_cache`) since it's for internal use ([#8118](https://github.com/streamlit/streamlit/pull/8118)).
- 🏃 Session storage is checked and expired asynchronously to improve performance and efficiency of apps with lower traffic ([#8083](https://github.com/streamlit/streamlit/pull/8083)).
- 🐜 `st.write_stream` raises a descriptive `Exception` when the message cannot be parsed ([#8036](https://github.com/streamlit/streamlit/pull/8036)).
- 📘 Fixed a typo in the examples for `st.switch_page` and `st.page_link` ([#8162](https://github.com/streamlit/streamlit/pull/8162)). Thanks, [t1emp0](https://github.com/t1emp0)!
- 👻 Bug fix: `st.help` correctly displays conditional members ([#8228](https://github.com/streamlit/streamlit/pull/8228)).
- 🦋 Bug fix: App State fully clears on page change to prevent lingering stale elements ([#8208](https://github.com/streamlit/streamlit/pull/8208)).
- 🦎 Bug fix: `st.info`, `st.success`, `st.warning`, and `st.error` don't overflow with long markdown strings ([#8194](https://github.com/streamlit/streamlit/pull/8194), [#6394](https://github.com/streamlit/streamlit/issues/6394)).
- 🐌 Bug fix: Streamlit shows a warning that port 3000 is reserved for development when the server port is set to 3000 ([#8152](https://github.com/streamlit/streamlit/pull/8152), [#8149](https://github.com/streamlit/streamlit/issues/8149)).
- 🕸️ Bug fix: `st.page_link` and `st.switch_page` have improved path calculation for consistency ([#8127](https://github.com/streamlit/streamlit/pull/8127)).
- 🦗 Bug fix: `st.page_link` shows the correct path in browser on hover ([#8086](https://github.com/streamlit/streamlit/pull/8086), [#8080](https://github.com/streamlit/streamlit/issues/8080)).
- 🦂 Bug fix: `st.page_link` and `st.switch_page` normalize paths for correct handling in Windows ([#8103](https://github.com/streamlit/streamlit/pull/8103), [#8070](https://github.com/streamlit/streamlit/issues/8070)).
- 🦟 Bug fix: Script runner uses a while loop instead of recursion to avoid stack overflows ([#8100](https://github.com/streamlit/streamlit/pull/8100)).
- 🦠 Bug fix: `st.page_link` and `st.switch_page` correctly handle relative paths prefixed with `"/"` ([#8085](https://github.com/streamlit/streamlit/pull/8085), [#8081](https://github.com/streamlit/streamlit/issues/8081)).
- 🪰 Bug fix: `st.image` parses paths in Windows correctly ([#8092](https://github.com/streamlit/streamlit/pull/8092), [#7271](https://github.com/streamlit/streamlit/issues/7271), [#6066](https://github.com/streamlit/streamlit/issues/6066)).
- 🪳 Bug fix: `st.switch_page` no longer waits for the current page to finish running before switching pages ([#8054](https://github.com/streamlit/streamlit/pull/8054), [#7954](https://github.com/streamlit/streamlit/issues/7954)).
- 🕷️ Bug fix: `st.map` and other simple charts correctly handle color when data is not indexed starting from 0 ([#8158](https://github.com/streamlit/streamlit/pull/8158), [#8079](https://github.com/streamlit/streamlit/pull/8079), [#8077](https://github.com/streamlit/streamlit/issues/8077)). Thanks, [awhazell](https://github.com/awhazell)!
- 🐞 Bug fix: `st.selectbox`, `st.multiselect`, `st.select_slider`, and `st.radio` use shallow copies of their options to prevent unexpected mutations ([#8064](https://github.com/streamlit/streamlit/pull/8064), [#7534](https://github.com/streamlit/streamlit/issues/7534)).
- 🐝 Bug fix: The selected time in `st.time_input` displays correctly in dark mode ([#8056](https://github.com/streamlit/streamlit/pull/8056), [#7436](https://github.com/streamlit/streamlit/issues/7436)).
- 🪲 Bug fix: Dataframe scrollbars display correctly in the latest version of Chrome ([#8034](https://github.com/streamlit/streamlit/pull/8034)).
- 🐛 Bug fix: Casting `st.query_params` to `str` will print the content of the query parameters instead of the class description ([#8030](https://github.com/streamlit/streamlit/pull/8030)).

## **Version 1.31.0**

_Release date: February 1, 2024_

**Release videos**

- [What's new?](https://www.youtube.com/watch?v=0TSXM-BGqHU)

**Highlights**

- 🔗 Introducing `st.page_link`! Now, you can build custom navigation menus for your multipage apps. Check out [our docs](/develop/api-reference/widgets/st.page_link) to see how.
- 💦 Announcing `st.write_stream` to conveniently handle generators and streamed responses. Check out [our docs](/develop/api-reference/write-magic/st.write_stream) to see how making chat apps just got easier.

**Notable Changes**

- 📝 `st.chat_input` can be used inline and placed anywhere in the app. You can also have multiple `st.chat_input` widgets on a page ([#7896](https://github.com/streamlit/streamlit/pull/7896)).

**Other Changes**

- 🧹 Internal refactoring and cleanup ([#7980](https://github.com/streamlit/streamlit/pull/7980)). Thanks, [whitphx](https://github.com/whitphx)!
- ❄️ Bug fix: Snowpark is now an optional dependency for `SnowflakeConnection` ([#7919](https://github.com/streamlit/streamlit/pull/7919)).
- 🕷️ Bug fix: The watchdog suggestion is disabled when `server.fileWatcherType` is set to `none` or `poll` ([#8024](https://github.com/streamlit/streamlit/pull/8024), [#7999](https://github.com/streamlit/streamlit/issues/7999)).
- 🐞 Bug fix: Required columns can be hidden when not using `st.data_editor` with dynamic rows ([#7996](https://github.com/streamlit/streamlit/pull/7996), [#7991](https://github.com/streamlit/streamlit/issues/7991)).
- 🐝 Bug fix: New period types are supported for pandas 2.2.0 ([#7988](https://github.com/streamlit/streamlit/pull/7988)).
- 🐜 Bug fix: Custom components receive only the app's origin and path to avoid reloading components when query parameters change ([#7951](https://github.com/streamlit/streamlit/pull/7951), [#7503](https://github.com/streamlit/streamlit/issues/7503)). Thanks, [eric-skydio](https://github.com/eric-skydio)!
- 🪲 Bug fix: `st.progress` won't raise an exception when given a value above 1.0 due to float precision ([#7953](https://github.com/streamlit/streamlit/pull/7953), [#5517](https://github.com/streamlit/streamlit/issues/5517)). Thanks, [notiona](https://github.com/notiona)!
- 📚 Streamlit supports`importlib-metadata` version 7 ([#7925](https://github.com/streamlit/streamlit/pull/7925)). Thanks, [elgalu](https://github.com/elgalu)!
- 🐛 Bug fix: `AppTest` correctly sees widgets inside containers ([#7923](https://github.com/streamlit/streamlit/pull/7923), [#7711](https://github.com/streamlit/streamlit/issues/7711)).
- 💿 Custom components no longer accumulate style elements when re-rendered for better performance ([#7914](https://github.com/streamlit/streamlit/pull/7914)). Thanks, [Tom-Julux](https://github.com/Tom-Julux)!

## **Version 1.30.0**

_Release date: January 11, 2024_

**Release videos**

- [What's new?](https://www.youtube.com/watch?v=OIQskkX_DK0)

**Highlights**

- 🔄 Announcing `st.switch_page` to programmatically switch pages in multipage apps! Check out our [docs](/develop/api-reference/navigation/st.switch_page) to learn about this highly anticipated feature!
- ❓Introducing `st.query_params` to handle variables passed through your app's URL. Check out our [docs](/develop/api-reference/caching-and-state/st.query_params) to understand this feature and how it's been upgraded and improved from our experimental version!

**Notable Changes**

- 📐 `st.container` can be configured with a height to create grids or scrolling containers ([#7697](https://github.com/streamlit/streamlit/pull/7697), [#2169](https://github.com/streamlit/streamlit/issues/2169), [#2447](https://github.com/streamlit/streamlit/issues/2447)).
- 🔗 For dataframes, `LinkColumn` has a simplified UI and can be configured with display text, including programmatically defined text through regular expressions ([#7784](https://github.com/streamlit/streamlit/pull/7784), [#7741](https://github.com/streamlit/streamlit/pull/7741), [#6787](https://github.com/streamlit/streamlit/issues/6787)).
- 🧭 Sidebar navigation for multipage apps can be hidden via configuration ([#7852](https://github.com/streamlit/streamlit/pull/7852)).
- ⏩ Plotly figures can load even faster when used in combination with `orjson` ([#7860](https://github.com/streamlit/streamlit/pull/7860)). Thanks, [eric-skydio](https://github.com/eric-skydio)!
- ♻️ Behavior change: Query parameters are removed when changing pages ([#7817](https://github.com/streamlit/streamlit/pull/7817), [#6725](https://github.com/streamlit/streamlit/issues/6725), [#5505](https://github.com/streamlit/streamlit/issues/5505)).

**Other Changes**

- 🛠️ `showFooter` is no longer an embed option since the footer no longer exists ([#7902](https://github.com/streamlit/streamlit/pull/7902), [#7785](https://github.com/streamlit/streamlit/issues/7785)).
- 🕵️ All security concerns should be reported through [HackerOne](https://hackerone.com/snowflake?type=team) ([#7783](https://github.com/streamlit/streamlit/pull/7783)).
- 🕷️ Bug fix: Tabs are not disabled when stale to prevent flickering ([#7905](https://github.com/streamlit/streamlit/pull/7905), [#7820](https://github.com/streamlit/streamlit/issues/7820)).
- 🛡️ Bug fix: The full file path is used instead of a prefix to prevent custom components from reaching beyond their own folders ([#7901](https://github.com/streamlit/streamlit/pull/7901)).
- 🪱 Bug fix: Widgets raise an exception if its values aren't Python comparable ([#7840](https://github.com/streamlit/streamlit/pull/7840), [#3714](https://github.com/streamlit/streamlit/issues/3714)).
- 🐞 Bug fix: The down-arrow icons on expanders maintain a consistent size ([#7596](https://github.com/streamlit/streamlit/pull/7596)). Thanks, [matiboux](https://github.com/matiboux)!
- 🐝 Bug fix: Tabs no longer flicker when switching between them ([#7904](https://github.com/streamlit/streamlit/pull/7904)).
- 🐜 Bug fix: Enter-to-submit is automatically disabled when the associated `st.form_submit_button` is disabled ([#7827](https://github.com/streamlit/streamlit/pull/7827), [#7822](https://github.com/streamlit/streamlit/issues/7822)).
- 🪲 Bug fix: Required columns cannot be hidden with column configuration ([#7888](https://github.com/streamlit/streamlit/pull/7888), [#7559](https://github.com/streamlit/streamlit/issues/7559)).
- 🐛 Bug fix: Using `nan` as a value in `SelectboxColumn` will raise an error instead of silently failing ([#7887](https://github.com/streamlit/streamlit/pull/7887), [#7558](https://github.com/streamlit/streamlit/issues/7558)).
- 🌙 Bug fix: Custom component iframes allow dark mode ([#7821](https://github.com/streamlit/streamlit/pull/7821), [#7813](https://github.com/streamlit/streamlit/issues/7813)).
- 🪰 Bug fix: The command to start Streamlit is not sent to the frontend ([#7787](https://github.com/streamlit/streamlit/pull/7787)).
- 💅 Bug fix: The background color of `st.toggle` is enhanced for better visibility ([#7788](https://github.com/streamlit/streamlit/pull/7788)).
- 🪳 Bug fix: Built-in charts can handle ordered categorical columns ([#7771](https://github.com/streamlit/streamlit/pull/7771), [#7776](https://github.com/streamlit/streamlit/issues/7776)).

## **Version 1.29.0**

_Release date: November 30, 2023_

**Highlights**

- 🔲 [`st.container`](/develop/api-reference/layout/st.container) and [`st.form`](/develop/api-reference/execution-flow/st.form) now have a `border` parameter to show or hide a border.
- 🐍 Streamlit supports Python 3.12!

**Notable Changes**

- ⌛ `st.dataframe`, `st.data_editor`, and `st.table` support `datetime.timedelta` values ([#7689](https://github.com/streamlit/streamlit/pull/7689), [#4489](https://github.com/streamlit/streamlit/issues/4489)).
- 💀 Streamlit apps preload skeleton elements for a smoother appearance when initializing ([#7598](https://github.com/streamlit/streamlit/pull/7598)).
- 🏃 Reduced the overhead of running `AppTest`-simulated apps, especially for fast-running apps ([#7691](https://github.com/streamlit/streamlit/pull/7691)).
- 🛁 String representations of `AppTest` data are improved for a better testing and debugging experience ([#7658](https://github.com/streamlit/streamlit/pull/7658)).
- 🔢 Apps can be configured to identify `Enum` classes as the same if they have matching member names ([#7408](https://github.com/streamlit/streamlit/pull/7408), [#4909](https://github.com/streamlit/streamlit/issues/4909)). Thanks, [Asaurus1](https://github.com/Asaurus1)!
- ❌ The "Made with Streamlit" footer no longer appears at the bottom of apps ([#7583](https://github.com/streamlit/streamlit/pull/7583)).
- 🧹 Unused config options have been deprecated ([#7584](https://github.com/streamlit/streamlit/pull/7584)).
- 🕳️ Query parameters can be empty ([#7601](https://github.com/streamlit/streamlit/pull/7601), [#7416](https://github.com/streamlit/streamlit/issues/7416)).
- 💅 Visual tweaks ([#7592](https://github.com/streamlit/streamlit/pull/7592), [#7630](https://github.com/streamlit/streamlit/pull/7630)).

**Other Changes**

- 🦗 Bug fix: Convert floats to bytes instead of hashing to avoid hashing instability ([#7754](https://github.com/streamlit/streamlit/pull/7754)). Thanks, [BlackHC](https://github.com/BlackHC)!
- 🦎 Bug fix: Corrected broken URLs and typos in error messages ([#7746](https://github.com/streamlit/streamlit/pull/7746), [#7764](https://github.com/streamlit/streamlit/pull/7764), [#7770](https://github.com/streamlit/streamlit/pull/7770)). Thanks, [ObservedObserver](https://github.com/ObservedObserver)!
- 🐌 Bug fix: `st.connection` correctly caches results when using two connections of the same type ([#7730](https://github.com/streamlit/streamlit/pull/7730), [#7709](https://github.com/streamlit/streamlit/issues/7709)).
- 🕸️ Bug fix: Using context managers with multithreading now displays content in the expected order ([#7715](https://github.com/streamlit/streamlit/pull/7715), [#7668](https://github.com/streamlit/streamlit/issues/7668)). Thanks, [eric-skydio](https://github.com/eric-skydio)!
- 🦂 Bug fix: Added https fallback when obtaining the host machine's address ([#7712](https://github.com/streamlit/streamlit/pull/7712), [#7703](https://github.com/streamlit/streamlit/issues/7703)). Thanks, [LarsHill](https://github.com/LarsHill)!
- 🛡️ Bug fix: Added security patch for `pyarrow` vulnerability. Custom components using `pyarrow` table deserialization should require `pyarrow>=14.0.1` ([#7695](https://github.com/streamlit/streamlit/pull/7695), [#7700](https://github.com/streamlit/streamlit/issues/7700)).
- 🦟 Bug fix: Improved typing for `st.connection` ([#7671](https://github.com/streamlit/streamlit/pull/7671)). Thanks, [thezanke](https://github.com/thezanke)!
- 🪰 Bug fix: Retries of `SnowflakeConnection` methods are narrowed to only occur with transient errors to avoid unnecessary repeated errors ([#7645](https://github.com/streamlit/streamlit/pull/7645), [#7637](https://github.com/streamlit/streamlit/issues/7637)).
- 🏗️ Removed the v0 testing framework which was undocumented ([#7657](https://github.com/streamlit/streamlit/pull/7657)).
- 🪳 Bug fix: The navigation expander arrow no longer disappears ([#7634](https://github.com/streamlit/streamlit/pull/7634), [#7547](https://github.com/streamlit/streamlit/issues/7547)).
- ❄️ Improved the error message for `SnowflakeConnection` when a configuration is not found ([#7652](https://github.com/streamlit/streamlit/pull/7652)).
- 🕷️ Bug fix: `st.rerun` no longer causes a `RecursionError` when used with `st.chat_input` ([#7643](https://github.com/streamlit/streamlit/pull/7643), [#7629](https://github.com/streamlit/streamlit/issues/7629)).
- 🐞 Bug fix: `st.file_uploader` no longer causes an extra rerun and therefore doesn't conflict with `st.chat_input` ([#7641](https://github.com/streamlit/streamlit/pull/7641), [#7556](https://github.com/streamlit/streamlit/issues/7556)).
- 🐝 Bug fix: `AppTest` no longer raises an error when encountering `st.container` ([#7644](https://github.com/streamlit/streamlit/pull/7644), [#7636](https://github.com/streamlit/streamlit/issues/7636)).
- 🪲 Bug fix: Graphviz charts scale correctly when exiting fullscreen view ([#7398](https://github.com/streamlit/streamlit/pull/7398), [#7527](https://github.com/streamlit/streamlit/issues/6527)).
- 🎥 Bug fix: "Record a screencast" is hidden when known to be unsupported in a browser ([#7604](https://github.com/streamlit/streamlit/pull/7604)).
- 🐛 Bug fix: Increased the top padding of embedded apps to better display the dataframe toolbar ([#7681](https://github.com/streamlit/streamlit/pull/7681), [#7609](https://github.com/streamlit/streamlit/pull/7609), [#7607](https://github.com/streamlit/streamlit/issues/7607)).
- 🐜 Bug fix: `st.rerun` uses `NoReturn` for improved type checking ([#7422](https://github.com/streamlit/streamlit/pull/7422)) Thanks, [kongzii](https://github.com/kongzii).

## **Version 1.28.0**

_Release date: October 26, 2023_

**Release videos**

- [Introducing `AppTest`](https://www.youtube.com/watch?v=99OEoP5sy0U)

**Highlights**

- 🧪 Introducing a new testing framework for Streamlit apps! Check out our [documentation](/develop/api-reference/app-testing) to learn how to build automated tests for your apps.
- 💻 Announcing the general availability of `st.connection`, a command to conveniently manage connections in Streamlit apps. Check out the [docs](/develop/api-reference/connections/st.connection) to learn more.
- ❄️ `SnowparkConnection` has been upgraded to the new and improved `SnowflakeConnection` — the same, great functionality _plus more_! Check out our [built-in connections](/develop/api-reference/connections#built-in-connections).
- 🛠️ `st.dataframe` and `st.data_editor` have a new toolbar! Users can search and download data in addition to enjoying improved UI for row additions and deletions. See our updated guide on [Dataframes](/develop/concepts/design/dataframes).

**Notable Changes**

- 🌀 When using a spinner with cached functions, the spinner will be overlaid instead of pushing content down ([#7488](https://github.com/streamlit/streamlit/pull/7488)).
- 📅 `st.data_editor` now supports datetime index editing ([#7483](https://github.com/streamlit/streamlit/pull/7483)).
- 🔢 Improved support for `decimal.Decimal` in `st.dataframe` and `st.data_editor` ([#7475](https://github.com/streamlit/streamlit/pull/7475)).
- 🥸 Global kwargs were added for `hashlib` ([#7527](https://github.com/streamlit/streamlit/pull/7527), [#7526](https://github.com/streamlit/streamlit/issues/7526)). Thanks, [DueViktor](https://github.com/DueViktor)!
- 📋 `st.components.v1.iframe` now permits writing to clipboard ([#7487](https://github.com/streamlit/streamlit/pull/7487)). Thanks, [dilipthakkar](https://github.com/dilipthakkar)!
- 📝 `SafeSessionState` disconnect was replaced with script runner yield points for improved efficiency and clarity ([#7373](https://github.com/streamlit/streamlit/pull/7373)).
- 🤖 The Langchain callback handler will show the full input string inside the body of a `st.status` when the input string is too long to show as a label ([#7478](https://github.com/streamlit/streamlit/pull/7478)). Thanks, [pokidyshev](https://github.com/pokidyshev)!
- 📈 `st.graphviz_chart` now supports using different Graphviz layout engines ([#7505](https://github.com/streamlit/streamlit/pull/7505), [#4089](https://github.com/streamlit/streamlit/issues/4089)).
- 🦋 Assorted visual tweaks ([#7486](https://github.com/streamlit/streamlit/pull/7486), [#7592](https://github.com/streamlit/streamlit/pull/7592)).
- 📊 `plotly.js` was upgraded to version 2.26.1 ([#7449](https://github.com/streamlit/streamlit/pull/7449), [#7476](https://github.com/streamlit/streamlit/issues/7476), [#7045](https://github.com/streamlit/streamlit/issues/7045)).
- 💽 Legacy serialization for DataFrames was removed. All DataFrames will be serialized by Apache Arrow ([#7429](https://github.com/streamlit/streamlit/pull/7429)).
- 🖼️ Compatibility for Pillow 10.x was added ([#7442](https://github.com/streamlit/streamlit/pull/7442)).
- 📬 Migrated `_stcore/allowed-message-origins` endpoint to `_stcore/host-config` ([#7342](https://github.com/streamlit/streamlit/pull/7342)).
- 💬 Added `post_parent_message` platform command to send custom messages from a Streamlit app to its parent window ([#7522](https://github.com/streamlit/streamlit/pull/7522)).

**Other Changes**

- ⌨️ Improved string dtype handling for DataFrames ([#7479](https://github.com/streamlit/streamlit/pull/7479)).
- ✒️ `st.write` will avoid using `unsafe_allow_html=True` if possible ([#7432](https://github.com/streamlit/streamlit/pull/7432)).
- 🐛 Bug fix: Implementation of `st.expander` was simplified for improved behavior and consistency ([#7247](https://github.com/streamlit/streamlit/pull/7247), [#2839](https://github.com/streamlit/streamlit/issues/2839), [#4111](https://github.com/streamlit/streamlit/issues/4111), [#4651](https://github.com/streamlit/streamlit/issues/4651), [#5604](https://github.com/streamlit/streamlit/issues/5604)).
- 🪲 Bug fix: Multipage links in the sidebar are now aligned with other sidebar elements ([#7531](https://github.com/streamlit/streamlit/pull/7531)).
- 🐜 Bug fix: `st.chat_input` won't incorrectly prompt for `label` parameter in IDEs ([#7560](https://github.com/streamlit/streamlit/pull/7560)).
- 🐝 Bug fix: Scroll bars correctly overlay `st.dataframe` and `st.data_editor` without adding empty space ([#7090](https://github.com/streamlit/streamlit/pull/7090), [#6888](https://github.com/streamlit/streamlit/issues/6888)).
- 🐞 Bug fix: `st.chat_message` behaves correctly with the removal of AutoSizer ([#7504](https://github.com/streamlit/streamlit/pull/7504), [#7473](https://github.com/streamlit/streamlit/issues/7473)).
- 🕷️ Bug fix: Anchor links are reliably produced for non-English headers ([#7454](https://github.com/streamlit/streamlit/pull/7454), [#5291](https://github.com/streamlit/streamlit/issues/5291)).
- ☃️ Bug fix: `st.connections.SnowparkConnection` more accurately detects when it's running within Streamlit in Snowflake ([#7502](https://github.com/streamlit/streamlit/pull/7502)).
- 🪳 Bug fix: A user-friendly warning is shown when exceeding the size limitations of a pandas `Styler` object ([#7497](https://github.com/streamlit/streamlit/pull/7497), [#5953](https://github.com/streamlit/streamlit/issues/5953)).
- 🪰 Bug fix: `st.data_editor` automatically converts non-string column names to strings ([#7485](https://github.com/streamlit/streamlit/pull/7485), [#6950](https://github.com/streamlit/streamlit/issues/6950)).
- 🦠 Bug fix: `st.data_editor` correctly identifies non-range indices as a required column ([#7481](https://github.com/streamlit/streamlit/pull/7481), [#6995](https://github.com/streamlit/streamlit/issues/6995)).
- 🦟 Bug fix: `st.file_uploader` displays compound file extensions like `csv.gz` correctly ([#7362](https://github.com/streamlit/streamlit/pull/7362)). Thanks, [mo42](https://github.com/mo42)!
- 🦂 Bug fix: Column Configuration no longer uses deprecated type checks ([#7496](https://github.com/streamlit/streamlit/pull/7496), [#7477](https://github.com/streamlit/streamlit/pull/7477), [#7550](https://github.com/streamlit/streamlit/issues/7550)). Thanks, [c-bik](https://github.com/c-bik)!
- 🦗 Bug fix: Additional toolbar items no longer stack vertically ([#7470](https://github.com/streamlit/streamlit/pull/7470), [#7471](https://github.com/streamlit/streamlit/issues/7471)).
- 🕸️ Bug fix: Column Configuration no longer causes a type warning in Mypy ([#7457](https://github.com/streamlit/streamlit/pull/7457)). Thanks, [kopp](https://github.com/kopp)!
- 🐌 Bug fix: Bokeh Sliders no longer cause JavaScript errors ([#7441](https://github.com/streamlit/streamlit/pull/7441), [#7171](https://github.com/streamlit/streamlit/issues/7171)).
- 🦎 Bug fix: Caching now recognizes DataFrames with the same values but different column names as different ([#7331](https://github.com/streamlit/streamlit/pull/7331), [#7086](https://github.com/streamlit/streamlit/issues/7086)).

## **Version 1.27.0**

_Release date: September 21, 2023_

**Highlights**

- ✨ Introducing `st.scatter_chart` — a new, simple chart element to build scatter charts Streamlit-y fast and easy! See our [documentation](/develop/api-reference/charts/st.scatter_chart).
- 🔗 Introducing `st.link_button`! Want to open an external link in a new tab with a bit more pizazz than a plain-text link? Check out our [documentation](/develop/api-reference/widgets/st.link_button) to see how.
- 🏃 Announcing the general availability of [`st.rerun`](/develop/api-reference/execution-flow/st.rerun), a command to interrupt your script and trigger an immediate rerun.

**Notable Changes**

- 👻 You can initialize widgets with an empty state by setting `None` as an initial value for [`st.number_input`](/develop/api-reference/widgets/st.number_input), [`st.selectbox`](/develop/api-reference/widgets/st.selectbox), [`st.date_input`](/develop/api-reference/widgets/st.date_input), [`st.time_input`](/develop/api-reference/widgets/st.time_input), [`st.radio`](/develop/api-reference/widgets/st.radio), [`st.text_input`](/develop/api-reference/widgets/st.text_input), and [`st.text_area`](/develop/api-reference/widgets/st.text_area)!
- 📤 [`st.download_button`](/develop/api-reference/widgets/st.download_button) now uses `target="_self"` instead of opening a new tab ([#7151](https://github.com/streamlit/streamlit/pull/7151), [#7132](https://github.com/streamlit/streamlit/issues/7132)).
- 🧟 Removed unmaintained `pympler` dependency ([#7193](https://github.com/streamlit/streamlit/pull/7193), [#7131](https://github.com/streamlit/streamlit/issues/7131)). Thanks, [rudyardrichter](https://github.com/rudyardrichter)!

**Other Changes**

- 🐛 Bug fix: `st.multiselect` now shows a correct message when no result matches a user's search ([#7205](https://github.com/streamlit/streamlit/pull/7205), [#7116](https://github.com/streamlit/streamlit/issues/7116)).
- 🪲 Bug fix: `st.experimental_user` now defaults to `test@example.com` ([#7219](https://github.com/streamlit/streamlit/pull/7219), [#7215](https://github.com/streamlit/streamlit/issues/7215)).
- 🐜 Bug fix: `st.slider` labels don't overlap when small ranges are selected ([#7221](https://github.com/streamlit/streamlit/pull/7221), [#3385](https://github.com/streamlit/streamlit/issues/3385)).
- 🐝 Bug fix: Type-checking correctly identifies all string types to avoid hashing errors ([#7255](https://github.com/streamlit/streamlit/pull/7255), [#6455](https://github.com/streamlit/streamlit/issues/6455)).
- 🐞 Bug fix: JSON is parsed with JSON5 to avoid errors from null values when using `st.pydeck_chart` ([#7256](https://github.com/streamlit/streamlit/pull/7256), [#5799](https://github.com/streamlit/streamlit/issues/5799)).
- 🕷️ Bug fix: Identical widgets on different pages are correctly interpreted by Streamlit as distinct ([#7264](https://github.com/streamlit/streamlit/pull/7264), [#6146](https://github.com/streamlit/streamlit/issues/6146)).
- 🦋 Bug fix: Visual tweaks to widgets for responsive behavior ([#7145](https://github.com/streamlit/streamlit/pull/7145)).
- 🪳 Bug fix: SVGs are accurately displayed ([#7183](https://github.com/streamlit/streamlit/pull/7183), [#3882](https://github.com/streamlit/streamlit/issues/3882)).
- 🪰 Bug fix: `st.video` correctly updates with changes to `start_time` ([#7257](https://github.com/streamlit/streamlit/pull/7257), [#7126](https://github.com/streamlit/streamlit/issues/7126)).
- 🦠 Bug fix: Additional error handling was added to `st.session_state` ([#7280](https://github.com/streamlit/streamlit/pull/7280), [#7206](https://github.com/streamlit/streamlit/issues/7206)).
- 🦟 Bug fix: `st.map` correctly refreshes with new data ([#7307](https://github.com/streamlit/streamlit/pull/7307), [#7294](https://github.com/streamlit/streamlit/issues/7294)).
- 🦂 Bug fix: The decorative app header line is no longer covered by the sidebar ([#7297](https://github.com/streamlit/streamlit/pull/7297), [#6264](https://github.com/streamlit/streamlit/issues/6264)).
- 🦗 Bug fix: `st.code` no longer triggers a `CachedStFunctionWarning` ([#7306](https://github.com/streamlit/streamlit/pull/7306), [#7055](https://github.com/streamlit/streamlit/issues/7055)).
- 🕸️ Bug fix: `st.download_button` no longer resets with different `data` ([#7316](https://github.com/streamlit/streamlit/pull/7316), [#7308](https://github.com/streamlit/streamlit/issues/7308)).
- 🐌 Bug fix: Widgets consistently recognize user interaction while a page is still running, with or without `fastRerun` enabled ([#7283](https://github.com/streamlit/streamlit/pull/7283), [#6643](https://github.com/streamlit/streamlit/issues/6643)).
- 🦎 Bug fix: `st.tabs` was improved to better handle and render conditionally appearing tabs ([#7287](https://github.com/streamlit/streamlit/pull/7287), [#7310](https://github.com/streamlit/streamlit/pull/7310), [#5454](https://github.com/streamlit/streamlit/issues/5454), [#7040](https://github.com/streamlit/streamlit/issues/7040)).

## **Version 1.26.0**

_Release date: August 24, 2023_

**Highlights**

- 🤖 Introducing `st.status` to display output from long-running processes and external API calls ([#7140](https://github.com/streamlit/streamlit/pull/7140)). Works great with `st.chat_message`! See our [documentation](/develop/api-reference/status/st.status) for how to use this feature.
- 🚥 Introducing [`st.toggle`](/develop/api-reference/widgets/st.toggle) — an alternative to `st.checkbox` when you need an on/off switch.

**Notable Changes**

- 🎨 Simple [chart elements](/develop/api-reference/charts) have a `color` parameter to set the color of your data points or series ([#7022](https://github.com/streamlit/streamlit/pull/7022)).
- 🌈 [Markdown](/develop/api-reference/text/st.markdown) supports rainbow and gray colors ([#7106](https://github.com/streamlit/streamlit/pull/7106), [#7179](https://github.com/streamlit/streamlit/pull/7179)).
- 📏 [`st.header`](/develop/api-reference/text/st.header) and [`st.subheader`](/develop/api-reference/text/st.subheader) have optional, colored dividers ([#7133](https://github.com/streamlit/streamlit/pull/7133)).
- 🚀 Deploying to Community Cloud is even easier—locally running apps have a [deploy button](/develop/concepts/architecture/app-chrome#deploy-this-app) in their toolbars ([#7085](https://github.com/streamlit/streamlit/pull/7085), [#6935](https://github.com/streamlit/streamlit/issues/6935)).
- 🖌️ [`st.download_button`](/develop/api-reference/widgets/st.download_button) has a new parameter `type` for theming ([#7056](https://github.com/streamlit/streamlit/pull/7056), [#7038](https://github.com/streamlit/streamlit/issues/7038)).
- 🤖 [`st.chat_message`](/develop/api-reference/chat/st.chat_message) has ai and human presets for messages ([#7094](https://github.com/streamlit/streamlit/pull/7094)).
- 💅 [`st.radio`](/develop/api-reference/widgets/st.radio) options support markdown and have captions ([#7018](https://github.com/streamlit/streamlit/pull/7018), [#7105](https://github.com/streamlit/streamlit/pull/7105), [#6085](https://github.com/streamlit/streamlit/issues/6085)).
- 🧼 Assorted visual tweaks ([#7050](https://github.com/streamlit/streamlit/pull/7050), [#894](https://github.com/streamlit/streamlit/issues/894)).
- 🛏️ Replaced deprecated `imghdr` dependency with `pillow` ([#7081](https://github.com/streamlit/streamlit/pull/7081), [#7027](https://github.com/streamlit/streamlit/issues/7027)).
- 🔢 [`st.number_input`](/develop/api-reference/widgets/st.number_input)'s step buttons (+/-) are ignored during tabbing navigation ([#7154](https://github.com/streamlit/streamlit/pull/7154)). Thanks [@denck007](https://github.com/denck007)!

**Other Changes**

- 🍞 Bug fix: Toast messages are no longer blocked by `st.chat_input` ([#7204](https://github.com/streamlit/streamlit/pull/7204), [#7115](https://github.com/streamlit/streamlit/issues/7115)).
- 🕸️ Bug fix: Widget IDs are now stable to prevent inconsistent statefulness ([#7003](https://github.com/streamlit/streamlit/pull/7003)).
- 🦟 Bug fix: Browser autofill is correctly recognized within forms now ([#7150](https://github.com/streamlit/streamlit/pull/7150), [#7101](https://github.com/streamlit/streamlit/issues/7101), [#7084](https://github.com/streamlit/streamlit/issues/7084)).
- 🪱 Bug fix: `st.file_uploader` no longer causes session state to reset when a websocket connection is dropped and reconnected ([#7149](https://github.com/streamlit/streamlit/pull/7149), [#7025](https://github.com/streamlit/streamlit/pull/7025)).
- 🏎️ Bug fix: Pydeck JSON data is cached for improved performance ([#7113](https://github.com/streamlit/streamlit/pull/7113), [#5532](https://github.com/streamlit/streamlit/issues/5532)).
- 🦋 Bug fix: `st.chat_input` no longer submits prematurely while typing with an input method editor ([#6993](https://github.com/streamlit/streamlit/pull/6993)).
- 🐞 Bug fix: Label backgrounds for `st.tabs` are now transparent ([#7070](https://github.com/streamlit/streamlit/pull/7070), [#5707](https://github.com/streamlit/streamlit/issues/5707)).
- 🐝 Bug fix: Page width is no longer ignored when using the `help` parameter in `st.button` ([#7033](https://github.com/streamlit/streamlit/pull/7033), [#6161](https://github.com/streamlit/streamlit/issues/6161)).
- 🐜 Bug fix: Tweaked Altair color specification for improved visibility in dark mode ([#7061](https://github.com/streamlit/streamlit/pull/7061), [#3343](https://github.com/streamlit/streamlit/issues/3343)).
- 🪲 Bug fix: `st.chat_message` can correctly use local images as avatars ([#7130](https://github.com/streamlit/streamlit/pull/7130)).
- 🐛 Bug fix: Specified that MD5 is not used for security ([#7122](https://github.com/streamlit/streamlit/pull/7122), [#7120](https://github.com/streamlit/streamlit/issues/7120)).
- 🪄 Bug fix: Async function docstrings are ignored by [Streamlit magic](/develop/api-reference/write-magic/magic) ([#7143](https://github.com/streamlit/streamlit/pull/7143), [#7137](https://github.com/streamlit/streamlit/issues/7137)).

## **Version 1.25.0**

_Release date: July 20, 2023_

**Highlights**

- 🍞 Introducing `st.toast` — a command to briefly show toast messages to users in the bottom-right corner of apps. See [our documentation](/develop/api-reference/status/st.toast) on how to use this feature.

**Notable Changes**

- 🗺️ [`st.map`](/develop/api-reference/charts/st.map) now has parameters for `latitude`, `longitude`, `color`, and `size` to customize data points ([#6896](https://github.com/streamlit/streamlit/pull/6896)).
- 🚩 [`st.multiselect`](/develop/api-reference/widgets/st.multiselect) supports setting placeholders and specifying the maximum number of selections via the `placeholder` and `max_selections` keyword-only arguments, respectively ([#6901](https://github.com/streamlit/streamlit/pull/6901), [#4750](https://github.com/streamlit/streamlit/issues/4750)). Thanks, [@fhiroki](https://github.com/fhiroki)!
- 📅 Customize the date format for `st.date_input` with the `format` parameter ([#6974](https://github.com/streamlit/streamlit/pull/6974), [#5234](https://github.com/streamlit/streamlit/issues/5234)).
- ↩️ [Forms](/develop/api-reference/execution-flow/st.form) can now be submitted with Enter/Return while inside [`st.text_input`](/develop/api-reference/widgets/st.text_input), [`st.number_input`](/develop/api-reference/widgets/st.number_input), or [`st.text_area`](/develop/api-reference/widgets/st.text_area) ([#6911](https://github.com/streamlit/streamlit/pull/6911), [#3790](https://github.com/streamlit/streamlit/issues/3790)).
- 🍢 The app menu icon in the upper-right corner of apps has been changed from "**☰**" to "**⋮**" ([#6947](https://github.com/streamlit/streamlit/pull/6947)).

**Other Changes**

- ⛓️ Minimum required versions increased for multiple Python dependencies, including `numpy>=1.19.3` and `pandas>=1.3.0` ([#6802](https://github.com/streamlit/streamlit/pull/6802)).
- 🛡️ `protobufjs` was bumped from 7.2.1 to 7.2.4 ([#6959](https://github.com/streamlit/streamlit/pull/6959)).
- ✨ Visual design tweaks to Streamlit's input widgets ([#6944](https://github.com/streamlit/streamlit/pull/6944)).
- 🦋 Bug Fix: `st.slider` now accepts general number types like `numpy.int64` instead of just `int` and `float` ([#6816](https://github.com/streamlit/streamlit/pull/6816), [#6815](https://github.com/streamlit/streamlit/issues/6815)). Thanks, [@milliams](https://github.com/milliams)!
- 🐜 Bug Fix: Data labels for `st.slider` and `st.select_slider` no longer overflow when inside `st.expander` ([#6828](https://github.com/streamlit/streamlit/pull/6828), [#6297](https://github.com/streamlit/streamlit/issues/6297)).
- 🐛 Bug Fix: Elements no longer re-render from scratch with each rerun ([#6923](https://github.com/streamlit/streamlit/pull/6923), [#6920](https://github.com/streamlit/streamlit/issues/6920)).
- 🐞 Bug Fix: `st.data_editor` hashes styler objects correctly for stability across reruns ([#6815](https://github.com/streamlit/streamlit/pull/6915), [#6898](https://github.com/streamlit/streamlit/issues/6898)).
- 🐝 Bug Fix: Fixed the padding for embedded apps using `st.chat_input` to prevent messages being cutoff ([#6979](https://github.com/streamlit/streamlit/pull/6979)).

## **Version 1.24.0**

_Release date: June 27, 2023_

**Highlights**

- 💬 Introducing `st.chat_message` and `st.chat_input` — two new [chat elements](/develop/api-reference/chat) that let you build conversational apps. Learn how to use these features in your LLM-powered chat apps in our [tutorial](/develop/tutorials/llms/build-conversational-apps).
- 💾 Streamlit's caching decorators now allow you to customize Streamlit's hashing of input parameters with the keyword-only argument [`hash_funcs`](/develop/concepts/architecture/caching#the-hash_funcs-parameter).

**Notable Changes**

- 🐍 We've deprecated support for Python 3.7 in the core library and Streamlit Community Cloud ([#6868](https://github.com/streamlit/streamlit/pull/6868)).
- 📅 `st.cache_data` and `st.cache_resource` can hash timezone-aware `datetime` objects ([#6812](https://github.com/streamlit/streamlit/pull/6812), [#6690](https://github.com/streamlit/streamlit/issues/6690), [#5110](https://github.com/streamlit/streamlit/issues/5110)).

**Other Changes**

- ✨ Visual design tweaks to Streamlit's input widgets ([#6817](https://github.com/streamlit/streamlit/pull/6817)).
- 🐛 Bug fix: `st.write` pretty-prints dataclasses using `st.help` ([#6750](https://github.com/streamlit/streamlit/pull/6750)).
- 🪲 Bug fix: `st.button`'s height is consistent with that of other widgets ([#6738](https://github.com/streamlit/streamlit/pull/6738)).
- 🐜 Bug fix: Upgraded the `react-range` frontend dependency to fix the memory usage of sliders ([#6764](https://github.com/streamlit/streamlit/pull/6764), [#5436](https://github.com/streamlit/streamlit/issues/5436)). Thanks [@wolfd](https://github.com/wolfd)!
- 🐝 Bug fix: Pydantic validators no longer result in exceptions on app reruns ([#6664](https://github.com/streamlit/streamlit/pull/6664), [#3218](https://github.com/streamlit/streamlit/issues/3218)).
- 🐞 Bug fix: `streamlit config show` honors newlines ([#6758](https://github.com/streamlit/streamlit/pull/6758), [#2868](https://github.com/streamlit/streamlit/issues/2868)).
- 🪰 Bug fix: Fixed a race condition to ensure Streamlit reruns the latest code when the file changes ([#6884](https://github.com/streamlit/streamlit/pull/6884)).
- 🦋 Bug fix: Apps no longer rerun when users click anchor links ([#6834](https://github.com/streamlit/streamlit/pull/6834), [#6500](https://github.com/streamlit/streamlit/issues/6500)).
- 🕸️ Bug fix: Added robust out-of-bounds checks for `min_value` and `max_value` in `st.number_input` ([#6847](https://github.com/streamlit/streamlit/pull/6847), [#6797](https://github.com/streamlit/streamlit/issues/6797)).

## **Version 1.23.0**

_Release date: June 1, 2023_

**Highlights**

- ✂️ Announcing the general availability of [st.data_editor](/develop/api-reference/data/st.data_editor), a widget that allows you to edit DataFrames and many other data structures in a table-like UI. **Breaking change:** the data editor's representation used in `st.session_state` was altered. Find out more about the new format in [Access edited data](/develop/concepts/design/dataframes#access-edited-data).
- ⚙️ Introducing the [Column configuration API](/develop/api-reference/data/st.column_config) with a suite of methods to configure the display and editing behavior of `st.dataframe` and `st.data_editor` columns (e.g. their title, visibility, type, or format). Keep an eye out for a detailed [blog post](https://blog.streamlit.io/) and in-depth [documentation](/develop/concepts/design/dataframes#configuring-columns) upcoming in the next two weeks.
- 🔌 Learn to use `st.experimental_connection` to create and manage data connections in your apps with the new [Connecting to data](/develop/concepts/connections/connecting-to-data) docs and [video tutorial](https://www.youtube.com/watch?v=xQwDfW7UHMo).

**Notable Changes**

- 📊 Streamlit now supports Protobuf 4 and Altair 5 ([#6215](https://github.com/streamlit/streamlit/issues/6215), [#6618](https://github.com/streamlit/streamlit/pull/6618), [#5626](https://github.com/streamlit/streamlit/issues/5626), [#6622](https://github.com/streamlit/streamlit/pull/6622)).
- ☎️ st.dataframe and st.data_editor can hide index columns with `hide_index`, specify the display order of columns with `column_order`, and disable editing for individual columns with the `disabled` parameter.
- ⏱️ The `ttl` parameter in [st.cache_data](/develop/api-reference/caching-and-state/st.cache_data) and [st.cache_resource](/develop/api-reference/caching-and-state/st.cache_resource) accepts formatted strings, so you can simply say `ttl="30d"`, `ttl="1h30m"` and any other combination of `w`, `d`, `h`, `m`, `s` supported by [Pandas's Timedelta constructor](https://pandas.pydata.org/docs/reference/api/pandas.Timedelta.html) ([#6560](https://github.com/streamlit/streamlit/pull/6560)).
- 📂 `st.file_uploader` now interprets the `type` parameter more accurately. For example, "jpg" or ".jpg" now accept both "jpg" and "jpeg" extensions. This functionality has also been extended to "mpeg/mpg", "tiff/tif", "html/htm", and "mpeg4/mp4".
- 🤫 The new `global.disableWidgetStateDuplicationWarning` configuration option allows the silencing of warnings triggered by setting widget default values and keyed session state values concurrently ([#3605](https://github.com/streamlit/streamlit/issues/3605), [#6640](https://github.com/streamlit/streamlit/pull/6640)). Thanks, [@antonAce](https://github.com/antonAce)!

**Other Changes**

- 🏃‍♀️Improved startup time by lazy loading some dependencies ([#6531](https://github.com/streamlit/streamlit/pull/6531)).
- 👋 Removed `st.beta_*` and `st.experimental_show` due to deprecation and low-use ([#6558](https://github.com/streamlit/streamlit/pull/6558))
- 🚀 Further improvements to st.dataframe and st.data_editor:
  - Improved editing on mobile devices for the data editor ([#6548](https://github.com/streamlit/streamlit/pull/6548)).
  - All editable columns have an icon in their column header and support tooltips ([#6550](https://github.com/streamlit/streamlit/pull/6550), [#6561](https://github.com/streamlit/streamlit/pull/6561)).
  - Enable editing for columns containing datetime, date, or time values ([#6025](https://github.com/streamlit/streamlit/pull/6025)).
  - New input validation options for columns in the data editor, such as `max_chars` and `validate` for text columns, and `min_value`, `max_value` and `step` for number columns ([#6563](https://github.com/streamlit/streamlit/pull/6563)).
  - Improved type parsing capabilities in the data editor ([#6551](https://github.com/streamlit/streamlit/pull/6551)).
  - Unified missing values to `None` in returned data structures ([#6544](https://github.com/streamlit/streamlit/pull/6544)).
  - A warning is shown in cells when integers exceed the maximum safe value of `(2^53) -1` ([#6311](https://github.com/streamlit/streamlit/issues/6311), [#6549](https://github.com/streamlit/streamlit/pull/6549)).
  - Prevented editing the sessions state by showing a warning ([#6634](https://github.com/streamlit/streamlit/pull/6634)).
  - Fixed issues with list columns sometimes breaking the frontend ([#6644](https://github.com/streamlit/streamlit/pull/6644)).
  - Fixed a display issue with index columns using category dtype ([#6680](https://github.com/streamlit/streamlit/issues/6680), [#6598](https://github.com/streamlit/streamlit/pull/6598)).
  - Fixed an issue that prevented a rerun when adding empty rows ([#6598](https://github.com/streamlit/streamlit/pull/6598)).
  - Unified the behavior between `st.data_editor` and `st.dataframe` related to auto-hiding the index column(s) based on the input data ([#6659](https://github.com/streamlit/streamlit/issues/6659), [#6598](https://github.com/streamlit/streamlit/pull/6598))
- 🛡️ Streamlit's [Security Policy](https://github.com/streamlit/streamlit/blob/develop/SECURITY.md) can be found in its GitHub repository ([#6666](https://github.com/streamlit/streamlit/pull/6666)).
- 🤏 Documented the integer size limit for `st.number_input` and `st.slider` ([#6724](https://github.com/streamlit/streamlit/pull/6724)).
- 🐍 The majority of Streamlit's Python dependencies have set a maximum allowable version, with the standard upper limit set to the next major version, but not inclusive of it ([#6691](https://github.com/streamlit/streamlit/pull/6691)).
- 💅 UI design improvements to in-app modals ([#6688](https://github.com/streamlit/streamlit/pull/6688)).
- 🐞 Bug fix: `st.date_input`'s date selector is equally visible in dark mode ([#6072](https://github.com/streamlit/streamlit/issues/6072), [#6630](https://github.com/streamlit/streamlit/pull/6630)).
- 🐜 Bug fix: the sidebar navigation expansion indicator in multipage apps is restored ([#6731](https://github.com/streamlit/streamlit/pull/6731)).
- 🐛 Bug fix: The docstring and exception message for `st.set_page_config` have been updated to clarify that this command can be invoked once for each page within a multipage app, rather than once per entire app ([#6594](https://github.com/streamlit/streamlit/pull/6594)).
- 🐝 Bug fix: `st.json` no longer collapses multiple spaces in both keys and values with single space when rendered ([#6657](https://github.com/streamlit/streamlit/issues/6657), [#6663](https://github.com/streamlit/streamlit/pull/6663)).

## **Version 1.22.0**

_Release date: April 27, 2023_

**Highlights**

- 🔌 Introducing `st.experimental_connection`: Easily connect your app to data sources and APIs using our new connection feature. Find more details in the [API reference](/develop/api-reference/connections), and stay tuned for an upcoming blog post and in-depth documentation! In the meantime, explore our updated [MySQL](/develop/tutorials/databases/mysql) and [Snowflake](/develop/tutorials/databases/snowflake) connection tutorials for examples of this feature.

**Notable Changes**

- 🐼 Streamlit now supports Pandas 2.0 ([#6413](https://github.com/streamlit/streamlit/issues/6413), [#6378](https://github.com/streamlit/streamlit/pull/6378), [#6507](https://github.com/streamlit/streamlit/pull/6507)). Thanks, [connortann](https://github.com/connortann)!
- 🍔 Customize the visibility of items in the toolbar, options menu, and the settings dialog using the `client.toolbarMode` [config option](https://docs.streamlit.io/develop/concepts/configuration#view-all-configuration-options) ([#6174](https://github.com/streamlit/streamlit/pull/6174)).
- 🪵 Streamlit logs now reside in the "streamlit" namespace instead of the root logger, enabling app developers to better manage log handling ([#3978](https://github.com/streamlit/streamlit/issues/3978), [#6377](https://github.com/streamlit/streamlit/pull/6377)).

**Other Changes**

- 🔏 CLI parameters can no longer be used to set sensitive configuration values ([#6376](https://github.com/streamlit/streamlit/pull/6376)).
- 🤖 Improved the debugging experience by reducing log noise ([#6391](https://github.com/streamlit/streamlit/pull/6391)).
- 🐞 Bug fix: `@st.cache_data` decorated functions support UUID objects as parameters ([#6440](https://github.com/streamlit/streamlit/issues/6440), [#6459](https://github.com/streamlit/streamlit/pull/6459)).
- 🐛 Bug fix: Tabbing through buttons and other elements now displays a red border only when focused, not when clicked ([#6373](https://github.com/streamlit/streamlit/pull/6373)).
- 🪲 Bug fix: `st.multiselect`'s clear icon is larger and includes a hover effect ([#6471](https://github.com/streamlit/streamlit/pull/6471)).
- 🐜 Bug fix: Custom theme font settings no longer apply to code blocks ([#6484](https://github.com/streamlit/streamlit/issues/6484), [#6535](https://github.com/streamlit/streamlit/pull/6535)).
- ©️ Bug fix: `st.code`'s copy-to-clipboard button appears when you hover on code blocks ([#6490](https://github.com/streamlit/streamlit/issues/6490), [#6498](https://github.com/streamlit/streamlit/pull/6498)).

## Older versions

Are you curious about older versions? To see older release notes, see [Release notes (historical)](/develop/quick-reference/older-versions).
