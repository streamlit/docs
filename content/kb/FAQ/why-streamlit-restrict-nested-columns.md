---
title: Why does Streamlit restrict nested st.columns?
slug: /knowledge-base/using-streamlit/why-streamlit-restrict-nested-columns
---

# Why does Streamlit restrict nested `st.columns`?

Starting in version 1.46.0, Streamlit removed explicit limits on nesting columns, expanders, popovers, and chat message containers. To follow best design practices and maintain a good appearance on all screen sizes, don't overuse nested layouts.

From version 1.18.0 to 1.45.0, Streamlit allows nesting [`st.columns`](/develop/api-reference/layout/st.columns) inside other
`st.columns` with the following restrictions:

- In the main area of the app, columns can be nested up to one level of nesting.
- In the sidebar, columns cannot be nested.

These restrictions were in place to make Streamlit apps look good on all device sizes. Nesting columns multiple times often leads to a bad UI.
You might be able to make it look good on one screen size but as soon as a user on a different screen views the app,
they will have a bad experience. Some columns will be tiny, others will be way too long, and complex layouts will look out of place.
Streamlit tries its best to automatically resize elements to look good across devices, without any help from the developer.
But for complex layouts with multiple levels of nesting, this is not possible.
