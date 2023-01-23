function breadcrumbsForSlug(menu, slugStr, path) {
  path = path ? path : [];
  menu.forEach((obj) => {
    if (urlInChildren(obj, slugStr)) {
      path.push({
        name: obj.name,
        url: obj.url,
        icon: obj.icon,
        color: obj.color,
      });
      if (obj.children && obj.children.length > 0) {
        breadcrumbsForSlug(obj.children, slugStr, path);
      }
    }
  });
  return path;
}

function urlInChildren(menu, slugStr) {
  let found = false;
  if (menu.url && menu.url === slugStr) {
    found = true;
  }
  if (!found && menu.children && menu.children.length > 0) {
    for (const index in menu.children) {
      if (found) {
        continue;
      }
      found = urlInChildren(menu.children[index], slugStr);
    }
  }
  return found;
}

function getPreviousNextFromMenu(menu, slugStr, parent) {
  let current, prev, next;

  for (let index = 0; index < menu.length; index++) {
    // If we are inside top-level category, point them to the next top-level category
    if (current && !next) {
      next = menu[index];
    }
    if (current) {
      continue;
    }

    // For top-level categories
    if (menu[index].url === slugStr) {
      // If we are NOT on the first top-level category (Streamlit Library), point the previous arrow
      // to the previous parent
      // Example: Streamlit Community Cloud points to Streamlit Library.
      // Example: Knowledge Base points to Streamlit Community Cloud
      if (index < 1) {
        prev = parent;
      } else {
        prev = menu[index - 1];
      }

      // If we are on a top-level category, the next item should be its first child
      // Example: Streamlit Library -> Get Started
      // Example: Streamlit Community Cloud -> Community
      if (parseInt(menu[index].depth) === 0) {
        next = menu[index].children[0];
      }

      // If we are on a sub item that's expandable, then its first item should be its direct descendant
      // Example: Tutorials -> Connect to data sources
      // Example: Community -> Sign up
      if (menu[index].children && menu[index].children.length > 0) {
        next = menu[index].children[0];
      }

      current = menu[index];
    }

    // Calculate For sub-level items within top-level categories
    else if (menu[index].children && menu[index].children.length > 0) {
      ({ current, prev, next } = getPreviousNextFromMenu(
        menu[index].children,
        slugStr,
        menu[index]
      ));
    }
  }

  return { current, prev, next };
}

exports.breadcrumbsForSlug = breadcrumbsForSlug;
exports.urlInChildren = urlInChildren;
exports.getPreviousNextFromMenu = getPreviousNextFromMenu;
