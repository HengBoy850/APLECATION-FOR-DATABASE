// const express = require("express");
// const router = express.Router();

// const {
//   createWebOrder,
//   getIncomingWebOrders,
//   getWebOrderDetails,
//   updateWebOrderStatus,
// } = require("../controller/webOrderController");

// router.get("/", getIncomingWebOrders);
// router.get("/:id", getWebOrderDetails);
// router.patch("/:id/status", updateWebOrderStatus);
// router.post("/", createWebOrder);

// module.exports = router;

// ============================================================
// REPLACE src/routes/webOrderRoute.js with this version.
// Adds:
//   - GET /api/web-orders/mine        (customer order history)
//   - requireCustomerAuth on POST     (so orders are linked to a customer)
// Note: route order matters - /mine must come BEFORE /:id so Express
// doesn't treat "mine" as an :id param.
// ============================================================

// const express = require("express");
// const router = express.Router();

// const {
//   createWebOrder,
//   getIncomingWebOrders,
//   getWebOrderDetails,
//   updateWebOrderStatus,
//   getMyOrders,
// } = require("../controller/webOrderController");

// const { requireCustomerAuth } = require("../middleware/webAuth");

// router.get("/", getIncomingWebOrders); // admin/POS: incoming orders feed
// router.get("/mine", requireCustomerAuth, getMyOrders); // customer: my order history
// router.get("/:id", getWebOrderDetails);
// router.patch("/:id/status", updateWebOrderStatus);
// router.post("/", requireCustomerAuth, createWebOrder);

// module.exports = router;

// ============================================================
// REPLACE src/routes/webOrderRoute.js with this version.
//
// Adds:
//   GET   /api/web-orders/needs-review   - orders awaiting proof review
//   PATCH /api/web-orders/:id/confirm    - admin confirms a reviewed order
//   GET   /api/web-orders/mine           - customer order history
//
// Route order matters: "/needs-review" and "/mine" must be registered
// BEFORE "/:id", or Express will treat those words as an :id param.
// ============================================================

// const express = require("express");
// const router = express.Router();

// const {
//   createWebOrder,
//   getIncomingWebOrders,
//   getOrdersNeedingReview,
//   getWebOrderDetails,
//   updateWebOrderStatus,
//   confirmWebOrder,
//   getMyOrders,
// } = require("../controller/webOrderController");

// const { requireCustomerAuth } = require("../middleware/webAuth");

// router.get("/", getIncomingWebOrders); // admin/POS: incoming orders table (processing/delivered/cancelled)
// router.get("/needs-review", getOrdersNeedingReview); // admin/POS: orders with proof awaiting confirmation
// router.get("/mine", requireCustomerAuth, getMyOrders); // customer: my order history

// router.get("/:id", getWebOrderDetails);
// router.patch("/:id/status", updateWebOrderStatus);
// router.patch("/:id/confirm", confirmWebOrder); // admin: confirm a reviewed order -> processing

// router.post("/", requireCustomerAuth, createWebOrder);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const {
//   createWebOrder,
//   getIncomingWebOrders,
//   getOrdersNeedingReview,
//   getWebOrderDetails,
//   updateWebOrderStatus,
//   confirmWebOrder,
//   rejectWebOrder,
//   uploadPaymentProof,
//   getMyOrders,
//   checkStock,
// } = require("../controller/webOrderController");

// const { requireCustomerAuth, optionalCustomerAuth } = require("../middleware/webAuth");

// // ── Multer setup for payment proof images ──────────────────────────────────
// const uploadsDir = path.join(__dirname, "../../uploads");
// if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadsDir),
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `proof_${Date.now()}${ext}`);
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.startsWith("image/"))
//       return cb(new Error("Only image files are allowed"));
//     cb(null, true);
//   },
// });

// // ── Web Order routes ────────────────────────────────────────────────────────
// router.get("/",              getIncomingWebOrders);               // POS: all non-review orders (24h)
// router.get("/needs-review",  getOrdersNeedingReview);             // POS: proof uploaded, awaiting confirm
// router.get("/mine",          requireCustomerAuth, getMyOrders);   // Customer: my history

// router.post("/",             optionalCustomerAuth, createWebOrder); // Customer: place order

// router.get("/:id",           getWebOrderDetails);
// router.patch("/:id/status",  updateWebOrderStatus);
// router.patch("/:id/confirm", confirmWebOrder);                    // Admin: approve proof
// router.patch("/:id/reject",  rejectWebOrder);                     // Admin: reject proof (underpayment)

// // ── Payment proof ───────────────────────────────────────────────────────────
// // This is mounted at /api/payment-proof in your main server file.
// // Export the handler separately so server.js can mount it.
// router.uploadProofHandler = [
//   optionalCustomerAuth,
//   upload.single("image"),
//   uploadPaymentProof,
// ];

// // ── Stock check ─────────────────────────────────────────────────────────────
// router.checkStockHandler = checkStock;

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  createWebOrder,
  getIncomingWebOrders,
  getDeliveryWebOrders,
  getWebOrderDetails,
  updateWebOrderStatus,
  confirmWebOrder,
  deliverWebOrder,
  cancelWebOrder,
  getMyOrders,
  checkStock,
} = require("../controller/webOrderController");

const { requireCustomerAuth, optionalCustomerAuth } = require("../middleware/webAuth");

// ── POS / Admin routes ──────────────────────────────────────────────────────
router.get("/incoming",      getIncomingWebOrders);   // Block 1: pending orders
router.get("/delivery",      getDeliveryWebOrders);   // Block 2: processing / out for delivery
router.get("/mine",          requireCustomerAuth, getMyOrders);

// ── Order actions ───────────────────────────────────────────────────────────
router.post("/",             optionalCustomerAuth, createWebOrder);
router.get("/:id",           getWebOrderDetails);
router.patch("/:id/status",  updateWebOrderStatus);
router.patch("/:id/confirm", confirmWebOrder);   // pending → processing (Block 1 → Block 2)
router.patch("/:id/deliver", deliverWebOrder);   // processing → delivered (Block 2 → Report)
router.patch("/:id/cancel",  cancelWebOrder);    // pending/processing → cancelled

// ── Stock check (mounted separately in server.js) ──────────────────────────
router.checkStockHandler = checkStock;

module.exports = router;