---
title: 2021 release notes
slug: /develop/quick-reference/release-notes/2021
description: A changelog of highlights and fixes for each version of Streamlit released in 2021.
keywords: changelog, release notes, version history
---

# 2021 release notes

This page contains release notes for Streamlit versions released in 2021. For the latest version of Streamlit, see [Release notes](/develop/quick-reference/release-notes).

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
