---
title: Use static font files to customize your font
slug: /develop/tutorials/configuration-and-theming/static-fonts
description: Learn how to use static font files to customize typography in Streamlit apps with self-hosted font files and multiple font weight configurations.
keywords: static fonts, font customization, self-hosted fonts, typography, font files, custom fonts, font loading, static font files, theming, font weights
---

# Use static font files to customize your font

Streamlit comes with Source Sans as the default font, but you can configure your app to use another font. This tutorial uses static font files and is a walkthrough of Example 2 from [Customize fonts in your Streamlit app](/develop/concepts/configuration/theming-customize-fonts#example-2-define-an-alternative-font-with-static-font-files). For an example that uses variable font files, see [Use variable font files to customize your font](/develop/tutorials/configuration-and-theming/variable-fonts).

## Prerequisites

- This tutorial requires the following version of Streamlit:

  ```text
  streamlit>=1.45.0
  ```

- You should have a clean working directory called `your-repository`.
- You should have a basic understanding of [static file serving](/develop/concepts/configuration/serving-static-files).
- You should have a basic understanding of working with font files in web development. Otherwise, start by reading [Customize fonts in your Streamlit app](/develop/concepts/configuration/theming-customize-fonts) up to Example 2.

## Summary

The following example uses [Tuffy](https://fonts.google.com/specimen/Tuffy) font. The font has four static font files which cover the four following weight-style pairs:

- normal normal
- normal bold
- italic normal
- italic bold

Here's a look at what you'll build:

<Collapse title="Complete config.toml file" expanded={false}>

Directory structure:

```none
your_repository/
├── .streamlit/
│   └── config.toml
├── static/
│   ├── Tuffy-Bold.ttf
│   ├── Tuffy-BoldItalic.ttf
│   ├── Tuffy-Italic.ttf
│   └── Tuffy-Regular.ttf
└── streamlit_app.py
```

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

`streamlit_app.py`:

```
import streamlit as st

st.write("Normal ABCabc123")
st.write("*Italic ABCabc123*")
st.write("**Bold ABCabc123**")
st.write("***Bold-italic ABCabc123***")
st.write("`Code ABCabc123`")
```

</Collapse>

## Download and save your font files

1. Go to [Google fonts](https://fonts.google.com/).

1. Search for or follow the link to [Tuffy](https://fonts.google.com/specimen/Tuffy), and select "**Get font**."

1. To download your font files, in the upper-right corner, select the shopping bag (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>shopping_bag</i>), and then select "<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>download</i> **Download all**."

1. In your downloads directory, unzip the downloaded file.

1. From the unzipped files, copy and save the TTF font files into a `static/` directory in `your_repository/`.

   Copy the following files:

   ```none
   Tuffy/
   ├── Tuffy-Bold.ttf
   ├── Tuffy-BoldItalic.ttf
   ├── Tuffy-Italic.ttf
   └── Tuffy-Regular.ttf
   ```

   Save those files in your repository:

   ```none
   your_repository/
   └── static/
       ├── Tuffy-Bold.ttf
       ├── Tuffy-BoldItalic.ttf
       ├── Tuffy-Italic.ttf
       └── Tuffy-Regular.ttf
   ```

## Create your app configuration

1. In `your_repository/`, create a `.streamlit/config.toml` file:

   ```none
   your_repository/
   ├── .streamlit/
   │   └── config.toml
   └── static/
       ├── Tuffy-Bold.ttf
       ├── Tuffy-BoldItalic.ttf
       ├── Tuffy-Italic.ttf
       └── Tuffy-Regular.ttf
   ```

1. To enable static file serving, in `.streamlit/config.toml`, add the following text:

   ```toml
   [server]
   enableStaticServing = true
   ```

   This makes the files in your `static/` directory publicly available through your app's URL at the relative path `app/static/{filename}`.

1. To define your alternative fonts, in `.streamlit/config.toml`, add the following text:

   ```toml
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
   ```

   The `[[theme.fontFaces]]` table can be repeated to use multiple files to define a single font or to define multiple fonts. In this example, the definitions make `"tuffy"` available to other font configuration options.

   <Tip>

   For convenience, avoid spaces in your font family names. When you declare the default font, you can also declare fallback fonts. If you avoid spaces in your font family names, you don't need inner quotes.

   </Tip>

1. To set your alternative fonts as the default font for your app, in `.streamlit/config.toml`, add the following text:

   ```toml
   [theme]
   font="tuffy"
   ```

   This sets Tuffy as the default for all text in your app except inline code and code blocks.

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

   st.write("Normal ABCabc123")
   st.write("*Italic ABCabc123*")
   st.write("**Bold ABCabc123**")
   st.write("***Bold-italic ABCabc123***")
   st.write("`Code ABCabc123`")
   ```

1. Save your `streamlit_app.py` file, and view your running app.
