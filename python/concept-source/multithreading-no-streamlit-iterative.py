import streamlit as st
import time
from threading import Thread


class WorkerThread(Thread):
    def __init__(self, delay):
        super().__init__()
        self.delay = delay
        self.return_value = None

    def run(self):
        start_time = time.time()
        time.sleep(self.delay)
        end_time = time.time()
        self.return_value = f"start: {start_time}, end: {end_time}"


delays = [5, 4, 3, 2, 1]
result_containers = []
for i, delay in enumerate(delays):
    st.header(f"Thread {i}")
    result_containers.append(st.container())

threads = [WorkerThread(delay) for delay in delays]
for thread in threads:
    thread.start()
thread_lives = [True] * len(threads)

while any(thread_lives):
    for i, thread in enumerate(threads):
        if thread_lives[i] and not thread.is_alive():
            result_containers[i].write(thread.return_value)
            thread_lives[i] = False
    time.sleep(0.5)

for thread in threads:
    thread.join()

st.button("Rerun")
