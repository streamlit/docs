---
title: st.pyplot
slug: /develop/api-reference/charts/st.pyplot
description: st.pyplot displays a matplotlib.pyplot figure.
---

<Autofunction function="streamlit.pyplot" />

<Warning>
    Matplotlib [doesn't work well with threads](https://matplotlib.org/3.3.2/faq/howto_faq.html#working-with-threads). So if you're using Matplotlib you should wrap your code with locks as shown in the snippet below. This Matplotlib bug is more prominent when you deploy and share your app apps since you're more likely to get concurrent users then.

    ```python
    from matplotlib.backends.backend_agg import RendererAgg
    _lock = RendererAgg.lock

    with _lock:
        fig.title('This is a figure)')
        fig.plot([1,20,3,40])
        st.pyplot(fig)
    ```

</Warning>
