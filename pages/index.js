import MediaQuery from 'react-responsive'
import Head from 'next/head'

import { getMenu, getGDPRBanner } from '../lib/api'

import Layout from '../components/layouts/globalTemplate'

import SideNav from '../components/navigation/sideNav'
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
      </Head>
      <section className="page container template-expanded-wide">
        <GDPRBanner {...gdpr_data} />
        <SideNav menu={menu} slug={[]} />
        <section className="content wide">
          <article>
            <H1>Welcome to Streamlit docs</H1>
            <p><a>Streamlit</a> is an open-source Python library that makes it easy to create and share beautiful, custom web apps for machine learning and data science. In just a few minutes you can build and deploy powerful data apps - so let’s get started!</p>

            <Spacer size="2rem" />

            <TileContainer>
              <Tile icon="arrow_forward" title="Get Started" text="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia." background="violet-70" link="/tutorials/get-started" />
              <Tile icon="dvr" title="API reference" text="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia." background="orange-70" link="/reference-guides/api-reference" />
              <Tile icon="description" title="Topic guides" text="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia." background="l-blue-70" link="/topic-guides" />
            </TileContainer>

            <H2 className='no-b-m'>What's new</H2>

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
            </NewsContainer>

            <H2>How to use our docs</H2>
            <InlineCalloutContainer>
              <InlineCallout color="violet-70" icon="school" bold="Tutorials" href="/tutorials">
                include our <next-link to="/tutorials/get-started">Get Started</next-link> guide and a few step-by-step examples to building different types of apps in Streamlit.
              </InlineCallout>
              <InlineCallout color="l-blue-70" icon="description" bold="Topic guides" href="/topic-guides">
                give you background on how different parts of Streamlit work. Make sure to check out the sections on <next-link to="/">Creating an app</next-link> and <next-link to="/">Deploying an app</next-link>, and for you advanced users who want to level up your apps, be sure to read up on <next-link to="/">Caching</next-link> and <next-link to="/components">Components</next-link>.
              </InlineCallout>
              <InlineCallout color="green-70" icon="code" bold="Cookbook" href="/cookbook">
                provides short code snippets that you can copy in for specific use cases.
              </InlineCallout>
              <InlineCallout color="orange-70" icon="menu_book" bold="Reference guides" href="/reference-guides">
                are the bread and butter of how our APIs and configuration files work and will give you short, actionable explanations of specific functions and features.
              </InlineCallout>
              <InlineCallout color="red-70" icon="question_answer" bold="Support" href="/support">
                are the bread and butter of how our APIs and configuration files work and will give you short, actionable explanations of specific functions and features.
              </InlineCallout>
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
            <ArrowLink link="/tutorials/get-started" type="next" content="Get Started" />
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