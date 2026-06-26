const db = require("../config/db");

const getSuppliers = (req, res) => {
  db.query("SELECT * FROM suppliers ORDER BY supplierID DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

const addSupplier = (req, res) => {
  const { supplierName, contactPerson, phone, email, address } = req.body;

  db.query(
    "INSERT INTO suppliers (supplierName, contactPerson, phone, email, address) VALUES (?, ?, ?, ?, ?)",
    [supplierName, contactPerson, phone, email, address],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Supplier added successfully" });
    }
  );
};

const updateSupplier = (req, res) => {
  const id = req.params.id;
  const { supplierName, contactPerson, phone, email, address } = req.body;

  db.query(
    "UPDATE suppliers SET supplierName=?, contactPerson=?, phone=?, email=?, address=? WHERE supplierID=?",
    [supplierName, contactPerson, phone, email, address, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Supplier updated successfully" });
    }
  );
};

const deleteSupplier = (req, res) => {
  db.query("DELETE FROM suppliers WHERE supplierID=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Supplier deleted successfully" });
  });
};

module.exports = {
  getSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
};