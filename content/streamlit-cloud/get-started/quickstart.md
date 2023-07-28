---
title: Quickstart
slug: /streamlit-community-cloud/get-started/quickstart
---

# Quickstart

This is a concise set of steps to create your Streamlit Community Cloud account and deploy an app. For other options and more explanations, start with [Sign up for Streamlit Community Cloud](/streamlit-community-cloud/get-started#sign-up-for-streamlit-community-cloud).

## Sign up

1. Go to [share.streamlit.io/signup](https://share.streamlit.io/signup).
2. Click "**Continue with Google**".

<div style={{ maxWidth: '50%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/sign-up-XL.png" />
</div>

3. Enter your Google credentials and follow Google's authentication prompts.
4. After authenticating with Google, click "**Connect GitHub account**".

<div style={{ maxWidth: '50%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/sign-up-2.png" />
</div>

5. Click "**Authorize streamlit**".

<div style={{ maxWidth: '50%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/GitHub-auth1-none.png" />
</div>

6. To finish, fill in your information and click "**Continue**" at the bottom of the screen.

<div style={{ maxWidth: '70%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/sign-up-3.png" />
</div>

7. You will be taken to your Streamlit workspace. If you see a warning icon next to "**Settings**" in the upper-right corner, this will addressed in the next steps.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/workspace-empty-warning.png" />
</div>

## Fork an example repository

8. If you already have a Streamlit app saved in one of your repositories, skip to step 13&mdash;[Deploy an app](#deploy-an-app). Otherwise, keep going to clone an example to your GitHub account.
9. Go to [github.com/streamlit/demo-uber-nyc-pickups](https://github.com/streamlit/demo-uber-nyc-pickups).
10. Click "**Fork**" in the upper-right corner of the repo.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/GitHub-fork1.png" />
</div>

11. Accept the defaults and click "**Create fork**" at the bottom of the page.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/GitHub-fork2.png" />
</div>

## Deploy an app

12. After the fork is created, return to [share.streamlit.io](https://share.streamlit.io/).
13. Click "**New app**".

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/deploy-empty-new-app.png" />
</div>

14. If you did not already complete the second GitHub authorization, you will be prompted that "**Streamlit is requesting additional permissions**". Click "**Authorize streamlit**".

<div style={{ maxWidth: '50%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/GitHub-auth2-none.png" />
</div>

15. Fill in the information for your forked repository. Your GitHub username should be displayed in the upper-right corner. If you are using the fork created in the above steps, the "**Repository**" field should have:

  <p style={{ textAlign: 'center' }}><code>&lt;your GitHub username&gt;/demo-uber-nyc-pickups</code></p>

  You can leave "**App URL (Optional)**" with the default value or you can enter cool name for your app's URL. Click "**Deploy!**"

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/deploy-demo.png" />
</div>

16. Wait for the app to build. This may take a few minutes.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/deploy-demo-provisioning.png" />
</div>

## You're done!

Congratulations! You just deployed an app to Streamlit Community Cloud. 🎉 Your app may take a few minutes to fully build, but once it's done it will load automatically. Have fun exploring and happy Streamlit-ing!🎈

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image src="/images/streamlit-community-cloud/deploy-demo-done.png" />
</div>




