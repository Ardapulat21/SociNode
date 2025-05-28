const express = require("express");
const router = express.Router();
const fileRoutes = require("../routes/fileRoutes");
const userController = require("../controllers/userController");

router.get("/", userController.fetchUsers);
router.get("/fetchUserByUsername", userController.fetchUserByUsername);
router.post("/fetchUserById", userController.fetchUserById);
router.get("/fetchFriends", userController.fetchFriends);
router.post("/invite", userController.invite);
router.post("/acceptInvite", userController.acceptInvite);
router.post("/declineInvite", userController.declineInvite);
router.post(
  "/profilePhoto",
  fileRoutes.single("image"),
  userController.changeProfilePhoto
);
router.post("/removeFriend", userController.removeFriend);

module.exports = router;
