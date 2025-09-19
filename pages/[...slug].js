import fs from "fs";
import { basename } from "path";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import Head from "next/head";
import { serialize } from "next-mdx-remote/serialize";
import { MDXProvider } from "@mdx-js/react";
import { MDXRemote } from "next-mdx-remote";
import matter from "gray-matter";
import remarkUnwrapImages from "remark-unwrap-images";
import remarkGfm from "remark-gfm";
import classNames from "classnames";
import { useRouter } from "next/router";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

// Site Components
import { looksLikeVersionAndPlatformString } from "../lib/next/utils";
import CookieSettingsModal from "../components/utilities/cookieSettingsModal";
import GDPRBanner, {
  setTelemetryPreference,
} from "../components/utilities/gdpr";
import {
  getArticleSlugs,
  getArticleSlugFromString,
  getMenu,
} from "../lib/node/api";
import { getPreviousNextFromMenu } from "../lib/next/utils";
import {
  getVersionAndPlatformFromPathPart,
  getVersionAndPlatformString,
  useVersionContext,
} from "../lib/next/VersionContext";
import Layout from "../components/layouts/globalTemplate";
import Footer from "../components/navigation/footer";
import BreadCrumbs from "../components/utilities/breadCrumbs";
import SideBar from "../components/navigation/sideBar";
import Masonry from "../components/layouts/masonry";
import TileContainer from "../components/layouts/tileContainer";
import DataSourcesContainer from "../components/layouts/dataSourcesContainer";
import InlineCalloutContainer from "../components/layouts/inlineCalloutContainer";

import ArrowLinkContainer from "../components/navigation/arrowLinkContainer";
import ArrowLink from "../components/navigation/arrowLink";
import Helpful from "../components/utilities/helpful";
import { H1, H2, H3 } from "../components/blocks/headers";
import Psa from "../components/utilities/psa";
import FloatingNav from "../components/utilities/floatingNav";

// MDX Components
import Autofunction from "../components/blocks/autofunction";
import Code from "../components/blocks/code";
import CodeTile from "../components/blocks/codeTile";
import Collapse from "../components/blocks/collapse";
import Download from "../components/utilities/download";
import Flex from "../components/layouts/flex";
import IconLink from "../components/blocks/iconLink.js";
import Image from "../components/blocks/image";
import Deprecation from "../components/blocks/deprecation";
import Important from "../components/blocks/important";
import Note from "../components/blocks/note";
import NoteSplit from "../components/blocks/noteSplit";
import RefCard from "../components/blocks/refCard";
import ComponentSlider from "../components/blocks/componentSlider";
import ComponentCard from "../components/blocks/componentCard";
import DataSourcesCard from "../components/blocks/dataSourcesCard";
import Tile from "../components/blocks/tile";
import InlineCallout from "../components/blocks/inlineCallout";
import Tip from "../components/blocks/tip";
import Warning from "../components/blocks/warning";
import YouTube from "../components/blocks/youTube";
import Cloud from "../components/blocks/cloud";
import SnowflakeTrial from "../components/blocks/snowflakeTrial";

import styles from "../components/layouts/container.module.css";

const DOCSTRINGS =
  serverRuntimeConfig.DOCSTRINGS ?? publicRuntimeConfig.DOCSTRINGS;
const VERSIONS_LIST =
  serverRuntimeConfig.VERSIONS_LIST ?? publicRuntimeConfig.VERSIONS_LIST;
const LATEST_VERSION =
  serverRuntimeConfig.LATEST_VERSION ?? publicRuntimeConfig.LATEST_VERSION;
const DEFAULT_VERSION =
  serverRuntimeConfig.DEFAULT_VERSION ?? publicRuntimeConfig.DEFAULT_VERSION;

const PLATFORM_NOTES =
  serverRuntimeConfig.PLATFORM_NOTES ?? publicRuntimeConfig.PLATFORM_NOTES;
const PLATFORM_VERSIONS =
  serverRuntimeConfig.PLATFORM_VERSIONS ??
  publicRuntimeConfig.PLATFORM_VERSIONS;
const PLATFORM_LATEST_VERSIONS =
  serverRuntimeConfig.PLATFORM_LATEST_VERSIONS ??
  publicRuntimeConfig.PLATFORM_LATEST_VERSIONS;
const DEFAULT_PLATFORM =
  serverRuntimeConfig.DEFAULT_PLATFORM ?? publicRuntimeConfig.DEFAULT_PLATFORM;

export default function Article({
  data,
  source,
  docstrings,
  notes,
  slug,
  menu,
  currMenuItem,
  prevMenuItem,
  nextMenuItem,
  versionFromSlug,
  platformFromSlug,
  filename,
}) {
  const router = useRouter();

  let versionWarning;
  let currentLink;

  const [isTelemetryModalVisible, setIsTelemetryModalVisible] = useState(false);
  const [isTelemetryBannerVisible, setIsTelemetryBannerVisible] =
    useState(false);
  const [insertTelemetryCode, setInsertTelemetryCode] = useState(false);

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

  const { version, platform, goToLatest, goToOpenSource } = useVersionContext();
  const isVersionedPage = currMenuItem && currMenuItem.isVersioned;
  const isUnversionedURL = !versionFromSlug || !platformFromSlug;
  const contextIsDefault =
    version == DEFAULT_VERSION && platform == DEFAULT_PLATFORM;
  // Reroute to the version in context if needed
  if (isVersionedPage && isUnversionedURL && !contextIsDefault) {
    const versionAndPlatformString = getVersionAndPlatformString(
      version,
      platform,
    );
    const urlParts = router.asPath.split("#")[0].split("/");
    urlParts.shift(); // Remove spare item that comes from the leading slash.
    urlParts.unshift(versionAndPlatformString);
    router.replace(`/${urlParts.join("/")}`);
    return;
  }

  const components = {
    Note,
    NoteSplit,
    Tip,
    Deprecation,
    Important,
    Code,
    Collapse,
    Warning,
    YouTube,
    Cloud,
    Masonry,
    CodeTile,
    IconLink,
    InlineCalloutContainer,
    InlineCallout,
    TileContainer,
    Tile,
    RefCard,
    ComponentCard,
    ComponentSlider,
    DataSourcesContainer,
    DataSourcesCard,
    Image,
    Download,
    Flex,
    SnowflakeTrial,
    Autofunction: (props) => (
      <Autofunction
        {...props}
        streamlitFunction={props.function}
        docstrings={docstrings}
        version={version}
        slug={slug}
        oldStreamlitFunction={props.oldName ?? ""}
        goToLatest={goToLatest}
      />
    ),
    pre: (props) => <Code {...props} />,
    h1: H1,
    h2: H2,
    h3: H3,
    a: ({ ...props }) => <Link href={props.href}>{props.children}</Link>,
    // iframe : WrappedIFrame
  };

  let previousArrow;
  let nextArrow;
  let arrowContainer;
  let keywordsTag;

  if (version != DEFAULT_VERSION && currMenuItem.isVersioned) {
    // Slugs don't have the version number, so we just have to join them.
    currentLink = `/${slug.join("/")}`;
    versionWarning = (
      <Warning>
        <p>
          You are reading the documentation for Streamlit version {version}, but{" "}
          <Link href={currentLink} onClick={goToLatest}>
            {LATEST_VERSION}
          </Link>{" "}
          is the latest version available.
        </p>
      </Warning>
    );
  }

  if (prevMenuItem) {
    previousArrow = (
      <ArrowLink
        link={prevMenuItem.url}
        type="back"
        content={prevMenuItem.name}
      />
    );
  }

  if (nextMenuItem) {
    nextArrow = (
      <ArrowLink
        link={nextMenuItem.url}
        type="next"
        content={nextMenuItem.name}
      />
    );
  }

  if (nextMenuItem || prevMenuItem) {
    arrowContainer = (
      <ArrowLinkContainer>
        {previousArrow}
        {nextArrow}
      </ArrowLinkContainer>
    );
  }

  if (data.keywords) {
    keywordsTag = <meta name="keywords" content={data.keywords} />;
  }

  return (
    <MDXProvider
      components={{
        // Override some default Markdown components.
        img: Image,
      }}
    >
      <Layout>
        {isTelemetryModalVisible && (
          <CookieSettingsModal
            setIsTelemetryModalVisible={setIsTelemetryModalVisible}
            allowTelemetryAndCloseBanner={allowTelemetryAndCloseBanner}
            declineTelemetryAndCloseBanner={declineTelemetryAndCloseBanner}
          />
        )}
        <GDPRBanner
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
          <SideBar slug={slug} menu={menu} />
          <Head>
            <title>{data.title + " - Streamlit Docs"}</title>
            <link rel="icon" href="/favicon.svg" />
            <link rel="alternate icon" href="/favicon32.ico" />
            <meta name="theme-color" content="#ffffff" />
            {keywordsTag}
            {version != DEFAULT_VERSION || platform != DEFAULT_PLATFORM ? (
              <link
                rel="canonical"
                href={`https://${process.env.NEXT_PUBLIC_HOSTNAME}/${slug
                  .slice(1)
                  .join("/")}`}
              />
            ) : (
              <link
                rel="canonical"
                href={`https://${process.env.NEXT_PUBLIC_HOSTNAME}/${slug.join(
                  "/",
                )}`}
              />
            )}
            <meta
              content={`${data.title} - Streamlit Docs`}
              property="og:title"
            />
            <meta
              content={`${data.title} - Streamlit Docs`}
              name="twitter:title"
            />
            {data.description && (
              <React.Fragment>
                <meta content={data.description} name="description" />
                <meta content={data.description} property="og:description" />
                <meta content={data.description} name="twitter:description" />
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
          <section className={styles.InnerContainer} id="documentation">
            {versionWarning}
            <BreadCrumbs slug={slug} menu={menu} />
            <article
              id="content-container"
              className={classNames("leaf-page", styles.ArticleContainer)}
            >
              <FloatingNav slug={slug} menu={menu} />
              <div className={classNames("content", styles.ContentContainer)}>
                <MDXRemote {...source} components={components} />
                {arrowContainer}
                <Psa />
              </div>
            </article>
          </section>
          <Footer setIsTelemetryModalVisible={setIsTelemetryModalVisible} />
        </section>
      </Layout>
    </MDXProvider>
  );
}

function getFunctionSubset(allFunctionsInVerion, functionsOnPage) {
  const docstrings = {};
  for (const func of functionsOnPage) {
    if (allFunctionsInVerion[func]) {
      docstrings[func] = allFunctionsInVerion[func];
    }
  }
  return docstrings;
}

export async function getStaticProps(context) {
  const paths = await getStaticPaths();
  const props = {};
  let location = `/${context.params.slug.join("/")}`;
  const menu = getMenu();

  props["docstrings"] = {};
  props["notes"] = {};
  props["versionFromSlug"] = null;
  props["platformFromSlug"] = null;

  if ("slug" in context.params) {
    let filename;

    paths.paths.forEach((obj) => {
      if (obj.params.location == location) {
        filename = obj.params.fileName;
      }
    });

    // Get the last element of the array to find the MD file
    const fileContents = fs.readFileSync(filename, "utf8");
    const { data, content } = matter(fileContents);
    const shouldVersion = /<Autofunction(.*?)\/>/gi.test(fileContents);
    if (shouldVersion) {
      const autofunctions = fileContents.matchAll(/<Autofunction(.*?)\/>/gi);
      // Build list of functions that are on the page
      const functions = new Set();
      for (const match of autofunctions) {
        // For each Autofunction on the page
        // Add the main function to the list
        const mainFunction = match[0]
          .match(/ function="(.*?)" /gi)[0]
          .match(/"(.*?)"/gi)[0];
        functions.add(mainFunction.slice(1, -1));
        // If an old function name is present, add it to the list, too
        if (/ oldName="(.*?)" /gi.test(match)) {
          const oldFunction = match[0]
            .match(/ oldName="(.*?)" /gi)[0]
            .match(/"(.*?)"/gi)[0];
          functions.add(oldFunction.slice(1, -1));
        }
      }

      if (looksLikeVersionAndPlatformString(context.params.slug[0])) {
        const [version, platform] = getVersionAndPlatformFromPathPart(
          context.params.slug[0],
        );

        props.versionFromSlug = version;
        props.platformFromSlug = platform;
        if (version == DEFAULT_VERSION) {
          // Version is "latest"
          if (platform == DEFAULT_PLATFORM) {
            // Platform is "oss"
            props.docstrings = getFunctionSubset(
              DOCSTRINGS[LATEST_VERSION],
              functions,
            );
          } else {
            // Other platform (which can have a different latest version than oss)
            props.docstrings = getFunctionSubset(
              DOCSTRINGS[PLATFORM_LATEST_VERSIONS[platform]],
              functions,
            );
          }
        } else {
          // Version is numeric
          props.docstrings = getFunctionSubset(DOCSTRINGS[version], functions);
        }
        if (Object.keys(PLATFORM_VERSIONS).includes(platform)) {
          if (version == DEFAULT_VERSION) {
            props.notes =
              PLATFORM_NOTES[platform][PLATFORM_LATEST_VERSIONS[platform]];
          } else if (PLATFORM_VERSIONS[platform].includes(version)) {
            props.notes = PLATFORM_NOTES[platform][version];
          }
        }
        location = `/${context.params.slug.slice(1).join("/")}`;
      } else {
        props.docstrings = getFunctionSubset(
          DOCSTRINGS[LATEST_VERSION],
          functions,
        );
      }
    }

    const source = await serialize(content, {
      scope: data,
      mdxOptions: {
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        remarkPlugins: [remarkUnwrapImages, remarkGfm],
      },
    });

    const { current, prev, next } = getPreviousNextFromMenu(menu, location);

    // Determine which previous/next links we should be using, the override option coming from the markdown file (if it exists),
    // or the one that gets generated automatically above by calling getPreviousNextFromMenu
    let prevMenuItem;
    if (data.previousLink && data.previousTitle) {
      prevMenuItem = {
        name: data.previousTitle,
        url: data.previousLink,
      };
    } else {
      prevMenuItem = prev;
    }

    let nextMenuItem;
    if (data.nextLink && data.nextTitle) {
      nextMenuItem = {
        name: data.nextTitle,
        url: data.nextLink,
      };
    } else {
      nextMenuItem = next;
    }

    props["menu"] = menu;
    props["data"] = data;
    props["filename"] = filename;
    props["slug"] = context.params.slug;
    props["source"] = source;
    props["currMenuItem"] = current
      ? {
          name: current.name,
          url: current.url,
          isVersioned: !!current.isVersioned,
        }
      : null;
    props["prevMenuItem"] = prevMenuItem ? prevMenuItem : null;
    props["nextMenuItem"] = nextMenuItem ? nextMenuItem : null;
  }

  return {
    props: props,
  };
}

export async function getStaticPaths() {
  // Build up paths based on slugified categories for all docs
  const articles = getArticleSlugs();
  const paths = [];

  // Load each file and map a path
  for (const index in articles) {
    let slug = basename(articles[index]).replace(/\.md$/, "");
    let realSlug = [slug];
    slug = `/${slug}`;
    const fileContents = fs.readFileSync(articles[index], "utf8");
    const { data } = matter(fileContents);

    // Use slug instead of Category if it's present
    if ("slug" in data) {
      slug = data.slug;
      realSlug = data.slug.split("/").map(getArticleSlugFromString);
      realSlug.shift();
    }

    let path = {
      params: {
        slug: realSlug,
        location: slug,
        fileName: articles[index],
        title: data.title ? data.title : "Untitled",
        description: data.description ? data.description : "",
      },
    };

    paths.push(path); // Unversioned page

    // If the file uses Autofunction, we need to version it.
    const shouldVersion = /<Autofunction(.*?)\/>/gi.test(fileContents);
    if (shouldVersion) {
      for (const platform of [DEFAULT_PLATFORM].concat(
        Object.keys(PLATFORM_VERSIONS),
      )) {
        for (const version of VERSIONS_LIST) {
          let versionAndPlatform =
            platform == DEFAULT_PLATFORM ? version : `${version}-${platform}`;
          if (
            platform != DEFAULT_PLATFORM &&
            version == PLATFORM_LATEST_VERSIONS[platform]
          ) {
            versionAndPlatform = `latest-${platform}`;
          }
          if (platform == DEFAULT_PLATFORM && version == LATEST_VERSION) {
            // versionAndPlatform = "latest";
            continue;
          }
          if (
            platform != DEFAULT_PLATFORM &&
            !PLATFORM_VERSIONS[platform].includes(version)
          ) {
            continue;
          }

          const versionLocation = `/${versionAndPlatform}${slug}`;
          const newSlug = [...realSlug];

          newSlug.unshift(versionAndPlatform);

          path = {
            params: {
              slug: newSlug,
              location: versionLocation,
              fileName: articles[index],
              title: data.title ? data.title : "Untitled",
              description: data.description ? data.description : "",
            },
          };
          paths.push(path);
        }
      }
    }
  }

  return {
    paths: paths,
    fallback: false,
  };
}
