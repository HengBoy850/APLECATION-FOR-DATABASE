

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");

// const dashboardRoute   = require("./src/routes/dashboardRoute");
// const userRoute        = require("./src/routes/userRoute");
// const productRoute     = require("./src/routes/productRoute");
// const categoryRoute    = require("./src/routes/categoryRoute");
// const saleRoute        = require("./src/routes/saleRoute");
// const supplierRoute    = require("./src/routes/supplierRoute");
// const settingRoute     = require("./src/routes/settingRoute");
// const bannerRoute      = require("./src/routes/bannerRoute");
// const promotionRoute   = require("./src/routes/promotionRoute");
// const webOrderRoute    = require("./src/routes/webOrderRoute");
// const webAuthRoute     = require("./src/routes/webAuthRoute");

// const app  = express();
// const port = 8081;

// // ── Middleware ───────────────────────────────────────────────────────────────
// app.use(cors());
// app.use(express.json());

// // ── Static uploads ───────────────────────────────────────────────────────────
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // ── Routes ───────────────────────────────────────────────────────────────────
// app.use("/api/dashboard",  dashboardRoute);
// app.use("/api/users",      userRoute);
// app.use("/api/products",   productRoute);
// app.use("/api/categories", categoryRoute);
// app.use("/api/sales",      saleRoute);
// app.use("/api/suppliers",  supplierRoute);
// app.use("/api/settings",   settingRoute);
// app.use("/api/banners",    bannerRoute);
// app.use("/api/promotions", promotionRoute);
// app.use("/api/web-orders", webOrderRoute);
// app.use("/api/web-auth",   webAuthRoute);

// // ── Payment proof upload  →  POST /api/payment-proof ────────────────────────
// // webOrderRoute exposes uploadProofHandler (multer + controller) as an array
// app.post("/api/payment-proof", ...webOrderRoute.uploadProofHandler);

// // ── Stock pre-check  →  POST /api/products/check-stock ──────────────────────
// app.post("/api/products/check-stock", webOrderRoute.checkStockHandler);

// // ── Health check ─────────────────────────────────────────────────────────────
// app.get("/", (req, res) => res.send("Welcome to REST API"));

// // ── Start ────────────────────────────────────────────────────────────────────
// app.listen(port, "0.0.0.0", () => {
//   console.log(`Server running on port ${port}`);
// });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const dashboardRoute   = require("./src/routes/dashboardRoute");
const userRoute        = require("./src/routes/userRoute");
const productRoute     = require("./src/routes/productRoute");
const categoryRoute    = require("./src/routes/categoryRoute");
const saleRoute        = require("./src/routes/saleRoute");
const supplierRoute    = require("./src/routes/supplierRoute");
const settingRoute     = require("./src/routes/settingRoute");
const bannerRoute      = require("./src/routes/bannerRoute");
const promotionRoute   = require("./src/routes/promotionRoute");
const webOrderRoute    = require("./src/routes/webOrderRoute");
const webAuthRoute     = require("./src/routes/webAuthRoute");

const app  = express();
const port = 8081;

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/dashboard",  dashboardRoute);
app.use("/api/users",      userRoute);
app.use("/api/products",   productRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/sales",      saleRoute);
app.use("/api/suppliers",  supplierRoute);
app.use("/api/settings",   settingRoute);
app.use("/api/banners",    bannerRoute);
app.use("/api/promotions", promotionRoute);
app.use("/api/web-orders", webOrderRoute);
app.use("/api/web-auth",   webAuthRoute);

// Stock pre-check  →  POST /api/products/check-stock
app.post("/api/products/check-stock", webOrderRoute.checkStockHandler);

app.get("/", (req, res) => res.send("Welcome to REST API"));

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});