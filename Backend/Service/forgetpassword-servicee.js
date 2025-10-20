const db = require("../Database/DBConfi");
const crypto = require("crypto");

async function createResetToken(email) {
  try {
    // 1. Check if user exists
    const [user] = await db
      .promise()
      .query("SELECT user_email FROM users WHERE user_email = ?", [email]);

    if (user.length === 0) {
      throw new Error("User not found");
    }

    // 2. Generate token
    const token = crypto.randomBytes(20).toString("hex");

    // 3. Save token in DB
    await db
      .promise()
      .query(
        "INSERT INTO password_resets (user_email, reset_token) VALUES (?, ?)",
        [email, token]
      );

    return { email, token };
  } catch (error) {
    throw error;
  }
}

module.exports = { createResetToken };
