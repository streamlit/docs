---
title: App dependencies for your Community Cloud app
slug: /deploy/streamlit-community-cloud/deploy-your-app/app-dependencies
---

# App dependencies for your Community Cloud app

The main reason that apps fail to build properly is because Streamlit Community Cloud can't find your dependencies! There are two kinds of dependencies your app might have: Python dependencies and external dependencies. Python dependencies are other Python packages (just like Streamlit!) that you `import` into your script. External dependencies are less common, but they include any other software your script needs to function properly. Because Community Cloud runs on Linux, these will be Linux dependencies installed with `apt-get` outside the Python environment.

For your dependencies to be installed correctly, make sure you:

1. Add a [requirements file](#add-python-dependencies) for Python dependencies.
2. Optional: To manage any external dependencies, add a `packages.txt` file.

<Note>

Python requirements files should be placed either in the root of your repository or in the same
directory as your app's entrypoint file.

</Note>

## Add Python dependencies

With each `import` statement in your script, you are bringing in a Python dependency. You need to tell Community Cloud how to install those dependencies through a Python package manager. We recommend using a `requirements.txt` file, which is based on `pip`.

You should _not_ include <a href="https://docs.python.org/3/py-modindex.html" target="_blank">built-in Python libraries</a> like `math` or `random` in your `requirements.txt` file. These are a part of Python and aren't installed separately. Also, Community Cloud has `streamlit` installed by default. You don't strictly need to include `streamlit` unless you want to pin or restrict the version. If you deploy an app without a `requirements.txt` file, your app will run in an environment with just `streamlit` (and its dependencies) installed.

If you have a script like the following, no extra dependencies would be needed since `pandas` and `numpy` are installed as direct dependencies of `streamlit`. Similarly, `math` and `random` are built into Python.

```python
import streamlit as st
import pandas as pd
import numpy as np
import math
import random

st.write("Hi!")
```

However, a valid `requirements.txt` file would be:

```none
streamlit
pandas
numpy
```

Alternatively, if you needed to specify certain versions, another valid example would be:

```none
streamlit==1.24.1
pandas>2.0
numpy<=1.25.1
```

In the above example, `streamlit` is pinned to version `1.24.1`, `pandas` must be strictly greater than version 2.0, and `numpy` must be at-or-below version 1.25.1. Each line in your `requirements.txt` file is effectively what you would like to `pip install` into your cloud environment.

<Tip>
    To learn about limitations of Community Cloud's Python environments, see [Community Cloud status and limitations](/deploy/streamlit-community-cloud/status#python-environments).
</Tip>

### Other Python package managers

There are other Python package managers in addition to `pip`. If you want to consider alternatives to using a `requirements.txt` file, Community Cloud will look for and use the first dependency file it finds in the following order:

<table style={{ textAlign: 'center' }}>
    <tr>
        <th style={{ fontSize: '1.2em' }}> Recognized Filename</th>
        <th style={{ fontSize: '1.2em' }}>Python Package Manager</th>
    </tr>
    <tr>
        <td style={{ fontSize: '1em' }}><code>Pipfile</code></td>
        <td style={{ fontSize: '1em' }}><a href="https://pipenv-fork.readthedocs.io/en/latest/basics.html" target="_blank">pipenv</a></td>
    </tr>
    <tr>
        <td style={{ fontSize: '1em' }}><code>environment.yml</code></td>
        <td style={{ fontSize: '1em' }}><a href="https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#creating-an-environment-file-manually" target="_blank">conda</a></td>
    </tr>
    <tr>
        <td style={{ fontSize: '1em' }}><code>requirements.txt</code></td>
        <td style={{ fontSize: '1em' }}><a href="https://pip.pypa.io/en/stable/user_guide/#requirements-files" target="_blank">pip</a></td>
    </tr>
    <tr>
        <td style={{ fontSize: '1em' }}><code>pyproject.toml</code></td>
        <td style={{ fontSize: '1em' }}><a href="https://python-poetry.org/docs/basic-usage/" target="_blank">poetry</a></td>
    </tr>
</table>

<Warning>

You should only use one requirements file for your app. If you include more than one (e.g. `requirements.txt` and `Pipfile`), only the first file encountered will be used as described above. Additionally, Streamlit will first look in the directory of your Streamlit app; however, if no requirements file is found, Streamlit will then look at the root of the repo.

</Warning>

## apt-get dependencies

For many apps, a `packages.txt` file is not required. However, if your script requires any software to be installed that is not a Python package, you need a `packages.txt` file. Community Cloud is built on Debian Linux. Anything you want to `apt-get install` must go in your `packages.txt` file.

If `packages.txt` exists in the root directory of your repository we automatically detect it, parse it, and install the listed packages. You can read more about apt-get in <a href="https://linux.die.net/man/8/apt-get" target="_blank">Linux documentation</a>.

Add **apt-get** dependencies to `packages.txt` &mdash; one package name per line. For example, <a href="https://github.com/PyMySQL/mysqlclient" target="_blank"><code>mysqlclient</code></a> is a Python package which requires additional software be installed to function. A valid `packages.txt` file to enable `mysqlclient` would be:

```bash
    build-essential
    pkg-config
    default-libmysqlclient-dev
```
