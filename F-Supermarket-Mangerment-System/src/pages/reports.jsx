

// import { useEffect, useState } from "react";

// const API_SALES = "http://172.20.10.14:8081/api/sales";
// const API_WEB_ORDERS = "http://172.20.10.14:8081/api/web-orders";

// const todayStr = () => new Date().toISOString().split("T")[0];

// export default function Report() {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [sales, setSales] = useState([]);
//   const [topProducts, setTopProducts] = useState([]);
//   const [showInvoice, setShowInvoice] = useState(false);
//   const [invoiceData, setInvoiceData] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;

//   useEffect(() => {
//     fetchReport();
//   }, []);

//   // NOTE: /api/sales/range and /api/sales/top-products now return BOTH
//   // POS sales and web orders (each row tagged with a "source" of "POS" or
//   // "WEB"), so this report covers the whole business, not just the till.
//   const fetchReport = () => {
//     fetch(`${API_SALES}/range?startDate=${startDate}&endDate=${endDate}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setSales(Array.isArray(data) ? data : []);
//         setCurrentPage(1);
//       })
//       .catch((err) => console.log(err));

//     fetch(`${API_SALES}/top-products?startDate=${startDate}&endDate=${endDate}`)
//       .then((res) => res.json())
//       .then((data) => setTopProducts(Array.isArray(data) ? data : []))
//       .catch((err) => console.log(err));
//   };

//   // Each row knows its own source, so we hit the right endpoint and
//   // normalize the two different shapes (sale vs web order) into one object
//   // the invoice modal can render either way.
//   const handleViewInvoice = (row) => {
//     if (row.source === "WEB") {
//       fetch(`${API_WEB_ORDERS}/${row.id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setInvoiceData({
//             source: "WEB",
//             id: data.order.orderID,
//             customerName: data.order.customerName,
//             date: data.order.createdAt,
//             subtotalAmount: data.order.subtotalAmount,
//             discountAmount: data.order.discountAmount,
//             totalAmount: data.order.totalAmount,
//             phone: data.order.phone,
//             address: data.order.address,
//             items: data.items,
//           });
//           setShowInvoice(true);
//         })
//         .catch((err) => console.log(err));
//     } else {
//       fetch(`${API_SALES}/${row.id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setInvoiceData({
//             source: "POS",
//             id: data.sale.saleID,
//             customerName: data.sale.customerName,
//             date: data.sale.saleDate,
//             subtotalAmount: data.sale.subtotalAmount,
//             discountAmount: data.sale.discountAmount,
//             totalAmount: data.sale.totalAmount,
//             items: data.items,
//           });
//           setShowInvoice(true);
//         })
//         .catch((err) => console.log(err));
//     }
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   // Summary calculations
//   const totalRevenue = sales.reduce((sum, s) => sum + Number(s.totalAmount), 0);
//   const totalDiscount = sales.reduce((sum, s) => sum + Number(s.discountAmount || 0), 0);
//   const totalOrders = sales.length;
//   const totalItems = sales.reduce((sum, s) => sum + Number(s.totalItems), 0);
//   const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

//   // Pagination
//   const totalPages = Math.max(1, Math.ceil(sales.length / pageSize));
//   const paginatedSales = sales.slice((currentPage - 1) * pageSize, currentPage * pageSize);

//   // CSV export
//   const handleExportCSV = () => {
//     if (sales.length === 0) {
//       alert("No data to export");
//       return;
//     }

//     const headers = ["ID", "Source", "Customer", "Total Items", "Discount", "Total Amount", "Status", "Date"];
//     const rows = sales.map((s) => [
//       s.id,
//       s.source,
//       s.customerName,
//       s.totalItems,
//       Number(s.discountAmount || 0).toFixed(2),
//       Number(s.totalAmount).toFixed(2),
//       s.status,
//       new Date(s.orderDate).toLocaleString(),
//     ]);

//     const csvContent =
//       [headers, ...rows]
//         .map((row) => row.map((val) => `"${val}"`).join(","))
//         .join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `sales_report_${startDate}_to_${endDate}.csv`;
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="min-h-screen p-6" style={{ background: "#F5F5F5" }}>
//       <h1 className="text-2xl font-semibold mb-1" style={{ fontFamily: "'Source Serif Pro', Georgia, serif", color: "#1F2A3D" }}>
//         Sales Report
//       </h1>
//       <p className="text-sm text-gray-500 mb-6">View historical sales and performance, in-store and online</p>

//       {/* Date filter */}
//       <div className="flex items-end gap-3 mb-6 rounded-lg p-4" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
//         <div>
//           <label className="block text-xs font-medium text-gray-500 mb-1">Start date</label>
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="p-2 text-sm border border-gray-200 rounded focus:outline-none"
//           />
//         </div>
//         <div>
//           <label className="block text-xs font-medium text-gray-500 mb-1">End date</label>
//           <input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="p-2 text-sm border border-gray-200 rounded focus:outline-none"
//           />
//         </div>
//         <button
//           onClick={fetchReport}
//           className="px-4 py-2 text-sm font-medium rounded text-white"
//           style={{ background: "#1F2A3D" }}
//         >
//           Apply
//         </button>
//         <button
//           onClick={handleExportCSV}
//           className="px-4 py-2 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50"
//         >
//           Export CSV
//         </button>
//       </div>

//       {/* Summary cards */}
//       <div className="grid grid-cols-5 gap-4 mb-6">
//         <div className="rounded-lg p-4" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
//           <p className="text-xs text-gray-500 mb-1">Total revenue</p>
//           <p className="text-xl font-semibold text-gray-800">${totalRevenue.toFixed(2)}</p>
//         </div>
//         <div className="rounded-lg p-4" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
//           <p className="text-xs text-gray-500 mb-1">Total discount given</p>
//           <p className="text-xl font-semibold" style={{ color: "#DC2626" }}>-${totalDiscount.toFixed(2)}</p>
//         </div>
//         <div className="rounded-lg p-4" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
//           <p className="text-xs text-gray-500 mb-1">Total orders</p>
//           <p className="text-xl font-semibold text-gray-800">{totalOrders}</p>
//         </div>
//         <div className="rounded-lg p-4" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
//           <p className="text-xs text-gray-500 mb-1">Total items sold</p>
//           <p className="text-xl font-semibold text-gray-800">{totalItems}</p>
//         </div>
//         <div className="rounded-lg p-4" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
//           <p className="text-xs text-gray-500 mb-1">Avg order value</p>
//           <p className="text-xl font-semibold text-gray-800">${avgOrderValue.toFixed(2)}</p>
//         </div>
//       </div>

//       <div className="flex gap-6" style={{ alignItems: "flex-start" }}>
//         {/* Sales table */}
//         <div className="flex-1 rounded-lg overflow-hidden" style={{ minWidth: 0, background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
//           <div className="px-4 py-3" style={{ background: "#1F2A3D" }}>
//             <h2 className="text-sm font-semibold text-white">Sales</h2>
//           </div>
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-gray-50 text-left text-gray-600">
//                 <th className="px-3 py-2 font-medium">ID</th>
//                 <th className="px-3 py-2 font-medium">Source</th>
//                 <th className="px-3 py-2 font-medium">Customer</th>
//                 <th className="px-3 py-2 font-medium text-right">Items</th>
//                 <th className="px-3 py-2 font-medium text-right">Discount</th>
//                 <th className="px-3 py-2 font-medium text-right">Total</th>
//                 <th className="px-3 py-2 font-medium">Status</th>
//                 <th className="px-3 py-2 font-medium">Date</th>
//                 <th className="px-3 py-2 font-medium text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedSales.map((s) => (
//                 <tr key={`${s.source}-${s.id}`} className="border-t border-gray-100">
//                   <td className="px-3 py-2">{s.id}</td>
//                   <td className="px-3 py-2">
//                     <span
//                       className="px-2 py-0.5 rounded text-xs"
//                       style={{
//                         background: s.source === "WEB" ? "#E0E7FF" : "#F3F4F6",
//                         color: s.source === "WEB" ? "#4338CA" : "#374151",
//                       }}
//                     >
//                       {s.source}
//                     </span>
//                   </td>
//                   <td className="px-3 py-2">{s.customerName}</td>
//                   <td className="px-3 py-2 text-right">{s.totalItems}</td>
//                   <td className="px-3 py-2 text-right">
//                     {Number(s.discountAmount) > 0 ? (
//                       <span style={{ color: "#DC2626" }}>
//                         -${Number(s.discountAmount).toFixed(2)} ({Number(s.discountPercent).toFixed(0)}%)
//                       </span>
//                     ) : (
//                       <span className="text-gray-400">—</span>
//                     )}
//                   </td>
//                   <td className="px-3 py-2 text-right">${Number(s.totalAmount).toFixed(2)}</td>
//                   <td className="px-3 py-2">
//                     <span
//                       className="px-2 py-0.5 rounded text-xs"
//                       style={{
//                         background: ["completed", "delivered"].includes(s.status) ? "#DCFCE7" : "#FEE2E2",
//                         color: ["completed", "delivered"].includes(s.status) ? "#16A34A" : "#DC2626",
//                       }}
//                     >
//                       {s.status}
//                     </span>
//                   </td>
//                   <td className="px-3 py-2 text-gray-500">
//                     {new Date(s.orderDate).toLocaleString()}
//                   </td>
//                   <td className="px-3 py-2 text-center">
//                     <button
//                       onClick={() => handleViewInvoice(s)}
//                       className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {paginatedSales.length === 0 && (
//                 <tr>
//                   <td colSpan={9} className="px-3 py-6 text-center text-gray-400">
//                     No sales found for this date range.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-between items-center px-4 py-3 border-t border-gray-100">
//               <span className="text-xs text-gray-500">
//                 Page {currentPage} of {totalPages}
//               </span>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-1 text-xs border border-gray-300 rounded disabled:opacity-40"
//                 >
//                   Previous
//                 </button>
//                 <button
//                   onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-1 text-xs border border-gray-300 rounded disabled:opacity-40"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Top products */}
//         <div className="rounded-lg overflow-hidden" style={{ width: "320px", flexShrink: 0, background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
//           <div className="px-4 py-3" style={{ background: "#1F2A3D" }}>
//             <h2 className="text-sm font-semibold text-white">Top selling products</h2>
//           </div>
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-gray-50 text-left text-gray-600">
//                 <th className="px-3 py-2 font-medium">Product</th>
//                 <th className="px-3 py-2 font-medium text-right">Qty</th>
//                 <th className="px-3 py-2 font-medium text-right">Revenue</th>
//               </tr>
//             </thead>
//             <tbody>
//               {topProducts.map((p) => (
//                 <tr key={p.productID} className="border-t border-gray-100">
//                   <td className="px-3 py-2 truncate" style={{ maxWidth: "140px" }}>{p.productName}</td>
//                   <td className="px-3 py-2 text-right">{p.totalQty}</td>
//                   <td className="px-3 py-2 text-right">${Number(p.totalRevenue).toFixed(2)}</td>
//                 </tr>
//               ))}
//               {topProducts.length === 0 && (
//                 <tr>
//                   <td colSpan={3} className="px-3 py-6 text-center text-gray-400">
//                     No data.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* INVOICE MODAL */}
//       {showInvoice && invoiceData && (
//         <div className="fixed inset-0 flex justify-center items-center z-50 p-4" style={{ background: "rgba(0,0,0,0.45)" }}>
//           <div className="w-full max-w-sm rounded-lg overflow-hidden bg-white" id="invoice-print">
//             <div className="p-6">
//               <h2 className="text-lg font-semibold mb-1">
//                 {invoiceData.source === "WEB" ? "Web order" : "Invoice"} #{invoiceData.id}
//               </h2>
//               <p className="text-sm text-gray-500 mb-4">
//                 {new Date(invoiceData.date).toLocaleString()}
//               </p>
//               <p className="text-sm mb-3">
//                 Customer: <span className="font-medium">{invoiceData.customerName}</span>
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
//                     <tr key={item.saleItemID || item.itemID} className="border-b border-gray-100">
//                       <td className="py-1">{item.productName}</td>
//                       <td className="py-1 text-right">{item.quantity}</td>
//                       <td className="py-1 text-right">${Number(item.price).toFixed(2)}</td>
//                       <td className="py-1 text-right">${Number(item.subtotal).toFixed(2)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {Number(invoiceData.subtotalAmount) > 0 && (
//                 <div className="flex justify-between text-sm text-gray-500 mb-1">
//                   <span>Subtotal</span>
//                   <span>${Number(invoiceData.subtotalAmount).toFixed(2)}</span>
//                 </div>
//               )}
//               {Number(invoiceData.discountAmount) > 0 && (
//                 <div className="flex justify-between text-sm mb-1" style={{ color: "#DC2626" }}>
//                   <span>Discount</span>
//                   <span>-${Number(invoiceData.discountAmount).toFixed(2)}</span>
//                 </div>
//               )}
//               <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
//                 <span>Total</span>
//                 <span>${Number(invoiceData.totalAmount).toFixed(2)}</span>
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


import { useEffect, useState, useCallback, useRef } from "react";

const API_SALES = "http://172.20.10.14:8081/api/sales";
const API_WEB_ORDERS = "http://172.20.10.14:8081/api/web-orders";
const POLL_INTERVAL = 15_000; // 15 seconds

// ─── Notification sound ───────────────────────────────────────────────────────
function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  } catch (_) {}
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ count, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 200,
      background: "#1F2A3D", color: "#fff",
      borderRadius: 12, padding: "11px 18px",
      display: "flex", alignItems: "center", gap: 10,
      boxShadow: "0 8px 24px rgba(0,0,0,.18)",
      fontSize: 13, fontWeight: 600,
      animation: "slideUp .25s ease",
    }}>
      <span style={{ fontSize: 16 }}>🧾</span>
      {count === 1 ? "1 new sale recorded" : `${count} new sales recorded`}
      <button
        onClick={onDismiss}
        style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", opacity: 0.6, marginLeft: 4, fontSize: 16, lineHeight: 1, padding: 0 }}
      >
        ×
      </button>
    </div>
  );
}

// ─── Pulse dot ────────────────────────────────────────────────────────────────
function PulseDot({ color }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 9, height: 9 }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color, opacity: 0.4, animation: "pulse 1.8s ease-in-out infinite" }} />
      <span style={{ width: 9, height: 9, borderRadius: "50%", background: color, position: "relative" }} />
    </span>
  );
}

export default function Report() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sales, setSales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [syncing, setSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState(null);
  const [toast, setToast] = useState(null);
  const [newSaleIds, setNewSaleIds] = useState(new Set());
  const knownIdsRef = useRef(null);
  const startRef = useRef(startDate);
  const endRef = useRef(endDate);
  const pageSize = 10;

  // Keep refs in sync so the polling closure always reads current filter values
  useEffect(() => { startRef.current = startDate; }, [startDate]);
  useEffect(() => { endRef.current = endDate; }, [endDate]);

  const fetchReport = useCallback((silent = false) => {
    const s = startRef.current;
    const e = endRef.current;

    if (!silent) setSyncing(true);

    Promise.all([
      fetch(`${API_SALES}/range?startDate=${s}&endDate=${e}`).then((r) => r.json()),
      fetch(`${API_SALES}/top-products?startDate=${s}&endDate=${e}`).then((r) => r.json()),
    ])
      .then(([salesData, topData]) => {
        const incoming = Array.isArray(salesData) ? salesData : [];

        // Detect new sales on silent polls
        if (silent && knownIdsRef.current !== null) {
          const incomingKeys = new Set(incoming.map((s) => `${s.source}-${s.id}`));
          const added = [...incomingKeys].filter((k) => !knownIdsRef.current.has(k));
          if (added.length > 0) {
            playNotificationSound();
            setToast({ count: added.length });
            setNewSaleIds((prev) => new Set([...prev, ...added]));
            setTimeout(() => {
              setNewSaleIds((prev) => {
                const next = new Set(prev);
                added.forEach((k) => next.delete(k));
                return next;
              });
            }, 8000);
          }
        }

        knownIdsRef.current = new Set(incoming.map((s) => `${s.source}-${s.id}`));
        setSales(incoming);
        setTopProducts(Array.isArray(topData) ? topData : []);
        setLastSynced(new Date());
        if (!silent) setCurrentPage(1);
      })
      .catch((err) => console.error(err))
      .finally(() => { if (!silent) setSyncing(false); });
  }, []);

  // Manual apply resets known IDs (new filter = fresh baseline)
  const handleApply = () => {
    knownIdsRef.current = null;
    setNewSaleIds(new Set());
    fetchReport(false);
  };

  useEffect(() => {
    fetchReport(false);
    const t = setInterval(() => fetchReport(true), POLL_INTERVAL);
    return () => clearInterval(t);
  }, [fetchReport]);

  const handleViewInvoice = (row) => {
    if (row.source === "WEB") {
      fetch(`${API_WEB_ORDERS}/${row.id}`)
        .then((res) => res.json())
        .then((data) => {
          setInvoiceData({
            source: "WEB",
            id: data.order.orderID,
            customerName: data.order.customerName,
            date: data.order.createdAt,
            subtotalAmount: data.order.subtotalAmount,
            discountAmount: data.order.discountAmount,
            totalAmount: data.order.totalAmount,
            phone: data.order.phone,
            address: data.order.address,
            items: data.items,
          });
          setShowInvoice(true);
        })
        .catch((err) => console.log(err));
    } else {
      fetch(`${API_SALES}/${row.id}`)
        .then((res) => res.json())
        .then((data) => {
          setInvoiceData({
            source: "POS",
            id: data.sale.saleID,
            customerName: data.sale.customerName,
            date: data.sale.saleDate,
            subtotalAmount: data.sale.subtotalAmount,
            discountAmount: data.sale.discountAmount,
            totalAmount: data.sale.totalAmount,
            items: data.items,
          });
          setShowInvoice(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleExportCSV = () => {
    if (sales.length === 0) { alert("No data to export"); return; }
    const headers = ["ID", "Source", "Customer", "Total Items", "Discount", "Total Amount", "Status", "Date"];
    const rows = sales.map((s) => [
      s.id, s.source, s.customerName, s.totalItems,
      Number(s.discountAmount || 0).toFixed(2),
      Number(s.totalAmount).toFixed(2),
      s.status,
      new Date(s.orderDate).toLocaleString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `sales_report_${startDate}_to_${endDate}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  // Summary
  const totalRevenue = sales.reduce((sum, s) => sum + Number(s.totalAmount), 0);
  const totalDiscount = sales.reduce((sum, s) => sum + Number(s.discountAmount || 0), 0);
  const totalOrders = sales.length;
  const totalItems = sales.reduce((sum, s) => sum + Number(s.totalItems), 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sales.length / pageSize));
  const paginatedSales = sales.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const timeAgo = (d) => {
    if (!d) return "";
    const diff = Math.floor((Date.now() - d) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="min-h-screen p-6" style={{ background: "#F5F5F5" }}>
      <style>{`
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:.4} 50%{transform:scale(2.2);opacity:0} }
        @keyframes slideUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes rowFlash { 0%,100%{background:transparent} 50%{background:#F0FDF4} }
        .new-row { animation: rowFlash 1.2s ease; }
      `}</style>

      {/* Page header */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h1 className="text-2xl font-semibold" style={{ fontFamily: "'Source Serif Pro', Georgia, serif", color: "#1F2A3D" }}>
            Sales Report
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">View historical sales and performance, in-store and online</p>
        </div>
        {/* Live indicator */}
        <div className="flex items-center gap-2 mt-1">
          <PulseDot color={syncing ? "#F59E0B" : "#16a34a"} />
          <span className="text-xs text-gray-400">
            {syncing ? "Syncing…" : lastSynced ? `Live · updated ${timeAgo(lastSynced)}` : "Live"}
          </span>
        </div>
      </div>

      {/* Date filter */}
      <div className="flex items-end gap-3 mb-6 rounded-lg p-4 mt-4" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Start date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 text-sm border border-gray-200 rounded focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">End date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 text-sm border border-gray-200 rounded focus:outline-none"
          />
        </div>
        <button
          onClick={handleApply}
          className="px-4 py-2 text-sm font-medium rounded text-white"
          style={{ background: "#1F2A3D" }}
        >
          Apply
        </button>
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 text-sm font-medium rounded border border-gray-300 hover:bg-gray-50"
        >
          Export CSV
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { label: "Total revenue", value: `$${totalRevenue.toFixed(2)}`, color: "#111827" },
          { label: "Total discount given", value: `-$${totalDiscount.toFixed(2)}`, color: "#DC2626" },
          { label: "Total orders", value: totalOrders, color: "#111827" },
          { label: "Total items sold", value: totalItems, color: "#111827" },
          { label: "Avg order value", value: `$${avgOrderValue.toFixed(2)}`, color: "#111827" },
        ].map((card) => (
          <div key={card.label} className="rounded-lg p-4" style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
            <p className="text-xs text-gray-500 mb-1">{card.label}</p>
            <p className="text-xl font-semibold" style={{ color: card.color }}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-6" style={{ alignItems: "flex-start" }}>
        {/* Sales table */}
        <div className="flex-1 rounded-lg overflow-hidden" style={{ minWidth: 0, background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
          <div className="px-4 py-3 flex items-center justify-between" style={{ background: "#1F2A3D" }}>
            <h2 className="text-sm font-semibold text-white">Sales</h2>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              Auto-updates every {POLL_INTERVAL / 1000}s
            </span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600">
                <th className="px-3 py-2 font-medium">ID</th>
                <th className="px-3 py-2 font-medium">Source</th>
                <th className="px-3 py-2 font-medium">Customer</th>
                <th className="px-3 py-2 font-medium text-right">Items</th>
                <th className="px-3 py-2 font-medium text-right">Discount</th>
                <th className="px-3 py-2 font-medium text-right">Total</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Date</th>
                <th className="px-3 py-2 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSales.map((s) => {
                const key = `${s.source}-${s.id}`;
                const isNew = newSaleIds.has(key);
                return (
                  <tr
                    key={key}
                    className={`border-t border-gray-100${isNew ? " new-row" : ""}`}
                    style={isNew ? { outline: "1.5px solid #16a34a", outlineOffset: "-1px" } : {}}
                  >
                    <td className="px-3 py-2 text-gray-700">
                      {s.id}
                      {isNew && (
                        <span className="ml-1.5 text-xs font-semibold px-1.5 py-0.5 rounded" style={{ background: "#DCFCE7", color: "#16A34A", fontSize: 10 }}>
                          New
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <span className="px-2 py-0.5 rounded text-xs" style={{ background: s.source === "WEB" ? "#E0E7FF" : "#F3F4F6", color: s.source === "WEB" ? "#4338CA" : "#374151" }}>
                        {s.source}
                      </span>
                    </td>
                    <td className="px-3 py-2">{s.customerName}</td>
                    <td className="px-3 py-2 text-right">{s.totalItems}</td>
                    <td className="px-3 py-2 text-right">
                      {Number(s.discountAmount) > 0 ? (
                        <span style={{ color: "#DC2626" }}>-${Number(s.discountAmount).toFixed(2)} ({Number(s.discountPercent).toFixed(0)}%)</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-right">${Number(s.totalAmount).toFixed(2)}</td>
                    <td className="px-3 py-2">
                      <span className="px-2 py-0.5 rounded text-xs" style={{ background: ["completed", "delivered"].includes(s.status) ? "#DCFCE7" : "#FEE2E2", color: ["completed", "delivered"].includes(s.status) ? "#16A34A" : "#DC2626" }}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-gray-500">{new Date(s.orderDate).toLocaleString()}</td>
                    <td className="px-3 py-2 text-center">
                      <button onClick={() => handleViewInvoice(s)} className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100">
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
              {paginatedSales.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-3 py-6 text-center text-gray-400">No sales found for this date range.</td>
                </tr>
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex justify-between items-center px-4 py-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">Page {currentPage} of {totalPages}</span>
              <div className="flex gap-2">
                <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 text-xs border border-gray-300 rounded disabled:opacity-40">Previous</button>
                <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 text-xs border border-gray-300 rounded disabled:opacity-40">Next</button>
              </div>
            </div>
          )}
        </div>

        {/* Top products */}
        <div className="rounded-lg overflow-hidden" style={{ width: "320px", flexShrink: 0, background: "#FFFFFF", border: "1px solid #E5E7EB" }}>
          <div className="px-4 py-3" style={{ background: "#1F2A3D" }}>
            <h2 className="text-sm font-semibold text-white">Top selling products</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600">
                <th className="px-3 py-2 font-medium">Product</th>
                <th className="px-3 py-2 font-medium text-right">Qty</th>
                <th className="px-3 py-2 font-medium text-right">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p) => (
                <tr key={p.productID} className="border-t border-gray-100">
                  <td className="px-3 py-2 truncate" style={{ maxWidth: "140px" }}>{p.productName}</td>
                  <td className="px-3 py-2 text-right">{p.totalQty}</td>
                  <td className="px-3 py-2 text-right">${Number(p.totalRevenue).toFixed(2)}</td>
                </tr>
              ))}
              {topProducts.length === 0 && (
                <tr><td colSpan={3} className="px-3 py-6 text-center text-gray-400">No data.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice modal */}
      {showInvoice && invoiceData && (
        <div className="fixed inset-0 flex justify-center items-center z-50 p-4" style={{ background: "rgba(0,0,0,0.45)" }}>
          <div className="w-full max-w-sm rounded-lg overflow-hidden bg-white" id="invoice-print">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-1">
                {invoiceData.source === "WEB" ? "Web order" : "Invoice"} #{invoiceData.id}
              </h2>
              <p className="text-sm text-gray-500 mb-4">{new Date(invoiceData.date).toLocaleString()}</p>
              <p className="text-sm mb-3">Customer: <span className="font-medium">{invoiceData.customerName}</span></p>
              <table className="w-full text-sm mb-4">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-200">
                    <th className="py-1">Item</th>
                    <th className="py-1 text-right">Qty</th>
                    <th className="py-1 text-right">Price</th>
                    <th className="py-1 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item) => (
                    <tr key={item.saleItemID || item.itemID} className="border-b border-gray-100">
                      <td className="py-1">{item.productName}</td>
                      <td className="py-1 text-right">{item.quantity}</td>
                      <td className="py-1 text-right">${Number(item.price).toFixed(2)}</td>
                      <td className="py-1 text-right">${Number(item.subtotal).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {Number(invoiceData.subtotalAmount) > 0 && (
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Subtotal</span><span>${Number(invoiceData.subtotalAmount).toFixed(2)}</span>
                </div>
              )}
              {Number(invoiceData.discountAmount) > 0 && (
                <div className="flex justify-between text-sm mb-1" style={{ color: "#DC2626" }}>
                  <span>Discount</span><span>-${Number(invoiceData.discountAmount).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
                <span>Total</span><span>${Number(invoiceData.totalAmount).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-200 print:hidden">
              <button onClick={() => setShowInvoice(false)} className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">Close</button>
              <button onClick={() => window.print()} className="px-4 py-2 text-sm rounded text-white" style={{ background: "#1F2A3D" }}>Print Invoice</button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <Toast count={toast.count} onDismiss={() => setToast(null)} />}
    </div>
  );
}
