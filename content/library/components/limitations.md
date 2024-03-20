---
title: Limitations of custom components
slug: /develop/concepts/custom-components/limitations
---

# Limitations of custom components

## How do Streamlit Components differ from functionality provided in the base Streamlit package?

- Streamlit Components are wrapped up in an iframe, which gives you the ability to do whatever you want (within the iframe) using any web technology you like.

- There is a strict message protocol between Components and Streamlit, which makes possible for Components to act as widgets. As Streamlit Components are wrapped in iframe, they cannot modify their parent’s DOM (a.k.a the Streamlit report), which ensures that Streamlit is always secure even with user-written components.

## What types of things aren't possible with Streamlit Components?

Because each Streamlit Component gets mounted into its own sandboxed iframe, this implies a few limitations on what is possible with Components:

- **Can't communicate with other Components**: Components can’t contain (or otherwise communicate with) other components, so Components cannot be used to build something like `grid_layout`
- **Can't modify CSS**: A Component can’t modify the CSS that the rest of the Streamlit app uses, so you can't create something like `dark_mode`
- **Can't add/remove elements**: A Component can’t add or remove other elements of a Streamlit app, so you couldn't make something like `remove_streamlit_app_menu`

## My Component seems to be blinking/stuttering...how do I fix that?

Currently, no automatic debouncing of Component updates is performed within Streamlit. The Component creator themselves can decide to rate-limit the updates they send back to Streamlit.
