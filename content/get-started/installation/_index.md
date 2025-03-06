---
title: Set up your Streamlit development environment
slug: /get-started/installation
---

# Set up your Streamlit development environment

There are multiple ways to set up your development environment and install Streamlit. Read below to
understand these options. Developing locally with Python installed on your own computer is the most
common scenario.

## Quick setup for experienced Python developers

1. Set up your Python development environment.
2. Run:
   ```bash
   pip install streamlit
   ```
3. Validate the installation by running our Hello app:
   ```bash
   streamlit hello
   ```
4. Jump to our [Basic concepts](/get-started/fundamentals/main-concepts).

## Setup options for everyone else

There are many ways to get started coding with Streamlit. If you're brand new to Streamlit or just passing through on a random internet walk, we recommend using the Streamlit Playground for your first hands-on experience. It's quick and ready to go in your browser. After you experience the awesomeness of Streamlit, we're confident you'll want to come back and set up a full development environment, which you can do locally or in the cloud, as described in the options below.

<InlineCalloutContainer>
    <InlineCallout
        color="orange-70"
        icon="bolt"
        bold="Streamlit Playground"
        href="/get-started/installation/streamlit-playground"
    ><em><strong>"Let me try it out as fast and easy as possible."</strong></em><br />
      Try out Streamlit in your browser. Visit the Streamlit Playground and start playing with code in seconds.</InlineCallout>
</InlineCalloutContainer>

### Local development options

<p></p>

<InlineCalloutContainer>
    <InlineCallout
        color="indigo-70"
        icon="terminal"
        bold="Command line"
        href="/get-started/installation/command-line"
    ><em><strong>"I'm comfortable with the command line."</strong></em><br />
        Install Streamlit on your own machine using tools like `venv` and `pip`.</InlineCallout>
    <InlineCallout
        color="indigo-70"
        icon="mouse"
        bold="Anaconda Distribution"
        href="/get-started/installation/anaconda-distribution"
    ><em><strong>"I prefer a graphical interface."</strong></em><br />
        Install Streamlit using the Anaconda Distribution graphical user interface. This is also the best approach if you're on Windows or
        don't have Python set up yet.</InlineCallout>
</InlineCalloutContainer>

### Cloud development options

<p></p>

<InlineCalloutContainer>
    <InlineCallout
        color="lightBlue-70"
        icon="cloud"
        bold="GitHub Codespaces"
        href="/get-started/installation/community-cloud"
    ><em><strong>"I want a preconfigured, cloud-based Docker environment."</strong></em><br />
        Use Streamlit Community Cloud with GitHub Codespaces so you don't have to go through the trouble of
        installing Python and setting up an environment.</InlineCallout>
    <InlineCallout
        color="lightBlue-70"
        icon="shield"
        bold="Streamlit in Snowflake"
        href="/get-started/installation/streamlit-in-snowflake"
    ><em><strong>"I need something secure, controlled, and in the cloud."</strong></em><br />
        Use Streamlit in Snowflake to code your apps in the cloud, right alongside your data with role-based access controls.</InlineCallout>
</InlineCalloutContainer>
