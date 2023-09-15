---
title: st.rerun
slug: /library/api-reference/control-flow/st.rerun
description: st.rerun will rerun the script immediately.
---

<Autofunction function="streamlit.rerun" />

### Three main concepts of logical flow

- `st.rerun`
- [Callbacks](/library/api-reference/session-state#use-callbacks-to-update-session-state)
- [Containers](/library/api-reference/layout)

`st.rerun` is one of three primary tools to control the logic of your app. The other primary tools are callbacks and containers. Each method has pros and cons depending on the situation. `st.rerun` can be great for prototyping, but carries the risk of infinite loops, increased runtime, and tangled logic. When using `st.rerun` to force an update of some widget or elements, a callback may be cleaner.

Use of `st.rerun`, callbacks, and containers are explained with examples in [Button behavior and examples](/library/advanced-features/button-behavior-and-examples). The use of callbacks vs. `st.rerun` is highlighted where explaining how to use [Buttons to modify `st.session_state`] (/library/advanced-features/button-behavior-and-examples#buttons-to-modify-stsession_state).
