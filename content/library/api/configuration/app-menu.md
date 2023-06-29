---
title: ☰ App menu
slug: /library/api-reference/configuration-and-management/app-menu
---

# ☰ App menu

Streamlit provides a configurable menu within a running app with convenient tools for developers and users. By default, you can access developer options from the app menu when viewing an app locally or on Streamlit Community Cloud while logged into an account that can administer the app. While an app is running, click the icon in the upper-right corner to access the menu.

<div style={{ maxWidth: '90%', marginLeft: '3em' }}>
    <Image src="/images/api/configuration/app-menu-developer.png" alt="App menu" />
</div>

## Rerun

You can manually trigger a rerun of an app by clicking "**Rerun**" from the app menu. This rerun will not reset the your session. Your widget states and values stored in `st.session_state` will be preserved. As a shortcut, without opening the app menu, you can rerun your app by pressing "**R**" on your keyboard (if your aren't currently focused on a text-input element).

<div style={{ maxWidth: '30%', marginLeft: '3em' }}>
    <Image src="/images/api/configuration/app-menu-rerun-XL.png" alt="Rerun" />
</div>

## Settings

With the "**Settings**" option, you can control the appearance of your running app. If running the app locally, you can set how your app responds to changes in source code. See more about development flow in [Main concepts](/library/get-started/main-concepts#development-flow). You can also force your app to appear in wide mode, even if not set within the script using [`st.set_page_config`](/library/api-reference/utilities/st.set_page_config).

<div style={{ maxWidth: '30%', marginLeft: '3em' }}>
    <Image src="/images/api/configuration/app-menu-settings-XL.png" alt="Settings" />
</div>

### Theme settings

After clicking "**Settings**" from the app menu, you choose between "**Light**", "**Dark**", or "**Use system setting**" for the app's base theme. Click on "**Edit active theme**" to modify the theme, color-by-color.

<div style={{ maxWidth: '90%', marginLeft: '3em' }}>
    <Image src="/images/api/configuration/app-menu-settings-modal.png" alt="Settings" />
</div>

<div style={{ maxWidth: '90%', marginLeft: '3em' }}>
    <Image src="/images/api/configuration/app-menu-settings-theme.png" alt="Theme" />
</div>

## Print

Click "**Print**" to open your browser's print dialog. Print support is currently limited and experimental.

<div style={{ maxWidth: '30%', marginLeft: '3em' }}>
    <Image src="/images/api/configuration/app-menu-print-XL.png" alt="Print" />
</div>

## Record a screencast

You can easily make screen recordings right from your app! Screen recording is supported in the latest versions of Chrome, Edge, and Firefox. Be sure your browser is up-to-date for compatibility. Click "**Record a screencast**" to start the process. Depending on your current settings, you may need to grant permission to your browser to record your screen or to use your microphone if recording a voiceover.

<div style={{ maxWidth: '30%', marginLeft: '3em' }}>
    <Image src="/images/api/configuration/app-menu-record-XL.png" alt="Record" />
</div>

<div style={{ maxWidth: '90%', marginLeft: '3em' }}>
    <Image src="/images/api/configuration/app-menu-record.gif" alt="Record" />
</div>

## About

<div style={{ maxWidth: '30%', marginLeft: '3em' }}>
    <Image src="/images/api/configuration/app-menu-about-XL.png" alt="Rerun" />
</div>

## Clear cache (developer option)

<div style={{ maxWidth: '30%', marginLeft: '3em' }}>
    <Image src="/images/api/configuration/app-menu-clear-XL.png" alt="Rerun" />
</div>

## Deploy this app (developer option)

<div style={{ maxWidth: '30%', marginLeft: '3em' }}>
    <Image src="/images/api/configuration/app-menu-deploy-XL.png" alt="Rerun" />
</div>