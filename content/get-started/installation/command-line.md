---
title: Install Streamlit using command line
slug: /get-started/installation/command-line
---

# Install Streamlit using command line

This page will walk you through creating an environment with `venv` and installing Streamlit with `pip`. At the end, you'll build a simple "Hello world" app and run it. If you prefer to have a graphical interface to manage your Python environments, check out how to [Install Streamlit using Anaconda Distribution](/get-started/installation/anaconda-distribution).

## Prerequisites

Before you get started, make sure you have Python and a code editor installed.

- We use [VS Code](https://code.visualstudio.com/download) in our tutorials.
- Streamlit requires [Python 3.8 - Python 3.12](https://www.python.org/downloads/).
- (macOS only) Streamlit also requires [Xcode command line tools](https://mac.install.guide/commandlinetools/4.html).

## Set up your virtual environment

1. Open a terminal and navigate to your project folder.

   ```bash
   cd myproject
   ```

2. In your terminal, type:

   ```bash
   python -m venv .venv
   ```

3. A folder named ".venv" will appear in your project. This directory is where your virtual environment and its dependencies are installed.

4. In your terminal, activate your environment with one of the following commands, depending on your operating system.

   ```bash
   # Windows command prompt
   .venv\Scripts\activate.bat

   # Windows PowerShell
   .venv\Scripts\Activate.ps1

   # macOS and Linux
   source .venv/bin/activate
   ```

5. Once activated, you will see your environment name in parentheses before your prompt. "(.venv)"

6. In the terminal with your environment activated, type:

   ```bash
   pip install streamlit
   ```

7. Test that the installation worked by launching the Streamlit Hello example app:

   ```bash
   streamlit hello
   ```

   If this doesn't work, use the long-form command:

   ```bash
   python -m streamlit hello
   ```

8. Streamlit's Hello app should appear in a new tab in your web browser!
   <Cloud src="https://doc-mpa-hello.streamlit.app/?embed=true" height="700" />
9. Close your terminal when you are done.

## Use your new environment

1. Create a file named `app.py` in your project folder.

   ```python
   import streamlit as st

   st.write("Hello world")
   ```

2. Any time you want to use your new environment, you first need to go to your project folder (where the `.venv` directory lives) and run the command to activate it:

   ```bash
   # Windows command prompt
   .venv\Scripts\activate.bat

   # Windows PowerShell
   .venv\Scripts\Activate.ps1

   # macOS and Linux
   source .venv/bin/activate
   ```

3. Once activated, you will see your environment's name in parentheses at the beginning of your terminal prompt. "(.venv)"

4. Run your Streamlit app.

   ```bash
   streamlit run app.py
   ```

   If this doesn't work, use the long-form command:

   ```bash
   python -m streamlit run app.py
   ```

5. To stop the Streamlit server, press `Ctrl+C` in the terminal.

6. When you're done using this environment, return to your normal shell by typing:
   ```bash
   deactivate
   ```

Now that you've installed Streamlit, take a few minutes to read through [Main concepts](/get-started/fundamentals/main-concepts) to understand Streamlit's dataflow model.
