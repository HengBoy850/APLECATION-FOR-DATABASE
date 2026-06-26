

const express = require("express");
const router = express.Router();

const {
  createSale,
  getPendingSale,
  getTodaySales,
  getSaleDetails,
  getSalesByRange,
  getTopProducts,
} = require("../controller/saleController");

router.post("/", createSale);
router.get("/today", getTodaySales);
router.get("/range", getSalesByRange);
router.get("/top-products", getTopProducts);
router.get("/pending", getPendingSale);
router.get("/:id", getSaleDetails);

module.exports = router;