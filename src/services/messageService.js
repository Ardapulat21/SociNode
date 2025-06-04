const messages = require("../models/messages");

exports.saveMessage = async (messageData) => {
  await messages.updateOne(
    { room: messageData.room },
    {
      $push: {
        messageSequence: {
          senderId: messageData.senderId,
          message: messageData.message,
          date: new Date(),
        },
      },
    },
    { upsert: true }
  );
};

exports.fetchMessages = async (body) => {
  let _id = getRoomName(body.senderId, body.receiverId);
  return await messages.findOne({ room: _id });
};

const getRoomName = (userId1, userId2) => {
  const ids = [userId1, userId2].sort();
  return `chat_${ids[0]}_${ids[1]}`;
};
