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

## **Version 1.46.0 (latest)**

_Release date: June 17, 2025_

**Highlights**

- 🧭 Introducing top navigation! Use [`st.navigation`](https://docs.streamlit.io/develop/api-reference/navigation/st.navigation) with `position="top"` to create a navigation menu across the top of your app.
- 🔆 You can detect if the viewer is in light mode or dark mode at runtime with [`st.context.theme`](https://docs.streamlit.io/develop/api-reference/caching-and-state/st.context#contexttheme).

**Notable Changes**

- 🪺 Streamlit no longer restricts the nesting of columns, expanders, popovers, and chat message containers, but beware of bad design! Always be mindful of different screen sizes and orientations, and don't overuse nested layouts.
- ↔️ You can set the width of most Streamlit elements.
- ⬆️ `st.form` has a new parameter to configure its `height`.
- 🛠️ `st.columns` supports `gap=None` for no gap between columns.
- 🏋️ Font face declarations in `config.toml` support weight and unicode ranges ([#11248](https://github.com/streamlit/streamlit/pull/11248), [#11163](https://github.com/streamlit/streamlit/issues/11163), [#11247](https://github.com/streamlit/streamlit/issues/11247)).
- 😃 Font face declarations are supported in the window variable ([#11628](https://github.com/streamlit/streamlit/pull/11628), [#11568](https://github.com/streamlit/streamlit/issues/11568)).
- 🔎 Streamlit searches for secrets and configuration options relative to the entrypoint file in addition to the working directory and user root ([#10173](https://github.com/streamlit/streamlit/pull/10173), [#8195](https://github.com/streamlit/streamlit/issues/8195)).
- 🎨 A new configuration option, `theme.dataframeBorderColor`, lets you set the border color for dataframes and tables separately from other border colors ([#11475](https://github.com/streamlit/streamlit/pull/11475)).
- 🌯 A new configuration option, `theme.buttonRadius`, lets you set the radius of buttons separately from other elements ([#11464](https://github.com/streamlit/streamlit/pull/11464)).
- 🖥️ A new configuration option, `theme.codeFontSize`, lets you set the size of code in `st.code`, `st.json`, and `st.help` ([#11508](https://github.com/streamlit/streamlit/pull/11508)).
- 🔒 You can configure a list of allowed origins when CORS protection is enabled ([#11377](https://github.com/streamlit/streamlit/pull/11377)).
- 📄 `st.set_page_config` can be called multiple times in a single script run ([#11286](https://github.com/streamlit/streamlit/pull/11286), [#4483](https://github.com/streamlit/streamlit/issues/4483), [#2216](https://github.com/streamlit/streamlit/issues/2216), [#9797](https://github.com/streamlit/streamlit/issues/9797), [#9038](https://github.com/streamlit/streamlit/issues/9038)).
- 🗺️ `st.pydeck_chart` and [`st.map`](http://st.map) now use Carto by default to provide map tiles ([#11231](https://github.com/streamlit/streamlit/pull/11231)).
- 👀 You can configure Streamlit to watch additional directories for changes with the new configuration option, `server.folderWatchList` ([#9656](https://github.com/streamlit/streamlit/pull/9656), [#9655](https://github.com/streamlit/streamlit/issues/9655)). Thanks, [akramsystems](https://github.com/akramsystems)!

**Other Changes**

- 🔘 Exception messages include a copy button to conveniently copy the message to your clipboard ([#11250](https://github.com/streamlit/streamlit/pull/11250), [#11083](https://github.com/streamlit/streamlit/issues/11083)). Thanks, [snakeM](https://github.com/snakeM)!
- ⚓ Streamlit apps can be served from port 3000 ([#11525](https://github.com/streamlit/streamlit/pull/11525), [#8149](https://github.com/streamlit/streamlit/issues/8149)).
- 👟 Markdown dependencies were upgraded for improved performance ([#11553](https://github.com/streamlit/streamlit/pull/11553), [#11550](https://github.com/streamlit/streamlit/issues/11550)).
- ↔️ The sidebar is narrower by default and consistently handles the scrollbar spacing ([#11412](https://github.com/streamlit/streamlit/pull/11412)).
- 👋 We gave Streamlit hello a couple small tweaks ([#11442](https://github.com/streamlit/streamlit/pull/11442)).
- 🧑‍💻 Base URL window variables are consistently namespaced in `__streamlit` ([#11481](https://github.com/streamlit/streamlit/pull/11481)).
- 🌐 Streamlit apps now serve a `manifest.json` file ([#11462](https://github.com/streamlit/streamlit/pull/11462)).
- 🖌️ `st.dataframe` shows row selection boxes always instead of just on hover ([#11411](https://github.com/streamlit/streamlit/pull/11411), [#11410](https://github.com/streamlit/streamlit/issues/11410)).
- 🦋 `ListColumn` and `LinkColumn` can inherit coloring from `pandas` `Styler` ([#11612](https://github.com/streamlit/streamlit/pull/11612), [#8254](https://github.com/streamlit/streamlit/issues/8254)).
- 💹 `NumberColumn` and `ProgressColumn` support a Japanese yen number format ([#11588](https://github.com/streamlit/streamlit/pull/11588)). Thanks, [alexmalins](https://github.com/alexmalins)!
- 🔗 `st.page_link` can inherit an icon when passed a `StreamlitPage` ([#10694](https://github.com/streamlit/streamlit/pull/10694), [#9743](https://github.com/streamlit/streamlit/issues/9743)). Thanks, [abokey1](https://github.com/abokey1)!
- 🎫 A button's placement in the sidebar or main body of an app is included in its widget identity ([#10881](https://github.com/streamlit/streamlit/pull/10881), [#10598](https://github.com/streamlit/streamlit/issues/10598)). Thanks, [joaooliveira-11](https://github.com/joaooliveira-11)!
- 🕷️ Built-in Streamlit fonts now use variable font files ([#11646](https://github.com/streamlit/streamlit/pull/11646), [#11600](https://github.com/streamlit/streamlit/pull/11600), [#11534](https://github.com/streamlit/streamlit/pull/11534)).
- 🤹 Bug fix: Streamlit Markdown correctly formats task lists and block quotes (#11237).
- 🐞 Bug fix: Horizontal scroll bars are sized correctly in Safari ([#11625](https://github.com/streamlit/streamlit/pull/11625)).
- 🐝 Bug fix: Unnecessary media caching was reduced to improve efficiency and avoid video player crashes ([#11635](https://github.com/streamlit/streamlit/pull/11635), [#9688](https://github.com/streamlit/streamlit/issues/9688)).
- 🐜 Bug fix: `st.text` uses the `break-word` CSS property to wrap long lines without whitespace ([#10969](https://github.com/streamlit/streamlit/pull/10969), [#10824](https://github.com/streamlit/streamlit/issues/10824)). Thanks, [matilde2004](https://github.com/matilde2004)!
- 🪲 Bug fix: Material icons display correctly in `st.markdown` when `unsafe_allow_html=True` ([#11633](https://github.com/streamlit/streamlit/pull/11633), [#9945](https://github.com/streamlit/streamlit/issues/9945)).
- 🐛 Bug fix: Multi-index column names preserve brackets ([#11617](https://github.com/streamlit/streamlit/pull/11617), [#10415](https://github.com/streamlit/streamlit/issues/10415)).
- 💅 Bug fix: Various CSS tweaks ([#11631](https://github.com/streamlit/streamlit/pull/11631), [#11632](https://github.com/streamlit/streamlit/pull/11632), [#11630](https://github.com/streamlit/streamlit/pull/11630), [#11611](https://github.com/streamlit/streamlit/issues/11611), [#11577](https://github.com/streamlit/streamlit/pull/11577), [#9085](https://github.com/streamlit/streamlit/issues/9085), [#8671](https://github.com/streamlit/streamlit/issues/8671), [#11576](https://github.com/streamlit/streamlit/pull/11576), [#11569](https://github.com/streamlit/streamlit/issues/11569)).
- ⛏️ Bug fix: `st.dataframe` clears filter options when applying sort to prevent incorrect highlights ([#11587](https://github.com/streamlit/streamlit/pull/11587), [#11575](https://github.com/streamlit/streamlit/issues/11575)).
- 📊 Bug fix: Altair charts have the correct width and don't overflow with long titles ([#11585](https://github.com/streamlit/streamlit/pull/11585), [#9984](https://github.com/streamlit/streamlit/issues/9984)).
- 🍞 Bug fix: `st.toast` messages appear above `st.dialog` containers ([#11578](https://github.com/streamlit/streamlit/pull/11578), [#10383](https://github.com/streamlit/streamlit/issues/10383)).
- 🪱 Bug fix: Streamlit apps correctly scroll to anchor links ([#11552](https://github.com/streamlit/streamlit/pull/11552), [#11551](https://github.com/streamlit/streamlit/issues/11551)).
- ✍️ Bug fix: `st.context` does not lose state in an app being edited ([#11506](https://github.com/streamlit/streamlit/pull/11506), [#11330](https://github.com/streamlit/streamlit/issues/11330)).
- ⬜ Bug fix: `st.code` preserves leading white space ([#10065](https://github.com/streamlit/streamlit/pull/10065), [#6302](https://github.com/streamlit/streamlit/issues/6302)). Thanks, [XuehaiPan](https://github.com/XuehaiPan)!
- 📅 Bug fix: `st.date_input` shows the correct hover effect when using date ranges ([#11223](https://github.com/streamlit/streamlit/pull/11223), [#10929](https://github.com/streamlit/streamlit/issues/10929)). Thanks, [Bernardo1008](https://github.com/Bernardo1008)!
- 💩 Bug fix: Dataframes using `pandas` `Styler` correctly display `Enum` values ([#11049](https://github.com/streamlit/streamlit/pull/11049), [#10637](https://github.com/streamlit/streamlit/issues/10637)). Thanks, [BigBird404](https://github.com/BigBird404)!
- ☠️ Bug fix: `st.context` does not lose state when `st.switch_page` is called ([#11521](https://github.com/streamlit/streamlit/pull/11521), [#11507](https://github.com/streamlit/streamlit/issues/11507)).
- 👽 Bug fix: File watcher correctly handles custom metaclasses ([#10388](https://github.com/streamlit/streamlit/pull/10388), [#10992](https://github.com/streamlit/streamlit/issues/10992)). Thanks, [HomenShum](https://github.com/HomenShum)!
- 👻 Bug fix: [`st.map`](http://st.map) uses a private Mapbox token when configured ([#11511](https://github.com/streamlit/streamlit/pull/11511), [#11399](https://github.com/streamlit/streamlit/issues/11399)).
- 🦀 Bug fix: `vega-interpreter` was updated to prevent unintentional blank axes ([#11514](https://github.com/streamlit/streamlit/pull/11514), [#5733](https://github.com/streamlit/streamlit/issues/5733)).
- 🦎 Bug fix: Truncated values in `NumberColumn` are rounded correctly ([#11520](https://github.com/streamlit/streamlit/pull/11520), [#11519](https://github.com/streamlit/streamlit/issues/11519)).
- 🐌 Bug fix: Highlighted in text in Markdown has the correct padding on wrapped lines ([#11530](https://github.com/streamlit/streamlit/pull/11530)).
- 🕸️ Bug fix: For a Plotly chart, reset axes works correctly after using fullscreen ([#11498](https://github.com/streamlit/streamlit/pull/11498), [#11327](https://github.com/streamlit/streamlit/issues/11327)).
- 🦗 Bug fix: Altair chart are not cropped on the left on first load ([#10939](https://github.com/streamlit/streamlit/pull/10939), [#9339](https://github.com/streamlit/streamlit/issues/9339)). Thanks, [goncalossmartins](https://github.com/goncalossmartins)!
- 📈 Bug fix: Chart columns correctly show negative values ([#11048](https://github.com/streamlit/streamlit/pull/11048), [#10411](https://github.com/streamlit/streamlit/issues/10411)). Thanks, [tiagorb1](https://github.com/tiagorb1)!
- 🦂 Bug fix: Streamlit doesn't crash when editing indices in `st.data_editor` ([#11448](https://github.com/streamlit/streamlit/pull/11448), [#11434](https://github.com/streamlit/streamlit/issues/11434)).
- 🦟 Bug fix: Color and style is preserved in charts when using `.add_rows()` ([#11414](https://github.com/streamlit/streamlit/pull/11414), [#11312](https://github.com/streamlit/streamlit/issues/11312)).
- 🌪️ Bug fix: Tornado 6.5.0 is excluded to prevent file uploading errors related to unicode filenames ([#11440](https://github.com/streamlit/streamlit/pull/11440), [#11396](https://github.com/streamlit/streamlit/issues/11396), [#11436](https://github.com/streamlit/streamlit/issues/11436)).
- 🦠 Bug fix: Selected rows are cleared when a column in `st.dataframe` is sorted ([#11363](https://github.com/streamlit/streamlit/pull/11363), [#11345](https://github.com/streamlit/streamlit/issues/11345)).
- 📶 Bug fix: Streamlit shows a clearer message when it can't connect to the server and automatically dismisses the message if a connection is successful ([#11366](https://github.com/streamlit/streamlit/pull/11366)).
- 🪰 Bug fix: Localized number and date formats correctly interpret locales with commas ([#11297](https://github.com/streamlit/streamlit/pull/11297), [#11291](https://github.com/streamlit/streamlit/issues/11291)).
- 🧹 Bug fix: Streamlit cleans up the forward message cache to prevent WebSocket message errors ([#11302](https://github.com/streamlit/streamlit/pull/11302), [#11299](https://github.com/streamlit/streamlit/issues/11299), [#11300](https://github.com/streamlit/streamlit/issues/11300)).
- 📜 Bug fix: `st.latex` scrolls horizontally when its content is wider than the app ([#10071](https://github.com/streamlit/streamlit/pull/10071), [#4304](https://github.com/streamlit/streamlit/issues/4304)).
- 🪳 Bug fix: `st.multiselect` has a more stable sort when filtering options ([#11309](https://github.com/streamlit/streamlit/pull/11309), [#11218](https://github.com/streamlit/streamlit/issues/11218)).
- 🕷️ Bug fix: `st.multiselect` options are case sensitive and don't overlap in the drop down menu ([#11307](https://github.com/streamlit/streamlit/pull/11307), [#11217](https://github.com/streamlit/streamlit/issues/11217), [#11306](https://github.com/streamlit/streamlit/pull/11306), [#11215](https://github.com/streamlit/streamlit/issues/11215)).
- 🍪 Bug fix: Streamlit logs an error if the cookie returned by `st.login` is too large ([#11290](https://github.com/streamlit/streamlit/pull/11290), [#11168](https://github.com/streamlit/streamlit/issues/11168)).
- 🪲 Bug fix: Displaying elements within a fragment's callback logs a clear warning that it's not supported ([#10942](https://github.com/streamlit/streamlit/pull/10942), [#10475](https://github.com/streamlit/streamlit/issues/10475)). Thanks, [Zane-dev16](https://github.com/Zane-dev16)!
- 🐞 Bug fix: `st.file_uploader` is case insensitive when validating allowed file extensions ([#11261](https://github.com/streamlit/streamlit/pull/11261), [#11259](https://github.com/streamlit/streamlit/issues/11259)).
- 🐝 Bug fix: Page runs end correctly to prevent invalid widget states ([#11258](https://github.com/streamlit/streamlit/pull/11258), [#11202](https://github.com/streamlit/streamlit/issues/11202)).
- 👤 Bug fix: Error messages correctly refer to `st.user` instead of `st.experimental_user` ([#11198](https://github.com/streamlit/streamlit/pull/11198)).
- 🏷️ Bug fix: The missing label warning for widgets includes a stack trace ([#11187](https://github.com/streamlit/streamlit/pull/11187), [#8908](https://github.com/streamlit/streamlit/issues/8908)).
- 🐛 Bug fix: `st.data_editor` returns the correct result when some rows are deleted and others are added ([#11183](https://github.com/streamlit/streamlit/pull/11183), [#11180](https://github.com/streamlit/streamlit/issues/11180)).

## Older versions of Streamlit

- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
