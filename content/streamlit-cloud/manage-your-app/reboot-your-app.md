---
title: Reboot your app
slug: /streamlit-community-cloud/manage-your-app/reboot-your-app
---

# Reboot your app

If you need to clear your app's memory or force a fresh build after modifying a file that Streamlit Community Cloud doesn't monitor, you may need to reboot your app. This will interrupt any user who may currently be using your app and may take a few minutes for your app to re-deploy. Anyone visiting your app will see "Your app is in the oven" during a reboot.

Rebooting your app on Streamlit Community Cloud is easy! You can reboot your app [From your workspace](#from-your-workspace) or [From your Cloud logs](#from-your-cloud-logs).

### From your workspace

1. From your workspace at [share.streamlit.io](https://share.streamlit.io), click the overflow icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>more_vert</i>) next to your app. Click "**Reboot**".

    ![App analytics from your workspace](/images/streamlit-community-cloud/workspace-app-reboot.png)

2. A confirmation will display. Click "**Reboot**".

    <div style={{ maxWidth: '50%', margin: 'auto' }}>
    <Image alt="Confirm app reboot" src="/images/streamlit-community-cloud/workspace-app-reboot-confirm.png" clean />
    </div>

### From your Cloud logs

1. From your app at `<your-custom-subdomain>.streamlit.app`, click "**Manage app**" in the lower-right corner.

    ![Open Cloud logs](/images/streamlit-community-cloud/cloud-logs-open.png)

2. Click the overflow menu icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>more_vert</i>) and click "**Reboot app**".

    ![App settings from Cloud logs](/images/streamlit-community-cloud/cloud-logs-menu-reboot.png)

3. A confirmation will display. Click "**Reboot**".

    <div style={{ maxWidth: '50%', margin: 'auto' }}>
    <Image alt="Confirm app reboot" src="/images/streamlit-community-cloud/workspace-app-reboot-confirm.png" clean />
    </div>
