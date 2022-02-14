---
title: How do I share apps with viewers outside my organization?
slug: /knowledge-base/deploy/share-apps-with-viewers-outside-organization
---

# How do I share apps with viewers outside my organization?

When you share an app with someone outside of your organization, they will receive an email inviting them to sign in with their email.

<Tip>

Click [here](/streamlit-cloud/get-started#sign-in-with-email) to learn more about how [sign in with email](/streamlit-cloud/get-started#sign-in-with-email) works.

</Tip>

Viewer auth allows you to restrict the viewers of your app. To access your app, users have to authenticate using an email-based passwordless login or [single sign-on (SSO)](/streamlit-cloud/get-started/share-your-app/configuring-single-on-sso). You can share your app with viewers outside your organization in two ways:

- [Adding viewers from the app](#adding-viewers-from-the-app)
- [Adding viewers from your dashboard](#adding-viewers-from-your-dashboard)

## Adding viewers from the app

From your deployed app you can easily add viewers from your developer console.

1. **Select "Manage app" in the lower right corner.**
<div style={{ maxWidth: '45%', marginBottom: '-3em', marginLeft: '10em' }}>
    <Image src="/images/streamlit-cloud/manage-app.png" />
</div>
2. **Choose "Settings" from the menu.**
<div style={{ maxWidth: '45%', marginBottom: '-3em', marginLeft: '10em' }}>
    <Image src="/images/streamlit-cloud/settings-menu.png" />
</div>
3. **Add Viewers in Settings.**

   You can choose to allow anyone from a domain, for example allowing "foo.corp" would allow anyone with an email from foo.corp. Or you can choose to allow only selected viewers based on their individual emails. Make sure to enter them as a line-separated list.

   ![Add viewers](/images/streamlit-cloud/add-viewers.png)

The viewers you have added will receive an email, like the one below, inviting them to [sign in with their email](/streamlit-cloud/get-started#sign-in-with-email).

<Image src="/images/streamlit-cloud/app-invite-notification.png" />

## Adding viewers from your dashboard

You can also add viewers directly from your dashboard.

1. **Open settings for your app**

   Navigate to the app you want to add viewer to and click the hamburger icon to select "Settings."

   <div style={{ maxWidth: '75%', marginBottom: '-3em', marginLeft: '5em' }}>
       <Image src="/images/streamlit-cloud/edit-secrets.png" />
   </div>

2. **Add Viewers in Settings**

   Click on the "Sharing" section in the App Settings and in the text input area, provide a line-separated list of email addresses for the users you wish to grant viewer access to your app, or provide a line-separated list of allowed email address domains. Click "Save."

   <div style={{ maxWidth: '75%', marginBottom: '-3em', marginLeft: '5em' }}>
       <Image src="/images/streamlit-cloud/add-viewers.png" />
   </div>

The viewers you have added will receive an email, like the one below, inviting them to [sign in with their email](/streamlit-cloud/get-started#sign-in-with-email).

<Image src="/images/streamlit-cloud/app-invite-notification.png" />
