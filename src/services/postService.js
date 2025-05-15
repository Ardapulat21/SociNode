const post = require("../models/post");
const user = require("../models/user");
const fs = require("fs");
const path = require("path");
const userService = require("./userService");
let postCounter = 0;

exports.fetchPosts = async () => {
  return await post.find().populate(["user", "likes"]);
};

exports.fetchPostById = async (id) => {
  return await post.findOne({ id: id }).populate(["user", "likes"]);
};

exports.createPost = async (body, file) => {
  let username = body.username;
  const fetchedUser = await userService.fetchUserByUsername(username);
  let imgUrl = undefined;
  if (file) {
    imgUrl = path.join("uploads", username, file.originalname);
    const uploadsFolder = path.join(__dirname, `../uploads/`);
    const destinationFolder = path.join(uploadsFolder, username);
    const destinationPath = path.join(destinationFolder, file.originalname);

    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder, { recursive: true });
    }
    const sourcePath = path.join(uploadsFolder, file.originalname);
    fs.rename(sourcePath, destinationPath, (err) => {
      if (err) {
        throw new Error("Error moving file:", err);
      } else {
        console.log("File moved successfully!");
      }
    });
  }
  const createdPost = {
    id: `${postCounter++}`,
    user: fetchedUser,
    description: body.description ?? "",
    imgUrl: imgUrl,
    likes: [],
    comments: [],
    date: Date.now(),
  };
  const newPost = await post.create(createdPost);
  return newPost;
};

exports.updatePost = async (query, updated) => {
  await post.updateOne(query, updated);
};

exports.fetchLikes = async (id) => {
  const fetchedPost = await post
    .findOne({ id: id })
    .populate(["user", "likes"]);
  if (!fetchedPost) throw new Error("Post could not found");
  return fetchedPost.likes;
};

// exports.likePost = async(postId, id);

exports.comment = async (postId, userId, comment) => {
  const fetchedUser = await userService.fetchUserById(userId);
  const commentedPost = await exports.fetchPostById(postId);
  const comments = [
    ...commentedPost.comments,
    {
      user: fetchedUser,
      comment: comment,
    },
  ];

  const updatedPost = await exports.updatePost(
    { id: postId },
    { comments: comments }
  );
  return updatedPost;
};
