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
        bold="Let me try it out as fast and easy as possible."
        href="/get-started/installation/streamlit-playground"
    >
      Try out Streamlit in your browser. Visit the Streamlit Playground and start playing with code in seconds.
    </InlineCallout>
    <InlineCallout
        color="indigo-70"
        icon="terminal"
        bold="I'm comfortable with the command line."
        href="/get-started/installation/command-line"
    >
        Install Streamlit on your own machine using tools like `venv` and `pip`.
    </InlineCallout>
    <InlineCallout
        color="indigo-70"
        icon="mouse"
        bold="I prefer a graphical interface."
        href="/get-started/installation/anaconda-distribution"
    >
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
        bold="I want a preconfigured, cloud-based Docker environment."
        href="/get-started/installation/community-cloud"
    >
        Use Streamlit Community Cloud with GitHub Codespaces so you don't have to go through the trouble of
        installing Python and setting up an environment.
    </InlineCallout>
    <InlineCallout
        color="lightBlue-70"
        icon="shield"
        bold="I need something secure, controlled, and in the cloud."
        href="/get-started/installation/streamlit-in-snowflake"
    >
        Use Streamlit in Snowflake to code your apps in the cloud, right alongside your data with role-based access controls.
    </InlineCallout>
</InlineCalloutContainer>
