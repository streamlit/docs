---
title: Upgrade your app's Python version on Community Cloud
slug: /deploy/streamlit-community-cloud/manage-your-app/upgrade-python
description: Learn how to upgrade your Streamlit app's Python version on Community Cloud by deleting and redeploying with advanced settings.
keywords: upgrade python, python version, advanced settings, delete, redeploy, subdomain, secrets, github coordinates
---

# Upgrade your app's Python version on Community Cloud

Dependencies within Python can be upgraded in place by simply changing your environment configuration file (typically `requirements.txt`). However, Python itself can't be changed after deployment.

When you deploy an app, you can select the version of Python through the "**Advanced settings**" dialog. After you have deployed an app, you must delete it and redeploy it to change the version of Python it uses.

1. Take note of your app's settings:
   - Current, custom subdomain.
   - GitHub coordinates (repository, branch, and entrypoint file path).
   - Secrets.

   When you delete an app, its custom subdomain is immediately available for reuse.

1. [Delete your app](/deploy/streamlit-community-cloud/manage-your-app/delete-your-app).
1. [Deploy your app](/deploy/streamlit-community-cloud/deploy-your-app).
   1. On the deployment page, select your app's GitHub coordinates.
   1. Set your custom domain to match your deleted instance.
   1. Click "**Advanced settings**."
   1. Choose your desired version of Python.
   1. Optional: If your app had secrets, re-enter them.
   1. Click "**Save**."
   1. Click "**Deploy**."

In a few minutes, Community Cloud will redirect you to your redployed app.
