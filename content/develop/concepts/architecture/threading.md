---
title: Threading in Streamlit
slug: /develop/concepts/architecture/threading
---

# Threading in Streamlit

While building with Streamlit may feel like magic, the things beneath are still plain Python objects. This means the use of threads to improve performance and responsiveness still applies to Streamlit. However it can be tricky to start more threads from your code. This guide is meant to help do threading right in Streamlit.

Before reading on, you are advised to check [architecture](/develop/concepts/architecture/architecture) and [session-state](/develop/concepts/architecture/session-state) first.

## Threads created by Streamlit

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
        setattr(script_thread, "secret_runner_context_attribute", ScriptRunContext(session))
        script_thread.start()


# created for each page run
class ScriptThread(Thread):
    def __init__(self, conn, page_file, session):
        self.conn = conn
        self.page_file = page_file

    def run(self):
        with open(self.page_file) as f:
            page_code = f.read()
        ui_state = eval(page_code)
        self.conn.send_ui_state(ui_state)
        # on the other end of WebSocket connection, frontend receives the state and updates UI


StreamlitServer().listen()
```

## `missing ScriptRunContext!` warning or `streamlit.errors.NoSessionContext` error

Since you are reading this page, chances are that you have already noticed such messages.

Many Streamlit APIs, including `st.session_state` and multiple builtin widgets, expect themselves to run on a ScriptThread. Such APIs are typically related to per-session or per-page-run internal states.

In a happy scenario, such code finds the `ScriptRunContext` object attached to the current thread (like in the illustriial code above). But when such Streamlit APIs find no `ScriptRunContext` in the current thread, they have to issue such warnings or errors.

## Custom threads

An effective mitigation to delay, is to create threads and let them do things concurrently. This works especially well with IO-heavy operations like remote query or data load.

But due to the reasons you read by far, interacting with Streamlit code from your thread can be quirky. In this sectionn we introduce 2 patterns to

Note: they are only patterns rather than complete solutions. You are advised to think them as an idea to start with. For example, one could extend pattern 1 into using a `concurrent.futures.ThreadPoolExecutor` thread pool.

### 1. Only call Stramlit code from script thread

Python threading provides ways to start a thread, wait for its execution, and collect its result. If we isolate custom thread from Streamlit APIs, everything should just work in order.

In the following example page, `main` runs on the script thread and creates 2 custom `WorkerThread`. After WorkerThread-s run concurrently, `main` collects their results and updates UI.

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
        start_time = time.time()
        time.sleep(self.delay)
        end_time = time.time()
        self.return_value = f"start: {start_time}, end: {end_time}"

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
    result_1.markdown(f"### t1\n{t1.return_value}")
    result_2.markdown(f"### t2\n{t2.return_value}")

main()
```

### 2. Expose context object to custom thread

Alternatively, one can let a custom thread have access to the `ScriptRunContext` attached to ScriptThread. This pattern is also used by Streamlit standard widgets like [st.spinner](https://github.com/streamlit/streamlit/blob/develop/lib/streamlit/elements/spinner.py).

**Caution** when using this pattern, please ensure a custom thread that uses `ScriptRunContext` does not outlive the Script Thread. Leak of `ScriptRunContext` may cause subtle bugs.

```py
import streamlit as st
from streamlit.runtime.scriptrunner import add_script_run_ctx, get_script_run_ctx
import time
from threading import Thread

class WorkerThread(Thread):
    def __init__(self, delay, target):
        super().__init__()
        self.delay = delay
        self.target = target
    def run(self):
        # runs in custom thread, but can call Streamlit APIs
        start_time = time.time()
        time.sleep(self.delay)
        end_time = time.time()
        self.target.write(f"start: {start_time}, end: {end_time}")

st.header("t1")
result_1 = st.empty()
st.header("t2")
result_2 = st.empty()

def main():
    t1 = WorkerThread(5, result_1)
    t2 = WorkerThread(5, result_2)
    # obtain the ScriptRunContext of the current Script Thread, and assign to worker threads
    add_script_run_ctx(t1, get_script_run_ctx())
    add_script_run_ctx(t2, get_script_run_ctx())
    t1.start()
    t2.start()
    t1.join()
    t2.join()

main()
```
