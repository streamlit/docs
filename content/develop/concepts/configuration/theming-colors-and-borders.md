---
title: Colors and borders
slug: /develop/concepts/configuration/theming-customize-colors-and-borders
---

# Customize colors and borders in your Streamlit app

## Color values

For all configuration options that accept a color, you can specify the value with one of the following strings:

- A CSS [`<named-color>`](https://developer.mozilla.org/en-US/docs/Web/CSS/named-color) like `"darkblue"` or `"maroon"`.
- A HEX string like `"#483d8b"` or `"#6A5ACD"`.
- An RGB string like `"rgb(106, 90, 205)"` or `"RGB(70, 130, 180)"`.
- An HSL string like `"hsl(248, 53%, 58%)"` or `"HSL(147, 50%, 47%)"`.

<Tip>

While it is possible for you to specify an alpha value for your colors, this isn't recommended. Streamlit adjusts the alpha value of colors to ensure contextually appropriate shading between background and foreground.

</Tip>

## primaryColor

`primaryColor` defines the accent color most often used throughout a Streamlit
app. A few examples of Streamlit widgets that use `primaryColor` include
`st.checkbox`, `st.slider`, and `st.text_input` (when focused).

![Primary Color](/images/theme_config_options/primaryColor.png)

## backgroundColor

Defines the background color used in the main content area of your app.

## secondaryBackgroundColor

This color is used where a second background color is needed for added
contrast. Most notably, it is the sidebar's background color. It is also used
as the background color for most interactive widgets.

![Secondary Background Color](/images/theme_config_options/secondaryBackgroundColor.png)

## textColor

This option controls the text color for most of your Streamlit app.

## font

Selects the font used in your Streamlit app. Valid values are `"sans serif"`,
`"serif"`, and `"monospace"`. This option defaults to `"sans serif"` if unset
or invalid.

Note that code blocks are always rendered using the monospace font regardless of
the font selected here.

## base

An easy way to define custom themes that make small changes to one of the
preset Streamlit themes is to use the `base` option. Using `base`, the
Streamlit Light theme can be recreated as a custom theme by writing the
following:

```toml
[theme]
base="light"
```

The `base` option allows you to specify a preset Streamlit theme that your
custom theme inherits from. Any theme config options not defined in your theme
settings have their values set to those of the base theme. Valid values for
`base` are `"light"` and `"dark"`.

For example, the following theme config defines a custom theme nearly identical
to the Streamlit Dark theme, but with a new `primaryColor`.

```toml
[theme]
base="dark"
primaryColor="purple"
```

If `base` itself is omitted, it defaults to `"light"`, so you can define a
custom theme that changes the font of the Streamlit Light theme to serif with
the following config

```toml
[theme]
font="serif"
```
