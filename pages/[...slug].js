import fs from "fs";
import { join, basename } from "path";
import sortBy from "lodash/sortBy";
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
const { serverRuntimeConfig } = getConfig();

// Site Components
import CookieSettingsModal from "../components/utilities/cookieSettingsModal";
import GDPRBanner, {
  setTelemetryPreference,
} from "../components/utilities/gdpr";
import { getArticleSlugs, getArticleSlugFromString, getMenu } from "../lib/api";
import { getPreviousNextFromMenu } from "../lib/utils.js";
import useVersion from "../lib/useVersion.js";
import { useAppContext } from "../context/AppContext";
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

const VERSIONS_LIST = serverRuntimeConfig.VERSIONS_LIST;
const LATEST_VERSION = serverRuntimeConfig.LATEST_VERSION;
const DEFAULT_VERSION = serverRuntimeConfig.DEFAULT_VERSION;

const PLATFORM_VERSIONS = serverRuntimeConfig.PLATFORM_VERSIONS;
const PLATFORM_LATEST_VERSIONS = serverRuntimeConfig.PLATFORM_LATEST_VERSIONS;
const DEFAULT_PLATFORM = serverRuntimeConfig.DEFAULT_PLATFORM;

export default function Article({
  data,
  source,
  docstrings,
  slug,
  menu,
  currMenuItem,
  prevMenuItem,
  nextMenuItem,
  versionFromStaticLoad,
  versions,
  filename,
}) {
  let versionWarning;
  let currentLink;
  let suggestEditURL;
  const { sourceFile } = useAppContext();

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

  suggestEditURL =
    Object.keys(docstrings).length > 0 && sourceFile
      ? sourceFile
      : "https://github.com/streamlit/docs/tree/main" +
        filename.substring(filename.indexOf("/content/"));
  const maxVersion = versions[versions.length - 1];
  const version = useVersion(versionFromStaticLoad, versions, currMenuItem);

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
        versions={versions}
        slug={slug}
        oldStreamlitFunction={props.oldName ?? ""}
      />
    ),
    pre: (props) => <Code {...props} />,
    h1: H1,
    h2: H2,
    h3: H3,
    // iframe : WrappedIFrame
  };

  let previousArrow;
  let nextArrow;
  let arrowContainer;
  let keywordsTag;

  if (version && version != maxVersion && currMenuItem.isVersioned) {
    // Slugs don't have the version number, so we just have to join them.
    currentLink = `/${slug.join("/")}`;
    versionWarning = (
      <Warning>
        {version && version.startsWith("SiS") ? (
          <p>
            You are reading the documentation for Streamlit in Snowflake. For
            open-source Streamlit, version{" "}
            <Link href={currentLink}>{maxVersion}</Link> is the latest version
            available.
          </p>
        ) : (
          <p>
            You are reading the documentation for Streamlit version {version},
            but <Link href={currentLink}>{maxVersion}</Link> is the latest
            version available.
          </p>
        )}
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
            {version ? (
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
            <BreadCrumbs slug={slug} menu={menu} version={version} />
            <article
              id="content-container"
              className={classNames("leaf-page", styles.ArticleContainer)}
            >
              <FloatingNav slug={slug} menu={menu} version={version} />
              <div className={classNames("content", styles.ContentContainer)}>
                <MDXRemote {...source} components={components} />
                {arrowContainer}
                <Psa />
                {/*<Helpful slug={slug} sourcefile={suggestEditURL} />*/}
              </div>
            </article>
          </section>
          <Footer setIsTelemetryModalVisible={setIsTelemetryModalVisible} />
        </section>
      </Layout>
    </MDXProvider>
  );
}

export function getFunctionSubset(allFunctionsInVerions, functionsOnPage) {
  const docstrings = {};
  for (const func of functionsOnPage) {
    if (allFunctionsInVerions[func]) {
      docstrings[func] = allFunctionsInVerions[func];
    }
  }
  return docstrings;
}

//TODO: Move version helpers to version context
// Verion helper one
export function looksLikeVersionAndPlatformString(urlPart) {
  const platforms = [DEFAULT_PLATFORM].concat(
    Object.keys(serverRuntimeConfig.PLATFORM_VERSIONS), //Use public when moved to context
  );

  // docs.streamlit.io/1.23.0/path1/path2
  const isPureVersion = /^[\d\.]+$/.test(urlPart);
  if (isPureVersion) return true;

  // docs.streamlit.io/1.23.0-sis/path1/path2
  const versionPlatformRegex = RegExp(`^[\\d\\.]+-(${platforms.join("|")})$`);
  const isVersionWithPlatform = versionPlatformRegex.test(urlPart);
  if (isVersionWithPlatform) return true;

  // docs.streamlit.io/latest-sis/path1/path2
  const latestPlatformRegex = RegExp(`^latest-(${platforms.join("|")})$`);
  const isLatestPlatform = latestPlatformRegex.test(urlPart);
  if (isLatestPlatform) return true;

  return false;
}

// Version helper two
export function getVersionAndPlatformFromPathPart(pathPart) {
  if (!looksLikeVersionAndPlatformString(pathPart)) {
    return [DEFAULT_VERSION, DEFAULT_PLATFORM];
  }

  const [version, platform] = pathPart.split("-");
  const cleanedPlatform = platform ?? DEFAULT_PLATFORM;

  return [version, cleanedPlatform];
}

export async function getStaticProps(context) {
  const paths = await getStaticPaths();
  const props = {};
  let location = `/${context.params.slug.join("/")}`;
  const menu = getMenu();

  props["docstrings"] = {};
  props["notes"] = {};
  props["versions"] = VERSIONS_LIST;
  props["snowflakeVersions"] = PLATFORM_VERSIONS;
  props["versionFromStaticLoad"] = DEFAULT_VERSION;
  props["platformFromStaticLoad"] = DEFAULT_PLATFORM;

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
    if (/<Autofunction(.*?)\/>/gi.test(fileContents)) {
      const autofunctions = fileContents.matchAll(/<Autofunction(.*?)\/>/gi);
      const functions = new Set();
      for (const match of autofunctions) {
        const mainFunction = match[0]
          .match(/ function="(.*?)" /gi)[0]
          .match(/"(.*?)"/gi)[0];
        functions.add(mainFunction.slice(1, -1));
        if (/ oldName="(.*?)" /gi.test(match)) {
          const oldFunction = match[0]
            .match(/ oldName="(.*?)" /gi)[0]
            .match(/"(.*?)"/gi)[0];
          functions.add(oldFunction.slice(1, -1));
        }
      }
      props.docstrings = getFunctionSubset(
        serverRuntimeConfig.DOCSTRINGS[LATEST_VERSION],
        functions,
      );

      if (looksLikeVersionAndPlatformString(context.params.slug[0])) {
        const [version, platform] = getVersionAndPlatformFromPathPart(
          context.params.slug[0],
        );

        props.versionFromStaticLoad = version;
        props.platformFromStaticLoad = platform;
        props.docstrings =
          version != DEFAULT_VERSION // Not "latest"
            ? getFunctionSubset(
                serverRuntimeConfig.DOCSTRINGS[version],
                functions,
              )
            : platform != DEFAULT_PLATFORM
              ? getFunctionSubset(
                  serverRuntimeConfig.DOCSTRINGS[
                    PLATFORM_LATEST_VERSIONS[platform]
                  ],
                  functions,
                )
              : getFunctionSubset(
                  serverRuntimeConfig.DOCSTRINGS[LATEST_VERSION],
                  functions,
                );
        if (Object.keys(PLATFORM_VERSIONS).includes(platform)) {
          props.notes =
            version != DEFAULT_VERSION &&
            PLATFORM_VERSIONS[platform].includes(version)
              ? serverRuntimeConfig.PLATFORM_NOTES[platform][version]
              : version == DEFAULT_VERSION
                ? serverRuntimeConfig.PLATFORM_NOTES[platform][
                    PLATFORM_LATEST_VERSIONS[platform]
                  ]
                : {};
        }
        location = `/${context.params.slug.slice(1).join("/")}`;
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

    paths.push(path); // Unversioned page, which is the latest OSS page

    // If the file uses Autofunction, we need to version it.
    const should_version = /<Autofunction(.*?)\/>/gi.test(fileContents);
    if (should_version) {
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
