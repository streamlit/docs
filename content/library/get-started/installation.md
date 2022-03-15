---
title: Installation
slug: /library/get-started/installation
---

# Install Streamlit

## Table of contents

1. [Prerequisites](#prerequisites)
2. [Install Streamlit on Windows](#install-streamlit-on-windows)
3. [Install Streamlit on macOS/Linux](#install-streamlit-on-macoslinux)

## Prerequisites

Before you get started, you're going to need a few things:

- Your favorite IDE or text editor
- [Python 3.7 - Python 3.9](https://www.python.org/downloads/)
- [PIP](https://pip.pypa.io/en/stable/installing/)

If you haven't already, take a few minutes to read through [Main
concepts](/library/get-started/main-concepts) to understand Streamlit's data flow model.

## Set up your virtual environment

Regardless of which package management tool you're using, we recommend running
the commands on this page in a virtual environment. This ensures that the dependencies
pulled in for Streamlit don't impact any other Python projects
you're working on.

Below are a few tools you can use for environment management:

- [pipenv](https://pipenv-fork.readthedocs.io/en/latest/)
- [poetry](https://python-poetry.org/)
- [venv](https://docs.python.org/3/library/venv.html)
- [virtualenv](https://virtualenv.pypa.io/en/latest/)
- [conda](https://www.anaconda.com/distribution/)

## Install Streamlit on Windows

Streamlit's officially-supported environment manager on Windows is [Anaconda Navigator](https://docs.anaconda.com/anaconda/navigator/).

### Install Anaconda

If you don't have Anaconda install yet, follow the steps provided on the [Anaconda installation page](https://docs.anaconda.com/anaconda/install/windows/).

### Create a new environment with Streamlit

Next you'll need to set up your environment.

1. Follow the steps provided by Anaconda to [set up and manage your environment](https://docs.anaconda.com/anaconda/navigator/getting-started/#managing-environments) using the Anaconda Navigator.

2. Select the "▶" icon next to your new environment. Then select "Open terminal":

   !["Open terminal" in Anaconda Navigator](https://i.stack.imgur.com/EiiFc.png)

3. In the terminal that appears, type:

   ```sh
   pip install streamlit
   ```

4. Test that the installation worked:

   ```sh
   streamlit hello
   ```

   Streamlit's Hello app should appear in a new tab in your web browser!

### Use your new environment

1. In Anaconda Navigator, open a terminal in your environment (see step 2 above).
2. In the terminal that appears, use Streamlit as usual:

   ```sh
   streamlit run myfile.py
   ```

## Install Streamlit on macOS/Linux

Streamlit's officially-supported environment manager for macOS and Linux is [Pipenv](https://pypi.org/project/pipenv/). See instructions on how to install and use it below.

### Install Pipenv

1. Install `pip`.

   On a macOS:

   ```sh
   sudo easy_install pip
   ```

   On Ubuntu with Python 3:

   ```sh
   sudo apt-get install python3-pip
   ```

   For other Linux distributions, see [How to install PIP for Python](https://www.makeuseof.com/tag/install-pip-for-python/).

2. Install `pipenv`.

   ```sh
   pip3 install pipenv
   ```

### Create a new environment with Streamlit

1. Navigate to your project folder:

   ```sh
   cd myproject
   ```

2. Create a new Pipenv environment in that folder and activate that environment:

   ```sh
   pipenv shell
   ```

   When you run the command above, a file called `Pipfile` will appear in `myprojects/`. This file is where your Pipenv environment and its dependencies are declared.

3. Install Streamlit in your environment:

   ```sh
   pip install streamlit
   ```

   Or if you want to create an easily-reproducible environment, replace `pip` with `pipenv` every time you install something:

   ```sh
   pipenv install streamlit
   ```

4. Test that the installation worked:

   ```sh
   streamlit hello
   ```

   Streamlit's Hello app should appear in a new tab in your web browser!

### Use your new environment

1. Any time you want to use the new environment, you first need to go to your project folder (where the `Pipenv` file lives) and run:

   ```sh
   pipenv shell
   ```

2. Now you can use Python and Streamlit as usual:

   ```sh
   streamlit run myfile.py
   ```

3. When you're done using this environment, just type `exit` or press `ctrl-D` or `ctrl-C` to return to your normal shell.
