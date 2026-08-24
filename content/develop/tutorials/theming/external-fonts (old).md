---
title: Use externally hosted fonts and fallbacks to customize your font (streamlit<1.50.0)
slug: /develop/tutorials/configuration-and-theming/external-fonts-old
description: Learn how to use externally hosted fonts and font fallbacks to customize typography in Streamlit apps with variable font files and external resources.
keywords: external fonts, font fallbacks, font customization, variable fonts, typography, externally hosted fonts, font loading, custom fonts
---

# Use externally hosted fonts and fallbacks to customize your font (`streamlit<1.50.0`)

<Note>

A simpler method for using externally hosted fonts was introduced in Streamlit version 1.50.0. For a newer version of this tutorial, see [Use externally hosted fonts and fallbacks to customize your font](/develop/tutorials/configuration-and-theming/external-fonts).

</Note>

Streamlit comes with Source Sans as the default font, but you can configure your app to use another font. This tutorial uses variable font files and is a walkthrough of Example 3 from [Customize fonts in your Streamlit app](/develop/concepts/configuration/theming-customize-fonts#example-1-define-an-alternative-font-with-variable-font-files). For an example that uses self-hosted variable font files, see [Use variable font files to customize your font](/develop/tutorials/configuration-and-theming/variable-fonts). For an example that uses self-hosted static font files, see [Use static font files to customize your font](/develop/tutorials/configuration-and-theming/static-fonts).

## Prerequisites

- This tutorial requires the following version of Streamlit:

  ```text
  streamlit>=1.46.0
  ```

- You should have a clean working directory called `your-repository`.
- You should have a basic understanding of working with font files in web development. Otherwise, start by reading [Customize fonts in your Streamlit app](/develop/concepts/configuration/theming-customize-fonts) up to Example 3.

## Summary

The following example uses a Google-hosted instances of [Nunito](https://fonts.google.com/specimen/Nunito) and [Space Mono](https://fonts.google.com/specimen/Space+Mono). Nunito is defined in variable font files. However, because font style is not parameterized, Nunito requires two files to define the normal and italic styles separately. Space Mono is defined in static font files.

Here's a look at what you'll build:

<Collapse title="Complete config.toml file" expanded={false}>

Directory structure:

```none
your_repository/
├── .streamlit/
│   └── config.toml
└── streamlit_app.py
```

`.streamlit/config.toml`:

```toml
[[theme.fontFaces]]
family="Nunito"
url="https://fonts.gstatic.com/s/nunito/v31/XRXX3I6Li01BKofIMNaDRs7nczIH.woff2"
style="italic"
weight="200 1000"
[[theme.fontFaces]]
family="Nunito"
url="https://fonts.gstatic.com/s/nunito/v31/XRXV3I6Li01BKofINeaBTMnFcQ.woff2"
style="normal"
weight="200 1000"
[[theme.fontFaces]]
family="Space Mono"
url="https://fonts.gstatic.com/s/spacemono/v17/i7dNIFZifjKcF5UAWdDRYERMR3K_MQacbw.woff2"
style="italic"
weight="400"
[[theme.fontFaces]]
family="Space Mono"
url="https://fonts.gstatic.com/s/spacemono/v17/i7dPIFZifjKcF5UAWdDRYEF8RXi4EwQ.woff2"
style="normal"
weight="400"
[[theme.fontFaces]]
family="Space Mono"
url="https://fonts.gstatic.com/s/spacemono/v17/i7dSIFZifjKcF5UAWdDRYERE_FeqHCSRRXaPYw.woff2"
style="italic"
weight="700"
[[theme.fontFaces]]
family="Space Mono"
url="https://fonts.gstatic.com/s/spacemono/v17/i7dMIFZifjKcF5UAWdDRaPpZUFWaHi6WZ3Q.woff2"
style="normal"
weight="700"

[theme]
font="Nunito, sans-serif"
codeFont="'Space Mono', monospace"
```

`streamlit_app.py`:

```
import streamlit as st

st.write("Normal efg")
st.write("*Italic efg*")
st.write("**Bold efg**")
st.write("***Bold-italic efg***")
st.write("`Code normal efg`")
st.write("*`Code italic efg`*")
st.write("**`Code bold efg`**")
st.write("***`Code bold-italic efg`***")
```

</Collapse>

## Collect your font file URLs

1. Go to [Google fonts](https://fonts.google.com/).

1. Search for or follow the link to [Nunito](https://fonts.google.com/specimen/Nunito), and select "**Get font**."

1. Search for or follow the link to [Space Mono](https://fonts.google.com/specimen/Space+Mono), and select "**Get font**."

1. To get a link to a style sheet for your font files, in the upper-right corner, select the shopping bag (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>shopping_bag</i>), and then select "<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>code</i> **Get embed code**."

1. On the right, in the first code block, copy the `href` URL from the third link, and paste it into a new tab.

   By default, the "Embed Code" page loads with the "Web" tab and "&lt;link&gt;" radio option selected. The first code block is titled, "Embed code in the &lt;head&gt; of your html." The URL is a link to a style sheet and should look like the following text:

   ```none
   https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap
   ```

1. Go to your new tab and visit the URL.

   This page is a style sheet. It is filled with font-face declarations that look like the following text:

   ```css
   /* cyrillic-ext */
   @font-face {
     font-family: "Nunito";
     font-style: italic;
     font-weight: 200 1000;
     font-display: swap;
     src: url(https://fonts.gstatic.com/s/nunito/v31/XRXX3I6Li01BKofIMNaORs7nczIHNHI.woff2)
       format("woff2");
     unicode-range:
       U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
   }
   ```

   Each font-face declaration starts with a comment to indication which character set is included in that declaration. For most English apps, only the `/* latin */` declarations are needed.

1. To store the portion of the style sheet you'll need in later steps, copy the font-face declarations that are prefixed with the `/* latin */` comment, and paste them into a text file.

## Create your app configuration

1. In `your_repository/`, create a `.streamlit/config.toml` file:

   ```none
   your_repository/
   └── .streamlit/
       └── config.toml
   ```

1. To define your alternative fonts, in `.streamlit/config.toml`, paste each `@font-face` declaration, and change each one into a `[[theme.fontFaces]]` table.

   The following values in each `@font-face` declaration become the indicated value in a `[[theme.fontFaces]]` table:
   - `font-family` → `family`
   - `src: url` → `url` (Ignore `format`, and just keep the URL.)
   - `font-style` → `style`
   - `font-weight` → `weight`
   - Optional: `unicode-range` → `unicodeRange` (This is only useful if you are using more than basic latin sets.)

   Remember to remove the comment lines and CSS syntax characters, which aren't compatible with TOML files. Your configuration file should contain the following text:

   ```toml
    [[theme.fontFaces]]
    family="Nunito"
    url="https://fonts.gstatic.com/s/nunito/v31/XRXX3I6Li01BKofIMNaDRs7nczIH.woff2"
    style="italic"
    weight="200 1000"
    [[theme.fontFaces]]
    family="Nunito"
    url="https://fonts.gstatic.com/s/nunito/v31/XRXV3I6Li01BKofINeaBTMnFcQ.woff2"
    style="normal"
    weight="200 1000"
    [[theme.fontFaces]]
    family="Space Mono"
    url="https://fonts.gstatic.com/s/spacemono/v17/i7dNIFZifjKcF5UAWdDRYERMR3K_MQacbw.woff2"
    style="italic"
    weight="400"
    [[theme.fontFaces]]
    family="Space Mono"
    url="https://fonts.gstatic.com/s/spacemono/v17/i7dPIFZifjKcF5UAWdDRYEF8RXi4EwQ.woff2"
    style="normal"
    weight="400"
    [[theme.fontFaces]]
    family="Space Mono"
    url="https://fonts.gstatic.com/s/spacemono/v17/i7dSIFZifjKcF5UAWdDRYERE_FeqHCSRRXaPYw.woff2"
    style="italic"
    weight="700"
    [[theme.fontFaces]]
    family="Space Mono"
    url="https://fonts.gstatic.com/s/spacemono/v17/i7dMIFZifjKcF5UAWdDRaPpZUFWaHi6WZ3Q.woff2"
    style="normal"
    weight="700"
   ```

   The `[[theme.fontFaces]]` table can be repeated to use multiple files to define a single font or to define multiple fonts. In this example, the definitions make `"Nunito"` and `"Space Mono"` available to other font configuration options.

1. To set your alternative fonts as the default font for your app, in `.streamlit/config.toml`, add the following text:

   ```toml
    [theme]
    font="Nunito, sans-serif"
    codeFont="'Space Mono', monospace"
   ```

   This sets Nunito as the default for all text in your app except inline code and code blocks, which will be Space Mono instead. If Google's font service is unavailable, the app will fall back to the indicated built-in fonts. Because there is a space in "Space Mono", the configuration option needs an inner quote on that family. If you want to avoid inner quotes, you can use hyphens or underscores in your font family declarations.

## Build the example

To verify that your font is loaded correctly, create a simple app.

### Initialize your app

1. In your_repository, create a file named `streamlit_app.py`.

1. In a terminal, change directories to your_repository, and start your app:

   ```bash
   streamlit run streamlit_app.py
   ```

   Your app will be blank because you still need to add code.

1. In `streamlit_app.py`, write the following:

   ```
   import streamlit as st
   ```

1. Save your `streamlit_app.py` file, and view your running app.

1. In your app, select "**Always rerun**", or press the "**A**" key.

   Your preview will be blank but will automatically update as you save changes to `streamlit_app.py`.

1. Return to your code.

### Display some text in your app

1. Create a `streamlit_app.py` file in your working directory.

1. In `streamlit_app.py`, add the following text:

   ```
   import streamlit as st

   st.write("Normal efg")
   st.write("*Italic efg*")
   st.write("**Bold efg**")
   st.write("***Bold-italic efg***")
   st.write("`Code normal efg`")
   st.write("*`Code italic efg`*")
   st.write("**`Code bold efg`**")
   st.write("***`Code bold-italic efg`***")
   ```

   The example includes "efg" in each line to better show the typographical differences when you run your app. In Space Mono, the italic "f" descends below baseline, but the normal "f" doesn't. Space Mono also has different serifs on its normal and italic "l."

1. Save your `streamlit_app.py` file, and view your running app.
