const jwt = require("jsonwebtoken");
const db = require("../Database/DBConfi");

// Middleware to authenticate JWT token
async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ msg: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
}

// Middleware to authorize admin only
function authorizeAdmin(req, res, next) {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ msg: "Forbidden: Admins only" });
  }
  next();
}

module.exports = { authenticate, authorizeAdmin };
