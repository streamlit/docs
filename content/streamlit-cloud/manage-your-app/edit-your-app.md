---
title: Edit your app
slug: /streamlit-community-cloud/manage-your-app/edit-your-app
---

# Edit your app

You can edit your app from any development environment of your choice. Community Cloud will monitor your repository and automatically copy any file changes you commit. You will immediately see the changes reflected in your deployed app for most changes (such as edits to your app's Python files).

Community Cloud also makes it easy to skip the work of setting up a development environment. With a few simple clicks, you can configure a development environment using GitHub Codespaces.

## Edit your app with GitHub Codespaces

Spin up a cloud-based development environment for your deployed app in minutes. You can see your app running live in your codespace to enjoy experimenting in a safe, sandboxed environment. When you are done editing your code you can commit your changes to your repo or just leave them in your codespace to return to later.

### Create a GitHub Codespace for your deployed app

1. From your workspace at <a href="https://share.streamlit.io" target="_blank">share.streamlit.io</a>, click the overflow icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>more_vert</i>) next to your app. Click "**Edit**."

   ![Edit your app with GitHub Codespaces](/images/streamlit-community-cloud/workspace-app-edit.png)

2. A `.devcontainer/devcontainer.json` file will be added to your repository. If you already have a file of the same name in your repository, it will not be changed. You may delete or rename your existing devcontainer configuration if you would like your repository to receive the instance created by Streamlit Community Cloud.

   ![Adding a devcontainer file to your repository](/images/streamlit-community-cloud/workspace-app-edit-preparing.png)

3. Click "**Create codespace**" to confirm the creation of a codespace on your account. Read more about <a href="https://github.com/features/codespaces" target="_blank">GitHub Codespaces</a> to learn about monthly limits for free use and paid plans.

   ![Create your GitHub Codespace](/images/streamlit-community-cloud/deploy-codespaces-2.png)

4. Wait for GitHub to set up your Codespace.

   ![GitHub preparing your codespace](/images/streamlit-community-cloud/deploy-codespaces-3.png)

5. When your Codespace is built, GitHub will open your Codespace and automatically execute the commands to launch your Streamlit app. Your live app will be visible in a "Simple Browser" on the right.

   ![Your new GitHub Codespace](/images/streamlit-community-cloud/deploy-sample-codespace.png)

6. When you make changes to your app, the file is automatically saved within your codespace. Your edits do not affect your repository unless you choose to commit those changes. We will describe commiting your changes in a later step.

   In order to see updates automatically reflected on the right, click "**Always rerun**" when prompted after an edit.

   ![Edit the title of your sample Streamlit app](/images/streamlit-community-cloud/deploy-sample-edit-title.png)
   ![Select "Always rerun" to automatically see edits in your running app](/images/streamlit-community-cloud/deploy-sample-edit-rerun.png)

7. See your edits appear within the "Simple Browser" tab and keep going with more!

   ![See the results of your edit to your Streamlit app](/images/streamlit-community-cloud/deploy-sample-edit-result.png)

### Commit your changes to your repository (optional)

After making edits to your app, you can choose to commit your edits to your repository to update your deployed app instantly. If you just want to keep your edits in your codespace to return to later, skip to [Stop or delete your GitHub Codespace](#stop-or-delete-your-github-codespace).

8. In the level navigation bar, click the source control icon.

   ![Click on the source control icon](/images/streamlit-community-cloud/deploy-sample-edit-commit-1.png)

9. Fill out your desired commit message and click "**Commit**."

   ![Commit your changes](/images/streamlit-community-cloud/deploy-sample-edit-commit-2.png)

10. Click "**Yes**" to stage and commit all your changes. To learn more about source control in GitHub Codespaces, check out <a href="https://docs.github.com/en/codespaces/developing-in-codespaces/using-source-control-in-your-codespace" target="_blank">Source control</a> in GitHub Docs.

<div style={{ maxWidth: '70%', margin: 'auto' }}>
<Image alt="Confirm to stage all changes and commit" src="/images/streamlit-community-cloud/deploy-sample-edit-commit-3.png" />
</div>

### Stop or delete your GitHub Codespace

When you are done, remember to stop your GitHub Codespace to avoid any undesired use of your capacity.

11. Go to <a href="https://github.com/codespaces" target="_blank">github.com/codespaces</a>. At the bottom of the page, all your Codespaces are listed. Click the overflow menu icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>more_horiz</i>) for your Codespace. Click "**Stop codespace**" if you'd like to return to your work later. Otherwise, click "**Delete**."

    ![Stop or delete your GitHub Codespace](/images/streamlit-community-cloud/deploy-sample-codespaces.png)
