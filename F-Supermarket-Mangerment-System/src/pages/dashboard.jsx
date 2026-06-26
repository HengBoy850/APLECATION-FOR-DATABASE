import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Package,
  Tags,
  Truck,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {

  const [data, setData] = useState({});
  const [chartData, setChartData] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => {
    axios.get("http://172.20.10.14:8081/api/dashboard/stats")
      .then(res => setData(res.data));

    axios.get("http://172.20.10.14:8081/api/dashboard/products-by-category")
    .then(res => setChartData(res.data))
    .catch(err => console.log(err));

    axios.get("http://172.20.10.14:8081/api/dashboard/low-stock")
      .then(res => setLowStock(res.data));

  }, []);

  const stats = [
    {
      title: "Products",
      value: data.products || 0,
      icon: <Package size={20} />,
    },
    {
      title: "Categories",
      value: data.categories || 0,
      icon: <Tags size={20} />,
    },
    {
      title: "Suppliers",
      value: data.suppliers || 0,
      icon: <Truck size={20} />,
    },
    {
      title: "Total Orders",
      value: data.orders || 0,
      icon: <ShoppingCart size={20} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="border-b border-[#E7E2D8] pb-5">
          <h1 className="text-3xl font-bold text-[#2B2A28] font-[Georgia,serif] tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-[#A39A8B] mt-1">
            Overview of store performance and inventory
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-sm border border-[#E7E2D8] hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#A39A8B] text-xs uppercase tracking-wide font-semibold">
                    {item.title}
                  </p>
                  <h2 className="text-2xl font-bold text-[#2B2A28] mt-2 font-[Georgia,serif]">
                    {item.value}
                  </h2>
                </div>

                <div className="p-3 rounded-xl bg-[#F3E7D6] text-[#8A5A2B]">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* LOWER SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* CHART */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-[#E7E2D8]">

            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-[#2B2A28] font-[Georgia,serif]">
                  Sales Performance
                </h3>
                <p className="text-xs text-[#A39A8B] mt-0.5">
                  Revenue trend over time
                </p>
              </div>
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
                  <XAxis
                    dataKey="label"
                    tick={{ fill: "#A39A8B", fontSize: 12 }}
                    axisLine={{ stroke: "#E7E2D8" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#A39A8B", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#2B2A28",
                      border: "none",
                      borderRadius: "8px",
                      color: "#F7F5F0",
                      fontSize: "12px",
                    }}
                    labelStyle={{ color: "#C7A77B" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#C7A77B"
                    strokeWidth={2.5}
                    fill="url(#salesFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

          </div>

          {/* LOW STOCK */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E7E2D8]">

            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-[#2B2A28] font-[Georgia,serif]">
                Low Stock Alerts
              </h3>

              <div className="p-2 rounded-full bg-[#F6E6E4]">
                <AlertTriangle className="text-[#A14A3F]" size={16} />
              </div>
            </div>

            <div className="space-y-3">

              {lowStock.length === 0 && (
                <p className="text-sm text-[#A39A8B] text-center py-6">
                  No low stock items.
                </p>
              )}

              {lowStock.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3.5 bg-[#FBF9F4] rounded-xl border border-[#EFEBE3]"
                >
                  <div>
                    <h4 className="font-semibold text-sm text-[#2B2A28]">{item.name}</h4>
                    <p className="text-xs text-[#A39A8B] mt-0.5">{item.category}</p>
                  </div>

                  <span className="text-xs font-semibold text-[#A14A3F] bg-[#F6E6E4] px-2.5 py-1 rounded-full">
                    {item.qty} left
                  </span>
                </div>
              ))}

            </div>

          </div>

        </div>

        {/* RANKING - bottom bar chart section, similar to reference image */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E7E2D8]">

          <h3 className="text-lg font-semibold text-[#2B2A28] font-[Georgia,serif] mb-6">
            Sales by Period
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid stroke="#EFEBE3" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fill: "#A39A8B", fontSize: 12 }}
                  axisLine={{ stroke: "#E7E2D8" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#A39A8B", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#2B2A28",
                    border: "none",
                    borderRadius: "8px",
                    color: "#F7F5F0",
                    fontSize: "12px",
                  }}
                  labelStyle={{ color: "#C7A77B" }}
                  cursor={{ fill: "#F3E7D6" }}
                />
                <Bar dataKey="total" fill="#C7A77B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>
    </div>
  );
}