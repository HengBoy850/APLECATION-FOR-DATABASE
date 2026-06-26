// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/upload");

// const {
//   uploadProof,
//   getPendingProofs,
//   verifyProof,
// } = require("../controller/paymentProofController");

// const { requireCustomerAuth } = require("../middleware/webAuth");

// // Customer uploads proof for their own order
// router.post("/", requireCustomerAuth, upload.single("image"), uploadProof);

// // Admin/POS: review proofs
// router.get("/pending", getPendingProofs);
// router.patch("/:orderID/verify", verifyProof);

// module.exports = router;

// ============================================================
// REPLACE src/routes/paymentProofRoute.js with this version.
// Simpler than before - admin review now happens via the existing
// PATCH /api/web-orders/:id/status endpoint instead of separate
// verify/pending routes here.
// ============================================================

const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const { uploadProof } = require("../controller/paymentProofController");
const { requireCustomerAuth } = require("../middleware/webAuth");

// Customer uploads proof for their own order
router.post("/", requireCustomerAuth, upload.single("image"), uploadProof);

module.exports = router;



