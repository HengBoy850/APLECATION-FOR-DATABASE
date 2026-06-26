// src/controller/categoryController.js

const db = require("../config/db");

// Get All Categories
const getCategories = (req, res) => {
  db.query(
    "SELECT * FROM categories ORDER BY categoryID DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// Add Category
const addCategory = (req, res) => {
  const { categoryName } = req.body;

  db.query(
    "INSERT INTO categories (categoryName) VALUES (?)",
    [categoryName],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Category added successfully",
      });
    }
  );
};

// Update Category
const updateCategory = (req, res) => {
  const id = req.params.id;
  const { categoryName } = req.body;

  db.query(
    "UPDATE categories SET categoryName=? WHERE categoryID=?",
    [categoryName, id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Category updated successfully",
      });
    }
  );
};

// Delete Category
const deleteCategory = (req, res) => {
  db.query(
    "DELETE FROM categories WHERE categoryID=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Category deleted successfully",
      });
    }
  );
};

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};