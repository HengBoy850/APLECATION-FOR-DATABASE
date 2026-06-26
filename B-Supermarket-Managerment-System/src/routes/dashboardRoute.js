
const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getSalesChart,
  getLowStock,
  getProductsByCategory
} = require("../controller/dashboardController");

// 📊 Dashboard summary
router.get("/stats", getDashboardStats);

// 📈 Sales chart
router.get("/sales-chart", getSalesChart);

// ⚠️ Low stock
router.get("/low-stock", getLowStock);

router.get("/products-by-category", getProductsByCategory);

module.exports = router;

