---
title: Manage your app
slug: /streamlit-community-cloud/get-started/manage-your-app
---

# Manage your app

You can manage your app directly from the deployed app in your developer view or you can log in to your app dashboard at [share.streamlit.io](https://share.streamlit.io/) to view, deploy, delete, reboot, or favorite an app.

- [Manage apps from your developer view](#manage-apps-from-your-developer-view)
- [Manage apps from your app dashboard](/streamlit-community-cloud/get-started/manage-your-app#manage-apps-from-your-app-dashboard)
- [Manage apps in GitHub](/streamlit-community-cloud/get-started/manage-your-app#manage-apps-in-github)
- [App resources and limits](/streamlit-community-cloud/get-started/manage-your-app#app-resources-and-limits)
- [App favoriting](/streamlit-community-cloud/get-started/manage-your-app#app-favoriting)
- [Analytics Modal](/streamlit-community-cloud/get-started/manage-your-app#analytics-modal)

## Manage apps from your developer view

Once you have deployed an app you will have a developer view for that app.

### Developer view

Click on the bottom right where it says "Manage app" to view your Cloud logs and other settings.

![Developer view](/images/streamlit-community-cloud/developer-view.png)

### Cloud logs

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

### Reboot an app

If your app needs a hard reboot, click on the "︙" overflow menu to the right of the app and click to Reboot. This will interrupt any user that may currently be using that app. It may also take a few minutes for your app to re-deploy, and in that time you — and anyone visiting the app — will see the 'Your app is in the oven' screen.

![Reboot an app](/images/streamlit-community-cloud/reboot-an-app.png)

### App settings

The app settings let you [pick a custom subdomain for your app](/streamlit-community-cloud/get-started/deploy-an-app#your-app-url), [manage viewers of your apps](/streamlit-community-cloud/get-started/share-your-app#adding-viewers-from-your-dashboard) and [secrets of your apps](/streamlit-community-cloud/get-started/deploy-an-app/connect-to-data-sources/secrets-management). Click on the links to lean more about these features.

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

## App favoriting

Streamlit Community Cloud supports a "favorite" feature that lets you quickly access your apps from the app dashboard. Favorited apps appear at the top of the app dashboard with a yellow star (⭐) beside them. You can favorite and unfavorite apps in any workspace to which you have access.

<Note>

Favorites are specific to your account. Other members of your workspace cannot see which apps you have favorited.

</Note>

### Favorite an app from your app dashboard

There are two ways to favorite an app from the app dashboard:

1. Hover over an app and click the star (☆) that appears.
   ![Favorite an app hover](/images/streamlit-community-cloud/favorite-app-dashboard-hover.png)
2. Click on the "︙" overflow menu to the app's right and click to Favorite.
   ![Favorite an app menu](/images/streamlit-community-cloud/favorite-app-dashboard-menu.png)

To unfavorite an app, either hover over the app and click the star (⭐) again, or click on the "︙" overflow menu to the app's right and click to Unfavorite.

### In-app favoriting

You can also favorite an app from right within the app! Currently, in-app favoriting is available for apps that use Streamlit v1.4.0 or later. Note that in-app favoriting is not available on apps in your workspaces for which you only have view access.

When viewing any app in your workspace, click the star (☆) in the top-right corner of the app, beside the "⋮" app menu icon.

![In-app favoriting](/images/streamlit-community-cloud/un-favorited.png)

To unfavorite an app, click the star (⭐) again.

![In-app un-favoriting](/images/streamlit-community-cloud/favorited-view.png)

<Tip>

Click [here](/knowledge-base/deploy/upgrade-streamlit-version-on-streamlit-cloud) to learn more about upgrading the Streamlit version of your app on Streamlit Community Cloud.

</Tip>

## Analytics Modal

Once you have access to a Streamlit workspace, you have access to 2 types of analytics:

1. [Workspace analytics](/streamlit-community-cloud/get-started/manage-your-app#workspace-analytics): shows you how many viewers in total have visited _all_ the apps in your workspace.
   <Image alt="Workspace analytics" src="/images/streamlit-community-cloud/workspace-analytics.gif" />
2. [App viewers](/streamlit-community-cloud/get-started/manage-your-app#app-viewers): shows you who has recently viewed your workspace’s individual apps and when.
   <Image alt="Workspace analytics" src="/images/streamlit-community-cloud/app-viewers-data.gif" />

<Note>

The Analytics Modal is visible to everyone with access to your workspace, including admins, developers, or anyone with viewer access to a workspace.

</Note>

### Workspace analytics

Streamlit Community Cloud enables you to view analytics data for all apps in your workspace in one central dashboard. At a glance, you get an overview of how active your workspace is and how popular your apps are.

To view your Workspace analytics:

1. Select the "**Analytics**" option on the dashboard header
   ![Workspace analytics header dashboard](/images/streamlit-community-cloud/workspace-analytics-header.png)
2. View the "**Workspace**" tab in the Analytics modal
   ![Workspace analytics modal](/images/streamlit-community-cloud/workspace-analytics-modal.png)

You're presented with a graph that you can hover over to see the number of users who have viewed at least one app in your workspace that month. This viewers count includes apps that anyone in your workspace created.

Solid lines indicate fully-complete months on the dashboard, while dotted lines indicate the current in-progress month.

<Note>

Viewers data on your dashboard starts from April 2022 and onward. April 2022 data was our first month comprehensively tracking user analytics in Streamlit workspaces, and our tracking is even more refined starting in May 2022 and onward.

</Note>

### App viewers

In addition to a general overview of the activity of your workspace and the popularity of your apps, Streamlit Community Cloud allows you to drill down to the level of individual apps and understand their viewership better.

As an app developer or a viewer with access to a given workspace, you can see who has viewed a given app and when. Specifically, you can see the total viewers count of your app (since April 2022 and onward), the most recent unique viewers (capped up to your last 20 viewers), and a relative timestamp of their last view.

There are three ways to access the app viewers data:

1. From the app dashboard, click the "**︙**" overflow menu to the app's right and select **Analytics**:
   ![Analytics option dashboard](/images/streamlit-community-cloud/app-viewers-dashboard.png)

   Doing so opens the "**App viewers**" tab of the "**Analytics**" modal.
   ![App viewers analytics modal](/images/streamlit-community-cloud/app-viewers-analytics-modal.png)

   The dropdown selects your app by default and displays:

   - The total (all time) number of unique viewers for the app.
   - A list of the most recent viewers' names and a relative timestamp of their last view, sorted by the time since the last view (newest first).

2. Click the "**Analytics**" option on the dashboard header and select the "**App viewers**" tab:
   ![Analytics option header](/images/streamlit-community-cloud/app-viewers-header.png)

   Doing so opens the "**App viewers**" tab of the "**Analytics**" modal.

   ![App viewers analytics dropdown options](/images/streamlit-community-cloud/app-viewers-dropdown-options.png)

   The first app in your workspace is pre-selected in the dropdown by default. You can select the app you want to see the analytics for by clicking the corresponding app in the dropdown.

   ![App viewers analytics dropdown](/images/streamlit-community-cloud/app-viewers-analytics-modal.png)

3. You can also access app viewer analytics from right within individual apps! This is a capability if you have GitHub push access for a given app. Just view any app in your workspace as a developer, click the "**︙**" overflow menu at the bottom of the Cloud logs and select "**Analytics**":

<Flex>
<Image src="/images/streamlit-community-cloud/app-viewers-in-app.png" />
<Image src="/images/streamlit-community-cloud/app-viewers-analytics-modal.png" />
</Flex>

#### **App viewers for public vs private apps**

For public apps, we anonymize all viewers outside your workspace to protect their privacy and display anonymous viewers as random pseudonyms. You'll still be able to see the identities of fellow members in your workspace, though.

Meanwhile, for private apps that are only accessible to your own workspace's viewers, you will be able to see the specific users who recently viewed your apps.

Additionally, you may occasionally see anonymous users in private apps. Rest assured, these anonymous users _do_ have authorized view access granted by you or your workspace members.

Common reasons why users show up anonymously are:

1. The app was previously public
2. Given viewer viewed app in April 2022, when the Streamlit team was honing user identification for this feature
3. Given viewer disconnected their SSO and GitHub accounts previously

See Streamlit's general [Privacy Notice](https://streamlit.io/privacy-policy).
