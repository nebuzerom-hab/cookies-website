// optionalAuthenticate.js
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function optionalAuthenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = { id: decoded.id }; // attach user_id if token exists
      console.log("Decoded JWT (optional):", decoded);
    }
    // if no token, just continue as guest
    next();
  } catch (err) {
    console.log("Invalid token, proceeding as guest");
    next(); // ignore invalid token
  }
}

module.exports = optionalAuthenticate;
