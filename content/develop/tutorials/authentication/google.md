---
title: Use the Google Auth Platform to authenticate users
slug: /develop/tutorials/authentication/google
description: Learn how to authenticate users with Google's OpenID Connect (OIDC) service
keywords: authentication, google, oidc, login, auth, oauth, identity, tutorial
---

# Use the Google Auth Platform to authenticate users

Google is one of the most popular identity providers for social logins. You can use the Google Auth Platform with both private and organizational Google accounts. This tutorial configures authentication for anyone with a Google account. For more information, see Google's overview of the [Google Auth Platform](https://support.google.com/cloud/topic/15540269?hl=en&ref_topic=3473162&sjid=576431444945556851-NC) and [OpenID Connect](https://developers.google.com/identity/openid-connect/openid-connect#discovery).

## Prerequisites

- This tutorial requires the following Python libraries:

  ```text
  streamlit>=1.42.0
  Authlib>=1.3.2
  ```

- You should have a clean working directory called `your-repository`.
- You must have a Google account and accept the terms of [Google Cloud](https://console.cloud.google.com/) to use their authentication service.
- You must have a project in Google Cloud within which to create your application.
  For more information about managing your projects in Google Cloud, see [Creating and managing projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects) in Google's documentation.

## Summary

In this tutorial, you'll build an app that users can log in to with their Google accounts. When they log in, they'll see a personalized greeting with their name and have the option to log out.

Here's a look at what you'll build:

<Collapse title="Complete code" expanded={false}>

`.streamlit/secrets.toml`

```toml
[auth]
redirect_uri = "http://localhost:8501/oauth2callback"
cookie_secret = "xxx"
client_id = "xxx"
client_secret = "xxx"
server_metadata_url = "https://accounts.google.com/.well-known/openid-configuration"
```

`app.py`

```python
import streamlit as st

def login_screen():
    st.header("This app is private.")
    st.subheader("Please log in.")
    st.button("Log in with Google", on_click=st.login)

if not st.user.is_logged_in:
    login_screen()
else:
    st.header(f"Welcome, {st.user.name}!")
    st.button("Log out", on_click=st.logout)
```

</Collapse>

## Create a web application in Google Cloud Console

In this section, you'll complete three steps to create your web application in your project in Google Cloud Console:

- Configure your consent screen.
- Configure your audience.
- Configure your client.

The consent screen is what users see from Google within the authentication flow. The audience settings manage your application's status (_Testing_ or _Published_). Creating a client for your web application generates the ID and secrets needed to configure your Streamlit app. To learn more about consent screens, audience, and clients, see Google's overview of the [Google Auth Platform](https://support.google.com/cloud/topic/15540269?hl=en&ref_topic=3473162&sjid=576431444945556851-NC).

### Configure your consent screen

1. Go to the [Google Auth Platform](https://console.cloud.google.com/auth/overview), and sign in to Google.

1. In the upper-left corner, select your project.

1. In the left navigation menu, select "**Branding**."

1. Fill in the required information for your application's consent screen.

   This information controls what users see within the Google authentication flow. Your "**App name**" is displayed to users within Google's prompts. Google asks users to consent to sending their account information to your application. If you are developing locally and/or deploying on Streamlit Community Cloud, in "**Authorized domain**," use `example.com`. For more information about the available fields, see [Setting up your OAuth consent screen](https://support.google.com/cloud/answer/10311615).

1. At the bottom of the branding page, select "**SAVE**."

### Configure your audience

1. In the left navigation menu, select "**Audience**."

1. Below "OAuth user cap" → "Test users," select "**ADD USERS**."

1. Enter the email address for a personal Google account, and select "**SAVE**."

   When you create a new application in the Google Auth Platform, its status is _Testing_. While the status is _Testing_, only specific users can authenticate to your application; users can't register themselves. Therefore, add any email address you want to use for testing your app in development. When you're ready to publish your app, you'll return to this section and change the status to _Published_. After an application is published, your application will accept new users.

### Configure your client

1. In the left navigation menu, select "**Clients**."

1. At the top of the client list, select "**CREATE CLIENT**."

1. For the application type, select "**Web application**."

1. Enter a unique name for your application.

   The client name is used internally and not shown to your users.

1. Skip over "Authorized JavaScript origins."

1. Under "Authorized redirect URIs," select "**ADD URI**."

1. Enter your app's URL with the pathname `oauth2callback`.

   For example, if you are developing locally, enter `http://localhost:8501/oauth2callback`. If you are using a different port, change `8501` to match your port.

1. Optional: Add additional authorized redirect URIs.

   If you will host your app from multiple URLs, or if you know a URL you will use in the future, you can add it now. Ensure that each URL includes the `oauth2callback` pathname.

1. At the bottom of the screen, select "**CREATE**."

You now have a client in Google Cloud that's ready to authenticate your users.

### Gather your application's details

1. From the clients page, select your new client.

1. To store your app information to use in later steps, open a text editor, or (even better) create a new item in a password locker.

   Always handle your app secrets securely. Remember to label the values as you paste them so you don't mix them up.

1. On the right, copy your "Client ID" and "Client secret" into your text editor.

For the Google Auth Platform, the server metadata URL is shared between all applications and isn't listed individually in your client. The server metadata URL for the Google Auth Platform is `https://accounts.google.com/.well-known/openid-configuration`. For more information about the server metadata URL, see [The discovery document](https://developers.google.com/identity/openid-connect/openid-connect#discovery) in Google's documentation.

## Build the example

To create an app with user authentication, you'll need to configure your secrets and prompt your users to log in. You'll use secrets management to store the information from your client, and then create a simple app that welcomes your user by name after they log in.

### Configure your secrets

1. In `your_repository`, create a `.streamlit/secrets.toml` file.

1. Add `secrets.toml` to your `.gitignore` file.

   <Important>
      Never commit secrets to your repository. For more information about `.gitignore`, see [Ignoring files](https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files).
   </Important>

1. Generate a strong, random secret to use as your cookie secret.

   The cookie secret is used to sign each user's identity cookie, which Streamlit stores when they log in.

1. In `.streamlit/secrets.toml`, add your connection configuration:

   ```toml
   [auth]
   redirect_uri = "http://localhost:8501/oauth2callback"
   cookie_secret = "xxx"
   client_id = "xxx"
   client_secret = "xxx"
   server_metadata_url = "https://accounts.google.com/.well-known/openid-configuration"
   ```

   Replace the values of `client_id` and `client_secret` with the values you copied into your text editor earlier. Replace the value of `cookie_secret` with the random secret you generated in the previous step.

1. Save your `secrets.toml` file.

### Initialize your app

1. In `your_repository`, create a file named `app.py`.
1. In a terminal, change directories to `your_repository`, and start your app:

   ```bash
   streamlit run app.py
   ```

   Your app will be blank because you still need to add code.

1. In `app.py`, write the following:

   ```python
   import streamlit as st
   ```

1. Save your `app.py` file, and view your running app.
1. In your app, select "**Always rerun**", or press the "**A**" key.

   Your preview will be blank but will automatically update as you save changes to `app.py`.

1. Return to your code.

### Log the user in and out

1. Define a function that prompts the user to log in:

   ```python
   def login_screen():
       st.header("This app is private.")
       st.subheader("Please log in.")
       st.button("Log in with Google", on_click=st.login)
   ```

   This function displays a short message and a button. Streamlit's login command is assigned to the button as a callback.

   <Note>
      If you don't want to use a callback, you can replace the last line with an equivalent `if` statement:
      ```diff
      -  st.button("Log in with Google", on_click=st.login)
      +  if st.button("Log in with Google"):
      +     st.login()
      ```
   </Note>

1. Conditioned on whether the user is logged in, call your function to prompt the user, or show their information:

   ```python
   if not st.user.is_logged_in:
       login_screen()
   else:
       st.user
   ```

   Because `st.user` is a dict-like object in a line by itself, Streamlit magic displays it in your app.

1. Save your `app.py` file, and test your running app.

   In your live preview, when you log in to your app, the login button is replaced with the contents of your identity token. Observe the different values that are available from Google. You can use these values to personalize your app for your users.

1. Return to your code.

1. Replace `st.user` with a personalized greeting:

   ```diff
   else:
   -   st.user
   +   st.header(f"Welcome, {st.user.name}!")
   ```

1. Add a logout button:

   ```python
       st.button("Log out", on_click=st.logout)
   ```

1. Save your `app.py` file and test your running app.

   In your live preview, if you log out of your app, it will return to the login prompt.

## Deploy your app on Community Cloud

When you are ready to deploy your app, you must update your application on Google Cloud and your secrets. The following steps describe how to deploy your app on Community Cloud.

1. Add a `requirements.txt` file to your repository with the following lines:

   ```txt
   streamlit>=1.42.0
   Authlib>=1.3.2
   ```

   This ensures that the correct Python dependencies are installed for your deployed app.

1. Save your `requirements.txt` file.

1. Deploy your app, and copy your app's URL into your text editor.

   You'll use your app's URL to update your secrets and client configuration in the following steps. For more information about deploying an app on Community Cloud, see [Deploy your app](/deploy/streamlit-community-cloud/deploy-your-app).

1. In your [app settings](/deploy/streamlit-community-cloud/manage-your-app/app-settings) in Community Cloud, select "**Secrets**."

1. Copy the contents of your local `secrets.toml` file, and paste them into your app settings.

1. Change your `redirect_uri` to reflect your deployed app's URL, which you copied earlier in this tutorial.

   For example, if your app is `my_streamlit_app.streamlit.io`, your redirect URI would be `https://my_streamlit_app.streamlit.io/oauth2callback`.

1. Save and close your settings.

1. Return to the clients page in the Google Auth Platform, and select your client.

1. Under "Authorized redirect URIs," add or update a URI to match your new `redirect_uri`.

1. At the bottom of the page, select "**SAVE**."

1. Open your deployed app, and test it.

   Your Google Cloud application's status is still _Testing_. You should be able to log in and out of your app with the personal Google account you entered on the "Audience" page.

1. When you are ready for others to use your app, return to the "Audience" page in the Google Auth Platform, and set your application status to _Published_.
