// import { useEffect, useState } from "react";
// import { api } from "../api/client";

// const STATUS_STYLES = {
//   pending: "bg-amber-100 text-amber-700",
//   paid: "bg-blue-100 text-blue-700",
//   processing: "bg-purple-100 text-purple-700",
//   delivered: "bg-market-sage text-market-green",
//   cancelled: "bg-red-100 text-red-700",
// };

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     api
//       .get("/api/web-orders/mine", { auth: true })
//       .then((data) => setOrders(Array.isArray(data) ? data : []))
//       .catch((err) => setError(err.message || "Could not load your orders."))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-6">
//       <h1 className="font-display font-bold text-2xl mb-5">My orders</h1>

//       {loading ? (
//         <p className="text-center text-market-ink/50 py-12">Loading your orders...</p>
//       ) : error ? (
//         <p className="text-center text-market-orangeDark py-12">{error}</p>
//       ) : orders.length === 0 ? (
//         <p className="text-center text-market-ink/50 py-12">
//           You haven't placed any orders yet.
//         </p>
//       ) : (
//         <div className="space-y-3">
//           {orders.map((o) => (
//             <div key={o.orderID} className="bg-white rounded-xl shadow-card p-4">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="font-semibold">Order #{o.orderID}</span>
//                 <span
//                   className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
//                     STATUS_STYLES[o.status] || "bg-market-sage text-market-ink"
//                   }`}
//                 >
//                   {o.status}
//                 </span>
//               </div>
//               <p className="text-sm text-market-ink/60">
//                 {new Date(o.createdAt).toLocaleDateString(undefined, {
//                   year: "numeric",
//                   month: "short",
//                   day: "numeric",
//                 })}
//               </p>
//               <div className="flex justify-between items-center mt-2">
//                 <span className="text-sm text-market-ink/60">{o.paymentMethod}</span>
//                 <span className="font-bold tabular-nums">
//                   ${Number(o.totalAmount).toFixed(2)}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { api } from "../api/client";

// const STATUS_CONFIG = {
//   pending:    { label: "Pending",    classes: "bg-yellow-light text-yellow-600" },
//   paid:       { label: "Paid",       classes: "bg-blue-50 text-blue-600" },
//   processing: { label: "Processing", classes: "bg-purple-50 text-purple-600" },
//   delivered:  { label: "Delivered",  classes: "bg-accent-light text-accent" },
//   cancelled:  { label: "Cancelled",  classes: "bg-red-50 text-red-500" },
// };

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     api
//       .get("/api/web-orders/mine", { auth: true })
//       .then((data) => setOrders(Array.isArray(data) ? data : []))
//       .catch((err) => setError(err.message || "Could not load your orders."))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-5 pb-28">
//       <h1 className="font-bold text-xl text-ink mb-4">My Orders</h1>

//       {loading ? (
//         <div className="space-y-3">
//           {[...Array(3)].map((_, i) => (
//             <div key={i} className="bg-white rounded-2xl shadow-card h-24 animate-pulse" />
//           ))}
//         </div>
//       ) : error ? (
//         <div className="text-center py-16">
//           <p className="text-4xl mb-3" aria-hidden>⚠️</p>
//           <p className="text-ink-muted text-sm">{error}</p>
//         </div>
//       ) : orders.length === 0 ? (
//         <div className="text-center py-20">
//           <p className="text-5xl mb-4" aria-hidden>📋</p>
//           <p className="font-semibold text-ink mb-2">No orders yet</p>
//           <p className="text-sm text-ink-muted">Your order history will appear here.</p>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {orders.map((o) => {
//             const cfg = STATUS_CONFIG[o.status] || { label: o.status, classes: "bg-white text-ink-muted" };
//             return (
//               <div key={o.orderID} className="bg-white rounded-2xl shadow-card p-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="font-semibold text-sm text-ink">Order #{o.orderID}</span>
//                   <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${cfg.classes}`}>
//                     {cfg.label}
//                   </span>
//                 </div>
//                 <p className="text-xs text-ink-muted mb-2">
//                   {new Date(o.createdAt).toLocaleDateString(undefined, {
//                     year: "numeric", month: "short", day: "numeric",
//                   })}
//                 </p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-xs text-ink-muted bg-white px-2.5 py-1 rounded-full">
//                     {o.paymentMethod}
//                   </span>
//                   <span className="font-bold text-base text-ink tabular-nums">
//                     ${Number(o.totalAmount).toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { api } from "../api/client";
import { Package, Clock, CheckCircle2, XCircle, Truck, CreditCard } from "lucide-react";

const STATUS_CONFIG = {
  pending:    { label: "Pending",    icon: Clock,         bg: "bg-yellow-light",  text: "text-yellow-600",  border: "border-yellow/30" },
  paid:       { label: "Paid",       icon: CreditCard,    bg: "bg-blue-50",       text: "text-blue-600",    border: "border-blue-100" },
  processing: { label: "Processing", icon: Package,       bg: "bg-purple-50",     text: "text-purple-600",  border: "border-purple-100" },
  delivered:  { label: "Delivered",  icon: CheckCircle2,  bg: "bg-brand-light",   text: "text-brand",       border: "border-brand/20" },
  cancelled:  { label: "Cancelled",  icon: XCircle,       bg: "bg-red-50",        text: "text-danger",      border: "border-red-100" },
};

export default function Orders() {
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");

  useEffect(() => {
    api.get("/api/web-orders/mine", { auth: true })
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Could not load your orders."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-5 pb-28 animate-fade-in">
      <h1 className="font-display font-extrabold text-xl text-ink mb-5">My Orders</h1>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-3xl h-24 skeleton" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3" aria-hidden>⚠️</p>
          <p className="text-ink-muted text-sm">{error}</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-brand-light mx-auto flex items-center justify-center mb-4">
            <Package size={32} className="text-brand" />
          </div>
          <p className="font-display font-bold text-ink mb-2">No orders yet</p>
          <p className="text-sm text-ink-muted">Your order history will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => {
            const cfg = STATUS_CONFIG[o.status] || { label: o.status, icon: Package, bg: "bg-canvas", text: "text-ink-muted", border: "border-line" };
            const Icon = cfg.icon;
            return (
              <div key={o.orderID} className="bg-white rounded-3xl border border-line/60 shadow-card p-4 animate-slide-up">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-display font-bold text-sm text-ink">Order #{o.orderID}</span>
                    <p className="text-xs text-ink-faint mt-0.5">
                      {new Date(o.createdAt).toLocaleDateString(undefined, {
                        year: "numeric", month: "short", day: "numeric",
                      })}
                    </p>
                  </div>
                  <span className={`pill-badge ${cfg.bg} ${cfg.text} border ${cfg.border} flex items-center gap-1.5`}>
                    <Icon size={11} strokeWidth={2.5} />
                    {cfg.label}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-line/40">
                  <span className="text-xs font-semibold text-ink-muted bg-canvas px-3 py-1.5 rounded-full border border-line/60">
                    {o.paymentMethod}
                  </span>
                  <span className="font-display font-extrabold text-base text-brand tabular-nums">
                    ${Number(o.totalAmount).toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
