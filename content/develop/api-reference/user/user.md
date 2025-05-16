---
title: st.user
slug: /develop/api-reference/user/st.user
description: st.user returns information about the logged-in user of private apps on Streamlit Community Cloud.
---

<Autofunction function="streamlit.user" oldName="streamlit.experimental_user" />

### Community Cloud

Only Streamlit versions 1.41.0 and below can read user email from a Community Cloud account. To use `st.user` in Streamlit versions 1.42.0 and later, you must configure authentication (`[auth]`) in your app's secrets. Remember to update your identity provider's configuration and your app's secrets to allow your new domain. A list of [IP addresses](/deploy/streamlit-community-cloud/status#ip-addresses) used by Community Cloud is available if needed. An authentication-configured app counts as your one, allowed private app.

<Autofunction function="streamlit.user.to_dict" oldName="streamlit.experimental_user.to_dict" />
