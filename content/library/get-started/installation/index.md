---
title: Setup and installation
slug: /library/get-started/installation
---

# Setup and installation

## Local development

When developing locally, there are two layers to managing your Python development environment: environment managers and package managers. Environment managers allow you create virtual environments to isolate Python package installations between projects. We recommend using virtual environments because installing or upgrading a Python package may cause unintentional effects on another package.

On the other hand, Python package managers are tools like `pip` that help you quickly install Python packages. You use an environment manager to create a virtual envronment. Once inside that environment (e.g. once activated), you use a package manager to install Python packages.

### Python environment managers

Below are a few tools you can use for environment management:

- [venv](https://docs.python.org/3/library/venv.html)
- [pipenv](https://pipenv-fork.readthedocs.io/en/latest/)
- [poetry](https://python-poetry.org/)
- [virtualenv](https://virtualenv.pypa.io/en/latest/)
- [conda](https://docs.anaconda.com/free/anaconda/getting-started/)

Our [Local quickstart](/library/get-started/installation/local-quickstart) uses `conda` through Anaconda Navigator, while our instructions to [Use Python environments](/library/get-started/installation/using-python-environments) uses `venv`.

### Python package managers

[`pip`](https://pip.pypa.io/en/stable/installation/) is the most common Python package manager and what we recommend. [`conda`](https://docs.conda.io) is another Python package manager. You may notice that `conda` is also listed above as an environment manager. It has the functionality of both!

## Cloud development

Streamlit Community Cloud makes it easy to skip installation and start coding right in your browser with GitHub Codespaces. 🎉 Hop over to our [Cloud quickstart](/library/get-started/installation/cloud-quickstart) to create an account, deploy an example app, and jump right into a codespace to start editing. Return to [Main concepts](/library/get-started/main-concepts) to learn all about how Streamlit works.

You can edit any app you've deployed on Community Cloud with GitHub Codespaces, too! See [Edit your app with GitHub Codespaces](/streamlit-community-cloud/manage-your-app/edit-your-app#edit-your-app-with-github-codespaces).
