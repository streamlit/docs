const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const parser = require("node-html-parser");
const algoliasearch = require("algoliasearch");
const { convert } = require("html-to-text");

const { breadcrumbsForSlug } = require("../lib/purejs/breadcrumbHelpers");
const {
  looksLikeVersionAndPlatformStringGeneric,
} = require("../lib/purejs/versionHelpers");
const { DEFAULT_PLATFORM, PLATFORM_VERSIONS } = require("../lib/node/defaults");

const contentDirectory = path.join(process.cwd(), ".next/server/pages");

const SKIP_THESE = [
  "/menu",
  "/404",
  "/500",
  "/develop/api-reference/caching-and-state/st.experimental_get_query_params",
  "/develop/api-reference/caching-and-state/st.experimental_set_query_params",
  "/develop/api-reference/connections/st.connections.experimentalbaseconnection",
  "/develop/api-reference/connections/st.experimental_connection",
  "/develop/api-reference/caching-and-state/st.experimental_memo",
  "/develop/api-reference/caching-and-state/st.experimental_singleton",
  "/develop/api-reference/execution-flow/st.experimental_rerun",
  "/develop/api-reference/data/st.experimental_data_editor",
];

function getAllFilesInDirectory(articleDirectory, files) {
  files = files ? files : [];
  fs.readdirSync(articleDirectory).forEach(function (file) {
    const subpath = path.join(articleDirectory, file);
    if (fs.lstatSync(subpath).isDirectory()) {
      getAllFilesInDirectory(subpath, files);
    } else {
      files.push(subpath);
    }
  });
  return files;
}

(async function () {
  dotenv.config();

  console.log("Updating search index through Algolia...");

  // Let's check that we have a .next folder and then parse through the HTML files.
  const pages = [];
  const data = {};
  const to_index = [];
  let menu;

  files = getAllFilesInDirectory(contentDirectory);

  for (const index in files) {
    if (files[index].endsWith(".html")) {
      pages.push(files[index]);
    }
    if (files[index].endsWith(".json")) {
      const url = files[index].split(contentDirectory)[1].split(".json")[0];
      data[url] = files[index];
    }
  }

  console.log(`... found ${pages.length} pages to index.`);

  for (const index in pages) {
    let icon;
    let color;
    let category;
    let breadCrumbs;
    // Parse each HTML file and get the content we need
    const contents = fs.readFileSync(pages[index], "utf8");
    const url = pages[index]
      .split(contentDirectory)[1]
      .match(/^(.*?)\.html$/)[1];

    if (url in data) {
      meta = JSON.parse(fs.readFileSync(data[url], "utf8"));
      if ("menu" in meta.pageProps) {
        menu = meta.pageProps.menu;
        breadCrumbs = breadcrumbsForSlug(menu, url);
        if (breadCrumbs.length > 0) {
          category = breadCrumbs[0].name;
          icon = breadCrumbs[0].icon ? breadCrumbs[0].icon : "text_snippet";
          color = breadCrumbs[0].color ? breadCrumbs[0].color : "orange-70";
        }
      }
    }

    if (SKIP_THESE.includes(url)) {
      console.warn(`!!! Skipping ${url} because you told me to.`);
      continue;
    }

    const root = parser.parse(contents);
    const doc_title = root.querySelector("title");

    // Clean up some tags we don't want, like:
    // 1. <select> tags, due to autofunc pages
    // 2. <label> tags, due to "select streamlit version" text
    // 3. <form> tags, to remove the "helful" form
    const remove_tags = ["select", "label", "form"];
    for (const i in remove_tags) {
      const tags = root.querySelectorAll(remove_tags[i]);
      for (const ii in tags) {
        if (tags[ii].parentNode) {
          tags[ii].parentNode.removeChild(tags[ii]);
        }
      }
    }

    const compileOptions = {
      hideLinkHrefIfSameAsText: true,
      ignoreHref: true,
      ignoreImage: true,
    };

    let keywords = "";
    let title = root.querySelector("h1");
    const sub_title = root.querySelector("h2");
    const meta_keywords = root.querySelector("meta[name=keywords]");
    const content = convert(
      root.querySelector("article").innerHTML,
      compileOptions,
    );
    const slug = url.split("/");
    const version = looksLikeVersionAndPlatformStringGeneric(
      slug[1],
      DEFAULT_PLATFORM,
      PLATFORM_VERSIONS,
    )
      ? slug[1]
      : "latest";

    if (meta_keywords) {
      keywords = meta_keywords.getAttribute("content");
    }

    if (version !== "latest") {
      console.warn(`!!! Skipping ${url} because it's for an older version.`);
      continue;
    }

    if ((!title && !sub_title) || !doc_title) {
      console.warn(
        `!!! Skipping ${url} because the document has no title or H1 tag.`,
      );
      continue;
    }

    if (!title && sub_title) {
      title = sub_title;
    }

    if (!content) {
      console.warn(
        `!!! Skipping ${url} because the document has no ARTICLE tag.`,
      );
      continue;
    }

    if (content.length > 100000) {
      console.warn(
        `!!! Skipping ${url} the content is too long.`,
        "See https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/how-to/reducing-object-size/",
        "for solutions.",
      );
      continue;
    }

    to_index.push({
      title: title.text,
      content: content,
      url: url,
      category: category,
      icon: icon,
      color: color,
      version: version,
      keywords: keywords,
    });

    console.log(`... prepared ${title.text} at ${url}.`);
  }

  console.log(`... uploading ${to_index.length} pages to Algolia.`);

  const client = algoliasearch("XNXFGO6BQ1", process.env.ALGOLIA_SECRET);

  const index = client.initIndex("documentation");
  const tmp_index = client.initIndex("documentation_tmp");

  client
    .copyIndex(index.indexName, tmp_index.indexName, [
      "settings",
      "synonyms",
      "rules",
    ])
    .then(({ taskID }) => {
      tmp_index.waitTask(taskID);
    })
    .then(() => {
      return tmp_index.addObjects(to_index);
    })
    .then(({ taskID }) => {
      tmp_index.waitTask(taskID);
    })
    .then(() => {
      client.moveIndex(tmp_index.indexName, index.indexName);
      console.log("... updating index");
    })
    .then(() => {
      console.log("Index updated. 🎉");
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
})();
