---
title: Command-line options
slug: /develop/api-reference/cli
description: Run Streamlit apps and manage configuration using the command-line interface for app execution, cache management, and system diagnostics.
keywords: cli, command line, streamlit run, cache, config, docs, hello, help, init, version, terminal, command
---

# Command-line interface

When you install Streamlit, a command-line (CLI) tool gets installed
as well. The purpose of this tool is to run Streamlit apps, change Streamlit configuration options,
and help you diagnose and fix issues.

## Available commands

- [`streamlit cache clear`](/develop/api-reference/cli/cache): Clear the on-disk cache.
- [`streamlit config show`](/develop/api-reference/cli/config): Show all configuration options.
- [`streamlit docs`](/develop/api-reference/cli/docs): Open the Streamlit docs.
- [`streamlit hello`](/develop/api-reference/cli/hello): Run an example Streamlit app.
- [`streamlit help`](/develop/api-reference/cli/help): Show the available CLI commands.
- [`streamlit init`](/develop/api-reference/cli/init): Create the files for a new Streamlit app.
- [`streamlit run`](/develop/api-reference/cli/run): Run your Streamlit app.
- [`streamlit version`](/develop/api-reference/cli/version): Show the version of Streamlit.

### Run your app

The most important command is `streamlit run`, which is summarized for convenience here:

```bash
streamlit run your_script.py
```

At any time, in your terminal, you can stop the server with **Ctrl+C**.
