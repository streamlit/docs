---
title: Streamlit Teams (Enterprise)
slug: /streamlit-cloud/enterprise
---

## Streamlit Cloud (Teams and Enterprise)

Streamlit Cloud Teams and Enterprise tiers enable you to securely deploy, manage, and share your Streamlit apps within your company, customers, and partners.

<Note>

If you're completely new to Streamlit, check out our [Get started with Streamlit](/library/get-started) page!

</Note>

### Get started — launch your first app!

You should already have access to your workspace, so log in and start deploying apps 😁. Here is a quick get started guide with links to more documentation. We'd also love to hop on a call with you to go over any of your apps and any feedback or questions you have.

1. **Allowlist your developers** 👷‍♀️

    Please send the list of GitHub accounts you want in your Streamlit for Teams workspace. If you need to add or remove people during the beta (before the full admin interface lands), just ping your Streamlit contact.

2. **Log in to your dashboard** 👩🏻‍💻

    Go to [share.streamlit.io](https://share.streamlit.io/) and click to authenticate with GitHub. If that fails it means that we don't have that GitHub account allowlisted, so just send the username to your Streamlit contact and we'll get it listed for you.

3. **Grant repo access** 👑

    When you log in for the first time you will need to grant access to the GitHub private repo you wish to use for your apps. An admin of the repo must grant the access, so if you are not an admin, please get them a Streamlit for Teams account so they can grant access.

4. **Launch a test app! 🎈**

    We suggest doing a sample deployment to get used to the interface. Follow along in the [deployment instruction guide](/streamlit-cloud/community) to deploy your first app. For your full apps you'll want to make sure your secrets and viewer auth are set up before launching the app.

5. **Set up secrets** 🗝

    Secure access to the data for your app with secrets management. Read the [documentation on using secrets](/streamlit-cloud/community#secrets-management). We also have a number of [guides on how to connect to different cloud services](/knowledge-base/tutorials/databases).

6. **Set up viewer auth** 🔒

    Lock down your app to a certain set of viewers using Google OAuth or by setting up your own password system. Read the [documentation on viewer auth](/streamlit-cloud/enterprise/single-sign-on-sso).

7. **Let us help!** 🙌

    No question is too small, no request too big. Let us know how we can help - whether it's more resources for an app, a step that is frustrating you, or the need for ideas on how to improve your app. Just ping your Streamlit contact or email `support@streamlit.io`.


### Securely connect to your cloud services

Here are a few guides on how to connect to different cloud services (see also the [overview](/knowledge-base/tutorials/databases)):

- 🔍 [Connect Streamlit to Google BigQuery](/knowledge-base/tutorials/databases/bigquery)
- 🖊️ [Connect Streamlit to a public Google Sheet](/knowledge-base/tutorials/databases/public-gsheet)
- 🔏 [Connect Streamlit to a private Google Sheet](/knowledge-base/tutorials/databases/private-gsheet)
- 3️⃣ [Connect Streamlit to AWS S3](/knowledge-base/tutorials/databases/aws-s3)
- 🐘 [Connect Streamlit to PostgreSQL](/knowledge-base/tutorials/databases/postgresql)
- 🍃 [Connect Streamlit to MongoDB](/knowledge-base/tutorials/databases/mongodb)
- 🏗️ [Connect Streamlit to Tableau](/knowledge-base/tutorials/databases/tableau)
- 🔥 [Connect Streamlit to Firestore (blog)](https://blog.streamlit.io/streamlit-firestore/)

Looking to connect directly to your VPN? Send us a note and we'd love to talk to you more about it.

<Note>

Guide not working for you? Got another data source you need help connecting with? Just ping your Streamlit contact and we'll help you get set up!

</Note>

## A guide to Streamlit Cloud - Teams and Enterprise features

### Private repos

Keep your code in your GitHub private repos and connect them to your Streamlit for Teams account to deploy apps and run CI/CD.

![Streamlit Cloud private repos](/images/private_repos.png)

---

### One-click deploy
Deploy apps directly from your GitHub repos. Just connect Streamlit for Teams to the repo, select the app file, and we'll do the rest!

[One-click deploy documentation](/streamlit-cloud/community#deploy-your-app)

![Streamlit Cloud one-click deploy](/images/one_click_deploy.png)

---

### Secrets management
Securely access any data store or API from your Streamlit app by storing access credentials in encrypted secrets on our secure platform. Use them with `st.secrets`.

[Secrets management documentation](/streamlit-cloud/community#secrets-management)

![Streamlit Cloud secrets management](/images/secrets_management.png)

---
### Single sign-on viewer authentication

Restrict access to your app to a selected set of users. Single sign-on with Google OAuth is currently supported with other SSO providers coming soon.

[Single Sign-on documentation](/streamlit-cloud/enterprise/single-sign-on-sso)

![Streamlit Cloud single sign-on](/images/sso.png)

---
### App management

View apps, reboot, delete and inspect logs. If you need extra app resources, ping your Streamlit contact and we'll help configure it.

[App management documentation](/streamlit-cloud/community#deploy-your-app)

![Streamlit Cloud app management](/images/app_management.png)

---
### **Admin interface **

Manage billing, view usage, and configure other team-wide settings.

![Streamlit Cloud admin interface](/images/admin_interface.png)