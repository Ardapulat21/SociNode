const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  room: { type: String, required: true },
  messageSequence: [
    {
      senderId: {
        type: String,
        required: true,
      },
      message: { type: String, required: true },
      date: { type: Date, required: true },
    },
  ],
});

module.exports = mongoose.model("Message", MessageSchema);
