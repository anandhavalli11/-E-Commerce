const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createOrder,
  getMyOrders,
} = require("../controllers/orderController");

// Create Order
router.post("/", protect, createOrder);

// Get Logged-in User Orders
router.get("/", protect, getMyOrders);

module.exports = router;