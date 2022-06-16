---
title: Deploy an app
slug: /streamlit-cloud/get-started/deploy-an-app
---

# Deploy an app

Streamlit Cloud lets you deploy your apps in just one click, and most apps will deploy in only a few minutes. If you don't have an app ready to deploy, [fork or clone one of our example apps](https://share.streamlit.io/streamlit/cloud-example-apps/main?hsCtaTracking=28f10086-a3a5-4ea8-9403-f3d52bf26184%7C22470002-acb1-4d93-8286-00ee4f8a46fb) — you can find apps for machine learning, data visualization, data exploration, A/B testing and more.

## Add your app to GitHub

Streamlit Cloud launches apps directly from your GitHub repo, so your app code and dependencies need to be on GitHub before you try to deploy the app. See [App dependencies](/streamlit-cloud/get-started/deploy-an-app/app-dependencies) for more information.

## Deploy your app

To deploy an app, click "New app" from the upper right corner of your workspace, then fill in your repo, branch, and file path, and click "Deploy". As a shortcut, you can also click "Paste GitHub URL".

![Deploy an app](/images/streamlit-cloud/deploy-an-app.png)

## Advanced settings for deployment

If you are connecting to a data source or want to select a Python version for your app, you can do that by clicking "Advanced settings" before you deploy the app.

![Advanced settings](/images/streamlit-cloud/advanced-settings.png)

You can connect to private data sources either by using [secrets management](/streamlit-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management) or with [IP allowlisting](/streamlit-cloud/get-started/deploy-an-app/connect-to-data-sources/stable-outbound-ip-addresses). Read more on how to [connect to data sources](/streamlit-cloud/get-started/deploy-an-app/connect-to-data-sources).

<Tip>

Streamlit Cloud supports Python 3.7 - Python 3.10, and defaults to version 3.9. You can select a version of your choice from the "Python version" dropdown in the "Advanced settings" modal.

</Tip>

## Watch your app launch

Your app is now deploying and you can watch while it launches. Most apps take only a couple of minutes to deploy, but if your app has a lot of dependencies it may take some time to deploy the first time. After the initial deployment, any change that does not touch your dependencies should show up immediately.

![Watch app launch](/images/streamlit-cloud/watch-app-launch.png)

<Note>

The Cloud logs on the right hand side are only viewable to the developer and is how you can grab logs and debug any issues with the app. [Learn more about Cloud logs](/streamlit-cloud/get-started/manage-your-app#cloud-logs).

</Note>

## Your app URL

That's it — you're done! Your app now has a permanent URL that you can share with others. Click [here](/streamlit-cloud/get-started/share-your-app) to read about how to share your app with viewers.

App URLs follow a standard structure based on your GitHub repo:

```python
https://share.streamlit.io/[user name]/[repo name]/[branch name]/[app path]
```

For example:

```python
http://share.streamlit.io/streamlit/demo-self-driving/master/streamlit_app.py
```

If your app has name `streamlit_app.py` and your branch is `master`, your app is also given a shortened URL of the form `https://share.streamlit.io/[user name]/[repo name]`. The only time you need the full URL is when you deployed multiple apps from the same repo. So you can also reach the example URL above at the short URL [https://share.streamlit.io/streamlit/demo-self-driving](https://share.streamlit.io/streamlit/demo-self-driving).
