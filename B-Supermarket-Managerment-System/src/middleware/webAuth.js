const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret-in-env";

// Requires a valid token. Use on routes that must have a logged-in customer
// (checkout, order history, payment proof upload).
const requireCustomerAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Login required" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Session expired, please log in again" });
    }
    req.customerID = decoded.customerID;
    next();
  });
};

// Attaches req.customerID if a valid token is present, but doesn't block
// the request if it's missing/invalid. Useful for routes that work for
// both guests and logged-in customers.
const optionalCustomerAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return next();

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (!err) req.customerID = decoded.customerID;
    next();
  });
};

module.exports = { requireCustomerAuth, optionalCustomerAuth };