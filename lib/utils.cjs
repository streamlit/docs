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

        // If we are on the last item from the top-level category, point them to the next top-level category
        // Visual example: https://share.getcloudapp.com/bLud60gW
        if ( current && !next ) { next = menu[index] }
        if ( current ) { continue }
        
        if ( menu[index].url === slug ) {
            // If we are on the first item from the top-level category, the previous item should be its parent
            // Visual example: https://share.getcloudapp.com/04u59NQv
            if (index < 1) { prev = parent }
            // If we are NOT on the first item from the top-level category, the previous item should be its previous sibling
            // Visual example: https://share.getcloudapp.com/p9uNdrBA
            else { prev = menu[index-1] }
            
            // If we are NOT on the last item from the top-level category, the next item should be its next sibling
            // Visual example: https://share.getcloudapp.com/X6ubW0wn
            if ( index + 1 < menu.length) {  next = menu[index+1] }

            // If we are on a top-level category, the next item should be its first child
            if(parseInt(menu[index].depth) === 0) {
                next = menu[index].children[0];
            }
            
            current = menu[index]
        }
        
        // If a sub item has children, run the function again to calculate the options
        else if ( menu[index].children && menu[index].children.length > 0 ) {
            ({ current, prev, next } = getPreviousNextFromMenu(menu[index].children, slug, menu[index]))
        }
    }

    return { current: current, prev: prev, next: next }
}



exports.breadcrumbsForSlug = breadcrumbsForSlug;
exports.urlInChildren = urlInChildren;
exports.getPreviousNextFromMenu = getPreviousNextFromMenu;