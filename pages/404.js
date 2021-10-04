import Head from 'next/head'
import { getMenu } from '../lib/api'
import Layout from '../components/layouts/globalTemplate'
import SideNav from '../components/navigation/sideNav'
import Spacer from '../components/utilities/spacer'
import TileContainer from '../components/layouts/tileContainer'
import Tile from '../components/blocks/tile'

export default function Home({ window, menu }) {

    return (
        <Layout window={window}>
            <Head>
                <title>404 | Streamlit Docs</title>
                <link rel="icon" href="/favicon.svg" />
                <link rel="alternate icon" href="/favicon32.ico" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <section className="page container template-expanded-wide">
                <SideNav menu={menu} slug={['404']} />
                <section className="content wide">
                    <article>
                        <h1>Page not found</h1>
                        <Spacer size="2rem" />

                        <TileContainer>
                            <Tile icon="arrow_forward" title="Get Started" text="If you're new to Streamlit and don't know where to start, this is a good place." background="violet-70" link="/library/get-started" />
                            <Tile icon="dvr" title="API Reference" text="Learn about our APIs, with actionable explanations of specific functions and features." background="violet-70" link="/library/api-reference" />
                            <Tile icon="grid_view" title="App Gallery" text="Try out awesome apps created by our users, and curated from our forums or Twitter." background="green-70" link="https://streamlit.io/gallery" />
                        </TileContainer>
                    </article>
                </section>
            </section>
        </Layout>
    )
}

export async function getStaticProps(context) {

    const props = {}
    props['menu'] = getMenu()

    return {
        props: props,
        revalidate: 60
    }
}