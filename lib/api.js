import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import slugify from 'slugify'

export const articleDirectory = join( process.cwd(), 'content/' )
export const pythonDirectory = join( process.cwd(), 'python/' )

export function getArticleSlugs() {
    return fs.readdirSync(articleDirectory)
}

export function getArticleSlugFromString(pathname) {
    return slugify(pathname).toLowerCase()
}

export function getArticleBySlug(slug, fields = []) {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = join(articleDirectory, `${realSlug}.md`)
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