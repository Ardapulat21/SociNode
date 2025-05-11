const post = require("../models/post");
const user = require("../models/user");
let postCounter = 0;
exports.fetchPosts = async () => {
  try {
    console.log("post service fetch Posts");
    const posts = await post.find();
    return posts;
  } catch (err) {
    throw new Error(err.message);
  }
};

const fetchUserById = async (id) => {
  try {
    console.log("post service fetch Post");
    const fetchedUser = await user.findOne({ _id: id });
    return fetchedUser;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.createPost = async (body, files) => {
  try {
    const fetchedUser = await user.findOne({ id: body.id });
    console.log(`Fetched User:${fetchedUser}`);

    const imgUrl = files
      ? `../../uploads/${fetchedUser.username}/${files.originalname}`
      : "";
    const createdPost = {
      id: `${postCounter++}`,
      user: fetchedUser,
      description: body.description,
      imgUrl: imgUrl,
      likes: [],
      comments: [],
      date: Date.now(),
    };
    console.log(`body: ${JSON.stringify(body)}`);
    console.log(`files: ${JSON.stringify(files)}`);
    console.log(`imgUrl: ${imgUrl}`);

    const newPost = await post.create(createdPost);
    return newPost;
  } catch (err) {
    throw new Error(err.message);
  }
};
