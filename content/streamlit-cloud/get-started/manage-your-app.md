---
title: Manage your app
slug: /streamlit-cloud/get-started/manage-your-app
---

# Manage your app

You can manage your app directly from the deployed app in your developer view or you can log in to your app dashboard at [share.streamlit.io](https://share.streamlit.io/) to view your apps, deploy a new app, delete an app, or reboot an app.

- [Manage apps from your developer view](#manage-apps-from-your-developer-view)
- [Manage apps from your app dashboard](/streamlit-cloud/get-started/manage-your-app#manage-apps-from-your-app-dashboard)
- [Manage apps in GitHub](/streamlit-cloud/get-started/manage-your-app#manage-apps-in-github)
- [App resources and limits](/streamlit-cloud/get-started/manage-your-app#app-resources-and-limits)

## Manage apps from your developer view

Once you have deployed an app you will have a developer view for that app.

### Developer view

Click on the bottom right where it says "Manage app" to view your terminal and other settings.

![Developer view](/images/streamlit-cloud/developer-view.png)

### App terminal

Once you've clicked on "Manage app" you will see the app terminal which lets you view the logs for your app. This is your primary place to troubleshoot any issues with your app.

![App terminal](/images/streamlit-cloud/app-terminal.png)

You can also click on the "︙" overflow menu at the bottom of the terminal to view other options for your app including the ability to download logs, reboot the app, delete the app, navigate to settings (which includes managing viewer access and app secrets), go to your app dashboard, go to documentation, contact support, or sign out.

<div style={{ maxWidth: '45%' }}>
    <Image src="/images/streamlit-cloud/app-terminal-overflow.png" />
</div>

## Manage apps from your app dashboard

When you first log into share.streamlit.io you will land on your app dashboard, which gives you a list of all your deployed apps. This list does include apps deployed by other developers in your workspace, since you're all managers of those apps. Such apps are indicated with an icon like this one:

<div style={{ maxWidth: '45%' }}>
    <Image src="/images/streamlit-cloud/app-dashboard.png" />
</div>

### App workspaces

Streamlit Cloud is organized into workspaces, which automatically group your apps according to the corresponding GitHub repository's owner. If you are part of multiple repositories, then you will have multiple workspaces.

![App workspaces 1](/images/streamlit-cloud/app-workspaces-1.gif)

If an app's GitHub repository is owned by you, the app will appear in your personal workspace, named "<YourGitHubHandle\>".

![App workspaces 2](/images/streamlit-cloud/app-workspaces-2.png)

If an app's GitHub repository is owned by **an organization** (such as your company), the app will appear in a separate workspace, named "<GitHubOrganizationHandle\>".

![App workspaces 3](/images/streamlit-cloud/app-workspaces-3.jpg)

You will also have access to any workspaces containing app(s) for which you only have **view access**. These apps will have a "view-only" tooltip when you click on their respective hamburger menus.

![App workspaces 4](/images/streamlit-cloud/app-workspaces-4.png)

To switch between workspaces, click on the workspace listed in the top right corner, then select the desired workspace name.

![App workspaces 5](/images/streamlit-cloud/app-workspaces-5.png)

### Reboot an app

If your app needs a hard reboot, click on the "︙" overflow menu to the right of the app and click to Reboot. This will interrupt any user that may currently be using that app. It may also take a few minutes for your app to re-deploy, and in that time you — and anyone visiting the app — will see the 'Your app is in the oven' screen.

![Reboot an app](/images/streamlit-cloud/reboot-an-app.png)

### App settings

The app settings let you [manage viewers of your apps](/streamlit-cloud/get-started/share-your-app#adding-viewers-from-your-dashboard) and [secrets of your apps](/streamlit-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management). Click on the links to lean more about these features.

## Manage apps in GitHub

### Update your app

Your GitHub repository is the source for the app, so that means that any time you push an update to your repo you'll see it reflected in the app in almost real time. Try it out!

Streamlit also smartly detects whether you touched your dependencies, in which case it will automatically do a full redeploy for you—which will take a little more time. But since most updates don't involve dependency changes, you should usually see your app update in real time.

### Add or remove dependencies

You can add/remove dependencies at any point by updating `requirements.txt` (Python deps) or `packages.txt` (Debian deps) and doing a `git push` to your remote repo. This will cause Streamlit to detect there was a change in its dependencies, which will automatically trigger its installation.

It is best practice to pin your Streamlit version in `requirements.txt`. Otherwise, the version may be auto-upgraded at any point without your knowledge, which could lead to undesired results (e.g. when we deprecate a feature in Streamlit).

## App resources and limits

The exact resources and limits will depend on [your workspace plan](http://streamlit.io/cloud). If you need more apps or more resources for your apps you can upgrade your plan or reach out to [support@streamlit.io](mailto:support@streamlit.io).

### App hibernation

Private apps on Teams or Enterprise plans will not hibernate, but for public and Free tier apps without traffic for 7 consecutive days, will automatically go to sleep. This is done to alleviate resources and allow the best communal use of the platform! Here are some need to know's about how this works:

- As the app developer, you will receive an email after 5 days of no traffic on your app.
- If you would like to keep your app awake, you have one of two choices:
  - Visit the app (create traffic).
  - Push a commit to the app (this can be empty!).
- If left alone the app will go to sleep at the 7 day mark (2 days after you receive the email). When someone visits the app after this, they will see the sleeping page:
    <div style={{ maxWidth: '55%' }}>
        <Image src="/images/spin_down.png" />
    </div>
- To wake the app up, press the "Yes, get this app back up!" button. This can be done by *anyone* who wants to view the app, not just the app developer!
- You can also wake apps through your Streamlit Cloud dashboard. You will know which apps are sleeping because a moon icon will appear next to the app settings. To wake an app from the dashboard, click the moon.
    <div style={{ maxWidth: '85%' }}>
        <Image src="/images/sleeping_app_moon.png" />
    </div>
