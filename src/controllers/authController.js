const authService = require("../services/authService");
const userService = require("../services/userService");

exports.fetchUsers = async (req, res) => {
  try {
    const users = await authService.fetchUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const registeredUser = await authService.register(
      req.body.username,
      req.body.password
    );
    res.status(201).json({ registeredUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    await authService.login(username, password);
    const sessionInfo = await userService.fetchUserByUsername(username);
    res.status(200).json(sessionInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
