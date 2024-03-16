---
title: Concepts
slug: /develop/concepts
---

## Concepts

This section gives you background on how different parts of Streamlit work.

<TileContainer>

<RefCard href="/develop/concepts/elements-and-ui/app-menu" size="half">

<h5>⋮ App menu</h5>

Streamlit provides a configurable menu within your app to access convenient tools for developers and viewers. These options can modify the appearance of your app while running.

- [Modify your app's theme while running](/develop/concepts/elements-and-ui/app-menu#settings)
- [Record a screencast of your app](/develop/concepts/elements-and-ui/app-menu#record-a-screencast)
- [Deploy a local app to Streamlit Community Cloud](/develop/concepts/elements-and-ui/app-menu#deploy-this-app)
- [Customize or hide the app menu](/develop/concepts/elements-and-ui/app-menu#customize-the-menu)

</RefCard>

<RefCard href="/develop/concepts/configuration/cli" size="half">

<h5>Command-line options</h5>

When you install Streamlit, a command-line (CLI) tool gets installed as well. The purpose of this tool is to run Streamlit apps, change Streamlit configuration options, and help you diagnose and fix issues.

- [What is the command-line interface (CLI)?](/develop/concepts/configuration/cli#command-line-interface)
- [How to run Streamlit apps from the CLI?](/develop/concepts/configuration/cli#run-streamlit-apps)
- [View Streamlit version from the CLI?](/develop/concepts/configuration/cli#view-streamlit-version)
- [View documentation from the CLI](/develop/concepts/configuration/cli#view-documentation)
- [Clear cache from the CLI](/develop/concepts/configuration/cli#clear-cache)

</RefCard>

<RefCard href="/develop/concepts/configuration" size="half">

<h5>Streamlit configuration</h5>

Streamlit provides four different ways to set configuration options. Learn how to use each of them to change the behavior of Streamlit.

- [How to set configuration options?](/develop/concepts/configuration)
- [Opt out of telemetry collection](/develop/concepts/configuration#telemetry)
- [View all configuration options](/develop/concepts/configuration#view-all-configuration-options)

</RefCard>

<RefCard href="/develop/concepts/configuration/theming" size="half">

<h5>Theming</h5>

This section provides examples of how Streamlit page elements are affected by the various theme config options.

- [primaryColor](/develop/concepts/configuration/theming#primarycolor)
- [backgroundcolor](/develop/concepts/configuration/theming#backgroundcolor)
- [secondarybackgroundcolor](/develop/concepts/configuration/theming#secondarybackgroundcolor)
- [textcolor](/develop/concepts/configuration/theming#textcolor)
- [font](/develop/concepts/configuration/theming#font)
- [base](/develop/concepts/configuration/theming#base)

</RefCard>

<RefCard href="/develop/concepts/caching" size="half">

<h5>Caching</h5>

The Streamlit cache allows your app to stay performant even when loading data from the web, manipulating large datasets, or performing expensive computations. To cache a function in Streamlit, you need to decorate it with one of two decorators: `st.cache_data` and `st.cache_resource`.

- [Minimal example](/develop/concepts/caching#minimal-example)
- [Basic usage](/develop/concepts/caching#basic-usage)
  - [st.cache_data](/develop/concepts/caching#stcache_data)
  - [st.cache_resource](/develop/concepts/caching#stcache_resource)
  - [Deciding which caching decorator to use](/develop/concepts/caching#deciding-which-caching-decorator-to-use)
- [Advanced usage](/develop/concepts/caching#advanced-usage)
  - [Excluding input parameters](/develop/concepts/caching#excluding-input-parameters)
  - [Controlling cache size and duration](/develop/concepts/caching#controlling-cache-size-and-duration)
  - [Customizing the spinner](/develop/concepts/caching#customizing-the-spinner)
  - [Using Streamlit commands in cached functions](/develop/concepts/caching#using-streamlit-commands-in-cached-functions)
  - [Mutation and concurrency issues](/develop/concepts/caching#mutation-and-concurrency-issues)
- [Migrating from st.cache](/develop/concepts/caching#migrating-from-stcache)

</RefCard>

<RefCard href="/develop/concepts/session-state" size="half">

<h5>Add statefulness to apps</h5>

Session State is a way to share variables between reruns, for each user session. In addition to the ability to store and persist state, Streamlit also exposes the ability to manipulate state using Callbacks.

- [What is Session State?](/develop/concepts/session-state#what-is-state)
- [How to initialize Session State items?](/develop/concepts/session-state#initialization)
- [How to read and update Session State items?](/develop/concepts/session-state#reads-and-updates)
- [How to use callbacks in Session State?](/develop/concepts/session-state#example-2-session-state-and-callbacks)
- [How to use `args` and `kwargs` in callbacks?](/develop/concepts/session-state#example-3-use-args-and-kwargs-in-callbacks)
- [How to use callbacks in forms?](/develop/concepts/session-state#example-4-forms-and-callbacks)
- [How is Session State related to Widget State?](/develop/concepts/session-state#session-state-and-widget-state-association)
- [Caveats and limitations](/develop/concepts/session-state#caveats-and-limitations)

</RefCard>

<RefCard href="/develop/quick-references/prerelease" size="half">

<h5>Pre-release features</h5>

At Streamlit, we like to move quick while keeping things stable. In our latest effort to move even faster without sacrificing stability, we're offering our bold and fearless users two ways to try out Streamlit's bleeding-edge features.

- [Experimental features](/develop/quick-references/prerelease#experimental-features)
- [Nightly releases](/develop/quick-references/prerelease#nightly-releases)

</RefCard>

<RefCard href="/develop/concepts/configuration/secrets-management" size="half">

<h5>Secrets management</h5>

This section provides examples of how to use secrets management to store and retrieve sensitive information in your Streamlit app.

- [Develop locally and set up secrets](/develop/concepts/configuration/secrets-management#develop-locally-and-set-up-secrets)
- [Use secrets in your app](/develop/concepts/configuration/secrets-management#use-secrets-in-your-app)
- [Error handling](/develop/concepts/configuration/secrets-management#error-handling)
- [Use secrets on Streamlit Community Cloud](/develop/concepts/configuration/secrets-management#use-secrets-on-streamlit-community-cloud)

</RefCard>

<RefCard href="/develop/concepts/timezone-handling" size="half">

<h5>Working with timezones</h5>

Working with timezones can be tricky. This section provides a high-level description of how to handle timezones in Streamlit to avoid unexpected behavior.

- [Overview](/develop/concepts/timezone-handling#working-with-timezones)
- [How Streamlit handles timezones](/develop/concepts/timezone-handling#how-streamlit-handles-timezones)
- [`datetime` instance without a timezone (naive)](/develop/concepts/timezone-handling#datetime-instance-without-a-timezone-naive)
- [`datetime` instance with a timezone](/develop/concepts/timezone-handling#datetime-instance-with-a-timezone)

</RefCard>

<RefCard href="/develop/concepts/widget-semantics" size="full">

<h5>Advanced notes on widget behavior</h5>

Widgets are magical and often work how you want. But they can have surprising behavior in some situations. This section provides is a high-level, abstract description of widget behavior, including some common edge-cases.

</RefCard>
</TileContainer>
