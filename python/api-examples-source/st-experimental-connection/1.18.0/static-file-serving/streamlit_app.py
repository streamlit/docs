import numpy as np
import pandas as pd
import streamlit as st

st.write(
    f'<span style="font-size: 78px; line-height: 1">🐱</span>',
    unsafe_allow_html=True,
)

"""
# Static file serving
"""

st.caption("[Code for this demo]()")

"""
Streamlit 1.18 allows you to serve small, static media files via URL. 

## Instructions

- Create a folder `static` in your app's root directory.
- Place your files in the `static` folder.
- Add the following to your `config.toml` file:

```toml
[server]
enableStaticServing = true
```

You can then access the files on `<your-app-url>/app/static/<filename>`. Read more in our 
[docs]().

## Examples

You can use this feature with `st.markdown` to put a link on an image:
"""

with st.echo():
    st.markdown("[![Click me](app/static/cat.jpg)](https://streamlit.io)")

"""
Or you can use images in HTML or SVG:
"""

with st.echo():
    st.markdown(
        '<img src="./app/static/dog.jpg" height="333" style="border: 5px solid orange">',
        unsafe_allow_html=True,
    )
