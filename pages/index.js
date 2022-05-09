import React from "react";
import classNames from "classnames";
import Head from "next/head";

import { getMenu, getGDPRBanner } from "../lib/api";

import Layout from "../components/layouts/globalTemplate";
import Footer from "../components/navigation/footer";

import SideBar from "../components/navigation/sideBar";
import ArrowLinkContainer from "../components/navigation/arrowLinkContainer";
import ArrowLink from "../components/navigation/arrowLink";

import GDPRBanner from "../components/utilities/gdpr";
import SocialCallouts from "../components/utilities/socialCallout";
import Spacer from "../components/utilities/spacer";

import SummaryTiles from "../components/summaryTiles";

import NewsContainer from "../components/layouts/newsContainer";
import InlineCalloutContainer from "../components/layouts/inlineCalloutContainer";
import TileContainer from "../components/layouts/tileContainer";
import Tile from "../components/blocks/tile";

import { H1, H2 } from "../components/blocks/headers";
import NewsEntry from "../components/blocks/newsEntry";
import Button from "../components/blocks/button";
import InlineCallout from "../components/blocks/inlineCallout";
import NoteSplit from "../components/blocks/noteSplit";

import { attributes } from "../content/index.md";

import styles from "../components/layouts/container.module.css";

export default function Home({ window, menu, gdpr_data }) {
  let { description } = attributes;

  return (
    <Layout window={window}>
      <Head>
        <title>Streamlit documentation</title>
        <link rel="icon" href="/favicon.svg" />
        <link rel="alternate icon" href="/favicon32.ico" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="canonical"
          href={`https://${process.env.NEXT_PUBLIC_HOSTNAME}`}
        />
        <meta content="Streamlit Docs" property="og:title" />
        <meta content="Streamlit Docs" name="twitter:title" />
        {description && (
          <React.Fragment>
            <meta content={description} name="description" />
            <meta content={description} property="og:description" />
            <meta content={description} name="twitter:description" />
          </React.Fragment>
        )}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://docs.streamlit.io/" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta
          property="og:image"
          content={`https://${process.env.NEXT_PUBLIC_HOSTNAME}/sharing-image-facebook.jpg`}
        />
        <meta
          name="twitter:image"
          content={`https://${process.env.NEXT_PUBLIC_HOSTNAME}/sharing-image-twitter.jpg`}
        />
      </Head>
      <GDPRBanner {...gdpr_data} />
      <section className={styles.Container}>
        <SideBar menu={menu} slug={[]} />
        <section className={styles.InnerContainer}>
          <article>
            <H1>Streamlit documentation</H1>
            <p>
              <a href="https://www.streamlit.io">Streamlit</a> is an open-source
              Python library that makes it easy to create and share beautiful,
              custom web apps for machine learning and data science. In just a
              few minutes you can build and deploy powerful data apps. So let’s
              get started!
            </p>

            <Spacer size="2rem" />

            <SummaryTiles />

            {/* <H2 className='no-b-m'>What's new</H2>

            <TileContainer>
              <Tile size="half" background="unset" color="unset" dark={{ background: "unset", color: 'white', border_color: 'gray-90' }} border_color="gray-40" img="/logo.svg" title="Feature title" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend a facilisis sagittis, vitae nibh massa in facilisis et. Pretium eget non cursus purus tempus porta sodales." link="/tutorials/get-started" />
              <Tile size="half" background="unset" color="unset" dark={{ background: "unset", color: 'white', border_color: 'gray-90' }} border_color="gray-40" icon="visibility" title="Feature title" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend a facilisis sagittis, vitae nibh massa in facilisis et. Pretium eget non cursus purus tempus porta sodales." link="/tutorials/get-started" />
              <Tile size="half" background="unset" color="unset" dark={{ background: "unset", color: 'white', border_color: 'gray-90' }} border_color="gray-40" icon="edit" title="Feature title" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend a facilisis sagittis, vitae nibh massa in facilisis et. Pretium eget non cursus purus tempus porta sodales." link="/tutorials/get-started" />
              <Tile size="half" background="unset" color="unset" dark={{ background: "unset", color: 'white', border_color: 'gray-90' }} border_color="gray-40" img="/logo.svg" title="Feature title" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend a facilisis sagittis, vitae nibh massa in facilisis et. Pretium eget non cursus purus tempus porta sodales." link="/tutorials/get-started" />
            </TileContainer> */}

            {/* <NewsContainer>
              <NewsEntry
                date="2022-02-20T16:30:00.000Z"
                title="Announcement: Streamlit Cloud Maintenance"
                text="Streamlit Cloud will have a maintenance event on Sunday, February 20th at 7:00 am PST. The maintenance event will last for no more than 5 minutes."
                link="https://discuss.streamlit.io/c/official-announcements/"
              />
              <NewsEntry date="2022-02-17T16:08:45.000Z" title="Calculating distances in cosmology with Streamlit" text="Learn how three friends made the cosmology on-the-go app CosmΩracle." link="https://blog.streamlit.io/calculating-distances-in-cosmology-with-streamlit/" />
              <NewsEntry date="2021-02-07T16:30:00.000Z" title="Monthly Rewind > January 2022" text="Your January look-back at new features and great community content." link="https://blog.streamlit.io/monthly-rewind-january-2022/" />
              <Button link="https://blog.streamlit.io/">View all updates</Button>
            </NewsContainer> */}

            <H2>How to use our docs</H2>
            <InlineCalloutContainer>
              <InlineCallout
                color="violet-70"
                icon="description"
                bold="Streamlit library"
                href="/library/get-started"
              >
                includes our Get started guide, API reference, and more advanced
                features of the core library including caching, theming, and
                Streamlit Components.
              </InlineCallout>
              <InlineCallout
                color="l-blue-70"
                icon="cloud"
                bold="Streamlit Cloud"
                href="/streamlit-cloud"
              >
                empowers your data team to directly serve the needs of the rest
                of the company. Quickly go from data to app, from prototype to
                production. Share apps in one click and collaborate instantly
                with live code updates.
              </InlineCallout>
              <InlineCallout
                color="orange-70"
                icon="school"
                bold="Knowledge base"
                href="/knowledge-base"
              >
                is a self-serve library of tips, step-by-step tutorials, and
                articles that answer your questions about creating and deploying
                Streamlit apps.
              </InlineCallout>
              {/* <InlineCallout color="green-70" icon="code" bold="Cookbook" href="/cookbook">
                provides short code snippets that you can copy in for specific use cases.
              </InlineCallout>
              <InlineCallout color="red-70" icon="question_answer" bold="Support" href="/support">
                are the bread and butter of how our APIs and configuration files work and will give you short, actionable explanations of specific functions and features.
              </InlineCallout> */}
            </InlineCalloutContainer>

            <NewsContainer>
              <NewsEntry
                date="2022-05-03T16:05:00.000Z"
                title="Wissam Siblini uses Streamlit for pathology detection in chest radiographs"
                text="Learn how Wissam detected thoracic pathologies in medical images."
                link="https://blog.streamlit.io/wissam-siblini-uses-streamlit-for-pathology-detection-in-chest-radiographs/"
              />
              <NewsEntry
                date="2022-04-28T16:05:00.000Z"
                title="The Stable solves its data scalability problem with Streamlit"
                text="How Mark von Oven of The Stable helped his Analytics team go from idea to app in just a few days."
                link="https://blog.streamlit.io/the-stable-solves-its-data-scalability-problem-with-streamlit/"
              />
              <NewsEntry
                date="2022-04-21T16:05:00.000Z"
                title="How to build a real-time live dashboard with Streamlit"
                text="5 easy steps to make your own data dashboard."
                link="https://blog.streamlit.io/how-to-build-a-real-time-live-dashboard-with-streamlit/"
              />
              <Button link="https://blog.streamlit.io/">
                View all updates
              </Button>
            </NewsContainer>

            <H2 className="no-b-m">What's new</H2>

            <TileContainer>
              <Tile
                size="half"
                background="unset"
                color="unset"
                dark={{
                  background: "unset",
                  color: "white",
                  border_color: "gray-90",
                }}
                border_color="gray-40"
                icon="photo_camera"
                title="st.camera_input"
                text="You can now upload images to your apps straight from your camera with the new st.camera_input feature. It's great for computer vision apps."
                link="/library/api-reference/widgets/st.camera_input"
              />
              <Tile
                size="half"
                background="unset"
                color="unset"
                dark={{
                  background: "unset",
                  color: "white",
                  border_color: "gray-90",
                }}
                border_color="gray-40"
                icon="login"
                title="Sign in with email"
                text="You can now sign in to Streamlit Cloud by using an email! Read more about how to use this feature in our docs."
                link="/streamlit-cloud/get-started#log-in-to-sharestreamlitio"
              />
              <Tile
                size="half"
                background="unset"
                color="unset"
                dark={{
                  background: "unset",
                  color: "white",
                  border_color: "gray-90",
                }}
                border_color="gray-40"
                icon="star"
                title="App favoriting"
                text="Streamlit Cloud supports a 'favorite' feature that lets you quickly access your apps from the app dashboard. Favorited apps appear with a yellow star ⭐ beside them."
                link="/streamlit-cloud/get-started/manage-your-app#app-favoriting"
              />
              <Tile
                size="half"
                background="unset"
                color="unset"
                dark={{
                  background: "unset",
                  color: "white",
                  border_color: "gray-90",
                }}
                border_color="gray-40"
                icon="expand_more"
                title="Expand and collapse JSON elements with kwarg"
                text="st.json now supports a keyword-only argument, expanded, on whether the JSON should be expanded by default (defaults to True)."
                link="/library/api-reference/data/st.json"
              />
              {/* <Tile
                size="half"
                background="unset"
                color="unset"
                dark={{
                  background: "unset",
                  color: "white",
                  border_color: "gray-90",
                }}
                border_color="gray-40"
                img="/logo.svg"
                title="Clear memo + singleton caches procedurally"
                text="Do you need more control over cache invalidation? Any function annotated with @st.experimental_memo or @st.experimental_singleton gets its own clear() function automatically."
                link="/library/advanced-features/experimental-cache-primitives#clear-memo-and-singleton-caches-procedurally"
              /> */}
            </TileContainer>

            <NoteSplit
              background="gray-20"
              title="Join the community"
              copy="Streamlit is more than just a way to make data apps, it's also a community of creators that share their apps and ideas and help each other make their work better. Please come join us on the community forum. We love to hear your questions, ideas, and help you work through your bugs — stop by today!"
              button={{
                text: "View forum",
                link: "https://discuss.streamlit.io",
              }}
              image="/join.png"
            />
          </article>

          <SocialCallouts />

          <ArrowLinkContainer>
            <ArrowLink
              link="/library/get-started"
              type="next"
              content="Get started"
            />
          </ArrowLinkContainer>
        </section>
        <Footer />
      </section>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const props = {};
  props["menu"] = getMenu();
  props["gdpr_data"] = await getGDPRBanner();

  return {
    props: props,
    revalidate: 60,
  };
}
