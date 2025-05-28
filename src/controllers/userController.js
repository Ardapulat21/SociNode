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
    res.status(200).json("Invite has been sent");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.acceptInvite = async (req, res) => {
  try {
    const pendingRequests = await userService.acceptInvite(
      req.decodedToken.userId,
      req.body.toUserId
    );
    res.status(200).json(pendingRequests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.declineInvite = async (req, res) => {
  try {
    const pendingRequests = await userService.declineInvite(
      req.decodedToken.userId,
      req.body.toUserId
    );
    res.status(200).json(pendingRequests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFriend = async (req, res) => {
  try {
    console.log("decodedtoken", req.decodedToken.userId);
    console.log("toUserId", req.body.toUserId);
    await userService.removeFriend(req.decodedToken.userId, req.body.toUserId);
    res.status(200).json("User successfully has been removed.");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.changeProfilePhoto = async (req, res) => {
  try {
    const user = await userService.changeProfilePhoto(req.body, req.file);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
