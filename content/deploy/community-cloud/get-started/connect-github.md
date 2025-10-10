---
title: Connect your GitHub account
slug: /deploy/streamlit-community-cloud/get-started/connect-your-github-account
description: Connect your GitHub account to Community Cloud to deploy apps from public and private repositories with proper permissions.
keywords: github, connect, oauth, repositories, public, private, permissions, organization, access
---

# Connect your GitHub account

Connecting GitHub to your Streamlit Community Cloud account allows you to deploy apps directly from the files you store in your repositories. It also lets the system check for updates to those files and automatically update your apps. When you first connect your GitHub account to your Community Cloud account, you'll be able to deploy apps from your public repositories to Community Cloud. If you want to deploy from private repositories, you can give Community Cloud additional permissions to do so. For more information about these permissions, see [GitHub OAuth scope](/deploy/streamlit-community-cloud/status#github-oauth-scope).

<Important>
    In order to deploy an app, you must have **admin** permissions to its repository. If you don't have admin access, contact the repository's owner or fork the repository to create your own copy. For more help, see our <a href="https://discuss.streamlit.io/" target="_blank">community forum</a>.
</Important>

If you are a member of a GitHub organization, that organization is displayed at the bottom of each GitHub OAuth prompt. In this case, we recommend reading about [Organization access](#organization-access) at the end of this page before performing the steps to connect your GitHub account. You must be an organization's owner in GitHub to grant access to that organization.

## Prerequisites

- You must have a Community Cloud account. See [Create your account](/deploy/streamlit-community-cloud/get-started/create-your-account).
- You must have a GitHub account.

## Add access to public repositories

1. In the upper-left corner, click "**Workspaces <i style={{ verticalAlign: "-.25em", color: "#ff8700" }} className={{ class: "material-icons-sharp" }}>warning</i>**."

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Connect your GitHub account to a new Community Cloud account" src="/images/streamlit-community-cloud/workspace-unconnected-setup.png" />
</div>

1. From the drop down, click "**Connect GitHub account**."
1. Enter your GitHub credentials and follow GitHub's authentication prompts.
1. Click "**Authorize streamlit**."

   <div style={{ maxWidth: '40%', margin: 'auto' }}>
   <Image alt="Authorize Community Cloud to connect to your GitHub account" src="/images/streamlit-community-cloud/GitHub-auth1-none.png" />
   </div>

   This adds the "Streamlit" OAuth application to your GitHub account. This allows Community Cloud to work with your public repositories and create codespaces for you. In the next section, you can allow Community Cloud to access your private repositories, too. For more information about using and reviewing the OAuth applications on your account, see [Using OAuth apps](https://docs.github.com/en/apps/oauth-apps/using-oauth-apps) in GitHub's docs.

## Optional: Add access to private repositories

After your Community Cloud account has access to deploy from your public repositories, you can follow these additional steps to grant access to your private repositories.

1. In the upper-left corner, click on your GitHub username.

<div style={{ maxWidth: '90%', margin: 'auto' }}>
<Image alt="Access your workspace settings" src="/images/streamlit-community-cloud/workspace-empty-menu.png" />
</div>

1. From the drop down, click "**Settings**."
1. On the left side of the dialog, select "**Linked accounts**."
1. Under "Source control," click "**Connect here <i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>arrow_forward</i>**."
1. Click "**Authorize streamlit**."

<div style={{ maxWidth: '40%', margin: 'auto' }}>
<Image alt="Authorize Community Cloud to connect to your private GitHub repositories" src="/images/streamlit-community-cloud/GitHub-auth2-none.png" />
</div>

## Organization access

To deploy apps from repositories owned by a GitHub organization, Community Cloud must have permission to access the organization's repositories. If you are a member of a GitHub organization when you connect your GitHub account, your OAuth prompts will include a section labeled "Organization access."

<div style={{ maxWidth: '40%', margin: 'auto' }}>
<Image alt="GitHub Oauth prompt including organization access" src="/images/streamlit-community-cloud/GitHub-auth1-organizations.png" />
</div>

If you have already connected your GitHub account and need to add access to an organization, follow the steps in [Manage your GitHub connection](/deploy/streamlit-community-cloud/manage-your-account/manage-your-github-connection) to disconnect your GitHub account and start over. Alternatively, if you are not the owner of an organization, you can ask the owner to create a Community Cloud account for themselves and add permission directly.

### Organizations you own

For any organization you own, if authorization has not been previously granted or denied, you can click "**Grant**" before you click "**Authorize streamlit**."

<div style={{ maxWidth: '80%', margin: 'auto' }}>
<Image alt="Authorize your Streamlit on a GitHub organization you own" src="/images/streamlit-community-cloud/GitHub-auth-grant-XL.png" />
</div>

### Organizations owned by others

For an organization you don't own, if authorization has not been previously granted or denied, you can click "**Request**" before you click "**Authorize streamlit**."

<div style={{ maxWidth: '80%', margin: 'auto' }}>
<Image alt="Authorize your Streamlit on a GitHub organization owned by others" src="/images/streamlit-community-cloud/GitHub-auth-request-XL.png" />
</div>

### Previous or pending authorization

If someone has already started the process of authorizing Streamlit for your organization, the OAuth prompt will show the current status.

#### Approved access

If an organization has already granted Streamlit access, the OAuth prompt shows a green check (<i style={{ verticalAlign: "-.25em", color: "#1a7f37" }} className={{ class: "material-icons-sharp" }}>check</i>).

<div style={{ maxWidth: '60%', margin: 'auto' }}>
<Image alt="Approved authorization for Streamlit on an organization" src="/images/streamlit-community-cloud/GitHub-auth-granted-XL.png" />
</div>

#### Pending access

If a request has been previously sent but not yet approved, the OAuth prompt show "Access request pending." Follow up with the organization's owner to accept the request in GitHub.

<div style={{ maxWidth: '60%', margin: 'auto' }}>
<Image alt="Pending authorization for Streamlit on an organization" src="/images/streamlit-community-cloud/GitHub-auth-pending-XL.png" />
</div>

#### Denied access

If a request has been previously sent and denied, the OAuth prompt shows a red X (<i style={{ verticalAlign: "-.25em", color: "#d1242f" }} className={{ class: "material-icons-sharp" }}>close</i>). In this case, the organization owner will need to authorize Streamlit from GitHub. See GitHub's documentation on <a href="https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/authorizing-oauth-apps#oauth-apps-and-organizations" target="_blank">OAuth apps and organizations</a>.

<div style={{ maxWidth: '60%', margin: 'auto' }}>
<Image alt="Denied authorization for Streamlit on an organization" src="/images/streamlit-community-cloud/GitHub-auth-denied-XL.png" />
</div>

## What's next?

Now that you have your account you can [Explore your workspace](/deploy/streamlit-community-cloud/get-started/explore-your-workspace). Or if you're ready to go, jump right in and [Deploy your app](/deploy/streamlit-community-cloud/deploy-your-app).
