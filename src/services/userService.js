const user = require("../models/user");
exports.fetchUserByUsername = async (username) => {
  return await user
    .findOne({
      username: username,
    })
    .populate();
};

exports.fetchUserById = async (id) => {
  return await user
    .findOne({ _id: id })
    .populate(["friends", "pendingRequests", "invitedUsers", "notifications"]);
};

exports.fetchUsers = async () => {
  return await user
    .find()
    .populate(["friends", "pendingRequests", "invitedUsers", "notifications"]);
};

exports.invite = async (receiverId, senderId) => {
  try {
    const receiverAndSender = await findReceiverAndSender(receiverId, senderId);
    const receiver = receiverAndSender.receiver;
    const sender = receiverAndSender.sender;

    let receiversPendingRequests = receiver.pendingRequests;
    let sendersInviteds = sender.invitedUsers;

    const index = receiversPendingRequests.findIndex(
      (request) => request._id == senderId
    );

    if (index !== -1) {
      receiversPendingRequests = receiversPendingRequests.filter(
        (_, i) => i !== index
      );
      sendersInviteds = sendersInviteds.filter(
        (invited) => invited._id != receiverId
      );
    } else {
      receiversPendingRequests = [...receiversPendingRequests, sender];
      sendersInviteds = [...sendersInviteds, receiver];
    }
    await updateUser([
      { _id: receiverId },
      {
        pendingRequests: data.receiversPendingRequests,
      },
      { _id: senderId },
      { invitedUsers: data.sendersInviteds },
    ]);
  } catch (err) {
    throw new Error(err.message);
  }
};
exports.acceptInvite = async (receiverId, senderId) => {
  try {
    const data = await responseInvite(receiverId, senderId);
    const receiversFriends = [data.sender, ...data.receiver.friends];
    const sendersFriends = [data.receiver, ...data.sender.friends];
    await updateUser([
      { _id: receiverId },
      {
        pendingRequests: data.receiversPendingRequests,
        friends: receiversFriends,
      },
      { _id: senderId },
      { invitedUsers: data.sendersInviteds, friends: sendersFriends },
    ]);
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.rejectInvite = async (receiverId, senderId) => {
  try {
    const data = await responseInvite(receiverId, senderId);
    await updateUser([
      { _id: receiverId },
      { pendingRequests: data.receiversPendingRequests },
      { _id: senderId },
      { invitedUsers: data.sendersInviteds },
    ]);
  } catch (err) {
    throw new Error(err.message);
  }
};
//This function erases the request from receivers pending request and the senders invited
//user then returns the updated data.After calling this function,db updates is needed.
const responseInvite = async (receiverId, senderId) => {
  try {
    const receiverAndSender = await findReceiverAndSender(receiverId, senderId);
    const receiver = receiverAndSender.receiver;
    const sender = receiverAndSender.sender;

    let receiversPendingRequests = receiver.pendingRequests;
    let sendersInviteds = sender.invitedUsers;

    const index = receiversPendingRequests.findIndex(
      (request) => request._id == senderId
    );

    if (index !== -1) {
      receiversPendingRequests = receiversPendingRequests.filter(
        (_, i) => i !== index
      );
      sendersInviteds = sendersInviteds.filter(
        (invited) => invited._id != receiverId
      );

      return {
        receiver: receiver,
        receiversPendingRequests: receiversPendingRequests,
        sender: sender,
        sendersInviteds: sendersInviteds,
      };
    }
    return null;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findReceiverAndSender = async (receiverId, senderId) => {
  if (receiverId == senderId)
    throw new Error("User can not accept the invite itself.");
  const receiver = await exports.fetchUserById(receiverId);
  const sender = await exports.fetchUserById(senderId);
  return { sender: sender, receiver: receiver };
};

const updateUser = async (updates) => {
  for (const { query, updated } of updates) {
    await user.updateOne(query, updated);
  }
};
