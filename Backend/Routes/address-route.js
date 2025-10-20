const express = require("express");
const router = express.Router();
const addressController = require("../Controller/address-controler");
const optionalAuthenticate = require("../Middleware/optionalAuthenticate");
const authenticate = require("../Middleware/authenticate");

// POST /API/addresses → create new address (guest or logged in user)
router.post(
  "/addresses",
  optionalAuthenticate,
  addressController.createAddress
);

// GET /API/addresses → fetch all addresses (require login if needed, or leave public)
router.get("/addresses", authenticate, addressController.getAddresses);

module.exports = router;
