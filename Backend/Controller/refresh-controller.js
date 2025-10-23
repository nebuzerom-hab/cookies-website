const jwt = require("jsonwebtoken");

async function refreshToken(req, res) {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ msg: "No refresh token found" });
    }

    // Verify refresh token
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    // Generate new access token
    const accessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return res.status(200).json({
      msg: "Token refreshed",
      accessToken,
    });
  } catch (err) {
    console.error("Refresh error:", err.message || err);
    return res.status(401).json({ msg: "Unauthorized or invalid token" });
  }
}

module.exports = refreshToken;
