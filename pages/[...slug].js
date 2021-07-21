
import fs from 'fs'
import { join, basename } from 'path'

import React from 'react'
import Head from 'next/head'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXProvider } from '@mdx-js/react'
import { MDXRemote } from 'next-mdx-remote'
import matter from 'gray-matter'

// Site Components
import { getArticleSlugs, getArticleSlugFromString, pythonDirectory, getMenu } from '../lib/api';
import { getPreviousNextFromMenu } from '../lib/utils.cjs'
import Layout from '../components/layouts/globalTemplate'
import BreadCrumbs from '../components/utilities/breadCrumbs'
import SideBar from '../components/navigation/sideNav'
import Row from '../components/layouts/row'
import Masonry from '../components/layouts/masonry'
import TileContainer from '../components/layouts/tileContainer'
import ArrowLinkContainer from '../components/navigation/arrowLinkContainer'
import ArrowLink from '../components/navigation/arrowLink'
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

export default function Article({ data, source, streamlit, slug, menu, previous, next }) {

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

    let previousArrow
    let nextArrow
    let arrowContainer

    if (previous) {
        previousArrow = (
            <ArrowLink link={previous.url} type='back' content={previous.name} />
        )
    }

    if (next) {
        nextArrow = (
            <ArrowLink link={next.url} type="next" content={next.name} />
        )
    }

    if (next || previous) {
        arrowContainer = (
            <ArrowLinkContainer>
                {previousArrow}
                {nextArrow}
            </ArrowLinkContainer>
        )
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
                <Head>
                    <title>{data.title} - Streamlit Docs</title>
                    <link rel="icon" href="/favicon.svg"/>
                    <link rel="alternate icon" href="/favicon32.ico"/>
                    <meta name="theme-color" content="#ffffff"/>
                </Head>
                <section className="content wide" id="documentation">
                    <BreadCrumbs slug={slug} menu={menu} />
                    <article>
                        <MDXRemote {...source} components={components} />
                    </article>
                    {arrowContainer}
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
    const menu  = getMenu()
    const { current, prev, next } = getPreviousNextFromMenu(menu, location)

    const jsonContents = fs.readFileSync(join(pythonDirectory, 'streamlit.json'), 'utf8')
    props['streamlit'] = jsonContents ? JSON.parse(jsonContents) : {}

    props['menu'] = menu

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
        props['next'] = next ? { name: next.name, url: next.url } : false
        props['previous'] = prev ? { name: prev.name, url: prev.url } : false
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
