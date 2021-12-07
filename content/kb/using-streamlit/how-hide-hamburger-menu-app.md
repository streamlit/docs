---
title: How do I hide the hamburger menu from my app?
slug: /knowledge-base/using-streamlit/how-hide-hamburger-menu-app
---

# How do I hide the hamburger menu from my app?

## Overview

Streamlit allows developers to configure their hamburger menu to be more user-centric via [`st.set_page_config()`](/library/api-reference/utilities/st.set_page_config). While you can configure menu items with `st.set_page_config()`, there is no native support to hide/remove the menu from your app.

<div style={{ marginBottom: '-3em' }}>
<Flex>
<Image caption="1: A hamburger menu appears on the top-right side of your app." src="/images/knowledge-base/hamburger-menu-app.png" />
<Image caption="2: Hamburger menu hidden with an unofficial CSS hack." src="/images/knowledge-base/hamburger-menu-removed.png" />
</Flex>
</div>

## Solution

You can, however, use an unofficial CSS hack with [`st.markdown()`](/library/api-reference/text/st.markdown) to hide the menu from your app. To do so, include the following code snippet in your app:

```python
import streamlit as st

hide_menu_style = """
        <style>
        #MainMenu {visibility: hidden;}
        </style>
        """
st.markdown(hide_menu_style, unsafe_allow_html=True)
```

The hamburger menu will no longer appear on the top-right side of your app (as shown in image 2)! 🎈

## Relevant resources:

- [Ability to hide the hamburger menu #395](https://github.com/streamlit/streamlit/issues/395)
- [How do I hide/ remove the menu in production?](https://discuss.streamlit.io/t/how-do-i-hide-remove-the-menu-in-production/362/12)
- [Unofficial CSS hack to remove the hamburger menu](https://www.youtube.com/watch?v=0_HlInz6HuM)
- [Officially supported method to configure the hamburger menu](/library/api-reference/utilities/st.set_page_config)
- [Streamlit’s current roadmap](https://roadmap.streamlit.io/)
