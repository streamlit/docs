---
title: App model summary
slug: /get-started/main-concepts/summary
---

# App model summary

Now that you know a little more about all the individual pieces, let's close
the loop and review how it works together:

1. Streamlit apps are Python scripts that run from top to bottom
1. Every time a user opens a browser tab pointing to your app, the script is
   re-executed
1. As the script executes, Streamlit draws its output live in a browser
1. Scripts use the Streamlit cache to avoid recomputing expensive functions, so
   updates happen very fast
1. Every time a user interacts with a widget, your script is re-executed and
   the output value of that widget is set to the new value during that run.
1. Streamlit apps can contain multiple pages, which are defined in separate
   `.py` files in a `pages` folder.

![The Streamlit app model](/images/app_model.png)
