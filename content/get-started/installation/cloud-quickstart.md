---
title: Use Community Cloud to develop with GitHub Codespaces
slug: /get-started/installation/community-cloud
description: Quick start guide to use Community Cloud and GitHub Codespaces for browser-based development without local installation.
keywords: community cloud, github codespaces, cloud development, browser development, codespaces, streamlit cloud, no installation, cloud ide
---

# Use Community Cloud to develop with GitHub Codespaces

To use GitHub Codespaces for Streamlit development, you need a properly configured `devcontainer.json` file to set up the environment. Fortunately, Streamlit Community Cloud is here to help! Although Community Cloud is primarily used to deploy and share apps with the rest of the world, we've built in some handy features to make it easy to use GitHub Codespaces. This guide explains how to create a Community Cloud account and use an automated workflow to get you into a GitHub codespace and live-editing a Streamlit app. All this happens right in your browser, no installation required.

If you already created a Community Cloud account and connected GitHub, jump ahead to [Create a new app from a template](/get-started/installation/community-cloud#create-a-new-app-from-a-template).

## Prerequisites

- You must have a GitHub account.

## Sign up for Streamlit Community Cloud

1. Go to <a href="https://share.streamlit.io" target="_blank">share.streamlit.io</a>.
1. Click "**Continue to sign-in**."
1. Click "**Continue with GitHub**."
1. Enter your GitHub credentials and follow GitHub's authentication prompts.
1. Fill in your account information, and click "**I accept**" at the bottom.

## Add access to your public repositories

1. In the upper-left corner, click on "**Workspaces <i style={{ verticalAlign: "-.25em", color: "#ff8700" }} className={{ class: "material-icons-sharp" }}>warning</i>**."

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

   It can take several minutes to fully initialize your codespace. After you see the Visual Studio Code editor in your codespace, it can take several minutes to install Python and start the Streamlit server. When complete, you will see a split screen view with a code editor on the left and a running app on the right. The code editor opens two tabs by default: the repository's readme file and the app's entrypoint file.

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

1. In the confirmation dialog, click "**Yes**" to stage and commit all your changes. Your changes are committed locally in your codespace.
1. In the source control sidebar on the left, click "**<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>cached</i> 1 <i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>arrow_upward</i>**" to push your commit to GitHub.
1. In the confirmation dialog, click "**OK**" to push commits to "origin/main."

   Your changes are now saved to your GitHub repository. Community Cloud will immediately reflect the changes in your deployed app.

1. Optional: To see your updated, published app, return to the "**My apps**" section of your workspace at <a href="https://share.streamlit.io" target="_blank">share.streamlit.io</a>, and click on your app.

## Learn Streamlit fundamentals

If you haven't learned Streamlit's basic concepts yet, this is a great time to go to [Fundamentals](/get-started/fundamentals). Use your codespace to walk through and try basic Streamlit commands. When finished, come back here to learn how to clean up your codespace.

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
