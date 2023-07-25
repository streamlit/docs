---
title: Connect GitHub
slug: /streamlit-community-cloud/manage-your-account/connect-github
---

## Connect your GitHub account

In order to use GitHub with Streamlit, you need to authorize Streamlit to connect to your GitHub account. This lets your Streamlit Community Cloud workspace launch apps directly from the files you store in your repos. It also lets the system check for updates to those files and automatically update your app.

You will see two different authorization screens to grant this access. The first authorization&mdash;"Authorize Streamlit"&mdash;happens when you connect your GitHub account to Streamlit. The second authorization&mdash;"Streamlit is requesting additional permissions"&mdash;happens when you deploy your first app. Click "**Authorize streamlit**" on both. Questions about GitHub permissions? [Read more here](/streamlit-community-cloud/troubleshooting#github-integration)!

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