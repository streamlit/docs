---
title: Upgrade the Streamlit version of your app on Streamlit Cloud
slug: /knowledge-base/deploy/upgrade-streamlit-version-on-streamlit-cloud
---

# Upgrade the Streamlit version of your app on Streamlit Cloud

Want to use a cool new Streamlit feature but your app on Streamlit Cloud is running an old version of the Streamlit library? If that's you, don't worry! All you need to do is upgrade your app's Streamlit version. Here are four ways to do this, based on how your [app manages dependencies](https://docs.streamlit.io/streamlit-cloud/get-started/deploy-an-app/app-dependencies):

## No dependency file

Reboot the app. Visit the app on Streamlit Cloud, click on the **Manage app** field in the bottom right (while logged in), go into the three-dot dropdown menu, and click on **Reboot app**. After a few minutes, your app should come back running the newest version of the Streamlit library.

## requirements.txt

If the Streamlit version is not pinned (i.e., the requirements file contains a line with `streamlit` and nothing else), reboot the app as described above. If the Streamlit version is pinned (e.g., `streamlit==1.0.0`), adapt the pinned version in the requirements file and push it to GitHub. The app on Streamlit Cloud will reboot automatically as soon as it detects these changes. 

## pipenv/poetry/conda

If you use any of these dependency managers, you probably know what you need to do. 😉 On your local computer, run the command to update the Streamlit package (e.g., `pipenv update streamlit`, `poetry update streamlit`, or with activated conda environment `pip install -U streamlit` + `conda env export`), then push any changes to Pipfile.lock or poetry.lock or environment.yml to GitHub. The app on Streamlit Cloud will reboot automatically as soon as it detects these changes. 
