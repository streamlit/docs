---
title: Upgrade your app's Streamlit version on Streamlit Community Cloud
slug: /deploy/streamlit-community-cloud/manage-your-app/upgrade-streamlit
description: Learn how to upgrade your Streamlit library version on Community Cloud using dependency files or rebooting your app.
keywords: upgrade streamlit, streamlit version, dependencies, requirements.txt, reboot, pin version, latest version, dependency file
---

# Upgrade your app's Streamlit version on Streamlit Community Cloud

Want to use a cool new Streamlit feature but your app on Streamlit Community Cloud is running an old version of the Streamlit library? If that's you, don't worry! Here's how to upgrade your app's Streamlit version, based on how you manage your [app dependencies](/deploy/streamlit-community-cloud/deploy-your-app/app-dependencies):

## No dependency file

When there is no dependencies file in your repository, your app will use the lastest Streamlit version that existed when it was last rebooted. In this case, simply [reboot your app](/deploy/streamlit-community-cloud/manage-your-app/reboot-your-app) and Community Cloud will install the latest version.

You may want to avoid getting into this situation if your app depends on a specific version of Streamlit. That is why we encourage you to use a dependency file and pin your desired version of Streamlit.

## With a dependency file

When your app includes a dependency file, reboot your app or change your dependency file as follows:

- If Streamlit is not included in your dependency file, reboot the app as described above.

  Note that we don't recommend having an incomplete dependency file since `pip` won't be able to include `streamlit` when resolving compatible versions of your dependencies.

- If Streamlit is included in your dependency file, but the version is not pinned or capped, reboot the app as described above.

  When Community Cloud reboots your app, it will re-resolve your dependency file. Your app will then have the latest version of all dependencies that are consistent with your dependency file.

- If Streamlit is included in your dependency file, and the version is pinned (e.g., `streamlit==1.37.0`), update your dependency file.

  When you commit a change to your dependency file in your repository, Community Cloud will detect the change and automatically resolve the new dependencies. This is how you add, remove, or change all Python dependencies in general. You don't need to manually reboot your app, but you can if you want to.
