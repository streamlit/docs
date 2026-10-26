---
title: Static file serving
slug: /develop/concepts/configuration/serving-static-files
description: Learn about static file serving in Streamlit to host and serve media files, assets, and resources that support media embedding and custom content.
keywords: static files, file serving, media hosting, asset serving, static assets, file hosting, media files, resource serving, static content
---

# Static file serving

Streamlit apps can host and serve small, static media files to support media embedding use cases that
won't work with the normal [media elements](/develop/api-reference/media).

To enable this feature, set `enableStaticServing = true` under `[server]` in your config file,
or environment variable `STREAMLIT_SERVER_ENABLE_STATIC_SERVING=true`.

Media stored in the folder `./static/` relative to the running app file is served at path
`app/static/[filename]`, such as `http://localhost:8501/app/static/cat.png`.

## Details on usage

- Streamlit sets the `Content-Type` header of each file based on its file extension using Python's `mimetypes` module, such as `image/png` for `.png` files.
  Which extensions are recognized can depend on your Python version and operating system. Files with an unrecognized extension are sent with header `Content-Type:application/octet-stream`, which causes browsers to download them instead of rendering them.
  Because files like HTML, JavaScript, and SVG are served with their real content types, browsers can render or execute them. Only put files you trust in the static directory.
- Streamlit also sets `X-Content-Type-Options:nosniff` for all files rendered from the static directory.
- For apps running on Streamlit Community Cloud:
  - Files available in the Github repo will always be served. Any files generated while the app is running,
    such as based on user interaction (file upload, etc), are not guaranteed to persist across user sessions.
  - Apps which store and serve many files, or large files, may run into resource limits and be shut down.

## Example usage

- Put an image `cat.png` in the folder `./static/`
- Add `enableStaticServing = true` under `[server]` in your `.streamlit/config.toml`
- Any media in the `./static/` folder is served at the relative URL like `app/static/cat.png`

```toml
# .streamlit/config.toml

[server]
enableStaticServing = true
```

```python
# app.py
import streamlit as st

with st.echo():
    st.title("CAT")

    st.markdown("[![Click me](app/static/cat.png)](https://streamlit.io)")

```

Additional resources:

- [https://docs.streamlit.io/develop/concepts/configuration](https://docs.streamlit.io/develop/concepts/configuration)
- [https://static-file-serving.streamlit.app/](https://static-file-serving.streamlit.app/)

<Cloud name="static-file-serving" height="1000px" />
