const GetSitemapLinks = require("get-sitemap-links").default;
const puppeteer = require("puppeteer");

let urls = [];
let browser;

const getLinks = async () => {
  // Launch puppeteer
  browser = await puppeteer.launch({
    headless: true,
    handleSIGINT: false,
    ignoreHTTPSErrors: true,
  });

  // Get the links from the sitemap
  const urlsArray = await GetSitemapLinks(
    "https://docs.streamlit.io/sitemap.xml"
  );

  // Store urls in array with a bit more metadata
  urlsArray.map((url) =>
    urls.push({
      url,
      slug: url.split("/").pop(),
      isVersioned: /^[\d\.]+$/.test(url.split("/")[3]),
    })
  );

  // After we have the data, we filter the versioned urls and grab a pdf for them
  urls.filter(async (url) => url.isVersioned !== true && (await getPDFs(url)));
};

// Function to go to the page, download the pdf, and close it
const getPDFs = async (url) => {
  const page = await browser.newPage();
  await page.goto(`${url.url}`, {
    waitUntil: ["domcontentloaded", "networkidle0"],
  });
  await page.emulateMediaType("screen");
  await page.pdf({
    path: `../public/pdf/${url.slug}.pdf`,
    format: "a4",
    preferCSSPageSize: true,
  });
  page.close();
};

getLinks();
