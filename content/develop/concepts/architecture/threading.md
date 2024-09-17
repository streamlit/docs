---
title: Threading in Streamlit
slug: /develop/concepts/architecture/threading
---

# Threading in Streamlit

While Streamlit makes code work like magic, the things beneath are still plain Python objects. This means the use of threads to improve performance and responsiveness also applies to Streamlit. However it can be tricky to use threads correctly from your code. This guide is meant to help do threading right in Streamlit.

Before reading on, you are advised to check [architecture](/develop/concepts/architecture/architecture) and [session-state](/develop/concepts/architecture/session-state) first.

## Streamlit threads

A `streamlit run` process uses 2 types of threads:

- Main thread: runs the web (HTTP + WebSocket) server
- Script thread: runs page code when triggered (by page view or UI interactivity)

This is an oversimplifed and inaccurate illustration to show the creation of Streamlit threads:

```py
from threading import Thread
from streamlit.somewhere import WebSocketServer, ScriptRunContext

# created once per process, runs on main thread
class StreamlitServer(WebSocketServer):
    def on_websocket_connection(self, conn):
        # assuming 1 connection bounds to exactly 1 session
        session = Session()
        conn.on_page_run_message(lambda message: session.on_page_run_message(conn, message))


# created for each session
class Session()
    def on_page_run_message(self, conn, message):
        script_thread = ScriptThread(conn=conn, page_file=message.page_to_run, session=self)
        script_thread.start()


# created for each page run
class ScriptThread(Thread):
    def __init__(self, conn, page_file, session):
        self.conn = conn
        self.page_file = page_file
        self.script_context = ScriptRunContext(session)

    def run(self):
        with open(self.page_file) as f:
            page_code = f.read()
        ui_state = eval(page_code)
        self.conn.send_ui_state(ui_state)
        # on the other end of WebSocket connection, frontend receives the state and updates UI


StreamlitServer().listen()
```

## `missing ScriptRunContext`

Since you are reading this page, chances are that you have saw this warning message.

Many Streamlit APIs, including `st.cache_data()` / `st.widget_method()`, expect to be executed on a ScriptThread. Such APIs are often related to per-session or per-page-run internal states. For example, `st.cache_data()` needs access to a per-session cache storage.

Normally the access to internal states are provided via a `ScriptRunContext`. A `Sc. Such objects are kept with a `WeakMap[Thread, ScriptRunContext]`.

<!-->
But when such Streamlit APIs find them to be running on a thread without `Script  created by user's code ("custom thread")  the expectation is not met, and it often results in mysterous warning message like `missing ScriptRunContext`. Please read on to find out the workarounds.

-->

## Custom threads done right

To avoid the quirks with custom threads, we introduce 2 patterns:

### 1. Ensure Stramlit code is called from script thread

Python threading provides ways to start a thread, wait for its execution, and collect its result. If we isolate custom thread from Streamlit APIs, everything should just work in order.

In the following example, the script thread starts 2 custom `WorkerThread`, waits them to run concurrently, and update UI with their results.

```py
import streamlit as st
import time
from threading import Thread

class WorkerThread(Thread):
    def __init__(self, delay):
        super().__init__()
        self.delay = delay
        self.return_value = None
    def run(self):
        # runs in custom thread, touches no Streamlit APIs
        time.sleep(self.delay)
        self.return_value = self.delay

result_1 = st.empty()
result_2 = st.empty()

def main():
    # runs in script thread, calls Streamlit APIs with no problem
    t1 = WorkerThread(5)
    t2 = WorkerThread(5)
    t1.start()
    t2.start()
    t1.join()
    t2.join()
    result_1.write(f"t1: slept {t1.return_value}s")
    result_2.write(f"t2: slept {t1.return_value}s")

main()
```

### 2. Reuse current Streamlit Session from custom thread

Alternatively , one can let a custom thread have access to , as a script thread does. This pattern is also used by Streamlit standard widgets like [st.spanner](#).



**Caution** when using this pattern, please ensure . Otherwise 

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