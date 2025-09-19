---
title: Deploy an app from a template
slug: /deploy/streamlit-community-cloud/get-started/deploy-from-a-template
description: Learn how to deploy a Streamlit app from a template using Community Cloud's template picker with GitHub Codespaces integration.
keywords: template, deploy, fork, github codespaces, template picker, gdp dashboard, python version, subdomain
---

# Deploy an app from a template

Streamlit Community Cloud makes it easy to get started with several convenient templates. Just pick a template, and Community Cloud will fork it to your account and deploy it. Any edits you push to your new fork will immediately show up in your deployed app. Additionally, if you don't want to use a local development environment, Community Cloud makes it easy to create a GitHub codespace that's fully configured for Streamlit app development.

## Access the template picker

There are two ways to begin deploying a template: the "**Create app**" button and the template gallery at the bottom of your workspace.

- If you click the "**Create app**" button, Community Cloud will ask you "Do you already have an app?" Select "**Nope, create one from a template**."
- If you scroll to the bottom of your workspace in the "**My apps**" section, you can see the most popular templates. Click on one directly, or select "**View all templates**."

The template picker shows a list of available templates on the left. A preview for the current, selected template shows on the right.

!["Deploy from a template" page on Community Cloud](/images/streamlit-community-cloud/deploy-template-picker.png)

## Select a template

1. From the list of templates on the left, select "**GDP dashboard**."
1. Optional: For "Name of new GitHub repository," enter a name for your new, forked repository.

   When you deploy a template, Community Cloud forks the template repository into your GitHub account. Community Cloud chooses a default name for this repository based on the selected template. If you have previously deployed the same template with its default name, Community Cloud will append an auto-incrementing number to the name.

   <Note>
       Even if you have another user's or organization's workspace selected, Community Cloud will always deploy a template app from your personal workspace. That is, Community Cloud will always fork a template into your GitHub user account. If you want to deploy a template app from an organization, manually fork the template in GitHub, and deploy it from your fork in the associated workspace.
   </Note>

1. Optional: In the "App URL" field, choose a subdomain for your new app.

   Every Community Cloud app is deployed to a subdomain on `streamlit.app`, but you can change your app's subdomain at any time. For more information, see [App settings](/deploy/streamlit-community-cloud/manage-your-app/app-settings).

1. Optional: To edit the template in a GitHub codespace immediately, select the option to "**Open GitHub Codespaces...**"

   You can create a codespace for your app at any time. To learn how to create a codespace after you've deployed an app, see [Edit your app](/deploy/streamlit-community-cloud/manage-your-app/edit-your-app).

1. Optional: To change the version of Python, at the bottom of the screen, click "**Advanced settings**," select a Python version, and then click "**Save**."

   <Important>
       After an app is deployed, you can't change the version of Python without deleting and redeploying the app. 
   </Important>

1. At the bottom, click "**Deploy**."

## View your app

- If you didn't select the option to open GitHub Codespaces, you are redirected to your new app.

  ![GDP dashboard template app](/images/streamlit-community-cloud/deploy-template-GDP.png)

- If you selected the option to open GitHub Codespaces, you are redirected to your new codespace, which can take several minutes to be fully initialized. After the Visual Studio Code editor appears in your codespace, it can take several minutes to install Python and start the Streamlit server. When complete, a split screen view displays a code editor on the left and a running app on the right. The code editor opens two tabs by default: the repository's readme file and the app's entrypoint file.

  ![GDP dashboard template app in a codespace](/images/streamlit-community-cloud/deploy-template-GDP-codespace.png)

<Important>
    The app displayed in your codespace is not the same instance you deployed on Community Cloud. Your codespace is a self-contained development environment. When you make edits inside a codespace, those edits don't leave the codespace until you commit them to your repository. When you commit your changes to your repository, Community Cloud detects the changes and updates your deployed app. To learn more, see [Edit your app](/deploy/streamlit-community-cloud/manage-your-app/edit-your-app).
</Important>
