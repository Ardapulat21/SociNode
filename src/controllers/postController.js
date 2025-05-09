const postService = require("../services/postService");

exports.fetchPosts = (req, res) => {
  const posts = postService.fetchPosts();
  console.log("post are fetched");
  // res.set({
  //   "Content-Type": "application/json",
  //   "Access-Control-Allow-Origin": "*",
  // });
  console.log(posts);
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
