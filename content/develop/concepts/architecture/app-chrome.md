---
title: The app chrome
slug: /develop/concepts/architecture/app-chrome
description: Learn about Streamlit's app chrome including the status area, toolbar, and configurable app menu with developer options and deployment features.
keywords: app chrome, streamlit chrome, app menu, status area, toolbar, developer options, app interface, streamlit ui, app navigation, deployment menu
---

# The app chrome

Your Streamlit app has a few widgets in the top right to help you as you develop. These widgets also help your viewers as they use your app. We call this things “the app chrome”. The chrome includes a status area, toolbar, and app menu.

Your app menu is configurable. By default, you can access developer options from the app menu when viewing an app locally or on Streamlit Community Cloud while logged into an account with administrative access. While viewing an app, click the icon in the upper-right corner to access the menu.

## Menu options

The menu is split into sections. The theme selector, print, and screen recording options are available to all viewers. The [developer options](#developer-options) are only available to developers. Read more about [customizing this menu](#customize-the-menu) at the end of this page.

### Theme

At the top of the app menu, you can choose between "**System**", "**Light**", or "**Dark**" for the app's theme. "**System**" uses the light or dark mode preference set by your operating system and browser. If the app's developer [configured a custom theme](/develop/concepts/configuration/theming) with light and dark variants, these options switch between those variants. If the developer configured a single custom theme without light and dark variants, the theme selector isn't shown.

### Print

Click "**Print**" or use keyboard shortcuts (`⌘+P` or `Ctrl+P`) to open a print dialog. This option uses your browser's built-in print-to-pdf function. To modify the appearance of your print, you can do the following:

- Expand or collapse the sidebar before printing to respectively include or exclude it from the print.
- Resize the sidebar in your app by clicking and dragging its right border to achieve your desired width.
- You may need to enable "**Background graphics**" in your print dialog if you are printing in dark mode.
- If your app uses a wide layout, you may need to adjust the print scale to prevent elements from clipping off the page.

### Record screen

You can easily make screen recordings right from your app! Screen recording is supported in the latest versions of Chrome, Edge, and Firefox. Ensure your browser is up-to-date for compatibility. Depending on your current settings, you may need to grant permission to your browser to record your screen or to use your microphone if recording a voiceover.

1. While viewing your app, open the app menu from the upper-right corner.
2. Click "**Record screen**."
3. If you want to record audio through your microphone, check "**Also record audio**."
4. Click "**Start recording**." (You may be prompted by your OS to permit your browser to record your screen or use your microphone.)

<div style={{ maxWidth: '90%', margin: '0 2em 0 2em' }}>
    <Image src="/images/app-menu/app-menu-record-2.png" alt="Record" />
</div>

5. Select which tab, window, or monitor you want to record from the listed options. The interface will vary depending on your browser.

<div style={{ maxWidth: '90%', margin: '0 2em 0 2em' }}>
    <Image src="/images/app-menu/app-menu-record-3.png" alt="Record" />
</div>

6. Click "**Share**."

<div style={{ maxWidth: '90%', margin: '0 2em 0 2em' }}>
    <Image src="/images/app-menu/app-menu-record-4.png" alt="Record" />
</div>

7. While recording, you will see a red circle on your app's tab and on the app menu icon. If you want to cancel the recording, click "**Stop sharing**" at the bottom of your app.

<div style={{ maxWidth: '90%', margin: '0 2em 0 2em' }}>
    <Image src="/images/app-menu/app-menu-record-5.png" alt="Record" />
</div>

8. When you are done recording, press "**Esc**" on your keyboard or click "**Stop recording**" from your app's menu.
9. Follow your browser's instructions to save your recording. Your saved recording will be available where your browser saves downloads.

### About

If the app's developer sets an About message using `menu_items` in [`st.set_page_config`](/develop/api-reference/configuration/st.set_page_config), the app menu includes an "**About**" option that shows the message. Developers can also add "**Get help**" and "**Report a bug**" links to the app menu the same way.

### Streamlit version

You can conveniently check what version of Streamlit is running at the bottom of the app menu. It shows "**Made with Streamlit v**" followed by the version number. To copy the version number, click the copy icon next to it.

## Developer options

By default, developer options only show when viewing an app locally or when viewing a Community Cloud app while logged in with administrative permission. You can [customize the menu](#customize-the-menu) if you want to make these options available for all users.

### Rerun

You can manually trigger a rerun of your app by clicking "**Rerun**" from the app menu. This rerun will not reset your session. Your widget states and values stored in [`st.session_state`](/develop/concepts/architecture/session-state) will be preserved. As a shortcut, without opening the app menu, you can rerun your app by pressing "**R**" on your keyboard (if you aren't currently focused on an input element). Unlike the menu option, this shortcut works for all viewers, even when developer options are hidden.

### Auto rerun

Turn on "**Auto rerun**" to rerun your app automatically whenever you save a change to its source code. This is the same as clicking "**Always rerun**" in the prompt that appears in the upper-right corner of your app when Streamlit detects a change. See more about development flow in [Basic concepts](/get-started/fundamentals/main-concepts#development-flow).

### Clear cache

Reset your app's cache by clicking "**Clear cache**" from the app's menu or by pressing "**C**" on your keyboard while not focused on an input element. This will remove all cached entries for [`@st.cache_data`](/develop/api-reference/caching-and-state/st.cache_data) and [`@st.cache_resource`](/develop/api-reference/caching-and-state/st.cache_resource).

### Deploy this app

If you are running an app locally from within a git repo, you can deploy your app to Streamlit Community Cloud in a few easy clicks! Make sure your work has been pushed to your online GitHub repository before beginning. For the greatest convenience, make sure you have already created your [Community Cloud account](/deploy/streamlit-community-cloud/get-started/create-your-account) and are signed in.

1. Click "**Deploy**" next to the app menu icon (<i style={{ verticalAlign: "-.25em" }} className={{ class: "material-icons-sharp" }}>more_vert</i>).

<div style={{ maxWidth: '90%', margin: '0 2em 0 2em' }}>
    <Image src="/images/app-menu/app-menu-deploy.png" alt="Settings" />
</div>

2. Click "**Deploy now**."

<div style={{ maxWidth: '90%', margin: '0 2em 0 2em' }}>
    <Image src="/images/app-menu/app-menu-deploy-1.png" alt="Settings" />
</div>

3. You will be taken to Community Cloud's "Deploy an app" page. Your app's repository, branch, and file name will be prefilled to match your current app! Learn more about [deploying an app](/deploy/streamlit-community-cloud/deploy-your-app) on Streamlit Community Cloud.

The whole process looks like this:

<div style={{ maxWidth: '90%', margin: '0 2em 0 2em' }}>
    <Image src="/images/app-menu/deploy-from-local.gif" alt="Settings" />
</div>

## Customize the menu

Using `client.toolbarMode` in your app's [configuration](/develop/concepts/configuration), you can make the app menu appear in the following ways:

- `"developer"` &mdash; Show the developer options to all viewers.
- `"viewer"` &mdash; Hide the developer options from all viewers.
- `"minimal"` &mdash; Show only the theme selector, the Streamlit version, and those options set externally. These options can be declared through [`st.set_page_config`](/develop/api-reference/configuration/st.set_page_config) or populated through Streamlit Community Cloud. If there's no theme selector and no options are set externally, the app menu is hidden.
- `"auto"` &mdash; This is the default and will show the developer options when accessed through localhost or through Streamlit Community Cloud when logged into an administrative account for the app. Otherwise, the developer options will not show.
