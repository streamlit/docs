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
      next = menu[index].url ? menu[index] : menu[index + 1];
    }
    if (current) {
      continue;
    }

    // For top-level categories
    if (menu[index].url === slugStr) {
      // If we are NOT on the first top-level category (Get started), point the
      // previous arrow to the parent
      // Example: Develop points to Get started.
      // Example: Deploy points to Develop
      if (index < 1) {
        prev = parent;
        // If we are on the second item within a category and the first item is
        // a divider, skip the divider and point to the parent
      } else if (index === 1 && !menu[index - 1].url) {
        prev = parent;
        // If the current item is preceded by a divider, skip the divider and
        // point to the item before the divider
      } else if (!menu[index - 1].url) {
        prev = menu[index - 2];
      } else {
        prev = menu[index - 1];
      }

      // If we are on a top-level category or expandable item, the next item
      // should be its first child. Skip over a divider if it's the first child.
      // Example: Get started -> Installation
      // Example: API reference -> Write and magic
      const isTopLevel = parseInt(menu[index].depth) === 0;
      const isExpandable =
        menu[index].children && menu[index].children.length > 0;
      if (isTopLevel || isExpandable) {
        next = menu[index].children[0].url
          ? menu[index].children[0]
          : menu[index].children[1];
      }

      current = menu[index];
    }

    // Calculate For sub-level items within top-level categories
    else if (menu[index].children && menu[index].children.length > 0) {
      ({ current, prev, next } = getPreviousNextFromMenu(
        menu[index].children,
        slugStr,
        menu[index],
      ));
    }
  }

  return { current, prev, next };
}

exports.breadcrumbsForSlug = breadcrumbsForSlug;
exports.urlInChildren = urlInChildren;
exports.getPreviousNextFromMenu = getPreviousNextFromMenu;
