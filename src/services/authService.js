const user = require("../models/user");
const auth = require("../models/auth");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

exports.fetchUsers = async () => {
  const users = await auth.find();
  return users;
};

exports.register = async (username, password) => {
  const fetchedUser = await exports.fetchUserByUsername(username);
  if (fetchedUser) throw new Error("Username has taken");

  await auth.create({
    username: username,
    password: password,
  });

  const sessionUser = {
    username: username,
    friends: [],
    pendingRequests: [],
    notifications: [],
    imgUrl: "uploads/picture.png",
  };

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

exports.signToken = (loggedUser, sessionInfo) => {
  try {
    const token = jwt.sign(
      {
        authId: loggedUser._id.toString(),
        userId: sessionInfo._id.toString(),
        username: loggedUser.username,
        imgUrl: sessionInfo.imgUrl,
      },
      config.secret_key,
      {
        expiresIn: "1h",
      }
    );
    return token;
  } catch (err) {
    throw new Error(err);
  }
};

exports.fetchUserByUsername = async (username) => {
  const fetchedUser = await auth.findOne({
    username: username,
  });
  return fetchedUser;
};
