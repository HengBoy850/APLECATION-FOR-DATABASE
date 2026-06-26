

const db = require("../config/db");

// 📊 Stats
const getDashboardStats = (req, res) => {
  const result = {};

  db.query("SELECT COUNT(*) AS total FROM products", (err, products) => {
    if (err) return res.status(500).json(err);
    result.products = products[0].total;

    db.query("SELECT COUNT(*) AS total FROM categories", (err, categories) => {
      if (err) return res.status(500).json(err);
      result.categories = categories[0].total;

      db.query("SELECT COUNT(*) AS total FROM suppliers", (err, suppliers) => {
        if (err) return res.status(500).json(err);
        result.suppliers = suppliers[0].total;

        db.query("SELECT COUNT(*) AS total FROM orders", (err, orders) => {
          if (err) return res.status(500).json(err);
          result.orders = orders[0].total;

          res.json(result);
        });
      });
    });
  });
};

// 📈 Sales Chart
const getSalesChart = (req, res) => {
  db.query(
    `SELECT DATE(orderDate) as date, SUM(totalAmount) as total
     FROM orders
     GROUP BY DATE(orderDate)
     ORDER BY DATE(orderDate)`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// ⚠️ Low Stock
const getLowStock = (req, res) => {
  db.query(
    `SELECT 
        p.productName AS name,
        c.categoryName AS category,
        p.quantity AS qty
     FROM products p
     LEFT JOIN categories c ON p.categoryID = c.categoryID
     WHERE p.quantity <= 5`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

const getProductsByCategory = (req, res) => {
  db.query(
    `SELECT
        c.categoryName AS label,
        COUNT(p.productID) AS total
     FROM categories c
     LEFT JOIN products p
       ON c.categoryID = p.categoryID
     GROUP BY c.categoryID`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

module.exports = {
  getDashboardStats,
  getSalesChart,
  getLowStock,
  getProductsByCategory
};