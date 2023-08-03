---
title: Manage your app
slug: /streamlit-community-cloud/manage-your-app
---

# Manage your app

You can manage your app directly from the deployed app in your developer view or you can log in to your app dashboard at [share.streamlit.io](https://share.streamlit.io/) to view, deploy, delete, reboot, or favorite an app.

- [Manage apps from your developer view](#manage-apps-from-your-developer-view)
- [Manage apps from your app dashboard](/streamlit-community-cloud/get-started/manage-your-app#manage-apps-from-your-app-dashboard)
- [Manage apps in GitHub](/streamlit-community-cloud/get-started/manage-your-app#manage-apps-in-github)
- [App resources and limits](/streamlit-community-cloud/get-started/manage-your-app#app-resources-and-limits)

## Manage apps from your developer view

Once you have deployed an app you will have a developer view for that app.

### Developer view

Click on the bottom right where it says "Manage app" to view your Cloud logs and other settings.

![Developer view](/images/streamlit-community-cloud/developer-view.png)

### Streamlit Community Cloud logs

Once you've clicked on "Manage app", you will be able to view your app's logs. This is your primary place to troubleshoot any issues with your app.

![Cloud logs](/images/streamlit-community-cloud/cloud-logs.png)

You can also click on the "︙" overflow menu at the bottom of the Cloud logs to view other options for your app including the ability to download logs, reboot the app, delete the app, navigate to settings (which includes managing viewer access and app secrets), go to your app dashboard, go to documentation, contact support, or sign out.

<div style={{ maxWidth: '45%', marginBottom: '-3em', marginLeft: '10em' }}>
    <Image src="/images/streamlit-community-cloud/cloud-logs-overflow.png" />
</div>

## Manage apps from your app dashboard

When you first log into share.streamlit.io you will land on your app dashboard, which gives you a list of all your deployed apps. This list does include apps deployed by other developers in your workspace, since you're all managers of those apps. Such apps are indicated with an icon like this one:

<div style={{ maxWidth: '45%', marginBottom: '-3em', marginLeft: '10em' }}>
    <Image src="/images/streamlit-community-cloud/app-dashboard.png" />
</div>

### App workspaces

Streamlit Community Cloud is organized into workspaces, which automatically group your apps according to the corresponding GitHub repository's owner. If you are part of multiple repositories, then you will have multiple workspaces.

![App workspaces 1](/images/streamlit-community-cloud/app-workspaces-1.gif)

If an app's GitHub repository is owned by you, the app will appear in your personal workspace, named "<YourGitHubHandle\>".

![App workspaces 2](/images/streamlit-community-cloud/app-workspaces-2.png)

If an app's GitHub repository is owned by **an organization** (such as your company), the app will appear in a separate workspace, named "<GitHubOrganizationHandle\>".

![App workspaces 3](/images/streamlit-community-cloud/app-workspaces-3.jpg)

You will also have access to any workspaces containing app(s) for which you only have **view access**. These apps will have a "view-only" tooltip when you click on their respective overflow menu icons (⋮).

![App workspaces 4](/images/streamlit-community-cloud/app-workspaces-4.png)

To switch between workspaces, click on the workspace listed in the top right corner, then select the desired workspace name.

![App workspaces 5](/images/streamlit-community-cloud/app-workspaces-5.png)

## Manage apps in GitHub

### Update your app

Your GitHub repository is the source for the app, so that means that any time you push an update to your repo you'll see it reflected in the app in almost real time. Try it out!

Streamlit also smartly detects whether you touched your dependencies, in which case it will automatically do a full redeploy for you—which will take a little more time. But since most updates don't involve dependency changes, you should usually see your app update in real time.

### Add or remove dependencies

You can add/remove dependencies at any point by updating `requirements.txt` (Python deps) or `packages.txt` (Debian deps) and doing a `git push` to your remote repo. This will cause Streamlit to detect there was a change in its dependencies, which will automatically trigger its installation.

It is best practice to pin your Streamlit version in `requirements.txt`. Otherwise, the version may be auto-upgraded at any point without your knowledge, which could lead to undesired results (e.g. when we deprecate a feature in Streamlit).

## App resources and limits

### Resource limits

<!-- The exact resources and limits will depend on [your workspace plan](https://streamlit.io/cloud). If you need more apps or more resources for your apps you can upgrade your plan or reach out to [support@streamlit.io](mailto:support@streamlit.io). -->

All Community Cloud users have access to the same resources and are subject to the same limits (1 GB of RAM).
If your app is running slowly or you're hitting the 'Argh' page, we first highly recommend going through and implementing the suggestions in the following blog posts to prevent your app from hitting the resource limits and to detect if your Streamlit app leaks memory:

- [Common app problems: Resource limits](https://blog.streamlit.io/common-app-problems-resource-limits/)
- [3 steps to fix app memory leaks](https://blog.streamlit.io/3-steps-to-fix-app-memory-leaks/)
<!-- If you need more apps or more resources for your apps, you can reach out to us on our [Community forum](https://discuss.streamlit.io/). -->

#### Developer view

If your app exceeds its resource limits, you will see one of the following messages when you visit your app. If your app uses an older version of Streamlit (`<1.1.0`) without memory fixes, you will see the message on the left. If your app uses a newer version of Streamlit (`>=1.1.0`), you will see the message on the right:

<Flex>
<Image src="/images/streamlit-community-cloud/resource-limits-dev-1.png" />
<Image src="/images/streamlit-community-cloud/resource-limits-dev-2.png" />
</Flex>

Similarly, you will receive one of the following two emails from [alert@streamlit.io](mailto:alert@streamlit.io) with the subject "Your Streamlit app has gone over its resource limits 🤯":

<Flex>
<Image src="/images/streamlit-community-cloud/resource-limits-email-1.png" />
<Image src="/images/streamlit-community-cloud/resource-limits-email-2.png" />
</Flex>

#### Non-developer view

If your app exceeds its resource limits, users with view-only access will see one of the following messages when they visit your app. They will see the message on the left if your app uses an older version of Streamlit (`<1.1.0`) without memory fixes, and the message on the right if your app uses a newer version of Streamlit (`>=1.1.0`). Viewers have the option to notify you when the app exceeds its resource limits:

<Flex>
<Image src="/images/streamlit-community-cloud/resource-limits-viewer-1.png" />
<Image src="/images/streamlit-community-cloud/resource-limits-viewer-2.png" />
</Flex>

### App hibernation

<!-- Private apps on Teams or Enterprise plans will not hibernate, but for public and Free tier apps without traffic for 7 consecutive days, will automatically go to sleep. This is done to alleviate resources and allow the best communal use of the platform! Here are some need to know's about how this works: -->

Private apps will not hibernate, but public Community Cloud apps without traffic for 7 consecutive days will automatically go to sleep. This is done to alleviate resources and allow the best communal use of the platform! Here are some need to know's about how this works:

- As the app developer, you will receive an email after 5 days of no traffic on your app.
- If you would like to keep your app awake, you have one of two choices:
  - Visit the app (create traffic).
  - Push a commit to the app (this can be empty!).
- If left alone the app will go to sleep at the 7 day mark (2 days after you receive the email). When someone visits the app after this, they will see the sleeping page:
    <div style={{ maxWidth: '55%', marginBottom: '-3em', marginLeft: '5em' }}>
        <Image src="/images/spin_down.png" />
    </div>
- To wake the app up, press the "Yes, get this app back up!" button. This can be done by *anyone* who wants to view the app, not just the app developer!
- You can also wake apps through your Streamlit Community Cloud dashboard. You will know which apps are sleeping because a moon icon will appear next to the app settings. To wake an app from the dashboard, click the moon.
    <div style={{ maxWidth: '85%' }}>
        <Image src="/images/sleeping_app_moon.png" />
    </div>
