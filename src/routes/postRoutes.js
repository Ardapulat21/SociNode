const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const fileRoutes = require("../routes/fileRoutes");

router.get("/", postController.fetchPosts);
router.get("/fetchHomepagePosts", postController.fetchHomepagePosts);
router.get("/fetchExplorePosts", postController.fetchExplorePosts);
router.post("/fetchPost", postController.fetchPost);
router.post("/", fileRoutes.single("image"), postController.createPost);
router.post("/like", postController.likePost);
router.post("/fetchLikes", postController.fetchLikes);
router.post("/comment", postController.comment);

module.exports = router;
