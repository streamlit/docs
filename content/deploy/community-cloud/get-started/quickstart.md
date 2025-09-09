---
title: Quickstart
slug: /deploy/streamlit-community-cloud/get-started/quickstart
description: Quick start guide to create your Community Cloud account, deploy a sample app, and start editing with GitHub Codespaces in minutes.
keywords: quickstart, community cloud, account, deploy, sample app, github codespaces, template, editing
---

# Quickstart

This is a concise set of steps to create your Streamlit Community Cloud account, deploy a sample app, and start editing it with GitHub Codespaces. For other options and complete explanations, start with [Create your account](/deploy/streamlit-community-cloud/get-started/create-your-account).

You will sign in to your GitHub account during this process. Community Cloud will use the email from your GitHub account to create your Community Cloud account. For other sign-in options, see [Create your account](/deploy/streamlit-community-cloud/get-started/create-your-account).

## Prerequisites

- You must have a GitHub account.

## Sign up for Streamlit Community Cloud

1. Go to <a href="https://share.streamlit.io" target="_blank">share.streamlit.io</a>.
1. Click "**Continue to sign-in**."
1. Click "**Continue with GitHub**."
1. Enter your GitHub credentials and follow GitHub's authentication prompts.
1. Fill in your account information, and click "**I accept**" at the bottom.

## Add access to your public repositories

1. In the upper-left corner, click "**Workspaces <i style={{ verticalAlign: "-.25em", color: "#ff8700" }} className={{ class: "material-icons-sharp" }}>warning</i>**."

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Connect your GitHub account to a new Community Cloud account" src="/images/streamlit-community-cloud/workspace-unconnected-setup.png" />
</div>

1. From the drop down, click "**Connect GitHub account**."
1. Enter your GitHub credentials and follow GitHub's authentication prompts.
1. Click "**Authorize streamlit**."

<div style={{ maxWidth: '40%', margin: 'auto' }}>
<Image alt="Authorize Community Cloud to connect to your GitHub account" src="/images/streamlit-community-cloud/GitHub-auth1-none.png" />
</div>

## Optional: Add access to private repositories

1. In the upper-left corner, click on your GitHub username.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Access your workspace settings" src="/images/streamlit-community-cloud/workspace-empty-menu.png" />
</div>

1. From the drop down, click "**Settings**."
1. On the left side of the dialog, select "**Linked accounts**."
1. Under "Source control," click "**Connect here <i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>arrow_forward</i>**."
1. Click "**Authorize streamlit**."

<div style={{ maxWidth: '40%', margin: 'auto' }}>
<Image alt="Authorize Community Cloud to connect to your private GitHub repositories" src="/images/streamlit-community-cloud/GitHub-auth2-none.png" />
</div>

## Create a new app from a template

1. In the upper-right corner, click "**Create app**."

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Create a new app from your workspace in Streamlit Community Cloud" src="/images/streamlit-community-cloud/deploy-empty-new-app.png" />
</div>

1. When asked "Do you already have an app?" click "**Nope, create one from a template**."
1. From the list of templates on the left, select "**Blank app**."
1. At the bottom, select the option to "**Open GitHub Codespaces...**"
1. At the bottom, click "**Deploy**."

## Edit your app in GitHub Codespaces

1. Wait for GitHub to set up your codespace.

   It can take several minutes to fully initialize your codespace. After the Visual Studio Code editor appears in your codespace, it can take several minutes to install Python and start the Streamlit server. When complete, a split screen view displays a code editor on the left and a running app on the right. The code editor opens two tabs by default: the repository's readme file and the app's entrypoint file.

   <div style={{ maxWidth: '90%', margin: 'auto' }}>
   <Image alt="Your new GitHub Codespace" src="/images/streamlit-community-cloud/deploy-template-blank-codespace.png" />
   </div>

1. Go to the app's entrypoint file (`streamlit_app.py`) in the left pane, and change line 3 by adding "Streamlit" inside `st.title`.

   ```diff
   -st.title("🎈 My new app")
   +st.title("🎈 My new Streamlit app")
   ```

   Files are automatically saved in your codespace with each edit.

1. A moment after typing a change, your app on the right side will display a rerun prompt. Click "**Always rerun**."

   <div style={{ maxWidth: '90%', margin: 'auto' }}>
   <Image alt="Edit the title of your sample Streamlit app" src="/images/streamlit-community-cloud/deploy-template-blank-codespace-edit.png" />
   </div>

   If the rerun prompt disappears before you click it, you can hover over the overflow menu icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>more_vert</i>) to bring it back.

1. Optional: Continue to make edits and observe the changes within seconds.

## Publish your changes

1. In the left navigation bar, click the source control icon.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="See your deployed Streamlit app" src="/images/streamlit-community-cloud/deploy-template-blank-codespace-edit-source-control.png" />
</div>

1. In the source control sidebar on the left, enter a name for your commit.
1. Click "**<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>check</i> Commit**."

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="See your deployed Streamlit app" src="/images/streamlit-community-cloud/deploy-template-blank-codespace-edit-commit.png" />
</div>

1. To stage and commit all your changes, in the confirmation dialog, click "**Yes**." Your changes are committed locally in your codespace.
1. To push your commit to GitHub, in the source control sidebar on the left, click "**<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>cached</i> 1 <i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>arrow_upward</i>**."
1. To push commits to "origin/main," in the confirmation dialog, click "**OK**."

   Your changes are now saved to your GitHub repository. Community Cloud will immediately reflect the changes in your deployed app.

1. Optional: To see your updated, published app, return to the "**My apps**" section of your workspace at <a href="https://share.streamlit.io" target="_blank">share.streamlit.io</a>, and click on your app.

## Stop or delete your codespace

When you stop interacting with your codespace, GitHub will generally stop your codespace for you. However, the surest way to avoid undesired use of your capacity is to stop or delete your codespace when you are done.

1. Go to <a href="https://github.com/codespaces" target="_blank">github.com/codespaces</a>. At the bottom of the page, all your codespaces are listed. Click the overflow menu icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>more_horiz</i>) for your codespace.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Stop or delete your GitHub Codespace" src="/images/streamlit-community-cloud/deploy-hello-codespace-manage.png" />
</div>

2. If you want to return to your work later, click "**Stop codespace**." Otherwise, click "**Delete**."

   <div style={{ maxWidth: '40%', margin: 'auto' }}>
   <Image alt="Stop your GitHub codespace" src="/images/streamlit-community-cloud/codespace-menu.png" />
   </div>

3. Congratulations! You just deployed an app to Streamlit Community Cloud. 🎉 Return to your workspace at <a href="https://share.streamlit.io/" target="_blank">share.streamlit.io/</a> and [deploy another Streamlit app](/deploy/streamlit-community-cloud/deploy-your-app).

   <div style={{ maxWidth: '90%', margin: 'auto' }}>
   <Image alt="See your deployed Streamlit app" src="/images/streamlit-community-cloud/deploy-template-blank-edited.png" />
   </div>
