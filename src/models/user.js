const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
  id: Number,
  username: { type: String, required: true },
  imgUrl: { type: String, required: true },
});

module.exports = mongoose.model("User", UserScheme);
