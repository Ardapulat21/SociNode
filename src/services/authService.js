const user = require("../models/user");
const auth = require("../models/auth");

let userCounter = 0;

exports.fetchUsers = async () => {
  const users = await auth.find();
  return users;
};

exports.register = async (username, password) => {
  const fetchedUser = await exports.fetchUserByUsername(username);
  if (fetchedUser) throw new Error("Username has taken");

  await auth.create({
    id: userCounter,
    username: username,
    password: password,
  });

  const sessionUser = {
    id: userCounter,
    username: username,
    imgUrl: "uploads/picture.png",
  };

  userCounter++;
  await user.create(sessionUser);
  return sessionUser;
};

exports.login = async (username, password) => {
  const fetchedUser = await auth.findOne({
    username: username,
    password: password,
  });
  if (!fetchedUser) throw new Error("User could not be found.");
  return fetchedUser;
};

exports.fetchUserById = async (id) => {
  const fetchedUser = await auth.findOne({
    id: id,
  });
  return fetchedUser;
};

exports.fetchUserByUsername = async (username) => {
  const fetchedUser = await auth.findOne({
    username: username,
  });
  return fetchedUser;
};
