---
title: Get started
slug: /streamlit-community-cloud/get-started
---

# Get started

Welcome to Streamlit Community Cloud! First things first, before you get started with Streamlit Community Cloud, you need to have a Streamlit app to deploy. If you haven't built one yet, read our [Get started](/library/get-started) docs or start with an [Example app](https://streamlit-cloud-example-apps-streamlit-app-sw3u0r.streamlit.app/). Either way, it only takes a few minutes to create your first app.

## How Streamlit Community Cloud works

Streamlit Community Cloud is a workspace for you to deploy, manage, and collaborate on your Streamlit apps. You connect your Streamlit Community Cloud account directly to your GitHub repository (public or private) and then Streamlit Community Cloud launches the apps directly from the code you've stored on GitHub. Most apps will launch in only a few minutes. Any time you update the code on GitHub, your app will automatically update for you. This creates a fast iteration cycle for your deployed apps so developers and viewers can rapidly prototype, explore, and update apps.

Under the hood Streamlit Community Cloud handles all of the containerization and authentication so that all you need to worry about is creating the app. Maintaining Streamlit apps is easy. Containers get the latest security patches and are actively monitored for container health.

## Getting started

Getting your workspace set up with Streamlit Community Cloud only takes a few minutes.

1. [Sign up for Streamlit Community Cloud](#sign-up-for-streamlit-community-cloud)
2. [Log in to your account](#log-in-to-sharestreamlitio)
3. [Connect your Streamlit Community Cloud account to GitHub](#connect-your-github-account)
4. [Explore your Streamlit Community Cloud workspace](#explore-your-streamlit-community-cloud-workspace)
5. [Invite other developers on your team](#invite-other-developers-to-your-workspace)

## Sign up for Streamlit Community Cloud

Streamlit's Community Cloud allows you to deploy, manage, and share your apps with the world, directly from Streamlit — all for free. Sign up on the [Community Cloud homepage](https://streamlit.io/cloud).

![Sign up](/images/streamlit-community-cloud/sign-up.png)

Streamlit Community Cloud accounts have two underlying identities: primary and source control. Your primary identity is used for viewing analytics as well as viewing permissions. Your source-control identity is used for deploying and managing apps.

### Primary identity

Your primary identity is associated to an email. You can log in through [Google](#sign-in-with-google) or through [emailed sign-in links](#sign-in-with-email) which are valid for 15 minutes once requested. If you begin your sign-up process with Google or email, you will be prompted to optionally link a GitHub account as a second step.

If you're sharing a private app, you will assign viewing permission by email. Therefore, your app's users will need to log in with either Google or emailed links.

### Source control

Streamlit Community Cloud is integreated with [GitHub](#sign-in-with-github) for source control. If you begin your sign-up process with GitHub, you will not be prompted directly prompted to create a primary identity. However, you can attach a Google account later.

There are two different authorization requests that will occur when you [Connect your GitHub account](http://localhost:3000/streamlit-community-cloud/get-started#connect-your-github-account). You will encounter the first authorization request when you connect your GitHub account. A second authorization is needed the first time you deploy an app.

### New user survey

As a final step to account creation, we ask users about themselves and their experience with Streamlit. This is also when users agree to our terms of use. The email you provide in this survey is not used as your account email.

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

If your account is already linked to GitHub, you may be immediately prompted to [Sign in with GitHub](#sign-in-with-github). Once you have signed in, you can [Explore your Streamlit Community Cloud workspace!](#explore-your-streamlit-community-cloud-workspace)🎈

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

## Connect your GitHub account

In order to use GitHub with Streamlit, you need to authorize Streamlit to connect to your GitHub account. This lets your Streamlit Community Cloud workspace launch apps directly from the files you store in your repos. It also lets the system check for updates to those files and automatically update your app. You will see two different authorization screens to give this access. The first authorization happens when you connect your GitHub account to Streamlit. The second authorization happens when you deploy your first app. Click "**Authorize streamlit**" on both. Questions about GitHub permissions? [Read more here](/streamlit-community-cloud/troubleshooting#github-integration)!

<Important>

You must have **admin** permissions to your repo in order to deploy apps. If you don't have admin access, talk to your IT team or manager about helping you set up your Streamlit Community Cloud account or reach out to us on the [Community forum](https://discuss.streamlit.io/).

</Important>

<div style={{ marginBottom: '-3em' }}>
    <Flex>
    <Image caption="Authorization screen 1" src="/images/streamlit-community-cloud/authorization-1.png" />
    <Image caption="Authorization screen 2" src="/images/streamlit-community-cloud/authorization-2.png" />
    </Flex>
</div>

<Note>

Once a user is added to a repository on GitHub, it will take at most 15 minutes before they can deploy the app on Cloud. If a user is removed from a repository on GitHub, it will take at most 15 minutes before their permissions to manage the app from that repository are revoked.

</Note>

## Explore your Streamlit Community Cloud workspace

Congrats! You are now logged in and ready to go. If you are joining someone else's workspace you may already see apps populated in your workspace. If not, then you need to deploy an app! Check out our next section on how to [deploy an app](/streamlit-community-cloud/get-started/deploy-an-app). And if you need an app to deploy check out our [example apps](https://streamlit-cloud-example-apps-streamlit-app-sw3u0r.streamlit.app/) that include apps for machine learning, data science, and business use cases.

<Image alt="Workspace 1" src="/images/streamlit-community-cloud/workspace-1.png" />

You may also find that you already have multiple Streamlit Community Cloud workspaces. Streamlit Community Cloud automatically groups your apps according to the corresponding GitHub repository's owner. In the upper right corner you can see the workspaces you have access to. If your team has already launched apps, then you will see those apps in your workspace. Read more about workspaces [here](/streamlit-community-cloud/get-started/manage-your-app#app-workspaces).

<Image alt="Workspace 2" src="/images/streamlit-community-cloud/workspace-2.png" />

## Invite other developers to your workspace

Inviting other developers is simple, just invite them to your GitHub repository so that you can code on apps together, and then have them log in to [share.streamlit.io](https://share.streamlit.io). If you are working as a team, you likely are already in the same repos, so skip step 1 and go straight to having them log into [share.streamlit.io](https://share.streamlit.io)

Streamlit Community Cloud inherits developer permissions from GitHub, so when your teammates log in, they will automatically view the workspaces you share. From there you can all deploy, manage, and share apps together.

And remember, whenever anyone on the team updates the code on GitHub, the app will also automatically update for you!
