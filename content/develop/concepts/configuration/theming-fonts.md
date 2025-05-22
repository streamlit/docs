---
title: Customize fonts
slug: /develop/concepts/configuration/theming-customize-fonts
---

# Customize fonts in your Streamlit app

Streamlit lets you change and customize the fonts in your app. You can load font files from a public URL or host them with your app using [static file serving](/develop/concepts/configuration/serving-static-files).

## Default Streamlit fonts

Streamlit comes with [Source Sans](https://fonts.adobe.com/fonts/source-sans), [Source Serif](https://fonts.adobe.com/fonts/source-serif), and [Source Code](https://fonts.adobe.com/fonts/source-code-pro) fonts. These font files are included with the Streamlit library so clients don't download them from a third party. By default, Streamlit uses Source Sans for all text except inline code and code blocks, which use Source Code instead.

To use these default faults, you can set each of the following configuration options to `"sans-serif"` (Source Sans), `"serif"` (Source Serif), or `"monospace"` (Source Code) in `config.toml`:

```toml
[theme]
font = "sans-serif"
headingFont = "sans-serif"
codeFont = "monospace"
[theme.sidebar]
font = "sans-serif"
headingFont = "sans-serif"
codeFont = "monospace"
```

The following configuration options can be set separately for the sidebar by using the `[theme.sidebar]` table instead of the `[theme]` table in `config.toml`:

- `theme.font` sets the default font for all text in the app (except inline code and code blocks). This is `"sans-serif"` (Source Sans) by default.
- `theme.headingFont` sets the default font for all headings in the app. If this is not set, Streamlit uses `theme.font` instead.
- `theme.codeFont` sets the default font for all inline code and code blocks. This is `"monospace"` (Source Code) by default.

When fonts are not declared in `[theme.sidebar]`, Streamlit will inherit each option from `[theme]` before defaulting to less specific options. For example, if `theme.sidebar.headingFont` is not set, Streamlit uses (in order of precedence) `theme.headingFont`, `theme.sidebar.font`, or `theme.font` instead.

In the following `config.toml` example, Streamlit uses Source Serif in the main body of the app and Source Sans in the sidebar.

```toml
[theme]
font = "serif"
[theme.sidebar]
font = "sans-serif"
```

## Loading alternative fonts

To use an alternative font in your app, you must declare the font in `config.toml` under `[[theme.fontFaces]]`. For multiple alternative fonts, declare multiple `[[theme.fontFaces]]` tables in your configuration file. You can self-host your font by using Streamlit static file serving, or you can point to a publicly hosted font file.

<Important>

Streamlit supports self-hosting for OTF, TTF, WOFF, and WOFF2 font file formats. Other font file formats must be hosted externally.

</Important>

Fonts are defined with the following attributes in their `[[theme.fontFaces]]` tables:

- `family`: This is the name of the font and is used to identify the font for use by other configuration options.
- `url`: This is the location of the font file. If you are self-hosting the font file with your app, the value will be similar to `"app/static/font_file.woff"`.
- `weight` (optional): This declares the weight of the font within the font file (e.g., `400` or `"800"`). For more information, see the [`font-weight`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight) CSS `@font-face` descriptor. This must be an integer or numeric string. Weight ranges and keyword values are not supported.
- `style` (optional): This declares the style of the font within the font file (e.g., `"normal"`, `"italic"`, or `"oblique"`). For more information, see the [`font-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-style) CSS `@font-face` descriptor.

<Note>

Font files can be static or variable. A static font file contains a single weight and style of font. If you use static font files, it is common to load multiple files to fully support the font across different weights (normal, bold) and styles (normal, italic). Variable font files parameterize one or more font attributes, which means a single font file can support multiple weights and styles.

The font attributes in `[[theme.fontFaces]]` are passed to the CSS [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) rule. Streamlit passes `font`, `weight`, and `style` to `font-family`, `font-weight`, and `font-style`, respectively.

</Note>

### Example 1: Define an alternative font with variable font files

The following example uses static file serving to host Google's [Noto Sans](https://fonts.google.com/noto/specimen/Noto+Sans) and [Noto Sans Mono](https://fonts.google.com/noto/specimen/Noto+Sans+Mono) fonts and configures the app to use them. Both of these fonts are defined with variable font files that include a parameterized weight. However, because font style is not parameterized, Noto Sans requires two files to define the normal and italic styles separately. Noto Sans Mono does not include a separate file for its italic style. Per [CSS rules](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style#italic), if no italic style is explicitly provided, it will be simulated by skewing the normal-style font.

A line-by-line explanation of this example is available in a [tutorial](/develop/tutorials/configuration-and-theming/variable-fonts).

`.streamlit/config.toml`:

```toml
[server]
enableStaticServing = true

[[theme.fontFaces]]
family="noto-sans"
url="app/static/NotoSans-Italic-VariableFont_wdth,wght.ttf"
style="italic"
[[theme.fontFaces]]
family="noto-sans"
url="app/static/NotoSans-VariableFont_wdth,wght.ttf"
style="normal"
[[theme.fontFaces]]
family="noto-mono"
url="app/static/NotoSansMono-VariableFont_wdth,wght.ttf"

[theme]
font="noto-sans"
codeFont="noto-mono"
```

Directory structure:

```none
project_directory/
├── .streamlit/
│   └── config.toml
├── static/
│   ├── NotoSans-Italic-VariableFont_wdth,wght.ttf
│   ├── NotoSans-VariableFont_wdth,wght.ttf
│   └── NotoSansMono-VariableFont_wdth,wght.ttf
└── streamlit_app.py
```

### Example 2: Define an alternative font with static font files

In this configuration example, an alternative font is declared with multiple static font files. For each font, four static files are needed to define the following weight-style pairs:

- normal normal
- normal bold
- italic normal
- italic bold

If one of the files is missing and you try to use its associated weight and style in your app, the user's browser will use the closest font that is available. The following example uses [Tuffy](https://fonts.google.com/specimen/Tuffy) font. The font has four static font files that cover the four weight-style pairs.

A line-by-line explanation of this example is available in a [tutorial](/develop/tutorials/configuration-and-theming/static-fonts).

`.streamlit/config.toml`:

```toml
[server]
enableStaticServing = true

[[theme.fontFaces]]
family="tuffy"
url="app/static/Tuffy-Regular.ttf"
style="normal"
weight=400
[[theme.fontFaces]]
family="tuffy"
url="app/static/Tuffy-Bold.ttf"
style="normal"
weight=700
[[theme.fontFaces]]
family="tuffy"
url="app/static/Tuffy-Italic.ttf"
style="italic"
weight=400
[[theme.fontFaces]]
family="tuffy"
url="app/static/Tuffy-BoldItalic.ttf"
style="italic"
weight=700

[theme]
font="tuffy"
```

Directory structure:

```none
project_directory/
├── .streamlit/
│   └── config.toml
├── static/
│   ├── Tuffy-Bold.ttf
│   ├── Tuffy-BoldItalic.ttf
│   ├── Tuffy-Italic.ttf
│   └── Tuffy-Regular.ttf
└── streamlit_app.py
```

### Example 3: Define an alternative font with fallbacks

If you don't want to download and host your font files with your app, you can point to externally hosted font files. If your files aren't hosted with your app, it's recommended to declare fallback fonts.

<Important>

If you configure your app to include any third-party integrations, including externally hosted fonts, your app may transmit user data (for example, IP addresses) to external servers. As the app developer, you are solely responsible for notifying your users about these third-party integrations, providing access to relevant privacy policies, and ensuring compliance with all applicable data protection laws and regulations.

</Important>

In your configuration file, wherever you declare a default font, you can use a comma-separated list of fonts instead. You can always include one of Streamlit's default fonts as a final fallback.

- To specify a fallback font in Example 1, in `.streamlit/config.toml`, change the `[theme]` table to the following text:

  ```toml
  [theme]
  font="noto-sans, sans-serif"
  codeFont="noto-mono, monospace"
  ```

  This is the same configuration as in Example 1 except that Source Sans and Source Mono are declared as fallback fonts. You can define more than one fallback. When you declare a default font, the font (or comma-separated list of fonts) is passed to the CSS [`font-family`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family) property.

<Tip>

If any of your font family names contain spaces and you are declaring a fallback sequence, use inner quotes around the names. For example, if you name the font `"Noto Sans"`, use `font="'Noto Sans', sans-serif"` instead.

</Tip>

## Font size

You can set the base font size for your app in pixels. You must specify the base font size as an integer. The following configuration is equivalent to the default base font size of 16 pixels:

```toml
[theme]
baseFontSize=16
```

## Font colors

Font color options are described in [Customize colors and borders in your Streamlit app](/develop/concepts/configuration/theming-customize-colors-and-borders#textcolor-and-linkcolor).

## Design tips

When using alternative fonts in your Streamlit app, keep good design practices in mind. The legibility of a font is strongly influenced by its size, contrast with its background, and shape. Streamlit lets you declare a different font for your headers from the rest of your text. If you introduce a more elaborate font, limit it to your headers. Because `theme.font` and `theme.sidebar.font` are used to set the font in widget labels, tooltips, column headers, and dataframe cells, they should always be a highly readable font.

For inspiration, see [Fonts in Use](https://fontsinuse.com/).
