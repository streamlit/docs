---
title: st.user
slug: /develop/api-reference/user/st.user
description: st.user returns information about the logged-in user.
keywords: st.user, user info, user information, logged-in user, community cloud user, user data, user details, user profile, user session info
---

<Autofunction function="streamlit.user" oldName="streamlit.experimental_user" />

### Community Cloud

Starting from Streamlit version 1.42.0, you can't use `st.user` to retrieve a user's Community Cloud account email. To access user information, you must set up an identity provider and configure authentication (`[auth]`) in your app's secrets. Remember to update your identity provider's configuration and your app's secrets to allow your new domain. A list of [IP addresses](/deploy/streamlit-community-cloud/status#ip-addresses) used by Community Cloud is available if needed. An authentication-configured app counts as your single allowed private app.

<Autofunction function="streamlit.user.to_dict" oldName="streamlit.experimental_user.to_dict" />
