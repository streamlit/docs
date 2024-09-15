---
title: Update your email
slug: /deploy/streamlit-community-cloud/manage-your-account/update-your-email
---

# Update your email

If you wish to update your email on Streamlit Community Cloud, you have two options. You can create a new account and merge your existing account into it, or you can use your GitHub account to update your email.

## Create a new account and merge it

Two Community Cloud accounts can't have the same GitHub account for source control. When you connect a GitHub account to a new Community Cloud account for source control, Community Cloud with automatically merge any existing account with the same source control.

Therefore, you can create a new account with the desired email and connect the same GitHub account to merge them together.

1. Create a new account with your new email.
1. Connect your GitHub account.

Your old and new accounts are now merged, and you have effectively changed your email address.

## Use your GitHub account

1. Go to GitHub, and set your primary emall address to your new email.
1. If you are currently signed in to Community Cloud, sign out.
1. Sign in to your Community Cloud account using GitHub.

   If you are redirected to your workspace and you see your existing apps, you're done! Your email has been changed and you can confirm your current email and GitHub account by clicking on your workspace name in the upper-left corner and looking at the bottom of the drop-down menu.

   If you are redirected to an empty workspace and you see "**Workspaces <i style={{ verticalAlign: "-.25em", color: "#ff8700" }} className={{ class: "material-icons-sharp" }}>warning</i>**" in the upper-left corner, proceed to [Connect your GitHub account](/deploy/streamlit-community-cloud/get-started/connect-your-github-account). This can happen if you previously created an account with your new email but didn't connect a GitHub account to it.

<Important>
   If you have multiple GitHub accounts, be careful. To avoid unexpected behavior, either use unique emails on each GitHub account or avoid signing in to Community Cloud using GitHub.
</Important>
