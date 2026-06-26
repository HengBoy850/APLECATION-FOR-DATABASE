const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
 
const {
  getPromotions,
  createPromotion,
  updatePromotionStatus,
  deletePromotion,
} = require("../controller/promotionController");
 
router.get("/", getPromotions);
router.post("/", upload.single("image"), createPromotion);
router.patch("/:id/status", updatePromotionStatus);
router.delete("/:id", deletePromotion);
 
module.exports = router;