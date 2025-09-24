---
title: Use externally hosted fonts and fallbacks to customize your font
slug: /develop/tutorials/configuration-and-theming/external-fonts
description: Learn how to use externally hosted fonts and font fallbacks to customize typography in Streamlit apps with variable font files and external resources.
keywords: external fonts, font fallbacks, font customization, variable fonts, typography, externally hosted fonts, font loading, custom fonts
---

# Use externally hosted fonts and fallbacks to customize your font

Streamlit comes with Source Sans as the default font, but you can configure your app to use another font. This tutorial uses variable font files and is a walkthrough of Example 3 from [Customize fonts in your Streamlit app](/develop/concepts/configuration/theming-customize-fonts#example-1-define-an-alternative-font-with-variable-font-files). For an example that uses self-hosted variable font files, see [Use variable font files to customize your font](/develop/tutorials/configuration-and-theming/variable-fonts). For an example that uses self-hosted static font files, see [Use static font files to customize your font](/develop/tutorials/configuration-and-theming/static-fonts).

This tutorial uses inline font definitions, which were introduced in Streamlit version 1.50.0. For an older workaround, see [Use externally hosted fonts and fallbacks to customize your font (`streamlit<1.50.0`)](/develop/tutorials/configuration-and-theming/external-fonts-old).

## Prerequisites

- This tutorial requires the following version of Streamlit:

  ```text
  streamlit>=1.50.0
  ```

- You should have a clean working directory called `your-repository`.
- You should have a basic understanding of working with font files in web development. Otherwise, start by reading [Customize fonts in your Streamlit app](/develop/concepts/configuration/theming-customize-fonts) up to Example 3.

## Summary

The following example uses Google-hosted instances of [Nunito](https://fonts.google.com/specimen/Nunito) and [Space Mono](https://fonts.google.com/specimen/Space+Mono).

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
[theme]
font="Nunito:https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000, sans-serif"
codeFont="'Space Mono':https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap, monospace"
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

## Collect your font CSS URLs

1. To collect your URLs to use in later steps, open a text editor.

   Remember to label the values as you paste them so you don't mix them up.

1. Go to [Google fonts](https://fonts.google.com/).

1. Search for or follow the link to [Nunito](https://fonts.google.com/specimen/Nunito), and select "**Get font**."

1. To get a link to a style sheet for your font files, in the upper-right corner, select the shopping bag (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>shopping_bag</i>), and then select "<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>code</i> **Get embed code**."

1. On the right, in the first code block, copy the `href` URL from the third link, and paste it into your text editor.

   By default, the "Embed Code" page loads with the "Web" tab and "&lt;link&gt;" radio option selected. The first code block is titled, "Embed code in the &lt;head&gt; of your html." The URL is a link to a style sheet and should look like the following text:

   ```none
   https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000
   ```

1. To remove Nunito from your list and get a clean URL for Space Mono, select the trash can (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>delete</i>). Then, repeat the previous three steps for [Space Mono](https://fonts.google.com/specimen/Space+Mono).

   The URL should look like the following text:

   ```none
   https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap
   ```

1. In your text editor, modify each URL by prepending its font family and a colon separator:

   ```none
   Nunito:https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000
   'Space Mono':https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap
   ```

   Because Space Mono has a space in its name, use single quotes around the font family. These will be inner quotes when the string is later copied into your configuration file.

## Create your app configuration

1. In `your_repository/`, create a `.streamlit/config.toml` file:

   ```none
   your_repository/
   └── .streamlit/
       └── config.toml
   ```

1. To set your alternative fonts as the default font for your app, in `.streamlit/config.toml`, add the following text:

   ```toml
    [theme]
    font="Nunito:https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000, sans-serif"
    codeFont="'Space Mono':https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap, monospace"
   ```

   This sets Nunito as the default for all text in your app except inline code and code blocks, which will be Space Mono instead. If Google's font service is unavailable, the app will fall back to the indicated built-in fonts.

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
