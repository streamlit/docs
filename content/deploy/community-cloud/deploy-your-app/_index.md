---
title: Prep and deploy your app on Community Cloud
slug: /deploy/streamlit-community-cloud/deploy-your-app
description: Complete guide to preparing and deploying your Streamlit app on Community Cloud with file organization, dependencies, and secrets management.
keywords: deploy, community cloud, preparation, file organization, dependencies, secrets, deployment guide
---

# Prep and deploy your app on Community Cloud

Streamlit Community Cloud lets you deploy your apps in just one click, and most apps will be deployed in only a few minutes. If you don't have an app ready to deploy, you can fork or clone one from our <a href="https://streamlit.io/gallery" target="_blank">App gallery</a>&mdash;you can find apps for machine learning, data visualization, data exploration, A/B testing, and more. You can also [Deploy an app from a template](/deploy/streamlit-community-cloud/get-started/deploy-from-a-template). After you've deployed your app, check out how you can [Edit your app with GitHub Codespaces](/deploy/streamlit-community-cloud/manage-your-app/edit-your-app#edit-your-app-with-github-codespaces).

<Note>

If you want to deploy your app on a different cloud service, see our [Deployment tutorials](/deploy/tutorials).

</Note>

## Summary

The pages that follow explain how to organize your app and provide complete information for Community Cloud to run it correctly.

When your app has everything it needs, deploying is easy. Just go to your workspace and click "**Create app**" in the upper-right corner. Follow the prompts to fill in your app's information, and then click "**Deploy**."

![Deploy a new app from your workspace](/images/streamlit-community-cloud/deploy-empty-new-app.png)

## Ready, set, go!

<InlineCalloutContainer>
    <InlineCallout
        color="lightBlue-70"
        icon="description"
        bold="File organization."
        href="/deploy/streamlit-community-cloud/deploy-your-app/file-organization"
    >Learn how Community Cloud initializes your app and interprets paths. Learn where to put your configuration files.</InlineCallout>
    <InlineCallout
        color="lightBlue-70"
        icon="build_circle"
        bold="App dependencies."
        href="/deploy/streamlit-community-cloud/deploy-your-app/app-dependencies"
    >Learn how to install dependencies and other Python libraries into your deployment environment.</InlineCallout>
    <InlineCallout
        color="lightBlue-70"
        icon="password"
        bold="Secrets management."
        href="/deploy/streamlit-community-cloud/deploy-your-app/secrets-management"
    >Learn about the interface Community Cloud provides to securely upload your <code>secrets.toml</code> data.</InlineCallout>
    <InlineCallout
        color="lightBlue-70"
        icon="flight_takeoff"
        bold="Deploy your app"
        href="/deploy/streamlit-community-cloud/deploy-your-app/deploy"
    >Put it all together to deploy your app for the whole world to see.</InlineCallout>
</InlineCalloutContainer>
