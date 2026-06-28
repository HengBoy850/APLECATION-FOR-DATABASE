

// const db = require("../config/db");

// // 📊 Stats
// const getDashboardStats = (req, res) => {
//   const result = {};

//   db.query("SELECT COUNT(*) AS total FROM products", (err, products) => {
//     if (err) return res.status(500).json(err);
//     result.products = products[0].total;

//     db.query("SELECT COUNT(*) AS total FROM categories", (err, categories) => {
//       if (err) return res.status(500).json(err);
//       result.categories = categories[0].total;

//       db.query("SELECT COUNT(*) AS total FROM suppliers", (err, suppliers) => {
//         if (err) return res.status(500).json(err);
//         result.suppliers = suppliers[0].total;

//         db.query("SELECT COUNT(*) AS total FROM orders", (err, orders) => {
//           if (err) return res.status(500).json(err);
//           result.orders = orders[0].total;

//           res.json(result);
//         });
//       });
//     });
//   });
// };

// // 📈 Sales Chart
// const getSalesChart = (req, res) => {
//   db.query(
//     `SELECT DATE(orderDate) as date, SUM(totalAmount) as total
//      FROM orders
//      GROUP BY DATE(orderDate)
//      ORDER BY DATE(orderDate)`,
//     (err, result) => {
//       if (err) return res.status(500).json(err);
//       res.json(result);
//     }
//   );
// };

// // ⚠️ Low Stock
// const getLowStock = (req, res) => {
//   db.query(
//     `SELECT 
//         p.productName AS name,
//         c.categoryName AS category,
//         p.quantity AS qty
//      FROM products p
//      LEFT JOIN categories c ON p.categoryID = c.categoryID
//      WHERE p.quantity <= 5`,
//     (err, result) => {
//       if (err) return res.status(500).json(err);
//       res.json(result);
//     }
//   );
// };

// const getProductsByCategory = (req, res) => {
//   db.query(
//     `SELECT
//         c.categoryName AS label,
//         COUNT(p.productID) AS total
//      FROM categories c
//      LEFT JOIN products p
//        ON c.categoryID = p.categoryID
//      GROUP BY c.categoryID`,
//     (err, result) => {
//       if (err) return res.status(500).json(err);
//       res.json(result);
//     }
//   );
// };

// module.exports = {
//   getDashboardStats,
//   getSalesChart,
//   getLowStock,
//   getProductsByCategory
// };

const db = require("../config/db");

// 📊 Stats — counts products, categories, suppliers, and ALL orders (POS + web)
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

        // Combine POS sales + web orders for total order count
        db.query(
          `SELECT
             (SELECT COUNT(*) FROM sales) +
             (SELECT COUNT(*) FROM web_orders WHERE status NOT IN ('cancelled')) AS total`,
          (err, orders) => {
            if (err) return res.status(500).json(err);
            result.orders = orders[0].total;

            // Today's revenue (POS + web)
            db.query(
              `SELECT COALESCE(
                 (SELECT SUM(totalAmount) FROM sales WHERE DATE(saleDate) = CURDATE()) +
                 (SELECT SUM(totalAmount) FROM web_orders WHERE DATE(createdAt) = CURDATE() AND status NOT IN ('cancelled')),
                 0
               ) AS total`,
              (err, todayRev) => {
                if (err) return res.status(500).json(err);
                result.todayRevenue = todayRev[0].total;

                // Pending web orders (incoming, not yet confirmed)
                db.query(
                  `SELECT COUNT(*) AS total FROM web_orders WHERE status = 'pending'`,
                  (err, pending) => {
                    if (err) return res.status(500).json(err);
                    result.pendingWebOrders = pending[0].total;

                    res.json(result);
                  }
                );
              }
            );
          }
        );
      });
    });
  });
};

// 📈 Sales chart — daily revenue combining POS sales + delivered web orders
const getSalesChart = (req, res) => {
  db.query(
    `SELECT dates.date AS label, COALESCE(SUM(rev.total), 0) AS total
     FROM (
       SELECT DATE(saleDate) AS date FROM sales
       UNION
       SELECT DATE(createdAt) AS date FROM web_orders WHERE status NOT IN ('cancelled')
     ) AS dates
     LEFT JOIN (
       SELECT DATE(saleDate) AS date, totalAmount AS total FROM sales
       UNION ALL
       SELECT DATE(createdAt) AS date, totalAmount AS total
       FROM web_orders WHERE status NOT IN ('cancelled')
     ) AS rev ON dates.date = rev.date
     GROUP BY dates.date
     ORDER BY dates.date
     LIMIT 30`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      // Format date labels nicely  e.g. "Jun 25"
      const formatted = result.map((r) => ({
        label: new Date(r.label).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        total: Number(r.total),
      }));
      res.json(formatted);
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
     WHERE p.quantity <= 5
     ORDER BY p.quantity ASC`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// 📦 Products by category (used for bar/area chart)
const getProductsByCategory = (req, res) => {
  db.query(
    `SELECT
       c.categoryName AS label,
       COUNT(p.productID) AS total
     FROM categories c
     LEFT JOIN products p ON c.categoryID = p.categoryID
     GROUP BY c.categoryID
     ORDER BY total DESC`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// 🆕 Recent orders — last 10 from both POS + web, merged and sorted
const getRecentOrders = (req, res) => {
  db.query(
    `(
       SELECT
         saleID      AS id,
         'POS'       AS source,
         customerName,
         totalAmount,
         'completed' AS status,
         saleDate    AS createdAt
       FROM sales
       ORDER BY saleDate DESC
       LIMIT 10
     )
     UNION ALL
     (
       SELECT
         orderID     AS id,
         'WEB'       AS source,
         customerName,
         totalAmount,
         status,
         createdAt
       FROM web_orders
       ORDER BY createdAt DESC
       LIMIT 10
     )
     ORDER BY createdAt DESC
     LIMIT 10`,
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
  getProductsByCategory,
  getRecentOrders,
};