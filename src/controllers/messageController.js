const messageService = require("../services/messageService");
exports.saveMessage = async (req, res) => {
  try {
    const savedMessage = await messageService.saveMessage(req.body.messageData);
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.fetchMessages = async (req, res) => {
  try {
    const messages = await messageService.fetchMessages(req.body);
    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
