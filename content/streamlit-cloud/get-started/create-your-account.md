---
title: Create your account
slug: /streamlit-community-cloud/get-started/create-your-account
---

# Create your account

Before you can start deploying apps for the world to see, you need to sign up for your Streamlit Community Cloud account.

![Sign up](/images/streamlit-community-cloud/sign-up.png)

Streamlit Community Cloud accounts have two underlying identities: primary and source control. Your primary identity is used for viewing analytics as well as viewing permissions. Your source-control identity is used for deploying and managing apps.

## Sign up

Although you can begin the sign-up process with GitHub, we recommend starting with Google or email in order to have a complete account from the start.
* Step 1: Primary identity (Google or email)
* Step 2: Source control (GitHub)
* Step 3: Set up your account

### Step 1: Primary identity

Your primary identity is associated to an email. You can log in through Google or through emailed sign-in links which are valid for 15 minutes once requested.

If you're sharing a private app, you will assign viewing permission by email. Therefore, your app's users will need to log in with either Google or emailed links.

#### Primary identity option 1: Google

1. Go to [share.streamlit.io/sigup](https://share.streamlit.io/signup)
2. Click "**Continute with Google**".

<div style={{ maxWidth: '50%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/sign-up-Google-XL.png" />
</div>

3. Enter your Google credentials and click "**Next**".

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/sign-in-Google-2.png" />
</div>

4. If you will be deploying or managing any apps, click "**Connect GitHub account**" and proceed to [Step 2: Source Control](/streamlit-community-cloud/get-started/create-your-account#step-2-source-control). If you are only going to be viewing apps and will not be using GitHub, you can click "**Skip this step**" and proceed to Step 3: Set up your account.

<div style={{ maxWidth: '50%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/sign-up-2.png" />
</div>

#### Primary identity option 2: email

1. Go to [share.streamlit.io/sigup](https://share.streamlit.io/signup)
2. Enter your email address and click "**Continute with email**".

<div style={{ maxWidth: '50%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/sign-up-email-XL.png" />
</div>

3. A confirmation screen will display, telling you to check your email.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/sign-in-email-2.png" />
</div>

4. Check your inbox for an email from Streamlit, with the subject "Sign in to Streamlit Cloud". Click the link to sign in.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/sign-in-email-3.png" />
</div>

5. If you will be deploying or managing any apps, click "**Connect GitHub account**" and proceed to [Step 2: Source control](/streamlit-community-cloud/get-started/create-your-account#step-2-source-control). If you are only going to be viewing apps and will not be using GitHub, you can click "**Skip this step**" and proceed to Step 3: Set up your account.

<div style={{ maxWidth: '50%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/sign-up-2.png" />
</div>

### Step 2: Source control

Streamlit Community Cloud is integreated with GitHub for source control. If you begin your sign-up process with GitHub, you will not be directly prompted to create a primary identity. However, you can attach a Google account later.

There are two different authorization requests that will occur when you [Connect GitHub](/streamlit-community-cloud/get-started/connect-github) to your account. You will encounter the first authorization request when you connect your GitHub account. A second authorization is needed the first time you deploy an app. If you will be deploying any apps from a GitHub organization, your authorization requests will additional options to request or grant [Organization access](/streamlit-community-cloud/get-started/connect-github#organization-access).

1. After completing Step 1: Primary identity or after clicking "**Continue with GitHub**" from the sign-up page, enter your GitHub credentials and click "**Sign in**".

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/sign-in-GitHub-2.png" />
</div>

2. Click "**Authorize streamlit**".

<div style={{ maxWidth: '50%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/GitHub-auth1-none.png" />
</div>

3. Continue to Step 3: Set up your account

### Step 3: Set up your account

As a final step to account creation, please tell us about yourself and your experience with Streamlit. This is also when you can read and acknowledge our [Terms of use](https://www.streamlit.io/sharing/terms-of-use) and [Privacy notice](https://streamlit.io/privacy-policy). The email you provide in this survey is not used as your account email.

1. Fill in your information and click "**Continue**" at the bottom of the screen.

<div style={{ maxWidth: '70%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/sign-up-3.png" />
</div>

2. You will be taken to your workspace.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/workspace-empty-warning.png" />
</div>

## Finish

Congratulations on creating your Streamlit Community Cloud account! A warning icon next to "**Settings**" in the upper-right corner is expected; this indicates one of three things:

1. You created a primary identity and skipped connecting GitHub.
2. You started with GitHub and did not create a primary identity.
3. You created both a primary identity and connected GitHub, but the second authorization for GitHub is still pending. You will be prompted with the second authorization when you deploy your first app.
