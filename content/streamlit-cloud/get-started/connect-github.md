---
title: Connect GitHub
slug: /streamlit-community-cloud/get-started/connect-github
---

# Connect your GitHub account

Connecting GitHub to your Streamlit Community Cloud account allows you to deploy apps directly from the files you store in your repos. It also lets the system check for updates to those files and automatically update your app. There are two stages to this authorization: the first happens when you connect your account for the first time and the second happens when you deploy your first app.

Everyone is prompted to connect GitHub when they create an account. If you need to connect GitHub to an existing primary identity, see [Manage your GitHub connection](/streamlit-community-cloud/manage-your-account/manage-your-github-connection).

This page contains additional information about the authorization needed to connect GitHub. If you have just created your account, you are free to skip ahead and [Explore your workspace](/streamlit-community-cloud/get-started/workspace). GitHub's authorization prompts occur automatically as needed.

## Authorize your GitHub account

There are two different authorization screens to grant access between Streamlit and your GitHub account. The first authorization&mdash;"Authorize Streamlit"&mdash;happens when you connect your GitHub account to Streamlit. The second authorization&mdash;"Streamlit is requesting additional permissions"&mdash;happens when you deploy your first app. You must click "**Authorize streamlit**" on both. If you are a member of any GitHub organizations, read below to understand the extras steps to [Authorize an organization](#authorize-an-organization). Questions about GitHub permissions? Read some frequently asked questions about our [GitHub integration](/streamlit-community-cloud/troubleshooting#github-integration).

<Image alt="Authorize your GitHub account" src="/images/streamlit-community-cloud/GitHub-auth-none.png" />

<Important>

You must have **admin** permissions to your repo in order to deploy apps. If you don't have admin access, talk to the repo's owner or reach out to us on the [Community forum](https://discuss.streamlit.io/).

</Important>

## Organization access

If you are working in a repository that is owned by an organization, authorization must be granted by that organization. If you are a member of a GitHub organization when you connect your GitHub account, your authorization screens will include an extra section labeled "**Organization access**".

### Organizations you own

For any organization you own, if authorization has not been previously granted or denied you can click "**Grant**" before you click "**Authorize streamlit**".

<Image alt="Authorize your GitHub account" src="/images/streamlit-community-cloud/GitHub-auth-grant.png" />

### Organizations owned by others

For an organization you don't own, if authorization has not been previously granted or denied you can click "**Request**" before you click "**Authorize streamlit**".

<div style={{ maxWidth: '80%', margin: 'auto' }}>
<Image alt="Authorize your GitHub account" src="/images/streamlit-community-cloud/GitHub-auth-request-XL.png" />
</div>

### Previous or pending authorization

If someone else has already started the process of authorizing Streamlit for your organization, different options and statuses will display accordingly.

#### Approved access

If an organization has already granted Streamlit access, a green check is shown.

<div style={{ maxWidth: '60%', margin: 'auto' }}>
<Image alt="Authorize your GitHub account" src="/images/streamlit-community-cloud/GitHub-auth-granted-XL.png" clean />
</div>

#### Pending access

If a request has been previously sent but not yet approved, a pending status shows.

<div style={{ maxWidth: '60%', margin: 'auto' }}>
<Image alt="Authorize your GitHub account" src="/images/streamlit-community-cloud/GitHub-auth-pending-XL.png" clean />
</div>

#### Denied access

If a request has been previously sent and denied, no option to grant or request access is shown. In this case, the organization owner will need to authorize Streamlit from GitHub. See GitHub's documentation on [OAuth apps and organizations](https://docs.github.com/en/apps/oauth-apps/using-oauth-apps/authorizing-oauth-apps#oauth-apps-and-organizations).

<div style={{ maxWidth: '60%', margin: 'auto' }}>
<Image alt="Authorize your GitHub account" src="/images/streamlit-community-cloud/GitHub-auth-denied-XL.png" clean />
</div>
