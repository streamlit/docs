---
title: Troubleshooting
slug: /streamlit-cloud/troubleshooting
---

# Troubleshooting

Sorry to hear you're having issues! Please take a look at some frequently asked questions and issues below. If you cannot find an answer to your issue, please post on the [Streamlit forum](http://discuss.streamlit.io) or contact your support representative.

## Table of contents

1. [General help](#general-help)
2. [Deploying apps](#deploying-apps)
3. [Sharing and accessing apps](/streamlit-cloud/troubleshooting#sharing-and-accessing-apps)
4. [Data and app security](/streamlit-cloud/troubleshooting#data-and-app-security)
5. [Billing and administration](/streamlit-cloud/troubleshooting#billing-and-administration)
6. [GitHub integration](/streamlit-cloud/troubleshooting#github-integration)
7. [Limitations and known issues](/streamlit-cloud/troubleshooting#limitations-and-known-issues)

## General help

### How can I get help with my app?

If you have any questions, feedback, run into any issues, or need to reach us, you can

- Ask on the [forum](https://discuss.streamlit.io) ⬅️ this is best for any question related to the open source library
- Email us at [support@streamlit.io](mailto:support@streamlit.io) ⬅️ this is best for anything related to the app platform - deployment, SSO, etc.

If you want, we are also happy to help lend an eye on your app development. Just shoot us a note if you want to share some code or have our team take a look at your app and give you some tips.

## Deploying apps

### My repo isn't showing on the Deploy page

It's possible it just isn't showing up even though it is already there. Try typing it in. If we don't recognize it, you'll see the message below with a link to click and give access.

![Troubleshooting deploy page](/images/streamlit-cloud/troubleshooting-deploy-page.png)

If for some reason that doesn't work, please try logging out and back in again to make sure the change took effect. And if that doesn't work - please let us know and we'll get you sorted!

### It won't let me deploy the app

To deploy an app for the first time you must have admin-level access to the repo in GitHub. Please check with your administrator to make sure you have that access. If not, please ask them to deploy for the first time (we need this in order to establish webhooks for continuous integration) and from there you can then push updates to the app.

### I need to set a specific Python version for my app

When deploying an app, under advanced settings, you can choose which version of Python you wish your app to use.

![Streamlit Cloud Advanced settings](/images/streamlit-cloud/advanced-settings.png)

### How do I store files locally?

If you want to store your data locally as opposed to in a database, you can store the file in your GitHub repository. Streamlit is just python, so you can read the file using:

`pandas.read_csv("data.csv")` or `open("data.csv")`

<Tip>

If you have really big or binary data that you change frequently, and git is feeling slow, you might want to check out  [Git Large File Store (LFS)](https://git-lfs.github.com/) as a better way to store large files in GitHub. You don't need to make any changes to your app to start using it. If your GitHub repo uses LFS, it will now *just work* with Streamlit.

</Tip>

### My app is running into issues while deploying

Check the terminal on the right side of the screen to see the logs. Often the trouble is due to a dependency not being declared. See here for [more information on dependency management](/streamlit-cloud/get-started/deploy-an-app/app-dependencies). 

If that's not the issue, then please send your Streamlit contact the logs and warning you are seeing and we'll help get you sorted!

### My app is hitting resource limits / my app is running very slowly

If your app is running slowly or you're hitting the 'Argh' page then just let us know and we can work to help you adjust the limits. We may need to upgrade your workspace to give you access to a higher level of resources. If you know in advance you are going to need more resources, also just let us know so we can set them up for you before you run into issues.

### Can I get a custom URL for my app?

We are working on this in Q4 of 2021. Check back soon for more information!


## Sharing and accessing apps

### How do I add developers to my Streamlit for Teams account?

If you are on the same GitHub repo then you will automatically be added to the same workspace. Just invite them to log in to [share.streamlit.io](http://share.streamlit.io) and we will automatically route them to your workspace once they hook in their GitHub account.

### How do I add viewers to my Streamlit apps?

Before viewer authentication is added via single sign-on, [apps are secured via password protection](https://www.notion.so/Authentication-without-SSO-4319c6135b4b4ed58355fc06b33cac74). To give someone access, you just need to set up a password for them.

### Do viewers need access to the GitHub repo?

Nope! You only need access to the GitHub repo if you want to push changes to the app.

### What will unauthorized/logged out viewers see when they view my app?

A 404 error is displayed to unauthorized viewers to avoid providing any unnecessary information about your app to unintended viewers. Users who satisfy any of the following conditions will see a 404 error when attempting to view your app after you have configured viewer auth:

- User is not logged in with Google SSO.
- User is not included in the list of viewers provided in [Step 3]().
- User is enrolled in Streamlit for Teams beta but lacks read access to your app's GitHub repo.
- User has read access to your app's GitHub repo but is not enrolled in Streamlit for Teams beta.

![Four Oh Four](/images/streamlit-cloud/404.png)

### I've added someone to the viewer list but they still see a 404 error when attempting to view the app.

If a user is still seeing a 404 error after their email address has been added to the viewer list, we recommend that you:

- Check that the user did not log into a different Google account via Single Sign-On (if you have added their work email address to the viewer list, ask the user to check that they are not  logged into their personal Google account, and vice versa).
- Check that the user has navigated to the correct URL.
- Check that the user's email address has been entered correctly in the viewer list.
- Contact [support@streamlit.io](mailto:support@streamlit.io) and we will be happy to help.


## Data and app security

### How will Streamlit secure my data?

Streamlit takes a number of industry best-practice measures to ensure your code, data, and apps are all secure. Read more in our [Trust and Security memo](/streamlit-cloud/trust-and-security).

### How do I set up SSO for my organization?

If you use Google for authentication, you're all set. Otherwise please refer to our [SSO configuration guides](/streamlit-cloud/get-started/share-your-app/configuring-single-on-sso) on how to set up with your SSO provider of choice.


## Billing and administration

### Are there limits to resources or to users that I can have?

Your workspace is sized to a certain number of users, apps, and resources for those apps. We'll let you know if you're close to your limit and will reach out to discuss if you'd like to move to a larger workspace.

### When will I be charged?

The free tier is free forever, but if you have opted for a Teams or Enterprise account then you will have a 30 day free trial for your workspace. When your trial is near completion, we will reach out to check if you want to continue on and if so, we'll get your billing information. You will then be billed the 1st of every month going forward.


## GitHub integration

### Why does Streamlit require additional OAuth scope?

In order to deploy your private-repo app we need access to your app's source code, and the requested scope is the only one in [Github's OAuth scopes model](https://docs.github.com/en/free-pro-team@latest/developers/apps/scopes-for-oauth-apps) that gives us that kind of access.

That scope (called the "repo" scope) also provides Streamlit Sharing with extra permissions that we do not really need, and which, as people who prize security, we'd rather not even be granted. Alas, we need to work with the APIs we are provided by Github.

### After deploying my private-repo app, I received an email from GitHub saying a new public key was added to my repo. Is this expected?

**This is the expected behavior**. When you try to deploy an app that lives in a private repo, Streamlit Cloud needs to get access to that repo somehow. For this, we create a read-only [Github Deploy Key](https://docs.github.com/en/free-pro-team@latest/developers/overview/managing-deploy-keys#deploy-keys) then access your repo using a public SSH key. When we set this up, Github notifies admins of the repo that the key was created.

Underneath the hood, Streamlit Cloud creates an SSH public-private key pair for every app being deployed. The public key is attached to the Github repository using Github's APIs. The private key is used by Streamlit Cloud's orchestration environment to download the source code.

We knows these emails can be annoying, but the alternative would be to request an overly-broad OAuth scope from Github, which also provides *write* access to your repo. To be respectful of your security, we'd like to avoid that. So please bear with these emails, and let us know if you have any thoughts or comments on how we can do better here.


## Limitations and known issues

Here are some limitations and known issues that we're actively working to resolve. If you find an issue [please let us know](mailto:support@streamlit.io)!

- When you print something to the terminal, you may need to do a `sys.stdout.flush()` before it shows up.
- Apps execute in a Linux environment running Debian Buster (slim) with Python 3.7. There is no way to change these, and we may upgrade the environment at any point. If we do upgrade it, we will *usually* not touch existing apps, so they'll continue to work as expected. But if there's a critical fix in the update, we *may* force-upgrade all apps.
- Matplotlib [doesn't work well with threads](https://matplotlib.org/3.3.2/faq/howto_faq.html#working-with-threads). So if you're using Matplotlib you should wrap your code with locks as shown in the snippet below. This Matplotlib bug is more prominent when you share your app apps since you're more likely to get more concurrent users then.
    
    ```python
    from matplotlib.backends.backend_agg import RendererAgg
    _lock = RendererAgg.lock
    
    with _lock:
      fig.title('This is a figure)')
      fig.plot([1,20,3,40])
      st.pyplot(fig)
    ```
    
- All apps are hosted in the United States. This is currently not configurable.