---
title: Authentication and user info
slug: /develop/api-reference/user
description: Add user authentication and personalization in your apps with login, logout, and user information access.
keywords: authentication, user info, login, logout, user authentication, identity provider, personalized apps, user session, st.user, st.login, st.logout
---

# Authentication and user info

Streamlit provides native support for user authentication so you can personalize your apps. You can also directly read headers and cookies.

<TileContainer>
<RefCard href="/develop/api-reference/user/st.login">

<h4>Log in a user</h4>

`st.login()` starts an authentication flow with an identity provider.

```python
st.login()
```

</RefCard>
<RefCard href="/develop/api-reference/user/st.logout">

<h4>Log out a user</h4>

`st.logout()` removes a user's identity information.

```python
st.logout()
```

</RefCard>
<RefCard href="/develop/api-reference/user/st.user">

<h4>User info</h4>

`st.user` returns information about a logged-in user.

```python
if st.user.is_logged_in:
  st.write(f"Welcome back, {st.user.name}!")
```

</RefCard>
</TileContainer>
