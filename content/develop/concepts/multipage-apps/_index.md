---
title: Multipage apps
slug: /develop/concepts/multipage-apps
description: Explore comprehensive guides about creating multipage Streamlit apps with navigation, page management, URL routing, and best practices for organizing complex apps.
keywords: multipage apps, page navigation, streamlit pages, app navigation, url routing, page management, multi-page applications, app organization, page structure
---

# Multipage apps

<TileContainer layout="list">

<RefCard href="/develop/concepts/multipage-apps/overview">

<h5>Overview of multipage apps</h5>

Streamlit provides multiple ways to define multipage apps. Understand the terminology and basic comparison between methods.

</RefCard>

<RefCard href="/develop/concepts/multipage-apps/page-and-navigation">

<h5>Define multipage apps with <code>st.Page</code> and <code>st.navigation</code></h5>

Learn about the preferred method for defining multipage apps. `st.Page` and `st.navigation` give you flexibility to organize your project directory and label your pages as you please.

</RefCard>

<RefCard href="/develop/concepts/multipage-apps/pages-directory">

<h5>Creating multipage apps using the <code>pages/</code> directory</h5>

Define your multipage apps through directory structure. Place additional Python files in a `pages/` directory alongside your entrypoint file and pages are automatically shown in a navigation widget inside your app's sidebar.

</RefCard>

<RefCard href="/develop/concepts/multipage-apps/widgets">

<h5>Working with widgets in multipage apps</h5>

Understand how widget identity is tied to pages. Learn strategies to get the behavior you want out of widgets.

</RefCard>

</TileContainer>
