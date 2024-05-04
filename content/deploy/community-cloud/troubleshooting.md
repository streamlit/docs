---
title: Troubleshooting
slug: /deploy/streamlit-community-cloud/troubleshooting
---

# Troubleshooting

Sorry to hear you're having issues! Please take a look at some frequently asked questions and issues below. If you cannot find an answer to your issue, please post on our [Community forum](http://discuss.streamlit.io) so that our engineers or community members can help you.

## Table of contents

2. [Deploying apps](#deploying-apps)
3. [GitHub integration](/deploy/streamlit-community-cloud/troubleshooting#github-integration)

## Deploying apps

### It won't let me deploy the app

To deploy an app for the first time you must have admin-level access to the repo in GitHub. Please check with your administrator to make sure you have that access. If not, please ask them to deploy for the first time (we need this in order to establish webhooks for continuous integration) and from there you can then push updates to the app.

### My app is running into issues while deploying

Check your Cloud logs by clicking on the "Manage app" expander in the bottom right corner of your screen. Often the trouble is due to a dependency not being declared. See here for [more information on dependency management](/deploy/streamlit-community-cloud/deploy-your-app/app-dependencies).

If that's not the issue, then please send the logs and warning you are seeing to our [Community forum](https://discuss.streamlit.io/) and we'll help get you sorted!
