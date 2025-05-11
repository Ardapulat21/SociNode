const mongoose = require("mongoose");

const UserAuthSchema = new mongoose.Schema({
  id: Number,
  username: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("UserAuth", UserAuthSchema);
