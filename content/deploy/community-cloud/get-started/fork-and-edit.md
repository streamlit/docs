---
title: Fork and edit a public app
slug: /deploy/streamlit-community-cloud/get-started/fork-and-edit-a-public-app
description: Learn how to fork and edit public Streamlit apps from Community Cloud with GitHub Codespaces for immediate development.
keywords: fork, public app, edit, github codespaces, development, repository, subdomain, customization
---

# Fork and edit a public app

Community Cloud is all about learning, sharing, and exploring the world of Streamlit. For apps with public repositories, you can quickly fork copies to your GitHub account, deploy your own version, and jump into a codespace on GitHub to start editing and exploring Streamlit code.

1. From a forkable app, in the upper-right corner, click "**Fork**."

   ![Click Fork in the upper-right corner of a public app](/images/streamlit-community-cloud/fork-public-hello.png)

1. Optional: In the "App URL" field, choose a custom subdomain for your app.

   Every Community Cloud app is deployed to a subdomain on `streamlit.app`, but you can change your app's subdomain at any time. For more information, see [App settings](/deploy/streamlit-community-cloud/manage-your-app/app-settings).

1. Click "**Fork!**"

   The repository will be forked to your GitHub account. If you have already forked the repository, Community Cloud will use the existing fork. If your existing fork already has an associated codespace, the codespace will be reused.

   <Warning>
      Do not use this method in the following situations:
      - You have an existing repository that matches the fork name (but isn't a fork of this app).
      - You have an existing fork of this app, but you've changed the name of the repository.

   If you have an existing fork of this app and kept the original repository name, Community Cloud will use your existing fork. If you've previously deployed the app and opened a codespace, Community Cloud will open your existing codespace.
   </Warning>

   ![Click Fork to confirm and deploy your app](/images/streamlit-community-cloud/fork-public-hello-deploy.png)

1. Wait for GitHub to set up your codespace.

   It can take several minutes to fully initialize your codespace. After the Visual Studio Code editor appears in your codespace, it can take several minutes to install Python and start the Streamlit server. When complete, a split screen view displays a code editor on the left and a running app on the right. The code editor opens two tabs by default: the repository's readme file and the app's entrypoint file.

   ![Click Fork to confirm and deploy your app](/images/streamlit-community-cloud/fork-public-hello-codespace.png)

   <Important>
      The app displayed in your codespace is not the same instance you deployed on Community Cloud. Your codespace is a self-contained development environment. When you make edits inside a codespace, those edits don't leave the codespace until you commit them to your repository. When you commit your changes to your repository, Community Cloud detects the changes and updates your deployed app. To learn more, see [Edit your app](/deploy/streamlit-community-cloud/manage-your-app/edit-your-app).
   </Important>

1. Edit your newly forked app as desired. For more instructions on working with GitHub Codespaces, see [Edit your app](/deploy/streamlit-community-cloud/manage-your-app/edit-your-app).
