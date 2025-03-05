---
title: Set up your Streamlit development environment
slug: /get-started/installation
---

# Set up your Streamlit development environment

There are multiple ways to set up your development environment and install Streamlit. Read below to
understand these options. Developing locally with Python installed on your own computer is the most
common scenario.

## Summary for experienced developers

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

## General setup and installation

### Local development options

<p></p>

<InlineCalloutContainer>
    <InlineCallout
        color="orange-70"
        icon="bolt"
        bold="Streamlit Playground"
        href="/get-started/installation/streamlit-playground"
    >
      <em>"Let me try it out as fast and easy as possible."</em><br />
      Try out Streamlit in your browser. Visit the Streamlit Playground and start playing with code in seconds.
    </InlineCallout>
    <InlineCallout
        color="indigo-70"
        icon="terminal"
        bold="Command line"
        href="/get-started/installation/command-line"
    >
        <em>"I'm comfortable with the command line."</em><br />
        Install Streamlit on your own machine using tools like `venv` and `pip`.
    </InlineCallout>
    <InlineCallout
        color="indigo-70"
        icon="mouse"
        bold="Anaconda Distribution"
        href="/get-started/installation/anaconda-distribution"
    >
        <em>"I prefer a graphical interface."</em><br />
        Install Streamlit using the Anaconda Distribution graphical user interface. This is also the best approach if you're on Windows or
        don't have Python set up yet.
    </InlineCallout>
</InlineCalloutContainer>

### Cloud development options

<p></p>

<InlineCalloutContainer>
    <InlineCallout
        color="lightBlue-70"
        icon="cloud"
        bold="GitHub Codespaces"
        href="/get-started/installation/community-cloud"
    >
        <em>"I want a preconfigured, cloud-based Docker environment."</em><br />
        Use Streamlit Community Cloud with GitHub Codespaces so you don't have to go through the trouble of
        installing Python and setting up an environment.
    </InlineCallout>
    <InlineCallout
        color="lightBlue-70"
        icon="shield"
        bold="Streamlit in Snowflake"
        href="/get-started/installation/streamlit-in-snowflake"
    >
        <em>"I need something secure, controlled, and in the cloud."</em><br />
        Use Streamlit in Snowflake to code your apps in the cloud, right alongside your data with role-based access controls.
    </InlineCallout>
</InlineCalloutContainer>
