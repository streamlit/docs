---
title: st.user
slug: /develop/api-reference/user/st.user
description: st.experimental_user returns information about the logged-in user of private apps on Streamlit Community Cloud.
---

<Important>

This is an experimental feature. Experimental features and their APIs may change or be removed at any time. To learn more, click [here](/develop/quick-reference/prerelease#experimental-features).

</Important>

<Autofunction function="streamlit.experimental_user" />

### Community Cloud

On Community Cloud, if your app is not configured for authentication, `st.experimental_user` will have a single attribute: `email`. If a user is logged in and a member of your app's workspace, this will return the user's email. For all other cases, it returns `None`.

On Community Cloud, if your app is configured for authentication (`[auth]` exists in your app's secrets), `st.experimental_user` will behave the same as a locally running app. Make sure to update your identity provider's configuration and your app's secrets to allow your new domain. If needed, a list of [IP addresses](/deploy/streamlit-community-cloud/status#ip-addresses) used by Community Cloud is available. An authentication-configured app counts as your one, allowed private app.

<Autofunction function="streamlit.experimental_user.to_dict" />
