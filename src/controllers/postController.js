const user = require("../models/user");
const postService = require("../services/postService");
var formidable = require("formidable");

exports.fetchPosts = (req, res) => {
  try {
    console.log("post controller");
    const posts = postService.fetchPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.fetchPost = (req, res) => {
  try {
    const post = postService.fetchPost(req.body.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPost = (req, res) => {
  try {
    postService.createPost(req.body, req.file);
    // const form = new formidable({ multiples: true });
    // form.parse(req, (error, fields, files) => {
    //   console.log("hey");
    //   console.log(files);
    //   const formData = {
    //     files: files,
    //     fields: fields,
    //   };
    //   // postService.createPost(formData);
    // });
    res.status(201);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
