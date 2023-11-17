import React, { useState, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { getMenu, getGDPRBanner, getCookieSettings } from "../lib/api";

import Layout from "../components/layouts/globalTemplate";
import Footer from "../components/navigation/footer";

import SideBar from "../components/navigation/sideBar";
import ArrowLinkContainer from "../components/navigation/arrowLinkContainer";
import ArrowLink from "../components/navigation/arrowLink";

import GDPRBanner, {
  setTelemetryPreference,
} from "../components/utilities/gdpr";
import CookieSettingsModal from "../components/utilities/cookieSettingsModal";
import SocialCallouts from "../components/utilities/socialCallout";
import Spacer from "../components/utilities/spacer";

import SummaryTiles from "../components/summaryTiles";

import NewsContainer from "../components/layouts/newsContainer";
import InlineCalloutContainer from "../components/layouts/inlineCalloutContainer";
import TileContainer from "../components/layouts/tileContainer";
import RefCard from "../components/blocks/refCard";

import { H1, H2 } from "../components/blocks/headers";
import NewsFeed from "../components/blocks/newsFeed";
import Button from "../components/blocks/button";
import InlineCallout from "../components/blocks/inlineCallout";
import NoteSplit from "../components/blocks/noteSplit";

import { attributes } from "../content/index.md";

import styles from "../components/layouts/container.module.css";

export default function Home({ window, menu, gdpr_data, cookie_data }) {
  let { description } = attributes;

  const [isTelemetryModalVisible, setIsTelemetryModalVisible] = useState(false);
  const [isTelemetryBannerVisible, setIsTelemetryBannerVisible] =
    useState(false);
  const [insertTelemetryCode, setInsertTelemetryCode] = useState(false);

  const router = useRouter();

  const allowTelemetryAndCloseBanner = useCallback(() => {
    setIsTelemetryBannerVisible(false);
    setIsTelemetryModalVisible(false);
    setInsertTelemetryCode(true);
    setTelemetryPreference(true);
  }, [isTelemetryBannerVisible, insertTelemetryCode]);

  const declineTelemetryAndCloseBanner = useCallback(() => {
    setIsTelemetryBannerVisible(false);
    setIsTelemetryModalVisible(false);
    setInsertTelemetryCode(false);
    setTelemetryPreference(false);

    // If previous state was true, and now it's false, reload the page to remove telemetry JS
    if (insertTelemetryCode) router.reload();
  }, [isTelemetryBannerVisible, insertTelemetryCode]);

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
      {isTelemetryModalVisible && (
        <CookieSettingsModal
          {...cookie_data}
          setIsTelemetryModalVisible={setIsTelemetryModalVisible}
          allowTelemetryAndCloseBanner={allowTelemetryAndCloseBanner}
          declineTelemetryAndCloseBanner={declineTelemetryAndCloseBanner}
        />
      )}
      <GDPRBanner
        {...gdpr_data}
        isTelemetryModalVisible={isTelemetryModalVisible}
        setIsTelemetryModalVisible={setIsTelemetryModalVisible}
        isTelemetryBannerVisible={isTelemetryBannerVisible}
        setIsTelemetryBannerVisible={setIsTelemetryBannerVisible}
        insertTelemetryCode={insertTelemetryCode}
        setInsertTelemetryCode={setInsertTelemetryCode}
        allowTelemetryAndCloseBanner={allowTelemetryAndCloseBanner}
        declineTelemetryAndCloseBanner={declineTelemetryAndCloseBanner}
      />
      <section className={styles.Container}>
        <SideBar menu={menu} slug={[]} />
        <section className={styles.InnerContainer}>
          <article>
            <H1>Streamlit documentation</H1>
            <p>
              <a href="https://www.streamlit.io">Streamlit</a> is an open-source
              Python library that makes it easy to create and share beautiful,
              custom web apps for machine learning and data science. In just a
              few minutes you can build and deploy powerful data apps. So let's
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

            <H2>How to use our docs</H2>
            <InlineCalloutContainer>
              <InlineCallout
                color="red-70"
                icon="power_settings_new"
                bold="Get started"
                href="/get-started"
              >
                introduces you to the world of Streamlit! Learn the fundamental
                concepts, set up your development environment, and start coding!
              </InlineCallout>
              <InlineCallout
                color="violet-70"
                icon="description"
                bold="Streamlit library"
                href="/library/api-reference"
              >
                includes our API reference, and guides to all of Streamlit's
                features in the core library including caching, theming,
                Streamlit Components, and more!
              </InlineCallout>
              <InlineCallout
                color="l-blue-70"
                icon="cloud"
                bold="Streamlit Community Cloud"
                href="/streamlit-community-cloud"
              >
                is an open and free platform for the community to deploy,
                discover, and share Streamlit apps and code with each other.
                Create a new app, share it with the community, get feedback,
                iterate quickly with live code updates, and have an impact!
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

            <H2 className="no-b-m">What's new</H2>

            <TileContainer>
              <RefCard size="third" href="/library/api-reference/app-testing">
                <i className="material-icons-sharp">science</i>
                <h4>App testing</h4>
                <p>
                  Introducing a new testing framework for Streamlit apps! Build
                  automated tests for your CI workflows.
                </p>
              </RefCard>
              <RefCard
                size="third"
                href="/library/api-reference/connections/st.connection"
              >
                <i className="material-icons-sharp">account_tree</i>
                <h4>
                  <code>st.connection</code> is deexperimentalized!
                </h4>
                <p>
                  Announcing the general availability of{" "}
                  <code>st.connection</code>, a command to conveniently manage
                  connections in Streamlit apps.
                </p>
              </RefCard>
              <RefCard
                size="third"
                href="/library/api-reference/connections/st.connections.snowflakeconnection"
              >
                <i className="material-icons-sharp">ac_unit</i>
                <h4>
                  <code>SnowparkConnection</code> has been upgraded!
                </h4>
                <p>
                  <code>SnowflakeConnection</code> has all the same great
                  functionality <em>plus more!</em>
                </p>
              </RefCard>
              <RefCard
                size="third"
                href="/library/advanced-features/dataframes"
              >
                <i className="material-icons-sharp">construction</i>
                <h4>Dataframe toolbars</h4>
                <p>
                  <code>st.dataframe</code>and <code>st.data_editor</code> have
                  a new toolbar! Users can search and download data in addition
                  to enjoying improved UI for row additions and deletions.
                </p>
              </RefCard>
              <RefCard
                size="third"
                href="/library/api-reference/charts/st.scatter_chart"
              >
                <i className="material-icons-sharp">scatter_plot</i>
                <h4>Scatter chart</h4>
                <p>
                  Introducing <code>st.scatter_chart</code> — a new, simple
                  chart element to build scatter charts Streamlit-y fast and
                  easy!
                </p>
              </RefCard>
              <RefCard
                size="third"
                href="/library/api-reference/widgets/st.link_button"
              >
                <i className="material-icons-sharp">link</i>
                <h4>Link button</h4>
                <p>
                  Introducing <code>st.link_button</code>! Open an external link
                  in a new tab with a bit more pizazz than a plain-text link.
                </p>
              </RefCard>
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
                text="Do you need more control over cache invalidation? Any function annotated with @st.cache_data or @st.cache_resource gets its own clear() function automatically."
                link="/library/advanced-features/experimental-cache-primitives#clear-memo-and-singleton-caches-procedurally"
              /> */}
              {/* Preserve above comment for syntax reference */}
            </TileContainer>

            <H2 className="no-b-m">Latest blog posts</H2>

            <NewsContainer>
              <NewsFeed />

              <Button link="https://blog.streamlit.io/" target="_blank">
                View all updates
              </Button>
            </NewsContainer>

            <NoteSplit
              background="gray-20"
              title="Join the community"
              copy="Streamlit is more than just a way to make data apps, it's also a community of creators that share their apps and ideas and help each other make their work better. Please come join us on the community forum. We love to hear your questions, ideas, and help you work through your bugs — stop by today!"
              button={{
                text: "View forum",
                link: "https://discuss.streamlit.io",
                target: "_blank",
              }}
              image="/join.png"
            />
          </article>

          <SocialCallouts />

          <ArrowLinkContainer>
            <ArrowLink link="/get-started" type="next" content="Get started" />
          </ArrowLinkContainer>
        </section>
        <Footer setIsTelemetryModalVisible={setIsTelemetryModalVisible} />
      </section>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const props = {};
  props["menu"] = getMenu();
  props["gdpr_data"] = await getGDPRBanner();
  props["cookie_data"] = await getCookieSettings();

  return {
    props: props,
  };
}
