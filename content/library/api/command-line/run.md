---
title: streamlit run
slug: /develop/api-reference/cli/run
---

## `$ streamlit run`

### Syntax

```
streamlit run <file or path> [-- config options] [-- script args]
```

### Arguments

`<file or path>`: The path to your main, entrypoint file for your Streamlit app.

### Options

For a complete list of configuration options, see [`config.toml`](/develop/api-reference/configuration/config.toml) in the API reference. For examples, see below.

### Script arguments

### Examples

- Run an app in your working directory as follows:

  ```
  streamlit run your_app.py
  ```

- Run an app in a child directory as follows:

  ```
  streamlit run your_project/your_app.py
  ```

- Run an app from a GitHub gist as follows:

  ```
  streamlit run https://raw.githubusercontent.com/streamlit/demo-uber-nyc-pickups/master/streamlit_app.py
  ```
