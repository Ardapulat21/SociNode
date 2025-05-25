const post = require("../models/post");
const fs = require("fs");
const path = require("path");
const userService = require("./userService");
exports.fetchPosts = async () => {
  return await post
    .find()
    .populate(["user", "likes", "comments", "comments.user"]);
};

exports.fetchPostById = async (id) => {
  return await post
    .findOne({ _id: id })
    .populate(["user", "likes", "comments", "comments.user"]);
};

exports.createPost = async (body, file) => {
  let username = body.username;
  console.log(body);
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

exports.likePost = async (userId, postId) => {
  const likedPost = await exports.fetchPostById(postId);
  const fetchedUser = await userService.fetchUserById(userId);
  let postLikes = likedPost.likes;
  let postOwner = likedPost.user;
  let postOwnersNotifications = postOwner.notifications;

  let index = postLikes.findIndex((like) => like._id == userId);
  if (index !== -1) {
    postLikes = postLikes.filter((_, i) => i !== index);
  } else {
    postLikes = [...postLikes, fetchedUser];
  }
  if (userId != postOwner._id) {
    index = postOwnersNotifications.findIndex(
      (notification) =>
        notification.user._id.toString() === fetchedUser._id.toString() &&
        notification.notificationType === "liked" &&
        notification.postId.toString() === likedPost._id.toString()
    );

    if (index !== -1) {
      postOwnersNotifications = postOwnersNotifications.filter(
        (_, i) => i !== index
      );
    } else {
      postOwnersNotifications = [
        {
          user: fetchedUser,
          notificationType: "liked",
          postId: postId,
        },
        ...postOwnersNotifications,
      ];
    }

    await userService.updateUser([
      {
        query: { _id: postOwner._id },
        updated: { notifications: postOwnersNotifications },
      },
    ]);
  }

  await updatePost([{ query: { _id: postId }, updated: { likes: postLikes } }]);
  return postLikes;
};
exports.fetchLikes = async (id) => {
  const fetchedPost = await post
    .findOne({ _id: id })
    .populate(["user", "likes"]);
  if (!fetchedPost) throw new Error("Post could not found");
  return fetchedPost.likes;
};

exports.comment = async (postId, userId, comment) => {
  const fetchedUser = await userService.fetchUserById(userId);
  const commentedPost = await exports.fetchPostById(postId);
  const postOwner = commentedPost.user;
  let postOwnersNotifications = postOwner.notifications;
  const comments = [
    ...commentedPost.comments,
    {
      user: fetchedUser,
      comment: comment,
    },
  ];
  if (userId != postOwner._id) {
    postOwnersNotifications = [
      {
        user: fetchedUser,
        notificationType: "commented",
        postId: postId,
      },
      ...postOwnersNotifications,
    ];
    await userService.updateUser([
      {
        query: { _id: postOwner._id },
        updated: { notifications: postOwnersNotifications },
      },
    ]);
  }
  await updatePost([
    { query: { _id: postId }, updated: { comments: comments } },
  ]);
  return comments;
};

const updatePost = async (updates) => {
  for (const { query, updated } of updates) {
    await post.updateOne(query, updated);
  }
};
