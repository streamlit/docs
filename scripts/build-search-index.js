const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const utils = require("../lib/utils.js");
const contentDirectory = path.join(process.cwd(), ".next/server/pages");
const parser = require("node-html-parser");
const algoliasearch = require("algoliasearch");
const { convert } = require("html-to-text");

const SKIP_THESE = [
  "/menu",
  "/404",
  "/500",
  "/library/api-reference/performance/st.cache",
  "/library/api-reference/performance/st.experimental_memo",
  "/library/api-reference/performance/st.experimental_singleton",
  "/library/api-reference/performance/st.experimental_singleton.clear",
  "/library/api-reference/utilities/st.experimental_show",
  "/library/advanced-features/st.cache",
  "/library/advanced-features/experimental-cache-primitives",
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
    let category;
    let breadCrumbs;
    // Parse each HTML file and get the content we need
    const contents = fs.readFileSync(pages[index], "utf8");
    const url = pages[index].split(contentDirectory)[1].split(".html")[0];

    if (url in data) {
      meta = JSON.parse(fs.readFileSync(data[url], "utf8"));
      if ("menu" in meta.pageProps) {
        menu = meta.pageProps.menu;
        breadCrumbs = utils.breadcrumbsForSlug(menu, url);
        if (breadCrumbs.length > 0) {
          category = breadCrumbs[0].name;
          icon = breadCrumbs[0].icon ? breadCrumbs[0].icon : "text_snippet";
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
      compileOptions
    );
    const slug = url.split("/");
    const isnum = /^[\d\.]+$/.test(slug[1]);
    const version = isnum ? slug[1] : "latest";

    if (meta_keywords) {
      keywords = meta_keywords.getAttribute("content");
    }

    if (version !== "latest") {
      console.warn(`!!! Skipping ${url} because it's for an older version.`);
      continue;
    }

    if ((!title && !sub_title) || !doc_title) {
      console.warn(
        `!!! Skipping ${url} because the document has no title or H1 tag.`
      );
      continue;
    }

    if (!title && sub_title) {
      title = sub_title;
    }

    if (!content) {
      console.warn(
        `!!! Skipping ${url} because the document has no ARTICLE tag.`
      );
      continue;
    }

    to_index.push({
      title: title.text,
      content: content,
      url: url,
      category: category,
      icon: icon,
      version: version,
      keywords: keywords,
    });

    console.log(`... prepared ${title.text} at ${url}.`);
  }

  console.log(`... uploading ${to_index.length} pages to Algolia.`);

  const client = algoliasearch(
    "XNXFGO6BQ1",
    "ddc64745f583d66008a2777620d27517"
  );
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
    });
})();
