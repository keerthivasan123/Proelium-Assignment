const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

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
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 }),
    check("confirmPassword", "confirm password field is required").isLength({ min: 1 }),
    check("firstName", "first name field is required").isLength({ min: 1 }),
    check("lastName", "last name field is required").isLength({ min: 1 }),
    check("department", "department field is required").isLength({ min: 1 }),
  ],
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
