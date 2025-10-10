---
title: Status and limitations
slug: /deploy/streamlit-community-cloud/status
description: Learn about Community Cloud status, limitations, GitHub OAuth scope, Python environments, configuration overrides, and IP addresses.
keywords: status, limitations, github oauth, python environments, configuration, ip addresses, debian, linux, security
---

# Status and limitations of Community Cloud

## Community Cloud Status

You can view the current status of Community Cloud at [streamlitstatus.com](https://www.streamlitstatus.com/).

## GitHub OAuth scope

To deploy your app, Streamlit requires access to your app's source code in GitHub and the ability to manage the public keys associated with your repositories. The default GitHub OAuth scopes are sufficient to work with apps in public GitHub repositories. However, to access your private repositories, we create a read-only [GitHub Deploy Key](https://docs.github.com/en/free-pro-team@latest/developers/overview/managing-deploy-keys#deploy-keys) and then access your repo using an SSH key. When we create this key, GitHub notifies repo admins of the creation as a security measure.

Streamlit requires the additional `repo` OAuth scope from GitHub to work with your private repos and manage deploy keys. We recognize that the `repo` scope provides Streamlit with extra permissions that we do not really need and which, as people who prize security, we'd rather not even be granted. This was the permission model available from GitHub when Community Cloud was created. However, we are working on adopting the new GitHub permission model to reduce uneeded permissions.

### Developer permissions

Because of the OAuth limitations noted above, a developer must have administrative permissions to a repository to deploy apps from it.

## Repository file structure

You can deploy multiple apps from your repository, and your entrypoint file(s) may be anywhere in your directory structure. However, Community Cloud initializes all apps from the root of your repository, even if the entrypoint file is in a subdirectory. This has the following consequences:

- Community Cloud only recognizes one `.streamlit/configuration.toml` file at the root (of each branch) of your repository.
- You must declare image, video, and audio file paths for Streamlit commands relative to the root of your repository. For example, `st.image`, `st.logo`, and the `page_icon` parameter in `st.set_page_config` expect file locations relative to your working directory (i.e. where you execute `streamlit run`).

## Linux environments

Community Cloud is built on Debian Linux.

- Community Cloud uses Debian 11 ("bullseye"). To browse available packages that can be installed, see the [package list](https://packages.debian.org/bullseye/).
- All file paths must use forward-slash path separators.

## Python environments

- You cannot mix and match Python package managers for a single app. Community Cloud configures your app's Python environment based on the first environment configuration file it finds. For more information, see [Other Python package managers](/deploy/streamlit-community-cloud/deploy-your-app/app-dependencies#other-python-package-managers).
- We recommend that you use the latest version of Streamlit to ensure full Community Cloud functionality. Be sure to take note of Streamlit's [current requirements](https://github.com/streamlit/streamlit/blob/develop/lib/setup.py) for package compatibility when planning your environment, especially `protobuf>=3.20,<6`.
- If you pin `streamlit< 1.20.0`, you must also pin `altair<5`. Earlier versions of Streamlit did not correctly restrict Altair's version. A workaround script running on Community Cloud will forcibly install `altair<5` if a newer version is detected. This could unintentionally upgrade Altair's dependencies in violation of your environment configuration. Newer versions of Streamlit support Altair version 5.
- Community Cloud only supports released versions of Python that are still receiving security updates. You may not use end-of-life, prerelease, or feature versions of Python. For more information, see [Status of Python versions](https://devguide.python.org/versions/).

## Configuration

The following configuration options are set within Community Cloud and will override any contrary setting in your `config.toml` file:

```toml
[client]
showErrorDetails = false

[runner]
fastReruns = true

[server]
runOnSave = true
enableXsrfProtection = true

[browser]
gatherUsageStats = true
```

## IP addresses

If you need to whitelist IP addresses for a connection, Community Cloud is currently served from the following IP addresses:

<Warning>

    These IP addresses may change at any time without notice.

</Warning>

<Flex wrap >
    <div style={{ width: "150px" }}>35.230.127.150</div>
    <div style={{ width: "150px" }}>35.203.151.101</div>
    <div style={{ width: "150px" }}>34.19.100.134</div>
    <div style={{ width: "150px" }}>34.83.176.217</div>
    <div style={{ width: "150px" }}>35.230.58.211</div>
    <div style={{ width: "150px" }}>35.203.187.165</div>
    <div style={{ width: "150px" }}>35.185.209.55</div>
    <div style={{ width: "150px" }}>34.127.88.74</div>
    <div style={{ width: "150px" }}>34.127.0.121</div>
    <div style={{ width: "150px" }}>35.230.78.192</div>
    <div style={{ width: "150px" }}>35.247.110.67</div>
    <div style={{ width: "150px" }}>35.197.92.111</div>
    <div style={{ width: "150px" }}>34.168.247.159</div>
    <div style={{ width: "150px" }}>35.230.56.30</div>
    <div style={{ width: "150px" }}>34.127.33.101</div>
    <div style={{ width: "150px" }}>35.227.190.87</div>
    <div style={{ width: "150px" }}>35.199.156.97</div>
    <div style={{ width: "150px" }}>34.82.135.155</div>
</Flex>

## Other limitations

- When you print something to the Cloud logs, you may need to do a `sys.stdout.flush()` before it shows up.
- Community Cloud hosts all apps in the United States. This is currently not configurable.
- Community Cloud rate limits app updates from GitHub to no more than five per minute.
