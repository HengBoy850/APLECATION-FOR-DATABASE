


// import { useEffect, useState, useCallback, useRef } from "react";
// import {
//   Truck, X, Phone, MapPin, RefreshCw,
//   CheckCircle2, ShoppingBag, Loader2, Printer,
// } from "lucide-react";

// const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";
// const API = `${API_BASE}/api/web-orders`;

// // ─── Print invoice helper ─────────────────────────────────────────────────────
// function printInvoice(order, items) {
//   const win = window.open("", "_blank", "width=400,height=600");
//   const itemRows = items
//     .map(
//       (i) => `<tr>
//         <td style="padding:6px 0;border-bottom:1px solid #f0f0f0">${i.productName}</td>
//         <td style="padding:6px 0;border-bottom:1px solid #f0f0f0;text-align:center">${i.quantity}</td>
//         <td style="padding:6px 0;border-bottom:1px solid #f0f0f0;text-align:right">$${Number(i.price).toFixed(2)}</td>
//         <td style="padding:6px 0;border-bottom:1px solid #f0f0f0;text-align:right">$${Number(i.subtotal).toFixed(2)}</td>
//       </tr>`
//     )
//     .join("");

//   win.document.write(`
//     <!DOCTYPE html><html><head><title>Invoice #${order.orderID}</title>
//     <style>
//       body{font-family:sans-serif;padding:24px;color:#111;font-size:14px}
//       h2{margin:0 0 4px;font-size:18px} p{margin:0;color:#555;font-size:12px}
//       table{width:100%;border-collapse:collapse;margin:16px 0}
//       th{text-align:left;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:.05em;padding-bottom:6px;border-bottom:2px solid #eee}
//       .total{display:flex;justify-content:space-between;font-size:16px;font-weight:700;padding-top:12px;border-top:2px solid #111}
//     </style></head><body>
//     <h2>Invoice #${order.orderID}</h2>
//     <p>${new Date(order.createdAt).toLocaleString()}</p>
//     <br>
//     <div style="background:#f9f9f9;border-radius:8px;padding:12px;margin-bottom:4px">
//       <strong>${order.customerName}</strong><br>
//       <span style="font-size:12px;color:#555">${order.phone}</span><br>
//       <span style="font-size:12px;color:#555">${order.address}</span>
//     </div>
//     <table>
//       <thead><tr><th>Item</th><th style="text-align:center">Qty</th><th style="text-align:right">Price</th><th style="text-align:right">Sub</th></tr></thead>
//       <tbody>${itemRows}</tbody>
//     </table>
//     ${Number(order.discountAmount) > 0 ? `<div style="display:flex;justify-content:space-between;color:#888;font-size:13px;margin-bottom:4px"><span>Subtotal</span><span>$${Number(order.subtotalAmount).toFixed(2)}</span></div><div style="display:flex;justify-content:space-between;color:#dc2626;font-size:13px;margin-bottom:8px"><span>Discount</span><span>-$${Number(order.discountAmount).toFixed(2)}</span></div>` : ""}
//     <div class="total"><span>Total</span><span>$${Number(order.totalAmount).toFixed(2)}</span></div>
//     <p style="margin-top:24px;text-align:center;color:#bbb;font-size:11px">Payment: ${order.paymentMethod}</p>
//     <script>window.onload=()=>{window.print();window.close();}<\/script>
//     </body></html>
//   `);
//   win.document.close();
// }

// // ─── Order detail / print modal ───────────────────────────────────────────────
// function OrderModal({ orderId, mode, onClose, onConfirm, onDeliver, onCancel }) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [note, setNote] = useState("");
//   const [acting, setActing] = useState(false);

//   useEffect(() => {
//     fetch(`${API}/${orderId}`)
//       .then((r) => r.json())
//       .then((d) => { setData(d); setLoading(false); })
//       .catch(() => setLoading(false));
//   }, [orderId]);

//   const act = async (fn) => { setActing(true); await fn(note); setActing(false); };

//   const S = {
//     overlay: {
//       position: "fixed", inset: 0, zIndex: 100,
//       background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)",
//       display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
//     },
//     box: {
//       background: "#fff", borderRadius: 20,
//       width: "100%", maxWidth: 440, maxHeight: "90vh", overflowY: "auto",
//       boxShadow: "0 24px 64px rgba(0,0,0,.22)",
//     },
//     hdr: {
//       display: "flex", alignItems: "center", justifyContent: "space-between",
//       padding: "1.125rem 1.25rem", borderBottom: "1px solid #F0F0F0",
//       position: "sticky", top: 0, background: "#fff",
//       borderRadius: "20px 20px 0 0",
//     },
//     body: { padding: "1.25rem" },
//     infoBox: {
//       background: "#F9FAFB", borderRadius: 12,
//       padding: "0.875rem 1rem", marginBottom: "1rem",
//       border: "1px solid #F0F0F0",
//     },
//     label: {
//       fontSize: 10, fontWeight: 700, color: "#9CA3AF",
//       textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8,
//     },
//     totalBox: {
//       background: "#F9FAFB", borderRadius: 12,
//       padding: "0.875rem 1rem", margin: "0.875rem 0",
//       border: "1px solid #F0F0F0",
//     },
//     footer: {
//       padding: "0.875rem 1.25rem 1.25rem",
//       display: "flex", gap: 8,
//     },
//   };

//   const closeX = {
//     width: 30, height: 30, borderRadius: "50%",
//     border: "1px solid #E5E7EB", background: "#F9FAFB",
//     cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
//     color: "#6B7280", fontSize: 14,
//   };

//   return (
//     <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
//       <div style={S.box}>
//         <div style={S.hdr}>
//           <div>
//             <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111" }}>Order #{orderId}</p>
//             {data && (
//               <p style={{ margin: "2px 0 0", fontSize: 12, color: "#9CA3AF" }}>
//                 {mode === "print" ? "Print invoice" : "Order details"} · {new Date(data.order.createdAt).toLocaleString()}
//               </p>
//             )}
//           </div>
//           <button style={closeX} onClick={onClose} aria-label="Close"><X size={14} /></button>
//         </div>

//         {loading ? (
//           <div style={{ padding: "3rem", textAlign: "center", color: "#9CA3AF", fontSize: 14 }}>Loading…</div>
//         ) : data ? (
//           <>
//             <div style={S.body}>
//               {/* Customer */}
//               <div style={S.infoBox}>
//                 <p style={S.label}>Customer</p>
//                 <p style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 600, color: "#111" }}>{data.order.customerName}</p>
//                 <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5, fontSize: 13, color: "#6B7280" }}>
//                   <Phone size={13} /> {data.order.phone}
//                 </div>
//                 <div style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 13, color: "#6B7280" }}>
//                   <MapPin size={13} style={{ flexShrink: 0, marginTop: 1 }} /> {data.order.address}
//                 </div>
//                 <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #F0F0F0", fontSize: 12, color: "#9CA3AF" }}>
//                   Payment: <span style={{ fontWeight: 600, color: "#374151" }}>{data.order.paymentMethod}</span>
//                 </div>
//               </div>

//               {/* Items */}
//               <p style={S.label}>Items</p>
//               <div style={{ marginBottom: "0.875rem" }}>
//                 {data.items.map((item) => (
//                   <div key={item.itemID} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #F5F5F5" }}>
//                     <div>
//                       <p style={{ margin: 0, fontSize: 13, color: "#111" }}>{item.productName}</p>
//                       <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6B7280" }}>
//                         ${Number(item.price).toFixed(2)} × {item.quantity}
//                       </p>
//                     </div>
//                     <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>${Number(item.subtotal).toFixed(2)}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Totals */}
//               <div style={S.totalBox}>
//                 {Number(data.order.discountAmount) > 0 && (
//                   <>
//                     <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6B7280", marginBottom: 4 }}>
//                       <span>Subtotal</span>
//                       <span>${Number(data.order.subtotalAmount || data.order.totalAmount).toFixed(2)}</span>
//                     </div>
//                     <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#DC2626", marginBottom: 6 }}>
//                       <span>Discount</span>
//                       <span>−${Number(data.order.discountAmount).toFixed(2)}</span>
//                     </div>
//                   </>
//                 )}
//                 <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 700, color: "#111", paddingTop: Number(data.order.discountAmount) > 0 ? 8 : 0, borderTop: Number(data.order.discountAmount) > 0 ? "1px solid #E5E7EB" : "none" }}>
//                   <span>Total</span>
//                   <span>${Number(data.order.totalAmount).toFixed(2)}</span>
//                 </div>
//               </div>

//               {mode === "incoming" && (
//                 <input
//                   type="text"
//                   value={note}
//                   onChange={(e) => setNote(e.target.value)}
//                   placeholder="Note for delivery (optional)"
//                   style={{ width: "100%", boxSizing: "border-box", border: "1px solid #E5E7EB", borderRadius: 10, padding: "9px 12px", fontSize: 13, fontFamily: "inherit", outline: "none", marginBottom: "0.875rem" }}
//                 />
//               )}
//             </div>

//             <div style={S.footer}>
//               {/* Print button always available */}
//               <button
//                 onClick={() => printInvoice(data.order, data.items)}
//                 style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", fontSize: 13, fontWeight: 600, borderRadius: 12, border: "1px solid #E5E7EB", background: "#F8FAFF", color: "#1D4ED8", cursor: "pointer" }}
//               >
//                 <Printer size={13} /> Print
//               </button>

//               {mode === "incoming" && (
//                 <>
//                   <button
//                     onClick={() => act(onCancel)}
//                     disabled={acting}
//                     style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, borderRadius: 12, border: "1px solid #FECACA", background: "#FEF2F2", color: "#B91C1C", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
//                   >
//                     <X size={13} /> Cancel
//                   </button>
//                   <button
//                     onClick={() => act(onConfirm)}
//                     disabled={acting}
//                     style={{ flex: 1, padding: "10px 14px", fontSize: 13, fontWeight: 600, borderRadius: 12, border: "none", background: "#166534", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
//                   >
//                     {acting ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <CheckCircle2 size={13} />}
//                     {acting ? "Confirming…" : "Confirm & pack"}
//                   </button>
//                 </>
//               )}

//               {mode === "delivery" && (
//                 <>
//                   <button onClick={onClose} style={{ flex: 1, padding: "10px 14px", fontSize: 13, fontWeight: 600, borderRadius: 12, border: "1px solid #E5E7EB", background: "#F3F4F6", color: "#374151", cursor: "pointer" }}>
//                     Close
//                   </button>
//                   <button
//                     onClick={() => act(onDeliver)}
//                     disabled={acting}
//                     style={{ flex: 2, padding: "10px 14px", fontSize: 13, fontWeight: 600, borderRadius: 12, border: "none", background: "#1D4ED8", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
//                   >
//                     {acting ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Truck size={13} />}
//                     {acting ? "Marking…" : "Mark as delivered"}
//                   </button>
//                 </>
//               )}

//               {mode === "print" && (
//                 <button onClick={onClose} style={{ flex: 1, padding: "10px 14px", fontSize: 13, fontWeight: 600, borderRadius: 12, border: "1px solid #E5E7EB", background: "#F3F4F6", color: "#374151", cursor: "pointer" }}>
//                   Close
//                 </button>
//               )}
//             </div>
//           </>
//         ) : (
//           <div style={{ padding: "2rem", textAlign: "center", color: "#9CA3AF", fontSize: 14 }}>Order not found.</div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── Time ago ─────────────────────────────────────────────────────────────────
// function timeAgo(dateStr) {
//   const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
//   if (diff < 60) return `${diff}s ago`;
//   if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
//   return `${Math.floor(diff / 3600)}h ago`;
// }

// // ─── Order card ───────────────────────────────────────────────────────────────
// function OrderCard({ order, mode, onConfirm, onDeliver, onCancel, onViewDetails, onPrint }) {
//   const [acting, setActing] = useState(null);
//   const act = async (type, fn) => { setActing(type); await fn(); setActing(null); };
//   const isIncoming = mode === "incoming";
//   const accentColor = isIncoming ? "#D97706" : "#2563EB";

//   const cardStyle = {
//     borderRadius: 14,
//     overflow: "hidden",
//     background: "#fff",
//     boxShadow: "0 1px 4px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.06)",
//     transition: "box-shadow .15s",
//   };

//   const bodyStyle = {
//     padding: "0.875rem 1rem 0.75rem",
//     cursor: "pointer",
//   };

//   return (
//     <div style={cardStyle}
//       onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,.13), 0 0 0 1px rgba(0,0,0,.08)"}
//       onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.06)"}
//     >
//       {/* Clickable body */}
//       <div style={bodyStyle} onClick={onViewDetails}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 7 }}>
//           <div>
//             <p style={{ margin: "0 0 3px", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", color: accentColor }}># {order.id}</p>
//             <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111" }}>{order.name}</p>
//           </div>
//           <div style={{ textAlign: "right" }}>
//             <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111" }}>${Number(order.totalAmount).toFixed(2)}</p>
//             <p style={{ margin: "2px 0 0", fontSize: 11, color: "#9CA3AF" }}>{timeAgo(order.createdAt)}</p>
//           </div>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3, fontSize: 12, color: "#6B7280" }}>
//           <Phone size={11} /> {order.phone}
//         </div>
//         <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 3, fontSize: 12, color: "#6B7280" }}>
//           <MapPin size={11} style={{ flexShrink: 0, marginTop: 1 }} />
//           <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{order.address}</span>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6B7280" }}>
//           <ShoppingBag size={11} />
//           {order.itemCount} item{order.itemCount !== 1 ? "s" : ""} · {order.paymentMethod}
//         </div>
//       </div>

//       {/* ── Incoming: two rows of buttons ── */}
//       {isIncoming ? (
//         <div style={{ borderTop: "1px solid #F0F0F0" }}>
//           {/* Row 1: Cancel | Print Invoice */}
//           <div style={{ display: "flex", borderBottom: "1px solid #F0F0F0" }}>
//             <button
//               onClick={() => act("cancel", onCancel)}
//               disabled={!!acting}
//               style={{
//                 flex: 1, padding: "9px 8px", fontSize: 13, fontWeight: 600,
//                 border: "none", borderRight: "1px solid #F0F0F0",
//                 cursor: "pointer", fontFamily: "inherit",
//                 display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
//                 background: "#FEF2F2", color: "#B91C1C",
//                 opacity: acting ? 0.6 : 1,
//               }}
//             >
//               <X size={13} /> Cancel
//             </button>
//             <button
//               onClick={onPrint}
//               disabled={!!acting}
//               style={{
//                 flex: 1, padding: "9px 8px", fontSize: 13, fontWeight: 600,
//                 border: "none", cursor: "pointer", fontFamily: "inherit",
//                 display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
//                 background: "#F0F7FF", color: "#1D4ED8",
//                 opacity: acting ? 0.6 : 1,
//               }}
//             >
//               <Printer size={13} /> Print invoice
//             </button>
//           </div>
//           {/* Row 2: Full-width Confirm */}
//           <button
//             onClick={() => act("confirm", onConfirm)}
//             disabled={!!acting}
//             style={{
//               width: "100%", padding: "11px 8px", fontSize: 14, fontWeight: 700,
//               border: "none", cursor: "pointer", fontFamily: "inherit",
//               display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
//               background: "#F0FDF4", color: "#166534",
//               opacity: acting ? 0.6 : 1,
//             }}
//           >
//             {acting === "confirm"
//               ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} />
//               : <CheckCircle2 size={14} />}
//             {acting === "confirm" ? "Confirming…" : "Confirm & pack"}
//           </button>
//         </div>
//       ) : (
//         /* ── Delivery: Print | Mark delivered ── */
//         <div style={{ display: "flex", borderTop: "1px solid #F0F0F0" }}>
//           <button
//             onClick={onPrint}
//             style={{
//               flex: 1, padding: "10px 8px", fontSize: 13, fontWeight: 600,
//               border: "none", borderRight: "1px solid #F0F0F0",
//               cursor: "pointer", fontFamily: "inherit",
//               display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
//               background: "#F0F7FF", color: "#1D4ED8",
//             }}
//           >
//             <Printer size={13} /> Print invoice
//           </button>
//           <button
//             onClick={() => act("deliver", onDeliver)}
//             disabled={!!acting}
//             style={{
//               flex: 2, padding: "10px 8px", fontSize: 13, fontWeight: 700,
//               border: "none", cursor: "pointer", fontFamily: "inherit",
//               display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
//               background: "#EFF6FF", color: "#1D4ED8",
//               opacity: acting ? 0.6 : 1,
//             }}
//           >
//             {acting === "deliver"
//               ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} />
//               : <Truck size={13} />}
//             {acting === "deliver" ? "Marking…" : "Mark as delivered"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Column header ────────────────────────────────────────────────────────────
// function ColHeader({ dotColor, dotBg, title, subtitle, count, countStyle }) {
//   return (
//     <div style={{
//       padding: "1rem 1.25rem", borderBottom: "1px solid #F0F0F0",
//       display: "flex", alignItems: "center", gap: 10,
//     }}>
//       <div style={{ width: 9, height: 9, borderRadius: "50%", background: dotColor, flexShrink: 0 }} />
//       <div style={{ flex: 1 }}>
//         <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#111" }}>{title}</p>
//         <p style={{ margin: 0, fontSize: 11, color: "#9CA3AF" }}>{subtitle}</p>
//       </div>
//       {count > 0 && (
//         <span style={{ fontSize: 12, fontWeight: 600, borderRadius: 20, padding: "2px 10px", ...countStyle }}>
//           {count}
//         </span>
//       )}
//     </div>
//   );
// }

// // ─── Empty state ──────────────────────────────────────────────────────────────
// function EmptyState({ icon: Icon, title, sub }) {
//   return (
//     <div style={{ padding: "3rem 1rem", textAlign: "center" }}>
//       <Icon size={28} style={{ opacity: 0.2, display: "block", margin: "0 auto 0.75rem", color: "#6B7280" }} />
//       <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#374151" }}>{title}</p>
//       <p style={{ margin: "4px 0 0", fontSize: 13, color: "#9CA3AF" }}>{sub}</p>
//     </div>
//   );
// }

// // ─── Main ─────────────────────────────────────────────────────────────────────
// export default function WebOrders() {
//   const [incoming, setIncoming] = useState([]);
//   const [delivery, setDelivery] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [modal, setModal] = useState(null); // { id, mode }
//   const prevCount = useRef(0);

//   const fetchAll = useCallback(async (silent = false) => {
//     if (!silent) setLoading(true); else setRefreshing(true);
//     try {
//       const [inc, del] = await Promise.all([
//         fetch(`${API}/incoming`).then((r) => r.json()),
//         fetch(`${API}/delivery`).then((r) => r.json()),
//       ]);
//       const arr = Array.isArray(inc) ? inc : [];
//       setIncoming(arr);
//       setDelivery(Array.isArray(del) ? del : []);
//       if (silent && arr.length > prevCount.current) {
//         document.title = `(${arr.length}) New order — Web orders`;
//         setTimeout(() => { document.title = "Web orders"; }, 4000);
//       }
//       prevCount.current = arr.length;
//     } catch (e) { console.error(e); }
//     finally { setLoading(false); setRefreshing(false); }
//   }, []);

//   useEffect(() => {
//     fetchAll();
//     const t = setInterval(() => fetchAll(true), 20_000);
//     return () => clearInterval(t);
//   }, [fetchAll]);

//   const patch = (id, endpoint) =>
//     fetch(`${API}/${id}/${endpoint}`, { method: "PATCH", headers: { "Content-Type": "application/json" } });

//   const handleConfirm = async (id, note) => {
//     await fetch(`${API}/${id}/confirm`, {
//       method: "PATCH", headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ adminNote: note || null }),
//     });
//     setModal(null); fetchAll(true);
//   };

//   const handleDeliver = async (id) => {
//     await patch(id, "deliver");
//     setModal(null); fetchAll(true);
//   };

//   const handleCancel = async (id) => {
//     if (!window.confirm("Cancel this order and restore stock?")) return;
//     await patch(id, "cancel");
//     setModal(null); fetchAll(true);
//   };

//   // Opens print modal to load items, then auto-triggers print
//   const handlePrint = (id) => setModal({ id, mode: "print" });

//   const colStyle = {
//     background: "#fff",
//     borderRadius: 18,
//     boxShadow: "0 2px 10px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.05)",
//     overflow: "hidden",
//   };

//   return (
//     <div style={{ minHeight: "100vh", background: "#F4F6FA", padding: "1.5rem" }}>
//       <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

//       {/* Header */}
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
//         <div>
//           <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#111" }}>Web orders</h1>
//           <p style={{ margin: "4px 0 0", fontSize: 13, color: "#9CA3AF" }}>
//             Auto-refreshes every 20s · works on multiple devices simultaneously
//           </p>
//         </div>
//         <button
//           onClick={() => fetchAll(true)}
//           disabled={refreshing}
//           style={{
//             display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600,
//             background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12,
//             padding: "8px 16px", cursor: "pointer", color: "#374151",
//             boxShadow: "0 1px 3px rgba(0,0,0,.06)",
//           }}
//         >
//           <RefreshCw size={13} style={{ animation: refreshing ? "spin 1s linear infinite" : "none" }} />
//           Refresh
//         </button>
//       </div>

//       {loading ? (
//         <div style={{ textAlign: "center", padding: "5rem", color: "#9CA3AF", fontSize: 14 }}>Loading…</div>
//       ) : (
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", alignItems: "start" }}>

//           {/* Block 1 */}
//           <div style={colStyle}>
//             <ColHeader
//               dotColor="#F59E0B"
//               title="New orders"
//               subtitle="Confirm when items are packed"
//               count={incoming.length}
//               countStyle={{ background: "#FEF3C7", color: "#92400E" }}
//             />
//             <div style={{ padding: incoming.length ? "0.875rem" : 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
//               {incoming.length === 0 ? (
//                 <EmptyState icon={ShoppingBag} title="No new orders" sub="New web orders appear here instantly" />
//               ) : (
//                 incoming.map((o) => (
//                   <OrderCard
//                     key={o.id}
//                     order={o}
//                     mode="incoming"
//                     onConfirm={() => handleConfirm(o.id, "")}
//                     onCancel={() => handleCancel(o.id)}
//                     onViewDetails={() => setModal({ id: o.id, mode: "incoming" })}
//                     onPrint={() => handlePrint(o.id)}
//                   />
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Block 2 */}
//           <div style={colStyle}>
//             <ColHeader
//               dotColor="#3B82F6"
//               title="Out for delivery"
//               subtitle="Clears after 24h · mark when delivered"
//               count={delivery.length}
//               countStyle={{ background: "#EFF6FF", color: "#1D4ED8" }}
//             />
//             <div style={{ padding: delivery.length ? "0.875rem" : 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
//               {delivery.length === 0 ? (
//                 <EmptyState icon={Truck} title="Nothing out for delivery" sub="Confirmed orders appear here" />
//               ) : (
//                 delivery.map((o) => (
//                   <OrderCard
//                     key={o.id}
//                     order={o}
//                     mode="delivery"
//                     onDeliver={() => handleDeliver(o.id)}
//                     onViewDetails={() => setModal({ id: o.id, mode: "delivery" })}
//                     onPrint={() => handlePrint(o.id)}
//                   />
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {modal && (
//         <OrderModal
//           orderId={modal.id}
//           mode={modal.mode}
//           onClose={() => setModal(null)}
//           onConfirm={(note) => handleConfirm(modal.id, note)}
//           onDeliver={() => handleDeliver(modal.id)}
//           onCancel={() => handleCancel(modal.id)}
//         />
//       )}
//     </div>
//   );
// }


import { useEffect, useState, useCallback, useRef } from "react";
import {
  Truck, X, Phone, MapPin, RefreshCw,
  CheckCircle2, ShoppingBag, Loader2, Printer, Bell,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";
const API = `${API_BASE}/api/web-orders`;
const POLL_INTERVAL = 10_000; // 10 seconds

// ─── Notification sound (soft bell via Web Audio API) ────────────────────────
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
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  } catch (_) {}
}

// ─── Print invoice helper ─────────────────────────────────────────────────────
function printInvoice(order, items) {
  const win = window.open("", "_blank", "width=400,height=600");
  const itemRows = items
    .map(
      (i) => `<tr>
        <td style="padding:6px 0;border-bottom:1px solid #f0f0f0">${i.productName}</td>
        <td style="padding:6px 0;border-bottom:1px solid #f0f0f0;text-align:center">${i.quantity}</td>
        <td style="padding:6px 0;border-bottom:1px solid #f0f0f0;text-align:right">$${Number(i.price).toFixed(2)}</td>
        <td style="padding:6px 0;border-bottom:1px solid #f0f0f0;text-align:right">$${Number(i.subtotal).toFixed(2)}</td>
      </tr>`
    )
    .join("");

  win.document.write(`
    <!DOCTYPE html><html><head><title>Invoice #${order.orderID}</title>
    <style>
      body{font-family:sans-serif;padding:24px;color:#111;font-size:14px}
      h2{margin:0 0 4px;font-size:18px} p{margin:0;color:#555;font-size:12px}
      table{width:100%;border-collapse:collapse;margin:16px 0}
      th{text-align:left;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:.05em;padding-bottom:6px;border-bottom:2px solid #eee}
      .total{display:flex;justify-content:space-between;font-size:16px;font-weight:700;padding-top:12px;border-top:2px solid #111}
    </style></head><body>
    <h2>Invoice #${order.orderID}</h2>
    <p>${new Date(order.createdAt).toLocaleString()}</p>
    <br>
    <div style="background:#f9f9f9;border-radius:8px;padding:12px;margin-bottom:4px">
      <strong>${order.customerName}</strong><br>
      <span style="font-size:12px;color:#555">${order.phone}</span><br>
      <span style="font-size:12px;color:#555">${order.address}</span>
    </div>
    <table>
      <thead><tr><th>Item</th><th style="text-align:center">Qty</th><th style="text-align:right">Price</th><th style="text-align:right">Sub</th></tr></thead>
      <tbody>${itemRows}</tbody>
    </table>
    ${Number(order.discountAmount) > 0 ? `<div style="display:flex;justify-content:space-between;color:#888;font-size:13px;margin-bottom:4px"><span>Subtotal</span><span>$${Number(order.subtotalAmount).toFixed(2)}</span></div><div style="display:flex;justify-content:space-between;color:#dc2626;font-size:13px;margin-bottom:8px"><span>Discount</span><span>-$${Number(order.discountAmount).toFixed(2)}</span></div>` : ""}
    <div class="total"><span>Total</span><span>$${Number(order.totalAmount).toFixed(2)}</span></div>
    <p style="margin-top:24px;text-align:center;color:#bbb;font-size:11px">Payment: ${order.paymentMethod}</p>
    <script>window.onload=()=>{window.print();window.close();}<\/script>
    </body></html>
  `);
  win.document.close();
}

// ─── Toast notification for new orders ───────────────────────────────────────
function NewOrderToast({ count, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 200,
      background: "#166534", color: "#fff",
      borderRadius: 14, padding: "12px 18px",
      display: "flex", alignItems: "center", gap: 10,
      boxShadow: "0 8px 24px rgba(0,0,0,.18)",
      fontSize: 14, fontWeight: 600,
      animation: "slideUp .25s ease",
    }}>
      <Bell size={15} />
      {count === 1 ? "1 new order arrived!" : `${count} new orders arrived!`}
      <button
        onClick={onDismiss}
        style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", opacity: 0.7, marginLeft: 4, padding: 0 }}
      >
        <X size={13} />
      </button>
    </div>
  );
}

// ─── Order detail / print modal ───────────────────────────────────────────────
function OrderModal({ orderId, mode, onClose, onConfirm, onDeliver, onCancel }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState("");
  const [acting, setActing] = useState(false);

  useEffect(() => {
    fetch(`${API}/${orderId}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [orderId]);

  const act = async (fn) => { setActing(true); await fn(note); setActing(false); };

  const S = {
    overlay: {
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
    },
    box: {
      background: "#fff", borderRadius: 20,
      width: "100%", maxWidth: 440, maxHeight: "90vh", overflowY: "auto",
      boxShadow: "0 24px 64px rgba(0,0,0,.22)",
    },
    hdr: {
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1.125rem 1.25rem", borderBottom: "1px solid #F0F0F0",
      position: "sticky", top: 0, background: "#fff",
      borderRadius: "20px 20px 0 0",
    },
    body: { padding: "1.25rem" },
    infoBox: {
      background: "#F9FAFB", borderRadius: 12,
      padding: "0.875rem 1rem", marginBottom: "1rem",
      border: "1px solid #F0F0F0",
    },
    label: {
      fontSize: 10, fontWeight: 700, color: "#9CA3AF",
      textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8,
    },
    totalBox: {
      background: "#F9FAFB", borderRadius: 12,
      padding: "0.875rem 1rem", margin: "0.875rem 0",
      border: "1px solid #F0F0F0",
    },
    footer: { padding: "0.875rem 1.25rem 1.25rem", display: "flex", gap: 8 },
  };

  const closeX = {
    width: 30, height: 30, borderRadius: "50%",
    border: "1px solid #E5E7EB", background: "#F9FAFB",
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    color: "#6B7280", fontSize: 14,
  };

  return (
    <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={S.box}>
        <div style={S.hdr}>
          <div>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111" }}>Order #{orderId}</p>
            {data && (
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "#9CA3AF" }}>
                {mode === "print" ? "Print invoice" : "Order details"} · {new Date(data.order.createdAt).toLocaleString()}
              </p>
            )}
          </div>
          <button style={closeX} onClick={onClose} aria-label="Close"><X size={14} /></button>
        </div>

        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#9CA3AF", fontSize: 14 }}>Loading…</div>
        ) : data ? (
          <>
            <div style={S.body}>
              <div style={S.infoBox}>
                <p style={S.label}>Customer</p>
                <p style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 600, color: "#111" }}>{data.order.customerName}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5, fontSize: 13, color: "#6B7280" }}>
                  <Phone size={13} /> {data.order.phone}
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 13, color: "#6B7280" }}>
                  <MapPin size={13} style={{ flexShrink: 0, marginTop: 1 }} /> {data.order.address}
                </div>
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #F0F0F0", fontSize: 12, color: "#9CA3AF" }}>
                  Payment: <span style={{ fontWeight: 600, color: "#374151" }}>{data.order.paymentMethod}</span>
                </div>
              </div>

              <p style={S.label}>Items</p>
              <div style={{ marginBottom: "0.875rem" }}>
                {data.items.map((item) => (
                  <div key={item.itemID} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #F5F5F5" }}>
                    <div>
                      <p style={{ margin: 0, fontSize: 13, color: "#111" }}>{item.productName}</p>
                      <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6B7280" }}>
                        ${Number(item.price).toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#111" }}>${Number(item.subtotal).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div style={S.totalBox}>
                {Number(data.order.discountAmount) > 0 && (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#6B7280", marginBottom: 4 }}>
                      <span>Subtotal</span>
                      <span>${Number(data.order.subtotalAmount || data.order.totalAmount).toFixed(2)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#DC2626", marginBottom: 6 }}>
                      <span>Discount</span>
                      <span>−${Number(data.order.discountAmount).toFixed(2)}</span>
                    </div>
                  </>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 700, color: "#111", paddingTop: Number(data.order.discountAmount) > 0 ? 8 : 0, borderTop: Number(data.order.discountAmount) > 0 ? "1px solid #E5E7EB" : "none" }}>
                  <span>Total</span>
                  <span>${Number(data.order.totalAmount).toFixed(2)}</span>
                </div>
              </div>

              {mode === "incoming" && (
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Note for delivery (optional)"
                  style={{ width: "100%", boxSizing: "border-box", border: "1px solid #E5E7EB", borderRadius: 10, padding: "9px 12px", fontSize: 13, fontFamily: "inherit", outline: "none", marginBottom: "0.875rem" }}
                />
              )}
            </div>

            <div style={S.footer}>
              <button
                onClick={() => printInvoice(data.order, data.items)}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", fontSize: 13, fontWeight: 600, borderRadius: 12, border: "1px solid #E5E7EB", background: "#F8FAFF", color: "#1D4ED8", cursor: "pointer" }}
              >
                <Printer size={13} /> Print
              </button>

              {mode === "incoming" && (
                <>
                  <button
                    onClick={() => act(onCancel)}
                    disabled={acting}
                    style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, borderRadius: 12, border: "1px solid #FECACA", background: "#FEF2F2", color: "#B91C1C", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <X size={13} /> Cancel
                  </button>
                  <button
                    onClick={() => act(onConfirm)}
                    disabled={acting}
                    style={{ flex: 1, padding: "10px 14px", fontSize: 13, fontWeight: 600, borderRadius: 12, border: "none", background: "#166534", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                  >
                    {acting ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <CheckCircle2 size={13} />}
                    {acting ? "Confirming…" : "Confirm & pack"}
                  </button>
                </>
              )}

              {mode === "delivery" && (
                <>
                  <button onClick={onClose} style={{ flex: 1, padding: "10px 14px", fontSize: 13, fontWeight: 600, borderRadius: 12, border: "1px solid #E5E7EB", background: "#F3F4F6", color: "#374151", cursor: "pointer" }}>
                    Close
                  </button>
                  <button
                    onClick={() => act(onDeliver)}
                    disabled={acting}
                    style={{ flex: 2, padding: "10px 14px", fontSize: 13, fontWeight: 600, borderRadius: 12, border: "none", background: "#1D4ED8", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                  >
                    {acting ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Truck size={13} />}
                    {acting ? "Marking…" : "Mark as delivered"}
                  </button>
                </>
              )}

              {mode === "print" && (
                <button onClick={onClose} style={{ flex: 1, padding: "10px 14px", fontSize: 13, fontWeight: 600, borderRadius: 12, border: "1px solid #E5E7EB", background: "#F3F4F6", color: "#374151", cursor: "pointer" }}>
                  Close
                </button>
              )}
            </div>
          </>
        ) : (
          <div style={{ padding: "2rem", textAlign: "center", color: "#9CA3AF", fontSize: 14 }}>Order not found.</div>
        )}
      </div>
    </div>
  );
}

// ─── Time ago ─────────────────────────────────────────────────────────────────
function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

// ─── Order card ───────────────────────────────────────────────────────────────
function OrderCard({ order, mode, isNew, onConfirm, onDeliver, onCancel, onViewDetails, onPrint }) {
  const [acting, setActing] = useState(null);
  const act = async (type, fn) => { setActing(type); await fn(); setActing(null); };
  const isIncoming = mode === "incoming";
  const accentColor = isIncoming ? "#D97706" : "#2563EB";

  const cardStyle = {
    borderRadius: 14,
    overflow: "hidden",
    background: "#fff",
    boxShadow: isNew
      ? "0 0 0 2px #16a34a, 0 4px 14px rgba(22,163,74,.18)"
      : "0 1px 4px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.06)",
    transition: "box-shadow .4s",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => { if (!isNew) e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,.13), 0 0 0 1px rgba(0,0,0,.08)"; }}
      onMouseLeave={(e) => { if (!isNew) e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.06)"; }}
    >
      {/* New badge */}
      {isNew && (
        <div style={{ background: "#166534", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", letterSpacing: "0.06em", textAlign: "center" }}>
          NEW ORDER
        </div>
      )}

      {/* Clickable body */}
      <div style={{ padding: "0.875rem 1rem 0.75rem", cursor: "pointer" }} onClick={onViewDetails}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 7 }}>
          <div>
            <p style={{ margin: "0 0 3px", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", color: accentColor }}># {order.id}</p>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111" }}>{order.name}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#111" }}>${Number(order.totalAmount).toFixed(2)}</p>
            <p style={{ margin: "2px 0 0", fontSize: 11, color: "#9CA3AF" }}>{timeAgo(order.createdAt)}</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3, fontSize: 12, color: "#6B7280" }}>
          <Phone size={11} /> {order.phone}
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 3, fontSize: 12, color: "#6B7280" }}>
          <MapPin size={11} style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{order.address}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6B7280" }}>
          <ShoppingBag size={11} />
          {order.itemCount} item{order.itemCount !== 1 ? "s" : ""} · {order.paymentMethod}
        </div>
      </div>

      {/* Incoming buttons */}
      {isIncoming ? (
        <div style={{ borderTop: "1px solid #F0F0F0" }}>
          <div style={{ display: "flex", borderBottom: "1px solid #F0F0F0" }}>
            <button
              onClick={() => act("cancel", onCancel)}
              disabled={!!acting}
              style={{ flex: 1, padding: "9px 8px", fontSize: 13, fontWeight: 600, border: "none", borderRight: "1px solid #F0F0F0", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, background: "#FEF2F2", color: "#B91C1C", opacity: acting ? 0.6 : 1 }}
            >
              <X size={13} /> Cancel
            </button>
            <button
              onClick={onPrint}
              disabled={!!acting}
              style={{ flex: 1, padding: "9px 8px", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, background: "#F0F7FF", color: "#1D4ED8", opacity: acting ? 0.6 : 1 }}
            >
              <Printer size={13} /> Print invoice
            </button>
          </div>
          <button
            onClick={() => act("confirm", onConfirm)}
            disabled={!!acting}
            style={{ width: "100%", padding: "11px 8px", fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#F0FDF4", color: "#166534", opacity: acting ? 0.6 : 1 }}
          >
            {acting === "confirm" ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <CheckCircle2 size={14} />}
            {acting === "confirm" ? "Confirming…" : "Confirm & pack"}
          </button>
        </div>
      ) : (
        /* Delivery buttons */
        <div style={{ display: "flex", borderTop: "1px solid #F0F0F0" }}>
          <button
            onClick={onPrint}
            style={{ flex: 1, padding: "10px 8px", fontSize: 13, fontWeight: 600, border: "none", borderRight: "1px solid #F0F0F0", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, background: "#F0F7FF", color: "#1D4ED8" }}
          >
            <Printer size={13} /> Print invoice
          </button>
          <button
            onClick={() => act("deliver", onDeliver)}
            disabled={!!acting}
            style={{ flex: 2, padding: "10px 8px", fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, background: "#EFF6FF", color: "#1D4ED8", opacity: acting ? 0.6 : 1 }}
          >
            {acting === "deliver" ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Truck size={13} />}
            {acting === "deliver" ? "Marking…" : "Mark as delivered"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Column header ────────────────────────────────────────────────────────────
function ColHeader({ dotColor, title, subtitle, count, countStyle, lastSynced }) {
  return (
    <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #F0F0F0", display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 9, height: 9, borderRadius: "50%", background: dotColor, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#111" }}>{title}</p>
        <p style={{ margin: 0, fontSize: 11, color: "#9CA3AF" }}>
          {subtitle}
          {lastSynced && <span> · synced {timeAgo(lastSynced)}</span>}
        </p>
      </div>
      {count > 0 && (
        <span style={{ fontSize: 12, fontWeight: 600, borderRadius: 20, padding: "2px 10px", ...countStyle }}>
          {count}
        </span>
      )}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ icon: Icon, title, sub }) {
  return (
    <div style={{ padding: "3rem 1rem", textAlign: "center" }}>
      <Icon size={28} style={{ opacity: 0.2, display: "block", margin: "0 auto 0.75rem", color: "#6B7280" }} />
      <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#374151" }}>{title}</p>
      <p style={{ margin: "4px 0 0", fontSize: 13, color: "#9CA3AF" }}>{sub}</p>
    </div>
  );
}

// ─── Pulse dot (live indicator) ───────────────────────────────────────────────
function PulseDot({ color }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 10, height: 10 }}>
      <span style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: color, opacity: 0.4,
        animation: "pulse 1.8s ease-in-out infinite",
      }} />
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, position: "relative" }} />
    </span>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function WebOrders() {
  const [incoming, setIncoming] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null); // { count }
  const [lastSynced, setLastSynced] = useState(null);
  const [newOrderIds, setNewOrderIds] = useState(new Set());
  const knownIdsRef = useRef(null);

  const fetchAll = useCallback(async (silent = false) => {
    if (!silent) setLoading(true); else setRefreshing(true);
    try {
      const [inc, del] = await Promise.all([
        fetch(`${API}/incoming`).then((r) => r.json()),
        fetch(`${API}/delivery`).then((r) => r.json()),
      ]);
      const incArr = Array.isArray(inc) ? inc : [];
      const delArr = Array.isArray(del) ? del : [];

      // Detect genuinely new orders
      if (silent && knownIdsRef.current !== null) {
        const incomingIds = new Set(incArr.map((o) => o.id));
        const added = [...incomingIds].filter((id) => !knownIdsRef.current.has(id));
        if (added.length > 0) {
          playNotificationSound();
          setToast({ count: added.length });
          setNewOrderIds((prev) => new Set([...prev, ...added]));
          // Update browser tab title
          document.title = `(${added.length}) New order — Web orders`;
          setTimeout(() => { document.title = "Web orders"; }, 5000);
          // Clear "new" highlight after 8 seconds
          setTimeout(() => {
            setNewOrderIds((prev) => {
              const next = new Set(prev);
              added.forEach((id) => next.delete(id));
              return next;
            });
          }, 8000);
        }
      }

      knownIdsRef.current = new Set(incArr.map((o) => o.id));
      setIncoming(incArr);
      setDelivery(delArr);
      setLastSynced(new Date().toISOString());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAll(false);
    const t = setInterval(() => fetchAll(true), POLL_INTERVAL);
    return () => clearInterval(t);
  }, [fetchAll]);

  const patch = (id, endpoint) =>
    fetch(`${API}/${id}/${endpoint}`, { method: "PATCH", headers: { "Content-Type": "application/json" } });

  const handleConfirm = async (id, note) => {
    await fetch(`${API}/${id}/confirm`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminNote: note || null }),
    });
    setModal(null);
    fetchAll(true);
  };

  const handleDeliver = async (id) => {
    await patch(id, "deliver");
    setModal(null);
    fetchAll(true);
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this order and restore stock?")) return;
    await patch(id, "cancel");
    setModal(null);
    fetchAll(true);
  };

  const handlePrint = (id) => setModal({ id, mode: "print" });

  return (
    <div style={{ minHeight: "100vh", background: "#F4F6FA", padding: "1.5rem" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { transform: scale(1); opacity:.4; } 50% { transform: scale(2); opacity:0; } }
        @keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#111" }}>Web orders</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
            <PulseDot color={refreshing ? "#F59E0B" : "#16a34a"} />
            <p style={{ margin: 0, fontSize: 13, color: "#9CA3AF" }}>
              {refreshing ? "Syncing…" : `Live · checks every ${POLL_INTERVAL / 1000}s`}
            </p>
          </div>
        </div>
        <button
          onClick={() => fetchAll(true)}
          disabled={refreshing}
          style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "8px 16px", cursor: "pointer", color: "#374151", boxShadow: "0 1px 3px rgba(0,0,0,.06)" }}
        >
          <RefreshCw size={13} style={{ animation: refreshing ? "spin 1s linear infinite" : "none" }} />
          Refresh now
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "5rem", color: "#9CA3AF", fontSize: 14 }}>Loading…</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", alignItems: "start" }}>

          {/* New orders column */}
          <div style={{ background: "#fff", borderRadius: 18, boxShadow: "0 2px 10px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.05)", overflow: "hidden" }}>
            <ColHeader
              dotColor="#F59E0B"
              title="New orders"
              subtitle="Confirm when items are packed"
              count={incoming.length}
              countStyle={{ background: "#FEF3C7", color: "#92400E" }}
              lastSynced={lastSynced}
            />
            <div style={{ padding: incoming.length ? "0.875rem" : 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {incoming.length === 0 ? (
                <EmptyState icon={ShoppingBag} title="No new orders" sub="New web orders appear here automatically" />
              ) : (
                incoming.map((o) => (
                  <OrderCard
                    key={o.id}
                    order={o}
                    mode="incoming"
                    isNew={newOrderIds.has(o.id)}
                    onConfirm={() => handleConfirm(o.id, "")}
                    onCancel={() => handleCancel(o.id)}
                    onViewDetails={() => setModal({ id: o.id, mode: "incoming" })}
                    onPrint={() => handlePrint(o.id)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Delivery column */}
          <div style={{ background: "#fff", borderRadius: 18, boxShadow: "0 2px 10px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.05)", overflow: "hidden" }}>
            <ColHeader
              dotColor="#3B82F6"
              title="Out for delivery"
              subtitle="Clears after 24h · mark when delivered"
              count={delivery.length}
              countStyle={{ background: "#EFF6FF", color: "#1D4ED8" }}
              lastSynced={lastSynced}
            />
            <div style={{ padding: delivery.length ? "0.875rem" : 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {delivery.length === 0 ? (
                <EmptyState icon={Truck} title="Nothing out for delivery" sub="Confirmed orders appear here" />
              ) : (
                delivery.map((o) => (
                  <OrderCard
                    key={o.id}
                    order={o}
                    mode="delivery"
                    isNew={false}
                    onDeliver={() => handleDeliver(o.id)}
                    onViewDetails={() => setModal({ id: o.id, mode: "delivery" })}
                    onPrint={() => handlePrint(o.id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <OrderModal
          orderId={modal.id}
          mode={modal.mode}
          onClose={() => setModal(null)}
          onConfirm={(note) => handleConfirm(modal.id, note)}
          onDeliver={() => handleDeliver(modal.id)}
          onCancel={() => handleCancel(modal.id)}
        />
      )}

      {/* Toast */}
      {toast && (
        <NewOrderToast
          count={toast.count}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}
