import MediaQuery from 'react-responsive'
import Head from 'next/head'

import { getMenu, getGDPRBanner } from '../lib/api'

import Layout from '../components/layouts/globalTemplate'

import SideBar from '../components/navigation/sideBar'
import ArrowLinkContainer from '../components/navigation/arrowLinkContainer'
import ArrowLink from '../components/navigation/arrowLink'

import GDPRBanner from '../components/utilities/gdpr';
import SocialCallouts from '../components/utilities/socialCallout'
import Spacer from '../components/utilities/spacer'

import TileContainer from '../components/layouts/tileContainer'
import NewsContainer from '../components/layouts/newsContainer'
import InlineCalloutContainer from '../components/layouts/inlineCalloutContainer'

import { H1, H2 } from '../components/blocks/headers'
import Tile from '../components/blocks/tile'
import NewsEntry from '../components/blocks/newsEntry'
import Button from '../components/blocks/button'
import InlineCallout from '../components/blocks/inlineCallout'
import NoteSplit from '../components/blocks/noteSplit'

export default function Home({ window, menu, gdpr_data }) {

  return (
    <Layout window={window}>
      <Head>
        <title>Streamlit Docs</title>
        <link rel="icon" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon32.ico" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href={`https://${process.env.NEXT_PUBLIC_HOSTNAME}`} />
      </Head>
      <section className="page container template-expanded-wide">
        <GDPRBanner {...gdpr_data} />
        <SideBar menu={menu} slug={[]} />
        <section className="content wide">
          <article>
            <H1>Welcome to Streamlit docs</H1>
            <p><a>Streamlit</a> is an open-source Python library that makes it easy to create and share beautiful, custom web apps for machine learning and data science. In just a few minutes you can build and deploy powerful data apps - so let’s get started!</p>

            <Spacer size="2rem" />

            <TileContainer>
              <Tile icon="arrow_forward" title="Get Started" text="If you're new to Streamlit and don't know where to start, this is a good place." background="violet-70" link="/library/get-started" />
              <Tile icon="dvr" title="API Reference" text="Learn about our APIs, with actionable explanations of specific functions and features." background="violet-90" link="/library/api-reference" />
              <Tile icon="grid_view" title="App Gallery" text="Try out awesome apps created by our users, and curated from our forums or Twitter." background="orange-70" link="https://streamlit.io/gallery" />
            </TileContainer>

            {/* <H2 className='no-b-m'>What's new</H2>

            <TileContainer>
              <Tile size="half" background="unset" color="unset" dark={{ background: "unset", color: 'white', border_color: 'gray-90' }} border_color="gray-40" img="/logo.svg" title="Feature title" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend a facilisis sagittis, vitae nibh massa in facilisis et. Pretium eget non cursus purus tempus porta sodales." link="/tutorials/get-started" />
              <Tile size="half" background="unset" color="unset" dark={{ background: "unset", color: 'white', border_color: 'gray-90' }} border_color="gray-40" icon="visibility" title="Feature title" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend a facilisis sagittis, vitae nibh massa in facilisis et. Pretium eget non cursus purus tempus porta sodales." link="/tutorials/get-started" />
              <Tile size="half" background="unset" color="unset" dark={{ background: "unset", color: 'white', border_color: 'gray-90' }} border_color="gray-40" icon="edit" title="Feature title" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend a facilisis sagittis, vitae nibh massa in facilisis et. Pretium eget non cursus purus tempus porta sodales." link="/tutorials/get-started" />
              <Tile size="half" background="unset" color="unset" dark={{ background: "unset", color: 'white', border_color: 'gray-90' }} border_color="gray-40" img="/logo.svg" title="Feature title" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend a facilisis sagittis, vitae nibh massa in facilisis et. Pretium eget non cursus purus tempus porta sodales." link="/tutorials/get-started" />
            </TileContainer>

            <NewsContainer>
              <NewsEntry date="2021-05-12T16:30:00.000Z" title="Title" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend a facilisis sagittis, vitae nibh massa in facilisis et. Pretium eget non cursus purus tempus porta sodales." link="/" />
              <NewsEntry date="2021-04-07T16:08:45.000Z" title="Title" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend a facilisis sagittis, vitae nibh massa in facilisis et. Pretium eget non cursus purus tempus porta sodales." link="/" />
              <NewsEntry date="2021-01-12T16:30:00.000Z" title="Title" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend a facilisis sagittis, vitae nibh massa in facilisis et. Pretium eget non cursus purus tempus porta sodales." link="/" />
              <Button link="/updates">View all updates</Button>
            </NewsContainer> */}

            <H2>How to use our docs</H2>
            <InlineCalloutContainer>
              <InlineCallout color="violet-70" icon="description" bold="Streamlit Library" href="/library">
                includes our Get Started guide, API Reference, and more advanced features of the core library including caching, theming, and Streamlit components.
              </InlineCallout>
              <InlineCallout color="l-blue-70" icon="cloud" bold="Streamlit Cloud" href="/streamlit-cloud">
                empowers your data team to directly serve the needs of the rest of the company. Quickly go from data to app, from prototype to production. Share apps in one click and collaborate instantly with live code updates.
              </InlineCallout>
              <InlineCallout color="orange-70" icon="school" bold="Knowledge Base" href="/knowledge-base">
                is a self-serve library of tips, step-by-step tutorials, and articles that answer your questions about creating and deploying Streamlit apps.
              </InlineCallout>
              {/* <InlineCallout color="green-70" icon="code" bold="Cookbook" href="/cookbook">
                provides short code snippets that you can copy in for specific use cases.
              </InlineCallout>
              <InlineCallout color="red-70" icon="question_answer" bold="Support" href="/support">
                are the bread and butter of how our APIs and configuration files work and will give you short, actionable explanations of specific functions and features.
              </InlineCallout> */}
            </InlineCalloutContainer>

            <NoteSplit
              background="gray-20"
              title="Join the community"
              copy="Streamlit is more than just a way to make data apps, it’s also a community of creators that share their apps and ideas and help each other make their work better. Please come join us on the community forum. We love to hear your questions, ideas, and help you work through your bugs — stop by today!"
              button={{ text: 'View forum', link: 'https://discuss.streamlit.io' }}
              image="/join.png"
            />

          </article>

          <SocialCallouts />

          <ArrowLinkContainer>
            <ArrowLink link="/library/get-started" type="next" content="Get Started" />
          </ArrowLinkContainer>
        </section>
      </section>
    </Layout>
  )
}

export async function getStaticProps(context) {

  const props = {}
  props['menu'] = getMenu()
  props['gdpr_data'] = await getGDPRBanner()

  return {
    props: props,
    revalidate: 60
  }
}
