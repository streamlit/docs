---
title: streamlit init
slug: /develop/api-reference/cli/init
description: streamlit init creates the files for a new Streamlit app project including requirements.txt and streamlit_app.py.
keywords: streamlit init, cli, command line, create project, new app, requirements.txt, streamlit_app.py, project files
---

## `$ streamlit init`

This command creates the files for a new Streamlit app.

### Syntax

```
streamlit init <directory>
```

### Arguments

`<directory>` (Optional): The directory location of the new project. If no directory is provided, the current working directory will be used.

### Examples

#### Example 1: Create project files the current working directory

1. In your current working directory (CWD), execute the following:

   ```bash
   streamlit init
   ```

   Streamlit creates the following files:

   ```
   CWD/
   ├── requirements.txt
   └── streamlit_app.py
   ```

2. In your terminal, Streamlit prompts, `❓ Run the app now? [Y/n]`. Enter `Y` for yes.

   This is equivalent to executing `streamlit run streamlit_app.py` from your current working directory.

3. Begin editing your `streamlit_app.py` file and save your changes.

#### Example 2: Create project files in another directory

1. In your current working directory (CWD), execute the following:

   ```bash
   streamlit init project
   ```

   Streamlit creates the following files:

   ```
   CWD/
   └── project/
       ├── requirements.txt
       └── streamlit_app.py
   ```

2. In your terminal, Streamlit prompts, `❓ Run the app now? [Y/n]`. Enter `Y` for yes.

   This is equivalent to executing `streamlit run project/streamlit_app.py` from your current working directory.

3. Begin editing your `streamlit_app.py` file and save your changes.
