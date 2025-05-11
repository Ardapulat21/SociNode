const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Avoid duplicate names
  },
});

module.exports = multer({ storage });
