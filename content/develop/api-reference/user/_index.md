---
title: Authentication and user info
slug: /develop/api-reference/user
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

`st.experimental_user` returns information about a logged-in user.

```python
if st.experimental_user.is_logged_in:
  st.write(f"Welcome back, {st.experimental_user.name}!")
```

</RefCard>
</TileContainer>
