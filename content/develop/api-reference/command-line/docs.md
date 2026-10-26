---
title: streamlit docs
slug: /develop/api-reference/cli/docs
description: streamlit docs prints the signature and docstring of a Streamlit command in your terminal, or opens the Streamlit documentation in your default browser.
keywords: streamlit docs, cli, command line, documentation, open docs, browser, help, docstring, signature, look up command
---

## `$ streamlit docs`

Look up a Streamlit command in your terminal, or open the Streamlit docs in your default browser.

### Syntax

```
streamlit docs <command>
```

### Arguments

`<command>` (Optional): The name of a public Streamlit command, such as `st.number_input`. You can include or omit the `st.` (or `streamlit.`) prefix, and you can reference namespace members like `st.column_config.NumberColumn`.

- **If not provided**: Streamlit opens the docs in your default browser.
- **If provided**: Streamlit prints the signature and docstring of the command in your terminal.

### Examples

- Open the Streamlit docs in your default browser:

  ```bash
  streamlit docs
  ```

- Print the signature and docstring of `st.number_input`:

  ```bash
  streamlit docs st.number_input
  ```
