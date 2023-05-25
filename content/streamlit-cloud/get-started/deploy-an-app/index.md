---
title: Deploy an app
slug: /streamlit-community-cloud/get-started/deploy-an-app
---

# Deploy an app

Streamlit Community Cloud lets you deploy your apps in just one click, and most apps will deploy in only a few minutes. If you don't have an app ready to deploy, [fork or clone one of our example apps](https://streamlit-cloud-example-apps-streamlit-app-sw3u0r.streamlit.app/?hsCtaTracking=28f10086-a3a5-4ea8-9403-f3d52bf26184|22470002-acb1-4d93-8286-00ee4f8a46fb) — you can find apps for machine learning, data visualization, data exploration, A/B testing and more.

<Note>

If you want to deploy your app on a different cloud service, check out the [Deploy Streamlit apps](/knowledge-base/tutorials/deploy) article in our Knowledge Base.

</Note>

## Add your app to GitHub

Streamlit Community Cloud launches apps directly from your GitHub repo, so your app code and dependencies need to be on GitHub before you try to deploy the app. See [App dependencies](/streamlit-community-cloud/get-started/deploy-an-app/app-dependencies) for more information.

### Optionally, add a configuration file

Streamlit allows you to optionally set configuration options via four different methods. Among other things, you can use custom configs to customize your app's theme, enable logging, or set the port on which your app runs. For more information, see [Configuration](/library/advanced-features/configuration) and [Theming](/library/advanced-features/theming). On Streamlit Community Cloud, however, you can only set configuration options via a configuration file in your GitHub repo.

Specifically, you can add a configuration file to the root (top-level) directory of your repo: create a `.streamlit` folder, and then add a `config.toml` file to that folder. E.g., if your app is in a repo called `my-app`, you would add a file called `my-app/.streamlit/config.toml`. Say you want to set the theme of your app to "dark". You would add the following to your `.streamlit/config.toml` file:

```toml
[theme]
base="dark"
```

<Important>

There can be only one configuration file, regardless of the number of apps in the repo.
</Important>

## Deploy your app

To deploy an app, click "New app" from the upper right corner of your workspace, then fill in your repo, branch, and file path, and click "Deploy". As a shortcut, you can also click "Paste GitHub URL".

![Deploy an app](/images/streamlit-community-cloud/deploy-an-app.png)

## Advanced settings for deployment

If you are connecting to a data source or want to select a Python version for your app, you can do that by clicking "Advanced settings" before you deploy the app.

![Advanced settings](/images/streamlit-community-cloud/advanced-settings.png)

You can connect to private data sources either by using [secrets management](/streamlit-community-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management) or with [IP allowlisting](/streamlit-community-cloud/get-started/deploy-an-app/connect-to-data-sources/stable-outbound-ip-addresses). Read more on how to [connect to data sources](/streamlit-community-cloud/get-started/deploy-an-app/connect-to-data-sources).

<Tip>

Streamlit Community Cloud supports Python 3.7 - Python 3.10, and defaults to version 3.9. You can select a version of your choice from the "Python version" dropdown in the "Advanced settings" modal.

</Tip>

## Watch your app launch

Your app is now deploying and you can watch while it launches. Most apps take only a couple of minutes to deploy, but if your app has a lot of dependencies it may take some time to deploy the first time. After the initial deployment, any change that does not touch your dependencies should show up immediately.

![Watch app launch](/images/streamlit-community-cloud/watch-app-launch.png)

<Note>

The Cloud logs on the right hand side are only viewable to the developer and is how you can grab logs and debug any issues with the app. [Learn more about Cloud logs](/streamlit-community-cloud/get-started/manage-your-app#cloud-logs).

</Note>

## Your app URL

That's it — you're done! Your app now has a unique subdomain URL that you can share with others. Click [here](/streamlit-community-cloud/get-started/share-your-app) to read about how to share your app with viewers.

### Unique subdomains

App subdomain URLs follow a structure based on your GitHub repo:

```bash
https://[user name]-[repo name]-[branch name]-[app path]-[short hash].streamlit.app
```

For example:

```bash
https://streamlit-demo-self-driving-streamlit-app-8jya0g.streamlit.app
```

This subdomain is unique to your app and can be used to share your app with others. However, the default subdomain is not always the most memorable or easy to share. That's why you can also set a custom domain for your app.

### Embed apps

<Tip>

Documentation for embedding apps has moved to [Embed your app](/streamlit-community-cloud/get-started/embed-your-app). Please update your bookmarks.

</Tip>

### Custom subdomains

Subdomains are customizable! With this step you'll be able modify your app URLs to reflect your app content, personal branding, or whatever you’d like. The URL will appear as:

```bash
<your-custom-subdomain>.streamlit.app
```

To customize your app subdomain from the dashboard:

1. Click the "︙" overflow menu to the app's right and select "**Settings**".

   ![Custom subdomain settings](/images/streamlit-community-cloud/custom-subdomain-settings.png)

2. View the "**General**" tab in the App settings modal. Your app's unique subdomain will appear here.
   ![Custom subdomain pick](/images/streamlit-community-cloud/custom-subdomain-pick.png)

3. Pick a custom subdomain between 6 and 63 characters in length for your app's URL and hit "**Save**".
   ![Custom subdomain save](/images/streamlit-community-cloud/custom-subdomain-save.png)

It's that simple! You can then access your app by visiting your custom subdomain URL 🎉.

If a custom subdomain is not available (e.g. because it's already taken), you'll see an error message like this:

<Image src="/images/streamlit-community-cloud/custom-subdomain-error.png" clean />
