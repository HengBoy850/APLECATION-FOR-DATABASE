import { useEffect, useState } from "react";

const API_BASE = "http://172.20.10.14:8081/api";

export default function BannerPromotions() {
  // ---------- Banners ----------
  const [banners, setBanners] = useState([]);
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerFile, setBannerFile] = useState(null);

  // ---------- Promotions ----------
  const [promotions, setPromotions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [promoTitle, setPromoTitle] = useState("");
  const [promoFile, setPromoFile] = useState(null);
  const [promoTarget, setPromoTarget] = useState("category"); // "category" | "product"
  const [promoCategoryID, setPromoCategoryID] = useState("");
  const [promoProductID, setPromoProductID] = useState("");
  const [promoDiscount, setPromoDiscount] = useState("");
  const [promoStart, setPromoStart] = useState("");
  const [promoEnd, setPromoEnd] = useState("");

  useEffect(() => {
    fetchBanners();
    fetchPromotions();
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchBanners = () => {
    fetch(`${API_BASE}/banners`)
      .then((res) => res.json())
      .then((data) => setBanners(Array.isArray(data) ? data : []))
      .catch((err) => console.log(err));
  };

  const fetchPromotions = () => {
    fetch(`${API_BASE}/promotions`)
      .then((res) => res.json())
      .then((data) => setPromotions(Array.isArray(data) ? data : []))
      .catch((err) => console.log(err));
  };

  const fetchCategories = () => {
    fetch(`${API_BASE}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((err) => console.log(err));
  };

  const fetchProducts = () => {
    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => console.log(err));
  };

  // ---------- Banner actions ----------
  const handleAddBanner = () => {
    if (!bannerFile) {
      alert("Choose a poster image first");
      return;
    }
    const form = new FormData();
    form.append("title", bannerTitle);
    form.append("image", bannerFile);

    fetch(`${API_BASE}/banners`, { method: "POST", body: form })
      .then((res) => res.json())
      .then(() => {
        setBannerTitle("");
        setBannerFile(null);
        fetchBanners();
      })
      .catch((err) => console.log(err));
  };

  const handleToggleBanner = (id, status) => {
    fetch(`${API_BASE}/banners/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: status === "active" ? "inactive" : "active" }),
    })
      .then(() => fetchBanners())
      .catch((err) => console.log(err));
  };

  const handleDeleteBanner = (id) => {
    if (!window.confirm("Delete this banner?")) return;
    fetch(`${API_BASE}/banners/${id}`, { method: "DELETE" })
      .then(() => fetchBanners())
      .catch((err) => console.log(err));
  };

  // ---------- Promotion actions ----------
  const handleAddPromotion = () => {
    if (!promoDiscount || (promoTarget === "category" && !promoCategoryID) ||
        (promoTarget === "product" && !promoProductID) || !promoStart || !promoEnd) {
      alert("Fill in discount %, target, and the date range");
      return;
    }

    const form = new FormData();
    form.append("title", promoTitle);
    if (promoFile) form.append("image", promoFile);
    form.append("discountPercent", promoDiscount);
    form.append("startDate", promoStart);
    form.append("endDate", promoEnd);
    if (promoTarget === "category") form.append("categoryID", promoCategoryID);
    if (promoTarget === "product") form.append("productID", promoProductID);

    fetch(`${API_BASE}/promotions`, { method: "POST", body: form })
      .then((res) => res.json())
      .then(() => {
        setPromoTitle("");
        setPromoFile(null);
        setPromoCategoryID("");
        setPromoProductID("");
        setPromoDiscount("");
        setPromoStart("");
        setPromoEnd("");
        fetchPromotions();
      })
      .catch((err) => console.log(err));
  };

  const handleTogglePromotion = (id, status) => {
    fetch(`${API_BASE}/promotions/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: status === "active" ? "inactive" : "active" }),
    })
      .then(() => fetchPromotions())
      .catch((err) => console.log(err));
  };

  const handleDeletePromotion = (id) => {
    if (!window.confirm("Delete this promotion?")) return;
    fetch(`${API_BASE}/promotions/${id}`, { method: "DELETE" })
      .then(() => fetchPromotions())
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen p-6" style={{ background: "#F5F5F5" }}>
      <h1
        className="text-2xl font-semibold mb-1"
        style={{ fontFamily: "'Source Serif Pro', Georgia, serif", color: "#1F2A3D" }}
      >
        Banners & Discounts
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Posters shown on the web homepage carousel, and discounts applied automatically at checkout.
      </p>

      <div className="grid grid-cols-2 gap-6" style={{ alignItems: "flex-start" }}>
        {/* ============ BANNERS ============ */}
        <div className="rounded-lg overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
          <div className="px-4 py-3" style={{ background: "#1F2A3D" }}>
            <h2 className="text-sm font-semibold text-white">Homepage banners</h2>
          </div>

          <div className="p-4 border-b border-gray-100 space-y-2">
            <input
              type="text"
              placeholder="Banner title (optional)"
              value={bannerTitle}
              onChange={(e) => setBannerTitle(e.target.value)}
              className="w-full p-2 text-sm border border-gray-200 rounded focus:outline-none"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBannerFile(e.target.files[0])}
              className="w-full text-sm"
            />
            <button
              onClick={handleAddBanner}
              className="w-full py-2 text-sm font-medium rounded text-white"
              style={{ background: "#6366F1" }}
            >
              + Add banner
            </button>
          </div>

          <div className="p-4 grid grid-cols-2 gap-3">
            {banners.map((b) => (
              <div key={b.bannerID} className="rounded-lg overflow-hidden" style={{ border: "1px solid #E5E7EB" }}>
                <img
                  src={`http://172.20.10.14:8081/uploads/${b.image}`}
                  alt={b.title || "banner"}
                  className="w-full h-24 object-cover"
                />
                <div className="p-2">
                  <p className="text-xs font-medium text-gray-700 truncate">{b.title || "Untitled"}</p>
                  <div className="flex justify-between items-center mt-1">
                    <button
                      onClick={() => handleToggleBanner(b.bannerID, b.status)}
                      className="px-2 py-0.5 rounded text-xs"
                      style={{
                        background: b.status === "active" ? "#DCFCE7" : "#F3F4F6",
                        color: b.status === "active" ? "#16A34A" : "#6B7280",
                      }}
                    >
                      {b.status}
                    </button>
                    <button
                      onClick={() => handleDeleteBanner(b.bannerID)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {banners.length === 0 && (
              <p className="col-span-2 text-center text-gray-400 py-6 text-sm">No banners yet.</p>
            )}
          </div>
        </div>

        {/* ============ PROMOTIONS ============ */}
        <div className="rounded-lg overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
          <div className="px-4 py-3" style={{ background: "#1F2A3D" }}>
            <h2 className="text-sm font-semibold text-white">Discounts</h2>
          </div>

          <div className="p-4 border-b border-gray-100 space-y-2">
            <input
              type="text"
              placeholder="Promotion title (optional)"
              value={promoTitle}
              onChange={(e) => setPromoTitle(e.target.value)}
              className="w-full p-2 text-sm border border-gray-200 rounded focus:outline-none"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setPromoTarget("category")}
                className="flex-1 py-1.5 text-xs font-medium rounded"
                style={{
                  background: promoTarget === "category" ? "#22C55E" : "#F3F4F6",
                  color: promoTarget === "category" ? "#FFFFFF" : "#374151",
                }}
              >
                Whole category
              </button>
              <button
                onClick={() => setPromoTarget("product")}
                className="flex-1 py-1.5 text-xs font-medium rounded"
                style={{
                  background: promoTarget === "product" ? "#22C55E" : "#F3F4F6",
                  color: promoTarget === "product" ? "#FFFFFF" : "#374151",
                }}
              >
                Single item
              </button>
            </div>

            {promoTarget === "category" ? (
              <select
                value={promoCategoryID}
                onChange={(e) => setPromoCategoryID(e.target.value)}
                className="w-full p-2 text-sm border border-gray-200 rounded focus:outline-none"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.categoryID} value={c.categoryID}>{c.categoryName}</option>
                ))}
              </select>
            ) : (
              <select
                value={promoProductID}
                onChange={(e) => setPromoProductID(e.target.value)}
                className="w-full p-2 text-sm border border-gray-200 rounded focus:outline-none"
              >
                <option value="">Select item</option>
                {products.map((p) => (
                  <option key={p.productID} value={p.productID}>{p.productName}</option>
                ))}
              </select>
            )}

            <input
              type="number"
              placeholder="Discount %"
              value={promoDiscount}
              onChange={(e) => setPromoDiscount(e.target.value)}
              className="w-full p-2 text-sm border border-gray-200 rounded focus:outline-none"
            />

            <div className="flex gap-2">
              <input
                type="date"
                value={promoStart}
                onChange={(e) => setPromoStart(e.target.value)}
                className="flex-1 p-2 text-sm border border-gray-200 rounded focus:outline-none"
              />
              <input
                type="date"
                value={promoEnd}
                onChange={(e) => setPromoEnd(e.target.value)}
                className="flex-1 p-2 text-sm border border-gray-200 rounded focus:outline-none"
              />
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPromoFile(e.target.files[0])}
              className="w-full text-sm"
            />

            <button
              onClick={handleAddPromotion}
              className="w-full py-2 text-sm font-medium rounded text-white"
              style={{ background: "#6366F1" }}
            >
              + Add discount
            </button>
          </div>

          <div className="p-4 space-y-2">
            {promotions.map((p) => (
              <div
                key={p.promotionID}
                className="flex justify-between items-center p-2 rounded"
                style={{ border: "1px solid #E5E7EB" }}
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {p.title || (p.productName ? p.productName : p.categoryName)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {p.productName ? `Item: ${p.productName}` : `Category: ${p.categoryName}`} ·{" "}
                    <span className="font-semibold text-green-600">-{p.discountPercent}%</span> ·{" "}
                    {new Date(p.startDate).toLocaleDateString()} – {new Date(p.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTogglePromotion(p.promotionID, p.status)}
                    className="px-2 py-0.5 rounded text-xs"
                    style={{
                      background: p.status === "active" ? "#DCFCE7" : "#F3F4F6",
                      color: p.status === "active" ? "#16A34A" : "#6B7280",
                    }}
                  >
                    {p.status}
                  </button>
                  <button
                    onClick={() => handleDeletePromotion(p.promotionID)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {promotions.length === 0 && (
              <p className="text-center text-gray-400 py-6 text-sm">No discounts yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
