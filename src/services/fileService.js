const fs = require("fs").promises;
const path = require("path");

const moveFileToUserFolder = async (file, username) => {
  try {
    const uploadsFolder = path.resolve(__dirname, "../uploads");
    const destinationFolder = path.join(uploadsFolder, username);
    const sourcePath = path.join(uploadsFolder, file.originalname);
    const destinationPath = path.join(destinationFolder, file.originalname);

    // Ensure destination folder exists
    await fs.mkdir(destinationFolder, { recursive: true });

    // Move the file
    await fs.rename(sourcePath, destinationPath);
    console.log("File moved successfully!");

    return destinationPath;
  } catch (err) {
    console.error("Error moving file:", err.message);
    throw new Error("Failed to move file");
  }
};
