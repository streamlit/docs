import fs from 'fs'
import { join, basename } from 'path'
import sortBy from "lodash/sortBy"

import React from 'react'
import Link from "next/link"
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
import Helpful from '../components/utilities/helpful'
import { H1, H2, H3 } from '../components/blocks/headers'
import Psa from '../components/utilities/psa'
import FloatingNav from '../components/utilities/floatingNav'

// MDX Components
import Code from '../components/blocks/code'
import Note from '../components/blocks/noted'
import Tip from '../components/blocks/tip'
import Warning from '../components/blocks/warning'
import Important from '../components/blocks/important'
import YouTube from '../components/blocks/youTube'
import CodeTile from '../components/blocks/codeTile'
import RefCard from '../components/blocks/refCard'
import Autofunction from '../components/blocks/autofunction'
import Image from '../components/blocks/image'
import Download from '../components/utilities/download'
import Flex from '../components/layouts/flex'

export default function Article({ data, source, streamlit, slug, menu, previous, next, version, versions }) {

    let versionWarning
    let currentLink
    const maxVersion = versions[versions.length-1]

    const components = {
        Note,
        Tip,
        Important,
        Code,
        Warning,
        YouTube,
        Row,
        Masonry,
        CodeTile,
        TileContainer,
        RefCard,
        Image,
        Download,
        Flex,
        Autofunction: (props) => <Autofunction {...props} streamlit={streamlit} version={version} versions={versions} slug={slug} />,
        pre: (props) => <Code {...props} />,
        h1: H1,
        h2: H2,
        h3: H3,
    }

    let previousArrow
    let nextArrow
    let arrowContainer

    if (version && version != maxVersion) {
        currentLink = `/${slug.slice(1).join('/')}`
        versionWarning = (
            <Warning>
                <p>You are reading the documentation for Streamlit version {version}, but <Link href={currentLink}>{maxVersion}</Link> is the latest version available.</p>
            </Warning>            
        )
    }

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
                <SideBar slug={slug} menu={menu} version={version} versions={versions} />
                <Head>
                    <title>{data.title} - Streamlit Docs</title>
                    <link rel="icon" href="/favicon.svg"/>
                    <link rel="alternate icon" href="/favicon32.ico"/>
                    <meta name="theme-color" content="#ffffff"/>
                </Head>
                <section className="content wide" id="documentation">
                    {versionWarning}
                    <BreadCrumbs slug={slug} menu={menu} version={version} />
                    <article className='leaf-page'>
                        <FloatingNav slug={slug} />
                        <div className='content'>
                            <MDXRemote {...source} components={components} />
                        </div>
                    </article>
                    <Helpful slug={slug} />
                    <Psa />
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

    // Sort of documentation versions
    const jsonContents = fs.readFileSync(join(pythonDirectory, 'streamlit.json'), 'utf8')
    const streamlitFuncs = jsonContents ? JSON.parse(jsonContents) : {}
    const all_versions = Object.keys(streamlitFuncs)
    const versions = sortBy(all_versions, [ (o) => { return parseFloat(o) }])
    const current_version = versions[versions.length-1]
    const funcs = jsonContents ? JSON.parse(jsonContents) : {}
    
    props['streamlit'] = {}
    props['versions'] = all_versions
    props['menu'] = menu
    props['version'] = false

    if ('slug' in context.params) {
        let filename
        paths.paths.forEach(obj => {
            if (obj.params.location == location) {
                filename = obj.params.fileName
            }
        })

        let isnum = /^[\d\.]+$/.test(context.params.slug[0]);
        if (isnum) { 
            props['version'] = context.params.slug[0] 
            props['streamlit'] = funcs[props['version']]
        }

        // Get the last element of the array to find the MD file
        const fileContents = fs.readFileSync(filename, 'utf8')
        const { data, content } = matter(fileContents)
        const should_version = /<Autofunction(.*?)\/>/gi.test(fileContents)

        if (should_version) {
            props['streamlit'] = funcs[current_version]
        }

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
    
    // Sort of documentation versions
    const jsonContents = fs.readFileSync(join(pythonDirectory, 'streamlit.json'), 'utf8')
    const streamlitFuncs = jsonContents ? JSON.parse(jsonContents) : {}
    const all_versions = Object.keys(streamlitFuncs)
    const versions = sortBy(all_versions, [ (o) => { return parseFloat(o) }])
    const current_version = versions[versions.length-1]
    
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

        // If the file uses Autofunction, we need to version it.
        // Major versions only --TO DO--
        const should_version = /<Autofunction(.*?)\/>/gi.test(fileContents)
        if (!should_version) { continue; }

        for (const v_index in versions)  {
            const version = versions[v_index]
            
            if (version == current_version) { continue }
            
            const versioned_location = `/${version}${slug}`
            const newSlug = [...realSlug]
            
            newSlug.unshift(version)
            
            path = {
                params: {
                    slug: newSlug,
                    location: versioned_location,
                    fileName: articles[index],
                    title: data.title
                }
            }
            paths.push(path)
        }

    }
    
    return {
        paths: paths,
        fallback: false
    }
}
