const express = require("express");
const router = express.Router();

const {
  getUserById,
  createUser,
  getUser,
  updateUser,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

//params
router.param("userId", getUserById);

//actual routers goes here

//create
router.post(
  "/user/create",
  isSignedIn,
  isAuthenticated,
  createUser
);

//read
router.get(
  "/user/:userId",
  isSignedIn,
  isAuthenticated,
  getUser);

//update
router.put(
  "/user/:userId",
  isSignedIn,
  isAuthenticated,
  updateUser
);

module.exports = router;
