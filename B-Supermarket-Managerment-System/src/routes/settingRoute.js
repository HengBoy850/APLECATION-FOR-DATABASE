const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { getStoreQr, uploadStoreQr } = require("../controller/settingController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/store-qr", getStoreQr);
router.post("/store-qr", upload.single("qrImage"), uploadStoreQr);

module.exports = router;