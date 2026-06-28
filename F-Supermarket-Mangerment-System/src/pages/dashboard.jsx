// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Package,
//   Tags,
//   Truck,
//   ShoppingCart,
//   AlertTriangle,
// } from "lucide-react";
// import {
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// export default function Dashboard() {

//   const [data, setData] = useState({});
//   const [chartData, setChartData] = useState([]);
//   const [lowStock, setLowStock] = useState([]);

//   useEffect(() => {
//     axios.get("http://172.20.10.14:8081/api/dashboard/stats")
//       .then(res => setData(res.data));

//     axios.get("http://172.20.10.14:8081/api/dashboard/products-by-category")
//     .then(res => setChartData(res.data))
//     .catch(err => console.log(err));

//     axios.get("http://172.20.10.14:8081/api/dashboard/low-stock")
//       .then(res => setLowStock(res.data));

//   }, []);

//   const stats = [
//     {
//       title: "Products",
//       value: data.products || 0,
//       icon: <Package size={20} />,
//     },
//     {
//       title: "Categories",
//       value: data.categories || 0,
//       icon: <Tags size={20} />,
//     },
//     {
//       title: "Suppliers",
//       value: data.suppliers || 0,
//       icon: <Truck size={20} />,
//     },
//     {
//       title: "Total Orders",
//       value: data.orders || 0,
//       icon: <ShoppingCart size={20} />,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F7F5F0] p-6 md:p-10 font-sans">
//       <div className="max-w-7xl mx-auto space-y-8">

//         {/* HEADER */}
//         <div className="border-b border-[#E7E2D8] pb-5">
//           <h1 className="text-3xl font-bold text-[#2B2A28] font-[Georgia,serif] tracking-tight">
//             Dashboard
//           </h1>
//           <p className="text-sm text-[#A39A8B] mt-1">
//             Overview of store performance and inventory
//           </p>
//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

//           {stats.map((item, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-2xl p-5 shadow-sm border border-[#E7E2D8] hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-[#A39A8B] text-xs uppercase tracking-wide font-semibold">
//                     {item.title}
//                   </p>
//                   <h2 className="text-2xl font-bold text-[#2B2A28] mt-2 font-[Georgia,serif]">
//                     {item.value}
//                   </h2>
//                 </div>

//                 <div className="p-3 rounded-xl bg-[#F3E7D6] text-[#8A5A2B]">
//                   {item.icon}
//                 </div>
//               </div>
//             </div>
//           ))}

//         </div>

//         {/* LOWER SECTION */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//           {/* CHART */}
//           <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-[#E7E2D8]">

//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-[#2B2A28] font-[Georgia,serif]">
//                   Sales Performance
//                 </h3>
//                 <p className="text-xs text-[#A39A8B] mt-0.5">
//                   Revenue trend over time
//                 </p>
//               </div>
//             </div>

//             <div className="h-72">
//               <ResponsiveContainer width="100%" height="100%">
//                 <AreaChart data={chartData}>
//                   <defs>
//                     <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="0%" stopColor="#C7A77B" stopOpacity={0.35} />
//                       <stop offset="100%" stopColor="#C7A77B" stopOpacity={0} />
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid stroke="#EFEBE3" vertical={false} />
//                   <XAxis
//                     dataKey="label"
//                     tick={{ fill: "#A39A8B", fontSize: 12 }}
//                     axisLine={{ stroke: "#E7E2D8" }}
//                     tickLine={false}
//                   />
//                   <YAxis
//                     tick={{ fill: "#A39A8B", fontSize: 12 }}
//                     axisLine={false}
//                     tickLine={false}
//                   />
//                   <Tooltip
//                     contentStyle={{
//                       background: "#2B2A28",
//                       border: "none",
//                       borderRadius: "8px",
//                       color: "#F7F5F0",
//                       fontSize: "12px",
//                     }}
//                     labelStyle={{ color: "#C7A77B" }}
//                   />
//                   <Area
//                     type="monotone"
//                     dataKey="total"
//                     stroke="#C7A77B"
//                     strokeWidth={2.5}
//                     fill="url(#salesFill)"
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>

//           </div>

//           {/* LOW STOCK */}
//           <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E7E2D8]">

//             <div className="flex items-center justify-between mb-5">
//               <h3 className="text-lg font-semibold text-[#2B2A28] font-[Georgia,serif]">
//                 Low Stock Alerts
//               </h3>

//               <div className="p-2 rounded-full bg-[#F6E6E4]">
//                 <AlertTriangle className="text-[#A14A3F]" size={16} />
//               </div>
//             </div>

//             <div className="space-y-3">

//               {lowStock.length === 0 && (
//                 <p className="text-sm text-[#A39A8B] text-center py-6">
//                   No low stock items.
//                 </p>
//               )}

//               {lowStock.map((item, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center justify-between p-3.5 bg-[#FBF9F4] rounded-xl border border-[#EFEBE3]"
//                 >
//                   <div>
//                     <h4 className="font-semibold text-sm text-[#2B2A28]">{item.name}</h4>
//                     <p className="text-xs text-[#A39A8B] mt-0.5">{item.category}</p>
//                   </div>

//                   <span className="text-xs font-semibold text-[#A14A3F] bg-[#F6E6E4] px-2.5 py-1 rounded-full">
//                     {item.qty} left
//                   </span>
//                 </div>
//               ))}

//             </div>

//           </div>

//         </div>

//         {/* RANKING - bottom bar chart section, similar to reference image */}
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E7E2D8]">

//           <h3 className="text-lg font-semibold text-[#2B2A28] font-[Georgia,serif] mb-6">
//             Sales by Period
//           </h3>

//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={chartData}>
//                 <CartesianGrid stroke="#EFEBE3" vertical={false} />
//                 <XAxis
//                   dataKey="label"
//                   tick={{ fill: "#A39A8B", fontSize: 12 }}
//                   axisLine={{ stroke: "#E7E2D8" }}
//                   tickLine={false}
//                 />
//                 <YAxis
//                   tick={{ fill: "#A39A8B", fontSize: 12 }}
//                   axisLine={false}
//                   tickLine={false}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     background: "#2B2A28",
//                     border: "none",
//                     borderRadius: "8px",
//                     color: "#F7F5F0",
//                     fontSize: "12px",
//                   }}
//                   labelStyle={{ color: "#C7A77B" }}
//                   cursor={{ fill: "#F3E7D6" }}
//                 />
//                 <Bar dataKey="total" fill="#C7A77B" radius={[6, 6, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import {
  Package, Tags, Truck, ShoppingCart,
  AlertTriangle, Globe, RefreshCw, Bell,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

const BASE = "http://172.20.10.14:8081";
const POLL_INTERVAL = 15_000; // 15 seconds

// ─── Pulse dot ────────────────────────────────────────────────────────────────
function PulseDot({ color = "#22c55e" }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 9, height: 9 }}>
      <span style={{
        position: "absolute", inset: 0, borderRadius: "50%",
        background: color, opacity: 0.4,
        animation: "pulse 1.8s ease-in-out infinite",
      }} />
      <span style={{ width: 9, height: 9, borderRadius: "50%", background: color, position: "relative" }} />
    </span>
  );
}

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function Dashboard() {
  const [data, setData]             = useState({});
  const [chartData, setChartData]   = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [lowStock, setLowStock]     = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [syncing, setSyncing]       = useState(false);
  const [lastSynced, setLastSynced] = useState(null);
  const prevPending                 = useRef(null);
  const [newPendingAlert, setNewPendingAlert] = useState(false);

  const fetchAll = useCallback((silent = false) => {
    if (!silent) setSyncing(true);

    Promise.allSettled([
      axios.get(`${BASE}/api/dashboard/stats`),
      axios.get(`${BASE}/api/dashboard/sales-chart`),
      axios.get(`${BASE}/api/dashboard/products-by-category`),
      axios.get(`${BASE}/api/dashboard/low-stock`),
      axios.get(`${BASE}/api/dashboard/recent-orders`),
    ]).then(([stats, chart, cat, stock, recent]) => {
      if (stats.status  === "fulfilled") {
        const incoming = stats.value.data;
        // Alert if new pending web orders arrived
        if (silent && prevPending.current !== null && incoming.pendingWebOrders > prevPending.current) {
          setNewPendingAlert(true);
          setTimeout(() => setNewPendingAlert(false), 6000);
        }
        prevPending.current = incoming.pendingWebOrders;
        setData(incoming);
      }
      if (chart.status  === "fulfilled") setChartData(Array.isArray(chart.value.data)   ? chart.value.data   : []);
      if (cat.status    === "fulfilled") setCategoryData(Array.isArray(cat.value.data)   ? cat.value.data     : []);
      if (stock.status  === "fulfilled") setLowStock(Array.isArray(stock.value.data)     ? stock.value.data   : []);
      if (recent.status === "fulfilled") setRecentOrders(Array.isArray(recent.value.data)? recent.value.data  : []);
      setLastSynced(new Date());
      setSyncing(false);
    });
  }, []);

  useEffect(() => {
    fetchAll(false);
    const t = setInterval(() => fetchAll(true), POLL_INTERVAL);
    return () => clearInterval(t);
  }, [fetchAll]);

  const timeAgoSynced = (d) => {
    if (!d) return "";
    const diff = Math.floor((Date.now() - d) / 1000);
    if (diff < 10) return "just now";
    if (diff < 60) return `${diff}s ago`;
    return `${Math.floor(diff / 60)}m ago`;
  };

  const stats = [
    { title: "Products",      value: data.products || 0,          icon: <Package size={20} /> },
    { title: "Categories",    value: data.categories || 0,        icon: <Tags size={20} /> },
    { title: "Suppliers",     value: data.suppliers || 0,         icon: <Truck size={20} /> },
    { title: "Total Orders",  value: data.orders || 0,            icon: <ShoppingCart size={20} /> },
    {
      title: "Today's Revenue",
      value: `$${Number(data.todayRevenue || 0).toFixed(2)}`,
      icon: <ShoppingCart size={20} />,
      highlight: true,
    },
    {
      title: "Pending Web Orders",
      value: data.pendingWebOrders || 0,
      icon: <Globe size={20} />,
      alert: (data.pendingWebOrders || 0) > 0,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] p-6 md:p-10 font-sans">
      <style>{`
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:.4} 50%{transform:scale(2.2);opacity:0} }
        @keyframes slideUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="border-b border-[#E7E2D8] pb-5 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2B2A28] font-[Georgia,serif] tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-[#A39A8B] mt-1">
              Overview of store performance and inventory · POS + web orders combined
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Live indicator */}
            <div className="flex items-center gap-2">
              <PulseDot color={syncing ? "#F59E0B" : "#22c55e"} />
              <span className="text-xs text-[#A39A8B]">
                {syncing ? "Syncing…" : lastSynced ? `Updated ${timeAgoSynced(lastSynced)}` : "Live"}
              </span>
            </div>
            <button
              onClick={() => fetchAll(true)}
              disabled={syncing}
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border border-[#E7E2D8] bg-white hover:bg-[#F3EDE3] transition-colors text-[#2B2A28]"
            >
              <RefreshCw size={13} style={{ animation: syncing ? "spin 1s linear infinite" : "none" }} />
              Refresh
            </button>
          </div>
        </div>

        {/* NEW PENDING WEB ORDER ALERT */}
        {newPendingAlert && (
          <div
            className="flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold"
            style={{ background: "#FEF3C7", border: "1px solid #FDE68A", color: "#92400E", animation: "slideUp .25s ease" }}
          >
            <Bell size={16} />
            New web order received! Check the Web Orders page.
            <button onClick={() => setNewPendingAlert(false)} className="ml-auto opacity-60 hover:opacity-100 text-lg leading-none">×</button>
          </div>
        )}

        {/* STATS — 6 cards in 2 rows */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-sm border transition-shadow hover:shadow-md"
              style={{
                borderColor: item.alert ? "#FCA5A5" : item.highlight ? "#C7A77B" : "#E7E2D8",
                background: item.alert ? "#FFF5F5" : "#FFFFFF",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#A39A8B] text-xs uppercase tracking-wide font-semibold leading-tight">
                    {item.title}
                  </p>
                  <h2
                    className="text-2xl font-bold mt-2 font-[Georgia,serif]"
                    style={{ color: item.alert ? "#B91C1C" : "#2B2A28" }}
                  >
                    {item.value}
                    {item.alert && item.value > 0 && (
                      <span className="ml-1.5 inline-block w-2 h-2 rounded-full bg-red-500 align-middle" />
                    )}
                  </h2>
                </div>
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: item.alert ? "#FEE2E2" : "#F3E7D6",
                    color: item.alert ? "#B91C1C" : "#8A5A2B",
                  }}
                >
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CHARTS + LOW STOCK */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Area chart — daily revenue */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-[#E7E2D8]">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#2B2A28] font-[Georgia,serif]">Sales Performance</h3>
              <p className="text-xs text-[#A39A8B] mt-0.5">Daily revenue — POS + web orders combined (last 30 days)</p>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C7A77B" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#C7A77B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#EFEBE3" vertical={false} />
                  <XAxis dataKey="label" tick={{ fill: "#A39A8B", fontSize: 11 }} axisLine={{ stroke: "#E7E2D8" }} tickLine={false} />
                  <YAxis tick={{ fill: "#A39A8B", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#2B2A28", border: "none", borderRadius: "8px", color: "#F7F5F0", fontSize: "12px" }}
                    labelStyle={{ color: "#C7A77B" }}
                    formatter={(v) => [`$${Number(v).toFixed(2)}`, "Revenue"]}
                  />
                  <Area type="monotone" dataKey="total" stroke="#C7A77B" strokeWidth={2.5} fill="url(#salesFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Low stock */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E7E2D8]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-[#2B2A28] font-[Georgia,serif]">Low Stock Alerts</h3>
              <div className="p-2 rounded-full bg-[#F6E6E4]">
                <AlertTriangle className="text-[#A14A3F]" size={16} />
              </div>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {lowStock.length === 0 ? (
                <p className="text-sm text-[#A39A8B] text-center py-6">No low stock items.</p>
              ) : (
                lowStock.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 bg-[#FBF9F4] rounded-xl border border-[#EFEBE3]">
                    <div>
                      <h4 className="font-semibold text-sm text-[#2B2A28]">{item.name}</h4>
                      <p className="text-xs text-[#A39A8B] mt-0.5">{item.category}</p>
                    </div>
                    <span className="text-xs font-semibold text-[#A14A3F] bg-[#F6E6E4] px-2.5 py-1 rounded-full whitespace-nowrap">
                      {item.qty} left
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* BAR CHART — products by category */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E7E2D8]">
          <h3 className="text-lg font-semibold text-[#2B2A28] font-[Georgia,serif] mb-6">Products by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid stroke="#EFEBE3" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "#A39A8B", fontSize: 12 }} axisLine={{ stroke: "#E7E2D8" }} tickLine={false} />
                <YAxis tick={{ fill: "#A39A8B", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#2B2A28", border: "none", borderRadius: "8px", color: "#F7F5F0", fontSize: "12px" }}
                  labelStyle={{ color: "#C7A77B" }}
                  cursor={{ fill: "#F3E7D6" }}
                />
                <Bar dataKey="total" fill="#C7A77B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RECENT ORDERS — POS + Web combined */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E7E2D8] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E7E2D8] flex items-center justify-between" style={{ background: "#2B2A28" }}>
            <h3 className="text-sm font-semibold text-white font-[Georgia,serif]">Recent Orders</h3>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>POS + Web · last 10</span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F7F5F0] text-left text-[#A39A8B]">
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide">ID</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide">Source</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide">Customer</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide text-right">Total</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide">Status</th>
                <th className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wide">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-[#A39A8B] text-sm">No recent orders.</td></tr>
              ) : (
                recentOrders.map((o, i) => (
                  <tr key={`${o.source}-${o.id}-${i}`} className="border-t border-[#F0EBE1]">
                    <td className="px-4 py-2.5 text-[#A39A8B] font-mono text-xs">#{o.id}</td>
                    <td className="px-4 py-2.5">
                      <span className="px-2 py-0.5 rounded text-xs font-semibold"
                        style={{
                          background: o.source === "WEB" ? "#E0E7FF" : "#F3F4F6",
                          color: o.source === "WEB" ? "#4338CA" : "#374151",
                        }}>
                        {o.source}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-[#2B2A28] font-medium">{o.customerName}</td>
                    <td className="px-4 py-2.5 text-right font-mono text-[#2B2A28]">${Number(o.totalAmount).toFixed(2)}</td>
                    <td className="px-4 py-2.5">
                      <span className="px-2 py-0.5 rounded text-xs font-semibold"
                        style={{
                          background: ["completed", "delivered"].includes(o.status) ? "#DCFCE7" : o.status === "pending" ? "#FEF3C7" : "#F3F4F6",
                          color: ["completed", "delivered"].includes(o.status) ? "#16A34A" : o.status === "pending" ? "#92400E" : "#374151",
                        }}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-[#A39A8B] text-xs">{timeAgo(o.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
