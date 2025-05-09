exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  console.log("uploads");
  res.status(200).json({
    message: "File uploaded successfully",
    filename: req.file.filename,
    path: req.file.path,
  });
};
