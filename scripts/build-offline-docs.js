const matter = require("gray-matter");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

let browser;

const getSitemapLinks = async () => {
  // Launch puppeteer
  browser = await puppeteer.launch();

  console.log("Getting the URLs from the menu...");

  const menuFile = path.join(__dirname, "../content/menu.md");
  const fileContents = fs.readFileSync(menuFile, "utf8");
  const matterResult = matter(fileContents);
  const urls = matterResult.data.site_menu;

  console.log(
    `Finished getting the URLs from the menu. Got ${urls.length} entries`
  );

  console.log("Moving on to creating PDFs for these pages...");

  urls.map((url, index) => (url.order = index));

  const promises = urls.map((page) => getPDFs(page));

  Promise.all(promises).then((results) => {
    console.log("Done creating all PDFs. Exiting the process!");
    process.exit();
  });
};

// Function to go to the page, download the pdf, and close it
const getPDFs = async (url) => {
  console.log(`Creating PDF for ${url.url}...`);

  // If it's an external URL, skip it
  if (url.url.includes("http")) {
    return;
  }

  // Puppeteer stuff
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(`http://localhost:3000${url.url}`, {
    waitUntil: ["networkidle2"],
  });
  await page.emulateMediaType("print");

  const pageName = `${url.order}${url.url.replaceAll("/", "-")}`;

  // Creating the PDF
  await page.pdf({
    path: `public/pdf/pages/${pageName}.pdf`,
    format: "a4",
  });

  console.log(`Done! Created PDF for ${url.url}`);
  page.close();
};

getSitemapLinks();
