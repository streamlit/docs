---
title: App dependencies
slug: /streamlit-community-cloud/get-started/deploy-an-app/app-dependencies
---

# App dependencies

The main reason that apps fail to build properly is because Streamlit Community Cloud can't find your dependencies! So make sure you:

1. Add a [requirements file](#add-python-dependencies) for Python dependencies.
2. (optional) Add a `packages.txt` file to manage any external dependencies (i.e Linux dependencies outside Python environment).

<Note>

Python requirements files should be placed either in the root of your repository or in the same
directory as your Streamlit app.

</Note>

### Add Python dependencies

Streamlit looks at your requirements file's filename to determine which Python dependency manager to use in the order below. Streamlit will stop and install the first requirements file found.

| **Filename**       | **Dependency Manager** | **Documentation**                                                                                                                     |
| :----------------- | :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `Pipfile`          | pipenv                 | **[docs](https://pipenv-fork.readthedocs.io/en/latest/basics.html)**                                                                  |
| `environment.yml`  | conda                  | **[docs](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#creating-an-environment-file-manually)** |
| `requirements.txt` | pip                    | **[docs](https://pip.pypa.io/en/stable/user_guide/#requirements-files)**                                                              |
| `pyproject.toml`   | poetry                 | **[docs](https://python-poetry.org/docs/basic-usage/)**                                                                               |

<Note>

Only include packages in your requirements file that are not distributed with a standard Python
installation. If [any of the modules from base Python](https://docs.python.org/3/py-modindex.html)
are included in the requirements file, you will get an error when you try to deploy. Additionally, we recommend that you
use the latest version of Streamlit to ensure full Streamlit Community Cloud functionality. Be sure to take note of
Streamlit's [current requirements](https://github.com/streamlit/streamlit/blob/develop/lib/dev-requirements.txt)
for package compatibility when planning your environment, especially `protobuf<4,>=3.12`.

</Note>

<Warning>

You should only use one requirements file for your app. If you include more than one (e.g.
`requirements.txt` and `Pipfile`). Streamlit will first look in the directory of your Streamlit app;
however, if no requirements file is found, Streamlit will then look at the root of the repo.

</Warning>

### apt-get dependencies

If `packages.txt` exists in the root directory of your repository we automatically detect it, parse it, and install the listed packages as described below. You can read more about apt-get in their [docs](https://linux.die.net/man/8/apt-get).

Add **apt-get** dependencies to `packages.txt`, one package name per line. For example:

```shell
    freeglut3-dev
    libgtk2.0-dev
```
