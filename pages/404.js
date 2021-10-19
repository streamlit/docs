import Head from 'next/head'
import { getMenu } from '../lib/api'
import Layout from '../components/layouts/globalTemplate'
import SideBar from '../components/navigation/sideBar'
import Spacer from '../components/utilities/spacer'
import SummaryTiles from '../components/summaryTiles'

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
                <SideBar menu={menu} slug={['404']} />
                <section className="content wide">
                    <article>
                        <h1>Page not found</h1>

                        <p>Try using the search bar, above, or check out one of the pages below:</p>

                        <SummaryTiles />
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
