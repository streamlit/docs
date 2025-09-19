---
title: st.pyplot
slug: /develop/api-reference/charts/st.pyplot
description: st.pyplot displays a matplotlib.pyplot figure.
keywords: pyplot, matplotlib, chart, visualization, data, plot, graph, figure, scientific, custom
---

<Autofunction function="streamlit.pyplot" />

<Warning>
    Matplotlib [doesn't work well with threads](https://matplotlib.org/3.3.2/faq/howto_faq.html#working-with-threads). So if you're using Matplotlib you should wrap your code with locks. This Matplotlib bug is more prominent when you deploy and share your apps because you're more likely to get concurrent users then. The following example uses [`Rlock`](https://docs.python.org/3/library/threading.html#rlock-objects) from the `threading` module.

    ```python
    import streamlit as st
    import matplotlib.pyplot as plt
    import numpy as np
    from threading import RLock

    _lock = RLock()

    x = np.random.normal(1, 1, 100)
    y = np.random.normal(1, 1, 100)

    with _lock:
        fig, ax = plt.subplots()
        ax.scatter(x, y)
        st.pyplot(fig)
    ```

</Warning>
