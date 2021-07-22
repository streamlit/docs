import fs from 'fs'
import { join, basename } from 'path'
import findIndex from 'lodash/findIndex'
import matter from 'gray-matter'
import slugify from 'slugify'

export const articleDirectory = join( process.cwd(), 'content/' )
export const pythonDirectory = join( process.cwd(), 'python/' )

export function getAllFilesInDirectory(articleDirectory, files) {
    files = files ? files : []
    fs.readdirSync(articleDirectory).forEach(function(file){
        const subpath = join(articleDirectory, file)
        if ( fs.lstatSync(subpath).isDirectory() ) {
            getAllFilesInDirectory(subpath, files)
        } else {
            files.push(subpath)
        }
    })
    return files;
}

export function getArticleSlugs() {
    const files = getAllFilesInDirectory(articleDirectory)
    return files
}

export function getArticleSlugFromString(pathname) {
    return slugify(pathname).toLowerCase()
}

export function getArticleBySlug(slug, fields = []) {
    const realSlug = basename(slug).replace(/\.md$/, '')
    const fullPath = slug
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const items = {}

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug
        }
        if (field === 'content') {
            items[field] = content
        }
        if (data[field]) {
            items[field] = data[field]
        }
    })

    return items
}

export function getAllArticles(fields = []) {
    const slugs = getArticleSlugs()
    const posts = slugs.map((slug) => getArticleBySlug(slug, fields))
    return posts
}

export function getMenu() {
    const menu = []
    const fullPath = join(articleDirectory, `menu.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    let menu_root = menu
    let obj_root = menu 

    for ( const index in data['site_menu'] ) {
        const item  = data['site_menu'][index]
        const category = item['category'].split('/')
        // Move to the depth we need
        for ( const depth in category ) {
            const menu_key = slugify(category[depth].trim().toLowerCase())
            let exist = findIndex(menu_root, { menu_key: menu_key  })
            if (exist < 0) {
                menu_root.push({ menu_key: menu_key, 'name': category[depth].trim(), depth: depth, 'children': []  })
                exist = findIndex(menu_root, { menu_key: menu_key  })
            }
            obj_root = menu_root[exist]
            menu_root = menu_root[exist]['children']
        }
        Object.assign(obj_root, item)
        menu_root = menu
    }
    
    //console.info(JSON.stringify(menu, null, 4))

    return menu
}