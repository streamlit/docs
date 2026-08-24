---
title: 2022 release notes
slug: /develop/quick-reference/release-notes/2022
description: A changelog of highlights and fixes for each version of Streamlit released in 2022.
keywords: changelog, release notes, version history
---

# 2022 release notes

This page contains release notes for Streamlit versions released in 2022. For the latest version of Streamlit, see [Release notes](/develop/quick-reference/release-notes).

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
