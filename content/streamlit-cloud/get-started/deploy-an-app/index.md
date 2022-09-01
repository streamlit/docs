---
title: Deploy an app
slug: /streamlit-cloud/get-started/deploy-an-app
---

# Deploy an app

Streamlit Cloud lets you deploy your apps in just one click, and most apps will deploy in only a few minutes. If you don't have an app ready to deploy, [fork or clone one of our example apps](https://streamlit-cloud-example-apps-streamlit-app-sw3u0r.streamlitapp.com/?hsCtaTracking=28f10086-a3a5-4ea8-9403-f3d52bf26184|22470002-acb1-4d93-8286-00ee4f8a46fb) — you can find apps for machine learning, data visualization, data exploration, A/B testing and more.

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

That's it — you're done! Your app now has a unique subdomain URL that you can share with others. Click [here](/streamlit-cloud/get-started/share-your-app) to read about how to share your app with viewers.

### Unique subdomains

App subdomain URLs follow a structure based on your GitHub repo:

```text
https://[user name]-[repo name]-[branch name]-[app path]-[short hash].streamlitapp.com
```

For example:

```text
https://streamlit-demo-self-driving-streamlit-app-8jya0g.streamlitapp.com
```

### Embed apps

Streamlit Community Cloud supports embedding **public** apps using the subdomain scheme. To embed a public app, add the query parameter `/?embedded=true` to the end of the `*streamlitapp.com` subdomain URL.

For example, say you want to embed the Streamlit Docs' PyDeck app: [https://doc-pydeck-chart.streamlitapp.com/](https://doc-pydeck-chart.streamlitapp.com/). The URL to include in your iframe is: [https://doc-pydeck-chart.streamlitapp.com/?embedded=true](https://doc-pydeck-chart.streamlitapp.com/?embedded=true).

<Important>

There will be no official support for embedding private apps.

</Important>

### Custom subdomains

Subdomains will also soon be customizable! With this step you'll be able modify your app URLs to reflect your app content, personal branding, or whatever you’d like. The URL will appear as:

```text
<your-custom-subdomain>.streamlitapp.com
```

Sign up for early access to try out customizable URLs in the beta [here](https://forms.streamlit.io/customizable-url-beta). To customize your app subdomain from the dashboard:

1. Click the "︙" overflow menu to the right of the app and select "**Settings**"

   ![Custom subdomain settings](/images/streamlit-cloud/custom-subdomain-settings.png)

2. View the "**General**" tab in the App settings modal. Your app's unique subdomain will appear here
   ![Custom subdomain pick](/images/streamlit-cloud/custom-subdomain-pick.png)

3. Pick a custom subdomain between 6 and 63 characters in length for your app's URL and hit "**Save**"
   ![Custom subdomain save](/images/streamlit-cloud/custom-subdomain-save.png)

It's that simple! You can then access your app by visiting your custom subdomain URL 🎉. For example, [https://deep-dream.streamlitapp.com/](https://deep-dream.streamlitapp.com/).

If a custom subdomain is not available (e.g. because it's already taken), you'll see an error message like this:

![Custom subdomain error](/images/streamlit-cloud/custom-subdomain-error.png)
