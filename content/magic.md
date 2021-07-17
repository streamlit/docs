---
title: Magic commands
category: Reference Guides / API Reference
---

# Magic commands

Magic commands are a feature in Streamlit that allows you to write markdown and
data to your app with very few keypresses. Here's an example:

```python
# Draw a title and some text to the app:
'''
# This is the document title

This is some _markdown_.
'''

df = pd.DataFrame({'col1': [1,2,3]})
df  # <-- Draw the dataframe

x = 10
'x', x  # <-- Draw the string 'x' and then the value of x
```

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
