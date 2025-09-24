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

## **Version 1.50.0 (latest)**

_Release date: September 23, 2025_

**Highlights**

- 🤹 Introducing [`MultiselectColumn`](/develop/api-reference/data/st.column_config/st.column_config.multiselectcolumn) to configure colorful, editable lists in your dataframes.
- 🎨 Announcing [color palette](/develop/concepts/configuration/theming-customize-colors-and-borders#basic-color-palette) configuration options to set the exact shade of red, orange, yellow, green, blue, violet, and grey to use in Markdown, status elements, sparklines, `st.metric`, and `st.badge`.
- 📊 [`st.bar_chart`](/develop/api-reference/charts/st.bar_chart) has a new `sort` parameter for conveniently sorting your bars.

**Notable Changes**

- 🔑 To prevent widgets from resetting when you change a parameter, widgets are transitioning to an identity based only on their keys (if provided). The following widgets use only their key for their identity:
  - `st.button`
  - `st.download_button`
  - `st.checkbox`
  - `st.toggle`
  - `st.text_area`
  - `st.text_input`
  - `st.number_input`
  - `st.time_input`
  - `st.date_input`
  - `st.selectbox`
  - `st.multiselect`
  - Custom components
- 🖌️ You can configure the color of [chart columns](/develop/api-reference/data/st.column_config/st.column_config.areachartcolumn).
- 🔢 [`st.metric`](/develop/api-reference/data/st.metric) supports `decimal.Decimal` types ([#12377](https://github.com/streamlit/streamlit/pull/12377), [#12308](https://github.com/streamlit/streamlit/issues/12308)). Thanks, [aebrahim](https://github.com/aebrahim)!
- 🎤 You can specify the sample rate for [`st.audio_input`](/develop/api-reference/widgets/st.audio_input), and the default sample rate has been reduced to 16000 Hz.
- ⚙️ For clarity, in [`st.plotly_chart`](/develop/api-reference/charts/st.plotly_chart), `**kwargs` is deprecated and replaced by `config` ([#12291](https://github.com/streamlit/streamlit/pull/12291), [#12280](https://github.com/streamlit/streamlit/issues/12280)). Thanks, [zyfy29](https://github.com/zyfy29)!
- 📈 [`st.line_chart`](/develop/api-reference/charts/st.line_chart) and [`st.graphviz_chart`](/develop/api-reference/charts/st.graphviz_chart) have `width` parameters to use with flex containers.
- 🔲 You can configure [`st.table`](/develop/api-reference/data/st.table) borders to show all, only horizontal, or no lines.
- 📂 You can specify a default tab in [`st.tabs`](/develop/api-reference/layout/st.tabs).
- 🌐 To use hosted fonts from providers like Google and Adobe, you can declare externally hosted fonts with a URL to their CSS file in `theme.font`, `theme.headingFont`, and `theme.codeFont`.

**Other Changes**

- 🧹 `**kwargs` has been removed from `st.write` ([#12375](https://github.com/streamlit/streamlit/pull/12375), [#12374](https://github.com/streamlit/streamlit/issues/12374)).
- ⏱️ To prevent browser defaults from invalidating caches too soon, cache headers include the `max-age` and `immutable` directives ([#12420](https://github.com/streamlit/streamlit/pull/12420)).
- 👽 Material icons were updated ([#12473](https://github.com/streamlit/streamlit/pull/12473), [#12535](https://github.com/streamlit/streamlit/pull/12535)).
- 🦋 Visual tweaks ([#12348](https://github.com/streamlit/streamlit/pull/12348), [#12367](https://github.com/streamlit/streamlit/pull/12367)).
- 👻 Bug fix: To correct a sequential navigation regression for `st.number_input`, some internal refactoring was reverted ([#12547](https://github.com/streamlit/streamlit/pull/12547), [#12526](https://github.com/streamlit/streamlit/issues/12526)).
- 🦀 Bug fix: Custom components respect zero-size dimensions ([#12479](https://github.com/streamlit/streamlit/pull/12479), [#12454](https://github.com/streamlit/streamlit/issues/12454)).
- 🦎 Bug fix: Images respect center alignment in containers ([#12495](https://github.com/streamlit/streamlit/pull/12495), [#12435](https://github.com/streamlit/streamlit/issues/12435)).
- 🐌 Bug fix: If you use an empty string as a section label in top navigation, those pages will display individually before the collapsible sections ([#12247](https://github.com/streamlit/streamlit/pull/12247), [#12243](https://github.com/streamlit/streamlit/issues/12243)).
- 🕸️ Bug fix: To fix a performance regression, dataframes use `.iat[]` instead of `.iloc[]` internally ([#12422](https://github.com/streamlit/streamlit/pull/12422), [#10952](https://github.com/streamlit/streamlit/issues/10952)).
- 🦗 Bug fix: `st.data_editor` accepts Shift+Enter for multiline entry in a cell ([#12401](https://github.com/streamlit/streamlit/pull/12401), [#12386](https://github.com/streamlit/streamlit/issues/12386)).
- 🦂 Bug fix: To make `st.pdf` more compatible on Windows, MIME types were updated ([#12399](https://github.com/streamlit/streamlit/pull/12399), [#12387](https://github.com/streamlit/streamlit/issues/12387)). Thanks, [geoextra](https://github.com/geoextra)!
- 🦟 Bug fix: To prevent long-word overflow, words are forced to break if they exceed their container's width ([#12370](https://github.com/streamlit/streamlit/pull/12370), [#12366](https://github.com/streamlit/streamlit/issues/12366)).
- 🦠 Bug fix: Hiding all dataframe columns won't raise a TypeError ([#12361](https://github.com/streamlit/streamlit/pull/12361), [#12227](https://github.com/streamlit/streamlit/issues/12227)).
- 🪰 Bug fix: `st.logo` doesn't dislocate the sidebar collapse button ([#12329](https://github.com/streamlit/streamlit/pull/12329), [#12326](https://github.com/streamlit/streamlit/issues/12326)).
- 🪳 Bug fix: When using `accept_new_options=True` with `st.multiselect`, mobile users can access their keyboards ([#12330](https://github.com/streamlit/streamlit/pull/12330)).
- 🕷️ Bug fix: `st.components.v1.html` ignores fractional pixels in `width` ([#12354](https://github.com/streamlit/streamlit/pull/12354), [#12340](https://github.com/streamlit/streamlit/issues/12340)).
- 🐞 Bug fix: `st.number_input` correctly accepts keyed entries ([#12351](https://github.com/streamlit/streamlit/pull/12351), [#12349](https://github.com/streamlit/streamlit/issues/12349)).
- 🐝 Bug fix: Markdown images maintain their aspect ratio when constrained ([#12343](https://github.com/streamlit/streamlit/pull/12343)).
- 🐜 Bug fix: `st.date_input` is inclusive of min and max values ([#12295](https://github.com/streamlit/streamlit/pull/12295), [#12293](https://github.com/streamlit/streamlit/issues/12293)).
- 🪲 Bug fix: Maintain image proportions in fullscreen mode for all width settings ([#12235](https://github.com/streamlit/streamlit/pull/12235)).
- 🐛 Bug fix: Markdown code blocks don't overflow when used in labels ([#12175](https://github.com/streamlit/streamlit/pull/12175), [#12149](https://github.com/streamlit/streamlit/issues/12149)).

## Older versions of Streamlit

- [2025 release notes](/develop/quick-reference/release-notes/2025)
- [2024 release notes](/develop/quick-reference/release-notes/2024)
- [2023 release notes](/develop/quick-reference/release-notes/2023)
- [2022 release notes](/develop/quick-reference/release-notes/2022)
- [2021 release notes](/develop/quick-reference/release-notes/2021)
- [2020 release notes](/develop/quick-reference/release-notes/2020)
- [2019 release notes](/develop/quick-reference/release-notes/2019)
