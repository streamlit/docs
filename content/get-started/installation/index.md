---
title: Installation
slug: /get-started/installation
---

# Installation

This section walks you through setting up your Python development environment. If you're already set up for Python development and understand virtual environments, here's the TLDR:

1. In a virtual environment run:
   ```bash
   pip install streamlit
   ```
2. Validate the installation by running our Hello app:
   ```bash
   streamlit hello
   ```
3. Jump to our [Main concepts](/get-started/fundamentals/main-concepts).

Everyone else, read on!

## Develop locally

When developing locally, there are two layers to managing your Python development environment: environment managers and package managers. Environment managers allow you to create virtual environments to isolate Python package installations between projects. We recommend using virtual environments because installing or upgrading a Python package may cause unintentional effects on another package.

On the other hand, Python package managers are tools like `pip` that help you quickly install Python packages. You use an environment manager to create a virtual environment. Once inside that environment (e.g. once activated), you use a package manager to install Python packages.

### Python environment managers

Some common environment managers include: [venv](https://docs.python.org/3/library/venv.html), [pipenv](https://pipenv-fork.readthedocs.io/en/latest/), [poetry](https://python-poetry.org/), [virtualenv](https://virtualenv.pypa.io/en/latest/), and [conda](https://docs.anaconda.com/free/anaconda/getting-started/).

If you prefer to manage your Python environments with a graphical interface, [Install Streamlit using Anaconda Distribution](/get-started/installation/anaconda-distribution). Anaconda Distribution also comes with its own installation of Python and may be helpful if you want a clean start or an easy way to handle multiple versions of Python. If you prefer to manage your environments by command line, [Install Streamlit using command line](/get-started/installation/command-line).

### Python package managers

[`pip`](https://pip.pypa.io/en/stable/installation/) is the most common Python package manager and what we recommend.

## Develop with GitHub Codespaces

Streamlit Community Cloud is an easy way deploy, manage, and share your apps with the world. You can also [Use Community Cloud to develop with GitHub Codespaces](/get-started/installation/community-cloud)! Just create an account, deploy an example app, and jump right into a codespace to start editing. Return to [Main concepts](/get-started/fundamentals/main-concepts) to learn all about how Streamlit works.

You can edit any app you've deployed on Community Cloud with GitHub Codespaces, too! See [Edit your app with GitHub Codespaces](/streamlit-community-cloud/manage-your-app/edit-your-app#edit-your-app-with-github-codespaces).
