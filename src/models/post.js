const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  id: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: { type: String, required: false },
  imgUrl: { type: String, required: false },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      comment: { type: String, required: true },
    },
  ],
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Post", PostSchema);
