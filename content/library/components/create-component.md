---
title: Create a Component
slug: /library/components/create
---

# Create a Component

<Note>

If you are only interested in **using Streamlit Components**, then you can skip this section and
head over to the [Streamlit Components Gallery](https://streamlit.io/components) to find and install
components created by the community!

</Note>

Starting with version [0.63.0](changelog.html#version-0-63-0), developers can write JavaScript and HTML "components" that can be rendered in Streamlit apps. Streamlit Components can receive data from, and also send data to, Streamlit Python scripts.

Streamlit Components let you expand the functionality provided in the base Streamlit package. Use Streamlit Components to create the needed functionality for your use case, then wrap it up in a Python package and share with the broader Streamlit community!

**Types of Streamlit Components you could create include:**

- Custom versions of existing Streamlit elements and widgets, such as `st.slider` or `st.file_uploader`
- Completely new Streamlit elements and widgets by wrapping existing React.js, Vue.js, or other JavaScript widget toolkits
- Rendering Python objects having methods that output HTML, such as IPython [`__repr_html__`](https://ipython.readthedocs.io/en/stable/config/integrating.html#rich-display)
- Convenience functions for commonly-used web features like [GitHub gists and Pastebin](https://github.com/randyzwitch/streamlit-embedcode)

Check out these Streamlit Components Tutorial videos by Streamlit engineer Tim Conkling to get started:

## Part 1: Setup and Architecture

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/BuD3gILJW-Q" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Part 2: Make a Slider Widget

<iframe width="560" height="315" src="https://www.youtube.com/embed/QjccJl_7Jco" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
