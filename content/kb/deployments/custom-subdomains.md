---
title: Custom subdomains
slug: /knowledge-base/deploy/custom-subdomains
---

# Custom subdomains

Once you've [deployed your app](/streamlit-cloud/get-started/deploy-an-app) on Community Cloud, it's given an automatically generated subdomain that follows a structure based on your GitHub repo. This subdomain is unique to your app and can be used to share your app with others. However, the default subdomain is not always the most memorable or easy to share. E.g. the following is a bit of a mouthful!

`https://streamlit-demo-self-driving-streamlit-app-8jya0g.streamlit.app`

You can instead set up a custom subdomain to make your app easier to share. You can customize your subdomain to reflect your app content, personal branding, or whatever you’d like. The URL will appear as:

```
<your-custom-subdomain>.streamlit.app
```

To customize your app subdomain from the [dashboard](/streamlit-cloud/get-started/manage-your-app#manage-apps-from-your-app-dashboard):

1. Click the "︙" overflow menu to the app's right and select "**Settings**".

   ![Custom subdomain settings](/images/streamlit-cloud/custom-subdomain-settings.png)

2. View the "**General**" tab in the App settings modal. Your app's unique subdomain will appear here.
   ![Custom subdomain pick](/images/streamlit-cloud/custom-subdomain-pick.png)

3. Pick a custom subdomain between 6 and 63 characters in length for your app's URL and hit "**Save**".
   ![Custom subdomain save](/images/streamlit-cloud/custom-subdomain-save.png)

It's that simple! You can then access your app by visiting your custom subdomain URL 🎉.

If a custom subdomain is not available (e.g. because it's already taken), you'll see an error message like this:

![Custom subdomain error](/images/streamlit-cloud/custom-subdomain-error.png)
