const userService = require("../services/userService");

exports.fetchUsers = (req, res) => {
  const users = userService.fetchUsers();
  res.json(users);
};

exports.register = (req, res) => {
  const user = userService.register(req.body);
  res.status(201).json(user);
};

exports.login = (req, res) => {
  console.log(req.body);
};
