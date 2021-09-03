---
title: st.write and magic commands
slug: /library/api-reference/write-magic
---

# st.write and magic commands

Streamlit has two easy ways to display information into your app, which should typically be the
first thing you try: `st.write` and magic.

<Autofunction function="streamlit.write" />

## Magic

Magic commands are a feature in Streamlit that allows you to write almost anything (markdown, data,
charts) without having to type an explicit command at all. Just put the thing you want to show on
its own line of code, and it will appear in your app. Here's an example:

```python
# Draw a title and some text to the app:
'''
# This is the document title

This is some _markdown_.
'''

import pandas as pd
df = pd.DataFrame({'col1': [1,2,3]})
df  # 👈 Draw the dataframe

x = 10
'x', x  # 👈 Draw the string 'x' and then the value of x

# Also works with most supported chart types
import matplotlib.pyplot as plt
import numpy as np

arr = np.random.normal(1, 1, size=100)
fig, ax = plt.subplots()
ax.hist(arr, bins=20)

fig  # 👈 Draw a Matplotlib chart
```

### How Magic works

Any time Streamlit sees either a variable or literal
value on its own line, it automatically writes that to your app using
[`st.write`](api.html#streamlit.write) (which you'll learn about later).

Also, magic is smart enough to ignore docstrings. That is, it ignores the
strings at the top of files and functions.

If you prefer to call Streamlit commands more explicitly, you can always turn
magic off in your `~/.streamlit/config.toml` with the following setting:

```toml
[runner]
magicEnabled = false
```

<Important>
    <p>Right now, Magic only works in the main Python app file, not in imported files. See GitHub issue #288 for a discussion of the issues.</p>
</Important>
