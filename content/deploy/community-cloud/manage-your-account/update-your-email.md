---
title: Update your email
slug: /deploy/streamlit-community-cloud/manage-your-account/update-your-email
description: Learn how to update your email address on Streamlit Community Cloud using account merging or GitHub account changes.
keywords: update email, change email, account merge, github, authentication, identity, account management
---

# Update your email

To update your email on Streamlit Community Cloud, you have two options: You can create a new account and merge your existing account into it, or you can use your GitHub account to update your email.

## Option 1: Create a new account and merge it

Two Community Cloud accounts can't have the same GitHub account for source control. When you connect a GitHub account to a new Community Cloud account for source control, Community Cloud will automatically merge any existing account with the same source control.

Therefore, you can create a new account with the desired email and connect the same GitHub account to merge them together.

1. Create a new account with your new email.
1. Connect your GitHub account.

Your old and new accounts are now merged, and you have effectively changed your email address.

## Option 2: Use your GitHub account

Alternatively, you can change the email on your GitHub account and then sign in to Community Cloud with GitHub.

1. Go to GitHub, and set your primary email address to your new email.
1. If you are currently signed in to Community Cloud, sign out.
1. Sign in to Community Cloud _using GitHub_.

   If you are redirected to your workspace and you see your existing apps, you're done! Your email has been changed. To confirm your current email and GitHub account, click on your workspace name in the upper-left corner, and look at the bottom of the drop-down menu.

   If you are redirected to an empty workspace and you see "**Workspaces <i style={{ verticalAlign: "-.25em", color: "#ff8700" }} className={{ class: "material-icons-sharp" }}>warning</i>**" in the upper-left corner, proceed to [Connect your GitHub account](/deploy/streamlit-community-cloud/get-started/connect-your-github-account). This can happen if you previously created an account with your new email but didn't connect a GitHub account to it.

<Important>
   If you have multiple GitHub accounts, be careful. To avoid unexpected behavior, either use unique emails on each GitHub account or avoid signing in to Community Cloud using GitHub.
</Important>
