---
title: Theming
slug: /develop/concepts/configuration/theming
---

# Theming overview

In this guide, we provide an overview of theming and visual customization of Streamlit apps. Streamlit themes are defined using configuration options, which are most commonly defined in a `.streamlit/config.toml` file. For more information on setting configuration options, see [Working with configuration options](/develop/concepts/configuration/options). For a complete list configuration options and definitions, see the API reference for [config.toml](/develop/api-reference/configuration/config.toml#theme).

The following options can be set once for your whole app:

- **Base color scheme**: Set your custom theme to inherit from Streamlit's light or dark theme.
- **Font size**: Set the base font size for your app.

The following options can be configured separately for the main body of your app and the sidebar:

- **Font**: Set the font family for body text, headers, and code.
- **Text color**: Set the color of body text and links.
- **Primary color**: Set the color of interactive elements and highlights.
- **Background color**: Set the color of app, widget, and code block backgrounds.
- **Border radii**: Set the roundness of elements and widgets.
- **Border color**: Set the color and visibility of element, widget, and sidebar borders.

## Example themes

<Cloud name="doc-theming-overview-solarized-light" height="500px" />

<Cloud name="doc-theming-overview-abyss" height="500px" />

## Working with theme configuration during development

Most theme configuration options can be updated while an app is running. This makes it easy to iterate on your custom theme. If you change your app's primary color, save your `config.toml` file, and rerun your app, you will immediately see the new color. However, some configuration options (like `[[theme.fontFace]]`) require you to restart the Streamlit server to reflect the updates. If in doubt, when updating your app's configuration, stop the Streamlit server in your terminal and restart your app with the `streamlit run` command.
