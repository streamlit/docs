---
title: Use Streamlit Playground in your browser
slug: /get-started/installation/streamlit-playground
---

# Use Streamlit Playground in your browser

The fastest way to try out Streamlit is to try out our Playground! Streamlit Playground runs in your browser. Just visit the Playground, and a limited version of Streamlit loads as browser scripts.

Enjoy the following conveniences:

- Start playing with code right away, completely in your browser.
- No configuration.
- No command line.
- No application installations in your OS.

<Note>
    The Playground is dependendant on your computer's resources because it runs _locally_ in your browser. The setup time can vary depending on your machine and internet connection. Although the Playground has everything you need to get started, to access the full awesomeness of Streamlit, see [Install Streamlit using command line](/get-started/installation/command-line) or [Install Streamlit using Anaconda Distribution](/get-started/installation/anaconda-distribution).
</Note>

## Prerequisites

Because the Playground runs Streamlit in your browser, you should visit the Playground from a personal computer, not a mobile device.

## Go to the Playground

1. Go to [streamlit.io/playground](https://streamlit.io/playground).

1. Wait for [`stlite`](https://github.com/whitphx/stlite) &mdash; a browser-based version of Streamlit &mdash; to load in your browser.

   This can take as little as a few seconds. However, it may take longer depending on your machine and internet. When Streamlit is done loading, an example app is displayed in the right panel.

   ![Streamlit Playground is fully loaded and ready to accept code edits](/images/get-started/Playground-1-loaded.png)

## Create a `Hello World` app

1. From the "EXAMPLES" list, select "**Blank**."

1. On the left, update the contents of the code editor to contain the following code:

   ```python
   import streamlit as st

   st.title("Hello World")
   ```

   A second or two after typing or pasting the code into the editor, the right panel will display the updated app. The code editor saves your edits whenever you pause from typing. Therefore, if you pause between keystrokes as you type a new line of code, you may see an error on the right because Streamlit executed an incomplete line. If this happens, just keep typing to complete the line(s) you are writing. When you pause again at the end of the line, Streamlit reruns the app.

## What's next?

Read about our [Basic concepts](/get-started/fundamentals/main-concepts) and try out more commands in your app.

When you use the Streamlit Playground to work through the basic concepts, you can skip over any instructions to save your file or to select "**Rerun on save**." Streamlit Playground automatically saves your code when you pause from editing, as described above. Also, it is already configured to rerun on save.
