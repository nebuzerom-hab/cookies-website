const express = require("express");
const router = express.Router();
const {
  requestPasswordReset,
} = require("../Controller/forget-password-controller");

// POST /API/forget-password
router.post("/forget-password", requestPasswordReset);

module.exports = router;
