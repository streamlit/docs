---
title: Release notes (historical)
slug: /develop/quick-reference/older-versions
description: A changelog of highlights and fixes for older versions of Streamlit.
---

# Release notes (historical)

This page contains release notes for Streamlit versions less than 1.22.0. For more recent versions of Streamlit, see [Release notes](/develop/quick-reference/changelog).

## **Version 1.21.0**

_Release date: April 6, 2023_

**Highlights**

- 📏 Introducing `st.divider` — a command that displays a horizontal line in your app. Learn how to use this command in its [API reference](/develop/api-reference/text/st.divider).
- 🔏 Streamlit now supports the use of a global `secrets.toml` file, in addition to a project-level file, to easily store and securely access your secrets. Learn more in [Secrets management](/develop/concepts/connections/secrets-management).
- 🚀 [st.help](/develop/api-reference/utilities/st.help) has been revamped to show more information about object methods, attributes, classes, and more, which is great for debugging ([#5857](https://github.com/streamlit/streamlit/pull/5857), [#6382](https://github.com/streamlit/streamlit/pull/6382))!

**Notable Changes**

- 🪜 [st.time_input](/develop/api-reference/widgets/st.time_input) supports adding a stepping interval with the keyword-only `step` parameter ([#6071](https://github.com/streamlit/streamlit/pull/6071)).
- ❓ Most [text elements](/develop/api-reference/text) can include tooltips with the `help` parameter ([#6043](https://github.com/streamlit/streamlit/pull/6043)).
- ↔️ [st.pyplot](/develop/api-reference/charts/st.pyplot) has a `use_container_width` parameter to set the chart to the container width (now all [chart elements](/develop/api-reference/charts) support this parameter) ([#6067](https://github.com/streamlit/streamlit/pull/6067)).
- 👩‍💻 [st.code](/develop/api-reference/text/st.code) supports optionally displaying line numbers to the code block's left with the boolean `line_numbers` parameter ([#5756](https://github.com/streamlit/streamlit/issues/5756), [#6042](https://github.com/streamlit/streamlit/pull/6042)).
- ⚓ Anchors in header elements can be turned off by setting `anchor=False` ([#6158](https://github.com/streamlit/streamlit/pull/6158)).

**Other Changes**

- 🐼 [st.table](/develop/api-reference/data/st.table) and [st.dataframe](/develop/api-reference/data/st.dataframe) support `pandas.Period`, and number and boolean types in categorical columns ([#2547](https://github.com/streamlit/streamlit/issues/2547), [#5429](https://github.com/streamlit/streamlit/pull/5429), [#5329](https://github.com/streamlit/streamlit/issues/5392), [#6248](https://github.com/streamlit/streamlit/pull/6248)).
- 🕸️ Added `.webp` to the list of allowed static file extensions ([#6331](https://github.com/streamlit/streamlit/pull/6331))
- 🐞 Bug fix: stop script execution on websocket close to immediately clear session information ([#6166](https://github.com/streamlit/streamlit/issues/6166), [#6204](https://github.com/streamlit/streamlit/pull/6204)).
- 🐜 Bug fixes: updated allowed/disallowed label markdown behavior such that unsupported elements are unwrapped and only their children (text contents) render ([#5872](https://github.com/streamlit/streamlit/issues/5872), [#6036](https://github.com/streamlit/streamlit/issues/6036), [#6054](https://github.com/streamlit/streamlit/issues/6054), [#6163](https://github.com/streamlit/streamlit/pull/6163)).
- 🪲 Bug fixes: don't push browser history states on rerun, use HTTPS to load external resources in `streamlit hello`, and make the browser back button work for multipage apps ([#5292](https://github.com/streamlit/streamlit/issues/5292), [#6266](https://github.com/streamlit/streamlit/pull/6266), [#6232](https://github.com/streamlit/streamlit/pull/6232)). Thanks, [whitphx](https://github.com/whitphx)!
- 🐝 Bug fix: avoid showing emoji on non-UTF-8 terminals. ([#2284](https://github.com/streamlit/streamlit/issues/2284), [#6088](https://github.com/streamlit/streamlit/pull/6088)). Thanks, [kcarnold](https://github.com/kcarnold)!
- 📁 Bug fix: override default use of [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API) for `react-dropzone` so that `st.file_uploader`'s File Selection Dialog only shows file types corresponding to those included in the `type` parameter ([#6176](https://github.com/streamlit/streamlit/issues/6176), [#6315](https://github.com/streamlit/streamlit/pull/6315)).
- 💾 Bug fix: make the `.clear()` method on cache-decorated functions work ([#6310](https://github.com/streamlit/streamlit/issues/6310), [#6321](https://github.com/streamlit/streamlit/pull/6321)).
- 🏃 Bug fix: `st.experimental_get_query_params` doesn't need reruns to work ([#6347](https://github.com/streamlit/streamlit/issues/6347), [#6348](https://github.com/streamlit/streamlit/pull/6348)). Thanks, [PaleNeutron](https://github.com/PaleNeutron)!
- 🐛 Bug fix: `CachedStFunctionWarning` mentions `experimental_allow_widgets` instead of the deprecated `suppress_st_warning` ([#6216](https://github.com/streamlit/streamlit/issues/6216), [#6217](https://github.com/streamlit/streamlit/pull/6217)).

## **Version 1.20.0**

_Release date: March 09, 2023_

**Notable Changes**

- 🔐 Added support for configuring SSL to [serve apps directly over HTTPS](/develop/concepts/configuration/https-support) ([#5969](https://github.com/streamlit/streamlit/pull/5969)).
- 🖼️ Granular control over app embedding behavior with the `/?embed` and `/?embed_options` query parameters. Learn how to use this feature in our [docs](/deploy/streamlit-community-cloud/share-your-app/embed-your-app) ([#6011](https://github.com/streamlit/streamlit/pull/6011), [#6019](https://github.com/streamlit/streamlit/pull/6019)).
- ⚡ Enabled the `runner.fastReruns` [configuration option](/develop/concepts/configuration#view-all-configuration-options) by default to make apps much more responsive to user interaction ([#6200](https://github.com/streamlit/streamlit/pull/6200)).

**Other Changes**

- 🍔 Cleaned up the hamburger menu by removing the least used options ([#6080](https://github.com/streamlit/streamlit/pull/6080)).
- 🖨️ Design changes to ensure apps being printed or saved as a PDF look good ([#6180](https://github.com/streamlit/streamlit/pull/6180)).
- 🐞 Bug fix: improved `dtypes` checking in `st.experimental_data_editor` ([#6185](https://github.com/streamlit/streamlit/issues/6185), [#6188](https://github.com/streamlit/streamlit/pull/6188)).
- 🐛 Bug fix: properly position `st.metric`'s `help` tooltip when not inside columns ([#6168](https://github.com/streamlit/streamlit/pull/6168)).
- 🪲 Bug fix: regression in retrieving messages from the server's `ForwardMsgCache` ([#6210](https://github.com/streamlit/streamlit/pull/6210)).
- 🌀 Bug fix: `st.cache_data` docstring for the `show_spinner` param now lists `str` as a supported type ([#6207](https://github.com/streamlit/streamlit/issues/6207), [#6213](https://github.com/streamlit/streamlit/pull/6213)).
- ⏱️ Made ping and websocket timeouts far more forgiving ([#6212](https://github.com/streamlit/streamlit/pull/6212)).
- 🗺️ `st.map` and `st.pydeck_chart` docs state that Streamlit's Mapbox token will not work indefinitely ([#6143](https://github.com/streamlit/streamlit/pull/6143)).

## **Version 1.19.0**

_Release date: February 23, 2023_

**Highlights**

- ✂️ Introducing `st.experimental_data_editor`, a widget that allows you to edit DataFrames and many other data structures in a table-like UI. Read more in our [documentation](/develop/concepts/design/dataframes) and [blog post](https://blog.streamlit.io/editable-dataframes-are-here/).

**Other Changes**

- ✨ Streamlit's GitHub README got a new look ([#6016](https://github.com/streamlit/streamlit/pull/6016)).
- 🌚 Improved readability of styled dataframe cells in dark mode ([#6060](https://github.com/streamlit/streamlit/issues/6060), [#6098](https://github.com/streamlit/streamlit/pull/6098)).
- 🐛 Bug fix: make apps work again in the latest versions of Safari, and in Chrome with third-party cookies blocked ([#6092](https://github.com/streamlit/streamlit/issues/6092), [#6094](https://github.com/streamlit/streamlit/pull/6094), [#6087](https://github.com/streamlit/streamlit/issues/6087), [#6100](https://github.com/streamlit/streamlit/pull/6100)).
- 🐞 Bug fix: refer to new cache primitives in the "Clear cache" dialog and error messages ([#6082](https://github.com/streamlit/streamlit/pull/6082), [#6128](https://github.com/streamlit/streamlit/pull/6128)).
- 🐝 Bug fix: properly cache class member functions and instance methods ([#6109](https://github.com/streamlit/streamlit/issues/6109), [#6114](https://github.com/streamlit/streamlit/pull/6114)).
- 🐜 Bug fix: regression in `st.metric` tooltip position ([#6093](https://github.com/streamlit/streamlit/issues/6093), [#6129](https://github.com/streamlit/streamlit/pull/6129)).
- 🪲 Bug fix: allow fullscreen button to show for dataframes, charts, etc, in expander ([#6083](https://github.com/streamlit/streamlit/pull/6083), [#6148](https://github.com/streamlit/streamlit/pull/6148)).

## **Version 1.18.0**

_Release date: February 09, 2023_

**Highlights**

- 🎊 Introducing `@st.cache_data` and `@st.cache_resource` — two new caching commands to replace `st.cache`! Check out our [blog post](https://blog.streamlit.io/p/c0a90231-9848-47ec-a40c-ad4a344e4de1/) and [documentation](/develop/concepts/architecture/caching) for more information.

**Notable Changes**

- 🪆 `st.columns` supports up to one level of column nesting (i.e., columns inside columns) in the main area of the app.
- ⏳ `st.progress` supports adding a message to display above the progress bar with the `text` keyword parameter.
- ↔️ `st.button` has an optional `use_container_width` parameter to allow you to stretch buttons across the full container width.
- 🐍 We formally added support for Python 3.11.
- 🖨️ Save your app as a PDF via the "Print" option in your app's hamburger menu.
- 🛎️ Apps can serve small, static media files via the `enableStaticServing` config option. See our [documentation](/develop/concepts/configuration/serving-static-files) on how to use this feature and our demo [app](https://static-file-serving.streamlit.app/) for an example.

**Other Changes**

- 🏁 All Streamlit endpoints (including `/healthz`) have been renamed to have a consistent pattern and avoid any clashes with reserved endpoints of GCP (notably Cloud Run and App Engine) ([#5534](https://github.com/streamlit/streamlit/pull/5534)).
- ⚡ Improved caching performance when multiple sessions access an uncomputed cached value simultaneously ([#6017](https://github.com/streamlit/streamlit/pull/6017)).
- 🚧 Streamlit only displays deprecation warnings in the browser when the `client.showErrorDetails` config option is set to `True`. Deprecation warnings always get logged to the console, regardless of whether they're displayed in-browser ([#5945](https://github.com/streamlit/streamlit/pull/5945)).
- 🏓 Refactored the `st.dataframe` internals to improve dataframe handling and conversion, such as detecting more types, converting key-value dicts to dataframes, and more ([#6026](https://github.com/streamlit/streamlit/pull/6026), [#6023](https://github.com/streamlit/streamlit/pull/6023)).
- 💽 The behavior of widget labels when they are passed unsupported Markdown elements is documented ([#5978](https://github.com/streamlit/streamlit/pull/5978)).
- 📊 Bug fix: Plotly improvements — upgraded multiple frontend dependencies, including Plotly, to the latest version to properly redraw cached charts, make Plotly mapbox animations work, and allow users to update the figure layout when using the Streamlit theme ([#5885](https://github.com/streamlit/streamlit/pull/5885), [#5967](https://github.com/streamlit/streamlit/pull/5967), [#6055](https://github.com/streamlit/streamlit/pull/6055)).
- 📶 Bug fix: allow browser tabs that transiently disconnect (due to a network blip, load balancer timeout, etc.) to avoid losing all of their state ([#5856](https://github.com/streamlit/streamlit/pull/5856)).
- 📱 Bug fix: the keyboard is hidden on mobile when `st.selectbox` and `st.multiselect` have less than 10 options ([#5979](https://github.com/streamlit/streamlit/pull/5979)).
- 🐝 Bug fix: design tweaks to `st.metric`, `st.multiselect`, `st.tabs` , and menu items to prevent label overflow and scrolling issues, especially with small viewport sizes ([#5933](https://github.com/streamlit/streamlit/pull/5933), [#6034](https://github.com/streamlit/streamlit/pull/6034)).
- 🐞 Bug fix: switched to a functioning Twemoji URL from which page favicons are loaded in `st.set_page_config` ([#5943](https://github.com/streamlit/streamlit/pull/5943)).
- ✍️ More type hints ([#5986](https://github.com/streamlit/streamlit/pull/5986)). Thanks, [harahu](https://github.com/harahu)!

## **Version 1.17.0**

_Release date: January 12, 2023_

**Notable Changes**

- 🪄 [`@st.experimental_singleton`](/develop/api-reference/caching-and-state/st.experimental_singleton#validating-the-cache) supports an optional `validate` parameter that accepts a validation function for cached data and is called each time the cached value is accessed.
- 💾  [`@st.experimental_memo`](/develop/api-reference/caching-and-state/st.experimental_memo)'s `persist` parameter can also accept booleans.

**Other Changes**

- 📟 Multipage apps exclude `__init__.py` from the page selector ([#5890](https://github.com/streamlit/streamlit/pull/5890)).
- 📐 The iframes of embedded apps have the ability to dynamically resize their height ([#5894](https://github.com/streamlit/streamlit/pull/5894)).
- 🐞 Bug fix: thumb values of range sliders respect the container width ([#5913](https://github.com/streamlit/streamlit/pull/5913)).
- 🪲 Bug fix: all examples in docstrings of Streamlit commands contain relevant imports to make them reproducible ([#5877](https://github.com/streamlit/streamlit/pull/5877)).

## **Version 1.16.0**

_Release date: December 14, 2022_

**Highlights**

- 👩‍🎨 Introducing a new Streamlit theme for Altair, Plotly, and Vega-Lite charts! Check out our [blog post](https://blog.streamlit.io/a-new-streamlit-theme-for-altair-and-plotly/) for more information.
- 🎨 Streamlit now supports colored text in all commands that accept Markdown, including `st.markdown`, `st.header`, and more. Learn more in our [documentation](/develop/api-reference/text/st.markdown).

**Notable Changes**

- 🔁 Functions cached with `st.experimental_memo` or `st.experimental_singleton` can contain Streamlit media elements and forms.
- ⛄ All Streamlit commands that accept pandas DataFrames as input also support Snowpark and PySpark DataFrames.
- 🏷 [st.checkbox](/develop/api-reference/widgets/st.checkbox) and [st.metric](/develop/api-reference/data/st.metric) can customize how to hide their labels with the `label_visibility` parameter.

**Other Changes**

- 🗺️ `st.map` improvements: support for upper case columns and better exception messages ([#5679](https://github.com/streamlit/streamlit/pull/5679), [#5792](https://github.com/streamlit/streamlit/pull/5792)).
- 🐞 Bug fix: `st.plotly_chart` respects the figure's height attribute and the `use_container_width` parameter ([#5779](https://github.com/streamlit/streamlit/pull/5779)).
- 🪲 Bug fix: all commands with the `icon` parameter such as [st.error](/develop/api-reference/status/st.error), [st.warning](/develop/api-reference/status/st.warning), etc, can contain emojis with variant selectors ([#5583](https://github.com/streamlit/streamlit/pull/5583)).
- 🐝 Bug fix: prevent `st.camera_input` from jittering when resizing the browser window ([#5661](https://github.com/streamlit/streamlit/pull/5711)).
- 🐜 Bug fix: update exception layout to avoid overflow of stack traces ([#5700](https://github.com/streamlit/streamlit/pull/5700)).

## **Version 1.15.0**

_Release date: November 17, 2022_

**Notable Changes**

- 💅 Widget labels can contain inline Markdown. See our [docs](/develop/api-reference/widgets) and demo [app](https://markdown-labels.streamlit.app/) for more info.
- 🎵 [`st.audio`](/develop/api-reference/media/st.audio) now supports playing audio data passed in as NumPy arrays with the keyword-only `sample_rate` parameter.
- 🔁 Functions cached with `st.experimental_memo` or `st.experimental_singleton` can contain Streamlit widgets using the `experimental_allow_widgets` parameter. This allows caching checkboxes, sliders, radio buttons, and more!

**Other Changes**

- 👩‍🎨 Design tweak to prevent jittering in sliders ([#5612](https://github.com/streamlit/streamlit/pull/5612)).
- 🐛 Bug fix: links in headers are red, not blue ([#5609](https://github.com/streamlit/streamlit/pull/5609)).
- 🐞 Bug fix: properly resize Plotly charts when exiting fullscreen ([#5645](https://github.com/streamlit/streamlit/pull/5645)).
- 🐝: Bug fix: don't accidentally trigger `st.balloons` and `st.snow` ([#5401](https://github.com/streamlit/streamlit/pull/5401)).

## **Version 1.14.0**

_Release date: October 27, 2022_

**Highlights**

- 🎨 `st.button` and `st.form_submit_button` support designating buttons as "primary" (for additional emphasis) or "secondary" (for normal buttons) with the `type` keyword-only parameter.

**Notable Changes**

- 🤏 `st.multiselect` has a keyword-only `max_selections` parameter to limit the number of options that can be selected at a time.
- 📄 `st.form_submit_button` now has the `disabled` parameter that removes interactivity.

**Other Changes**

- 🏓 `st.dataframe` and `st.table` accept categorical intervals as input ([#5395](https://github.com/streamlit/streamlit/pull/5395)).
- ⚡ Performance improvements to Plotly charts ([#5542](https://github.com/streamlit/streamlit/pull/5542)).
- 🪲 Bug fix: `st.download_button` supports non-latin1 characters in filenames ([#5465](https://github.com/streamlit/streamlit/pull/5465)).
- 🐞 Bug fix: Allow `st.image` to render a local GIF as a GIF, not as a static PNG ([#5438](https://github.com/streamlit/streamlit/pull/5438)).
- 📱 Design tweaks to the sidebar in multipage apps ([#5538](https://github.com/streamlit/streamlit/pull/5538), [#5445](https://github.com/streamlit/streamlit/pull/5445), [#5559](https://github.com/streamlit/streamlit/pull/5559)).
- 📊 Improvements to the axis configuration for built-in charts ([#5412](https://github.com/streamlit/streamlit/pull/5412)).
- 🔧 Memo and singleton improvements: support text values for `show_spinner`, use `datetime.timedelta` objects as `ttl` parameter value, properly hash PIL images and `Enum` classes, show better error messages when returning unevaluated dataframes ([#5447](https://github.com/streamlit/streamlit/pull/5447), [#5413](https://github.com/streamlit/streamlit/pull/5413), [#5504](https://github.com/streamlit/streamlit/pull/5504), [#5426](https://github.com/streamlit/streamlit/pull/5426), [#5515](https://github.com/streamlit/streamlit/pull/5515)).
- 🔍 Zoom buttons in maps created with `st.map` and `st.pydeck_chart` use light or dark style based on the app's theme ([#5479](https://github.com/streamlit/streamlit/pull/5479)).
- 🗜 Websocket headers from the current session's incoming WebSocket request can be obtained from a new "internal" (i.e.: subject to change without deprecation) API ([#5457](https://github.com/streamlit/streamlit/pull/5457)).
- 📝 Improve the text that gets printed when you first install and use Streamlit ([#5473](https://github.com/streamlit/streamlit/pull/5473)).

## **Version 1.13.0**

_Release date: September 22, 2022_

**Notable Changes**

- 🏷 Widgets can customize how to hide their labels with the `label_visibility` parameter.
- 🔍 `st.map` adds zoom buttons to the map by default.
- ↔️ `st.dataframe` supports the `use_container_width` parameter to stretch across the full container width.
- 🪄 Improvements to `st.dataframe` sizing: Column width calculation respects column headers, supports double click between column headers to autosize, better fullscreen support, and fixes the issue with the `width` parameter.

**Other Changes**

- ⌨️ `st.time_input` allows for keyboard-only input ([#5194](https://github.com/streamlit/streamlit/pull/5194)).
- 💿 `st.memo` will warn the user when using `ttl` and `persist` keyword argument together ([#5032](https://github.com/streamlit/streamlit/pull/5032)).
- 🔢 `st.number_input` returns consistent type after rerun ([#5359](https://github.com/streamlit/streamlit/pull/5359)).
- 🚒 `st.sidebar` UI fixes including a fix for scrollbars in Firefox browsers ([#5157](https://github.com/streamlit/streamlit/pull/5157), [#5324](https://github.com/streamlit/streamlit/pull/5324)).
- 👩‍💻 Improvements to usage metrics to guide API development.
- ✍️ More type hints! ([#5191](https://github.com/streamlit/streamlit/pull/5191), [#5192](https://github.com/streamlit/streamlit/pull/5192), [#5242](https://github.com/streamlit/streamlit/pull/5242), [#5243](https://github.com/streamlit/streamlit/pull/5243), [#5244](https://github.com/streamlit/streamlit/pull/5244), [#5245](https://github.com/streamlit/streamlit/pull/5245), [#5246](https://github.com/streamlit/streamlit/pull/5246)) Thanks [harahu](https://github.com/harahu)!

## **Version 1.12.0**

_Release date: August 11, 2022_

**Highlights**

- 📊 Built-in charts (e.g. `st.line_chart`) get a brand-new look and parameters `x` and `y`! Check out our [blog post](https://blog.streamlit.io/built-in-charts-get-a-new-look-and-parameters/) for more information.

**Notable Changes**

- ⏯ Functions cached with `st.experimental_memo` or `st.experimental_singleton` can now contain static `st` commands. This allows caching text, charts, dataframes, and more!
- ↔️ The sidebar is now resizable via drag and drop.
- ☎️ `st.info`, `st.success`, `st.error`, and `st.warning` got a redesign and have a new keyword-only parameter: `icon`.

**Other Changes**

- 🎚️ `st.select_slider` correctly handles all floats now ([#4973](https://github.com/streamlit/streamlit/pull/4973), [#4978](https://github.com/streamlit/streamlit/pull/4978)).
- 🔢 `st.multi_select` can take values from enums ([#4987](https://github.com/streamlit/streamlit/pull/4987)).
- 🍊 `st.slider` range values can now be set through `st.session_state` ([#5007](https://github.com/streamlit/streamlit/pull/5007)).
- 🎨 `st.progress` got a redesign ([#5011](https://github.com/streamlit/streamlit/pull/5011), [#5086](https://github.com/streamlit/streamlit/pull/5086)).
- 🔘 `st.radio` better deals with list-like dataframes ([#5021](https://github.com/streamlit/streamlit/pull/5021)).
- 🧞‍♂️ `st.cache` properly handles JSON files now ([#5023](https://github.com/streamlit/streamlit/pull/5023)).
- ⚓️ Headers render markdown now when the `anchor` parameter is set ([#5038](https://github.com/streamlit/streamlit/pull/5038)).
- 🗻 `st.image` can now load SVGs from Inkscape ([#5040](https://github.com/streamlit/streamlit/pull/5040)).
- 🗺️ `st.map` and `st.pydeck_chart` use light or dark style based on the app's theme ([#5074](https://github.com/streamlit/streamlit/pull/5074), [#5108](https://github.com/streamlit/streamlit/pull/5108)).
- 🎈 Clicks on elements below `st.balloons` and `st.snow` don't get blocked anymore ([#5098](https://github.com/streamlit/streamlit/pull/5098)).
- 🔝 Embedded apps have lower top padding ([#5111](https://github.com/streamlit/streamlit/pull/5111)).
- 💅 Adjusted padding and alignment for widgets, charts, and dataframes ([#4995](https://github.com/streamlit/streamlit/pull/4995), [#5061](https://github.com/streamlit/streamlit/pull/5061), [#5081](https://github.com/streamlit/streamlit/pull/5081)).
- ✍️ More type hints! ([#4926](https://github.com/streamlit/streamlit/pull/4926), [#4932](https://github.com/streamlit/streamlit/pull/4932), [#4933](https://github.com/streamlit/streamlit/pull/4933))

## **Version 1.11.0**

_Release date: July 14, 2022_

**Highlights**

- 🗂 Introducing `st.tabs` to have tab containers in your app. See our [documentation](/develop/api-reference/layout/st.tabs) on how to use this feature.

**Notable Changes**

- ℹ️ `st.metric` supports tooltips with the `help` keyword parameter.
- 🚇 `st.columns` supports setting the gap size between columns with the `gap` keyword parameter.

**Other Changes**

- 💅 Design tweaks to `st.selectbox`, `st.expander`, `st.spinner` ([#4801](https://github.com/streamlit/streamlit/pull/4801)).
- 📱 The sidebar will close when users select a page from the navigation menu on mobile devices ([#4851](https://github.com/streamlit/streamlit/pull/4841)).
- 🧠 `st.memo` supports dataclasses! ([#4850](https://github.com/streamlit/streamlit/pull/4850))
- 🏎 Bug fix for a race condition that destroyed widget state with rapid interaction ([#4882](https://github.com/streamlit/streamlit/pull/4882)).
- 🏓 `st.table` presents overflowing content to be scrollable when placed inside columns and expanders ([#4934](https://github.com/streamlit/streamlit/pull/4934)).
- 🐍 Types: More updated type annotations across Streamlit! ([#4808](https://github.com/streamlit/streamlit/pull/4808), [#4809](https://github.com/streamlit/streamlit/pull/4809), [#4856](https://github.com/streamlit/streamlit/pull/4856))

## **Version 1.10.0**

_Release date: June 2, 2022_

**Highlights**

- 📖 Introducing native support for multipage apps! Check out our [blog post](https://blog.streamlit.io/introducing-multipage-apps) and try out our new `streamlit hello`.

**Notable Changes**

- ✨ `st.dataframe` has been redesigned.
- 🔘 `st.radio` has a `horizontal` keyword-only parameter to display options horizontally.
- ⚠️ Streamlit Community Cloud will support richer exception formatting.
- 🏂 Get user information on private apps using `st.experimental_user`.

**Other Changes**

- 📊 Upgraded Vega-Lite library to support even more interactive charting improvements. See their [release notes](https://github.com/vega/vega-lite/releases) to find out more. ([#4751](https://github.com/streamlit/streamlit/pull/4751)).
- 📈 `st.vega_lite_chart` will respond to updates, particularly in response to input widgets ([#4736](https://github.com/streamlit/streamlit/pull/4736)).
- 💬 `st.markdown` with long text will always wrap ([#4696](https://github.com/streamlit/streamlit/pull/4696)).
- 📦 Support for [PDM](https://pdm.fming.dev/) ([#4724](https://github.com/streamlit/streamlit/pull/4724)).
- ✍️ Types: Updated type annotations across Streamlit! ([#4679](https://github.com/streamlit/streamlit/pull/4679), [#4680](https://github.com/streamlit/streamlit/pull/4680), [#4681](https://github.com/streamlit/streamlit/pull/4681), [#4682](https://github.com/streamlit/streamlit/pull/4682), [#4683](https://github.com/streamlit/streamlit/pull/4683), [#4684](https://github.com/streamlit/streamlit/pull/4684), [#4685](https://github.com/streamlit/streamlit/pull/4685), [#4686](https://github.com/streamlit/streamlit/pull/4686), [#4687](https://github.com/streamlit/streamlit/pull/4687), [#4688](https://github.com/streamlit/streamlit/pull/4688), [#4690](https://github.com/streamlit/streamlit/pull/4690), [#4703](https://github.com/streamlit/streamlit/pull/4703), [#4704](https://github.com/streamlit/streamlit/pull/4704), [#4705](https://github.com/streamlit/streamlit/pull/4705), [#4706](https://github.com/streamlit/streamlit/pull/4706), [#4707](https://github.com/streamlit/streamlit/pull/4707), [#4708](https://github.com/streamlit/streamlit/pull/4708), [#4710](https://github.com/streamlit/streamlit/pull/4710), [#4723](https://github.com/streamlit/streamlit/pull/4723), [#4733](https://github.com/streamlit/streamlit/pull/4733)).

## **Version 1.9.0**

_Release date: May 4, 2022_

**Notable Changes**

- 🪗 `st.json` now supports a keyword-only argument, `expanded` on whether the JSON should be expanded by default (defaults to `True`).
- 🏃‍♀️ More performance improvements from reducing redundant work each script run.

**Other Changes**

- 🏇 Widgets when `disabled` is set/unset will maintain its value ([#4527](https://github.com/streamlit/streamlit/pull/4527)).
- 🧪 Experimental feature to increase the speed of reruns using configuration `runner.fastReruns`. See [#4628](https://github.com/streamlit/streamlit/pull/4628) for the known issues in enabling this feature.
- 🗺️ DataFrame timestamps support UTC offset (in addition to time zone notation) ([#4669](https://github.com/streamlit/streamlit/pull/4669)).

## **Version 1.8.0**

_Release date: March 24, 2022_

**Notable Changes**

- 🏃‍♀️ Dataframes should see performance improvements ([#4463](https://github.com/streamlit/streamlit/pull/4463)).

**Other Changes**

- 🕰 `st.slider` handles timezones better by removing timezone conversions on the backend ([#4348](https://github.com/streamlit/streamlit/pull/4358)).
- 👩‍🎨 Design improvements to our header ([#4496](https://github.com/streamlit/streamlit/pull/4496)).

## **Version 1.7.0**

_Release date: March 3, 2022_

**Highlights**

- Introducing `st.snow`, celebrating our acquisition by Snowflake! See more information in [our blog post](https://blog.streamlit.io/snowflake-to-acquire-streamlit/).

## **Version 1.6.0**

_Release date: Feb 24, 2022_

**Other Changes**

- 🗜 WebSocket compression is now disabled by default, which will improve CPU and latency performance for large dataframes. You can use the `server.enableWebsocketCompression` configuration option to re-enable it if you find the increased network traffic more impactful.
- ☑️ 🔘 Radio and checkboxes improve focus on Keyboard navigation ([#4308](https://github.com/streamlit/streamlit/pull/4308)).

## **Version 1.5.0**

_Release date: Jan 27, 2022_

**Notable Changes**

- 🌟 Favicon defaults to a PNG to allow for transparency ([#4272](https://github.com/streamlit/streamlit/pull/4272)).
- 🚦 Select Slider Widget now has the `disabled` parameter that removes interactivity (completing all of our widgets) ([#4314](https://github.com/streamlit/streamlit/pull/4314)).

**Other Changes**

- 🔤 Improvements to our markdown library to provide better support for HTML (specifically nested HTML) ([#4221](https://github.com/streamlit/streamlit/pull/4221)).
- 📖 Expanders maintain their expanded state better when multiple expanders are present ([#4290](https://github.com/streamlit/streamlit/pull/4290)).
- 🗳 Improved file uploader and camera input to call its `on_change` handler only when necessary ([#4270](https://github.com/streamlit/streamlit/pull/4270)).

## **Version 1.4.0**

_Release date: Jan 13, 2022_

**Highlights**

- 📸 Introducing `st.camera_input` for uploading images straight from your camera.

**Notable Changes**

- 🚦 Widgets now have the `disabled` parameter that removes interactivity.
- 🚮 Clear `st.experimental_memo` and `st.experimental_singleton` programmatically by using the `clear()` method on a cached function.
- 📨 Developers can now configure the maximum size of a message to accommodate larger messages within the Streamlit application. See `server.maxMessageSize`.
- 🐍 We formally added support for Python 3.10.

**Other Changes**

- 😵‍💫 Calling `str` or `repr` on `threading.current_thread()` does not cause a RecursionError ([#4172](https://github.com/streamlit/streamlit/issues/4172)).
- 📹 Gracefully stop screencast recording when user removes permission to record ([#4180](https://github.com/streamlit/streamlit/pull/4180)).
- 🌇 Better scale images by using a higher-quality image bilinear resampling algorithm ([#4159](https://github.com/streamlit/streamlit/pull/4159)).

## Version 1.3.0

_Release date: Dec 16, 2021_

**Notable Changes**

- 💯 Support for NumPy values in `st.metric`.
- 🌐 Support for Mesh Layers in PyDeck.
- 📊 Updated Plotly chart version to support the latest features.
- 🏀 `st.spinner` element has visual animated spinner.
- 🍰 `st.caption` supports HTML in text with `unsafe_allow_html` parameter.

**Other Changes**

- 🪲 Bug fix: Allow `st.session_state` to be used to set number_input values with no warning ([#4047](https://github.com/streamlit/streamlit/pull/4047)).
- 🪲 Bug fix: Fix footer alignment in wide mode ([#4035](https://github.com/streamlit/streamlit/pull/4035)).
- 🐞 Bug fix: Better support for Graphviz and Bokeh charts in containers (columns, expanders, etc.) ([#4039](https://github.com/streamlit/streamlit/pull/4039)).
- 🐞 Bug fix: Support inline data values in Vega-Lite ([#4070](https://github.com/streamlit/streamlit/pull/4070)).
- ✍️ Types: Updated type annotations for experimental memo and singleton decorators.
- ✍️ Types: Improved type annotations for `st.selectbox`, `st.select_slider`, `st.radio`, `st.number_input`, and `st.multiselect`.

## Version 1.2.0

_Release date: Nov 11, 2021_

**Notable Changes**

- ✏️ `st.text_input` and `st.text_area` now have a `placeholder` parameter to display text when the field is empty.
- 📏 Viewers can now resize the input box in `st.text_area`.
- 📁 Streamlit can auto-reload when files in sub-directories change.
- 🌈 We've upgraded Bokeh support to 2.4.1! We recommend updating your Bokeh library to 2.4.1 to maintain functionality. Going forward, we'll let you know if there's a mismatch in your Bokeh version via an error prompt.
- 🔒 Developers can access secrets via attribute notation (e.g. `st.secrets.key` vs `st.secrets["key"]`) just like session state.
- ✍️ Publish type annotations according to [PEP 561](https://mypy.readthedocs.io/en/stable/installed_packages.html). Users now get type annotations for Streamlit when running mypy ([#4025](https://github.com/streamlit/streamlit/pull/4025)).

**Other Changes**

- 👀 Visual fixes ([#3863](https://github.com/streamlit/streamlit/pull/3863), [#3995](https://github.com/streamlit/streamlit/pull/3995), [#3926](https://github.com/streamlit/streamlit/pull/3926), [#3975](https://github.com/streamlit/streamlit/pull/3975)).
- 🍔 Fixes to the hamburger menu ([#3968](https://github.com/streamlit/streamlit/pull/3968)).
- 🖨️ Ability to print session state ([#3970](https://github.com/streamlit/streamlit/pull/3970)).

## Version 1.1.0

_Release date: Oct 21, 2021_

**Highlights**

- 🧠 Memory improvements: Streamlit apps allocate way less memory over time now.

**Notable Changes**

- ♻️ Apps automatically rerun now when the content of `secrets.toml` changes (before this you had to refresh the page manually).

**Other Changes**

- 🔗 Redirected some links to our [brand-new docs site](https://docs.streamlit.io/), e.g. in exceptions.
- 🪲 Bug fix: Allow initialization of range slider with session state ([#3586](https://github.com/streamlit/streamlit/issues/3586)).
- 🐞 Bug fix: Refresh chart when using `add_rows` with `datetime` index ([#3653](https://github.com/streamlit/streamlit/issues/3653)).
- ✍️ Added some more type annotation in our codebase ([#3908](https://github.com/streamlit/streamlit/issues/3908)).

## Version 1.0.0

_Release date: Oct 5, 2021_

**Highlights**

- 🎈Announcing Streamlit 1.0! To read more about check out our [1.0 blog post](https://blog.streamlit.io/announcing-streamlit-1-0/).

**Other Changes**

- 🐞 Fixed an issue where using `df.dtypes` to show datatypes for a DF fails while using Arrow ([#3709](https://github.com/streamlit/streamlit/issues/3709)), Image captions stay within image width and are readable ([#3530](https://github.com/streamlit/streamlit/issues/3530)).

## Version 0.89.0

_Release date: Sep 22, 2021_

**Highlights**

- 💰 Introducing `st.experimental_memo` and `experimental_singleton`, a new primitive for caching! See [our blog post](https://blog.streamlit.io/new-experimental-primitives-for-caching/).
- 🍔 Streamlit allows developers to configure their hamburger menu to be more user-centric.

**Notable Changes**

- 💅 We updated our UI to a more polished look with a new font.
- 🎨 We now support `theme.base` in the theme object when it's sent to custom components.
- 🧠 We've modified session state to reset widgets if any of their arguments changed even if they provide a key.
  - Some widget behavior may have changed, but we believe this change makes the most sense. We have added a section to [our documentation](/develop/concepts/widget-semantics) describing how they behave.

**Other Changes**

- 🐞 Bug fixes: Support svgs from a URL ([#3809](https://github.com/streamlit/streamlit/pull/3809)) and that do not start with `<svg>` tag ([#3789](https://github.com/streamlit/streamlit/pull/3789)).

## Version 0.88.0

_Release date: Sep 2, 2021_

**Highlights**

- ⬇️ Introducing `st.download_button`, a new button widget for easily downloading files.

**Notable Changes**

- 🛑 We made changes to improve the redacted exception experience on Streamlit Community Cloud. When `client.showErrorDetails=true` exceptions display the Error Type and the Traceback, but redact the actual error text to prevent data leaks.

## Version 0.87.0

_Release date: Aug 19, 2021_

**Highlights**

- 🔢 Introducing `st.metric`, an API for displaying KPIs. Check out the [demo app](https://streamlit-release-demos-0-87streamlit-app-0-87-rfzphf.streamlit.app/) showcasing the functionality.

**Other Changes**

- 🐞 **Bug Fixes**: File uploader retains state upon expander closing ([#3557](https://github.com/streamlit/streamlit/issues/3557)), setIn Error with `st.empty` ([#3659](https://github.com/streamlit/streamlit/issues/3659)), Missing IFrame embeds in docs ([#3706](https://github.com/streamlit/streamlit/issues/3706)), Fix error writing certain PNG files ([#3597](https://github.com/streamlit/streamlit/issues/3597)).

## Version 0.86.0

_Release date: Aug 5, 2021_

**Highlights**

- 🎓 Our layout primitives are graduating from beta! You can now use `st.columns`, `st.container` and `st.expander` without the `beta_` prefix.

**Notable Changes**

- 📱 When using `st.columns`, columns will stack vertically when viewport size \<640px so that column layout on smaller viewports is consistent and cleaner. ([#3594](https://github.com/streamlit/streamlit/issues/3594)).

**Other Changes**

- 🐞 **Bug fixes**: Fixed `st.date_input` crashes if its empty ([#3194](https://github.com/streamlit/streamlit/issues/3194)), Opening files with utf-8([#3022](https://github.com/streamlit/streamlit/issues/3022)), `st.select_slider` resets its state upon interaction ([#3600](https://github.com/streamlit/streamlit/issues/3600)).

## Version 0.85.0

_Release date: Jul 22, 2021_

**Highlights**

- 🏹 Streamlit now uses [Apache Arrow](https://arrow.apache.org) for serializing data frames when they are sent from Streamlit server to the front end. See our [blog post](https://blog.streamlit.io/).
  - (Users who wish to continue using the legacy data frame serialization can do so by setting the `dataFrameSerialization` config option to `"legacy"` in their `config.toml`).

**Other Changes**

- 🐞 Bug fixes: Unresponsive pydeck example ([#3395](https://github.com/streamlit/streamlit/issues/3395)), JSON parse error message ([#2324](https://github.com/streamlit/streamlit/issues/2324)), Tooltips rendering ([#3300](https://github.com/streamlit/streamlit/issues/3300)), Colorpicker not working on Streamlit Sharing ([#2689](https://github.com/streamlit/streamlit/issues/2689)).

## Version 0.84.0

_Release date: Jul 1, 2021_

**Highlights**

- 🧠 Introducing `st.session_state` and widget callbacks to allow you to add statefulness to your apps. Check out the [blog post](http://blog.streamlit.io/session-state-for-streamlit/)

**Notable Changes**

- 🪄 `st.text_input` now has an `autocomplete` parameter to allow password managers to be used

**Other Changes**

- Using st.set_page_config to assign the page title no longer appends "Streamlit" to that title ([#3467](https://github.com/streamlit/streamlit/pull/3467))
- NumberInput: disable plus/minus buttons when the widget is already at its max (or min) value ([#3493](https://github.com/streamlit/streamlit/pull/3493))

## Version 0.83.0

_Release date: Jun 17, 2021_

**Highlights**

- 🛣️ Updates to Streamlit docs to include step-by-step guides which demonstrate how to connect Streamlit apps to various databases & APIs

**Notable Changes**

- 📄 `st.form` now has a `clear_on_submit` parameter which "resets" all the form's widgets when the form is submitted.

**Other Changes**

- Fixed bugs regarding file encodings ([#3320](https://github.com/streamlit/streamlit/issues/3220), [#3108](https://github.com/streamlit/streamlit/issues/3108), [#2731](https://github.com/streamlit/streamlit/issues/2731))

## Version 0.82.0

_Release date: May 13, 2021_

**Notable Changes**

- ♻️ Improvements to memory management by forcing garbage collection between script runs.

## Version 0.81.1

_Release date: Apr 29, 2021_

**Highlights**

- 📝 Introducing `st.form` and `st.form_submit_button` to allow you to batch input widgets. Check out our [blog post](http://blog.streamlit.io/introducing-submit-button-and-forms)
- 🔤 Introducing `st.caption` so you can add explainer text anywhere in you apps.
- 🎨 Updates to Theming, including ability to build a theme that inherits from any of our default themes.
- 🚀 Improvements to deployment experience to Streamlit sharing from the app menu.

**Other changes**

- Support for binary files in Custom Components ([#3144](https://github.com/streamlit/streamlit/pull/3144))

## Version 0.80.0

_Release date: Apr 8, 2021_

**Highlights**

- 🔐 Streamlit now support Secrets management for apps deployed to Streamlit Sharing!
- ⚓️ Titles and headers now come with automatically generated anchor links. Just hover over any title and click the 🔗 to get the link!

**Other changes**

- Added `allow-downloads` capability to custom components ([#3040](https://github.com/streamlit/streamlit/issues/3040))
- Fixed markdown tables in dark theme ([#3020](https://github.com/streamlit/streamlit/issues/3020))
- Improved color picker widget in the Custom Theme dialog ([#2970](https://github.com/streamlit/streamlit/issues/2970))

## Version 0.79.0

_Release date: Mar 18, 2021_

**Highlights**

- 🌈 Introducing support for custom themes. Check out our [blog post](http://blog.streamlit.io/introducing-theming/)
- 🌚 This release also introduces dark mode!
- 🛠️ Support for tooltips on all input widgets

**Other changes**

- Fixed bugs regarding file encodings ([#1936](https://github.com/streamlit/streamlit/issues/1936), [#2606](https://github.com/streamlit/streamlit/issues/2606)) and caching functions ([#2728](https://github.com/streamlit/streamlit/issues/2728))

## Version 0.78.0

_Release date: Mar 4, 2021_

**Features**

- If you're in the Streamlit for Teams beta, we made a few updates to how secrets work. Check the beta docs for more info!
- Dataframes now displays timezones for all DateTime and Time columns, and shows the time with the timezone applied, rather than in UTC

**Notable Bug Fixes**

- Various improvement to column alignment in `st.beta_columns`
- Removed the long-deprecated `format` param from `st.image`, and replaced with `output_format`.

## Version 0.77.0

_Release date: Feb 23, 2021_

**Features**

- Added a new config option `client.showErrorDetails` allowing the developer to control the granularity of error messages. This is useful for when you deploy an app, and want to conceal from your users potentially-sensitive information contained in tracebacks.

**Notable bug fixes**

- Fixed [bug](https://github.com/streamlit/streamlit/issues/1957) where `st.image` wasn't rendering certain kinds of SVGs correctly.
- Fixed [regression](https://github.com/streamlit/streamlit/issues/2699) where the current value of an `st.slider` was only shown on hover.

## Version 0.76.0

_Release date: February 4, 2021_

**Notable Changes**

- 🎨 [`st.color_picker`](https://docs.streamlit.io/en/0.76.0/api.html#streamlit.color_picker) is now out of beta. This means the old beta_color_picker function, which was marked as deprecated for the past 3 months, has now been replaced with color_picker.
- 🐍 Display a warning when a Streamlit script is run directly as `python script.py`.
- [`st.image`](https://docs.streamlit.io/en/0.76.0/api.html#streamlit.image)'s `use_column_width` now defaults to an `auto` option which will resize the image to the column width if the image exceeds the column width.
- ✂️ Fixed bugs ([2437](https://github.com/streamlit/streamlit/issues/2437) and [2247](https://github.com/streamlit/streamlit/issues/2247)) with content getting cut off within a [`st.beta_expander`](https://docs.streamlit.io/en/0.76.0/api.html#streamlit.beta_expander)
- 📜 Fixed a [bug](https://github.com/streamlit/streamlit/issues/2543) in [`st.dataframe`](https://docs.streamlit.io/en/0.76.0/api.html#streamlit.dataframe) where the scrollbar overlapped with the contents in the last column.
- 💾 Fixed a [bug](https://github.com/streamlit/streamlit/issues/2561) for [`st.file_uploader`](https://docs.streamlit.io/en/0.76.0/api.html#streamlit.file_uploader) where file data returned was not the most recently uploaded file.
- ➕ Fixed bugs ([2086](https://github.com/streamlit/streamlit/issues/2086) and [2556](https://github.com/streamlit/streamlit/issues/2556)) where some LaTeX commands were not rendering correctly.

## Version 0.75.0

_Release date: January 21, 2021_

**Notable Changes**

- 🕳 [`st.empty`](https://docs.streamlit.io/en/0.75.0/api.html#streamlit.empty)
  previously would clear the component at the end of the script. It has now been
  updated to clear the component instantly.
- 🛹 Previously in wide mode, we had thin margins around the webpage. This has
  now been increased to provide a better visual experience.

## Version 0.74.0

_Release date: January 6, 2021_

**Notable Changes**

- 💾 [`st.file_uploader`](https://docs.streamlit.io/en/0.74.0/api.html#streamlit.file_uploader). has been stabilized and the deprecation warning
  and associated configuration option (`deprecation.showfileUploaderEncoding`) has been removed.
- 📊 [`st.bokeh_chart`](https://docs.streamlit.io/en/0.74.0/api.html#streamlit.bokeh_chart) is no longer duplicated when the page loads.
- 🎈 Fixed page icon to support emojis with variants (i.e. 🤦‍♀️ vs 🤦🏼‍♀️) or dashes (i.e 🌙 - crescent-moon).

## Version 0.73.0

_Release date: December 17, 2020_

**Notable Changes**

- 🐍 Streamlit can now be installed on Python 3.9. Streamlit components are not
  yet compatible with Python 3.9 and must use version 3.8 or earlier.
- 🧱 Streamlit Components now allows same origin, enabling features provided by
  the browser such as a webcam component.
- 🐙 Fix Streamlit sharing deploy experience for users running on Git versions
  2.7.0 or earlier.
- 🧰 Handle unexpected closing of uploaded files for [`st.file_uploader`](https://docs.streamlit.io/en/0.72.0/api.html#streamlit.file_uploader).

## Version 0.72.0

_Release date: December 2, 2020_

**Notable Changes**

- 🌈 Establish a framework for theming and migrate existing components.
- 📱 Improve the sidebar experience for mobile devices.
- 🧰 Update [`st.file_uploader`](https://docs.streamlit.io/en/0.71.0/api.html#streamlit.file_uploader) to reduce reruns.

## Version 0.71.0

_Release date: November 11, 2020_

**Notable Changes**

- 📁 Updated [`st.file_uploader`](https://docs.streamlit.io/en/0.71.0/api.html#streamlit.file_uploader)
  to automatically reset buffer on app reruns.
- 📊 Optimize the default rendering of charts and reduce issues with the initial render.

## Version 0.70.0

_Release date: October 28, 2020_

**Notable Changes**

- 🧪 [`st.set_page_config`](https://docs.streamlit.io/en/0.70.0/api.html#streamlit.set_page_config) and [`st.color_picker`](https://docs.streamlit.io/en/0.70.0/api.html#streamlit.color_picker) have now been moved into the
  Streamlit namespace. These will be removed from beta January 28th, 2021. Learn
  more about our beta process [here](https://docs.streamlit.io/en/0.70.0/api.html#beta-and-experimental-features).
- 📊 Improve display of bar charts for discrete values.

## Version 0.69.0

_Release date: October 15, 2020_

**Highlights:**

- 🎁 Introducing Streamlit sharing, the best way to deploy, manage, and share your public Streamlit apps—for free. Read more about it on our [blog post](http://blog.streamlit.io/introducing-streamlit-sharing/) or sign up [here](https://streamlit.io/sharing)!
- Added `st.experimental_rerun` to programatically re-run your app. Thanks [SimonBiggs](https://github.com/SimonBiggs)!

**Notable Changes**

- 📹 Better support across browsers for start and stop times for st.video.
- 🖼 Bug fix for intermittently failing media files
- 📦 Bug fix for custom components compatibility with Safari. Make sure to upgrade to the latest [streamlit-component-lib](https://www.npmjs.com/package/streamlit-component-lib).

## Version 0.68.0

_Release date: October 8, 2020_

**Highlights:**

- ⌗ Introducing new layout options for Streamlit! Move aside, vertical layout.
  Make a little space for... horizontal layout! Check out our
  [blog post](https://blog.streamlit.io/introducing-new-layout-options-for-streamlit/).
- 💾 File uploader redesigned with new functionality for multiple files uploads
  and better support for working with uploaded files. This may cause breaking
  changes. Please see the new api in our
  [documentation](https://docs.streamlit.io/en/0.68.0/api.html#streamlit.file_uploader)

**Notable Changes**

- 🎈 `st.balloon` has gotten a facelift with nicer balloons and smoother animations.
- 🚨 Breaking Change: Following the deprecation of `st.deck_gl_chart` in
  January 2020, we have now removed the API completely. Please use
  `st.pydeck_chart` instead.
- 🚨 Breaking Change: Following the deprecation of `width` and `height` for
  `st.altair_chart`, `st.graphviz_chart`, `st.plotly_chart`, and
  `st.vega_lite_chart` in January 2020, we have now removed the args completely.
  Please set the width and height in the respective charting library.

## Version 0.67.0

_Release date: September 16, 2020_

**Highlights:**

- 🦷 Streamlit Components can now return bytes to your Streamlit App. To create a
  component that returns bytes, make sure to upgrade to the latest
  [streamlit-component-lib](https://www.npmjs.com/package/streamlit-component-lib).

**Notable Changes**

- 📈 Deprecation warning: Beginning December 1st, 2020 `st.pyplot()` will require a figure to
  be provided. To disable the deprecation warning, please set `deprecation.showPyplotGlobalUse`
  to `False`
- 🎚 `st.multiselect` and `st.select` are now lightning fast when working with large datasets. Thanks [masa3141](https://github.com/masa3141)!

## Version 0.66.0

_Release date: September 1, 2020_

**Highlights:**

- ✏️ `st.write` is now available for use in the sidebar!
- 🎚 A slider for distinct or non-numerical values is now available with `st.select_slider`.
- ⌗ Streamlit Components can now return dataframes to your Streamlit App. Check out our [SelectableDataTable example](https://github.com/streamlit/component-template/tree/master/examples/SelectableDataTable).
- 📦 The Streamlit Components library used in our Streamlit Component template is
  now available as a npm package ([streamlit-component-lib](https://www.npmjs.com/package/streamlit-component-lib)) to simplify future upgrades to the latest version.
  Existing components do not need to migrate.

**Notable Changes**

- 🐼 Support StringDtype from pandas version 1.0.0
- 🧦 Support for running Streamlit on Unix sockets

## Version 0.65.0

_Release date: August 12, 2020_

**Highlights:**

- ⚙️ Ability to set page title, favicon, sidebar state, and wide mode via st.beta_set_page_config(). See our [documentation](https://docs.streamlit.io/en/0.65.0/api.html#streamlit.set_page_config) for details.
- 📝 Add stateful behaviors through the use of query parameters with st.experimental_set_query_params and st.experimental_get_query_params. Thanks [@zhaoooyue](https://github.com/zhaoooyue)!
- 🐼 Improved pandas dataframe support for st.radio, st.selectbox, and st.multiselect.
- 🛑 Break out of your Streamlit app with st.stop.
- 🖼 Inline SVG support for st.image.

**Callouts:**

- 🚨Deprecation Warning: The st.image parameter format has been renamed to output_format.

## Version 0.64.0

_Release date: July 23, 2020_

**Highlights:**

- 📊 Default matplotlib to display charts with a tight layout. To disable this,
  set `bbox_inches` to `None`, inches as a string, or a `Bbox`
- 🗃 Deprecation warning for automatic encoding on `st.file_uploader`
- 🙈 If `gatherUserStats` is `False`, do not even load the Segment library.
  Thanks [@tanmaylaud](https://github.com/tanmaylaud)!

## Version 0.63.0

_Release date: July 13, 2020_

**Highlights:**

- 🧩 **Support for Streamlit Components!!!** See
  [documentation](https://docs.streamlit.io/en/latest/streamlit_components.html) for more info.
- 🕗 Support for datetimes in
  [`st.slider`](https://docs.streamlit.io/en/latest/api.html#streamlit.slider). And, of course, just
  like any other value you use in `st.slider`, you can also pass in two-element lists to get a
  datetime range slider.

## Version 0.62.0

_Release date: June 21, 2020_

**Highlights:**

- 📨 Ability to turn websocket compression on/off via the config option
  `server.enableWebsocketCompression`. This is useful if your server strips HTTP headers and you do
  not have access to change that behavior.
- 🗝️ Out-of-the-box support for CSRF protection using the
  [Cookie-to-header token](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Cookie-to-header_token)
  technique. This means that if you're serving your Streamlit app from multiple replicas you'll need
  to configure them to to use the same cookie secret with the `server.cookieSecret` config option.
  To turn XSRF protection off, set `server.enableXsrfProtection=false`.

**Notable bug fixes:**

- 🖼️ Added a grace period to the image cache expiration logic in order to fix multiple related bugs
  where images sent with `st.image` or `st.pyplot` were sometimes missing.

## Version 0.61.0

_Release date: June 2, 2020_

**Highlights:**

- 📅 Support for date ranges in `st.date_picker`. See
  [docs](https://docs.streamlit.io/en/latest/api.html#streamlit.date_picker)
  for more info, but the TLDR is: just pass a list/tuple as the default date and it will be
  interpreted as a range.
- 🗣️ You can now choose whether `st.echo` prints the code above or below the output of the echoed
  block. To learn more, refer to the `code_location` argument in the
  [docs](https://docs.streamlit.io/en/latest/api.html#streamlit.echo).
- 📦 Improved `@st.cache` support for Keras models and Tensorflow `saved_models`.

## Version 0.60.0

_Release date: May 18, 2020_

**Highlights:**

- ↕️ Ability to set the height of an `st.text_area` with the `height` argument
  (expressed in pixels). See
  [docs](https://docs.streamlit.io/en/latest/api.html#streamlit.text_area) for more.
- 🔡 Ability to set the maximimum number of characters allowed in `st.text_area`
  or `st.text_input`. Check out the `max_chars` argument in the
  [docs](https://docs.streamlit.io/en/latest/api.html#streamlit.text_area).
- 🗺️ Better DeckGL support for the [H3](https://h3geo.org/) geospatial indexing
  system. So now you can use things like `H3HexagonLayer` in
  [`st.pydeck_chart`](https://docs.streamlit.io/en/latest/api.html#streamlit.pydeck_chart).
- 📦 Improved `@st.cache` support for PyTorch TensorBase and Model.

## Version 0.59.0

_Release date: May 05, 2020_

**Highlights:**

- 🎨 New color-picker widget! Use it with
  [`st.beta_color_picker()`](https://docs.streamlit.io/en/0.69.0/api.html#streamlit.beta_color_picker)
- 🧪 Introducing `st.beta_*` and `st.experimental_*` function prefixes, for faster
  Streamlit feature releases. See
  [docs](https://docs.streamlit.io/en/latest/api.html#pre-release-features) for more info.
- 📦 Improved `@st.cache` support for SQL Alchemy objects, CompiledFFI, PyTorch
  Tensors, and `builtins.mappingproxy`.

## Version 0.58.0

_Release date: April 22, 2020_

**Highlights:**

- 💼 Made `st.selectbox` filtering case-insensitive.
- ㈬ Better support for Tensorflow sessions in `@st.cache`.
- 📊 Changed behavior of `st.pyplot` to auto-clear the figure only when using
  the global Matplotlib figure (i.e. only when calling `st.pyplot()` rather
  than `st.pyplot(fig)`).

## Version 0.57.0

_Release date: March 26, 2020_

**Highlights:**

- ⏲️ Ability to set expiration options for `@st.cache`'ed functions by setting
  the `max_entries` and `ttl` arguments. See
  [docs](https://docs.streamlit.io/en/latest/api.html#streamlit.cache).
- 🆙 Improved the machinery behind `st.file_uploader`, so it's much more
  performant now! Also increased the default upload limit to 200MB
  (configurable via `server.max_upload_size`).
- 🔒 The `server.address` config option now _binds_ the server to that address
  for added security.
- 📄 Even more details added to error messages for `@st.cache` for easier
  debugging.

## Version 0.56.0

_Release date: February 15, 2020_

**Highlights:**

- 📄 Improved error messages for st.cache. The errors now also point to the new
  caching docs we just released. Read more
  [here](https://discuss.streamlit.io/t/help-us-stress-test-streamlit-s-latest-caching-update/1944)!

**Breaking changes:**

- 🐍 As [announced last month](https://discuss.streamlit.io/t/streamlit-will-deprecate-python-2-in-february/1656),
  **Streamlit no longer supports Python 2.** To use Streamlit you'll need
  Python 3.5 or above.

## Version 0.55.0

_Release date: February 4, 2020_

**Highlights:**

- 📺 **Ability to record screencasts directly from Streamlit!** This allows
  you to easily record and share explanations about your models, analyses,
  data, etc. Just click ☰ then "Record a screencast". Give it a try!

## Version 0.54.0

_Release date: January 29, 2020_

**Highlights:**

- ⌨️ Support for password fields! Just pass `type="password"` to
  `st.text_input()`.

**Notable fixes:**

- ✳️ Numerous st.cache improvements, including better support for complex objects.
- 🗣️ Fixed cross-talk in sidebar between multiple users.

**Breaking changes:**

- If you're using the SessionState <del>hack</del> Gist, you should re-download it!
  Depending on which hack you're using, here are some links to save you some
  time:
  - [SessionState.py](https://gist.github.com/tvst/036da038ab3e999a64497f42de966a92)
  - [st_state_patch.py](https://gist.github.com/tvst/0899a5cdc9f0467f7622750896e6bd7f)

## Version 0.53.0

_Release date: January 14, 2020_

**Highlights:**

- 🗺️ Support for all DeckGL features! Just use
  [Pydeck](https://deckgl.readthedocs.io/en/latest/) instead of
  [`st.deck_gl_chart`](https://docs.streamlit.io/en/latest/api.html#streamlit.pydeck_chart).
  To do that, simply pass a PyDeck object to
  [`st.pydeck_chart`](https://docs.streamlit.io/en/latest/api.html#streamlit.pydeck_chart),
  [`st.write`](https://docs.streamlit.io/en/latest/api.html#streamlit.write),
  or [magic](https://docs.streamlit.io/en/latest/api.html#magic).

  _Note that as a **preview release** things may change in the near future.
  Looking forward to hearing input from the community before we stabilize the
  API!_

  **The goals is for this to replace `st.deck_gl_chart`,** since it
  is does everything the old API did _and much more!_

- 🆕 Better handling of Streamlit upgrades while developing. We now auto-reload
  the browser tab if the app it is displaying uses a newer version of Streamlit
  than the one the tab is running.

- 👑 New favicon, with our new logo!

**Notable fixes:**

- Magic now works correctly in Python 3.8. It no longer causes
  docstrings to render in your app.

**Breaking changes:**

- Updated how we calculate the default width and height of all chart types.
  We now leave chart sizing up to your charting library itself, so please refer
  to the library's documentation.

  As a result, the `width` and `height` arguments have been deprecated
  from most chart commands, and `use_container_width` has been introduced
  everywhere to allow you to make charts fill as much horizontal space as
  possible (this used to be the default).

## Version 0.52.0

_Release date: December 20, 2019_

**Highlights:**

- 📤 Preview release of the file uploader widget. To try it out just call
  [`st.file_uploader`](https://docs.streamlit.io/en/latest/api.html#streamlit.file_uploader)!

  _Note that as a **preview release** things may change in the near future.
  Looking forward to hearing input from the community before we stabilize the
  API!_

- 👋 Support for [emoji codes](https://www.webfx.com/tools/emoji-cheat-sheet/) in
  `st.write` and `st.markdown`! Try it out with `st.write("Hello :wave:")`.

**Breaking changes:**

- 🧹 `st.pyplot` now clears figures by default, since that's what you want 99% of
  the time. This allows you to create two or more Matplotlib charts without
  having to call
  [`pyplot.clf`](https://matplotlib.org/3.1.1/api/_as_gen/matplotlib.pyplot.clf.html)
  every time. If you want to turn this behavior off, use
  [`st.pyplot(clear_figure=False)`](https://docs.streamlit.io/en/latest/api.html#streamlit.pyplot)
- 📣 `st.cache` no longer checks for input mutations. This is the first change
  of our ongoing effort to simplify the caching system and prepare Streamlit
  for the launch of other caching primitives like Session State!

## Version 0.51.0

_Release date: November 30, 2019_

**Highlights:**

- 🐕 You can now tweak the behavior of the file watcher with the config option `server.fileWatcherType`. Use it to switch between:
  - `auto` (default) : Streamlit will attempt to use the watchdog module, and
    falls back to polling if watchdog is not available.
  - `watchdog` : Force Streamlit to use the watchdog module.
  - `poll` : Force Streamlit to always use polling.
  - `none` : Streamlit will not watch files.

**Notable bug fixes:**

- Fix the "keyPrefix" option in static report sharing [#724](https://github.com/streamlit/streamlit/pull/724)
- Add support for getColorX and getTargetColorX to DeckGL Chart [#718](https://github.com/streamlit/streamlit/pull/718)
- Fixing Tornado on Windows + Python 3.8 [#682](https://github.com/streamlit/streamlit/pull/682)
- Fall back on webbrowser if xdg-open is not installed on Linux [#701](https://github.com/streamlit/streamlit/pull/701)
- Fixing number input spin buttons for Firefox [#683](https://github.com/streamlit/streamlit/pull/683)
- Fixing CTRL+ENTER on Windows [#699](https://github.com/streamlit/streamlit/pull/699)
- Do not automatically create credential file when in headless mode [#467](https://github.com/streamlit/streamlit/pull/467)

## Version 0.50.1

_Release date: November 10, 2019_

**Highlights:**

- 👩‍🎓 SymPy support and ability to draw mathematical expressions using LaTeX! See
  [`st.latex`](/develop/api-reference/text/st.latex),
  [`st.markdown`](/develop/api-reference/text/st.markdown),
  and
  [`st.write`](/develop/api-reference/write-magic/st.write).
- 🌄 You can now set config options using environment variables. For example,
  `export STREAMLIT_SERVER_PORT=9876`.
- 🐱 Ability to call `streamlit run` directly with Github and Gist URLs. No
  need to grab the "raw" URL first!
- 📃 Cleaner exception stack traces. We now remove all Streamlit-specific code
  from stack traces originating from the user's app.

## Version 0.49.0

_Release date: October 23, 2019_

**Highlights:**

- 💯 New input widget for entering numbers with the keyboard: `st.number_input()`
- 📺 Audio/video improvements: ability to load from a URL, to embed YouTube
  videos, and to set the start position.
- 🤝 You can now (once again) share static snapshots of your apps to S3! See
  the S3 section of `streamlit config show` to set it up. Then share from
  top-right menu.
- ⚙️ Use `server.baseUrlPath` config option to set Streamlit's URL to something
  like `http://domain.com/customPath`.

**Notable bug fixes:**

- Fixes numerous Windows bugs, including [Issues
  #339](https://github.com/streamlit/streamlit/issues/399) and
  [#401](https://github.com/streamlit/streamlit/issues/301).

## Version 0.48.0

_Release date: October 12, 2019_

**Highlights:**

- 🔧 Ability to set config options as command line flags or in a local config file.
- ↕️ You can now maximize charts and images!
- ⚡ Streamlit is now much faster when writing data in quick succession to your app.
- ✳️ Ability to blacklist folder globs from "run on save" and `@st.cache` hashing.
- 🎛️ Improved handling of widget state when Python file is modified.
- 🙈 Improved HTML support in `st.write` and `st.markdown`. HTML is still unsafe, though!

**Notable bug fixes:**

- Fixes `@st.cache` bug related to having your Python environment on current
  working directory. [Issue #242](https://github.com/streamlit/streamlit/issues/242)
- Fixes loading of root url `/` on Windows. [Issue #244](https://github.com/streamlit/streamlit/issues/244)

## Version 0.47.0

_Release date: October 1, 2019_

**Highlights:**

- 🌄 New hello.py showing off 4 glorious Streamlit apps. Try it out!
- 🔄 Streamlit now automatically selects an unused port when 8501 is already in use.
- 🎁 Sidebar support is now out of beta! Just start any command with `st.sidebar.` instead of `st.`
- ⚡ Performance improvements: we added a cache to our websocket layer so we no longer re-send data to the browser when it hasn't changed between runs
- 📈 Our "native" charts `st.line_chart`, `st.area_chart` and `st.bar_chart` now use Altair behind the scenes
- 🔫 Improved widgets: custom st.slider labels; default values in multiselect
- 🕵️‍♀️ The filesystem watcher now ignores hidden folders and virtual environments
- 💅 Plus lots of polish around caching and widget state management

**Breaking change:**

- 🛡️ We have temporarily disabled support for sharing static "snapshots" of Streamlit apps. Now that we're no longer in a limited-access beta, we need to make sure sharing is well thought through and abides by laws like the DMCA. But we're working on a solution!

## Version 0.46.0

_Release date: September 19, 2019_

**Highlights:**

- ✨ Magic commands! Use `st.write` without typing `st.write`. See
  [https://docs.streamlit.io/en/latest/api.html#magic-commands](https://docs.streamlit.io/en/latest/api.html#magic-commands)
- 🎛️ New `st.multiselect` widget.
- 🐍 Fixed numerous install issues so now you can use `pip install streamlit`
  even in Conda! We've therefore deactivated our Conda repo.
- 🐞 Multiple bug fixes and additional polish in preparation for our launch!

**Breaking change:**

- 🛡️ HTML tags are now blacklisted in `st.write`/`st.markdown` by default. More
  information and a temporary work-around at:
  [https://github.com/streamlit/streamlit/issues/152](https://github.com/streamlit/streamlit/issues/152)

## Version 0.45.0

_Release date: August 28, 2019_

**Highlights:**

- 😱 Experimental support for _sidebar_! Let us know if you want to be a beta
  tester.
- 🎁 Completely redesigned `st.cache`! Much more performant, has a cleaner API,
  support for caching functions called by `@st.cached` functions,
  user-friendly error messages, and much more!
- 🖼️ Lightning fast `st.image`, ability to choose between JPEG and PNG
  compression, and between RGB and BGR (for OpenCV).
- 💡 Smarter API for `st.slider`, `st.selectbox`, and `st.radio`.
- 🤖 Automatically fixes the Matplotlib backend -- no need to edit .matplotlibrc

## Version 0.44.0

_Release date: July 28, 2019_

**Highlights:**

- ⚡ Lightning-fast reconnect when you do a ctrl-c/rerun on your Streamlit code
- 📣 Useful error messages when the connection fails
- 💎 Fixed multiple bugs and improved polish of our newly-released interactive widgets

## Version 0.43.0

_Release date: July 9, 2019_

**Highlights:**

- ⚡ Support for interactive widgets! 🎈🎉

## Version 0.42.0

_Release date: July 1, 2019_

**Highlights:**

- 💾 Ability to save Vega-Lite and Altair charts to SVG or PNG
- 🐇 We now cache JS files in your browser for faster loading
- ⛔ Improvements to error-handling inside Streamlit apps

## Version 0.41.0

_Release date: June 24, 2019_

**Highlights:**

- 📈 Greatly improved our support for named datasets in Vega-Lite and Altair
- 🙄 Added ability to ignore certain folders when watching for file changes. See the `server.folderWatchBlacklist` config option.
- ☔ More robust against syntax errors on the user's script and imported modules

## Version 0.40.0

_Release date: June 10, 2019_

**Highlights:**

- Streamlit is more than 10x faster. Just save and watch your analyses update instantly.
- We changed how you run Streamlit apps:
  `$ streamlit run your_script.py [script args]`
- Unlike the previous versions of Streamlit, `streamlit run [script] [script args]` creates a server (now you don't need to worry if the proxy is up). To kill the server, all you need to do is hit **Ctrl+c**.

**Why is this so much faster?**

Now, Streamlit keeps a single Python session running until you kill the server. This means that Streamlit can re-run your code without kicking off a new process; imported libraries are cached to memory. An added bonus is that `st.cache` now caches to memory instead of to disk.

**What happens if I run Streamlit the old way?**

If you run `$ python your_script.py` the script will execute from top to bottom, but won't produce a Streamlit app.

**What are the limitations of the new architecture?**

- To switch Streamlit apps, first you have to kill the Streamlit server with **Ctrl-c**. Then, you can use `streamlit run` to generate the next app.
- Streamlit only works when used inside Python files, not interactively from the Python REPL.

**What else do I need to know?**

- The strings we print to the command line when **liveSave** is on have been cleaned up. You may need to adjust any RegEx that depends on those.
- A number of config options have been renamed:

  | Old config                 | New config            |
  | -------------------------- | --------------------- |
  | proxy.isRemote             | server.headless       |
  | proxy.liveSave             | server.liveSave       |
  | proxy.runOnSave            | server.runOnSave      |
  | proxy.watchFileSystem      | server.runOnSave      |
  | proxy.enableCORS           | server.enableCORS     |
  | proxy.port                 | server.port           |
  | browser.proxyAddress       | browser.serverAddress |
  | browser.proxyPort          | browser.serverPort    |
  | client.waitForProxySecs    | _n/a_                 |
  | client.throttleSecs        | _n/a_                 |
  | client.tryToOutliveProxy   | _n/a_                 |
  | client.proxyAddress        | _n/a_                 |
  | client.proxyPort           | _n/a_                 |
  | proxy.autoCloseDelaySecs   | _n/a_                 |
  | proxy.reportExpirationSecs | _n/a_                 |

**What if something breaks?**

If the new Streamlit isn't working, please let us know by Slack or email. You can downgrade at any time with these commands:

```bash
pip install --upgrade streamlit==0.37
```

```bash
conda install streamlit=0.37
```

**What's next?**

Thank you for staying with us on this journey! This version of Streamlit lays the foundation for interactive widgets, a new feature of Streamlit we're really excited to share with you in the next few months.

## Version 0.36.0

_Release date: May 03, 2019_

**Highlights**

- 🚣‍♀️ `st.progress()` now also accepts floats from 0.0–1.0
- 🤯 Improved rendering of long headers in DataFrames
- 🔐 Shared apps now default to HTTPS

## Version 0.35.0

_Release date: April 26, 2019_

**Highlights**

- 📷 Bokeh support! Check out docs for `st.bokeh_chart`
- ⚡️ Improved the size and load time of saved apps
- ⚾️ Implemented better error-catching throughout the codebase
