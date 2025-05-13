---
title: User authentication and information
slug: /develop/concepts/connections/authentication
---

# User authentication and information

Personalizing your app for your users is a great way to make your app more engaging.

User authentication and personalization unlocks a plethora of use cases for developers, including controls for admins, a personalized stock ticker, or a chatbot app with a saved history between sessions.

Before reading this guide, you should have a basic understanding of [secrets management](/develop/concepts/connections/secrets-management).

## OpenID Connect

Streamlit supports user authentication with OpenID Connect (OIDC), which is an authentication protocol built on top of OAuth 2.0. OIDC supports authentication, but not authorization: that is, OIDC connections tell you _who_ a user is (authentication), but don't give you the authority to _impersonate_ them (authorization). If you need to connect with a generic OAuth 2.0 provider or have your app to act on behalf of a user, consider using or creating a custom component.

Some popular OIDC providers are:

- [Google Identity](https://developers.google.com/identity/openid-connect/openid-connect)
- [Microsoft Entra ID](https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings)
- [Okta](https://help.okta.com/en-us/content/topics/apps/apps_app_integration_wizard_oidc.htm)
- [Auth0](https://auth0.com/docs/get-started/auth0-overview/create-applications/regular-web-apps)

## `st.login()`, `st.user`, and `st.logout()`

There are three commands involved with user authentication:

- [`st.login()`](/develop/api-reference/user/st.login) redirects the user to your identity provider. After they log in, Streamlit stores an identity cookie and then redirects them to the homepage of your app in a new session.
- [`st.user`](/develop/api-reference/user/st.user) is a dict-like object for accessing user information. It has a persistent attribute, `.is_logged_in`, which you can check for the user's login status. When they are logged in, other attributes are available per your identity provider's configuration.
- [`st.logout()`](/develop/api-reference/user/st.logout) removes the identity cookie from the user's browser and redirects them to the homepage of your app in a new session.

## User cookies and logging out

Streamlit checks for the identity cookie at the beginning of each new session. If a user logs in to your app in one tab and then opens a new tab, they will automatically be logged in to your app in the new tab. When you call `st.logout()` in a user session, Streamlit removes the identity cookie and starts a new session. This logs the user out from the current session. However, if they were logged in to other sessions already, they will remain logged in within those sessions. The information in `st.user` is updated at the beginning of a session (which is why `st.login()` and `st.logout()` both start new sessions after saving or deleting the identity cookie).

If a user closes your app without logging out, the identity cookie will expire after 30 days. This expiration time is not configurable and is not tied to any expiration time that may be returned in your user's identity token. If you need to prevent persistent authentication in your app, check the expiration information returned by the identity provider in `st.user` and manually call `st.logout()` when needed.

Streamlit does not modify or delete any cookies saved directly by your identity provider. For example, if you use Google as your identity provider and a user logs in to your app with Google, they will remain logged in to their Google account after they log out of your app with `st.logout()`.

## Setting up an identity provider

In order to use an identity provider, you must first configure your identity provider through an admin account. This typically involves setting up a client or application within the identity provider's system. Follow the documentation for your identity provider. As a general overview, an identity-provider client typically does the following:

- Manages the list of your users.
- Optional: Allows users to add themselves to your user list.
- Declares the set of attributes passed from each user account to the client (which is then passed to your Streamlit app).
- Only allows authentication requests to come from your Streamlit app.
- Redirects users back to your Streamlit app after they authenticate.

To configure your app, you'll need the following:

- Your app's URL
  For example, use `http://localhost:8501` for most local development cases.
- A redirect URL, which is your app's URL with the pathname `oauth2callback`
  For example, `http://localhost:8501/oauth2callback` for most local development cases.
- A cookie secret, which should be a strong, randomly generated string

After you use this information to configure your identity-provider client, you'll receive the following information from your identity provider:

- Client ID
- Client secret
- Server metadata URL

Examples for popular OIDC provider configurations are listed in the API reference for `st.login()`.

## Configure your OIDC connection in Streamlit

After you've configured your identity-provider client, you'll need to configure your Streamlit app, too. `st.login()` uses your app's `secrets.toml` file to configure your connection, similar to how `st.connection()` works.

Whether you have one OIDC provider or many, you'll need to have an `[auth]` dictionary in `secrets.toml`. You must declare `redirect_uri` and `cookie_secret` in the `[auth]` dictionary. These two values are shared between all OIDC providers in your app.

If you are only using one OIDC provider, you can put the remaining three properties (`client_id`, `client_secret`, and `server_metadata_url`) in `[auth]`. However, if you are using multiple providers, they should each have a unique name so you can declare their unique values in their own dictionaries. For example, if you name your connections `"connection_1"` and `"connection_2"`, put their remaining properties in dictionaries named `[auth.connection_1]` and `[auth.connection_2]`, respectively.

## A simple example

If you use Google Identity as your identity provider, a basic configuration for local development will look like the following TOML file:

`.streamlit/secrets.toml`:

```toml
[auth]
redirect_uri = "http://localhost:8501/oauth2callback"
cookie_secret = "xxx"
client_id = "xxx"
client_secret = "xxx"
server_metadata_url = "https://accounts.google.com/.well-known/openid-configuration"
```

Make sure the port in `redirect_uri` matches the port you are using. The `cookie_secret` should be a strong, randomly generated secret. Both the `redirect_uri` and `cookie_secret` should have been entered into your client configuration on Google Cloud. You must copy the `client_id` and `client_secret` from Google Cloud after you create your client. For some identity providers, `server_metadata_url` may be unique to your client. However, for Google Cloud, a single URL is shared for OIDC clients.

In your app, create a simple login flow:

```python
import streamlit as st

if not st.user.is_logged_in:
    if st.button("Log in with Google"):
        st.login()
    st.stop()

if st.button("Log out"):
    st.logout()
st.markdown(f"Welcome! {st.user.name}")
```

When you use `st.stop()`, your script run ends as soon as the login button is displayed. This lets you avoid nesting your entire page within a conditional block. Additionally, you can use callbacks to simplify the code further:

```python
import streamlit as st

if not st.user.is_logged_in:
    st.button("Log in with Google", on_click=st.login)
    st.stop()

st.button("Log out", on_click=st.logout)
st.markdown(f"Welcome! {st.user.name}")
```

## Using multiple OIDC providers

If you use more than one OIDC provider, you'll need to declare a unique name for each. If you want to use Google Identity and Microsoft Entra ID as two providers for the same app, your configuration for local development will look like the following TOML file:

`.streamlit/secrets.toml`:

```toml
[auth]
redirect_uri = "http://localhost:8501/oauth2callback"
cookie_secret = "xxx"

[auth.google]
client_id = "xxx"
client_secret = "xxx"
server_metadata_url = "https://accounts.google.com/.well-known/openid-configuration"

[auth.microsoft]
client_id = "xxx"
client_secret = "xxx"
server_metadata_url = "https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration"
```

Microsoft's server metadata URL varies slightly depending on how your client is scoped. Replace `{tenant}` with the appropriate value described in Microsoft's documentation for [OpenID configuration](https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols-oidc#find-your-apps-openid-configuration-document-uri).

Your app code:

```python
import streamlit as st

if not st.user.is_logged_in:
    if st.button("Log in with Google"):
        st.login("google")
    if st.button("Log in with Microsoft"):
        st.login("microsoft")
    st.stop()

if st.button("Log out"):
    st.logout()
st.markdown(f"Welcome! {st.user.name}")
```

Using callbacks, this would look like:

```python
import streamlit as st

if not st.user.is_logged_in:
    st.button("Log in with Google", on_click=st.login, args=["google"])
    st.button("Log in with Microsoft", on_click=st.login, args=["microsoft"])
    st.stop()

st.button("Log out", on_click=st.logout)
st.markdown(f"Welcome! {st.user.name}")
```

## Passing keywords to your identity provider

To customize the behavior of your identity provider, you may need to declare additional keywords. For a complete list of OIDC parameters, see [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest) and your provider's documentation. By default, Streamlit sets `scope="openid profile email"` and `prompt="select_account"`. You can change these and other OIDC parameters by passing a dictionary of settings to `client_kwargs`. `state` and `nonce`, which are used for security, are handled automatically and don't need to be specified.

For example,if you are using Auth0 and need to force users to log in every time, use `prompt="login"` as described in Auth0's [Customize Signup and Login Prompts](https://auth0.com/docs/customize/login-pages/universal-login/customize-signup-and-login-prompts). Your configuration will look like this:

```toml
[auth]
redirect_uri = "http://localhost:8501/oauth2callback"
cookie_secret = "xxx"

[auth.auth0]
client_id = "xxx"
client_secret = "xxx"
server_metadata_url = "https://{account}.{region}.auth0.com/.well-known/openid-configuration"
client_kwargs = { "prompt" = "login" }
```

<Note>
  Hosted Code environments such as GitHub Codespaces have additional security controls in place preventing the login redirect to be handled properly.
</Note>
