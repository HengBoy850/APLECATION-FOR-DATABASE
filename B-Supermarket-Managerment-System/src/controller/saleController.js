


const db = require("../config/db");
const { getActiveDiscountMap } = require("./promotionController");

// Statuses on the web side that count as real revenue for reporting.
// "pending" (cart not yet paid) and "cancelled" are excluded.
const WEB_REVENUE_STATUSES = ["paid", "processing", "delivered"];

// Create a new POS sale. Discounts are looked up automatically from active
// promotions (per product, or per category if no product-specific one
// exists) - the cashier doesn't have to type a discount in by hand.
const createSale = (req, res) => {
  const { customerName, items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items in order" });
  }

  getActiveDiscountMap((dmErr, discountMap) => {
    if (dmErr) return res.status(500).json(dmErr);

    let subtotalAmount = 0;
    let totalDiscount = 0;
    const totalItems = items.reduce((sum, i) => sum + Number(i.quantity), 0);

    const computedItems = items.map((i) => {
      const lineSubtotal = Number(i.price) * Number(i.quantity);
      const discountPercent = discountMap[i.productID] || 0;
      const lineDiscount = Number((lineSubtotal * discountPercent / 100).toFixed(2));
      subtotalAmount += lineSubtotal;
      totalDiscount += lineDiscount;
      return {
        ...i,
        discountPercent,
        discountAmount: lineDiscount,
        lineSubtotal: Number((lineSubtotal - lineDiscount).toFixed(2)),
      };
    });

    const totalAmount = Number((subtotalAmount - totalDiscount).toFixed(2));
    const overallDiscountPercent =
      subtotalAmount > 0 ? Number(((totalDiscount / subtotalAmount) * 100).toFixed(2)) : 0;

    const saleSql = `
      INSERT INTO sales
        (customerName, totalItems, subtotalAmount, discountAmount, discountPercent, totalAmount, status)
      VALUES (?, ?, ?, ?, ?, ?, 'completed')
    `;

    db.query(
      saleSql,
      [customerName || "Walk-in", totalItems, subtotalAmount, totalDiscount, overallDiscountPercent, totalAmount],
      (err, result) => {
        if (err) return res.status(500).json(err);

        const saleID = result.insertId;

        const itemValues = computedItems.map((i) => [
          saleID,
          i.productID,
          i.productName,
          i.price,
          i.discountPercent,
          i.discountAmount,
          i.quantity,
          i.lineSubtotal,
        ]);

        db.query(
          `INSERT INTO sale_items
             (saleID, productID, productName, price, discountPercent, discountAmount, quantity, subtotal)
           VALUES ?`,
          [itemValues],
          (err2) => {
            if (err2) return res.status(500).json(err2);

            items.forEach((i) => {
              db.query(
                "UPDATE products SET quantity = quantity - ? WHERE productID = ?",
                [i.quantity, i.productID]
              );
            });

            res.json({
              message: "Sale created",
              saleID,
              subtotalAmount,
              discountAmount: totalDiscount,
              totalAmount,
            });
          }
        );
      }
    );
  });
};

const getPendingSale = (req, res) => {
  const sql = `SELECT * FROM sales ORDER BY saleID DESC LIMIT 1`;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.json(null);

    db.query("SELECT * FROM sale_items WHERE saleID=?", [result[0].saleID], (err2, items) => {
      if (err2) return res.status(500).json(err2);
      res.json({ sale: result[0], items });
    });
  });
};

// Today's report (1am-to-1am window), combining POS sales AND paid web orders
const getTodaySales = (req, res) => {
  const windowSql = `
    CASE WHEN CURRENT_TIME() >= '01:00:00'
         THEN CONCAT(CURDATE(), ' 01:00:00')
         ELSE CONCAT(CURDATE() - INTERVAL 1 DAY, ' 01:00:00')
    END
  `;

  const sql = `
    SELECT 'POS' AS source, saleID AS id, customerName, totalItems,
           subtotalAmount, discountAmount, discountPercent, totalAmount,
           status, paymentMethod, saleDate AS orderDate
    FROM sales
    WHERE status = 'completed' AND saleDate >= (${windowSql})

    UNION ALL

    SELECT 'WEB' AS source, wo.orderID AS id,
           COALESCE(wc.name, wo.phone, 'Web customer') AS customerName,
           (SELECT COALESCE(SUM(quantity), 0) FROM web_order_items WHERE orderID = wo.orderID) AS totalItems,
           wo.subtotalAmount, wo.discountAmount, wo.discountPercent, wo.totalAmount,
           wo.status, wo.paymentMethod, wo.createdAt AS orderDate
    FROM web_orders wo
    LEFT JOIN web_customers wc ON wo.customerID = wc.customerID
    WHERE wo.status IN (?, ?, ?) AND wo.createdAt >= (${windowSql})

    ORDER BY orderDate DESC
  `;

  db.query(sql, WEB_REVENUE_STATUSES, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// Full invoice for ONE POS sale (web invoices are served separately, see
// webOrderController.getWebOrderDetails, since the underlying tables differ)
const getSaleDetails = (req, res) => {
  const saleSql = `SELECT * FROM sales WHERE saleID = ?`;
  const itemsSql = `SELECT * FROM sale_items WHERE saleID = ?`;

  db.query(saleSql, [req.params.id], (err, saleResult) => {
    if (err) return res.status(500).json(err);
    if (saleResult.length === 0) return res.status(404).json({ message: "Sale not found" });

    db.query(itemsSql, [req.params.id], (err2, itemsResult) => {
      if (err2) return res.status(500).json(err2);
      res.json({ sale: saleResult[0], items: itemsResult });
    });
  });
};

// Date-range report - same POS + web union as getTodaySales but filtered by
// the date range the user picked on the Report page.
const getSalesByRange = (req, res) => {
  let { startDate, endDate } = req.query;

  let from = "1970-01-01 00:00:00";
  let to = "2099-12-31 23:59:59";

  if (startDate && endDate) {
    from = `${startDate} 00:00:00`;
    to = `${endDate} 23:59:59`;
  }

  const sql = `
    SELECT 'POS' AS source, saleID AS id, customerName, totalItems,
           subtotalAmount, discountAmount, discountPercent, totalAmount,
           status, paymentMethod, saleDate AS orderDate
    FROM sales
    WHERE status = 'completed' AND saleDate BETWEEN ? AND ?

    UNION ALL

    SELECT 'WEB' AS source, wo.orderID AS id,
           COALESCE(wc.name, wo.phone, 'Web customer') AS customerName,
           (SELECT COALESCE(SUM(quantity), 0) FROM web_order_items WHERE orderID = wo.orderID) AS totalItems,
           wo.subtotalAmount, wo.discountAmount, wo.discountPercent, wo.totalAmount,
           wo.status, wo.paymentMethod, wo.createdAt AS orderDate
    FROM web_orders wo
    LEFT JOIN web_customers wc ON wo.customerID = wc.customerID
    WHERE wo.status IN (?, ?, ?) AND wo.createdAt BETWEEN ? AND ?

    ORDER BY orderDate DESC
  `;

  db.query(sql, [from, to, ...WEB_REVENUE_STATUSES, from, to], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// Top selling products, combining POS sale_items and web_order_items
const getTopProducts = (req, res) => {
  const { startDate, endDate } = req.query;
  const from = `${startDate} 00:00:00`;
  const to = `${endDate} 23:59:59`;

  const sql = `
    SELECT productID, productName, SUM(qty) AS totalQty, SUM(revenue) AS totalRevenue
    FROM (
      SELECT si.productID, si.productName, si.quantity AS qty, si.subtotal AS revenue
      FROM sale_items si
      JOIN sales s ON si.saleID = s.saleID
      WHERE s.status = 'completed' AND s.saleDate BETWEEN ? AND ?

      UNION ALL

      SELECT woi.productID, woi.productName, woi.quantity AS qty, woi.subtotal AS revenue
      FROM web_order_items woi
      JOIN web_orders wo ON woi.orderID = wo.orderID
      WHERE wo.status IN (?, ?, ?) AND wo.createdAt BETWEEN ? AND ?
    ) combined
    GROUP BY productID, productName
    ORDER BY totalQty DESC
    LIMIT 10
  `;

  db.query(sql, [from, to, ...WEB_REVENUE_STATUSES, from, to], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

module.exports = {
  createSale,
  getPendingSale,
  getTodaySales,
  getSaleDetails,
  getSalesByRange,
  getTopProducts,
};