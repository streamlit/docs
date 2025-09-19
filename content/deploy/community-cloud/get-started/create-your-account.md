---
title: Create your account
slug: /deploy/streamlit-community-cloud/get-started/create-your-account
description: Learn how to create your Streamlit Community Cloud account using email, Google, or GitHub authentication methods.
keywords: create account, sign up, authentication, email, google, github, oauth, community cloud
---

# Create your account

Before you can start deploying apps for the world to see, you need to sign up for your Streamlit Community Cloud account.

Each Community Cloud account is associated with an email. Two accounts can't have the same email. When sharing a private app, you will assign viewing privileges by email. Additionally, two accounts can't have the same source control (GitHub account). If you try to create a second Community Cloud account with the same source control, Community Cloud will merge the accounts.

## Sign up

Community Cloud allows you to sign in using one of the three following methods:

- Emailed, one-use codes
- Google
- GitHub

<Important>
    Even when you sign in through GitHub, the authentication flow returns your email address to Community Cloud. Changing the email on your GitHub account can affect your Community Cloud account if you sign in through GitHub.
</Important>

1. Go to <a href="https://share.streamlit.io" target="_blank">share.streamlit.io</a>.
1. Click "**Continue to sign-in**."
1. Continue with one of the three options listed below.

   ### Option 1: Sign in using emailed codes
   1. In the "Email" field, enter your email address.
   1. Click "**Continue**." (If prompted, verify you are human.)
   1. Go to your email inbox, and copy your one-time, six-digit code. The code is valid for ten minutes.
   1. Return to the authentication page, and enter your code. (If prompted, verify you are human.)

   ### Option 2: Sign in using Google
   1. Click "**Continue with Google**."
   1. Enter your Google credentials, and follow Google's authentication prompts.

   ### Option 3: Sign in using GitHub
   1. Click "**Continue with GitHub**."
   1. Enter your GitHub credentials, and follow GitHub's authentication prompts.

      This adds the "Streamlit Community Cloud" OAuth application to your GitHub account. This application is only used to pass your email when you sign in to Community Cloud. On the next page, you'll perform additional steps to allow Community Cloud to access your repositories. For more information about using and reviewing the OAuth applications on your account, see [Using OAuth apps](https://docs.github.com/en/apps/oauth-apps/using-oauth-apps) in GitHub's docs.

1. Fill in your information, and click "**Continue**" at the bottom.

   The "Primary email" field is prefilled with the email you used to sign in. If you change this email in the account setup form, it will only impact marketing emails; it will not reflect on your new account. To change the email associated with your account after it's created, see [Update your email address](/deploy/streamlit-community-cloud/manage-your-account/update-your-email).

## Finish up

Congratulations on creating your Streamlit Community Cloud account! A warning icon (<i style={{ verticalAlign: "-.25em", color: "#ff8700" }} className={{ class: "material-icons-sharp" }}>warning</i>) next to "**Workspaces**" in the upper-left corner is expected; this indicates that your account is not yet connected to GitHub. Even if you created your account by signing in through GitHub, your account does not yet have permission to access your repositories. Continue to the next page to connect your GitHub account.
