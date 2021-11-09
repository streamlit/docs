---
title: Streamlit Cloud (Teams and Enterprise)
slug: /streamlit-cloud/enterprise
---

## Streamlit Cloud (Teams and Enterprise)

Streamlit Cloud Teams and Enterprise tiers enable you to securely deploy, manage, and share your Streamlit apps within your company, customers, and partners.

<Note>

If you're completely new to Streamlit, check out our [Get started with Streamlit](/library/get-started) page!

</Note>

### Get started — launch your first app!

You should already have access to your workspace, so log in and start deploying apps 😁. Here is a quick get started guide with links to more documentation. We'd also love to hop on a call with you to go over any of your apps and any feedback or questions you have.

1. **Log in to your dashboard** 👩🏻‍💻

   Go to [share.streamlit.io](https://share.streamlit.io/) and click to authenticate with GitHub. If that fails it means that we don't have that GitHub account allow-listed, so just send the username to your Streamlit contact and we'll get it listed for you.

2. **Grant repo access** 👑

   When you log in for the first time you will need to grant access to the GitHub private repo you wish to use for your apps. An admin of the repo must grant the access, so if you are not an admin, please get them a Streamlit Cloud account so they can grant access.

3. **Launch a test app! 🎈**

   We suggest doing a sample deployment to get used to the interface. Follow along in the [deployment instruction guide](/streamlit-cloud/community) to deploy your first app. For your full apps you'll want to make sure your secrets and viewer auth are set up before launching the app.

4. **Set up secrets** 🗝

   Secure access to the data for your app with secrets management. Read the [documentation on using secrets](/streamlit-cloud/community#secrets-management). We also have a number of [guides on how to connect to different cloud services](/knowledge-base/tutorials/databases).

5. **Set up viewer auth** 🔒

   Lock down your app to a certain set of viewers using Google OAuth or one of several other single sign-on platforms. Read the [documentation on viewer auth](/streamlit-cloud/enterprise/single-sign-on-sso).

6. **Let us help!** 🙌

   No question is too small, no request too big. Let us know how we can help - whether it's more resources for an app, a step that is frustrating you, or the need for ideas on how to improve your app. Just ping your Streamlit contact or email `support@streamlit.io`.

## A guide to Streamlit Cloud - Teams and Enterprise features

- **Private repos**

  Keep your code in your GitHub private repos and connect them to your Streamlit for Teams account to deploy apps and run CI/CD.

- **One-click deploy**

  Deploy apps directly from your GitHub repos. Just connect Streamlit for Teams to the repo, select the app file, and we'll do the rest!

  [One-click deploy documentation](/streamlit-cloud/community#deploy-your-app)

- **Secrets management**

  Securely access any data store or API from your Streamlit app by storing access credentials in encrypted secrets on our secure platform. Use them with `st.secrets`.

  [Secrets management documentation](/streamlit-cloud/community#secrets-management)

- **Single sign-on viewer authentication**

  Restrict access to your app to a selected set of users. Single sign-on with Google OAuth is currently supported, along with several other common platforms.

  [Single Sign-on documentation](/streamlit-cloud/enterprise/single-sign-on-sso)

- **App management**

  View apps, reboot, delete and inspect logs. If you need extra app resources, ping your Streamlit contact and we'll help configure it.

  [App management documentation](/streamlit-cloud/community#deploy-your-app)

- **Admin interface**

  Manage billing, view usage, and configure other team-wide settings.

<!-- ## Troubleshooting

### I'm not able to log in to the dashboard

We probably have the wrong username or email for you. Just ping your Streamlit contact and we'll quickly get you access.

### My repo isn't showing on the Deploy page

It's possible it just isn't showing up even though it is already there. Try typing it in. If we don't recognize it, you'll see the message below with a link to click and give access.

![Streamlit Cloud repo access](/images/repo_access.png)

If for some reason that doesn't work, please try logging out and back in again to make sure the change took effect. And if that doesn't work - please let us know and we'll get you sorted!

### I need to set a specific Python version for my app

When deploying an app, under advanced settings, you can choose which version of Python you wish your app to use.

![Streamlit Cloud Python version](/images/python_version.png)

### How do I store files locally?

If you want to store your data locally as opposed to in a database, you can store the file in your GitHub repository. Streamlit is just python, so you can read the file using `pandas.read_csv("data.csv")` or `open("data.csv")`

Note: if you have really big or binary data that you change frequently, and git is feeling slow, you might want to check out  [Git Large File Store (LFS)](https://git-lfs.github.com/) as a better way to store large files in GitHub. You don't need to make any changes to your app to start using it. If your GitHub repo uses LFS, it will now "just work" with Streamlit.

### My app is running into issues while deploying

Check the terminal on the right side of the screen to see the logs. Often the trouble is due to a dependency not being declared. See here for [more information on dependency management](/streamlit-cloud/community#add-python-dependencies).

If that's not the issue, then please send your Streamlit contact the logs and warning you are seeing and we'll help get you sorted!

### My app is hitting resource limits / my app is running very slowly

If your app is running slowly or you're hitting the 'Argh' page then just let us know and we'll adjust the limits for you. If you know in advance you are going to need more resources, also just let us know so we can set them up for you before you run into issues.


## Frequently Asked Questions

### How can I get help with my app?

If you have any questions, feedback, run into any issues, or need to reach us, you can

- Ask on the [forum](https://discuss.streamlit.io) ⬅️ this is best for any question related to the open source library
- Email us at [support@streamlit.io](mailto:support@streamlit.io) ⬅️ this is best for anything related to the app platform - deployment, SSO, etc.

If you want, we are also happy to help lend an eye on your app development. Just shoot us a note if you want to share some code or have our team take a look at your app and give you some tips.

### How will Streamlit secure my data?

Streamlit takes a number of measures to ensure your code, data, and apps are all secure. Read more in the [Streamlit for Teams Security Memo](/streamlit-cloud/enterprise/security-model).

### How do I add viewers to my Streamlit apps?

Before viewer authentication is added via single sign-on, [apps are secured via password protection](https://www.notion.so/Authentication-without-SSO-4319c6135b4b4ed58355fc06b33cac74). To give someone access, you just need to set up a password for them.

### Do viewers need access to the GitHub repo?

Nope! You only need access to the GitHub repo if you want to push changes to the app.

### Are there limits to resources or to viewers that I can have?

We want you to use as freely as possible, so just use as you naturally would! If you encounter any resource limitations, just send us a note and we'll get it adjusted for you.

### When will I be charged?

The beta period is free because we want your feedback! At the end of the beta (as per the beta terms you signed) we will then have a call to see how you're using Streamlit Cloud and what package makes the most sense for you.

### When will feature XYZ be added to the beta?

We will do our best to keep the timeline above updated and to proactively update you with anything coming soon, but you can always ask! Just reach out to your Streamlit contact.

### Can I get a custom URL for my app?

Not yet available in the beta. But this is planned for after the Streamlit Cloud launch. You can obviously do your own DNS redirects. If you want some more thoughts on this just ping your Streamlit contact.

Thanks for using Streamlit for Teams. We look forward to hearing your feedback 🎈 -->
