---
title: Manage your GitHub connection
slug: /streamlit-community-cloud/manage-your-account/manage-your-github-connection
---

# Manage your GitHub connection

If you did not connect GitHub when you created your account or need to correct your GitHub authorization, this page is for you! If you just need to add an organization to your account, skip ahead to [Authorizing with an organization](#authorizing-with-an-organization).

If you are not fully logged in and authorized to both a primary identity (Google or email) and source control (GitHub), there will be a warning symbol in the upper-right corner of your workspace. This can mean one of three things:

* You are not signed in to a primary identity (Google or email).
* You are not signed in to source control (GitHub).
* Your source control has incomplete permissions.

<Image alt="Authorize your GitHub account" src="/images/streamlit-community-cloud/workspace-empty-warning-annotated.png" />

## Connecting GitHub to an existing primary identity

If you created your account without connecting GitHub or if you disconnected GitHub from your account, you can reconnect.

1. Click "**Settings**" in the upper-right corner of your workspace.
2. If you do not have GitHub connected, a warning is displayed saying, "**You are not signed in with a source control account**".

  If instead you see "**Streamlit does not have access to private repos on this GitHub account**" skip to step 5.
3. Click "**Sign in with GitHub**".

<div style={{ maxWidth: '75%', margin: 'auto' }}>
<Image alt="Authorize your GitHub account" src="/images/streamlit-community-cloud/account-no-source.png" />
</div>

4. Click "**Authorize streamlit**".

<div style={{ maxWidth: '50%', margin: 'auto' }}>
<Image alt="Authorize your GitHub account" src="/images/streamlit-community-cloud/GitHub-auth1-none.png" />
</div>

5. After completing the first authorization, your Workspace settings with still have a warning, "**Streamlit does not have access to private repos on this GitHub account**".
6. Click "**Allow access**".

<div style={{ maxWidth: '75%', margin: 'auto' }}>
<Image alt="Authorize your GitHub account" src="/images/streamlit-community-cloud/account-unauthorized-source.png" />
</div>

7. Click "**Authorize streamlit**".

<div style={{ maxWidth: '50%', margin: 'auto' }}>
<Image alt="Authorize your GitHub account" src="/images/streamlit-community-cloud/GitHub-auth2-none.png" />
</div>

GitHub is now connected to your account! 🥳

## Authorizing with an organization

If you are in an organization, you can grant or request access to that organization when you connect your GitHub account. Read more about organization access on GitHub's authorization prompts in [Connect GitHub](/streamlit-community-cloud/get-started/connect-github#authorize-an-organization).

If your GitHub account is already connected, you can remove permissions in your GitHub settings and force Streamlit to reprompt for GitHub authorization the next time you sign into Streamlit Community Cloud.

### Revoke and reauthorize

1. Sign out of Streamlit Community Cloud.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Authorize your GitHub account" src="/images/streamlit-community-cloud/account-sign-out.png" />
</div>

2. Go to your GitHub application settings at [github.com/settings/applications](https://github.com/settings/applications).
3. Click on the three dots to open the overflow menu for "**Streamlit**" and click "**Revoke**".

<div style={{ maxWidth: '75%', margin: 'auto' }}>
<Image alt="Authorize your GitHub account" src="/images/streamlit-community-cloud/GitHub-revoke.png" />
</div>

4. Click "**I understand, revoke access**".

<div style={{ maxWidth: '50%', margin: 'auto' }}>
<Image alt="Authorize your GitHub account" src="/images/streamlit-community-cloud/GitHub-revoke-confirm.png" />
</div>

5. Return to [share.streamlit.io](https://share.streamlit.io/) and sign in. You will be prompted to authorize GitHub as explained in [Connect GitHub](/streamlit-community-cloud/get-started/connect-github#authorize-an-organization).

### Granting previously denied access

If an organization owner has restricted Streamlit's access or restricted all OAuth applications, they may need to directly modify their permissions in GitHub. If an organization has restricted Streamlit's access, a red "**X**" will appear next to the organization when you are prompted to authorize with your GitHub account.

<div style={{ maxWidth: '60%', margin: 'auto' }}>
<Image alt="Authorize your GitHub account" src="/images/streamlit-community-cloud/GitHub-auth-denied-XL.png" clean />
</div>

See GitHub's documentation on [OAuth apps and organizations](https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/authorizing-oauth-apps#oauth-apps-and-organizations).
