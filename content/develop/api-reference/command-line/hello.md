---
title: streamlit hello
slug: /develop/api-reference/cli/hello
description: streamlit hello runs an example Streamlit app to verify installation and demonstrate features.
keywords: streamlit hello, cli, command line, example app, demo, verify installation, hello app
---

## `$ streamlit hello`

Run the Hello app, an example Streamlit app included with the Streamlit library.

### Syntax

```
streamlit hello
```

### Options

The `hello` command accepts configuration options (just like the `run` command does). Configuration options are passed in the form of `--<section>.<option>=<value>`. For example, if you want to set the primary color of your app to blue, you could use one of the three equivalent options:

- `--theme.primaryColor=blue`
- `--theme.primaryColor="blue"`
- `--theme.primaryColor=#0000FF`

For a complete list of configuration options, see [`config.toml`](/develop/api-reference/configuration/config.toml) in the API reference. For examples, see below.

### Example

#### Example 1: Run the Hello app with default settings

To verify that Streamlit is installed correctly, this command runs an example app included in the Streamlit library. From any directory, execute the following:

```
streamlit hello
```

Streamlit will start the Hello app and open it in your default browser. The source for the Hello app can be [viewed in GitHub](https://github.com/streamlit/streamlit/tree/develop/lib/streamlit/hello).

#### Example 2: Run the Hello app with a custom config option value

To run the Hello app with a blue accent color, from any directory, execute the following:

```
streamlit hello --theme.primaryColor=blue
```
