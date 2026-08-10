---
title: Oh no. Error running app
slug: /knowledge-base/using-streamlit/oh-no-error-running-app
---

# Oh no. Error running app

## Resource limits

All Streamlit Community Cloud users have access to the same resources and are subject to the same limits (1 GB of RAM).

If your app exceeds its resource limits, developers and viewers alike will see '😦 Oh no.'

<div style={{ maxWidth: '70%', margin: 'auto' }}>
<Image alt="App state: Oh no. Error running your app." src="/images/streamlit-community-cloud/app-state-oh-no.png" />
</div>

## Checking for errors

If you see the '😦 Oh no.' message when viewing your app, first check your Cloud logs for any specific errors. If there are no errors in your Cloud logs you are likely dealing with a resource issue. In other words, the app may have exceeded its allocated resource limit.

If you are logged into a developer account for an app over its limits, you can access "**Manage app**" from the lower-right corner of the app to reboot it and clear its memory. "**Manage app**" will be red and have a warning icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>error</i>).

![Developer view: Oh no. Error running your app.](/images/streamlit-community-cloud/app-state-oh-no-developer.png)

## Optimizing the app

There are a few things you can change in your app to make it less resource-hungry:

- Reboot your app (temporary fix)
- Use `st.cache_data` or `st.cache_resource` to load models or data only once
- Restrict the cache size with `ttl` or `max_entries`
- Move big datasets to a database
- Profile your app's memory usage

## Solution

To address this issue, we highly recommend going through and implementing the suggestions in the following blog posts to prevent your app from hitting the resource limits and to detect if your Streamlit app leaks memory:

- <a href="https://blog.streamlit.io/common-app-problems-resource-limits/" target="_blank">Common app problems: Resource limits</a>
- <a href="https://blog.streamlit.io/3-steps-to-fix-app-memory-leaks/" target="_blank">3 steps to fix app memory leaks</a>

The following blogs also provide userful tips for improving loading speed and performance:

- <a href="https://blog.streamlit.io/how-to-improve-streamlit-app-loading-speed/" target="_blank">How to improve Streamlit app loading speed</a>
- <a href="https://blog.streamlit.io/six-tips-for-improving-your-streamlit-app-performance/" target="_blank">6 tips for improving your Streamlit app performance</a>

