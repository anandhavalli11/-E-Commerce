const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Public Route - Get All Products
router.get("/", getProducts);

// Admin Only - Add Product
router.post("/", protect, adminOnly, addProduct);

// Admin Only - Update Product
router.put("/:id", protect, adminOnly, updateProduct);

// Admin Only - Delete Product
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;