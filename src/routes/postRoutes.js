const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const fileRoutes = require("../routes/fileRoutes");

router.get("/", postController.fetchPosts);
router.post("/", fileRoutes.single("image"), postController.createPost);

module.exports = router;
