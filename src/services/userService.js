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

exports.invite = async (toUserId, fromUserId) => {
  if (toUserId == fromUserId)
    throw new Error("User can not make request itself.");

  const toUser = await exports.fetchUserById(toUserId);
  const fromUser = await exports.fetchUserById(fromUserId);

  let toUsersPendingRequest = toUser.pendingRequests;
  let fromUsersInvitedUser = fromUser.invitedUsers;

  const index = toUsersPendingRequest.findIndex(
    (request) => request._id == fromUserId
  );

  if (index !== -1) {
    toUsersPendingRequest = toUsersPendingRequest.filter((_, i) => i !== index);
    fromUsersInvitedUser = fromUsersInvitedUser.filter(
      (invitedUser) => invitedUser._id != toUserId
    );
  } else {
    toUsersPendingRequest = [...toUsersPendingRequest, fromUser];
    fromUsersInvitedUser = [...fromUsersInvitedUser, toUser];
  }

  await user.updateOne(
    { _id: toUserId },
    { pendingRequests: toUsersPendingRequest }
  );

  await user.updateOne(
    { _id: fromUserId },
    { invitedUsers: fromUsersInvitedUser }
  );
};

exports.acceptInvite = async (approvedId, requestedId) => {
  if (approvedId == requestedId)
    throw new Error("User can not accept the invite itself.");
  const approvedUser = await exports.fetchUserById(approvedId);
  const requestedUser = await exports.fetchUserById(requestedId);

  let approvedPendingRequests = approvedUser.pendingRequests;
  let requestedUserInvitedUsers = requestedUser.invitedUsers;

  let approvedsFriends = approvedUser.friends;
  let requestedsFriends = requestedUser.friends;

  const index = approvedPendingRequests.findIndex(
    (request) => request._id == requestedId
  );
  if (index !== -1) {
    approvedPendingRequests = approvedPendingRequests.filter(
      (_, i) => i !== index
    );
    requestedUserInvitedUsers = requestedUserInvitedUsers.filter(
      (invited) => invited._id != approvedId
    );

    approvedsFriends = [...approvedsFriends, requestedUser];
    requestedsFriends = [...requestedsFriends, approvedUser];

    // console.log("Requested user's invited user:", requestedUserInvitedUsers);
    // console.log("Approved user's pending request:", approvedPendingRequests);

    // console.log("Requested User's friends:", requestedsFriends);
    // console.log("Approved User's friends:", approvedsFriends);
    await user.updateOne(
      { _id: approvedId },
      { pendingRequests: approvedPendingRequests, friends: approvedsFriends }
    );

    await user.updateOne(
      { _id: requestedId },
      { invitedUsers: requestedUserInvitedUsers, friends: requestedsFriends }
    );
  }
};
