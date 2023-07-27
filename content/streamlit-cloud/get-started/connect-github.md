---
title: Connect GitHub
slug: /streamlit-community-cloud/get-started/connect-github
---

# Connect your GitHub account

In order to use GitHub with Streamlit, you need to authorize Streamlit to connect to your GitHub account. This lets your Streamlit Community Cloud workspace launch apps directly from the files you store in your repos. It also lets the system check for updates to those files and automatically update your app.

## Authorize your GitHub account

There are two different authorization screens to grant access between Streamlit and your GitHub account. The first authorization&mdash;"Authorize Streamlit"&mdash;happens when you connect your GitHub account to Streamlit. The second authorization&mdash;"Streamlit is requesting additional permissions"&mdash;happens when you deploy your first app. Click "**Authorize streamlit**" on both. If you are a member of any GitHub organizations, see [Authorize and organization](#authorize-an-organization) for the extra required steps. Questions about GitHub permissions? [Read more here](/streamlit-community-cloud/troubleshooting#github-integration)!

<Image alt="Authorize your GitHub account" src="/images/streamlit-community-cloud/GitHub-auth-none.png" />

<Important>

You must have **admin** permissions to your repo in order to deploy apps. If you don't have admin access, talk to the repo's owner or reach out to us on the [Community forum](https://discuss.streamlit.io/).

</Important>

## Authorize an organization

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

If a request has been previously sent and denied, no option to grant or request access is shown. In this case, the organization owner will need to authorize Streamlit from GitHub.

<div style={{ maxWidth: '60%', margin: 'auto' }}>
<Image alt="Authorize your GitHub account" src="/images/streamlit-community-cloud/GitHub-auth-denied-XL.png" clean />
</div>

<Note>

Once a user is added to a repository on GitHub, it will take at most 15 minutes before they can deploy the app on Cloud. If a user is removed from a repository on GitHub, it will take at most 15 minutes before their permissions to manage the app from that repository are revoked.

</Note>