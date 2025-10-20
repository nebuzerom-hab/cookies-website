const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  register,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserRole ,
} = require("../Controller/user-controller");

const { authenticate, authorizeAdmin } = require("../Middleware/authenticate");

// Password validation regex
const passwordValidator = body("password")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters")
  .matches(/[a-z]/)
  .withMessage("Password must contain a lowercase letter")
  .matches(/[A-Z]/)
  .withMessage("Password must contain an uppercase letter")
  .matches(/\d/)
  .withMessage("Password must contain a number");

// --------------------
// REGISTER - Public
// --------------------
router.post(
  "/users",
  body("firstname").notEmpty().withMessage("Firstname is required"),
  body("lastname").notEmpty().withMessage("Lastname is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  //passwordValidator,
  register
);

// --------------------
// UPDATE USER - Admin or Self
// --------------------
router.put(
  "/users/:id",
  authenticate, // user must be logged in
  passwordValidator.optional(),
  updateUser
);

// --------------------
// GET ALL USERS - Admin only
// --------------------
router.get("/users", authenticate, authorizeAdmin, getAllUsers);

// --------------------
// GET USER BY ID - Admin or Self
// --------------------
router.get("/users/:id", authenticate, getUserById);

// --------------------
// DELETE USER - Admin only
// --------------------
router.delete("/users/:id", authenticate, authorizeAdmin, deleteUser);
//-------------
// update role admin job
//---------------
router.put(
  "/users/:id/role",
  authenticate,
  authorizeAdmin, // ✅ only admin can change roles
  updateUserRole
);


module.exports = router;
