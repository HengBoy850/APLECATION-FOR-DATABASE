const db = require("../config/db");
const fs = require("fs");
const path = require("path");

// List all banners (POS admin sees both active and inactive; web only asks for active)
const getBanners = (req, res) => {
  const { status } = req.query;
  let sql = "SELECT * FROM banners";
  const params = [];

  if (status) {
    sql += " WHERE status = ?";
    params.push(status);
  }
  sql += " ORDER BY bannerID DESC";

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// Create banner (image comes from multer as req.file)
const createBanner = (req, res) => {
  const { title, status } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "Banner image is required" });
  }

  const sql = `INSERT INTO banners (image, title, status) VALUES (?, ?, ?)`;
  db.query(sql, [req.file.filename, title || null, status || "active"], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Banner created", bannerID: result.insertId });
  });
};

// Toggle active/inactive without re-uploading
const updateBannerStatus = (req, res) => {
  const { status } = req.body;
  db.query(
    "UPDATE banners SET status = ? WHERE bannerID = ?",
    [status, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Banner updated" });
    }
  );
};

// Delete banner + its image file on disk
const deleteBanner = (req, res) => {
  db.query("SELECT image FROM banners WHERE bannerID = ?", [req.params.id], (err, rows) => {
    if (err) return res.status(500).json(err);

    db.query("DELETE FROM banners WHERE bannerID = ?", [req.params.id], (err2) => {
      if (err2) return res.status(500).json(err2);

      if (rows.length > 0 && rows[0].image) {
        const filePath = path.join(__dirname, "../../uploads", rows[0].image);
        fs.unlink(filePath, () => {}); // ignore error if file already gone
      }

      res.json({ message: "Banner deleted" });
    });
  });
};

module.exports = {
  getBanners,
  createBanner,
  updateBannerStatus,
  deleteBanner,
};