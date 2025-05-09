const users = [];

exports.fetchUsers = () => users;

exports.createUser = (data) => {
  const newUser = { date: Date.now(), ...data };
  users.push(newUser);
  return newUser;
};
