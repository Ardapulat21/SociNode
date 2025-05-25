const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.fetchUsers);
router.get("/fetchUserByUsername", userController.fetchUserByUsername);
router.post("/fetchUserById", userController.fetchUserById);
router.get("/fetchFriends", userController.fetchFriends);
router.post("/invite", userController.invite);
router.post("/acceptInvite", userController.acceptInvite);

module.exports = router;
