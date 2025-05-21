const userService = require("../services/userService");

exports.fetchUsers = async (req, res) => {
  try {
    const users = await userService.fetchUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.fetchUserById = async (req, res) => {
  try {
    const user = await userService.fetchUserById(req.body.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.fetchUserByUsername = async (req, res) => {
  try {
    const user = await userService.fetchUserByUsername(req.body.username);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.fetchFriends = async (req, res) => {
  try {
    const user = await userService.fetchUserById(req.decodedToken.userId);
    res.status(200).json(user.friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.invite = async (req, res) => {
  try {
    await userService.invite(req.body.toUserId, req.decodedToken.userId);
    res.status(200).json("OK");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.acceptInvite = async (req, res) => {
  try {
    await userService.acceptInvite(req.decodedToken.userId, req.body.toUserId);
    res.status(200).json("OK");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
