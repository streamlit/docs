---
title: Argh. This app has gone over its resource limits
slug: /knowledge-base/deploy/resource-limits
---

Sorry! It means you've hit the resource limits of your [Streamlit Cloud](https://streamlit.io/cloud) account. One way to avoid this is to [upgrade your plan](https://streamlit.io/cloud) to one with higher resource limits. But there are also a few things you can change in your app to make it less resource-hungry:

- Reboot your app (temporary fix)
- Use `st.cache` to load models or data only once
- Restrict the cache size with `ttl` or `max_entries`
- Move big datasets to a database
- Profile your app's memory usage

Check out our [blog post](https://blog.streamlit.io/common-app-problems-resource-limits/) on [“Common app problems: Resource limits”](https://blog.streamlit.io/common-app-problems-resource-limits/) for more in-depth tips prevent your app from hitting the resource limits of the Streamlit Cloud.

Related forum posts:
- https://discuss.streamlit.io/t/common-app-problems-resource-limits/16969
- https://blog.streamlit.io/common-app-problems-resource-limits/