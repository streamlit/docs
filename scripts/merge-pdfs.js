const path = require("path");
const fs = require("fs");
const PDFMerger = require("pdf-merger-js");

const merger = new PDFMerger();
const directoryPath = path.join(__dirname, "../public/pdf/");

const getPDFs = () => {
  fs.readdir(directoryPath, async function (err, files) {
    files.forEach(function (file) {
      merger.add(`${directoryPath}/${file}`);
    });

    await merger.save(`${directoryPath}/docs-merged.pdf`);
  });
};

getPDFs();
