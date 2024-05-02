---
title: st.write_stream
slug: /develop/api-reference/write-magic/st.write_stream
description: st.write_stream writes arguments to the app using a typewriter effect.
---

<Autofunction function="streamlit.write_stream" />

<Tip>

If your stream object is not compatible with `st.write_stream`, define a wrapper around your stream object to create a compatible generator function. For example, Streamlit version 1.32.0 added support for stream objects with empty chunks. If you use `openai.AzureOpenAI` with Streamlit version 1.31.0, you'd need to define a wrapper to manually handle empty chunks to use `st.write_stream`.

</Tip>
