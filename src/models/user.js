const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
  username: { type: String, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  invitedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  notifications: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      notificationType: { type: String, required: true },
      postId: { type: String, required: true },
    },
  ],
  imgUrl: { type: String, required: true },
});

module.exports = mongoose.model("User", UserScheme);
