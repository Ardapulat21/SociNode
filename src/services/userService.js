const user = require("../models/user");
exports.fetchUserByUsername = async (username) => {
  return await user
    .findOne({
      username: username,
    })
    .populate();
};

exports.fetchUserById = async (id) => {
  return await user.findOne({ _id: id }).populate();
};

exports.fetchUsers = async () => {
  return await user.find().populate();
};
