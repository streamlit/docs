---
title: Does Streamlit support the WSGI Protocol? (aka Can I deploy Streamlit with gunicorn?)
slug: /knowledge-base/deploy/does-streamlit-support-wsgi-protocol
---

# Does Streamlit support the WSGI Protocol? (aka Can I deploy Streamlit with gunicorn?)

## Problem

You're not sure whether your Streamlit app can be deployed with gunicorn.

## Solution

Streamlit doesn't support the WSGI protocol, so you can't serve a Streamlit app with a WSGI server like gunicorn's default sync workers. Instead, Streamlit's server is an ASGI application built on Starlette. To serve your app with an ASGI server like Uvicorn, use [`st.App`](/develop/api-reference/server/st.app) to create an ASGI app from your entrypoint file:

```python
# app.py
import streamlit as st

app = st.App("streamlit_app.py")
```

Run Uvicorn from your app's directory. When you start your app with Uvicorn, Streamlit resolves a relative path passed to `st.App` against the current working directory. By default, Uvicorn only listens on `127.0.0.1:8000`, so set the host and port explicitly:

```bash
uvicorn app:app --host 0.0.0.0 --port 8501
```

For more information, see [App server](/develop/api-reference/server).

Streamlit keeps each user's session, uploaded files, and media files in the memory of the server process that handles the session. If you run multiple worker processes that share a port (for example, gunicorn with several Uvicorn workers), requests from one session can reach a different process, which breaks file uploads, media, and reconnections. To scale your app, run separate replicas behind a proxy with session affinity. For more information, see [Session affinity or stickiness](/develop/concepts/architecture/architecture#session-affinity-or-stickiness).
