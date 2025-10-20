const db = require("../Database/DBConfi");
const bcrypt = require("bcrypt");

// ---------------------
// REGISTER USER
// ---------------------
async function registerUser({ firstname, lastname, email, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO users (user_firstName, user_lastName, user_email, user_password) VALUES (?, ?, ?, ?)",
      [firstname, lastname, email, hashedPassword]
    );

    const newUserId = result.insertId;

    // Assign "Customer" role
    const roleRows = await db.query(
      "SELECT role_id FROM roles WHERE Company_role = ?",
      ["Customer"]
    );
    if (roleRows.length > 0) {
      const customerRoleId = roleRows[0].role_id;
      await db.query("INSERT INTO user_role (user_id, role_id) VALUES (?, ?)", [
        newUserId,
        customerRoleId,
      ]);
    }

    return {
      id: newUserId,
      firstname,
      lastname,
      email,
      role: "Customer",
    };
  } catch (err) {
    console.error("RegisterUser ERROR:", err);
    throw err;
  }
}

// ---------------------
// GET ALL USERS
// ---------------------
async function getAllUsers() {
  try {
    const users = await db.query(
      `SELECT u.*, r.Company_role AS role
       FROM users u
       LEFT JOIN user_role ur ON u.user_id = ur.user_id
       LEFT JOIN roles r ON ur.role_id = r.role_id`
    );
    return users;
  } catch (err) {
    console.error("getAllUsers ERROR:", err);
    throw err;
  }
}

// ---------------------
// GET USER BY ID
// ---------------------
async function getUserById(id) {
  try {
    const rows = await db.query("SELECT * FROM users WHERE user_id = ?", [id]);
    return rows[0];
  } catch (err) {
    console.error("getUserById ERROR:", err);
    throw err;
  }
}

// ---------------------
// UPDATE USER
// ---------------------
async function updateUser(id, updates) {
  try {
    const { firstname, lastname, email, password } = updates;

    // Hash new password if provided
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    const query = `
      UPDATE users SET 
      user_firstName = ?, 
      user_lastName = ?, 
      user_email = ?, 
      ${password ? "user_password = ?" : ""}
      WHERE user_id = ?
    `;

    const params = password
      ? [firstname, lastname, email, hashedPassword, id]
      : [firstname, lastname, email, id];

    await db.query(query, params);

    return { id, firstname, lastname, email };
  } catch (err) {
    console.error("updateUser ERROR:", err);
    throw err;
  }
}

// ---------------------
// DELETE USER
// ---------------------
async function deleteUser(id) {
  try {
    await db.query("DELETE FROM users WHERE user_id = ?", [id]);
  } catch (err) {
    console.error("deleteUser ERROR:", err);
    throw err;
  }
}
async function updateUserRole(id, role) {
  try {
    // First, get role_id from roles table
    const roleRows = await db.query(
      "SELECT role_id FROM roles WHERE Company_role = ?",
      [role]
    );
    if (roleRows.length === 0) {
      throw new Error(`Role "${role}" does not exist`);
    }

    const roleId = roleRows[0].role_id;

    // Update user_role table
    await db.query("UPDATE user_role SET role_id = ? WHERE user_id = ?", [
      roleId,
      id,
    ]);

    return { message: "User role updated successfully" };
  } catch (err) {
    console.error("updateUserRole ERROR:", err);
    throw err;
  }
}


// ---------------------
// Export all functions
// ---------------------
module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserRole,
};
