---
title: Control flow
slug: /library/api-reference/control-flow
---

# Control flow

## Change execution

By default, Streamlit apps execute the script entirely, but we allow some functionality to handle control flow in your applications.

<TileContainer>

<RefCard href="/library/api-reference/control-flow/st.rerun">

<h4>Rerun script</h4>

Rerun the script immediately.

```python
st.rerun()
```

</RefCard>

<RefCard href="/library/api-reference/control-flow/st.stop">

<h4>Stop execution</h4>

Stops execution immediately.

```python
st.stop()
```

</RefCard>

<RefCard href="/library/api-reference/control-flow/st.switch_page">

<h4>Switch page</h4>

Programmatically navigates to a specified page.

```python
st.switch_page("pages/my_page.py")
```

</RefCard>

<RefCard href="/library/api-reference/widgets/st.page_link">

<Image pure alt="screenshot" src="/images/api/page_link.jpg" />

<h4>Page link</h4>

Display a link to another page in a multipage app.

```python
st.page_link("app.py", label="Home", icon="🏠")
st.page_link("pages/profile.py", label="My profile")
```

</RefCard>

</TileContainer>

## Group multiple widgets

By default, Streamlit reruns your script everytime a user interacts with your app.
However, sometimes it's a better user experience to wait until a group of related
widgets is filled before actually rerunning the script. That's what `st.form` is for!

<TileContainer>
<RefCard href="/library/api-reference/control-flow/st.form">

<h4>Forms</h4>

Create a form that batches elements together with a “Submit" button.

```python
with st.form(key='my_form'):
    name = st.text_input("Name")
    email = st.text_input("Email")
    st.form_submit_button("Sign up")
```

</RefCard>

<RefCard href="/library/api-reference/control-flow/st.form_submit_button">

<h4>Form submit button</h4>

Display a form submit button.

```python
with st.form(key='my_form'):
    name = st.text_input("Name")
    email = st.text_input("Email")
    st.form_submit_button("Sign up")
```

</RefCard>

</TileContainer>

<ComponentSlider>

<ComponentCard href="https://github.com/kmcgrady/streamlit-autorefresh">

<Image pure alt="screenshot" src="/images/api/components/autorefresh.jpg" />

<h4>Autorefresh</h4>

Force a refresh without tying up a script. Created by [@kmcgrady](https://github.com/kmcgrady).

```python
from streamlit_autorefresh import st_autorefresh

st_autorefresh(interval=2000, limit=100,
  key="fizzbuzzcounter")
```

</ComponentCard>

<ComponentCard href="https://github.com/lukasmasuch/streamlit-pydantic">

<Image pure alt="screenshot" src="/images/api/components/pydantic.jpg" />

<h4>Pydantic</h4>

Auto-generate Streamlit UI from Pydantic Models and Dataclasses. Created by [@lukasmasuch](https://github.com/lukasmasuch).

```python
import streamlit_pydantic as sp

sp.pydantic_form(key="my_form",
  model=ExampleModel)
```

</ComponentCard>

<ComponentCard href="https://github.com/blackary/st_pages">

<Image pure alt="screenshot" src="/images/api/components/pages.jpg" />

<h4>Streamlit Pages</h4>

An experimental version of Streamlit Multi-Page Apps. Created by [@blackary](https://github.com/blackary).

```python
from st_pages import Page, show_pages, add_page_title

show_pages([ Page("streamlit_app.py", "Home", "🏠"),
  Page("other_pages/page2.py", "Page 2", ":books:"), ])
```

</ComponentCard>

</ComponentSlider>
