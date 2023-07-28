---
title: Get started
slug: /streamlit-community-cloud/get-started
---

# Get started

Welcome to Streamlit Community Cloud! First things first, before you get started with Streamlit Community Cloud, you need to have a Streamlit app to deploy. If you haven't built one yet, read our [Get started](/library/get-started) docs or start with an [Example app](https://streamlit-cloud-example-apps-streamlit-app-sw3u0r.streamlit.app/). Either way, it only takes a few minutes to create your first app.

<Tip>

Do you want to hurry up and deploy an app as fast as possible? Try out [Quickstart](/streamlit-community-cloud/get-started/quickstart) for a concise set of steps to create your account, fork an example, and deploy it right away. You can always come back here for more explanation.

</Tip>

## How Streamlit Community Cloud works

Streamlit Community Cloud is a workspace for you to deploy, manage, and collaborate on your Streamlit apps. You connect your Streamlit Community Cloud account directly to your GitHub repository (public or private) and then Streamlit Community Cloud launches the apps directly from the code you've stored on GitHub. Most apps will launch in only a few minutes. Any time you update the code on GitHub, your app will automatically update for you. This creates a fast iteration cycle for your deployed apps so developers and viewers can rapidly prototype, explore, and update apps.

Under the hood Streamlit Community Cloud handles all of the containerization and authentication so that all you need to worry about is creating the app. Maintaining Streamlit apps is easy. Containers get the latest security patches and are actively monitored for container health.

## Getting started

Getting your workspace set up with Streamlit Community Cloud only takes a few minutes.

1. [Sign up for Streamlit Community Cloud](#sign-up-for-streamlit-community-cloud)
2. [Log in to your account](#log-in-to-sharestreamlitio)
3. [Explore your Streamlit Community Cloud workspace](#explore-your-streamlit-community-cloud-workspace)
4. [Invite other developers to your workspace](#invite-other-developers-to-your-workspace)

## Sign up for Streamlit Community Cloud

Streamlit's Community Cloud allows you to deploy, manage, and share your apps with the world, directly from Streamlit — all for free. Sign up on the [Community Cloud homepage](https://streamlit.io/cloud).

![Sign up](/images/streamlit-community-cloud/sign-up.png)

Streamlit Community Cloud accounts have two underlying identities: primary and source control. Your primary identity is used for viewing analytics as well as viewing permissions. Your source-control identity is used for deploying and managing apps.

### Primary identity

Your primary identity is associated to an email. You can log in through [Google](#sign-in-with-google) or through [emailed sign-in links](#sign-in-with-email) which are valid for 15 minutes once requested. If you begin your sign-up process with Google or email, you will be prompted to optionally link a GitHub account as a second step.

If you're sharing a private app, you will assign viewing permission by email. Therefore, your app's users will need to log in with either Google or emailed links.

### Source control

Streamlit Community Cloud is integreated with [GitHub](#sign-in-with-github) for source control. If you begin your sign-up process with GitHub, you will not be directly prompted to create a primary identity. However, you can attach a Google account later.

There are two different authorization requests that will occur when you [Connect GitHub](http://localhost:3000/streamlit-community-cloud/get-started/connect-github) to your account. You will encounter the first authorization request when you connect your GitHub account. A second authorization is needed the first time you deploy an app.

### New user survey

As a final step to account creation, we ask users about themselves and their experience with Streamlit. This is also when users acknowledge our [Terms of use](https://www.streamlit.io/sharing/terms-of-use) and [Privacy notice](https://streamlit.io/privacy-policy). The email you provide in this survey is not used as your account email.

## Log in to share.streamlit.io

Once you've created your account, sign in to [share.streamlit.io](https://share.streamlit.io) and follow the steps below.

![Sign in](/images/streamlit-community-cloud/sign-in.png)

### Sign in with Google

Visit [share.streamlit.io](https://share.streamlit.io) and click "**Continue with Google**".

<div style={{ maxWidth: '80%', margin: 'auto' }}>
    <Image src="/images/streamlit-community-cloud/sign-in-Google-1.png" alt="Google sign-in" />
</div>

On the next page, choose an account to sign in with and enter your Google account credentials.

<div style={{ maxWidth: '80%', margin: 'auto' }}>
    <Image src="/images/streamlit-community-cloud/sign-in-Google-2.png" alt="Google sign-in" />
</div>

If your account is already linked to GitHub, you may be immediately prompted to sign in with GitHub. Once you have signed in, you can [Explore your Streamlit Community Cloud workspace!](#explore-your-streamlit-community-cloud-workspace)🎈

### Sign in with GitHub

Visit [share.streamlit.io](https://share.streamlit.io) and click "**Continue with GitHub**".

<div style={{ maxWidth: '80%', margin: 'auto' }}>
    <Image src="/images/streamlit-community-cloud/sign-in-GitHub-1.png" alt="GitHub sign-in" />
</div>

On the next page, enter your GitHub credentials to sign in.

<div style={{ maxWidth: '80%', margin: 'auto' }}>
    <Image src="/images/streamlit-community-cloud/sign-in-GitHub-2.png" alt="GitHub sign-in" />
</div>

Once you have signed in to GitHub, you can [Explore your Streamlit Community Cloud workspace!](#explore-your-streamlit-community-cloud-workspace)🎈

### Sign in with Email

To sign in with email, visit [share.streamlit.io](https://share.streamlit.io) and enter the email you used to create your Streamlit Community Cloud account. Click "**Continue with email**".

<div style={{ maxWidth: '80%', margin: 'auto' }}>
    <Image src="/images/streamlit-community-cloud/sign-in-email-1.png" alt="Email sign-in" />
</div>

Once you do so, you will see a confirmation message (like the one below) asking you to check your email.

<div style={{ maxWidth: '80%', margin: 'auto' }}>
    <Image src="/images/streamlit-community-cloud/sign-in-email-2.png" alt="Email sign-in" />
</div>

Check your inbox for an email from Streamlit, with the subject "**Sign in to Streamlit Cloud**". Click the link in the email to sign in to Streamlit Community Cloud. Note that this link will expire in 15 minutes and can only be used once.

<div style={{ maxWidth: '80%', margin: 'auto' }}>
    <Image src="/images/streamlit-community-cloud/sign-in-email-3.png" alt="Email sign-in" />
</div>

Once you click the link in your email, you can [Explore your Streamlit Community Cloud workspace!](#explore-your-streamlit-community-cloud-workspace)🎈

## Explore your Streamlit Community Cloud workspace

Congrats! You are now logged in and ready to go. If you are joining someone else's workspace you may already see apps populated in your workspace. If not, then you need to deploy an app! Check out our next section on how to [Deploy your app](/streamlit-community-cloud/deploy-your-app). If you need an app to deploy, check out our [example apps](https://streamlit-cloud-example-apps-streamlit-app-sw3u0r.streamlit.app/) that include apps for machine learning, data science, and business use cases. You can read more about connecting to someone else's workspace in [Connect GitHub](http://localhost:3000/streamlit-community-cloud/get-started/connect-github).

![Workspace](/images/streamlit-community-cloud/workspace-empty.png)

You may also find that you already have multiple Streamlit Community Cloud workspaces. Streamlit Community Cloud automatically groups your apps according to the corresponding GitHub repository's owner or organzation. In the upper right corner you can see the workspaces you have access to. If apps have already been deployed from any of your repositories, then you will see those apps in your workspace. Learn more about [App workspaces](/streamlit-community-cloud/manage-your-app#app-workspaces).

![Switch workspaces](/images/streamlit-community-cloud/workspace-empty-switch.png)

## Invite other developers to your workspace

Inviting other developers is simple, just invite them to your GitHub repository so that you can code on apps together, and then have them log in to [share.streamlit.io](https://share.streamlit.io). Read more about connecting to a GitHub organization in [Connect GitHub](http://localhost:3000/streamlit-community-cloud/get-started/connect-github).

Streamlit Community Cloud inherits developer permissions from GitHub, so when your teammates log in, they will automatically view the workspaces you share. From there you can all deploy, manage, and share apps together.

<Note>

Once a user is added to a repository on GitHub, it will take at most 15 minutes before they can deploy the app on Cloud. If a user is removed from a repository on GitHub, it will take at most 15 minutes before their permissions to manage the app from that repository are revoked.

</Note>

And remember, whenever anyone on the team updates the code on GitHub, the app will also automatically update for you!
