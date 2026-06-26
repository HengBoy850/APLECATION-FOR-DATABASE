// // ============================================================
// // REPLACE src/controller/paymentProofController.js with this version.
// // Adds:
// //   - Verifies the order belongs to the requesting customer
// //   - Flips web_orders.paymentStatus to 'paid' and status to 'paid'
// //     once a proof is uploaded, so it shows up in the POS admin's
// //     "incoming web orders" feed
// //   - Admin endpoints to list & review pending proofs
// // ============================================================

// const db = require("../config/db");

// // POST /api/payment-proof  (requires requireCustomerAuth)
// // multipart/form-data: { orderID, image }
// const uploadProof = (req, res) => {
//   const { orderID } = req.body;

//   if (!req.file) {
//     return res.status(400).json({ message: "No image uploaded" });
//   }
//   if (!orderID) {
//     return res.status(400).json({ message: "orderID is required" });
//   }

//   // Make sure this order belongs to the customer uploading the proof.
//   db.query(
//     "SELECT customerID FROM web_orders WHERE orderID = ?",
//     [orderID],
//     (lookupErr, rows) => {
//       if (lookupErr) return res.status(500).json(lookupErr);
//       if (rows.length === 0) {
//         return res.status(404).json({ message: "Order not found" });
//       }
//       if (req.customerID && rows[0].customerID !== req.customerID) {
//         return res.status(403).json({ message: "This order doesn't belong to you" });
//       }

//       db.query(
//         "INSERT INTO payment_proofs(orderID, image) VALUES (?, ?)",
//         [orderID, req.file.filename],
//         (err) => {
//           if (err) return res.status(500).json(err);

//           // Mark the order as paid (pending admin verification) so it
//           // surfaces in the POS "incoming web orders" feed.
//           db.query(
//             "UPDATE web_orders SET paymentStatus = 'paid', status = 'paid' WHERE orderID = ?",
//             [orderID],
//             (updateErr) => {
//               if (updateErr) return res.status(500).json(updateErr);
//               res.json({ success: true, message: "Payment proof uploaded" });
//             }
//           );
//         }
//       );
//     }
//   );
// };

// // GET /api/payment-proof/pending  (admin/POS)
// // Lists orders that have a payment proof uploaded but haven't been
// // confirmed/verified by staff yet.
// const getPendingProofs = (req, res) => {
//   const sql = `
//     SELECT pp.proofID, pp.orderID, pp.image, pp.uploadedAt,
//            wo.customerName, wo.phone, wo.totalAmount, wo.paymentMethod, wo.status
//     FROM payment_proofs pp
//     JOIN web_orders wo ON pp.orderID = wo.orderID
//     ORDER BY pp.uploadedAt DESC
//   `;

//   db.query(sql, (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json(result);
//   });
// };

// // PATCH /api/payment-proof/:orderID/verify  (admin/POS)
// // Body: { approve: true | false }
// const verifyProof = (req, res) => {
//   const { orderID } = req.params;
//   const { approve } = req.body;

//   const newStatus = approve ? "processing" : "cancelled";

//   db.query(
//     "UPDATE web_orders SET status = ? WHERE orderID = ?",
//     [newStatus, orderID],
//     (err) => {
//       if (err) return res.status(500).json(err);
//       res.json({ message: `Order ${approve ? "approved" : "rejected"}`, status: newStatus });
//     }
//   );
// };

// module.exports = {
//   uploadProof,
//   getPendingProofs,
//   verifyProof,
// };

// ============================================================
// REPLACE src/controller/paymentProofController.js with this version.
//
// Simpler than an earlier draft: review/confirm now happens via your
// existing PATCH /api/web-orders/:id/status endpoint (called from the
// new "Needs review" block in WebOrders.jsx), so no separate
// verify/pending endpoints are needed here.
//
// Adds:
//   - Verifies the order belongs to the requesting customer
//   - Flips web_orders.paymentStatus + status to 'paid' once a proof
//     is uploaded, so it shows up in the new "Needs review" block
// ============================================================

const db = require("../config/db");

// POST /api/payment-proof  (requires requireCustomerAuth)
// multipart/form-data: { orderID, image }
const uploadProof = (req, res) => {
  const { orderID } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }
  if (!orderID) {
    return res.status(400).json({ message: "orderID is required" });
  }

  // Make sure this order belongs to the customer uploading the proof.
  db.query(
    "SELECT customerID FROM web_orders WHERE orderID = ?",
    [orderID],
    (lookupErr, rows) => {
      if (lookupErr) return res.status(500).json(lookupErr);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Order not found" });
      }
      if (req.customerID && rows[0].customerID !== req.customerID) {
        return res.status(403).json({ message: "This order doesn't belong to you" });
      }

      db.query(
        "INSERT INTO payment_proofs(orderID, image) VALUES (?, ?)",
        [orderID, req.file.filename],
        (err) => {
          if (err) return res.status(500).json(err);

          // Mark the order as paid (pending review) so it surfaces in
          // the POS "Needs review" block.
          db.query(
            "UPDATE web_orders SET paymentStatus = 'paid', status = 'paid' WHERE orderID = ?",
            [orderID],
            (updateErr) => {
              if (updateErr) return res.status(500).json(updateErr);
              res.json({ success: true, message: "Payment proof uploaded" });
            }
          );
        }
      );
    }
  );
};

module.exports = { uploadProof };

