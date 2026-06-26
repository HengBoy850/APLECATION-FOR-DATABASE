const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
 
const {
  getBanners,
  createBanner,
  updateBannerStatus,
  deleteBanner,
} = require("../controller/bannerController");
 
router.get("/", getBanners);
router.post("/", upload.single("image"), createBanner);
router.patch("/:id/status", updateBannerStatus);
router.delete("/:id", deleteBanner);
 
module.exports = router;