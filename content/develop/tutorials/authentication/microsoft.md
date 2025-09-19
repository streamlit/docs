---
title: Use Microsoft Entra to authenticate users
slug: /develop/tutorials/authentication/microsoft
description: Learn how to authenticate users with Microsoft Entra and Microsoft Identity Platform for work, school, and personal accounts in Streamlit apps.
keywords: Microsoft authentication, Microsoft Entra, Microsoft Identity Platform, enterprise authentication, work accounts, school accounts, OIDC tutorial
---

# Use Microsoft Entra to authenticate users

[Microsoft Identity Platform](https://learn.microsoft.com/en-us/entra/identity-platform/v2-overview) is a service within Microsoft Entra that lets you build applications to authenticate users. Your applications can use personal, work, and school accounts managed by Microsoft.

## Prerequisites

- This tutorial requires the following Python libraries:

  ```text
  streamlit>=1.42.0
  Authlib>=1.3.2
  ```

- You should have a clean working directory called `your-repository`.
- You must have a Microsoft Azure account, which includes Microsoft Entra ID.

## Summary

In this tutorial, you'll build an app that users can log in to with their personal Microsoft accounts. When they log in, they'll see a personalized greeting with their name and have the option to log out.

Here's a look at what you'll build:

<Collapse title="Complete code" expanded={false}>

`.streamlit/secrets.toml`

```toml
[auth]
redirect_uri = "http://localhost:8501/oauth2callback"
cookie_secret = "xxx"
client_id = "xxx"
client_secret = "xxx"
server_metadata_url = "https://login.microsoftonline.com/consumers/v2.0/.well-known/openid-configuration"
```

`app.py`

```python
import streamlit as st

def login_screen():
    st.header("This app is private.")
    st.subheader("Please log in.")
    st.button("Log in with Microsoft", on_click=st.login)

if not st.user.is_logged_in:
    login_screen()
else:
    st.header(f"Welcome, {st.user.name}!")
    st.button("Log out", on_click=st.logout)
```

</Collapse>

## Create a web application in Microsoft Entra ID

Within Microsoft Entra ID in Azure, you'll need to register a new application and generate a secret needed to configure your app. In this example, your application will only accept personal Microsoft accounts, but you can optionally accept work and school accounts or restrict the application to your personal tenant. Microsoft Entra also lets you connect other, external identity providers.

### Register a new application

1. Go to [Microsoft Azure](https://portal.azure.com/#home), and sign in to Microsoft.

1. At the top of the page among the services, select "**Microsoft Entra ID**."

1. In the left navigation, select "**Manage**" → "**App registrations**."

1. At the top of the screen, select "**New registration**."

1. Fill in a name for your application.

   The application name will be visible to your users within the authentication flow presented by Microsoft.

1. Under "Supported account types," select "**Personal Microsoft accounts only**."

1. Under "Redirect URI," select a "**Web**" platform, and enter your app's URL with the pathname `oauth2callback`.

   For example, if you are developing locally, enter `http://localhost:8501/oauth2callback`. If you are using a different port, change `8501` to match your port.

1. At the bottom of the screen, select "**Register**."

   Microsoft will redirect you to your new application, a resource within Azure.

### Gather your application's details

1. To store your app information to use in later steps, open a text editor, or (even better) create a new item in a password locker.

   Always handle your app secrets securely. Remember to label the values as you paste them so you don't mix them up.

1. Under "Essentials," copy the "Application (client) ID" into your text editor.

   This is your `client_id`.

1. At the top of the page, select "**Endpoints**."

1. Copy the "OpenID Connect metadata document" into your text editor.

   This is your `server_metadata_url`.

1. In the left navigation, select "**Manage**" → "**Certificates & secrets**."

1. Near the top, select "**New client secret**."

1. Enter a description, and select an expiration time.

   The description is only used internally. You will use the generated secret to configure your Streamlit app, so choose a description that helps you remember where you use the secret.

1. At the bottom of the dialog, select "**Add**."

   It may take a few seconds for Azure to generate your secret.

1. Copy the "Value" into your text editor.

   This is your `client_secret`. Microsoft will hide the value after you leave Azure, so ensure that you securely store it somewhere now. If you lose your secret, you'll need to delete it from your configuration and generate a new one.

Your client is ready to accept users.

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
    server_metadata_url = "https://login.microsoftonline.com/consumers/v2.0/.well-known/openid-configuration"
   ```

   Replace the values of `client_id`, `client_secret`, and `server_metadata_url` with the values you copied into your text editor earlier. Replace the value of `cookie_secret` with the random secret you generated in the previous step.

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
       st.button("Log in with Microsoft", on_click=st.login)
   ```

   This function displays a short message and a button. Streamlit's login command is assigned to the button as a callback.

   <Note>
      If you don't want to use a callback, you can replace the last line with an equivalent `if` statement:
      ```diff
      -  st.button("Log in with Microsoft", on_click=st.login)
      +  if st.button("Log in with Microsoft"):
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

   In your live preview, when you log in to your app, the login button is replaced with the contents of your identity token. Observe the different values that are available from Microsoft. You can use these values to personalize your app for your users.

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

When you are ready to deploy your app, you must update your application in Microsoft Azure and your secrets. The following steps describe how to deploy your app on Community Cloud.

1. Add a `requirements.txt` file to your repository with the following lines:

   ```txt
   streamlit>=1.42.0
   Authlib>=1.3.2
   ```

   This ensures that the correct Python dependencies are installed for your deployed app.

1. Save your `requirements.txt` file.

1. Deploy your app, and copy your app's URL into your text editor.

   You'll use your app's URL to update your secrets and application configuration in the following steps. For more information about deploying an app on Community Cloud, see [Deploy your app](/deploy/streamlit-community-cloud/deploy-your-app).

1. In your [app settings](/deploy/streamlit-community-cloud/manage-your-app/app-settings) in Community Cloud, select "**Secrets**."

1. Copy the contents of your local `secrets.toml` file, and paste them into your app settings.

1. Change your `redirect_uri` to reflect your deployed app's URL.

   For example, if your app is `my_streamlit_app.streamlit.io`, your redirect URI would be `https://my_streamlit_app.streamlit.io/oauth2callback`.

1. Save and close your settings.

1. Return to your application in Microsoft Azure.

   If you've closed Microsoft Azure and need to navigate back to your application, go to your Azure portal → Microsoft Entra ID → App registrations, and select it from the list.

1. In the left navigation, select "**Authentication**."

1. Under "Platform configurations" → "Web," add or update a URI to match your new `redirect_uri`.

1. At the bottom of the page, select "**Save**."

1. Open your deployed app, and test it.
