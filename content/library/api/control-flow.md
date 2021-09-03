---
title: Control flow
slug: /library/api-reference/control-flow
---

# Control flow

## Stop execution

By default, Streamlit apps execute the script entirely, but we allow some functionality to handle control flow in your applications.

<Autofunction function="streamlit.stop" />


## Group multiple widgets

By default, Streamlit reruns your script everytime a user interacts with your app.
However, sometimes it's a better user experience to wait until a group of related
widgets is filled before actually rerunning the script. That's what `st.form` is for!

<Autofunction function="streamlit.form" />
<Autofunction function="streamlit.form_submit_button" />
