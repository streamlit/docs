export function breadcrumbsForSlug(menu, slugStr, path) {
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

export function urlInChildren(menu, slugStr) {
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
