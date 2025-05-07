---
title: Customize fonts
slug: /develop/concepts/configuration/theming-customize-fonts
---

# Customize fonts in your Streamlit app

Streamlit lets you change and customize the fonts in your app. You can load font files from a public URL or host them with your app using [static file serving](/develop/concepts/configuration/serving-static-files).

## Default Streamlit fonts

Streamlit comes with [Source Sans](https://fonts.adobe.com/fonts/source-sans), [Source Serif](https://fonts.adobe.com/fonts/source-serif), and [Source Code](https://fonts.adobe.com/fonts/source-code-pro) fonts. These font files are included with the Streamlit library to prevent clients from downloading them from a third party. By default, Streamlit uses Source Sans for all text except inline code and code blocks, which use Source Code instead.

To use these default faults, you can set each of the following configuration options to `"sans-serif"` (Source Sans), `"serif"` (Source Serif), or `"monospace"` (Source Code) in `config.toml`:

```toml
[theme]
font = "sans-serif"
headingFront = "sans-serif"
codeFont = "monospace"
[theme.sidebar]
font = "sans-serif"
headingFront = "sans-serif"
codeFont = "monospace"
```

- `theme.font` sets the default font for all text in the app (except inline code and code blocks). This is `"sans-serif"` (Source Sans) by default.
- `theme.headingFont` sets the default font for all headings in the app. If this is not set, Streamlit uses `theme.font` instead.
- `theme.codeFont` sets the default font for all inline code and code blocks. This is `"monospace"` (Source Code) by default.
- `theme.sidebar.font` sets the default font for all text in the sidebar. If this is not set, Streamlit uses `theme.font` instead.
- `theme.sidebar.headingFront` sets the default font for all headings in the sidebar. If this is not set, Streamlit uses (in order of precedence) `theme.headingFont`, `theme.sidebar.font`, or `theme.font` instead.
- `theme.sidebar.codeFont` sets the default font for all inline code and code blocks in the sidebar. If this is not set, Streamlit uses `theme.codeFont` instead.

In the following `config.toml` example, Streamlit uses Source Serif in the main body of the app and Source Sans in the sidebar.

```toml
[theme]
font = "serif"
[theme.sidebar]
font = "sans-serif"
```

## Loading alternative fonts

To use an alternative font in your app, you must declare the font in `config.toml` under `[[theme.fontFaces]]`. For multiple alternative fonts, declare multiple `[[theme.fontFaces]]` tables in your configuration file. You can self-host your font by using Streamlit static file serving or you can point to a publicly hosted font file.

<Important>

Streamlit supports self-hosting for OTF, TTF, WOFF, and WOFF2 font file formats. Other font file formats must be hosted externally.

</Important>

Fonts are defined with the following attributes in their `[[theme.fontFaces]]` tables:

- `font`: This is the name of the font and is used to identify the font for use by other configuration options.
- `url`: This is the location of the font file. If you are self-hosting the font file with your app, the value will be similar to `"app/static/font_file.woff"`.
- `weight` (optional): This declares the weight of the font within the font file (e.g. `400` or `"800"`). For more information, see the [`font-weight`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight) CSS `@font-face` descriptor. This must be an integer or numeric string. Weight ranges and keyword values are not supported.
- `style` (optional): This declares the style of the font within the font file (e.g. `"normal"`, `"italic"`, or `"oblique"`). For more information, see the [`font-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-style) CSS `@font-face` descriptor.

<Note>

Font files can be static or variable. A static font file contains a single weight and style of a font. If you don't declare `weight` and `style`, Streamlit assumes the font is normal weight (400) and normal style. If you use static font files, it is common to load multiple files to fully support the font across different weights (normal, bold) and styles (normal, italic). Variable font files parameterize one or more font attributes, which means a single font file can support multiple weights and/or styles.

The font attributes in `[[theme.fontFaces]]` are passed to the CSS [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) rule. Streamlit passes `font`, `weight`, and `style` to `font-family`, `font-weight`, and `font-style`, respectively.

</Note>

### Example 1: Define an alternative font with variable font files

The following example uses static file serving to host Google's [Noto Sans](https://fonts.google.com/noto/specimen/Noto+Sans) and [Noto Sans Mono](https://fonts.google.com/noto/specimen/Noto+Sans+Mono) fonts and configures the app to use them. Both of these fonts are defined with variable font files which include a parameterized weight. However, because font style is not parameterized, Noto Sans requires two files to define the normal and italic styles separately. Noto Sans Mono does not include a separate file for its italic style. Per [CSS rules](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style#italic), if no italic style is explicitly provided, it will be simulated by skewing the normal-style font.

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

In this configuration example, an alternative font is declared with multiple static font files. For each font,four static files are needed to define the following weight-style pairs:

- normal normal
- normal bold
- italic normal
- italic bold

If one of the files is missing and you try to use its associate weight and style in your app, the user's browser will use the closest font that is available. The following example uses [Tuffy](https://fonts.google.com/specimen/Tuffy) font. The font has four static font files which cover the four weight-style pairs mentioned previously.

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

If you don't want to download and host your font files with your app, you can point to externally hosted font files. If your files aren't host with your app, it's recommended to declare fallback fonts.

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

## Font colors

You can configure color of body text and links. These colors can be set separately for the main body of the app and the sidebar. Each of these configuration options accepts one of the following strings:

- A CSS [`<named-color>`](https://developer.mozilla.org/en-US/docs/Web/CSS/named-color) like `"darkblue"` or `"maroon"`.
- A HEX string like `"#483d8b"` or `"#6A5ACD"`.
- An RGB string like `"rgb(106, 90, 205)"` or `"RGB(70, 130, 180)"`.
- An HSL string like `"hsl(248, 53%, 58%)"` or `"HSL(147, 50%, 47%)"`.

<Tip>

While it is possible for you to specify an alpha value for your font colors, this isn't recommended. Streamlit adjusts the alpha value of your font color to ensure contextually appropriate shading on different background colors.

</Tip>

The following configuration is equivalent to Streamlit's default light theme:

```toml
[theme]
textColor = "#31333F"
linkColor = "#0068c9"
[theme.sidebar]
textColor = "#31333F"
linkColor = "#0068c9"
```

- `theme.textColor` sets the default font color for all text in the app except language-highlighting in code blocks, inline code, and links.
- `theme.linkColor` sets the default font color for all Markdown links in the app. (`st.page_link` and `st.link_button` use `theme.textColor`.)
- `theme.sidebar.textColor` sets the default font color for all text in the sidebar except language-highlighting in code blocks, inline code, and links. If this is not set, Streamlit uses `theme.textColor` instead.
- `theme.sidebar.linkColor` sets the default font color for all Markdown links in the sidebar. If this is not set, Streamlit uses `theme.linkColor` instead.

## Font size

You can set the base font size for your app in pixels. You must specify the base font size as an integer. The following configuration is equivalent to the default base font size of 16 pixels:

```toml
[theme]
baseFontSize=16
```
