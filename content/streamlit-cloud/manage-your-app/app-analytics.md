---
title: App analytics
slug: /streamlit-community-cloud/manage-your-app/app-analytics
---

# App analytics

Streamlit Community Cloud allows you to see the viewership of each of your apps. Specifically, you can see:
* The total viewers count of your app (counted from April 2022).
* The most recent unique viewers (capped up to your last 20 viewers).
* A relative timestamp of each unique viewer's last visit.

![App analytics](/images/streamlit-community-cloud/workspace-app-analytics-viewers.png)

## Access your app anlytics

You can get to your app's settings in three ways:

* [From your workspace](#from-your-workspace)
* [From your Cloud logs](#from-your-cloud-logs)

### From your workspace

From your workspace at [share.streamlit.io](https://share.streamlit.io), click the overflow icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>more_vert</i>) next to your app. Click "**Analytics**".

![App analytics from your workspace](/images/streamlit-community-cloud/workspace-app-analytics.png)

Alternatively, from the top of your workspace, click "**Analytics**".

![App analytics from your workspace](/images/streamlit-community-cloud/workspace-analytics.png)

### From your Cloud logs

From your app at `<your-custom-subdomain>.streamlit.app`, click "**Manage app**" in the lower-right corner.

![Open Cloud logs](/images/streamlit-community-cloud/cloud-logs-open.png)

Click the overflow menu icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>more_vert</i>) and click "**Analytics**".

![App settings from Cloud logs](/images/streamlit-community-cloud/cloud-logs-menu-analytics.png)

## Switch between apps

Once you are in the analytics modal, you can switch between apps in the workspace from the drop-down list.

![App analytics](/images/streamlit-community-cloud/workspace-app-analytics-switch.png)

## App viewers for public vs private apps

For public apps, we anonymize all viewers outside your workspace to protect their privacy and display anonymous viewers as random pseudonyms. You'll still be able to see the identities of fellow members in your workspace, though.

Meanwhile, for private apps where you control who has access, you will be able to see the specific users who recently viewed your apps.

Additionally, you may occasionally see anonymous users in a private app. Rest assured, these anonymous users _do_ have authorized view access granted by you or your workspace members.

Common reasons why users show up anonymously are:

1. The app was previously public.
2. The given viewer viewed the app in April 2022, when the Streamlit team was honing user identification for this feature.
3. The given viewer disconnected their primary identity (Google or email) and source control identity (GitHub) previously.

See Streamlit's general [Privacy Notice](https://streamlit.io/privacy-policy).
