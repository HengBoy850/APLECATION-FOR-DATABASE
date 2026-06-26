const db = require("../config/db");
const fs = require("fs");
const path = require("path");

// List promotions, optionally only active ones whose date window covers "now"
const getPromotions = (req, res) => {
  const { activeOnly } = req.query;

  let sql = `
    SELECT p.*, c.categoryName, pr.productName
    FROM promotions p
    LEFT JOIN categories c ON p.categoryID = c.categoryID
    LEFT JOIN products pr ON p.productID = pr.productID
  `;

  if (activeOnly === "true") {
    sql += ` WHERE p.status = 'active' AND NOW() BETWEEN p.startDate AND p.endDate`;
  }
  sql += " ORDER BY p.promotionID DESC";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

const createPromotion = (req, res) => {
  const { title, discountPercent, categoryID, productID, startDate, endDate, status } = req.body;

  if (!discountPercent || (!categoryID && !productID)) {
    return res
      .status(400)
      .json({ message: "discountPercent and either categoryID or productID are required" });
  }

  const sql = `
    INSERT INTO promotions (title, image, discountPercent, categoryID, productID, startDate, endDate, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      title || null,
      req.file ? req.file.filename : null,
      discountPercent,
      categoryID || null,
      productID || null,
      startDate,
      endDate,
      status || "active",
    ],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Promotion created", promotionID: result.insertId });
    }
  );
};

const updatePromotionStatus = (req, res) => {
  const { status } = req.body;
  db.query(
    "UPDATE promotions SET status = ? WHERE promotionID = ?",
    [status, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Promotion updated" });
    }
  );
};

const deletePromotion = (req, res) => {
  db.query("SELECT image FROM promotions WHERE promotionID = ?", [req.params.id], (err, rows) => {
    if (err) return res.status(500).json(err);

    db.query("DELETE FROM promotions WHERE promotionID = ?", [req.params.id], (err2) => {
      if (err2) return res.status(500).json(err2);

      if (rows.length > 0 && rows[0].image) {
        const filePath = path.join(__dirname, "../../uploads", rows[0].image);
        fs.unlink(filePath, () => {});
      }

      res.json({ message: "Promotion deleted" });
    });
  });
};

// Used by saleController when building a sale: returns a map of
// productID -> discountPercent for every product currently on promotion,
// whether that promotion was set at the product level or the category level.
const getActiveDiscountMap = (callback) => {
  const sql = `
    SELECT pr.productID, pr.categoryID, MAX(p.discountPercent) AS discountPercent
    FROM products pr
    JOIN promotions p
      ON (p.productID = pr.productID OR (p.categoryID = pr.categoryID AND p.productID IS NULL))
    WHERE p.status = 'active' AND NOW() BETWEEN p.startDate AND p.endDate
    GROUP BY pr.productID, pr.categoryID
  `;

  db.query(sql, (err, rows) => {
    if (err) return callback(err);
    const map = {};
    rows.forEach((r) => {
      map[r.productID] = Number(r.discountPercent);
    });
    callback(null, map);
  });
};

module.exports = {
  getPromotions,
  createPromotion,
  updatePromotionStatus,
  deletePromotion,
  getActiveDiscountMap,
};