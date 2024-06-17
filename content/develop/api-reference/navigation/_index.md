---
title: Navigation and pages
slug: /develop/api-reference/navigation
---

# Navigation and pages

<TileContainer>

<RefCard href="/develop/api-reference/widgets/st.navigation">

<Image pure alt="screenshot" src="/images/api/navigation.jpg" />

<h4>Navigation</h4>

Display a navigation widget in the sidebar.

```python
st.navigation({
    "Your account" : [log_out, settings],
    "Reports" : [overview, usage],
    "Tools" : [search]
})
```

</RefCard>

<RefCard href="/develop/api-reference/widgets/st.page">

<Image pure alt="screenshot" src="/images/api/page.jpg" />

<h4>Page</h4>

Define a page in a multipage app.

```python
home = st.Page(
    "home.py",
    title="Home",
    icon=":material/home:"
)
```

</RefCard>

<RefCard href="/develop/api-reference/widgets/st.page_link">

<Image pure alt="screenshot" src="/images/api/page_link.jpg" />

<h4>Page link</h4>

Display a link to another page in a multipage app.

```python
st.page_link("app.py", label="Home", icon="🏠")
st.page_link("pages/profile.py", label="Profile")
```

</RefCard>

<RefCard href="/develop/api-reference/navigation/st.switch_page">

<h4>Switch page</h4>

Programmatically navigates to a specified page.

```python
st.switch_page("pages/my_page.py")
```

</RefCard>

</TileContainer>
