---
title: Secrets management for your Community Cloud app
slug: /deploy/streamlit-community-cloud/deploy-your-app/secrets-management
description: Learn how to securely manage secrets, credentials, and API keys for your Community Cloud app using the secrets management interface.
keywords: secrets, credentials, api keys, security, st.secrets, secrets.toml, environment variables, advanced settings
---

# Secrets management for your Community Cloud app

## Introduction

If you are [connecting to data sources](/develop/tutorials/databases), you will likely need to handle credentials or secrets. Storing unencrypted secrets in a git repository is a bad practice. If your application needs access to sensitive credentials, the recommended solution is to store those credentials in a file that is not committed to the repository and to pass them as environment variables.

## How to use secrets management

Community Cloud lets you save your secrets within your app's settings. When developing locally, you can use `st.secrets` in your code to read secrets from a `.streamlit/secrets.toml` file. However, this `secrets.toml` file should never be committed to your repository. Instead, when you deploy your app, you can paste the contents of your `secrets.toml` file into the "**Advanced settings**" dialog. You can update your secrets at any time through your app's settings in your workspace.

### Prerequisites

- You should understand how to use `st.secrets` and `secrets.toml`. See [Secrets management](/develop/concepts/connections/secrets-management).

### Advanced settings

While deploying your app, you can access "**Advanced settings**" to set your secrets. After your app is deployed, you can view or update your secrets through the app's settings. The deployment workflow is fully described on the next page, but the "**Advanced settings**" dialog looks like this:

<div style={{ maxWidth: '70%', margin: 'auto' }}>
<Image alt="Advanced settings for deploying your app" src="/images/streamlit-community-cloud/deploy-an-app-advanced.png" />
</div>

Simply copy and paste the contents of your local `secrets.toml` file into the "Secrets" field within the dialog. After you click "**Save**" to commit the changes, that's it!

### Edit your app's secrets

If you need to add or edit your secrets for an app that is already deployed, you can access secrets through your [App settings](/deploy/streamlit-community-cloud/manage-your-app/app-settings). See [View or update your secrets](/deploy/streamlit-community-cloud/manage-your-app/app-settings#view-or-update-your-secrets).
