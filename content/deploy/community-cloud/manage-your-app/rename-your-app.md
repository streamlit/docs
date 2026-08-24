---
title: Rename or change your app's GitHub coordinates
slug: /deploy/streamlit-community-cloud/manage-your-app/rename-your-app
description: Learn how to safely rename your GitHub repository or change app coordinates without losing access to your Streamlit app.
keywords: rename, github coordinates, repository, username, view-only access, delete, redeploy, access control, coordinates
---

# Rename or change your app's GitHub coordinates

Streamlit Community Cloud identifies apps by their GitHub coordinates (owner, repository, branch, entrypoint file path). If you move or rename one of these coordinates without preparation, you will lose access to administer any associated app.

## Delete, rename, redeploy

If you need to rename your repository, move your entrypoint file, or otherwise change a deployed app's GitHub coordinates, do the following:

1. Delete your app.
1. Make your desired changes in GitHub.
1. Redeploy your app.

## Regain access when you've already made changes to your app's GitHub coordinates

If you have changed a repository so that Community Cloud can no longer find your app on GitHub, your app will be missing or shown as view-only. View-only means that you can't edit, reboot, delete, or view settings for your app. You can only access analytics.

You may be able to regain control as follows:

1. Revert the change you made to your app so that Community Cloud can see the owner, repository, branch, and entrypoint file it expects.
1. Sign out of Community Cloud and GitHub.
1. Sign back in to Community Cloud and GitHub.
1. If you have regained access, delete your app. Proceed with your original change, and redeploy your app.

   If this does not restore access to your app, please [contact Snowflake support](/knowledge-base/deploy/how-to-submit-a-support-case-for-streamlit-community-cloud) for assistance. They can delete your disconnected apps so you can redeploy them. For the quickest help, please provide a complete list of your affected apps by URL.
