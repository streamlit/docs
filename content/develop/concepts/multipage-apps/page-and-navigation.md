---
title: Define multipage apps with st.Page and st.navigation
slug: /develop/concepts/multipage-apps/page-and-navigation
description: Learn how to use the most flexible and preferred method for defining multipage apps.
keywords: multipage, st.Page, st.navigation, pages, routing, navigation, app structure
---

# Define multipage apps with `st.Page` and `st.navigation`

`st.Page` and `st.navigation` are the preferred commands for defining multipage apps. With these commands, you have flexibility to organize your project files and customize your navigation menu. Simply initialize `StreamlitPage` objects with `st.Page`, then pass those `StreamlitPage` objects to `st.navigation` in your entrypoint file (i.e. the file you pass to `streamlit run`).

This page assumes you understand the [Page terminology](/develop/concepts/multipage-apps/overview#page-terminology) presented in the overview.

## App structure

When using `st.navigation`, your entrypoint file acts like a page router. Each page is a script executed from your entrypoint file. You can define a page from a Python file or function. If you include elements or widgets in your entrypoint file, they become common elements between your pages. In this case, you can think of your entrypoint file like a picture frame around each of your pages.

You can only call `st.navigation` once per app run and you must call it from your entrypoint file. When a user selects a page in navigation (or is routed through a command like `st.switch_page`), `st.navigation` returns the selected page. You must manually execute that page with the `.run()` method. The following example is a two-page app where each page is defined by a Python file.

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

If you don't define your page title or URL pathname, Streamlit will infer them from the file or function name as described in the multipage apps [Overview](/develop/concepts/multipage-apps/overview#automatic-page-labels-and-urls). However, `st.Page` lets you configure them manually. Within `st.Page`, Streamlit uses `title` to set the page label and title. Additionaly, Streamlit uses `icon` to set the page icon and favicon. If you want to have a different page title and label, or different page icon and favicon, you can use `st.set_page_config` to change the page title and/or favicon. Just call `st.set_page_config` in your entrypoint file or in your page script. You can call `st.set_page_config` multiple times to additively configure your page. Use `st.set_page_config` in your entrypoint file to declare a default configuration, and call it within page scripts to override that default.

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

<div style={{ maxWidth: '564px', margin: 'auto' }}>
<Image src="/images/mpa-v2-use-set-page-config.jpg" frame />
</div>

## Customizing navigation

You can display your navigation menu in the sidebar or along the top of your app using the `position` parameter in `st.navigation`. If you want to group your pages into sections, `st.navigation` lets you insert headers in the sidebar navigation or drop-down groups in the top navigation. Alternatively, you can disable the default navigation widget and build a custom navigation menu with `st.page_link`.

Additionally, you can dynamically change which pages you pass to `st.navigation`. However, only the page returned by `st.navigation` accepts the `.run()` method. If a user enters a URL with a pathname, and that pathname is not associated to a page in `st.navigation` (on first run), Streamlit will throw a "Page not found" error and redirect them to the default page.

### Adding section headers

The simplest way to customize your navigation menu is to organize the pages within `st.navigation`. You can sort or group pages, as well as remove any pages you don't want the user to access. This is a convenient way to handle user permissions. However, you can't hide a page in navigation while keeping it accessible through a direct URL. If you need to hide a page while keeping it accessible, you'll need to hide the default navigation menu and build a navigation menu with commands like `st.page_link`.

The following example creates two menu states. When a user starts a new session, they are not logged in. In this case, the only available page is the login page. If a user tries to access another page by URL, it will create a new session and Streamlit will not recognize the page. The user will be diverted to the login page. However, after a user logs in, they will see a navigation menu with three sections and be directed to the dashboard as the app's default page (i.e. homepage).

**Directory structure:**

```
your-repository/
├── reports
│   ├── alerts.py
│   ├── bugs.py
│   └── dashboard.py
├── tools
│   ├── history.py
│   └── search.py
└── streamlit_app.py
```

**`streamlit_app.py`:**

```python
import streamlit as st

if "logged_in" not in st.session_state:
    st.session_state.logged_in = False

def login():
    if st.button("Log in"):
        st.session_state.logged_in = True
        st.rerun()

def logout():
    if st.button("Log out"):
        st.session_state.logged_in = False
        st.rerun()

login_page = st.Page(login, title="Log in", icon=":material/login:")
logout_page = st.Page(logout, title="Log out", icon=":material/logout:")

dashboard = st.Page(
    "reports/dashboard.py", title="Dashboard", icon=":material/dashboard:", default=True
)
bugs = st.Page("reports/bugs.py", title="Bug reports", icon=":material/bug_report:")
alerts = st.Page(
    "reports/alerts.py", title="System alerts", icon=":material/notification_important:"
)

search = st.Page("tools/search.py", title="Search", icon=":material/search:")
history = st.Page("tools/history.py", title="History", icon=":material/history:")

if st.session_state.logged_in:
    pg = st.navigation(
        {
            "Account": [logout_page],
            "Reports": [dashboard, bugs, alerts],
            "Tools": [search, history],
        }
    )
else:
    pg = st.navigation([login_page])

pg.run()
```

<div style={{ maxWidth: '564px', margin: 'auto' }}>
<Image src="/images/mpa-v2-page-sections.jpg" frame />
</div>

### Dynamically changing the available pages

You can change what pages are available to a user by updating the list of pages in `st.navigation`. This is a convenient way to handle role-based or user-based access to certain pages. For more information, check out our tutorial, [Create a dynamic navigation menu](/develop/tutorials/multipage/dynamic-navigation).

### Building a custom navigation menu

If you want more control over your navigation menu, you can hide the default navigation and build your own. You can hide the default navigation by including `position="hidden"` in your `st.navigation` command. If you want a page to be available to a user without showing it in the navigation menu, you must use this method. A user can't be routed to a page if the page isn't included in `st.navigation`. This applies to navigation by URL as well as commands like `st.switch_page` and `st.page_link`.
