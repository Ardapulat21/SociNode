const postService = require("../services/postService");
exports.fetchPosts = async (req, res) => {
  try {
    const posts = await postService.fetchPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.fetchPost = async (req, res) => {
  try {
    const post = await postService.fetchPostById(req.body.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const createdPost = await postService.createPost(req.body, req.file);
    res.status(201).json(createdPost);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.fetchLikes = async (req, res) => {
  try {
    const likes = await postService.fetchLikes(req.body.postId);
    res.status(200).json(likes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const postLikes = await postService.likePost(
      req.body.userId,
      req.body.postId
    );
    res.status(200).json(postLikes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.comment = async (req, res) => {
  try {
    const comments = await postService.comment(
      req.body.postId,
      req.body.userId,
      req.body.comment
    );
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.fetchHomepagePosts = async (req, res) => {
  try {
    const homepagePosts = await postService.fetchHomepagePosts(
      req.decodedToken.userId
    );
    res.status(200).json(homepagePosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.fetchExplorePosts = async (req, res) => {
  try {
    const explorePosts = await postService.fetchExplorePosts(
      req.decodedToken.userId
    );
    res.status(200).json(explorePosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.fetchProfilePosts = async (req, res) => {
  try {
    const profilePosts = await postService.fetchProfilePosts(req.body.id);
    res.status(200).json(profilePosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
