const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");

router.post("/fetchMessages", messageController.fetchMessages);

module.exports = router;
