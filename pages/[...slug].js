
import fs from 'fs'
import { join, basename } from 'path'

import React from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXProvider } from '@mdx-js/react'
import { MDXRemote } from 'next-mdx-remote'
import matter from 'gray-matter'

// Site Components
import { getArticleSlugs, getArticleSlugFromString, articleDirectory, pythonDirectory, getMenu } from '../lib/api';
import Layout from '../components/layouts/globalTemplate'
import BreadCrumbs from '../components/utilities/breadCrumbs'
import SideBar from '../components/navigation/sideNav'
import Row from '../components/layouts/row'
import Masonry from '../components/layouts/masonry'
import TileContainer from '../components/layouts/tileContainer'
import { H1, H2, H3 } from '../components/blocks/headers'
// import FloatingNav from '../../components/utilities/floatingNav'

// MDX Components
import Code from '../components/blocks/code'
import Note from '../components/blocks/noted'
import Tip from '../components/blocks/tip'
import Important from '../components/blocks/important'
import YouTube from '../components/blocks/youTube'
import CodeTile from '../components/blocks/codeTile'
import RefCard from '../components/blocks/refCard'
import Autofunction from '../components/blocks/autofunction'
import Image from '../components/blocks/image'
import Download from '../components/utilities/download'
import Flex from '../components/layouts/flex'

export default function Article({ source, streamlit, slug, menu }) {

    const components = {
        Note,
        Tip,
        Important,
        Code,
        YouTube,
        Row,
        Masonry,
        CodeTile,
        TileContainer,
        RefCard,
        Image,
        Download,
        Flex,
        Autofunction: (props) => <Autofunction {...props} streamlit={streamlit} />,
        pre: (props) => <Code {...props} />,
        h1: H1,
        h2: H2,
        h3: H3,
    }

    return (
        <MDXProvider
          components={{
            // Override some default Markdown components.
            img: Image
          }}
        >
        <Layout>
            <section className="page container template-standard">
                <SideBar slug={slug} menu={menu} />
                <section className="content wide">
                    <BreadCrumbs slug={slug} menu={menu} />
                    <MDXRemote {...source} components={components} />
                </section>
            </section>
        </Layout>
        </MDXProvider>
    )
}

export async function getStaticProps(context) {

    const paths = await getStaticPaths()
    const props = {}
    const location = `/${context.params.slug.join('/')}`

    props['menu'] = getMenu()
    
    const jsonContents = fs.readFileSync(join(pythonDirectory, 'streamlit.json'), 'utf8')
    props['streamlit'] = jsonContents ? JSON.parse(jsonContents) : {}

    if ('slug' in context.params) {
        let filename
        paths.paths.forEach(obj => {

            if (obj.params.location == location) {
                filename = obj.params.fileName
            }
        })
        // Get the last element of the array to find the MD file
        const fileContents = fs.readFileSync(filename, 'utf8')
        const { data, content } = matter(fileContents)

        const source = await serialize(content,
            {
                scope: data,
                mdxOptions: {
                    rehypePlugins: [
                        require('rehype-slug'),
                        require('rehype-autolink-headings')
                    ]
                }
            }
        )

        props['data'] = data
        props['filename'] = filename
        props['slug'] = context.params.slug
        props['source'] = source
    }

    return {
        props: props,
        revalidate: 60
    }
}


export async function getStaticPaths() {
    // Build up paths based on slugified categories for all docs
    const articles = getArticleSlugs()
    const paths = []
    // Load each file and map a path

    for (const index in articles) {
        let slug = basename(articles[index]).replace(/\.md$/, '')
        let realSlug = [slug]
        slug = `/${slug}`
        const fileContents = fs.readFileSync(articles[index], 'utf8')
        const { data, content } = matter(fileContents)

        // Use slug instead of Category if it's present
        if ('slug' in data) {
            slug = data.slug
            realSlug = data.slug.split('/').map(getArticleSlugFromString)
            realSlug.shift()
        }

        let path = {
            params: {
                slug: realSlug,
                location: slug,
                fileName: articles[index],
                title: data.title
            }
        }

        paths.push(path)
    }
    
    return {
        paths: paths,
        fallback: false
    }
}
