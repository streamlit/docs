---
title: Advanced features
slug: /library/advanced-features
---

## Advanced features

This section gives you background on how different parts of Streamlit work.

<TileContainer>

<RefCard href="/library/advanced-features/cli" size="half">

##### Command-line options

When you install Streamlit, a command-line (CLI) tool gets installed as well. The purpose of this tool is to run Streamlit apps, change Streamlit configuration options, and help you diagnose and fix issues.

- [What is the command-line interface (CLI)?](/library/advanced-features/cli#command-line-interface)
- [How to run Streamlit apps from the CLI?](/library/advanced-features/cli#run-streamlit-apps)
- [View Streamlit version from the CLI?](/library/advanced-features/cli#view-streamlit-version)
- [View documentation from the CLI](/library/advanced-features/cli#view-documentation)
- [Clear cache from the CLI](/library/advanced-features/cli#clear-cache)

</RefCard>

<RefCard href="/library/advanced-features/configuration" size="half">

##### Streamlit configuration

Streamlit provides four different ways to set configuration options. Learn how to use each of them to change the behavior of Streamlit.

- [How to set configuration options?](/library/advanced-features/configuration)
- [Opt out of telemetry collection](/library/advanced-features/configuration#telemetry)
- [View all configuration options](/library/advanced-features/configuration#view-all-configuration-options)

</RefCard>

<RefCard href="/library/advanced-features/theming" size="half">

##### Theming

This section provides examples of how Streamlit page elements are affected by the various theme config options.

- [primaryColor](/library/advanced-features/theming#primarycolor)
- [backgroundcolor](/library/advanced-features/theming#backgroundcolor)
- [secondarybackgroundcolor](/library/advanced-features/theming#secondarybackgroundcolor)
- [textcolor](/library/advanced-features/theming#textcolor)
- [font](/library/advanced-features/theming#font)
- [base](/library/advanced-features/theming#base)

</RefCard>

<RefCard href="/library/advanced-features/caching" size="half">

##### Optimize performance with `st.cache`

Streamlit provides a caching mechanism that allows your app to stay performant even when loading data from the web, manipulating large datasets, or performing expensive computations. This is done with the [**`@st.cache`**](/library/api-reference/performance/st.cache) decorator.

- [What is `st.cache`?](/library/advanced-features/caching#optimize-performance-with-stcache)
- [Basic usage](/library/advanced-features/caching#example-1-basic-usage)
- [Caching when the function arguments change?](/library/advanced-features/caching#example-1-basic-usage)
- [Caching when the function body changes](/library/advanced-features/caching#example-3-when-the-function-body-changes)
- [Caching when an inner function changes](/library/advanced-features/caching#example-4-when-an-inner-function-changes)
- [Use caching to speed up your app across users](/library/advanced-features/caching#example-5-use-caching-to-speed-up-your-app-across-users)
- [How to mutate cached values?](/library/advanced-features/caching#example-6-mutating-cached-values)
- [Advanced caching](/library/advanced-features/caching#advanced-caching)

</RefCard>

<RefCard href="/library/advanced-features/experimental-cache-primitives" size="half">

##### Experimental cache primitives

Streamlit provides two experimental primitives to memoize function executions and store singleton objects.

[**`@st.experimental_memo`**](/library/api-reference/performance/st.experimental_memo) is used to store expensive computation which can be "cached" or "memoized" in the traditional sense.

[**`@st.experimental_singleton`**](/library/api-reference/performance/st.experimental_singleton) is a key-value store that's shared across all sessions of a Streamlit app. It's great for storing heavyweight singleton objects across sessions (like TensorFlow/Torch/Keras sessions and/or database connections).

- [Problems with `st.cache`](/library/advanced-features/experimental-cache-primitives#problem)
- [`@st.experimental_memo`](/library/advanced-features/experimental-cache-primitives#stexperimental_memo)
- [Properties of `@st.experimental_memo`](/library/advanced-features/experimental-cache-primitives#properties)
- [`@st.experimental_singleton`](/library/advanced-features/experimental-cache-primitives#stexperimental_singleton)
- [How `@st.experimental_singleton` compares to `@st.cache`](/library/advanced-features/experimental-cache-primitives#how-this-compares-to-stcache)
- [Which to use: memo or singleton?](/library/advanced-features/experimental-cache-primitives#which-to-use-memo-or-singleton)

</RefCard>

<RefCard href="/library/advanced-features/session-state" size="half">

##### Add statefulness to apps

Session State is a way to share variables between reruns, for each user session. In addition to the ability to store and persist state, Streamlit also exposes the ability to manipulate state using Callbacks.

- [What is Session State?](/library/advanced-features/session-state#what-is-state)
- [How to initialize Session State items?](/library/advanced-features/session-state#initialization)
- [How to read and update Session State items?](/library/advanced-features/session-state#reads-and-updates)
- [How to use callbacks in Session State?](/library/advanced-features/session-state#example-2-session-state-and-callbacks)
- [How to use `args` and `kwargs` in callbacks?](/library/advanced-features/session-state#example-3-use-args-and-kwargs-in-callbacks)
- [How to use callbacks in forms?](/library/advanced-features/session-state#example-4-forms-and-callbacks)
- [How is Session State related to Widget State?](/library/advanced-features/session-state#session-state-and-widget-state-association)
- [Caveats and limitations](/library/advanced-features/session-state#caveats-and-limitations)

</RefCard>

<RefCard href="/library/advanced-features/prerelease" size="half">

##### Pre-release features

At Streamlit, we like to move quick while keeping things stable. In our latest effort to move even faster without sacrificing stability, we're offering our bold and fearless users two ways to try out Streamlit's bleeding-edge features.

- [Experimental features](/library/advanced-features/prerelease#experimental-features)
- [Nightly releases](/library/advanced-features/prerelease#nightly-releases)

</RefCard>

<RefCard href="/library/advanced-features/widget-semantics" size="half">

##### Advanced notes on widget behavior

Widgets are magical and often work how you want. But they can have surprising behavior in some situations. This section provides is a high-level, abstract description of widget behavior, including some common edge-cases.

</RefCard>

<RefCard href="/library/advanced-features/timezone-handling" size="full">

##### Working with timezones

Working with timezones can be tricky. This section provides a high-level description of how to handle timezones in Streamlit to avoid unexpected behavior.

- [Overview](/library/advanced-features/timezone-handling#working-with-timezones)
- [How Streamlit handles timezones](/library/advanced-features/timezone-handling#how-streamlit-handles-timezones)
- [`datetime` instance without a timezone (naive)](/library/advanced-features/timezone-handling#datetime-instance-without-a-timezone-naive)
- [`datetime` instance with a timezone](/library/advanced-features/timezone-handling#datetime-instance-with-a-timezone)

</RefCard>
</TileContainer>
