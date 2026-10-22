---
title: How do I increase the upload limit of st.file_uploader on Streamlit Community Cloud?
slug: /knowledge-base/deploy/increase-file-uploader-limit-streamlit-cloud
---

# How do I increase the upload limit of st.file_uploader on Streamlit Community Cloud?

## Overview

By default, files uploaded using [`st.file_uploader()`](/develop/api-reference/widgets/st.file_uploader) are limited to 200MB. You can configure this using the `server.maxUploadSize` config option.

Streamlit provides [five different ways to set configuration options](/develop/concepts/configuration/options):

1. In a **global config file** at `~/.streamlit/config.toml` for macOS/Linux or `%userprofile%/.streamlit/config.toml` for Windows:
   ```toml
   [server]
   maxUploadSize = 200
   ```
2. In a **per-project config file** at `$CWD/.streamlit/config.toml`, where `$CWD` is the folder you're running Streamlit from.
3. In a **script-level config file** at `.streamlit/config.toml` in the folder that contains your entrypoint file. This is only different from the per-project config file when you run Streamlit from a different folder than your entrypoint file.
4. Through `STREAMLIT_*` **environment variables**, such as:
   ```bash
   export STREAMLIT_SERVER_MAX_UPLOAD_SIZE=200
   ```
5. As **flags on the command line** when running `streamlit run`:
   ```bash
   streamlit run your_script.py --server.maxUploadSize 200
   ```

Which of the five options should you choose for an app deployed to [Streamlit Community Cloud](/deploy/streamlit-community-cloud)? 🤔

## Solution

When deploying your app to Streamlit Community Cloud, you should **use option 2**. Namely, set the `maxUploadSize` config option in a per-project config file (`.streamlit/config.toml`) at the root of your app's GitHub repo. If your entrypoint file is in a subdirectory, you can also use option 3 and put the config file in that subdirectory. 🎈

For example, to increase the upload limit to 400MB, upload a `.streamlit/config.toml` file containing the following lines to your app's GitHub repo:

```toml
[server]
maxUploadSize = 400
```

## Relevant resources

- [Streamlit drag and drop capping at 200MB, need workaround](https://discuss.streamlit.io/t/streamlit-drag-and-drop-capping-at-200mb-need-workaround/19803/2)
- [File uploader widget API](/develop/api-reference/widgets/st.file_uploader)
- [How to set Streamlit configuration options](/develop/concepts/configuration)
