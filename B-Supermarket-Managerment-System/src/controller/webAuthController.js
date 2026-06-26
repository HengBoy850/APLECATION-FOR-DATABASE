// const db = require("../config/db");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // IMPORTANT: set a real secret in your .env as JWT_SECRET. This fallback
// // is only here so the server doesn't crash if it's missing during setup -
// // replace it before going to production.
// const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret-in-env";
// const TOKEN_EXPIRES_IN = "30d"; // long-lived so customers stay logged in on their device

// function signToken(customer) {
//   return jwt.sign(
//     { customerID: customer.customerID, phone: customer.phone },
//     JWT_SECRET,
//     { expiresIn: TOKEN_EXPIRES_IN }
//   );
// }

// function publicCustomer(row) {
//   return {
//     customerID: row.customerID,
//     name: row.name,
//     phone: row.phone,
//     email: row.email,
//     address: row.address,
//   };
// }

// // POST /api/web-auth/register
// const register = (req, res) => {
//   const { name, phone, password, address, email } = req.body;

//   if (!name || !phone || !password) {
//     return res.status(400).json({ message: "Name, phone, and password are required" });
//   }
//   if (password.length < 6) {
//     return res.status(400).json({ message: "Password must be at least 6 characters" });
//   }

//   db.query(
//     "SELECT customerID FROM web_customers WHERE phone = ?",
//     [phone],
//     (err, existing) => {
//       if (err) return res.status(500).json(err);
//       if (existing.length > 0) {
//         return res.status(409).json({ message: "An account with this phone number already exists" });
//       }

//       bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
//         if (hashErr) return res.status(500).json({ message: "Could not process password" });

//         const sql = `
//           INSERT INTO web_customers (name, phone, email, password, address)
//           VALUES (?, ?, ?, ?, ?)
//         `;

//         db.query(sql, [name, phone, email || null, hashedPassword, address || null], (insertErr, result) => {
//           if (insertErr) return res.status(500).json(insertErr);

//           const customer = {
//             customerID: result.insertId,
//             name,
//             phone,
//             email: email || null,
//             address: address || null,
//           };

//           const token = signToken(customer);
//           res.json({ message: "Account created", token, customer });
//         });
//       });
//     }
//   );
// };

// // POST /api/web-auth/login
// const login = (req, res) => {
//   const { phone, password } = req.body;

//   if (!phone || !password) {
//     return res.status(400).json({ message: "Phone and password are required" });
//   }

//   db.query(
//     "SELECT * FROM web_customers WHERE phone = ?",
//     [phone],
//     (err, rows) => {
//       if (err) return res.status(500).json(err);
//       if (rows.length === 0) {
//         return res.status(401).json({ message: "Incorrect phone number or password" });
//       }

//       const row = rows[0];

//       bcrypt.compare(password, row.password || "", (cmpErr, match) => {
//         if (cmpErr) return res.status(500).json({ message: "Login failed" });
//         if (!match) {
//           return res.status(401).json({ message: "Incorrect phone number or password" });
//         }

//         const customer = publicCustomer(row);
//         const token = signToken(customer);
//         res.json({ message: "Logged in", token, customer });
//       });
//     }
//   );
// };

// // GET /api/web-auth/me  (requires auth middleware to set req.customerID)
// const me = (req, res) => {
//   db.query(
//     "SELECT customerID, name, phone, email, address FROM web_customers WHERE customerID = ?",
//     [req.customerID],
//     (err, rows) => {
//       if (err) return res.status(500).json(err);
//       if (rows.length === 0) return res.status(404).json({ message: "Customer not found" });
//       res.json({ customer: rows[0] });
//     }
//   );
// };

// module.exports = { register, login, me, JWT_SECRET };

const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// IMPORTANT: set a real secret in your .env as JWT_SECRET. This fallback
// is only here so the server doesn't crash if it's missing during setup -
// replace it before going to production.
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret-in-env";
const TOKEN_EXPIRES_IN = "30d"; // long-lived so customers stay logged in on their device

function signToken(customer) {
  return jwt.sign(
    { customerID: customer.customerID, phone: customer.phone },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRES_IN }
  );
}

function publicCustomer(row) {
  return {
    customerID: row.customerID,
    name: row.name,
    phone: row.phone,
    email: row.email,
    address: row.address,
  };
}

// POST /api/web-auth/register
const register = (req, res) => {
  const { name, phone, password, address, email } = req.body;

  if (!name || !phone || !password) {
    return res.status(400).json({ message: "Name, phone, and password are required" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  db.query(
    "SELECT customerID FROM web_customers WHERE phone = ?",
    [phone],
    (err, existing) => {
      if (err) return res.status(500).json(err);
      if (existing.length > 0) {
        return res.status(409).json({ message: "An account with this phone number already exists" });
      }

      bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        if (hashErr) return res.status(500).json({ message: "Could not process password" });

        const sql = `
          INSERT INTO web_customers (name, phone, email, password, address)
          VALUES (?, ?, ?, ?, ?)
        `;

        db.query(sql, [name, phone, email || null, hashedPassword, address || null], (insertErr, result) => {
          if (insertErr) return res.status(500).json(insertErr);

          const customer = {
            customerID: result.insertId,
            name,
            phone,
            email: email || null,
            address: address || null,
          };

          const token = signToken(customer);
          res.json({ message: "Account created", token, customer });
        });
      });
    }
  );
};

// POST /api/web-auth/login
const login = (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: "Phone and password are required" });
  }

  db.query(
    "SELECT * FROM web_customers WHERE phone = ?",
    [phone],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      if (rows.length === 0) {
        return res.status(401).json({ message: "Incorrect phone number or password" });
      }

      const row = rows[0];

      bcrypt.compare(password, row.password || "", (cmpErr, match) => {
        if (cmpErr) return res.status(500).json({ message: "Login failed" });
        if (!match) {
          return res.status(401).json({ message: "Incorrect phone number or password" });
        }

        const customer = publicCustomer(row);
        const token = signToken(customer);
        res.json({ message: "Logged in", token, customer });
      });
    }
  );
};

// GET /api/web-auth/me  (requires auth middleware to set req.customerID)
const me = (req, res) => {
  db.query(
    "SELECT customerID, name, phone, email, address FROM web_customers WHERE customerID = ?",
    [req.customerID],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      if (rows.length === 0) return res.status(404).json({ message: "Customer not found" });
      res.json({ customer: rows[0] });
    }
  );
};

module.exports = { register, login, me, JWT_SECRET };