---
title: Manage your GitHub connection
slug: /deploy/streamlit-community-cloud/manage-your-account/manage-your-github-connection
description: Learn how to manage your GitHub connection to Community Cloud including adding organization access, revoking permissions, and handling account changes.
keywords: github connection, manage, organization access, revoke, reauthorize, oauth, permissions, account rename, repository rename
---

# Manage your GitHub connection

If you have created an account but not yet connected GitHub, see [Connect your GitHub account](/deploy/streamlit-community-cloud/get-started/connect-your-github-account).

If you have already connected your GitHub account but still need to allow Streamlit Community Cloud to access private repositories, see [Optional: Add access to private repositories](/deploy/streamlit-community-cloud/get-started/connect-your-github-account#optional-add-access-to-private-repositories).

## Add access to an organization

If you are in an organization, you can grant or request access to that organization when you connect your GitHub account. For more information, see [Organization access](/deploy/streamlit-community-cloud/get-started/connect-your-github-account#organization-access).

If your GitHub account is already connected, you can remove permissions in your GitHub settings and force Streamlit to reprompt for GitHub authorization the next time you sign in to Community Cloud.

### Revoke and reauthorize

1. From your workspace, click on your workspace name in the upper-right corner. To sign out of Community Cloud, click "**Sign out**."

   ![Sign out of Streamlit Community Cloud](/images/streamlit-community-cloud/account-sign-out.png)

1. Go to your GitHub application settings at <a href="https://github.com/settings/applications" target="_blank">github.com/settings/applications</a>.
1. Find the "Streamlit" application, and click on the three dots (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>more_horiz</i>) to open the overflow menu.

   If you have ever signed in to Community Cloud using GitHub, you will also see the "Streamlit Community Cloud" application in your GitHub account. The "Streamlit" application manages repository access. The "Streamlit Community Cloud" application is only for managing your identity (email) on Community Cloud. You only need to revoke access to the "Streamlit" application.

1. Click "**Revoke**."

   <div style={{ maxWidth: '75%', margin: 'auto' }}>
   <Image alt="Revoke access for Streamlit to access your GitHub account" src="/images/streamlit-community-cloud/GitHub-revoke.png" />
   </div>

1. Click "**I understand, revoke access**."

  <div style={{ maxWidth: '50%', margin: 'auto' }}>
  <Image alt="Confirm to revoke access for Streamlit to your GitHub account" src="/images/streamlit-community-cloud/GitHub-revoke-confirm.png" />
  </div>

1. Return to <a href="https://share.streamlit.io" target="_blank">share.streamlit.io</a> and sign in. You will be prompted to authorize GitHub as explained in [Connect GitHub](/deploy/streamlit-community-cloud/get-started/connect-your-github-account#organization-access).

### Granting previously denied access

If an organization owner has restricted Streamlit's access or restricted all OAuth applications, they may need to directly modify their permissions in GitHub. If an organization has restricted Streamlit's access, a red X (<i style={{ verticalAlign: "-.25em", color: "#d1242f" }} className={{ class: "material-icons-sharp" }}>close</i>) will appear next to the organization when you are prompted to authorize with your GitHub account.

<div style={{ maxWidth: '60%', margin: 'auto' }}>
<Image alt="Denied authorization for Streamlit to access your GitHub account" src="/images/streamlit-community-cloud/GitHub-auth-denied-XL.png" />
</div>

See GitHub's documentation on <a href="https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/authorizing-oauth-apps#oauth-apps-and-organizations" target="_blank">OAuth apps and organizations</a>.

## Rename your GitHub account or repositories

Community Cloud identifies apps by their GitHub coordinates (owner, repository, branch, entrypoint file path). If you rename your account or repository from which you've deployed an app, you will lose access to administer the app. To learn more, see [Rename your app in GitHub](/deploy/streamlit-community-cloud/manage-your-app/rename-your-app).
