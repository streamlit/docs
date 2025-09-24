---
title: Theming
slug: /develop/concepts/configuration/theming
description: Learn about theming options in config.toml, including color schemes, fonts, and visual styling.
keywords: theming, app customization, visual styling, color schemes, app appearance, theme configuration, config.toml, styling options, UI customization
---

# Theming overview

In this guide, we provide an overview of theming and visual customization of Streamlit apps. Streamlit themes are defined using configuration options, which are most commonly defined in a `.streamlit/config.toml` file. For more information about setting configuration options, see [Working with configuration options](/develop/concepts/configuration/options). For a complete list of configuration options and definitions, see the API reference for [config.toml](/develop/api-reference/configuration/config.toml#theme).

The following options can be set in the `[theme]` table of `config.toml` and can't be set separately in the `[theme.sidebar]` table:

- **Base color scheme**: Set your custom theme to inherit from Streamlit's light or dark theme.
- **Base font**: Set the base font weight and size. (This can be configured separately for heading and code font.)
- **Chart color**: Set series colors for Plotly, Altair, and Vega-Lite charts.
- **Sidebar border**: Set the visibility of the sidebar border.

The following options can be configured separately for the main body of your app and the sidebar:

- **Font family**: Set the font family for body text, headings, and code.
- **Font style**: Set the weight and size of heading and code font, and set visibility of link underlines.
- **Text color**: Set the color of body text and links.
- **Primary color**: Set the color of interactive elements and highlights.
- **Background color**: Set the color of app, widget, code block, and dataframe header backgrounds.
- **Border radius**: Set the roundness of elements and widgets.
- **Border color**: Set the color and visibility of element, widget, sidebar, and dataframe borders.
- **Basic color palette**: Set the color palette (red, orange, yellow, green, blue, violet, and gray/grey) for things like colored Markdown text and sparklines.

## Example themes

The following light theme is inspired by [Anthropic](https://docs.anthropic.com/en/home).
<Cloud name="doc-theming-overview-anthropic-light-inspired" height="500px" />

The following dark theme is inspired by [Spotify](https://open.spotify.com/).
<Cloud name="doc-theming-overview-spotify-inspired" height="500px" />

## Working with theme configuration during development

Most theme configuration options can be updated while an app is running. This makes it easy to iterate on your custom theme. If you change your app's primary color, save your `config.toml` file, and rerun your app, you will immediately see the new color. However, some configuration options (like `[[theme.fontFace]]`) require you to restart the Streamlit server to reflect the updates. If in doubt, when updating your app's configuration, stop the Streamlit server in your terminal and restart your app with the `streamlit run` command.
