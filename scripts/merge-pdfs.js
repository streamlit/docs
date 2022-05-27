const path = require("path");
const fs = require("fs");
const PDFMerger = require("pdf-merger-js");
const isPDFValid = require("is-pdf-valid");

// Initialize the merger
const merger = new PDFMerger();
const pagesPath = path.join(__dirname, "pages");
const pdfPath = path.join(__dirname, "../public/pdf");

const getPDFs = () => {
  console.log("Running the PDF merger...");

  // Get all pdfs inside the directory path
  fs.readdir(pagesPath, async function (err, files) {
    // Loop through all files and check its validity
    files.forEach(function (file) {
      console.log(`Adding ${file}...`);

      const isFileValid = isPDFValid(fs.readFileSync(`${pagesPath}/${file}`));
      if (isFileValid === true) {
        try {
          merger.add(`${pagesPath}/${file}`);
          console.log(`Done! ${file} added`);
        } catch (e) {
          console.log(
            `Skipping ${file} because the PDF wasn't generated properly. See error below:`
          );
          console.log(e);
        }
      }
    });

    console.log("Merging the PDF...");

    await merger.save(`${pdfPath}/offline-docs.pdf`);

    console.log(`Done! PDF generated on ${pdfPath}/offline-docs.pdf`);
  });
};

getPDFs();
