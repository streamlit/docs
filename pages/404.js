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
                            <Tile icon="arrow_forward" title="Get Started" text="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia." background="violet-70" link="/tutorials/get-started" />
                            <Tile icon="dvr" title="API reference" text="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia." background="orange-70" link="/reference-guides/api-reference" />
                            <Tile icon="description" title="Topic guides" text="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia." background="l-blue-70" link="/topic-guides" />
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