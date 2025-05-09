const express = require("express");
const multer = require("multer");
const router = express.Router();
const fileController = require("../controllers/fileController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads/"); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Avoid duplicate names
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), fileController.uploadFile);

module.exports = router;
