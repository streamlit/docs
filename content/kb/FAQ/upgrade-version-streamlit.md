---
title: How do I upgrade to the latest version of Streamlit?
slug: /knowledge-base/using-streamlit/how-upgrade-latest-version-streamlit
description: Upgrade Streamlit to the latest version with pip, Pipenv, Conda, or Poetry. Breaking changes are extremely rare, so existing apps keep running and gain new features, performance improvements, and security fixes.
---

# How do I upgrade to the latest version of Streamlit?

We recommend upgrading to the latest official release of Streamlit so you have access to the newest features, performance improvements, and security fixes. Breaking changes in Streamlit are extremely rare, and the vast majority of apps keep running on new releases for years. APIs are removed only in exceptional cases, after deprecation warnings well in advance and with a clear migration path. If you use Streamlit's [agent skills](/develop/api-reference/cli/skills), they update with Streamlit, so your coding agent keeps writing for the version you run. To bring an older app up to date with newer features, ask your coding agent: `/developing-with-streamlit Modernize my app`. For details, see [Modernize an existing app](/develop/concepts/ai-agents/coding-agents#modernize-an-existing-app). If you haven't installed Streamlit yet, please read our [Installation guide](/get-started/installation). It helps you set up your virtual environment and walks you through installing Streamlit on Windows, macOS, and Linux. Regardless of which package management tool and OS you're using, we recommend running the commands on this page in a virtual environment.

If you've previously installed Streamlit and want to upgrade to the latest version, here's how to do it based on your dependency manager.

## Pipenv

If you manage your environment with [Pipenv](https://pypi.org/project/pipenv/), follow these steps:

1. Navigate to the project folder containing your Pipenv environment:

```bash
cd myproject
```

2. Activate that environment, upgrade Streamlit, and verify you have the latest version:

```bash
pipenv shell
pip install --upgrade streamlit
streamlit version
```

Or if you want to use an easily-reproducible environment, replace `pip` with `pipenv`every time you install or update a package:

```bash
pipenv update streamlit
pipenv run streamlit version
```

## Conda

1. Activate the conda environment where Streamlit is installed:

```bash
conda activate $ENVIRONMENT_NAME
```

Be sure to replace`$ENVIRONMENT_NAME` ☝️ with the name your conda environment!

2. Update Streamlit within the active conda environment and verify you have the latest version:

```bash
conda update -c conda-forge streamlit -y
streamlit version
```

## Poetry

In order to get the latest version of Streamlit with [Poetry](https://python-poetry.org/) and verify you have the latest version, run:

```bash
poetry update streamlit
streamlit version
```
