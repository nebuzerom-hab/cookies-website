const express = require("express");
const router = express.Router();
const  login = require("../Controller/login-controler");


// POST /API/login
router.post("/login", login);

module.exports = router;
