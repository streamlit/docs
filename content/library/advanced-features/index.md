---
title: Advanced features
slug: /library/advanced-features
---

## Advanced features

This section gives you background on how different parts of Streamlit work.

<TileContainer>

<RefCard href="/library/advanced-features/caching" size="half">

##### Caching

The Streamlit cache allows your app to stay performant even when loading data from the web, manipulating large datasets, or performing expensive computations. To cache a function in Streamlit, you need to decorate it with one of two decorators: `st.cache_data` and `st.cache_resource`.

- [Minimal example](/library/advanced-features/caching#minimal-example)
- [Basic usage](/library/advanced-features/caching#basic-usage)
  - [st.cache_data](/library/advanced-features/caching#stcache_data)
  - [st.cache_resource](/library/advanced-features/caching#stcache_resource)
  - [Deciding which caching decorator to use](/library/advanced-features/caching#deciding-which-caching-decorator-to-use)
- [Advanced usage](/library/advanced-features/caching#advanced-usage)
  - [Excluding input parameters](/library/advanced-features/caching#excluding-input-parameters)
  - [Controlling cache size and duration](/library/advanced-features/caching#controlling-cache-size-and-duration)
  - [Customizing the spinner](/library/advanced-features/caching#customizing-the-spinner)
  - [Using Streamlit commands in cached functions](/library/advanced-features/caching#using-streamlit-commands-in-cached-functions)
  - [Mutation and concurrency issues](/library/advanced-features/caching#mutation-and-concurrency-issues)
- [Migrating from st.cache](/library/advanced-features/caching#migrating-from-stcache)

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

<RefCard href="/library/advanced-features/timezone-handling" size="half">

##### Working with timezones

Working with timezones can be tricky. This section provides a high-level description of how to handle timezones in Streamlit to avoid unexpected behavior.

- [Overview](/library/advanced-features/timezone-handling#working-with-timezones)
- [How Streamlit handles timezones](/library/advanced-features/timezone-handling#how-streamlit-handles-timezones)
- [`datetime` instance without a timezone (naive)](/library/advanced-features/timezone-handling#datetime-instance-without-a-timezone-naive)
- [`datetime` instance with a timezone](/library/advanced-features/timezone-handling#datetime-instance-with-a-timezone)

</RefCard>

<RefCard href="/library/advanced-features/widget-semantics" size="full">

##### Advanced notes on widget behavior

Widgets are magical and often work how you want. But they can have surprising behavior in some situations. This section provides is a high-level, abstract description of widget behavior, including some common edge-cases.

</RefCard>
</TileContainer>
