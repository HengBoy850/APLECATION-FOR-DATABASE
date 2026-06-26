const db = require("../config/db");

// Get the global store QR image path
const getStoreQr = (req, res) => {
  db.query(
    "SELECT settingValue FROM settings WHERE settingKey='storeQrImagePath'",
    (err, result) => {
      if (err) return res.status(500).json(err);
      const path = result.length > 0 ? result[0].settingValue : null;
      res.json({ qrImagePath: path });
    }
  );
};

// Upload/replace the global store QR image
const uploadStoreQr = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  }

  const qrImagePath = `/uploads/${req.file.filename}`;

  db.query(
    "INSERT INTO settings (settingKey, settingValue) VALUES ('storeQrImagePath', ?) ON DUPLICATE KEY UPDATE settingValue=?",
    [qrImagePath, qrImagePath],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Store QR updated", qrImagePath });
    }
  );
};

module.exports = {
  getStoreQr,
  uploadStoreQr,
};