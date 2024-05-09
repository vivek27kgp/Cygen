const express = require("express");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const {
  getDocument,
  GlobalWorkerOptions,
} = require("./pdfjs-dist-master/legacy/build/pdf");
const Tesseract = require("tesseract.js");
const { createCanvas, loadImage } = require("canvas");

const app = express();
const port = 3000;

app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Convert PDF to images
const convertPDFToImages = async (pdfFile) => {
  GlobalWorkerOptions.workerSrc = "./pdf.worker.min.js";

  const pdf = await getDocument(pdfFile).promise;
  let images = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext("2d");

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
    const imageData = canvas.toDataURL("image/jpeg");
    images.push(imageData);
  }

  return images;
};

// OCR on images
const performOCR = async (images) => {
  let allText = "";

  for (let i = 0; i < images.length; i++) {
    const {
      data: { text },
    } = await Tesseract.recognize(images[i], "eng");
    allText += text + "\n\n";
  }

  return allText;
};

// Upload PDF and perform OCR
app.post("/perform-ocr", upload.single("pdf"), async (req, res) => {
  const pdfPath = req.file.path;

  try {
    const images = await convertPDFToImages(pdfPath);
    const text = await performOCR(images);
    res.json({ text });
  } catch (error) {
    console.error("Error performing OCR:", error);
    res.status(500).send("Error performing OCR.");
  }
});

// Serve index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
