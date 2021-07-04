const express = require("express");
const router = express.Router();

const {
    getAdminById,
    createAdmin,
    getAdmin,
    getAllAdmin,
    updateAdmin,
} = require("../controllers/admin");
const { check, validationResult } = require("express-validator");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

//params
router.param("adminId", getAdminById);

//actual routers goes here

//create
router.post(
    "/admin/:adminId",
    [
        check("email", "email is required").isEmail(),
        check("password", "password field is required").isLength({ min: 1 }),
        check("confirmPassword", "confirm password field is required").isLength({ min: 6, max:8 }),
        check("firstName", "first name field is required").isLength({ min: 1 }),
        check("lastName", "last name field is required").isLength({ min: 1 }),
        check("department", "department field is required").isLength({ min: 1 }),
    ],
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createAdmin
);

//read
router.get(
    "/admin/:adminId",
    isSignedIn,
    isAuthenticated,
    isAdmin, getAdmin
);

//update
router.put(
    "/admin/:adminId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateAdmin
);

module.exports = router;
