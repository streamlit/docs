const GetSitemapLinks = require("get-sitemap-links").default;
const puppeteer = require("puppeteer");

let urls = [];
let browser;

const getLinks = async () => {
  // Launch puppeteer
  browser = await puppeteer.launch({
    headless: true,
    handleSIGINT: false,
  });

  console.log("Getting the URLs from the sitemap...");

  // Get all the docs links from the sitemap
  const urlsArray = await GetSitemapLinks(
    "https://docs.streamlit.io/sitemap.xml"
  );

  console.log(
    `Done! Finished getting the URLs from the sitemap. Got ${urlsArray.length} URLs`
  );

  // Array of links that are wrong/throw a 404 error
  const urlsToRemove = [
    ".keep",
    "billing",
    "code",
    "community",
    "deploy-an-app",
    "errors",
    "gdpr-banner",
    "menu",
    "rent-prices",
    "security-model",
    "streamlit-active-directory-adfs",
    "streamlit-azure-active-directory",
    "streamlit-general-saml-authentication",
    "style-guide",
  ];

  console.log(
    "Starting to remove versioned and pages that we dont want to create PDFs for..."
  );

  // Store urls in array with a bit more metadata
  urlsArray.map((url) => {
    urls.push({
      url,
      slug: url.split("/").pop(),
      isVersioned: /^[\d\.]+$/.test(url.split("/")[3]),
      shouldBeDeleted:
        urlsToRemove.filter((item) => url.split("/").pop() === item).length > 0
          ? true
          : false,
    });
  });

  // After we have the data, we remove the versioned and incorrect urls and grab a pdf for the rest
  const filteredPages = urls.filter(
    (url) => url.isVersioned === false && url.shouldBeDeleted === false
  );

  console.log("Done! Moving on to creating PDFs for these pages...");

  const promises = filteredPages.map((page) => getPDFs(page));
  Promise.all(promises).then((results) => {
    console.log("Done creating all PDFs. Exiting the process!");
    process.exit();
  });
};

// Function to go to the page, download the pdf, and close it
const getPDFs = async (url) => {
  console.log(`Creating PDF for ${url.slug}...`);

  // Puppeteer stuff
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(`${url.url}`, {
    waitUntil: ["networkidle2"],
  });
  await page.emulateMediaType("screen");

  // Creating the PDF
  await page.pdf({
    path: `scripts/pages/${url.slug}.pdf`,
    format: "a4",
    preferCSSPageSize: true,
  });

  console.log(`Done! Created PDF for ${url.slug}`);
  page.close();
};

getLinks();
