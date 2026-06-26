

// import { useEffect, useState } from "react";

// const API_PRODUCTS = "http://172.20.10.14:8081/api/products";
// const API_CATEGORIES = "http://172.20.10.14:8081/api/categories";
// const API_SALES = "http://172.20.10.14:8081/api/sales";

// export default function Sales() {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [cart, setCart] = useState([]);
//   const [sales, setSales] = useState([]);
//   const [showInvoice, setShowInvoice] = useState(false);
//   const [invoiceData, setInvoiceData] = useState(null);
//   const [customerName, setCustomerName] = useState("");

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//     fetchSales();
//   }, []);

//   const fetchProducts = () => {
//     fetch(API_PRODUCTS)
//       .then((res) => res.json())
//       .then((data) => setProducts(Array.isArray(data) ? data : []))
//       .catch((err) => console.log(err));
//   };

//   const fetchCategories = () => {
//     fetch(API_CATEGORIES)
//       .then((res) => res.json())
//       .then((data) => setCategories(data))
//       .catch((err) => console.log(err));
//   };

//   const fetchSales = () => {
//     // /api/sales/today now returns BOTH POS sales and web orders (each row
//     // tagged with "source"). This register view only cares about what was
//     // rung up at the till, so it's filtered down to POS rows here - the
//     // combined picture lives on the Report page.
//     fetch(`${API_SALES}/today`)
//       .then((res) => res.json())
//       .then((data) => {
//         const posOnly = Array.isArray(data) ? data.filter((s) => s.source === "POS") : [];
//         setSales(posOnly);
//       })
//       .catch((err) => console.log(err));
//   };

//   const filteredProducts =
//     activeCategory === "all"
//       ? products
//       : products.filter((p) => String(p.categoryID) === String(activeCategory));

//   const addToCart = (product) => {
//     setCart((prev) => {
//       const existing = prev.find((item) => item.productID === product.productID);
//       if (existing) {
//         return prev.map((item) =>
//           item.productID === product.productID
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [
//         ...prev,
//         {
//           productID: product.productID,
//           productName: product.productName,
//           price: Number(product.price),
//           quantity: 1,
//         },
//       ];
//     });
//   };

//   const increaseQty = (productID) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.productID === productID
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   const decreaseQty = (productID) => {
//     setCart((prev) =>
//       prev
//         .map((item) =>
//           item.productID === productID
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//         .filter((item) => item.quantity > 0)
//     );
//   };

//   const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handleConfirmOrder = () => {
//     if (cart.length === 0) {
//       alert("Cart is empty");
//       return;
//     }

//     // totalAmount is no longer sent - the server recalculates it after
//     // applying any active promotions, so the printed invoice always
//     // reflects the real discounted price even if the cashier's screen
//     // hasn't shown the markdown yet.
//     fetch(API_SALES, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         customerName: customerName || "Walk-in",
//         items: cart,
//       }),
//     })
//       .then((res) => res.json())
//       .then(() => {
//         setCart([]);
//         setCustomerName("");
//         fetchSales();
//         fetchProducts();
//         alert("Order confirmed!");
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleViewInvoice = (saleID) => {
//     fetch(`${API_SALES}/${saleID}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setInvoiceData(data);
//         setShowInvoice(true);
//       })
//       .catch((err) => console.log(err));
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="min-h-screen p-6" style={{ background: "#F5F5F5" }}>
//       <div className="flex gap-6" style={{ maxWidth: "100%", alignItems: "flex-start" }}>
//         {/* LEFT: Categories + Products */}
//         <div className="flex-1" style={{ minWidth: 0 }}>
//           {/* Category scroll bar */}
//           <div
//             className="flex gap-2 pb-3 mb-4"
//             style={{
//               overflowX: "auto",
//               overflowY: "hidden",
//               whiteSpace: "nowrap",
//               maxWidth: "100%",
//               scrollbarWidth: "thin",
//             }}
//           >
//             <button
//               onClick={() => setActiveCategory("all")}
//               className="px-4 py-2 text-sm font-medium rounded-full transition-colors"
//               style={{
//                 background: activeCategory === "all" ? "#22C55E" : "#FFFFFF",
//                 color: activeCategory === "all" ? "#FFFFFF" : "#374151",
//                 border: "1px solid #E5E7EB",
//                 flexShrink: 0,
//               }}
//             >
//               All Menu
//             </button>
//             {categories.map((cat) => (
//               <button
//                 key={cat.categoryID}
//                 onClick={() => setActiveCategory(cat.categoryID)}
//                 className="px-4 py-2 text-sm font-medium rounded-full transition-colors"
//                 style={{
//                   background: String(activeCategory) === String(cat.categoryID) ? "#22C55E" : "#FFFFFF",
//                   color: String(activeCategory) === String(cat.categoryID) ? "#FFFFFF" : "#374151",
//                   border: "1px solid #E5E7EB",
//                   flexShrink: 0,
//                 }}
//               >
//                 {cat.categoryName}
//               </button>
//             ))}
//           </div>

//           {/* Products grid */}
//           <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
//             {filteredProducts.map((p) => (
//               <div
//                 key={p.productID}
//                 className="rounded-lg overflow-hidden"
//                 style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}
//               >
//                 {p.image ? (
//                   <img
//                     src={`http://172.20.10.14:8081/uploads/${p.image}`}
//                     alt={p.productName}
//                     className="w-full h-32 object-cover"
//                   />
//                 ) : (
//                   <div
//                     className="w-full h-32 flex items-center justify-center text-gray-300 text-xl"
//                     style={{ background: "#F3F4F6" }}
//                   >
//                     No Image
//                   </div>
//                 )}
//                 <div className="p-3">
//                   <p className="text-sm font-medium text-gray-800 truncate">{p.productName}</p>
//                   <p className="text-sm font-semibold text-green-600 mb-2">
//                     ${Number(p.price).toFixed(2)}
//                   </p>
//                   <button
//                     onClick={() => addToCart(p)}
//                     className="w-full py-1.5 text-xs font-medium rounded text-white"
//                     style={{ background: "#1F2A3D" }}
//                   >
//                     + Add to order
//                   </button>
//                 </div>
//               </div>
//             ))}

//             {filteredProducts.length === 0 && (
//               <p className="col-span-full text-center text-gray-400 py-8">No products found.</p>
//             )}
//           </div>

//           {/* TODAY'S SALES REPORT (POS register only) */}
//           <div className="mt-8 rounded-lg overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
//             <div className="px-4 py-3" style={{ background: "#1F2A3D" }}>
//               <h2 className="text-sm font-semibold text-white">Today's Sales Report</h2>
//             </div>
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="bg-gray-50 text-left text-gray-600">
//                   <th className="px-3 py-2 font-medium">Sale ID</th>
//                   <th className="px-3 py-2 font-medium">Customer</th>
//                   <th className="px-3 py-2 font-medium text-right">Total Items</th>
//                   <th className="px-3 py-2 font-medium text-right">Discount</th>
//                   <th className="px-3 py-2 font-medium text-right">Total Amount</th>
//                   <th className="px-3 py-2 font-medium">Status</th>
//                   <th className="px-3 py-2 font-medium text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sales.map((s) => (
//                   <tr key={s.id} className="border-t border-gray-100">
//                     <td className="px-3 py-2">{s.id}</td>
//                     <td className="px-3 py-2">{s.customerName}</td>
//                     <td className="px-3 py-2 text-right">{s.totalItems}</td>
//                     <td className="px-3 py-2 text-right">
//                       {Number(s.discountAmount) > 0 ? (
//                         <span style={{ color: "#DC2626" }}>-${Number(s.discountAmount).toFixed(2)}</span>
//                       ) : (
//                         <span className="text-gray-400">—</span>
//                       )}
//                     </td>
//                     <td className="px-3 py-2 text-right">${Number(s.totalAmount).toFixed(2)}</td>
//                     <td className="px-3 py-2">
//                       <span
//                         className="px-2 py-0.5 rounded text-xs"
//                         style={{
//                           background: s.status === "completed" ? "#DCFCE7" : "#FEE2E2",
//                           color: s.status === "completed" ? "#16A34A" : "#DC2626",
//                         }}
//                       >
//                         {s.status}
//                       </span>
//                     </td>
//                     <td className="px-3 py-2 text-center">
//                       <button
//                         onClick={() => handleViewInvoice(s.id)}
//                         className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100"
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {sales.length === 0 && (
//                   <tr>
//                     <td colSpan={7} className="px-3 py-6 text-center text-gray-400">
//                       No sales yet today.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* RIGHT: Live cart / basket */}
//         <div
//           className="rounded-lg p-4"
//           style={{
//             background: "#FFFFFF",
//             border: "1px solid #E5E7EB",
//             height: "fit-content",
//             width: "320px",
//             flexShrink: 0,
//           }}
//         >
//           <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Live Order</p>

//           <input
//             type="text"
//             placeholder="Customer name (optional)"
//             value={customerName}
//             onChange={(e) => setCustomerName(e.target.value)}
//             className="w-full mb-3 p-2 text-sm border border-gray-200 rounded focus:outline-none"
//           />

//           {cart.length === 0 ? (
//             <p className="text-center text-gray-300 py-12 text-sm">Cart is empty</p>
//           ) : (
//             <div className="space-y-3 mb-4">
//               {cart.map((item) => (
//                 <div key={item.productID} className="border-b border-gray-100 pb-3">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="text-sm font-medium text-gray-800">{item.productName}</p>
//                       <p className="text-sm font-semibold text-green-600">
//                         ${item.price.toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 mt-2">
//                     <button
//                       onClick={() => decreaseQty(item.productID)}
//                       className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50"
//                     >
//                       −
//                     </button>
//                     <span className="text-sm w-6 text-center">{item.quantity}</span>
//                     <button
//                       onClick={() => increaseQty(item.productID)}
//                       className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           <div className="flex justify-between items-center py-3 border-t border-gray-200">
//             <span className="text-sm text-gray-500">Total Amount</span>
//             <span className="text-lg font-semibold text-gray-800">${totalAmount.toFixed(2)}</span>
//           </div>
//           <p className="text-xs text-gray-400 mb-3">
//             Shown before any active discount - the final price is calculated when you confirm.
//           </p>

//           <button
//             onClick={handleConfirmOrder}
//             className="w-full py-3 text-sm font-medium rounded text-white"
//             style={{ background: "#6366F1" }}
//           >
//             Confirm Order
//           </button>
//         </div>
//       </div>

//       {/* INVOICE MODAL */}
//       {showInvoice && invoiceData && (
//         <div className="fixed inset-0 flex justify-center items-center z-50 p-4" style={{ background: "rgba(0,0,0,0.45)" }}>
//           <div className="w-full max-w-sm rounded-lg overflow-hidden bg-white" id="invoice-print">
//             <div className="p-6">
//               <h2 className="text-lg font-semibold mb-1">Invoice #{invoiceData.sale.saleID}</h2>
//               <p className="text-sm text-gray-500 mb-4">
//                 {new Date(invoiceData.sale.saleDate).toLocaleString()}
//               </p>
//               <p className="text-sm mb-3">
//                 Customer: <span className="font-medium">{invoiceData.sale.customerName}</span>
//               </p>

//               <table className="w-full text-sm mb-4">
//                 <thead>
//                   <tr className="text-left text-gray-500 border-b border-gray-200">
//                     <th className="py-1">Item</th>
//                     <th className="py-1 text-right">Qty</th>
//                     <th className="py-1 text-right">Price</th>
//                     <th className="py-1 text-right">Subtotal</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {invoiceData.items.map((item) => (
//                     <tr key={item.saleItemID} className="border-b border-gray-100">
//                       <td className="py-1">{item.productName}</td>
//                       <td className="py-1 text-right">{item.quantity}</td>
//                       <td className="py-1 text-right">${Number(item.price).toFixed(2)}</td>
//                       <td className="py-1 text-right">${Number(item.subtotal).toFixed(2)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {Number(invoiceData.sale.discountAmount) > 0 && (
//                 <div className="flex justify-between text-sm mb-1" style={{ color: "#DC2626" }}>
//                   <span>Discount ({Number(invoiceData.sale.discountPercent).toFixed(0)}%)</span>
//                   <span>-${Number(invoiceData.sale.discountAmount).toFixed(2)}</span>
//                 </div>
//               )}
//               <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
//                 <span>Total</span>
//                 <span>${Number(invoiceData.sale.totalAmount).toFixed(2)}</span>
//               </div>
//             </div>

//             <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-200 print:hidden">
//               <button
//                 onClick={() => setShowInvoice(false)}
//                 className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
//               >
//                 Close
//               </button>
//               <button
//                 onClick={handlePrint}
//                 className="px-4 py-2 text-sm rounded text-white"
//                 style={{ background: "#1F2A3D" }}
//               >
//                 Print Invoice
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";

const API_PRODUCTS = "http://172.20.10.14:8081/api/products";
const API_CATEGORIES = "http://172.20.10.14:8081/api/categories";
const API_SALES = "http://172.20.10.14:8081/api/sales";

const POLL_INTERVAL = 5000; // 5 s live-refresh

export default function Sales() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [sales, setSales] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [customerName, setCustomerName] = useState("");

  // drag-scroll refs for category bar
  const catScrollRef = useRef(null);
  const dragState = useRef({ dragging: false, startX: 0, scrollLeft: 0 });

  // ── data fetchers ──────────────────────────────────────────────────────────
  const fetchProducts = () =>
    fetch(API_PRODUCTS)
      .then((r) => r.json())
      .then((d) => setProducts(Array.isArray(d) ? d : []))
      .catch(console.error);

  const fetchCategories = () =>
    fetch(API_CATEGORIES)
      .then((r) => r.json())
      .then(setCategories)
      .catch(console.error);

  const fetchSales = () =>
    fetch(`${API_SALES}/today`)
      .then((r) => r.json())
      .then((d) => {
        const posOnly = Array.isArray(d) ? d.filter((s) => s.source === "POS") : [];
        setSales(posOnly);
      })
      .catch(console.error);

  // initial load + polling
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSales();

    const id = setInterval(() => {
      fetchProducts();
      fetchCategories();
      fetchSales();
    }, POLL_INTERVAL);

    return () => clearInterval(id);
  }, []);

  // ── category drag-scroll handlers ─────────────────────────────────────────
  const onMouseDown = (e) => {
    dragState.current = {
      dragging: true,
      startX: e.pageX - catScrollRef.current.offsetLeft,
      scrollLeft: catScrollRef.current.scrollLeft,
    };
  };
  const onMouseMove = (e) => {
    if (!dragState.current.dragging) return;
    e.preventDefault();
    const x = e.pageX - catScrollRef.current.offsetLeft;
    catScrollRef.current.scrollLeft =
      dragState.current.scrollLeft - (x - dragState.current.startX);
  };
  const onMouseUp = () => (dragState.current.dragging = false);

  // touch drag
  const onTouchStart = (e) => {
    dragState.current = {
      dragging: true,
      startX: e.touches[0].pageX - catScrollRef.current.offsetLeft,
      scrollLeft: catScrollRef.current.scrollLeft,
    };
  };
  const onTouchMove = (e) => {
    if (!dragState.current.dragging) return;
    const x = e.touches[0].pageX - catScrollRef.current.offsetLeft;
    catScrollRef.current.scrollLeft =
      dragState.current.scrollLeft - (x - dragState.current.startX);
  };

  // ── cart helpers ──────────────────────────────────────────────────────────
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => String(p.categoryID) === String(activeCategory));

  const addToCart = (product) =>
    setCart((prev) => {
      const ex = prev.find((i) => i.productID === product.productID);
      if (ex)
        return prev.map((i) =>
          i.productID === product.productID ? { ...i, quantity: i.quantity + 1 } : i
        );
      return [
        ...prev,
        {
          productID: product.productID,
          productName: product.productName,
          price: Number(product.price),
          quantity: 1,
        },
      ];
    });

  const changeQty = (productID, delta) =>
    setCart((prev) =>
      prev
        .map((i) =>
          i.productID === productID ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter((i) => i.quantity > 0)
    );

  const totalAmount = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  // ── order / invoice ───────────────────────────────────────────────────────
  const handleConfirmOrder = () => {
    if (!cart.length) return alert("Cart is empty");
    fetch(API_SALES, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerName: customerName || "Walk-in", items: cart }),
    })
      .then((r) => r.json())
      .then(() => {
        setCart([]);
        setCustomerName("");
        fetchSales();
        fetchProducts();
        alert("Order confirmed!");
      })
      .catch(console.error);
  };

  const handleViewInvoice = (saleID) =>
    fetch(`${API_SALES}/${saleID}`)
      .then((r) => r.json())
      .then((d) => { setInvoiceData(d); setShowInvoice(true); })
      .catch(console.error);

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        /* ── scrollbar tweaks ── */
        .cat-scroll::-webkit-scrollbar { display: none; }
        .cat-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        .product-scroll::-webkit-scrollbar { width: 4px; }
        .product-scroll::-webkit-scrollbar-track { background: transparent; }
        .product-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }

        .cart-scroll::-webkit-scrollbar { width: 4px; }
        .cart-scroll::-webkit-scrollbar-track { background: transparent; }
        .cart-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }

        @media print {
          body > *:not(#invoice-print) { display: none !important; }
          #invoice-print { display: block !important; }
          .print-hide { display: none !important; }
        }
      `}</style>

      {/*
        ── PAGE SHELL ──
        Full viewport height, two columns, no page-level scroll
      */}
      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
          background: "#F5F5F5",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* ══════════════════ LEFT COLUMN ══════════════════ */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            padding: "16px 16px 0 16px",
            overflow: "hidden",
          }}
        >
          {/* ── Category bar ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            {/* "All Menu" pinned */}
            <button
              onClick={() => setActiveCategory("all")}
              style={{
                flexShrink: 0,
                padding: "7px 18px",
                borderRadius: 999,
                border: "1px solid #E5E7EB",
                background: activeCategory === "all" ? "#22C55E" : "#fff",
                color: activeCategory === "all" ? "#fff" : "#374151",
                fontWeight: 500,
                fontSize: 13,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "background .15s, color .15s",
              }}
            >
              All Menu
            </button>

            {/* scrollable rest */}
            <div
              ref={catScrollRef}
              className="cat-scroll"
              style={{
                display: "flex",
                gap: 8,
                overflowX: "auto",
                cursor: dragState.current.dragging ? "grabbing" : "grab",
                userSelect: "none",
                WebkitOverflowScrolling: "touch",
              }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onMouseUp}
            >
              {categories.map((cat) => (
                <button
                  key={cat.categoryID}
                  onClick={() => setActiveCategory(cat.categoryID)}
                  style={{
                    flexShrink: 0,
                    padding: "7px 18px",
                    borderRadius: 999,
                    border: "1px solid #E5E7EB",
                    background:
                      String(activeCategory) === String(cat.categoryID) ? "#22C55E" : "#fff",
                    color:
                      String(activeCategory) === String(cat.categoryID) ? "#fff" : "#374151",
                    fontWeight: 500,
                    fontSize: 13,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background .15s, color .15s",
                  }}
                >
                  {cat.categoryName}
                </button>
              ))}
            </div>
          </div>

          {/* ── Product grid (scrollable block) ── */}
          <div
            className="product-scroll"
            style={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              paddingRight: 4,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: 14,
                paddingBottom: 16,
              }}
            >
              {filteredProducts.map((p) => (
                <div
                  key={p.productID}
                  style={{
                    background: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  {p.image ? (
                    <img
                      src={`http://172.20.10.14:8081/uploads/${p.image}`}
                      alt={p.productName}
                      style={{ width: "100%", height: 120, objectFit: "cover", display: "block" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: 120,
                        background: "#F3F4F6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#D1D5DB",
                        fontSize: 12,
                      }}
                    >
                      No Image
                    </div>
                  )}
                  <div style={{ padding: "10px 12px" }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#1f2937",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.productName}
                    </p>
                    <p style={{ margin: "3px 0 8px", fontSize: 13, fontWeight: 700, color: "#16a34a" }}>
                      ${Number(p.price).toFixed(2)}
                    </p>
                    <button
                      onClick={() => addToCart(p)}
                      style={{
                        width: "100%",
                        padding: "6px 0",
                        fontSize: 12,
                        fontWeight: 500,
                        color: "#fff",
                        background: "#1F2A3D",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                    >
                      + Add to order
                    </button>
                  </div>
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <p
                  style={{
                    gridColumn: "1/-1",
                    textAlign: "center",
                    color: "#9ca3af",
                    padding: "40px 0",
                    fontSize: 14,
                  }}
                >
                  No products found.
                </p>
              )}
            </div>

            {/* ── Today's Sales Report ── */}
            <div
              style={{
                background: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 10,
                overflow: "hidden",
                marginBottom: 16,
              }}
            >
              <div style={{ background: "#1F2A3D", padding: "10px 16px" }}>
                <span style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>
                  Today's Sales Report
                </span>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#F9FAFB", color: "#6b7280" }}>
                      {["Sale ID", "Customer", "Total Items", "Discount", "Total Amount", "Status", "Action"].map(
                        (h) => (
                          <th
                            key={h}
                            style={{
                              padding: "8px 12px",
                              fontWeight: 500,
                              textAlign: h === "Action" ? "center" : h.includes("Total") || h === "Discount" ? "right" : "left",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {sales.map((s) => (
                      <tr key={s.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                        <td style={{ padding: "8px 12px" }}>{s.id}</td>
                        <td style={{ padding: "8px 12px" }}>{s.customerName}</td>
                        <td style={{ padding: "8px 12px", textAlign: "right" }}>{s.totalItems}</td>
                        <td style={{ padding: "8px 12px", textAlign: "right" }}>
                          {Number(s.discountAmount) > 0 ? (
                            <span style={{ color: "#dc2626" }}>-${Number(s.discountAmount).toFixed(2)}</span>
                          ) : (
                            <span style={{ color: "#d1d5db" }}>—</span>
                          )}
                        </td>
                        <td style={{ padding: "8px 12px", textAlign: "right" }}>
                          ${Number(s.totalAmount).toFixed(2)}
                        </td>
                        <td style={{ padding: "8px 12px" }}>
                          <span
                            style={{
                              padding: "2px 8px",
                              borderRadius: 4,
                              fontSize: 11,
                              background: s.status === "completed" ? "#dcfce7" : "#fee2e2",
                              color: s.status === "completed" ? "#16a34a" : "#dc2626",
                            }}
                          >
                            {s.status}
                          </span>
                        </td>
                        <td style={{ padding: "8px 12px", textAlign: "center" }}>
                          <button
                            onClick={() => handleViewInvoice(s.id)}
                            style={{
                              padding: "4px 10px",
                              fontSize: 12,
                              border: "1px solid #d1d5db",
                              borderRadius: 5,
                              background: "#fff",
                              cursor: "pointer",
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                    {sales.length === 0 && (
                      <tr>
                        <td colSpan={7} style={{ padding: "28px 0", textAlign: "center", color: "#9ca3af" }}>
                          No sales yet today.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════ RIGHT COLUMN – LIVE ORDER ══════════════════ */}
        <div
          style={{
            width: 300,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            background: "#fff",
            borderLeft: "1px solid #E5E7EB",
          }}
        >
          {/* header */}
          <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid #f3f4f6" }}>
            <p style={{ margin: 0, fontSize: 10, letterSpacing: "0.12em", color: "#9ca3af", textTransform: "uppercase" }}>
              Live Order
            </p>
            <input
              type="text"
              placeholder="Customer name (optional)"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              style={{
                marginTop: 10,
                width: "100%",
                padding: "8px 10px",
                fontSize: 13,
                border: "1px solid #e5e7eb",
                borderRadius: 7,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* scrollable cart items */}
          <div
            className="cart-scroll"
            style={{ flex: 1, overflowY: "auto", padding: "10px 16px" }}
          >
            {cart.length === 0 ? (
              <p style={{ textAlign: "center", color: "#d1d5db", paddingTop: 60, fontSize: 13 }}>
                Cart is empty
              </p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.productID}
                  style={{ borderBottom: "1px solid #f3f4f6", paddingBottom: 12, marginBottom: 12 }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1f2937" }}>
                      {item.productName}
                    </p>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#16a34a" }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <p style={{ margin: "2px 0 6px", fontSize: 12, color: "#6b7280" }}>
                    ${item.price.toFixed(2)} each
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button
                      onClick={() => changeQty(item.productID, -1)}
                      style={qtyBtnStyle}
                    >
                      −
                    </button>
                    <span style={{ fontSize: 13, minWidth: 20, textAlign: "center" }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => changeQty(item.productID, 1)}
                      style={qtyBtnStyle}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* footer: total + confirm */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: "#6b7280" }}>Total Amount</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#1f2937" }}>
                ${totalAmount.toFixed(2)}
              </span>
            </div>
            <p style={{ margin: "0 0 10px", fontSize: 11, color: "#9ca3af" }}>
              Shown before discount — final price calculated on confirm.
            </p>
            <button
              onClick={handleConfirmOrder}
              style={{
                width: "100%",
                padding: "12px 0",
                fontSize: 14,
                fontWeight: 600,
                color: "#fff",
                background: "#6366F1",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════ INVOICE MODAL ══════════════════ */}
      {showInvoice && invoiceData && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: 16,
          }}
        >
          <div
            id="invoice-print"
            style={{ width: "100%", maxWidth: 400, background: "#fff", borderRadius: 10, overflow: "hidden" }}
          >
            <div style={{ padding: 24 }}>
              <h2 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 700 }}>
                Invoice #{invoiceData.sale.saleID}
              </h2>
              <p style={{ margin: "0 0 12px", fontSize: 13, color: "#6b7280" }}>
                {new Date(invoiceData.sale.saleDate).toLocaleString()}
              </p>
              <p style={{ margin: "0 0 16px", fontSize: 13 }}>
                Customer:{" "}
                <span style={{ fontWeight: 600 }}>{invoiceData.sale.customerName}</span>
              </p>

              <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse", marginBottom: 12 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #e5e7eb", color: "#6b7280" }}>
                    {["Item", "Qty", "Price", "Subtotal"].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "4px 0",
                          fontWeight: 500,
                          textAlign: h === "Item" ? "left" : "right",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item) => (
                    <tr key={item.saleItemID} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <td style={{ padding: "5px 0" }}>{item.productName}</td>
                      <td style={{ padding: "5px 0", textAlign: "right" }}>{item.quantity}</td>
                      <td style={{ padding: "5px 0", textAlign: "right" }}>
                        ${Number(item.price).toFixed(2)}
                      </td>
                      <td style={{ padding: "5px 0", textAlign: "right" }}>
                        ${Number(item.subtotal).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {Number(invoiceData.sale.discountAmount) > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#dc2626", marginBottom: 4 }}>
                  <span>Discount ({Number(invoiceData.sale.discountPercent).toFixed(0)}%)</span>
                  <span>-${Number(invoiceData.sale.discountAmount).toFixed(2)}</span>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: 700,
                  fontSize: 15,
                  borderTop: "1px solid #e5e7eb",
                  paddingTop: 8,
                }}
              >
                <span>Total</span>
                <span>${Number(invoiceData.sale.totalAmount).toFixed(2)}</span>
              </div>
            </div>

            <div
              className="print-hide"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
                padding: "12px 24px",
                borderTop: "1px solid #e5e7eb",
              }}
            >
              <button
                onClick={() => setShowInvoice(false)}
                style={{
                  padding: "8px 16px",
                  fontSize: 13,
                  border: "1px solid #d1d5db",
                  borderRadius: 6,
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                style={{
                  padding: "8px 16px",
                  fontSize: 13,
                  color: "#fff",
                  background: "#1F2A3D",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const qtyBtnStyle = {
  width: 28,
  height: 28,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #e5e7eb",
  borderRadius: 6,
  background: "#fff",
  cursor: "pointer",
  fontSize: 16,
  color: "#374151",
};
