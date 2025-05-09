const userService = require("../services/userService");

exports.fetchUsers = (req, res) => {
  const users = userService.fetchUsers();
  res.json(users);
};

exports.createUser = (req, res) => {
  const user = userService.createUser(req.body);
  res.status(201).json(user);
};

exports.login = (req, res) => {
  console.log(req.body);
};
