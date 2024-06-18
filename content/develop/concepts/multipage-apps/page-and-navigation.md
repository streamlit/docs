---
title: Define multipage apps with st.Page and st.navigation
slug: /develop/concepts/multipage-apps/page-and-navigation
description: Understand the most flexible and preferred method for defining multipage apps
---

# Define multipage apps with `st.Page` and `st.navigation`

`st.Page` and `st.navigation` are the preferred method for defining multipage apps. With these functions, you have flexibility to organize your project files and customize your navigation menu. Simply initialize `StreamlitPage` objects with `st.Page`, then pass those `StreamlitPage` objects to `st.navigation` in your entrypoint file (i.e. the file you pass to `streamlit run`).

This page assumes you understand the [Page terminology](/develop/concepts/multipage-apps/overview#page-terminology) presented in the overview.

## App structure

When using `st.navigation`, your entrypoint file acts like a page router. Each page is a script executed from your entrypoint file. You can define a page from a Python file or function. If you include elements or widgets in your entrypoin file, they become common elements between your pages. In this case, you can think of your entrypoint file like a picture frame around each of your pages.

You can only call `st.navigation` once per app run and you must call it from your entrypoint file. When a user selects a page in navigation (or is routed through a function like `st.switch_page`), `st.navigation` returns the selected page. You must manually execute that page with the `.run()` method. The following example is a two-page app where each page is defined by a Python file.

**Directory structure:**

```
your-repository/
├── page_1.py
├── page_2.py
└── streamlit_app.py
```

**`streamlit_app.py`:**

```python
import streamlit as st

pg = st.navigation([st.Page("page_1.py"), st.Page("page_2.py")])
pg.run()
```

## Defining pages

`st.Page` lets you define a page. The first and only required argument defines your page source, which can be a Python file or function. When using Python files, your pages may be in a subdirectory (or superdirectory). The path to your page file must always be relative to the entrypoint file. Once you create your page objects, pass them to `st.navigation` to register them as pages in your app.

If you don't define your page title or URL pathname, Streamlit will infer them from the file or function name as described in the multipage apps [Overview](/develop/concepts/multipage-apps/overview#automatic-page-labels-and-urls). However, `st.Page` lets you configure them manually. Within `st.Page`, Streamlit uses `title` to set the page label and title. Additionaly, Streamlit uses `icon` to set the page icon and favicon. If you want to have a different page title and label, or differnt page icon and favicon, you can use `st.set_page_config` to change the page title and/or favicon. Just call `st.set_page_config` after `st.navigation`, either in your entrypoint file or in your page source.

The following example uses `st.set_page_config` to set a page title and favicon consistently across pages. Each page will have its own label and icon in the navigation menu, but the browser tab will show a consistent title and favicon on all pages.

**Directory structure:**

```
your-repository/
├── create.py
├── delete.py
└── streamlit_app.py
```

**`streamlit_app.py`:**

```python
import streamlit as st

create_page = st.Page("create.py", title="Create entry", icon=":material/add_circle:")
delete_page = st.Page("delete.py", title="Delete entry", icon=":material/delete:")

pg = st.navigation([create_page, delete_page])
st.set_page_config(page_title="Data manager", page_icon=":material/edit:")
pg.run()
```

<Image src="/images/mpa-v2-use-set-page-config.jpg" frame />

## Customizing navigation

If you don't include a page in `st.navigation`, then you can't execute it. Only the page returned by `st.navigation` accepts the `.run()` method. Additionally, if a user enters a URL with a pathname, and that pathname is not associated to page in `st.navigation`, Streamlit will throw a "Page not found" error.

You can dynamically change the pages in `st.navigation` to set the available pages on any given rerun.

You can hide the default navigation and build a custom menu if you want a page to be available, but not visible to the user in the navigation menu.
