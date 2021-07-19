---
title: Display text
category: Reference Guides / API Reference
---

# Display text

Streamlit apps usually start with a call to `st.title` to set the
app's title. After that, there are 2 heading levels you can use:
`st.header` and `st.subheader`.

Pure text is entered with `st.text`, and Markdown with
`st.markdown`.

We also offer a "swiss-army knife" command called `st.write`, which accepts
multiple arguments, and multiple data types. And as described above, you can
also use [magic commands](api.html#magic-commands) in place of `st.write`.

<Autofunction function="streamlit.markdown" />
<Autofunction function="streamlit.title" />
<Autofunction function="streamlit.header" />
<Autofunction function="streamlit.subheader" />
<Autofunction function="streamlit.code" />
<Autofunction function="streamlit.text" />
<Autofunction function="streamlit.latex" />
