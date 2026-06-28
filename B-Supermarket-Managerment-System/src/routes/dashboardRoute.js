
// const express = require("express");
// const router = express.Router();

// const {
//   getDashboardStats,
//   getSalesChart,
//   getLowStock,
//   getProductsByCategory
// } = require("../controller/dashboardController");

// // 📊 Dashboard summary
// router.get("/stats", getDashboardStats);

// // 📈 Sales chart
// router.get("/sales-chart", getSalesChart);

// // ⚠️ Low stock
// router.get("/low-stock", getLowStock);

// router.get("/products-by-category", getProductsByCategory);

// module.exports = router;


const express = require("express");
const router  = express.Router();

const {
  getDashboardStats,
  getSalesChart,
  getLowStock,
  getProductsByCategory,
  getRecentOrders,
} = require("../controller/dashboardController");

router.get("/stats",                getDashboardStats);
router.get("/sales-chart",          getSalesChart);
router.get("/low-stock",            getLowStock);
router.get("/products-by-category", getProductsByCategory);
router.get("/recent-orders",        getRecentOrders);   // new

module.exports = router;
