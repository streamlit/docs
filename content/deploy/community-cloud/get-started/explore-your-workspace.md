---
title: Explore your workspace
slug: /deploy/streamlit-community-cloud/get-started/explore-your-workspace
description: Learn how to navigate your Community Cloud workspace, switch between workspaces, and manage your apps and profile.
keywords: workspace, explore, switch, apps, profile, developers, permissions, github, collaboration
---

# Explore your workspace

If you just [created your account](/deploy/streamlit-community-cloud/get-started/create-your-account) and [connected your GitHub account](/deploy/streamlit-community-cloud/get-started/connect-your-github-account), congrats! You are now signed in and ready to go. If you are joining someone else's workspace you may already see some apps.

## Workspaces

Each GitHub account and organization is associated with a workspace in Community Cloud. When you sign in to Community Cloud for the first time, you will land in your personal workspace associated with your GitHub user account. The upper-left corner of Community Cloud shows your current workspace.

![A new, empty workspace in Streamlit Community Cloud. The workspace owner is displayed in the upper-left corner.](/images/streamlit-community-cloud/workspace-empty-SM.png)

### Switching workspaces

To switch between workspaces, click the workspace name in the upper-left corner and select a new workspace.

Other workspaces are available to you as follows:

- When you have write permissions to a repository and the repository owner has joined Community Cloud, you can select the associated workspace. An owner can be a GitHub user or organization.
- If someone has shared an app with you through Community Cloud, you will see the app's associated workspace. This is view-only access.

![This workspace is for the user `sammy-streamlit`, who has access to their personal workspace and another workspace for the organization `we-love-streamlit`.](/images/streamlit-community-cloud/workspace-empty-switch.png)

### Invite other developers to your workspace

Inviting other developers is simple: Just give them write access to your GitHub repository so that you can code together. When they sign in to <a href="https://share.streamlit.io" target="_blank">share.streamlit.io</a>, they'll have access to your workspace.

Streamlit Community Cloud inherits developer permissions from GitHub. When others sign in to Community Cloud, they will automatically see the workspaces they share with you. From there you can all deploy, manage, and share apps together.

<Note>

When a user is added to a repository on GitHub, it will take at most 15 minutes before they can deploy or manage the app on Community Cloud. If a user is removed from a repository on GitHub, it will take at most 15 minutes before their permission to manage the app from that repository is revoked.

</Note>

And remember, whenever anyone on the team updates the code on GitHub, the app will automatically update for you!

## My apps

The "**My apps**" section of your workspace is your base of operations to deploy and manage your apps. When you deploy an app, it is added to this section of your workspace.

### Deploying apps

If you already have an app saved to a GitHub repo, you can deploy it directly. Otherwise, Community Cloud provides templates you can use. When you deploy from a template, Community Cloud will fork a project into your GitHub account and deploy from the new fork. This is a convenient way to get started if you haven't already created a Streamlit app.

To get started, just click "**Create app**" in the upper-right corner. To learn more, see [Deploy your app](/deploy/streamlit-community-cloud/deploy-your-app) and [Deploy from a template](/deploy/streamlit-community-cloud/get-started/deploy-from-a-template).

## My profile

The "**My profile**" section of your workspace lets you customize a personal portfolio of Streamlit apps to share with the world. Curate and feature your Streamlit apps to show off your work.

## Explore

For inspiration, check out the "**Explore**" section. This is a gallery of Streamlit apps created by the Streamlit community. Check out popular and trending apps, or search for apps in an area that interests you.
