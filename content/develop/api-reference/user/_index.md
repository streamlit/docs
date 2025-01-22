---
title: Authentication and user info
slug: /develop/api-reference/user
---

# Authentication & user info

There are a handful of methods that allow you to create placeholders in your
app, provide help using doc strings, get and modify configuration options and query parameters.

<TileContainer>
<RefCard href="/develop/api-reference/utilities/st.context">

<h4>Context</h4>

`st.context` provides a read-only interface to access cookies and headers.

```python
st.context.cookies
st.context.headers
```

</RefCard>
<RefCard href="/develop/api-reference/user/st.login">

<h4>Log in a user</h4>

`st.login()` starts an authentication flow with an identity provider.

```python
st.login()
```

</RefCard>
<RefCard href="/develop/api-reference/user/st.logout">

<h4>Log out a user</h4>

`st.logout` removes a user's identity information.

```python
st.logout()
```

</RefCard>
<RefCard href="/develop/api-reference/utilities/st.user" size="full">

<h4>User info</h4>

`st.experimental_user` returns information about a logged-in user.

```python
if st.experimental_user.is_logged_in:
  st.write(f"Welcome back, {st.experimental_user.name}!")
```

</RefCard>
</TileContainer>
