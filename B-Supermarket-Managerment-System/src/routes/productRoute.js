// ============================================================
// REPLACE src/routes/productRoute.js with this version.
// Adds: POST /api/products/check-stock
// Note: this route must be registered BEFORE router.put("/:id", ...)
// is irrelevant here since it's a POST, but it must come before any
// future POST "/:something" route if you add one - Express matches
// path patterns in order.
// ============================================================

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");

// const {
//   addProduct,
//   updateProduct,
//   getProducts,
//   deleteProduct,
//   checkStock,
// } = require("../controller/productController");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// router.get("/", getProducts);
// router.post("/check-stock", checkStock);
// router.post("/", upload.single("image"), addProduct);
// router.put("/:id", upload.single("image"), updateProduct);
// router.delete("/:id", deleteProduct);

// module.exports = router;


const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  addProduct,
  updateProduct,
  getProducts,
  deleteProduct,
  checkStock,
} = require("../controller/productController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/", getProducts);
router.post("/check-stock", checkStock);
router.post("/", upload.single("image"), addProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
