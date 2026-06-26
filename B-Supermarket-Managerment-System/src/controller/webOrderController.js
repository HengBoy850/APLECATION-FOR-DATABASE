// // ============================================================
// // FULL REPLACEMENT for src/controller/webOrderController.js
// //
// // This is your original file with two changes:
// //   1. createWebOrder now links the order to the logged-in customer
// //      (req.customerID, set by requireCustomerAuth) and re-validates +
// //      decrements stock atomically before committing.
// //   2. New getMyOrders function added for customer order history.
// //
// // getIncomingWebOrders, getWebOrderDetails, and updateWebOrderStatus
// // are your originals, unchanged.
// // ============================================================

// const db = require("../config/db");

// // List orders placed on the web in the last 24 hours. Computed live from
// // createdAt rather than trusting the visibleInOrdersPage flag, since that
// // flag only flips with a cron job you'd have to run separately - this way
// // it's always correct without one.
// const getIncomingWebOrders = (req, res) => {
//   const sql = `
//     SELECT wo.orderID AS id,
//            COALESCE(wc.name, 'Guest') AS name,
//            wo.phone, wo.address, wo.status, wo.paymentMethod,
//            wo.totalAmount, wo.createdAt
//     FROM web_orders wo
//     LEFT JOIN web_customers wc ON wo.customerID = wc.customerID
//     WHERE wo.paymentStatus='paid'
//     AND wo.createdAt >= NOW() - INTERVAL 24 HOUR
//     ORDER BY wo.createdAt DESC
//   `;

//   db.query(sql, (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json(result);
//   });
// };

// // Invoice view for one web order
// const getWebOrderDetails = (req, res) => {
//   const orderSql = `
//     SELECT wo.*, COALESCE(wc.name, 'Guest') AS customerName
//     FROM web_orders wo
//     LEFT JOIN web_customers wc ON wo.customerID = wc.customerID
//     WHERE wo.orderID = ?
//   `;
//   const itemsSql = `SELECT * FROM web_order_items WHERE orderID = ?`;

//   db.query(orderSql, [req.params.id], (err, orderResult) => {
//     if (err) return res.status(500).json(err);
//     if (orderResult.length === 0) return res.status(404).json({ message: "Order not found" });

//     db.query(itemsSql, [req.params.id], (err2, itemsResult) => {
//       if (err2) return res.status(500).json(err2);
//       res.json({ order: orderResult[0], items: itemsResult });
//     });
//   });
// };

// // Cashier marks an incoming web order as processing / delivered / cancelled
// const updateWebOrderStatus = (req, res) => {
//   const { status } = req.body;
//   const allowed = ["pending", "paid", "processing", "delivered", "cancelled"];

//   if (!allowed.includes(status)) {
//     return res.status(400).json({ message: "Invalid status" });
//   }

//   db.query(
//     "UPDATE web_orders SET status = ? WHERE orderID = ?",
//     [status, req.params.id],
//     (err) => {
//       if (err) return res.status(500).json(err);
//       res.json({ message: "Order status updated" });
//     }
//   );
// };

// // UPDATED createWebOrder - now:
// //  1. Links the order to the logged-in customer (req.customerID, set by
// //     the requireCustomerAuth middleware)
// //  2. Re-validates stock server-side and decrements it
// //  3. Stores subtotal/discount alongside total (columns already exist
// //     per your schema additions)
// const createWebOrder = (req, res) => {
//   const {
//     customerName,
//     phone,
//     address,
//     paymentMethod,
//     subtotalAmount,
//     discountAmount,
//     totalAmount,
//     items,
//   } = req.body;

//   const customerID = req.customerID || null;

//   if (!items || items.length === 0) {
//     return res.status(400).json({ message: "No items in order" });
//   }

//   // Re-check stock right before committing the order.
//   const productIDs = items.map((i) => i.productID);
//   const placeholders = productIDs.map(() => "?").join(",");

//   db.query(
//     `SELECT productID, productName, quantity FROM products WHERE productID IN (${placeholders})`,
//     productIDs,
//     (stockErr, stockRows) => {
//       if (stockErr) return res.status(500).json(stockErr);

//       const stockByID = {};
//       stockRows.forEach((r) => (stockByID[r.productID] = r));

//       const unavailable = items.filter((i) => {
//         const p = stockByID[i.productID];
//         return !p || p.quantity < i.qty;
//       });

//       if (unavailable.length > 0) {
//         return res.status(409).json({
//           message: "Some items are no longer in stock",
//           unavailable: unavailable.map((i) => ({
//             productID: i.productID,
//             productName: i.productName,
//           })),
//         });
//       }

//       const sql = `
//         INSERT INTO web_orders
//         (
//           customerID,
//           customerName,
//           phone,
//           address,
//           paymentMethod,
//           subtotalAmount,
//           discountAmount,
//           totalAmount,
//           paymentStatus,
//           status
//         )
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending')
//       `;

//       db.query(
//         sql,
//         [
//           customerID,
//           customerName,
//           phone,
//           address,
//           paymentMethod,
//           subtotalAmount,
//           discountAmount,
//           totalAmount,
//         ],
//         (err, result) => {
//           if (err) return res.status(500).json(err);

//           const orderID = result.insertId;

//           const itemValues = items.map((i) => [
//             orderID,
//             i.productID,
//             i.productName,
//             i.price,
//             i.qty,
//             i.price * i.qty,
//           ]);

//           db.query(
//             `
//             INSERT INTO web_order_items
//             (
//               orderID,
//               productID,
//               productName,
//               price,
//               quantity,
//               subtotal
//             )
//             VALUES ?
//             `,
//             [itemValues],
//             (err2) => {
//               if (err2) return res.status(500).json(err2);

//               // Decrement stock now that the order is committed.
//               items.forEach((i) => {
//                 db.query(
//                   "UPDATE products SET quantity = quantity - ? WHERE productID = ?",
//                   [i.qty, i.productID]
//                 );
//               });

//               res.json({
//                 message: "Order Created",
//                 orderID,
//               });
//             }
//           );
//         }
//       );
//     }
//   );
// };

// // NEW: GET /api/web-orders/mine  (requires requireCustomerAuth)
// // Order history for the logged-in customer.
// const getMyOrders = (req, res) => {
//   const sql = `
//     SELECT orderID, status, paymentMethod, paymentStatus,
//            totalAmount, subtotalAmount, discountAmount, createdAt
//     FROM web_orders
//     WHERE customerID = ?
//     ORDER BY createdAt DESC
//   `;

//   db.query(sql, [req.customerID], (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json(result);
//   });
// };

// module.exports = {
//   createWebOrder,
//   getIncomingWebOrders,
//   getWebOrderDetails,
//   updateWebOrderStatus,
//   getMyOrders,
// };



// ============================================================
// FULL REPLACEMENT for src/controller/webOrderController.js
//
// Changes from your current version:
//   1. getIncomingWebOrders now EXCLUDES status='paid' orders (those
//      move to the new "needs review" block instead) - it shows
//      processing/delivered/cancelled from the last 24h.
//   2. NEW getOrdersNeedingReview - orders with status='paid', i.e.
//      proof uploaded, awaiting admin confirmation. Includes the
//      latest payment_proofs image so the frontend can show it inline
//      without a second request.
//   3. getWebOrderDetails now also returns the payment proof image
//      (if any) alongside order + items, for the invoice modal.
//   4. NEW confirmWebOrder - admin clicks Confirm: flips status
//      'paid' -> 'processing'. This is what removes it from the
//      review block and makes it appear in the normal table.
//   5. createWebOrder / getMyOrders unchanged from before.
// ============================================================

// const db = require("../config/db");

// // Existing incoming-orders table: now only processing/delivered/cancelled
// // from the last 24h. 'paid' orders are reviewed separately and don't
// // show here until confirmed.
// const getIncomingWebOrders = (req, res) => {
//   const sql = `
//     SELECT wo.orderID AS id,
//            COALESCE(wc.name, wo.customerName, 'Guest') AS name,
//            wo.phone, wo.address, wo.status, wo.paymentMethod,
//            wo.totalAmount, wo.createdAt
//     FROM web_orders wo
//     LEFT JOIN web_customers wc ON wo.customerID = wc.customerID
//     WHERE wo.status IN ('processing', 'delivered', 'cancelled')
//     AND wo.createdAt >= NOW() - INTERVAL 24 HOUR
//     ORDER BY wo.createdAt DESC
//   `;

//   db.query(sql, (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json(result);
//   });
// };

// // NEW: orders waiting on admin review (proof uploaded, not yet confirmed).
// // Includes the proof image filename directly so the frontend doesn't
// // need a second fetch per order.
// const getOrdersNeedingReview = (req, res) => {
//   const sql = `
//     SELECT wo.orderID AS id,
//            COALESCE(wc.name, wo.customerName, 'Guest') AS name,
//            wo.phone, wo.address, wo.paymentMethod,
//            wo.totalAmount, wo.createdAt,
//            pp.image AS proofImage,
//            pp.uploadedAt AS proofUploadedAt
//     FROM web_orders wo
//     LEFT JOIN web_customers wc ON wo.customerID = wc.customerID
//     LEFT JOIN (
//       -- latest proof per order, in case a customer uploaded more than once
//       SELECT p1.*
//       FROM payment_proofs p1
//       INNER JOIN (
//         SELECT orderID, MAX(proofID) AS latestProofID
//         FROM payment_proofs
//         GROUP BY orderID
//       ) p2 ON p1.orderID = p2.orderID AND p1.proofID = p2.latestProofID
//     ) pp ON pp.orderID = wo.orderID
//     WHERE wo.status = 'paid'
//     ORDER BY wo.createdAt DESC
//   `;

//   db.query(sql, (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json(result);
//   });
// };

// // Invoice view for one web order - now also includes the payment proof
// // image (if any) so the modal can show it without a separate call.
// const getWebOrderDetails = (req, res) => {
//   const orderSql = `
//     SELECT wo.*, COALESCE(wc.name, wo.customerName, 'Guest') AS customerName
//     FROM web_orders wo
//     LEFT JOIN web_customers wc ON wo.customerID = wc.customerID
//     WHERE wo.orderID = ?
//   `;
//   const itemsSql = `SELECT * FROM web_order_items WHERE orderID = ?`;
//   const proofSql = `
//     SELECT image, uploadedAt FROM payment_proofs
//     WHERE orderID = ? ORDER BY proofID DESC LIMIT 1
//   `;

//   db.query(orderSql, [req.params.id], (err, orderResult) => {
//     if (err) return res.status(500).json(err);
//     if (orderResult.length === 0) return res.status(404).json({ message: "Order not found" });

//     db.query(itemsSql, [req.params.id], (err2, itemsResult) => {
//       if (err2) return res.status(500).json(err2);

//       db.query(proofSql, [req.params.id], (err3, proofResult) => {
//         if (err3) return res.status(500).json(err3);

//         res.json({
//           order: orderResult[0],
//           items: itemsResult,
//           proof: proofResult.length > 0 ? proofResult[0] : null,
//         });
//       });
//     });
//   });
// };

// // Cashier marks an incoming web order as processing / delivered / cancelled
// // (used by the status dropdown in your existing table - unchanged)
// const updateWebOrderStatus = (req, res) => {
//   const { status } = req.body;
//   const allowed = ["pending", "paid", "processing", "delivered", "cancelled"];

//   if (!allowed.includes(status)) {
//     return res.status(400).json({ message: "Invalid status" });
//   }

//   db.query(
//     "UPDATE web_orders SET status = ? WHERE orderID = ?",
//     [status, req.params.id],
//     (err) => {
//       if (err) return res.status(500).json(err);
//       res.json({ message: "Order status updated" });
//     }
//   );
// };

// // NEW: admin clicks "Confirm" in the Needs Review block.
// // Flips status 'paid' -> 'processing', which removes it from the
// // review block and surfaces it in the normal incoming-orders table.
// const confirmWebOrder = (req, res) => {
//   db.query(
//     "UPDATE web_orders SET status = 'processing' WHERE orderID = ? AND status = 'paid'",
//     [req.params.id],
//     (err, result) => {
//       if (err) return res.status(500).json(err);
//       if (result.affectedRows === 0) {
//         return res.status(409).json({
//           message: "Order is not awaiting review (already confirmed or in a different state)",
//         });
//       }
//       res.json({ message: "Order confirmed", status: "processing" });
//     }
//   );
// };

// // createWebOrder - unchanged from before (links to logged-in customer,
// // re-validates + decrements stock).
// const createWebOrder = (req, res) => {
//   const {
//     customerName,
//     phone,
//     address,
//     paymentMethod,
//     subtotalAmount,
//     discountAmount,
//     totalAmount,
//     items,
//   } = req.body;

//   const customerID = req.customerID || null;

//   if (!items || items.length === 0) {
//     return res.status(400).json({ message: "No items in order" });
//   }

//   const productIDs = items.map((i) => i.productID);
//   const placeholders = productIDs.map(() => "?").join(",");

//   db.query(
//     `SELECT productID, productName, quantity FROM products WHERE productID IN (${placeholders})`,
//     productIDs,
//     (stockErr, stockRows) => {
//       if (stockErr) return res.status(500).json(stockErr);

//       const stockByID = {};
//       stockRows.forEach((r) => (stockByID[r.productID] = r));

//       const unavailable = items.filter((i) => {
//         const p = stockByID[i.productID];
//         return !p || p.quantity < i.qty;
//       });

//       if (unavailable.length > 0) {
//         return res.status(409).json({
//           message: "Some items are no longer in stock",
//           unavailable: unavailable.map((i) => ({
//             productID: i.productID,
//             productName: i.productName,
//           })),
//         });
//       }

//       const sql = `
//         INSERT INTO web_orders
//         (
//           customerID,
//           customerName,
//           phone,
//           address,
//           paymentMethod,
//           subtotalAmount,
//           discountAmount,
//           totalAmount,
//           paymentStatus,
//           status
//         )
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending')
//       `;

//       db.query(
//         sql,
//         [
//           customerID,
//           customerName,
//           phone,
//           address,
//           paymentMethod,
//           subtotalAmount,
//           discountAmount,
//           totalAmount,
//         ],
//         (err, result) => {
//           if (err) return res.status(500).json(err);

//           const orderID = result.insertId;

//           const itemValues = items.map((i) => [
//             orderID,
//             i.productID,
//             i.productName,
//             i.price,
//             i.qty,
//             i.price * i.qty,
//           ]);

//           db.query(
//             `
//             INSERT INTO web_order_items
//             (
//               orderID,
//               productID,
//               productName,
//               price,
//               quantity,
//               subtotal
//             )
//             VALUES ?
//             `,
//             [itemValues],
//             (err2) => {
//               if (err2) return res.status(500).json(err2);

//               items.forEach((i) => {
//                 db.query(
//                   "UPDATE products SET quantity = quantity - ? WHERE productID = ?",
//                   [i.qty, i.productID]
//                 );
//               });

//               res.json({
//                 message: "Order Created",
//                 orderID,
//               });
//             }
//           );
//         }
//       );
//     }
//   );
// };

// // GET /api/web-orders/mine  (requires requireCustomerAuth)
// const getMyOrders = (req, res) => {
//   const sql = `
//     SELECT orderID, status, paymentMethod, paymentStatus,
//            totalAmount, subtotalAmount, discountAmount, createdAt
//     FROM web_orders
//     WHERE customerID = ?
//     ORDER BY createdAt DESC
//   `;

//   db.query(sql, [req.customerID], (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json(result);
//   });
// };

// module.exports = {
//   createWebOrder,
//   getIncomingWebOrders,
//   getOrdersNeedingReview,
//   getWebOrderDetails,
//   updateWebOrderStatus,
//   confirmWebOrder,
//   getMyOrders,
// };








// const db = require("../config/db");

// // ─── ADMIN / POS ────────────────────────────────────────────────────────────

// /**
//  * GET /api/web-orders
//  * All orders from last 24h that are NOT in "needs review" (paid but unconfirmed).
//  * Includes pending orders so the shop sees orders the moment they're placed.
//  */
// const getIncomingWebOrders = (req, res) => {
//   const sql = `
//     SELECT
//       wo.orderID AS id,
//       COALESCE(wc.name, wo.customerName, 'Guest') AS name,
//       wo.phone,
//       wo.address,
//       wo.status,
//       wo.paymentMethod,
//       wo.totalAmount,
//       wo.subtotalAmount,
//       wo.discountAmount,
//       wo.adminNote,
//       wo.createdAt
//     FROM web_orders wo
//     LEFT JOIN web_customers wc ON wo.customerID = wc.customerID
//     WHERE wo.status IN ('pending', 'processing', 'delivered', 'cancelled')
//       AND wo.createdAt >= NOW() - INTERVAL 24 HOUR
//     ORDER BY wo.createdAt DESC
//   `;
//   db.query(sql, (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json(result);
//   });
// };

// /**
//  * GET /api/web-orders/needs-review
//  * Orders where customer uploaded payment proof but admin hasn't confirmed yet.
//  * Includes amountPaid vs totalAmount so admin can spot underpayments.
//  */
// const getOrdersNeedingReview = (req, res) => {
//   const sql = `
//     SELECT
//       wo.orderID AS id,
//       COALESCE(wc.name, wo.customerName, 'Guest') AS name,
//       wo.phone,
//       wo.address,
//       wo.paymentMethod,
//       wo.totalAmount,
//       wo.subtotalAmount,
//       wo.discountAmount,
//       wo.createdAt,
//       pp.image        AS proofImage,
//       pp.amountPaid,
//       pp.note         AS customerNote,
//       pp.uploadedAt   AS proofUploadedAt,
//       -- flag if customer paid less than order total
//       CASE WHEN pp.amountPaid IS NOT NULL AND pp.amountPaid < wo.totalAmount
//            THEN 1 ELSE 0 END AS isUnderpaid,
//       -- difference (negative means underpaid)
//       CASE WHEN pp.amountPaid IS NOT NULL
//            THEN pp.amountPaid - wo.totalAmount
//            ELSE NULL END     AS paymentDiff
//     FROM web_orders wo
//     LEFT JOIN web_customers wc ON wo.customerID = wc.customerID
//     LEFT JOIN (
//       SELECT p1.*
//       FROM payment_proofs p1
//       INNER JOIN (
//         SELECT orderID, MAX(proofID) AS latestProofID
//         FROM payment_proofs GROUP BY orderID
//       ) p2 ON p1.orderID = p2.orderID AND p1.proofID = p2.latestProofID
//     ) pp ON pp.orderID = wo.orderID
//     WHERE wo.status = 'paid'
//     ORDER BY pp.amountPaid < wo.totalAmount DESC, wo.createdAt ASC
//   `;
//   db.query(sql, (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json(result);
//   });
// };

// /**
//  * GET /api/web-orders/:id
//  * Full invoice for one order including items + latest payment proof.
//  */
// const getWebOrderDetails = (req, res) => {
//   const id = req.params.id;
//   const orderSql = `
//     SELECT wo.*, COALESCE(wc.name, wo.customerName, 'Guest') AS customerName
//     FROM web_orders wo
//     LEFT JOIN web_customers wc ON wo.customerID = wc.customerID
//     WHERE wo.orderID = ?
//   `;
//   const itemsSql = `SELECT * FROM web_order_items WHERE orderID = ?`;
//   const proofSql = `
//     SELECT image, amountPaid, note, uploadedAt
//     FROM payment_proofs WHERE orderID = ?
//     ORDER BY proofID DESC LIMIT 1
//   `;

//   db.query(orderSql, [id], (err, orderResult) => {
//     if (err) return res.status(500).json(err);
//     if (!orderResult.length) return res.status(404).json({ message: "Order not found" });

//     db.query(itemsSql, [id], (err2, itemsResult) => {
//       if (err2) return res.status(500).json(err2);

//       db.query(proofSql, [id], (err3, proofResult) => {
//         if (err3) return res.status(500).json(err3);

//         const order = orderResult[0];
//         const proof = proofResult[0] || null;

//         res.json({
//           order,
//           items: itemsResult,
//           proof,
//           isUnderpaid: proof?.amountPaid != null && proof.amountPaid < order.totalAmount,
//           paymentDiff: proof?.amountPaid != null ? proof.amountPaid - order.totalAmount : null,
//         });
//       });
//     });
//   });
// };

// /**
//  * PATCH /api/web-orders/:id/status
//  * Admin changes status via dropdown (processing / delivered / cancelled).
//  */
// const updateWebOrderStatus = (req, res) => {
//   const { status } = req.body;
//   const allowed = ["pending", "paid", "processing", "delivered", "cancelled"];
//   if (!allowed.includes(status))
//     return res.status(400).json({ message: "Invalid status" });

//   db.query(
//     "UPDATE web_orders SET status = ? WHERE orderID = ?",
//     [status, req.params.id],
//     (err) => {
//       if (err) return res.status(500).json(err);
//       res.json({ message: "Status updated" });
//     }
//   );
// };

// /**
//  * PATCH /api/web-orders/:id/confirm
//  * Admin confirms payment proof is valid → status 'paid' → 'processing'.
//  */
// const confirmWebOrder = (req, res) => {
//   const { adminNote } = req.body || {};
//   db.query(
//     `UPDATE web_orders
//      SET status = 'processing', adminNote = ?
//      WHERE orderID = ? AND status = 'paid'`,
//     [adminNote || null, req.params.id],
//     (err, result) => {
//       if (err) return res.status(500).json(err);
//       if (result.affectedRows === 0)
//         return res.status(409).json({ message: "Order is not awaiting review" });
//       res.json({ message: "Order confirmed", status: "processing" });
//     }
//   );
// };

// /**
//  * PATCH /api/web-orders/:id/reject
//  * Admin rejects payment proof (e.g. underpayment) → back to 'pending'
//  * so customer is notified to pay again.
//  */
// const rejectWebOrder = (req, res) => {
//   const { adminNote } = req.body || {};
//   db.query(
//     `UPDATE web_orders
//      SET status = 'pending', adminNote = ?
//      WHERE orderID = ? AND status = 'paid'`,
//     [adminNote || "Payment rejected", req.params.id],
//     (err, result) => {
//       if (err) return res.status(500).json(err);
//       if (result.affectedRows === 0)
//         return res.status(409).json({ message: "Order is not in paid status" });
//       res.json({ message: "Payment rejected", status: "pending" });
//     }
//   );
// };

// // ─── CUSTOMER ───────────────────────────────────────────────────────────────

// /**
//  * POST /api/web-orders
//  * Customer places an order. Order immediately visible in POS as 'pending'.
//  */
// const createWebOrder = (req, res) => {
//   const {
//     customerName, phone, address, paymentMethod,
//     subtotalAmount, discountAmount, totalAmount, items,
//   } = req.body;

//   const customerID = req.customerID || null;

//   if (!items || items.length === 0)
//     return res.status(400).json({ message: "No items in order" });

//   const productIDs = items.map((i) => i.productID);
//   const placeholders = productIDs.map(() => "?").join(",");

//   db.query(
//     `SELECT productID, productName, quantity FROM products WHERE productID IN (${placeholders})`,
//     productIDs,
//     (stockErr, stockRows) => {
//       if (stockErr) return res.status(500).json(stockErr);

//       const stockByID = {};
//       stockRows.forEach((r) => (stockByID[r.productID] = r));

//       const unavailable = items.filter((i) => {
//         const p = stockByID[i.productID];
//         return !p || p.quantity < i.qty;
//       });

//       if (unavailable.length > 0) {
//         return res.status(409).json({
//           message: "Some items are out of stock",
//           unavailable: unavailable.map((i) => ({
//             productID: i.productID,
//             productName: i.productName,
//           })),
//         });
//       }

//       const sql = `
//         INSERT INTO web_orders
//           (customerID, customerName, phone, address, paymentMethod,
//            subtotalAmount, discountAmount, totalAmount, paymentStatus, status)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending')
//       `;

//       db.query(
//         sql,
//         [customerID, customerName, phone, address, paymentMethod,
//          subtotalAmount, discountAmount, totalAmount],
//         (err, result) => {
//           if (err) return res.status(500).json(err);
//           const orderID = result.insertId;

//           const itemValues = items.map((i) => [
//             orderID, i.productID, i.productName,
//             i.price, i.qty, i.price * i.qty,
//           ]);

//           db.query(
//             `INSERT INTO web_order_items
//                (orderID, productID, productName, price, quantity, subtotal)
//              VALUES ?`,
//             [itemValues],
//             (err2) => {
//               if (err2) return res.status(500).json(err2);

//               // Decrement stock
//               items.forEach((i) => {
//                 db.query(
//                   "UPDATE products SET quantity = quantity - ? WHERE productID = ?",
//                   [i.qty, i.productID]
//                 );
//               });

//               res.json({ message: "Order created", orderID });
//             }
//           );
//         }
//       );
//     }
//   );
// };

// /**
//  * POST /api/payment-proof
//  * Customer uploads proof after paying. Also records amountPaid if provided.
//  * Updates order status to 'paid' → triggers "Needs Review" in POS.
//  */
// const uploadPaymentProof = (req, res) => {
//   const { orderID, amountPaid, note } = req.body;

//   if (!orderID) return res.status(400).json({ message: "orderID is required" });
//   if (!req.file) return res.status(400).json({ message: "Image file is required" });

//   // Verify the order belongs to this customer (if logged in)
//   const ownerCheck = req.customerID
//     ? `AND (customerID = ${db.escape(req.customerID)} OR customerID IS NULL)`
//     : "";

//   db.query(
//     `SELECT orderID, totalAmount, status FROM web_orders WHERE orderID = ? ${ownerCheck}`,
//     [orderID],
//     (err, rows) => {
//       if (err) return res.status(500).json(err);
//       if (!rows.length) return res.status(404).json({ message: "Order not found" });

//       const order = rows[0];
//       if (order.status === "delivered" || order.status === "cancelled") {
//         return res.status(409).json({ message: "Cannot upload proof for this order" });
//       }

//       // Insert proof record
//       db.query(
//         `INSERT INTO payment_proofs (orderID, image, amountPaid, note)
//          VALUES (?, ?, ?, ?)`,
//         [orderID, req.file.filename, amountPaid || null, note || null],
//         (proofErr) => {
//           if (proofErr) return res.status(500).json(proofErr);

//           // Move order to 'paid' so it surfaces in Needs Review
//           db.query(
//             `UPDATE web_orders SET status = 'paid', paymentStatus = 'paid'
//              WHERE orderID = ?`,
//             [orderID],
//             (updateErr) => {
//               if (updateErr) return res.status(500).json(updateErr);
//               res.json({ message: "Payment proof uploaded", orderID });
//             }
//           );
//         }
//       );
//     }
//   );
// };

// /**
//  * GET /api/web-orders/mine
//  * Customer's own order history with latest payment status.
//  */
// const getMyOrders = (req, res) => {
//   const sql = `
//     SELECT
//       wo.orderID, wo.status, wo.paymentMethod, wo.paymentStatus,
//       wo.totalAmount, wo.subtotalAmount, wo.discountAmount,
//       wo.adminNote, wo.createdAt,
//       pp.amountPaid, pp.uploadedAt AS proofUploadedAt
//     FROM web_orders wo
//     LEFT JOIN (
//       SELECT p1.orderID, p1.amountPaid, p1.uploadedAt
//       FROM payment_proofs p1
//       INNER JOIN (
//         SELECT orderID, MAX(proofID) AS lid FROM payment_proofs GROUP BY orderID
//       ) p2 ON p1.orderID = p2.orderID AND p1.proofID = p2.lid
//     ) pp ON pp.orderID = wo.orderID
//     WHERE wo.customerID = ?
//     ORDER BY wo.createdAt DESC
//   `;
//   db.query(sql, [req.customerID], (err, result) => {
//     if (err) return res.status(500).json(err);
//     res.json(result);
//   });
// };

// /**
//  * POST /api/products/check-stock
//  * Pre-checkout stock validation.
//  */
// const checkStock = (req, res) => {
//   const { items } = req.body;
//   if (!items?.length) return res.status(400).json({ message: "No items provided" });

//   const ids = items.map((i) => i.productID);
//   db.query(
//     `SELECT productID, productName, quantity FROM products WHERE productID IN (${ids.map(() => "?").join(",")})`,
//     ids,
//     (err, rows) => {
//       if (err) return res.status(500).json(err);
//       const stockMap = {};
//       rows.forEach((r) => (stockMap[r.productID] = r));

//       const unavailable = items.filter((i) => {
//         const p = stockMap[i.productID];
//         return !p || p.quantity < i.quantity;
//       });

//       res.json({ allInStock: unavailable.length === 0, unavailable });
//     }
//   );
// };

// module.exports = {
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
// };



const db = require("../config/db");

// ─── ADMIN / POS ────────────────────────────────────────────────────────────

/**
 * GET /api/web-orders/incoming
 * Block 1: New orders with status 'pending' — staff needs to arrange items.
 * No 24h limit — shows all pending until confirmed.
 */
const getIncomingWebOrders = (req, res) => {
  const sql = `
    SELECT
      wo.orderID AS id,
      COALESCE(wc.name, wo.customerName, 'Guest') AS name,
      wo.phone,
      wo.address,
      wo.paymentMethod,
      wo.totalAmount,
      wo.subtotalAmount,
      wo.discountAmount,
      wo.createdAt,
      COUNT(wi.itemID) AS itemCount
    FROM web_orders wo
    LEFT JOIN web_customers wc ON wo.customerID = wc.customerID
    LEFT JOIN web_order_items wi ON wo.orderID = wi.orderID
    WHERE wo.status = 'pending'
    GROUP BY wo.orderID
    ORDER BY wo.createdAt ASC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

/**
 * GET /api/web-orders/delivery
 * Block 2: Orders confirmed by staff, now out for delivery (status = 'processing').
 * Only shows last 24h — clears automatically after 24h.
 */
const getDeliveryWebOrders = (req, res) => {
  const sql = `
    SELECT
      wo.orderID AS id,
      COALESCE(wc.name, wo.customerName, 'Guest') AS name,
      wo.phone,
      wo.address,
      wo.paymentMethod,
      wo.totalAmount,
      wo.subtotalAmount,
      wo.discountAmount,
      wo.createdAt,
      wo.adminNote,
      COUNT(wi.itemID) AS itemCount
    FROM web_orders wo
    LEFT JOIN web_customers wc ON wo.customerID = wc.customerID
    LEFT JOIN web_order_items wi ON wo.orderID = wi.orderID
    WHERE wo.status = 'processing'
      AND wo.createdAt >= NOW() - INTERVAL 24 HOUR
    GROUP BY wo.orderID
    ORDER BY wo.createdAt ASC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

/**
 * GET /api/web-orders/:id
 * Full order details including items list.
 */
const getWebOrderDetails = (req, res) => {
  const id = req.params.id;

  const orderSql = `
    SELECT wo.*, COALESCE(wc.name, wo.customerName, 'Guest') AS customerName
    FROM web_orders wo
    LEFT JOIN web_customers wc ON wo.customerID = wc.customerID
    WHERE wo.orderID = ?
  `;
  const itemsSql = `SELECT * FROM web_order_items WHERE orderID = ? ORDER BY itemID`;

  db.query(orderSql, [id], (err, orderResult) => {
    if (err) return res.status(500).json(err);
    if (!orderResult.length) return res.status(404).json({ message: "Order not found" });

    db.query(itemsSql, [id], (err2, itemsResult) => {
      if (err2) return res.status(500).json(err2);
      res.json({ order: orderResult[0], items: itemsResult });
    });
  });
};

/**
 * PATCH /api/web-orders/:id/confirm
 * Staff confirms order is packed → moves from Block 1 to Block 2 (pending → processing).
 */
const confirmWebOrder = (req, res) => {
  const { adminNote } = req.body || {};
  db.query(
    `UPDATE web_orders
     SET status = 'processing', adminNote = ?
     WHERE orderID = ? AND status = 'pending'`,
    [adminNote || null, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0)
        return res.status(409).json({ message: "Order is not pending" });
      res.json({ message: "Order confirmed for delivery", status: "processing" });
    }
  );
};

/**
 * PATCH /api/web-orders/:id/deliver
 * Staff marks order as delivered → saves permanently to Report (processing → delivered).
 */
const deliverWebOrder = (req, res) => {
  db.query(
    `UPDATE web_orders
     SET status = 'delivered'
     WHERE orderID = ? AND status = 'processing'`,
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0)
        return res.status(409).json({ message: "Order is not in processing status" });
      res.json({ message: "Order marked as delivered", status: "delivered" });
    }
  );
};

/**
 * PATCH /api/web-orders/:id/cancel
 * Cancel a pending order (returns stock).
 */
const cancelWebOrder = (req, res) => {
  const id = req.params.id;

  db.query(
    `SELECT status FROM web_orders WHERE orderID = ?`,
    [id],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      if (!rows.length) return res.status(404).json({ message: "Order not found" });
      if (!["pending", "processing"].includes(rows[0].status))
        return res.status(409).json({ message: "Cannot cancel this order" });

      // Restore stock
      db.query(
        `SELECT productID, quantity FROM web_order_items WHERE orderID = ?`,
        [id],
        (err2, items) => {
          if (err2) return res.status(500).json(err2);

          items.forEach((item) => {
            db.query(
              "UPDATE products SET quantity = quantity + ? WHERE productID = ?",
              [item.quantity, item.productID]
            );
          });

          db.query(
            `UPDATE web_orders SET status = 'cancelled' WHERE orderID = ?`,
            [id],
            (err3) => {
              if (err3) return res.status(500).json(err3);
              res.json({ message: "Order cancelled" });
            }
          );
        }
      );
    }
  );
};

/**
 * PATCH /api/web-orders/:id/status
 * Generic status update (for admin override).
 */
const updateWebOrderStatus = (req, res) => {
  const { status } = req.body;
  const allowed = ["pending", "processing", "delivered", "cancelled"];
  if (!allowed.includes(status))
    return res.status(400).json({ message: "Invalid status" });

  db.query(
    "UPDATE web_orders SET status = ? WHERE orderID = ?",
    [status, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Status updated" });
    }
  );
};

// ─── CUSTOMER ───────────────────────────────────────────────────────────────

/**
 * POST /api/web-orders
 * Customer places an order. Immediately appears in Block 1 as 'pending'.
 */
const createWebOrder = (req, res) => {
  const {
    customerName, phone, address, paymentMethod,
    subtotalAmount, discountAmount, totalAmount, items,
  } = req.body;

  const customerID = req.customerID || null;

  if (!items || items.length === 0)
    return res.status(400).json({ message: "No items in order" });

  const productIDs = items.map((i) => i.productID);
  const placeholders = productIDs.map(() => "?").join(",");

  db.query(
    `SELECT productID, productName, quantity FROM products WHERE productID IN (${placeholders})`,
    productIDs,
    (stockErr, stockRows) => {
      if (stockErr) return res.status(500).json(stockErr);

      const stockByID = {};
      stockRows.forEach((r) => (stockByID[r.productID] = r));

      const unavailable = items.filter((i) => {
        const p = stockByID[i.productID];
        return !p || p.quantity < i.qty;
      });

      if (unavailable.length > 0) {
        return res.status(409).json({
          message: "Some items are out of stock",
          unavailable: unavailable.map((i) => ({
            productID: i.productID,
            productName: i.productName,
          })),
        });
      }

      const sql = `
        INSERT INTO web_orders
          (customerID, customerName, phone, address, paymentMethod,
           subtotalAmount, discountAmount, totalAmount, paymentStatus, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending')
      `;

      db.query(
        sql,
        [customerID, customerName, phone, address, paymentMethod,
         subtotalAmount, discountAmount, totalAmount],
        (err, result) => {
          if (err) return res.status(500).json(err);
          const orderID = result.insertId;

          const itemValues = items.map((i) => [
            orderID, i.productID, i.productName,
            i.price, i.qty, i.price * i.qty,
          ]);

          db.query(
            `INSERT INTO web_order_items
               (orderID, productID, productName, price, quantity, subtotal)
             VALUES ?`,
            [itemValues],
            (err2) => {
              if (err2) return res.status(500).json(err2);

              // Decrement stock
              items.forEach((i) => {
                db.query(
                  "UPDATE products SET quantity = quantity - ? WHERE productID = ?",
                  [i.qty, i.productID]
                );
              });

              res.json({ message: "Order created", orderID });
            }
          );
        }
      );
    }
  );
};

/**
 * GET /api/web-orders/mine
 * Customer's own order history.
 */
const getMyOrders = (req, res) => {
  const sql = `
    SELECT
      wo.orderID, wo.status, wo.paymentMethod, wo.paymentStatus,
      wo.totalAmount, wo.subtotalAmount, wo.discountAmount,
      wo.adminNote, wo.createdAt
    FROM web_orders wo
    WHERE wo.customerID = ?
    ORDER BY wo.createdAt DESC
  `;
  db.query(sql, [req.customerID], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

/**
 * POST /api/products/check-stock
 * Pre-checkout stock validation.
 */
const checkStock = (req, res) => {
  const { items } = req.body;
  if (!items?.length) return res.status(400).json({ message: "No items provided" });

  const ids = items.map((i) => i.productID);
  db.query(
    `SELECT productID, productName, quantity FROM products WHERE productID IN (${ids.map(() => "?").join(",")})`,
    ids,
    (err, rows) => {
      if (err) return res.status(500).json(err);
      const stockMap = {};
      rows.forEach((r) => (stockMap[r.productID] = r));

      const unavailable = items.filter((i) => {
        const p = stockMap[i.productID];
        return !p || p.quantity < i.quantity;
      });

      res.json({ allInStock: unavailable.length === 0, unavailable });
    }
  );
};

module.exports = {
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
};