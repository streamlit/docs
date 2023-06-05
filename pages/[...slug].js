import fs from "fs";
import { join, basename } from "path";
import sortBy from "lodash/sortBy";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import { serialize } from "next-mdx-remote/serialize";
import { MDXProvider } from "@mdx-js/react";
import { MDXRemote } from "next-mdx-remote";
import matter from "gray-matter";
import remarkUnwrapImages from "remark-unwrap-images";
import classNames from "classnames";

// Site Components
import GDPRBanner from "../components/utilities/gdpr";
import {
  getArticleSlugs,
  getArticleSlugFromString,
  pythonDirectory,
  getMenu,
  getGDPRBanner,
} from "../lib/api";
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

import styles from "../components/layouts/container.module.css";

export default function Article({
  data,
  source,
  streamlit,
  slug,
  menu,
  currMenuItem,
  prevMenuItem,
  nextMenuItem,
  versionFromStaticLoad,
  versions,
  paths,
  gdpr_data,
  filename,
}) {
  let versionWarning;
  let currentLink;
  let suggestEditURL;
  const { sourceFile } = useAppContext();

  suggestEditURL =
    Object.keys(streamlit).length > 0 && sourceFile
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
    Autofunction: (props) => (
      <Autofunction
        {...props}
        streamlitFunction={props.function}
        streamlit={streamlit}
        version={version}
        versions={versions}
        slug={slug}
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
        <p>
          You are reading the documentation for Streamlit version {version}, but{" "}
          <Link href={currentLink}>{maxVersion}</Link> is the latest version
          available.
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
        <GDPRBanner {...gdpr_data} />
        <section className={styles.Container}>
          <SideBar slug={slug} menu={menu} />
          <Head>
            <title>{data.title} - Streamlit Docs</title>
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
                  "/"
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
                <Helpful slug={slug} sourcefile={suggestEditURL} />
              </div>
            </article>
            <Psa />
            {arrowContainer}
          </section>
          <Footer />
        </section>
      </Layout>
    </MDXProvider>
  );
}

export async function getStaticProps(context) {
  const paths = await getStaticPaths();
  const props = {};
  let location = `/${context.params.slug.join("/")}`;
  const gdpr_data = await getGDPRBanner();

  // Sort of documentation versions
  const jsonContents = fs.readFileSync(
    join(pythonDirectory, "streamlit.json"),
    "utf8"
  );
  const streamlitFuncs = jsonContents ? JSON.parse(jsonContents) : {};
  const all_versions = Object.keys(streamlitFuncs);
  const versions = sortBy(all_versions, [
    (o) => {
      return parseInt(o, 10);
    },
  ]);
  const current_version = versions[versions.length - 1];
  const funcs = jsonContents ? JSON.parse(jsonContents) : {};

  const menu = getMenu();

  props["streamlit"] = {};
  props["versions"] = all_versions;
  props["versionFromStaticLoad"] = null;

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
    const should_version = /<Autofunction(.*?)\/>/gi.test(fileContents);

    if (should_version) {
      props["streamlit"] = funcs[current_version];
    }

    const isnum = /^[\d\.]+$/.test(context.params.slug[0]);
    if (isnum) {
      props["versionFromStaticLoad"] = context.params.slug[0];
      props["streamlit"] = funcs[props["versionFromStaticLoad"]];

      location = `/${context.params.slug.slice(1).join("/")}`;
    }

    const source = await serialize(content, {
      scope: data,
      mdxOptions: {
        rehypePlugins: [
          require("rehype-slug"),
          require("rehype-autolink-headings"),
        ],
        remarkPlugins: [remarkUnwrapImages],
      },
    });

    const { current, prev, next } = getPreviousNextFromMenu(menu, location);

    props["menu"] = menu;
    props["gdpr_data"] = gdpr_data;
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
    props["nextMenuItem"] = next ? { name: next.name, url: next.url } : null;
    props["prevMenuItem"] = prev ? { name: prev.name, url: prev.url } : null;
  }

  return {
    props: props,
  };
}

export async function getStaticPaths() {
  // Build up paths based on slugified categories for all docs
  const articles = getArticleSlugs();
  const paths = [];

  // Sort of documentation versions
  const jsonContents = fs.readFileSync(
    join(pythonDirectory, "streamlit.json"),
    "utf8"
  );
  const streamlitFuncs = jsonContents ? JSON.parse(jsonContents) : {};
  const all_versions = Object.keys(streamlitFuncs);
  const versions = sortBy(all_versions, [
    (o) => {
      return parseInt(o, 10);
    },
  ]);
  const current_version = versions[versions.length - 1];

  // Load each file and map a path

  for (const index in articles) {
    let slug = basename(articles[index]).replace(/\.md$/, "");
    let realSlug = [slug];
    slug = `/${slug}`;
    const fileContents = fs.readFileSync(articles[index], "utf8");
    const { data, content } = matter(fileContents);

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

    paths.push(path);

    // If the file uses Autofunction, we need to version it.
    // Major versions only --TO DO--
    const should_version = /<Autofunction(.*?)\/>/gi.test(fileContents);
    if (!should_version) {
      continue;
    }

    for (const v_index in versions) {
      const version = versions[v_index];

      if (version == current_version) {
        continue;
      }

      const versioned_location = `/${version}${slug}`;
      const newSlug = [...realSlug];

      newSlug.unshift(version);

      path = {
        params: {
          slug: newSlug,
          location: versioned_location,
          fileName: articles[index],
          title: data.title ? data.title : "Untitled",
          description: data.description ? data.description : "",
        },
      };
      paths.push(path);
    }
  }

  return {
    paths: paths,
    fallback: false,
  };
}
