---
title: Create a Component
slug: /develop/concepts/custom-components/create
---

# Create a Component

<Note>

If you are only interested in **using Streamlit Components**, then you can skip this section and
head over to the [Streamlit Components Gallery](https://streamlit.io/components) to find and install
components created by the community!

</Note>

Developers can write JavaScript and HTML "components" that can be rendered in Streamlit apps. Streamlit Components can receive data from, and also send data to, Streamlit Python scripts.

Streamlit Components let you expand the functionality provided in the base Streamlit package. Use Streamlit Components to create the needed functionality for your use-case, then wrap it up in a Python package and share with the broader Streamlit community!

**With Streamlit Components you can add new features to your app in the following ways:**

- Create your own components to use in place of existing Streamlit elements and widgets.
- Create completely new Streamlit elements and widgets by wrapping existing React.js, Vue.js, or other JavaScript widget toolkits.
- Render Python objects by constructing HTML representations and styling them to fit your app's theme.
- Create convenience functions to embed commonly-used web features like [GitHub gists and Pastebin](https://github.com/randyzwitch/streamlit-embedcode).

Check out these Streamlit Components tutorial videos by Streamlit engineer Tim Conkling to get started:

## Part 1: Setup and Architecture

<YouTube videoId="BuD3gILJW-Q" />

## Part 2: Make a Slider Widget

<YouTube videoId="QjccJl_7Jco" />
