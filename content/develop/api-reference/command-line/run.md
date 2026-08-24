---
title: streamlit run
slug: /develop/api-reference/cli/run
description: streamlit run starts your Streamlit app with optional configuration and script arguments.
keywords: streamlit run, cli, command line, start app, run app, entrypoint, configuration, script arguments, multipage
---

## `$ streamlit run`

This command starts your Streamlit app.

### Syntax

```
streamlit run [<entrypoint file or directory>] [-- config options] [script args]
```

### Arguments

`<entrypoint file or directory>` (optional): The path to your entrypoint file or directory for your Streamlit app.

- **If not provided**: Streamlit will try to run `streamlit_app.py` from the current working directory.
- **If a directory path is provided**: Streamlit will try to run `streamlit_app.py` in the specified directory.
- **If a file path is provided**: Streamlit will run the specified file.

In a multipage app with `st.navigation`, your entrypoint file acts as a router between your pages. Otherwise, your entrypoint file is your app's homepage.

### Options

Configuration options are passed in the form of `--<section>.<option>=<value>`. For example, if you want to set the primary color of your app to blue, you could use one of the three equivalent options:

- `--theme.primaryColor=blue`
- `--theme.primaryColor="blue"`
- `--theme.primaryColor=#0000FF`

For a complete list of configuration options, see [`config.toml`](/develop/api-reference/configuration/config.toml) in the API reference. For examples, see below.

### Script arguments

If you need to pass arguments directly to your script, you can pass them as positional arguments. If you use `sys.argv` to read your arguments, `sys.argv` returns a list of all arguments and does _not_ include any configuration options. Python interprets all arguments as strings.

- `sys.argv[0]` returns the the path to your entrypoint file, even if you did not explicitly provide it.
- `sys.argv[1:]` returns a list of arguments in order and does not include any configuration options.

### Examples

- If your app is named `streamlit_app.py` in your working directory, you can run it with the following command:

  ```
  streamlit run
  ```

- If your app has a different name and is in your working directory, run it like the following command:

  ```
  streamlit run your_app.py
  ```

- If your app is named `streamlit_app.py` in a subdirectory, you can run it like the following command:

  ```
  streamlit run your_subdirectory
  ```

- If your app has a different name and is in a subdirectory, run it like the following command:

  ```
  streamlit run your_subdirectory/your_app.py
  ```

- If your app is saved in a public GitHub repo or gist, run it like the following command:

  ```
  streamlit run https://raw.githubusercontent.com/streamlit/demo-uber-nyc-pickups/master/streamlit_app.py
  ```

- If you need to set one or more configuration options, run it like the following command:

  ```
  streamlit run your_app.py --client.showErrorDetails=False --theme.primaryColor=blue
  ```

  Or if using the default `streamlit_app.py`:

  ```
  streamlit run --client.showErrorDetails=False --theme.primaryColor=blue
  ```

- If you need to pass an argument to your script, run it like the following command:

  ```
  streamlit run your_app.py "my list" of arguments
  ```

  Within your script, the following statements will be true:

  ```
  sys.argv[0] == "your_app.py"
  sys.argv[1] == "my list"
  sys.argv[2] == "of"
  sys.argv[3] == "arguments"
  ```
