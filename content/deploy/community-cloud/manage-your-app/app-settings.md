---
title: App settings
slug: /deploy/streamlit-community-cloud/manage-your-app/app-settings
description: Learn how to configure your Streamlit app settings including URL customization, sharing permissions, and secrets management.
keywords: settings, url, subdomain, sharing, permissions, secrets, configuration, customize, manage
---

# App settings

This page is about your app settings on Streamlit Community Cloud. From your app settings you can [view or change your app's URL](/deploy/streamlit-community-cloud/manage-your-app/app-settings#view-or-change-your-apps-url), manage [public or private access to your app](/deploy/streamlit-community-cloud/share-your-app), and update your saved [secrets for your apps](/deploy/streamlit-community-cloud/deploy-your-app/secrets-management).

If you access "**Settings**" from your [app chrome](/develop/concepts/architecture/app-chrome) in the upper-right corner of your running app, you can access features to control the appearance of your app while it's running.

## Access your app settings

You can get to your app's settings:

- [From your workspace](#access-app-settings-from-your-workspace).
- [From your Cloud logs](#access-app-settings-from-your-cloud-logs).

### Access app settings from your workspace

From your workspace at <a href="https://share.streamlit.io" target="_blank">share.streamlit.io</a>, click the overflow icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>more_vert</i>) next to your app. Click "**Settings**."

![Access app settings from your workspace](/images/streamlit-community-cloud/workspace-app-settings.png)

### Access app settings from your Cloud logs

From your app at `<your-custom-subdomain>.streamlit.app`, click "**Manage app**" in the lower-right corner.

![Access Streamlit Community Cloud logs from your app](/images/streamlit-community-cloud/cloud-logs-open.png)

Click the overflow menu icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>more_vert</i>) and click "**Settings**."

![Access app settings from your Cloud logs](/images/streamlit-community-cloud/cloud-logs-menu-settings.png)

## Change your app settings

### View or change your app's URL

To view or customize your app subdomain from the dashboard:

1. Access your app's settings as described above.
1. On the "**General**" tab in the "App settings" dialog, see your app's unique subdomain in the "App URL" field.

   ![General app settings on Streamlit Community Cloud: Custom subdomain](/images/streamlit-community-cloud/workspace-app-settings-general.png)

1. Optional: Enter a new, custom subdomain between 6 and 63 characters in length, and then click "**Save**."

   ![New custom subdomain for your app](/images/streamlit-community-cloud/workspace-app-settings-general-valid-domain.png)

   If a custom subdomain is not available (e.g. because it's already taken or contains restricted words), you'll see an error message. Change your subdomain as indicated.

   ![Invalid custom subdomain for your app](/images/streamlit-community-cloud/workspace-app-settings-general-invalid-domain.png)

### Update your app's share settings

Learn how to [Share your app](/deploy/streamlit-community-cloud/share-your-app).

![Share settings on Streamlit Community Cloud](/images/streamlit-community-cloud/workspace-app-settings-sharing.png)

### View or update your secrets

1. Access your app's settings as described above.
1. On the "**Secrets**" tab in the "App settings" dialog, see your app's secrets in the "Secrets" field.

   ![Secrets app settings on Streamlit Community Cloud](/images/streamlit-community-cloud/workspace-app-settings-secrets.png)

1. Optional: Add, edit, or delete your secrets, and then click "**Save**."

Learn more about [Secrets management for your Community Cloud app](/deploy/streamlit-community-cloud/deploy-your-app/secrets-management).
