const db = require("../config/db");

const addProduct = (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const { productName, categoryID, price, quantity } = req.body;
  const supplierID = req.body.supplierID || 1;
  const expireDate = req.body.expireDate || null;
  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO products
    (productName, categoryID, supplierID, price, quantity, expireDate, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [productName, categoryID, supplierID, price, quantity, expireDate, image],
    (err, result) => {
      if (err) {
        console.log("MYSQL ERROR:", err);
        return res.status(500).json(err);
      }

      console.log("INSERT SUCCESS:", result);
      res.json({ message: "Product added successfully" });
    }
  );
};

const updateProduct = (req, res) => {
  const id = req.params.id;
  const { productName, categoryID, price, quantity } = req.body;
  const image = req.file ? req.file.filename : null;

  let sql;
  let data;

  if (image) {
    sql = `
      UPDATE products
      SET productName=?, categoryID=?, price=?, quantity=?, image=?
      WHERE productID=?
    `;
    data = [productName, categoryID, price, quantity, image, id];
  } else {
    sql = `
      UPDATE products
      SET productName=?, categoryID=?, price=?, quantity=?
      WHERE productID=?
    `;
    data = [productName, categoryID, price, quantity, id];
  }

  db.query(sql, data, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product updated successfully" });
  });
};

const getProducts = (req, res) => {
  const sql = `SELECT productID, productName, categoryID, price, quantity, image, expireDate FROM products`;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// const deleteProduct = (req, res) => {
//   const sql = "DELETE FROM products WHERE productID = ?";
//   db.query(sql, [req.params.id], (err) => {
//     if (err) return res.status(500).json(err);
//     res.json({ message: "Deleted successfully" });
//   });
// };

const deleteProduct = (req, res) => {
  const id = req.params.id;

  // First remove from sale_items (no cascade defined)
  const deleteSaleItems = "DELETE FROM sale_items WHERE productID = ?";

  db.query(deleteSaleItems, [id], (err) => {
    if (err) return res.status(500).json({ message: "Failed to remove sale items", error: err });

    // Also remove from web_order_items
    const deleteWebOrderItems = "DELETE FROM web_order_items WHERE productID = ?";

    db.query(deleteWebOrderItems, [id], (err) => {
      if (err) return res.status(500).json({ message: "Failed to remove web order items", error: err });

      // Now safe to delete the product
      const deleteProduct = "DELETE FROM products WHERE productID = ?";

      db.query(deleteProduct, [id], (err) => {
        if (err) return res.status(500).json({ message: "Failed to delete product", error: err });
        res.json({ message: "Deleted successfully" });
      });
    });
  });
};

// ============================================================
// ADD THIS FUNCTION to src/controller/productController.js
// (alongside addProduct, updateProduct, getProducts, deleteProduct)
// ============================================================

// POST /api/products/check-stock
// Body: { items: [{ productID, quantity }, ...] }
// Used at checkout time before creating a web order, so we never
// accept an order for more than what's actually in stock.
// const checkStock = (req, res) => {
//   const { items } = req.body;

//   if (!items || items.length === 0) {
//     return res.status(400).json({ message: "No items provided" });
//   }

//   const productIDs = items.map((i) => i.productID);
//   const placeholders = productIDs.map(() => "?").join(",");

//   const sql = `
//     SELECT productID, productName, quantity
//     FROM products
//     WHERE productID IN (${placeholders})
//   `;

//   db.query(sql, productIDs, (err, rows) => {
//     if (err) return res.status(500).json(err);

//     const stockByID = {};
//     rows.forEach((r) => {
//       stockByID[r.productID] = r;
//     });

//     const unavailable = [];

//     items.forEach((requested) => {
//       const product = stockByID[requested.productID];

//       if (!product) {
//         unavailable.push({
//           productID: requested.productID,
//           productName: "Unknown product",
//           reason: "no_longer_available",
//           requestedQty: requested.quantity,
//           availableQty: 0,
//         });
//         return;
//       }

//       if (product.quantity < requested.quantity) {
//         unavailable.push({
//           productID: requested.productID,
//           productName: product.productName,
//           reason: "insufficient_stock",
//           requestedQty: requested.quantity,
//           availableQty: product.quantity,
//         });
//       }
//     });

//     res.json({
//       allInStock: unavailable.length === 0,
//       unavailable,
//     });
//   });
// };

const checkStock = (req, res) => {
  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items provided" });
  }

  const productIDs = items.map((i) => i.productID);
  const placeholders = productIDs.map(() => "?").join(",");

  const sql = `
    SELECT productID, productName, quantity
    FROM products
    WHERE productID IN (${placeholders})
  `;

  db.query(sql, productIDs, (err, rows) => {
    if (err) return res.status(500).json(err);

    const stockByID = {};
    rows.forEach((r) => {
      stockByID[r.productID] = r;
    });

    const unavailable = [];

    items.forEach((requested) => {
      const product = stockByID[requested.productID];

      if (!product) {
        unavailable.push({
          productID: requested.productID,
          productName: "Unknown product",
          reason: "no_longer_available",
          requestedQty: requested.quantity,
          availableQty: 0,
        });
        return;
      }

      if (product.quantity < requested.quantity) {
        unavailable.push({
          productID: requested.productID,
          productName: product.productName,
          reason: "insufficient_stock",
          requestedQty: requested.quantity,
          availableQty: product.quantity,
        });
      }
    });

    res.json({
      allInStock: unavailable.length === 0,
      unavailable,
    });
  });
};

module.exports = {
  addProduct,
  updateProduct,
  getProducts,
  deleteProduct,
  checkStock

};