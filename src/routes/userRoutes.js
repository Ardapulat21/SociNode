const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.fetchUsers);
router.get("/fetchUserByUsername", userController.fetchUserByUsername);
router.get("/fetchUserById", userController.fetchUserById);
module.exports = router;
