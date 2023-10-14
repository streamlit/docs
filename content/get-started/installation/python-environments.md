---
title: Develop locally with Python environments
slug: /get-started/installation/python-environments
nextTitle: Main concepts
nextLink: /library/get-started/main-concepts
---

# Develop locally with Python environments

(Largely a rework of our current installation page.)

Prerequisite: Have your favorite code editor ready. We like VS Code and will use it for our examples.

## What is a Python environment?

### Python environment managers

### Python package managers

---

This could be two subpages if getting into the detail of managing environments in VS Code:

---

## Install Streamlit with `pip` and `venv`

Link to installing Python, passing OS details to Python installer.

(Simple tab element for commands on different OS)

```bash
cd project-directory
python -m venv .venv
source .venv/bin/activate # .venv/Scripts/activate.bat
pip install streamlit
```

### Using `requirements.txt`

Most IDEs will automatically detect and activate virtual environments. Link to VS Code docs.

## Install Streamlit with `conda`

`conda` is a commandline tool. Anaconda is an application. Either can be used to manage both environments and packages. Anaconda Distribution installs both. Use the quickstart if you want to install Anaconda Distribution. For a leaner installation, link to installing just conda.

```bash
cd project-directory
conda create -p ./env streamlit
conda activate ./env
```

...

Again mention IDEs and any relevant instructions for VS Code.
