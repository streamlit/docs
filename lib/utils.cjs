function breadcrumbsForSlug(menu, slug, path) {
    path = path ? path : []
    menu.forEach(obj => {
        if (urlInChildren(obj, slug)) {
            path.push({ name: obj.name, url: obj.url, icon: obj.icon, color: obj.color })
            if (obj.children && obj.children.length > 0) {
                breadcrumbsForSlug(obj.children, slug, path)
            }
        }
    })
    return path
}

function urlInChildren(menu, slug) {
    let found = false
    if (menu.url && menu.url === slug) {
        found = true
    }
    if (!found && menu.children && menu.children.length > 0) {
        for (const index in menu.children) {
            if (found) { continue }
            found = urlInChildren(menu.children[index], slug)
        }
    }
    return found
}

function getPreviousNextFromMenu(menu, slug, parent) {
    let current, prev, next
    for (let index in menu) {
        index = parseInt(index)
        if ( current && !next ) { next = menu[index] }
        if ( current ) { continue }
        if ( menu[index].url === slug ) {
            if (index < 1) { prev = parent }
            else { prev = menu[index-1] }
            if ( index + 1 < menu.length) {  next = menu[index+1] }
            else if (menu[index].children && menu[index].children.length > 0) { next = menu[index].children[0] }
            current = menu[index]
        } else if ( menu[index].children && menu[index].children.length > 0 ) {
            ({ current, prev, next } = getPreviousNextFromMenu(menu[index].children, slug, menu[index]))
        }
    }

    return { current: current, prev: prev, next: next }
}



exports.breadcrumbsForSlug = breadcrumbsForSlug;
exports.urlInChildren = urlInChildren;
exports.getPreviousNextFromMenu = getPreviousNextFromMenu;