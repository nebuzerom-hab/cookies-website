// const db = require("../Database/DBConfi");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // -------------------------
// // SECRET KEYS (from .env)
// // -------------------------
// const JWT_SECRET = process.env.JWT_SECRET;
// const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// // -------------------------
// // LOGIN SERVICE FUNCTION
// // -------------------------
// async function loginUser(email, password) {
//   try {
//     console.log("🟡 Running SQL: SELECT * FROM users WHERE user_email = ?", [
//       email,
//     ]);

//     // ✅ Do NOT destructure with [rows], db.query() already returns rows
//     const rows = await db.query("SELECT * FROM users WHERE user_email = ?", [
//       email,
//     ]);
//     console.log("🟢 Query success:", rows);

//     // If no user found → invalid login
//     if (rows.length === 0) {
//       console.log("❌ No user found for email:", email);
//       throw { status: 401, message: "Invalid email or password" };
//     }

//     const user = rows[0];

//     // Compare plaintext password with hashed password in DB
//     const isMatch = await bcrypt.compare(password, user.user_password);
//     if (!isMatch) {
//       throw { status: 401, message: "Invalid email or password" };
//     }

//     // Generate JWT tokens
//     const accessToken = jwt.sign({ id: user.user_id }, JWT_SECRET, {
//       expiresIn: "15m",
//     });

//     const refreshToken = jwt.sign({ id: user.user_id }, JWT_REFRESH_SECRET, {
//       expiresIn: "7d",
//     });
    
    


//     // Return user info (never return password!)
//     return {
//       id: user.user_id,
//       email: user.user_email,
//       firstname: user.user_firstName,
//       accessToken,
//       refreshToken,
//     };
//   } catch (err) {
//     console.error("Login error:", err.message || err);
//     throw err;
//   }
// }

// module.exports = { loginUser };
const db = require("../Database/DBConfi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

async function loginUser(email, password) {
  try {
    console.log("🟡 Running SQL: SELECT user + role for email", email);

    // Join users -> user_role -> roles to get role
    const rows = await db.query(
      `SELECT u.*, r.Company_role AS role
       FROM users u
       LEFT JOIN user_role ur ON u.user_id = ur.user_id
       LEFT JOIN roles r ON ur.role_id = r.role_id
       WHERE u.user_email = ?`,
      [email]
    );

    if (rows.length === 0) {
      throw { status: 401, message: "Invalid email or password" };
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.user_password);
    if (!isMatch) {
      throw { status: 401, message: "Invalid email or password" };
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { id: user.user_id, role: user.role },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user.user_id, role: user.role },
      JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Return user info including role
    return {
      id: user.user_id,
      email: user.user_email,
      firstname: user.user_firstName,
      role: user.role || "Customer", // default role if none
      accessToken,
      refreshToken,
    };
  } catch (err) {
    console.error("Login error:", err.message || err);
    throw err;
  }
}

module.exports = { loginUser };

