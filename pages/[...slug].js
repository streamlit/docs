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
import GDPRBanner from '../components/utilities/gdpr';
import { getArticleSlugs, getArticleSlugFromString, pythonDirectory, getMenu, getGDPRBanner } from '../lib/api';
import { getPreviousNextFromMenu } from '../lib/utils.cjs'
import Layout from '../components/layouts/globalTemplate'
import BreadCrumbs from '../components/utilities/breadCrumbs'
import SideBar from '../components/navigation/sideBar'
import Row from '../components/layouts/row'
import Masonry from '../components/layouts/masonry'
import TileContainer from '../components/layouts/tileContainer'
import InlineCalloutContainer from '../components/layouts/inlineCalloutContainer'

import ArrowLinkContainer from '../components/navigation/arrowLinkContainer'
import ArrowLink from '../components/navigation/arrowLink'
import Helpful from '../components/utilities/helpful'
import { H1, H2, H3 } from '../components/blocks/headers'
import Psa from '../components/utilities/psa'
import SuggestEdits from '../components/utilities/suggestEdits'
import FloatingNav from '../components/utilities/floatingNav'

// MDX Components
import Autofunction from '../components/blocks/autofunction'
import Code from '../components/blocks/code'
import CodeTile from '../components/blocks/codeTile'
import Download from '../components/utilities/download'
import Flex from '../components/layouts/flex'
import Image from '../components/blocks/image'
import Important from '../components/blocks/important'
import Note from '../components/blocks/noted'
import RefCard from '../components/blocks/refCard'
import Tile from '../components/blocks/tile'
import InlineCallout from '../components/blocks/inlineCallout'
import Tip from '../components/blocks/tip'
import Warning from '../components/blocks/warning'
import YouTube from '../components/blocks/youTube'

export default function Article({ data, source, streamlit, slug, menu, previous, next, version, versions, paths, gdpr_data, filename }) {

    let versionWarning
    let currentLink
    let sourceFile
    sourceFile = 'https://github.com/streamlit/docs/tree/main' + filename.substring(filename.indexOf('/content/'))
    const maxVersion = versions[versions.length - 1]

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
        InlineCalloutContainer,
        InlineCallout,
        TileContainer,
        Tile,
        RefCard,
        Image,
        Download,
        Flex,
        Autofunction: (props) => <Autofunction {...props} streamlit={streamlit} version={version} versions={versions} slug={slug} />,
        pre: (props) => <Code {...props} />,
        h1: H1,
        h2: H2,
        h3: H3,
        // iframe : WrappedIFrame
    }

    let previousArrow
    let nextArrow
    let arrowContainer
    let keywordsTag

    if (version && version != maxVersion) {
        // Slugs don't have the version number, so we just have to join them.
        currentLink = `/${slug.join('/')}`
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

    if (data.keywords) {
        keywordsTag = (
            <meta name='keywords' content={data.keywords} />
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
                <GDPRBanner {...gdpr_data} />
                <section className="page container template-standard">
                    <SideBar slug={slug} menu={menu} version={version} maxVersion={maxVersion} versions={versions} paths={paths} />
                    <Head>
                        <title>{data.title} - Streamlit Docs</title>
                        <link rel="icon" href="/favicon.svg" />
                        <link rel="alternate icon" href="/favicon32.ico" />
                        <meta name="theme-color" content="#ffffff" />
                        {keywordsTag}
                        {version === true ?
                            <link rel="canonical" href={`https://${process.env.NEXT_PUBLIC_HOSTNAME}/${slug.slice(1).join('/')}`} />
                            :
                            <link rel="canonical" href={`https://${process.env.NEXT_PUBLIC_HOSTNAME}/${slug.join('/')}`} />
                        }
                    </Head>
                    <section className="content wide" id="documentation">
                        {versionWarning}
                        <BreadCrumbs slug={slug} menu={menu} version={version} />
                        <article className='leaf-page'>
                            {/* Remove for now. Too many bugs. <FloatingNav slug={slug} menu={menu} version={version} /> */}
                            <div className='content'>
                                <MDXRemote {...source} components={components} />
                            </div>
                        </article>
                        <Helpful
                            slug={slug}
                            sourcefile={sourceFile}
                        />
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
    const gdpr_data = await getGDPRBanner()

    // Sort of documentation versions
    const jsonContents = fs.readFileSync(join(pythonDirectory, 'streamlit.json'), 'utf8')
    const streamlitFuncs = jsonContents ? JSON.parse(jsonContents) : {}
    const all_versions = Object.keys(streamlitFuncs)
    const versions = sortBy(all_versions, [(o) => { return parseFloat(o) }])
    const current_version = versions[versions.length - 1]
    const funcs = jsonContents ? JSON.parse(jsonContents) : {}

    let menu = getMenu()

    props['streamlit'] = {}
    props['versions'] = all_versions
    props['version'] = false
    props['paths'] = false

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
        const should_version = /<Autofunction(.*?)\/>/gi.test(fileContents)

        if (should_version) {
            props['streamlit'] = funcs[current_version]
            props['paths'] = paths
        }

        let isnum = /^[\d\.]+$/.test(context.params.slug[0]);
        if (isnum) {
            props['version'] = context.params.slug[0]
            props['streamlit'] = funcs[props['version']]
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

        const { current, prev, next } = getPreviousNextFromMenu(menu, location)

        props['menu'] = menu
        props['gdpr_data'] = gdpr_data
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
    const versions = sortBy(all_versions, [(o) => { return parseFloat(o) }])
    const current_version = versions[versions.length - 1]

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
                title: data.title ? data.title : 'Untitled'
            }
        }

        paths.push(path)

        // If the file uses Autofunction, we need to version it.
        // Major versions only --TO DO--
        const should_version = /<Autofunction(.*?)\/>/gi.test(fileContents)
        if (!should_version) { continue; }

        for (const v_index in versions) {
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
                    title: data.title ? data.title : 'Untitled'
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
