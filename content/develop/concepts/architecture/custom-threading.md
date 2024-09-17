---
title: Threads in Streamlit
slug: /develop/concepts/architecture/threads-in-streamlit
---

# Threads in Streamlit

Please read [session-state](#) and [architecture](#) first.

## How streamlit works

Main thread and Script Thread

Main thread runs the web (http + websocket) server. Script thread

This is an oversimplifed illustration of what `streamlit run` does.

```py
from threading import Thread
import importlib

def streamlit_run():
    # runs in main thread
    StreamlitServer().start_listen()

# singleton object 
class StreamlitServer():

    def on_request(self):
        new_session = StreamlitSession()
        new_session.start_


# created for each session
class StreamlitSession()
    def on_websocket_message(session, payload):
        session.cancel_other_threads()
        # starts 
        script_thread = ScriptThread(run_page_main)


# created for each page run (when UI is first displayed or clicked)
class ScriptThread(Thread):
    def __init__(self, page_file):
        pass

    def run(self):
        page_code = importlib.import(self.page_file)

        ui_state = eval(page_code, ui_event)

        if this_thread_not_cancelled():
            send_ui_state_to_frontend(ui_state)

```

## Custom threads

While Streamlit does many things beneath the water, the modules and the threads are still plain python objects. This means the use of threads to improve performance and responsiveness also applies to Streamlit.

However, things can become tricky when a non-Streamlit thread ("custom thread") interacts with Streamlit code. Because many Streamlit APIs, including `st.cache_data()` / `st.some_widget()`, expect a Script Thread. Such code are often related to per-session or per-page-run objects. For example, `st.cache_data()` needs access to a per-session cache storage.

To avoid the quirks with custom threads, we introduce 2 patterns:

### 1. Run no Stramlit code in custom threads

Python threading provides standard way to start a thread, wait for execution, and harvest its result with `thread.join()`. If a 

```py


```

### 2. Copy current Streamlit Session for custom thread



### "missing ReportContext" warning

This typically happens when some Streamlit code expects a ScriptThread (), but found it's not running in one.

### Reuse 

### Only call streamlit code from genuine Script Thread

### Example of threaded executor

```py
# src/thread_executor.py
import streamlit as st

@st.cache_resource()
def get_thread_executor():
    pass

```


```py
# pages/multithread_example.py

from src.thread_executor import 


def run_query(sql_query: str) -> pd.DataFrame
    pass

f

```

## Multi processing

## Async IO