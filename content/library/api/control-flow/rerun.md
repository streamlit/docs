---
title: st.rerun
slug: /library/api-reference/control-flow/st.rerun
description: st.rerun will rerun the script immediately.
---

<Autofunction function="streamlit.rerun" />

### Main concepts of logical flow

- Manual interruption: `st.rerun` and [`st.stop`](/library/api-reference/control-flow/st.stop)
- [Callbacks](/library/api-reference/session-state#use-callbacks-to-update-session-state)
- [Containers](/library/api-reference/layout)
- [Forms](/library/advanced-features/forms)

`st.rerun` is one of the primary tools to control the logic of your app. Like `st.stop` it manually interrupts your script when called. Callbacks allow you to prefix a script rerun with additional logic. Containers allow you manipulate the order in which elements are logically executed independently from the order they appear in the fully rendered app. Forms allow you to exempt widgets from updating immediately within the Python code.

For cases where `st.rerun` is used, callbacks and containers may be direct substitues. Each method has pros and cons depending on the situation. `st.rerun` can be great for prototyping, but carries the risk of infinite loops, increased runtime, and tangled logic. When using `st.rerun` to force an update of some widget or elements, a callback may be cleaner.

Use of `st.rerun`, callbacks, and containers are explained with examples in [Button behavior and examples](/library/advanced-features/button-behavior-and-examples). The use of callbacks vs. `st.rerun` is highlighted in [Buttons to modify `st.session_state`](/library/advanced-features/button-behavior-and-examples#buttons-to-modify-stsession_state).
