// Controller/user-controller.js
const { StatusCodes } = require("http-status-codes");
const userService = require("../Service/user-service");
const { validationResult } = require("express-validator");

// REGISTER
async function register(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });

    const { firstname, lastname, email, password } = req.body;
    const user = await userService.registerUser({
      firstname,
      lastname,
      email,
      password,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "User registered", user });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
}

// GET ALL USERS - Admin only
async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    return res.status(StatusCodes.OK).json(users);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
}

// GET USER BY ID - Admin or self
async function getUserById(req, res) {
  try {
    const { id } = req.params;
    if (req.user.role !== "Admin" && req.user.id != id)
      return res.status(StatusCodes.FORBIDDEN).json({ msg: "Forbidden" });

    const user = await userService.getUserById(id);
    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
}

// UPDATE USER - Admin or self
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    if (req.user.role !== "Admin" && req.user.id != id)
      return res.status(StatusCodes.FORBIDDEN).json({ msg: "Forbidden" });

    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });

    const updates = req.body;
    const updatedUser = await userService.updateUser(id, updates);
    return res
      .status(StatusCodes.OK)
      .json({ msg: "User updated", user: updatedUser });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
}

// DELETE USER - Admin only
async function deleteUser(req, res) {
  try {
    if (req.user.role !== "Admin")
      return res.status(StatusCodes.FORBIDDEN).json({ msg: "Forbidden" });

    const { id } = req.params;
    await userService.deleteUser(id);
    return res.status(StatusCodes.OK).json({ msg: "User deleted" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
}
// 🧩 Update user role

const updateUserRole = async (req, res) => {
 
   const { id } = req.params;
   const { role } = req.body;

   try {
     if (!role) return res.status(400).json({ message: "Role is required" });

     const result = await userService.updateUserRole(id, role); // ✅ your service

     res.json({ message: "User role updated successfully", result });
   } catch (error) {
     console.error("❌ Error updating user role:", error);
     res.status(500).json({ message: "Server error", error: error.message });
   }
 };



module.exports = { register, getAllUsers, getUserById, updateUser, deleteUser,updateUserRole };
