---
title: Overview of multipage apps
slug: /develop/concepts/multipage-apps/overview
description: Learn about Streamlit's features for creating multipage apps using st.navigation, st.Page, and the pages directory with automatic navigation.
keywords: multipage, navigation, pages, st.navigation, st.Page, routing, sidebar
---

# Overview of multipage apps

Streamlit provides two built-in mechanisms for creating multipage apps. The simplest method is to use a `pages/` directory. However, the preferred and more customizable method is to use `st.navigation`.

## `st.Page` and `st.navigation`

If you want maximum flexibility in defining your multipage app, we recommend using `st.Page` and `st.navigation`. With `st.Page` you can declare any Python file or `Callable` as a page in your app. Furthermore, you can define common elements for your pages in your entrypoint file (the file you pass to `streamlit run`). With these methods, your entrypoint file becomes like a picture frame shared by all your pages.

You must include `st.navigation` in your entrypoint file to configure your app's navigation menu. This is also how your entrypoint file serves as the router between your pages.

## `pages/` directory

If you're looking for a quick and simple solution, just place a `pages/` directory next to your entrypoint file. For every Python file in your `pages/` directory, Streamlit will create an additional page for your app. Streamlit determines the page labels and URLs from the file name and automatically populates a navigation menu at the top of your app's sidebar.

```
your_working_directory/
├── pages/
│   ├── a_page.py
│   └── another_page.py
└── your_homepage.py
```

Streamlit determines the page order in navigation from the filenames. You can use numerical prefixes in the filenames to adjust page order. For more information, see [How pages are sorted in the sidebar](/develop/concepts/multipage-apps/pages-directory#how-pages-are-sorted-in-the-sidebar). If you want to customize your navigation menu with this option, you can deactivate the default navigation through [configuration](/develop/api-reference/configuration/config.toml) (`client.showSidebarNavigation = false`). Then, you can use `st.page_link` to manually contruct a custom navigation menu. With `st.page_link`, you can change the page label and icon in your navigation menu, but you can't change the URLs of your pages.

## Page terminology

A page has four identifying pieces as follows:

- **Page source**: This is a Python file or callable function with the page's source code.
- **Page label**: This is how the page is identified within the navigation menu. See <i style={{ verticalAlign: "-.25em" }} class="material-icons-sharp">looks_one</i>.
- **Page title**: This is the content of the HTML `<title>` element and how the page is identified within a browser tab. See <i style={{ verticalAlign: "-.25em" }} class="material-icons-sharp">looks_two</i>.
- **Page URL pathname**: This is the relative path of the page from the root URL of the app. See <i style={{ verticalAlign: "-.25em" }} class="material-icons-sharp">looks_3</i>.

Additionly, a page can have two icons as follows:

- **Page favicon**: This is the icon next to your page title within a browser tab. See <i style={{ verticalAlign: "-.25em" }} class="material-icons-sharp">looks_4</i>.
- **Page icon**: This is the icon next to your page label in the navigation menu. See <i style={{ verticalAlign: "-.25em" }} class="material-icons-sharp">looks_5</i>.

Typically, the page icon and favicon are the same, but it's possible make them different.

<div style={{ maxWidth: '564px', margin: 'auto' }}>
<Image caption="1. Page label, 2.Page titles, 3. Page URL pathname, 4.Page favicon, 5. Page icon" src="/images/page_parts.jpg" frame />
</div>

## Automatic page labels and URLs

If you use `st.Page` without declaring the page title or URL pathname, Streamlit falls back on automatically determining the page label, title, and URL pathname in the same manner as when you use a `pages/` directory with the default navigation menu. This section describes this naming convention which is shared between the two approaches to multipage apps.

### Parts of filenames and callables

Filenames are composed of four different parts as follows (in order):

1. `number`: A non-negative integer.
2. `separator`: Any combination of underscore (`"_"`), dash (`"-"`), and space (`" "`).
3. `identifier`: Everything up to, but not including, `".py"`.
4. `".py"`

For callables, the function name is the `identifier`, including any leading or trailing underscores.

### How Streamlit converts filenames into labels and titles

Within the navigation menu, Streamlit displays page labels and titles as follows:

1. If your page has an `identifier`, Streamlit displays the `identifier`. Any underscores within the page's `identifier` are treated as spaces. Therefore, leading and trailing underscores are not shown. Sequential underscores appear as a single space.
2. Otherwise, if your page has a `number` but does not have an `identifier`, Streamlit displays the `number`, unmodified. Leading zeros are included, if present.
3. Otherwise, if your page only has a `separator` with no `number` and no `identifier`, Streamlit will not display the page in the sidebar navigation.

The following filenames and callables would all display as "Awesome page" in the sidebar navigation.

- `"Awesome page.py"`
- `"Awesome_page.py"`
- `"02Awesome_page.py"`
- `"--Awesome_page.py"`
- `"1_Awesome_page.py"`
- `"33 - Awesome page.py"`
- `Awesome_page()`
- `_Awesome_page()`
- `__Awesome_page__()`

### How Streamlit converts filenames into URL pathnames

Your app's homepage is associated to the root URL of app. For all other pages, their `identifier` or `number` becomes their URL pathname as follows:

- If your page has an `identifier` that came from a filename, Streamlit uses the `identifier` with one modification. Streamlit condenses each consecutive grouping of spaces (`" "`) and underscores (`"_"`) to a single underscore.
- Otherwise, if your page has an `identifier` that came from the name of a callable, Streamlit uses the `identifier` unmodified.
- Otherwise, if your page has a `number` but does not have an `identifier`, Streamlit uses the `number`. Leading zeros are included, if present.

For each filename in the list above, the URL pathname would be "Awesome_page" relative to the root URL of the app. For example, if your app was running on `localhost` port `8501`, the full URL would be `localhost:8501/awesome_page`. For the last two callables, however, the pathname would include the leading and trailing underscores to match the callable name exactly.

## Navigating between pages

The primary way users navigate between pages is through the navigation widget. Both methods for defining multipage apps include a default navigation menu that appears in the sidebar. When a user clicks this navigation widget, the app reruns and loads the selected page. Optionally, you can hide the default navigation UI and build your own with [`st.page_link`](/develop/api-reference/widgets/st.page_link). For more information, see [Build a custom navigation menu with `st.page_link`](/develop/tutorials/multipage/st.page_link-nav).

If you need to programmatically switch pages, use [`st.switch_page`](/develop/api-reference/navigation/st.switch_page).

Users can also navigate between pages using URLs as noted above. When multiple files have the same URL pathname, Streamlit picks the first one (based on the ordering in the navigation menu. Users can view a specific page by visiting the page's URL.

<Important>
    Navigating between pages by URL creates a new browser session. In particular, clicking markdown links to other pages resets ``st.session_state``. In order to retain values in ``st.session_state``, handle page switching through Streamlit navigation commands and widgets, like ``st.navigation``, ``st.switch_page``, ``st.page_link``, and the built-in navigation menu.
</Important>

If a user tries to access a URL for a page that does not exist, they will see a modal like the one below, saying "Page not found."

<div style={{ maxWidth: '75%', margin: 'auto' }}>
<Image alt="Page not found" src="/images/mpa-page-not-found.png" />
</div>
