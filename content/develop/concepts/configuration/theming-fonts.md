---
title: Custom fonts
slug: /develop/concepts/configuration/theming-custom-fonts
---

# Custom fonts in your Streamlit app

Streamlit lets you use custom fonts in your app. You can load these fonts from a public URL or host them with your app using [static file serving](/develop/concepts/configuration/serving-static-files).

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
- `theme.headingFont` sets the default font for all headings in the app. If this is not set, it uses `theme.font` instead.
- `theme.codeFont` sets the default font for all inline code and code blocks. This is `"monospace"` (Source Code) by default.
- `theme.sidebar.font` sets the default font for all text in the sidebar. If this is not set, it uses `theme.font` instead.
- `theme.sidebar.headingFront` sets the default font for all headings in the sidebar. If this is not set, it uses (in order of precedence) `theme.headingFont`, `theme.sidebar.font`, or `theme.font` instead.
- `theme.sidebar.codeFont` sets the default font for all inline code and code blocks in the sidebar. If this is not set, it uses `theme.codeFont` instead.

In the following `config.toml` example, Streamlit uses Source Serif in the main body of the app and Source Sans in the sidebar.

```toml
[theme]
font = "serif"
[theme.sidebar]
font = "sans-serif"
```

## Loading custom fonts

To use a custom font in your app, you must declare the font in `config.toml` under `[[theme.fontFaces]]`. For multiple custom fonts, declare multiple `[[theme.fontFaces]]` tables in your configuration file. You can self-host your font by using Streamlit static file serving or you can point to a publicly hosted font file.

<Important>

Streamlit supports self-hosting for OTF, TTF, WOFF, and WOFF2 font file formats. Other font file formats must be hosted externally.

</Important>

Each font needs the following attributes in its `[[theme.fontFaces]]` table:

- `font`: This is the name of the font and is used to identify the font for use by other configuration options.
- `url`: This is the location of the font file. If you are self-hosting the font file with your app, the value will be similar to `"app/static/font_file.woff"`.
- `weight` (optional): This declares the weight of the font within the font file (e.g. `"normal"`, `"bold"`, `800`).
- `style` (optional): This declares the style of the font within the font file (e.g. `"normal"`, `"italic"`, or `"oblique"`).

<Note>

Font files can be static or variable. A static font file contains a single weight and style of a font. If you don't declare `weight` and `style`, Streamlit assumes the font is normal weight (400) and normal style. If you use static font files, it is common to load multiple files to fully support the font across different weights (normal, bold) and styles (normal, italic). Variable font files parameterize one or more font attributes, which means a single font file can support multiple weights and/or styles.

The font attributes in `[[theme.fontFaces]]` are passed to the CSS [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) rule. Streamlit passes `font`, `url`, `weight`, and `style` to `font-family`, `src`, `font-weight`, and `font-style`, respectively.

</Note>

### Example 1: Define a custom font with a variable font file

The following example uses static file serving to host Google's [Noto Sans](https://fonts.google.com/noto/specimen/Noto+Sans) and [Noto Sans Mono](https://fonts.google.com/noto/specimen/Noto+Sans+Mono) fonts and configures the app to use these fonts. Both of these fonts are variable fonts which include a parameterized weight. When no italic font is defined, it is [standard CSS behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/font-style#italic) to simulate the italic style by skewing the normal-style font.

<Collapse title="Complete config.toml file" expanded={false}>

```toml
[server]
enableStaticServing = true

[[theme.fontFaces]]
family="noto-sans"
url="app/static/NotoSans-VariableFont_wdth,wght.ttf"
[[theme.fontFaces]]
family="noto-mono"
url="app/static/NotoSansMono-VariableFont_wdth,wght.ttf"

[theme]
font="noto-sans"
codeFont="noto-mono"
```

</Collapse>

1. Download your font files from their source.

1. Save your font files in at `static/` directory within your working directory.

   In this example, the font files are `NotoSans-VariableFont_wdth,wght.ttf` and `NotoSansMono-VariableFont_wdth,wght.ttf` for Noto Sans and Noto Sans Mono, respectively. Your file structure should be as follows:

   ```none
   working_directory/
   ├── .streamlit/
   │   └── config.toml
   ├── static/
   │   ├── NotoSans-VariableFont_wdth,wght.ttf
   │   └── NotoSansMono-VariableFont_wdth,wght.ttf
   └── streamlit_app.py
   ```

1. Create a `.streamlit/config.toml` file in your working directory.

1. To enable static file serving, in `.streamlit/config.toml`, add the following text:

   ```toml
   [server]
   enableStaticServing = true
   ```

   This makes the files in your `static/` directory publicly available through your app's URL at the relative path `app/static/{filename}`.

1. To define your custom fonts, in `.streamlit/config.toml`, add the following text:

   ```toml
   [[theme.fontFaces]]
   family="noto-sans"
   url="app/static/NotoSans-VariableFont_wdth,wght.ttf"
   [[theme.fontFaces]]
   family="noto-mono"
   url="app/static/NotoSansMono-VariableFont_wdth,wght.ttf"
   ```

   The `[[theme.fontFaces]]` table can be repeated to define multiple fonts. These definitions make `"noto-sans"` and `"noto-mono"` available to other font configuration options.

1. To set your custom fonts as the default font for your app, in `.streamlit/config.toml`, add the following text:

   ```toml
   [theme]
   font="noto-sans"
   codeFont="noto-mono"
   ```

   This sets Noto Sans as the default for all text in your app except inline code and code blocks, which will use Noto Sans Mono instead.

### Example 2: Define a custom font with static font files

In this configuration example, a custom font is declared with multiple static font files. For each font,four static files are needed to define the following weight-style pairs:

- normal normal
- normal bold
- italic normal
- italic bold

### Example 3: Define a custom font with fallbacks

`{Use and external hosted source and fallback to a local source}`

## Font colors

`{textColor, linkColor, codeBackgroundColor, plus sidebar}`

## Font size

`{baseFontSize}`
