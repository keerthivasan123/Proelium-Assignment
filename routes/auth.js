var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signin } = require("../controllers/auth");

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 })
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
