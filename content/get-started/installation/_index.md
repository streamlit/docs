---
title: Install Streamlit
slug: /get-started/installation
description: Learn how to install Streamlit with comprehensive guides to use pip, conda, Anaconda Distribution, cloud environments, and command line tools.
keywords: install streamlit, installation, pip install, conda install, anaconda, command line, cloud installation, setup streamlit
---

# Install Streamlit

There are multiple ways to set up your development environment and install Streamlit.
Developing locally with Python installed on your own computer is the most
common scenario.

<Tip>

Try a Streamlit Playground that runs in your browser &mdash; no installation required.
(Note that this is not how Streamlit is meant to be used, because it has many downsides. That's why it's a
_playground_!)

<IconLink
    href="/get-started/installation/streamlit-playground"
    icon="arrow_forward"
    label="Instructions for the playground"
    cssModuleClassName="Indigo"
    cssModuleIconClassName="IconRight"
/>

</Tip>

## Summary for experienced Python developers

1. To set up your Python environment and test your installation, execute the following terminal commands:

   ```bash
   pip install streamlit
   streamlit hello
   ```

1. Jump to our [Basic concepts](/get-started/fundamentals/main-concepts).

<Tip>

If you use an AI coding agent, such as Claude Code, Cursor, Codex, or Snowflake CoCo, install Streamlit's official agent skills. They match your installed version, so your agent follows current Streamlit APIs and best practices:

```bash
streamlit skills
```

Then invoke the `developing-with-streamlit` skill in your request, such as `/developing-with-streamlit Build a dashboard of weekly revenue by region` in Claude Code. For details, see [Build with coding agents](/develop/concepts/ai-agents/coding-agents).

</Tip>

## Install Streamlit on your machine

### Option 1: I like the command line

Install Streamlit on your own machine using tools like `venv` and `pip`.

<IconLink
    href="/get-started/installation/command-line"
    icon="arrow_forward"
    label="Instructions for the command line"
    cssModuleClassName="Orange"
    cssModuleIconClassName="IconRight"
/>

### Option 2: I prefer a graphical interface

Install Streamlit using the Anaconda Distribution graphical user interface. This is also the best
approach if you're on Windows or don't have Python set up.

<IconLink
    href="/get-started/installation/anaconda-distribution"
    icon="arrow_forward"
    label="Instructions for Anaconda Distribution"
    cssModuleClassName="Orange"
    cssModuleIconClassName="IconRight"
/>

## Create an app in the cloud

### Option 1: I want a free cloud environment

Use Streamlit Community Cloud with GitHub Codespaces so you don't have to go through the trouble
of installing Python and setting up an environment.

<IconLink
    href="/get-started/installation/community-cloud"
    icon="arrow_forward"
    label="Instructions for GitHub Codespaces"
    cssModuleClassName="Orange"
    cssModuleIconClassName="IconRight"
/>

### Option 2: I need something secure, controlled, and in the cloud

Use [Streamlit in Snowflake](https://www.snowflake.com/en/product/features/streamlit-in-snowflake/) to code your apps in the cloud, right alongside your
data with role-based access controls.

<IconLink
    href="/get-started/installation/streamlit-in-snowflake"
    icon="arrow_forward"
    label="Instructions for Snowflake"
    cssModuleClassName="Orange"
    cssModuleIconClassName="IconRight"
/>
