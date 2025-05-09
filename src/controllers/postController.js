const postService = require("../services/postService");
var formidable = require("formidable");

exports.fetchPosts = (req, res) => {
  const posts = postService.fetchPosts();
  res.json(posts);
};

exports.createPost = (req, res) => {
  const form = new formidable({ multiples: true });
  form.parse(req, (error, fields, files) => {
    console.log(`Desc: ${fields.description}`);
    console.log(`Date: ${fields.date}`);
    console.log(files);
    console.log(files.image.name);
  });
  // postService.createPost(req.body);
  res.status(201);
};
