const express = require("express");
const router = express.Router();

const {
  getSuppliers,
  addSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controller/supplierController");

router.get("/", getSuppliers);
router.post("/", addSupplier);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

module.exports = router;