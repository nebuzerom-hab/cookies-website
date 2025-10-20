// ======================= order-route.js =======================
const express = require("express");
const router = express.Router();

// Controllers
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getAddresses,
} = require("../Controller/order-controller");

// Middleware
const { authenticate } = require("../Middleware/authenticate");
const optionalAuthenticate = require("../Middleware/optionalAuthenticate"); // for guest orders

// ======================= Routes =======================

// POST /API/orders → anyone (guest or logged-in)
router.post("/orders", optionalAuthenticate, createOrder);

// GET /API/orders → logged-in users only
router.get("/orders", authenticate, getOrders);

// GET /API/orders/:id → logged-in users only
router.get("/orders/:id", authenticate, getOrderById);

// PUT /API/orders/:id → logged-in users only
router.put("/orders/:id", authenticate, updateOrder);

// DELETE /API/orders/:id → logged-in users only
router.delete("/orders/:id", authenticate, deleteOrder);
router.get("/orders/address", authenticate, getAddresses);



module.exports = router;
