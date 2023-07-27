---
title: Share your app
slug: /streamlit-community-cloud/share-your-app
---

# Share your app

Now that your app is deployed you can easily share it and collaborate on it. But first, let's take a moment and do a little joy dance for getting that app deployed! 🕺💃

Your app is now live at that fixed URL, so go wild and share it with whomever you want. Your app will inherit permissions from your GitHub repo, meaning that if your repo is private your app will be private and if your repo is public your app will be public. If you want to change that you can simply do so from the app menu.

- [Sharing private apps](#sharing-private-apps)
- [Sharing public apps](#sharing-public-apps)
- [Adding developers](/streamlit-community-cloud/get-started/share-your-app#adding-developers)

There are three primary ways to share your app with viewers. You can either directly add viewers from the in-app share menu, or do so from the Cloud logs menu, or from your app dashboard.

## Sharing private apps

By default all apps deployed from private source code are private to the developers in the workspace. Your apps will not be visible to anyone else unless you grant them explicit permission. You can grant permission either in your workspace or from the app itself.

![Sharing private apps](/images/streamlit-community-cloud/sharing-private-apps.png)

### What is viewer auth?

<!-- Viewer auth allows you to restrict the viewers of your app. To access your app, users have to authenticate using an email-based passwordless login or [single sign-on (SSO)](/streamlit-community-cloud/get-started/share-your-app/configuring-single-on-sso). -->

Viewer auth allows you to restrict the viewers of your app. To access your app, users have to authenticate using an email-based passwordless login or Google OAuth.

### Configuring single sign-on

<!-- Google OAuth is enabled by default, so if your company uses Google, you're good to go. If you've configured SSO for your organization via ADFS, Azure, Okta, or generic SAML, you will also be able to add email addresses and domains which are administered by those services. Read [here](/streamlit-community-cloud/get-started/share-your-app/configuring-single-on-sso) for how to enable SSO for your org. -->

Google OAuth is enabled by default, so if you use Google, you're good to go.

<!-- Once you have added someone's email address to your app's viewer list, that person will be able to sign in via Google Single Sign-On or your organization-specific Single Sign-On and view your app. They will also receive an email inviting them to view your app. If they are already logged in with that account in their browser (the usual case for most people) then they will automatically be able to view the app. If they are not logged in, or they have not been giving access, then they will see a page asking them to first log in. -->

Once you have added someone's email address to your app's viewer list, that person will be able to sign in via Google Single Sign-On and view your app. They will also receive an email inviting them to view your app. If they are already logged in with that account in their browser (the usual case for most people) then they will automatically be able to view the app. If they are not logged in, or they have not been given access, then they will see a page asking them to first log in.

<Tip>

Having trouble granting access? Is a viewer having trouble logging on? See our [troubleshooting section](/streamlit-community-cloud/troubleshooting) for help.

</Tip>

<!-- ### Granting access to your entire organization

If you add an entire email domain, anyone with an email address which uses that domain will be able to view your app after authenticating themselves. For example, if "foo.com" is added to the list of allowed email domains, anyone with an email address that ends in "@foo.com" will be allowed to view the app.

There are three primary ways to share your app with viewers. You can either directly add viewers from the in-app share menu, or do so from the Cloud logs menu, or from your app dashboard. -->

### Adding viewers from the in-app share menu

You can add viewers from the in-app share menu by clicking the "Share" button in the top right corner of your deployed app.

1. **Click "Share" in the top right corner.**

<div style={{ marginBottom: '-3em', marginLeft: '2em' }}>
    <Image src="/images/streamlit-community-cloud/in-app-share-menu-1.png" />
</div>

2. **Enter the email addresses of the viewers.**

<div style={{ maxWidth: '55%', marginBottom: '-3em', marginLeft: '10em' }}>
    <Image src="/images/streamlit-community-cloud/in-app-share-menu-2.png" />
</div>

3. **Click "Invite".**

   It's that easy! The viewers you have added will receive an email inviting them to visit your app. The most recently added viewers will appear at the top of the list in the in-app share menu.

<div style={{ maxWidth: '75%', marginBottom: '-1em', marginLeft: '4em' }}>
    <Image src="/images/streamlit-community-cloud/app-invite-notification.png" />
</div>

To remove a viewer, simply hover over their email address and click "X" that appears to the right:

<div style={{ maxWidth: '55%', marginBottom: '-1em', marginLeft: '10em' }}>
    <Image src="/images/streamlit-community-cloud/in-app-share-menu-3.png" />
</div>

Developers, invited viewers, and members of your workspace can all see the in-app share menu, read the list of viewers, and add and remove viewers.

<Important>

Only developers are allowed to toggle whether the app is public or private. App viewers don't have permission to change this setting.

</Important>

### Adding viewers from the Cloud logs menu

From your deployed app you can easily add viewers from your Cloud logs menu.

1. **Select "Manage app" in the lower right corner.**

<div style={{ maxWidth: '45%', marginBottom: '-3em', marginLeft: '10em' }}>
    <Image src="/images/streamlit-community-cloud/manage-app.png" />
</div>

2. **Choose "Settings" from the menu.**

<div style={{ maxWidth: '45%', marginBottom: '-3em', marginLeft: '10em' }}>
    <Image src="/images/streamlit-community-cloud/settings-menu.png" />
</div>

3. **Add Viewers in Settings.**

   You can choose to allow only selected viewers based on their individual emails. Make sure to enter them as a line-separated list.

   ![Add viewers](/images/streamlit-community-cloud/add-viewers.png)

### Adding viewers from the app dashboard

You can also add viewers directly from your dashboard.

1. **Open settings for your app**

   Navigate to the app you want to add viewer to and click the overflow menu icon (⋮) to select "Settings."

   <div style={{ maxWidth: '75%', marginBottom: '-3em', marginLeft: '5em' }}>
       <Image src="/images/streamlit-community-cloud/edit-secrets.png" />
   </div>

2. **Add Viewers in Settings**

   Click on the "Sharing" section in the App Settings and in the text input area, provide a line-separated list of email addresses for the users you wish to grant viewer access to your app. Click "Save."

   <div style={{ maxWidth: '75%', marginBottom: '-3em', marginLeft: '5em' }}>
       <Image src="/images/streamlit-community-cloud/add-viewers.png" />
   </div>

## Sharing public apps

From your deployed app you can click on the "⋮" icon on the top right and select 'Share this app' to post it directly into social media or to share with the community on our [Community forum](https://discuss.streamlit.io/c/streamlit-examples/9). We'd love to see what you make and perhaps feature your app as our app of the month ❤️.

### Add a GitHub badge

To help others find and play with your Streamlit app, you can add Streamlit's GitHub badge to your repo. Below is an example of what the badge looks like. Clicking on the badge takes you to, in this case, Streamlit's Face-GAN Demo.

<div style={{ marginBottom: '-2em', marginLeft: '30%' }}>
    <a href="https://streamlit-demo-face-gan-streamlit-app-v2nxgz.streamlit.app/" target="_blank" style={{ borderBottom: 0 }}>
    <Image src="https://static.streamlit.io/badges/streamlit_badge_black_white.svg" />
    </a>
</div>

Once you deploy your app, you can embed this badge right into your GitHub README.md by adding the following Markdown:

```markdown
[![Streamlit App](https://static.streamlit.io/badges/streamlit_badge_black_white.svg)](https://<your-custom-subdomain>.streamlit.app)
```

<Note>

Be sure to replace `https://<your-custom-subdomain>.streamlit.app` with the URL of your deployed app!

</Note>

## Adding developers

Inviting other developers is simple, just invite them to your GitHub repository so that you can code on apps together, and then have them log in to [share.streamlit.io](https://share.streamlit.io). If you are working as a team, you likely are already in the same repos, so skip step 1 and go straight to having them log into [share.streamlit.io](https://share.streamlit.io)

Streamlit Community Cloud inherits developer permissions from GitHub, so when your teammates log in, they will automatically view the workspaces you share. From there you can all deploy, manage, and share apps together.

### Pushing new code

You can also collaborate with other developers by having multiple contributors pushing to the same GitHub repo. Whenever anyone on the team updates the code on GitHub, the app will also automatically update for you!

If you want to try out something new while still keeping your original app running, just create a new branch, make some changes, and deploy a new version of the Streamlit app.

### Finding app code

Every deployed app has its GitHub source code linked in the "⋮" menu on the top right. So if you are looking to understand the code of another Streamlit app, you can navigate to the GitHub page from there and read or fork the app.
