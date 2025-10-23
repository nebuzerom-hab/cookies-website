const express = require("express");
const router = express.Router();
const  login = require("../Controller/login-controler");
const refreshToken =require("../Controller/refresh-controller");


// POST /API/login
router.post("/login", login);
// POST /API/refresh
router.post("/refresh-token", refreshToken);

module.exports = router;
