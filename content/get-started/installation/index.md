---
title: Installation
slug: /get-started/installation
---

# Installation

There are multiple ways to set up your development environment and install Streamlit. Read below to understand these options. Developing locally with Python installed on your own computer is the most common scenario.

<Div style={{padding: "0 20px 10px 30px", border: "1px solid gray", borderRadius: "20px"}}>

## Summary for local development

1. Set up your Python development environment. (See below for explanation.)
2. Run:
   ```bash
   pip install streamlit
   ```
3. Validate the installation by running our Hello app:
   ```bash
   streamlit hello
   ```
4. Jump to our [Main concepts](/get-started/fundamentals/main-concepts).

</Div>

## Python environments

As with any programming tool, in order to install Streamlit you first need to make sure your computer is properly set up. More specifically, you’ll need:

1. Python
2. A Python environment manager (recommended)
3. A Python package manager

Environment managers create virtual environments to isolate Python package installations between projects. Within an environment, a package manager handles installing each of your Python packages, including Streamlit. We recommend using virtual environments because installing or upgrading a Python package may cause unintentional effects on another package. For a detailed introduction to Python environments, check out [Python Virtual Environments: A Primer](https://realpython.com/python-virtual-environments-a-primer/).

### Option 1: I'm comfortable with the command line.

<InlineCalloutContainer spacing="singleton">
   <InlineCallout color="red-70" icon="terminal" bold="Install Streamlit using command line" href="/get-started/installation/command-line">
   </InlineCallout>
</InlineCalloutContainer>

### Option 2: I prefer a graphical interface.

<InlineCalloutContainer spacing="singleton">
   <InlineCallout color="red-70" icon="space_dashboard" bold="Install Streamlit using Anaconda Distribution" href="/get-started/installation/anaconda-distribution">
   </InlineCallout>
</InlineCalloutContainer>

### Option 3: I don't want to install anything on my computer.

<InlineCalloutContainer spacing="singleton">
   <InlineCallout color="red-70" icon="developer_mode" bold="Use Community Cloud to develop with GitHub Codespaces" href="/get-started/installation/community-cloud">
   </InlineCallout>
</InlineCalloutContainer>
