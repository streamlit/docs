---
title: Status and limitations
slug: /deploy/streamlit-community-cloud/status
---

# Status and limitations of Community Cloud

## Community Cloud Status

You can view the current status of Community Cloud at [streamlitstatus.com](https://www.streamlitstatus.com/).

## GitHub OAuth scope

In order to deploy your app, Streamlit requires access to your app's source code in GitHub and also the ability to manage the public keys associated with your repositories. The default GitHub OAuth scopes are sufficient to work with apps in public GitHub repositories. However, to access your private repositories, we create a read-only [GitHub Deploy Key](https://docs.github.com/en/free-pro-team@latest/developers/overview/managing-deploy-keys#deploy-keys) then access your repo using a public SSH key. When we create this key, GitHub notifies repo admins of the creation as a security measure.

Streamlit requires the additional `repo` OAuth scope from GitHub to work with your private repos and manage deploy keys. We recognize that the `repo` scope provides Streamlit with extra permissions that we do not really need, and which, as people who prize security, we'd rather not even be granted. Alas, we need to work with the APIs we are provided by GitHub.

### Developer permissions

Because of the OAuth limitations noted above, a developer must have administrative permissions to a repository to deploy apps from it.

## Repository file structure

Community Cloud initializes all apps from the root of the repository, even if the entrypoint file is in a subdirectory. You can deploy multiple apps from a single repository, but this has the following consequences:

- Community Cloud only recognizes one `.streamlit/configuration.toml` file at the root (of each branch) of each repository.
- Image, video, and audio file paths for Streamlit commands should be declared relative to the root of the repository. For example, `st.image`, `st.logo`, and icon images in `st.set_page_config` determine file locations relative to your working directory when you execute `streamlit run`.

## Python environments

- You cannot mix and match Python package managers for a single app. Community Cloud configures your app's Python environment based on the first environment configuration file it finds. For more information, see [Other Python package managers](/deploy/streamlit-community-cloud/deploy-your-app/app-dependencies#other-python-package-managers).
- If you pin `streamlit< 1.20.0`, then you must also pin `altair<5`.
- Community Cloud only supports released versions of Python that are still receiving security updates. You may not use end-of-life, prerelease, or feature versions of Python. For more information, see [Status of Python versions](https://devguide.python.org/versions/).

## Other limitations

- When you print something to the Cloud logs, you may need to do a `sys.stdout.flush()` before it shows up.
- All apps are hosted in the United States. This is currently not configurable.
