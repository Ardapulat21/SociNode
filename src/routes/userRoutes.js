const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.fetchUsers);
router.get("/fetchUserByUsername", userController.fetchUserByUsername);
router.get("/fetchUserById", userController.fetchUserById);
router.get("/fetchFriends", userController.fetchFriends);

module.exports = router;
