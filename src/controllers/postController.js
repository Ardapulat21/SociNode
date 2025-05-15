const postService = require("../services/postService");
const userService = require("../services/userService");
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
    console.log(req.body);
    const post = await postService.fetchPostById(req.body.id);
    console.log(post);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const createdPost = await postService.createPost(req.body, req.file);
    console.log(createdPost);
    res.status(201).json(createdPost);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const username = req.body.username;
    const postId = req.body.postId;
    const likedPost = await postService.fetchPostById(postId);
    const fetchedUser = await userService.fetchUserByUsername(username);
    let postLikes = likedPost.likes;

    const index = postLikes.findIndex((like) => like.username === username);
    if (index !== -1) {
      postLikes = postLikes.filter((_, i) => i !== index);
    } else {
      postLikes = [...postLikes, fetchedUser];
    }
    await postService.updatePost({ id: postId }, { likes: postLikes });
    res.status(200).json(postLikes);
  } catch (err) {
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

exports.comment = async (req, res) => {
  try {
    const updatedPost = await postService.comment(
      req.body.postId,
      req.body.userId,
      req.body.comment
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
