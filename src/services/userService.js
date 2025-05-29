const user = require("../models/user");
const fs = require("fs");
const path = require("path");
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
    .populate([
      "friends",
      "pendingRequests",
      "invitedUsers",
      "notifications",
      "notifications.user",
    ]);
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

    let index = receiver.friends.findIndex((friend) => friend._id == senderId);
    if (index !== -1) throw new Error("Friends can not invite each others.");

    let receiversPendingRequests = receiver.pendingRequests;
    let sendersInviteds = sender.invitedUsers;

    index = receiversPendingRequests.findIndex(
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
      receiversPendingRequests = [sender, ...receiversPendingRequests];
      sendersInviteds = [receiver, ...sendersInviteds];
    }
    await exports.updateUser([
      {
        query: { _id: receiverId },
        updated: {
          pendingRequests: receiversPendingRequests,
        },
      },
      {
        query: { _id: senderId },
        updated: { invitedUsers: sendersInviteds },
      },
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
    await exports.updateUser([
      {
        query: { _id: receiverId },
        updated: {
          pendingRequests: data.receiversPendingRequests,
          friends: receiversFriends,
        },
      },
      {
        query: { _id: senderId },
        updated: {
          invitedUsers: data.sendersInviteds,
          friends: sendersFriends,
        },
      },
    ]);
    return data.receiversPendingRequests;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.declineInvite = async (receiverId, senderId) => {
  try {
    const data = await responseInvite(receiverId, senderId);
    await exports.updateUser([
      {
        query: { _id: receiverId },
        updated: { pendingRequests: data.receiversPendingRequests },
      },
      {
        query: { _id: senderId },
        updated: { invitedUsers: data.sendersInviteds },
      },
    ]);
    return data.receiversPendingRequests;
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
  if (!receiver || !sender)
    throw new Error("Receiver or sender could not be found.");
  return { sender: sender, receiver: receiver };
};

exports.removeFriend = async (actorId, removedUserId) => {
  const actor = await exports.fetchUserById(actorId);
  if (!actor) throw new Error("Actor could not be found");
  const removedUser = await exports.fetchUserById(removedUserId);
  if (!removedUser) throw new Error("Friend to be removed could not be found");

  let actorFriends = actor.friends;
  let index = actorFriends.findIndex((friend) => friend._id == removedUserId);

  if (index === -1) throw new Error("Friend to be removed could not be found");
  actorFriends = actorFriends.filter((_, i) => i !== index);

  let removedUserFriends = removedUser.friends;

  index = removedUserFriends.findIndex((friend) => friend._id == actorId);

  if (index === -1) throw new Error("Friend to be removed could not be found");
  removedUserFriends = removedUserFriends.filter((_, i) => i !== index);

  await exports.updateUser([
    {
      query: { _id: actorId },
      updated: { friends: actorFriends },
    },
    {
      query: { _id: removedUserId },
      updated: { friends: removedUserFriends },
    },
  ]);
};

exports.changeProfilePhoto = async (body, file) => {
  if (file) {
    const username = body.username;
    const uploadsFolder = path.join(__dirname, `../uploads/`);
    const destinationFolder = path.join(uploadsFolder, username);
    const destinationPath = path.join(destinationFolder, file.originalname);

    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder, { recursive: true });
    }
    const sourcePath = path.join(uploadsFolder, file.originalname);
    fs.rename(sourcePath, destinationPath, (err) => {
      if (err) {
        throw new Error("Error moving file:", err);
      } else {
        console.log("File moved successfully!");
      }
    });
    const imgUrl = path.join("uploads", username, file.originalname);
    await exports.updateUser([
      {
        query: { username: username },
        updated: {
          imgUrl: imgUrl,
        },
      },
    ]);
    return await exports.fetchUserByUsername(username);
  }
};

exports.updateUser = async (updates) => {
  for (const { query, updated } of updates) {
    await user.updateOne(query, updated);
  }
};
