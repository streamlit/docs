---
title: Use Streamlit Playground in your browser
slug: /get-started/installation/streamlit-playground
description: Quick start guide to Streamlit using the Streamlit Playground - no installation required.
---

# Use Streamlit Playground in your browser

The fastest way to try out Streamlit is to try out our Playground! Streamlit Playground runs in your browser. Just visit the Playground, and a _limited_ version of Streamlit loads as browser scripts.

Enjoy the following conveniences:

- Start playing with code right away, completely in your browser.
- No configuration.
- No command line.
- No application installations in your OS.

<Important>

Although the Playground has everything you need to get started, it doesn't contain the full version of Streamlit. To access the full awesomeness of Streamlit, see [Install Streamlit using command line](/get-started/installation/command-line) or [Install Streamlit using Anaconda Distribution](/get-started/installation/anaconda-distribution).

</Important>

## Prerequisites

Because the Playground runs Streamlit _locally_ in your browser, you should visit the Playground from a personal computer, not a mobile device.

## Go to the Playground

1. Go to [streamlit.io/playground](https://streamlit.io/playground).

1. Wait for the playground to load.

   Behind the scenes, the site installs a browser-based version of Python and Streamlit. This can take as little as a few seconds. The setup time can vary depending on your machine and internet connection. When Streamlit is done loading, an example app is displayed in the right panel.

   ![Streamlit Playground is fully loaded and ready to accept code edits](/images/get-started/Playground-1-loaded.png)

1. Optional: To view different examples, above the editor, select them from the examples list.

## Create a `Hello World` app

1. From the "EXAMPLES" list, select "**Blank**."

1. On the left, update the contents of the code editor to contain the following code:

   ```python
   import streamlit as st

   st.write("Hello World")
   ```

   A second or two after typing or pasting the code into the editor, the right panel will display the updated app. The code editor saves your edits whenever you pause from typing. Therefore, if you pause between keystrokes as you type a new line of code, you may see an error on the right because Streamlit executed an incomplete line. If this happens, just keep typing to complete the line(s) you are writing. When you pause again at the end of the line, Streamlit reruns the app.

1. On the left, change `st.write` to `st.title` so the code editor has the following code:

   ```python
   import streamlit as st

   st.title("Hello World")
   ```

   A second after you stop typing, Streamlit reruns the app and updates the display on the right.

1. Keep making changes! Watch as your edits are automatically saved and the new result is displayed on the right.

## What's next?

- Option 1: If you're already intrigued and ready to install Streamlit on your computer, see one of the options to [Install Streamlit on your machine](/get-started/installation#install-on-your-machine).

- Option 2: Otherwise, you can keep using the playground while you read about our [Basic concepts](/get-started/fundamentals/main-concepts) and try out more commands in your app.

  When you use the Streamlit Playground to work through the basic concepts, you can skip over any instructions to save your file or to select "**Rerun on save**." Streamlit Playground automatically saves your code when you pause from editing, as described above. Also, it is already configured to rerun on save.
