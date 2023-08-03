---
title: Delete your app
slug: /streamlit-community-cloud/manage-your-app/delete-your-app
---

# Delete your app

If you need to delete your app, it's simple and easy. There are several cases where you may need to delete your app:

* You have finished playing around with an example app.
* You want to deploy from a private repository but already have a private app.
* You want to change the Python version for your app or otherwise redeploy your app.

If you delete your app and intend to immediately redploy it, your custom subdomain should be immediately available for reuse.

You can delete your app [From your workspace](#from-your-workspace) or [From your Cloud logs](#from-your-cloud-logs).

### From your workspace

1. From your workspace at [share.streamlit.io](https://share.streamlit.io), click the overflow icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>more_vert</i>) next to your app. Click "**Delete**".

    ![App analytics from your workspace](/images/streamlit-community-cloud/workspace-app-delete.png)

2. A confirmation will display. Enter the required confirmation string and click "**Delete**".

    <div style={{ maxWidth: '50%', margin: 'auto' }}>
    <Image alt="Confirm app reboot" src="/images/streamlit-community-cloud/workspace-app-delete-confirm.png" clean />
    </div>

### From your Cloud logs

1. From your app at `<your-custom-subdomain>.streamlit.app`, click "**Manage app**" in the lower-right corner.

    ![Open Cloud logs](/images/streamlit-community-cloud/cloud-logs-open.png)

2. Click the overflow menu icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>more_vert</i>) and click "**Delete app**".

    ![App settings from Cloud logs](/images/streamlit-community-cloud/cloud-logs-menu-delete.png)

3. A confirmation will display. Enter the required confirmation string and click "**Delete**".

    <div style={{ maxWidth: '50%', margin: 'auto' }}>
    <Image alt="Confirm app reboot" src="/images/streamlit-community-cloud/workspace-app-delete-confirm.png" clean />
    </div>
