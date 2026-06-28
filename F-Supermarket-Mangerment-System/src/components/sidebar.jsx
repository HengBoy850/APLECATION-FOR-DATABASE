// import { Link, useLocation, useNavigate } from "react-router-dom";

// import {
//   FaTachometerAlt,
//   FaBox,
//   FaTags,
//   FaTruck,
//   FaShoppingCart,
//   FaCog,
//   FaSignOutAlt,
//   FaChartBar,
//   FaUsers,
//   FaMoneyBillWave,
  
//   FaBullhorn,
//   FaGlobe,
// } from "react-icons/fa";

// export default function Sidebar({ open, setOpen }) {

//   const location = useLocation();
//   const navigate = useNavigate();
//   let user = null;

//   try {
//     user = JSON.parse(localStorage.getItem("user"));
//   } catch {
//     user = null;
//   }

//   console.log("USER:", user);
//   console.log("ROLE:", user?.role);

//   const userRole = user?.role?.toLowerCase();
//   const isAdmin = userRole === "admin";

//   console.log("isAdmin:", isAdmin);

//   // Theme colors based on role
//   const accentColor = isAdmin ? "#C7A77B" : "#5B7FB5";
//   const accentTextColor = isAdmin ? "#2B2A28" : "#FFFFFF";

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const adminMenu = [
//     {
//       title: "MAIN",
//       items: [
//         { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
//       ],
//     },

//     {
//       title: "INVENTORY",
//       items: [
//         { name: "Products", path: "/products", icon: <FaBox /> },
//         { name: "Categories", path: "/categories", icon: <FaTags /> },
//         { name: "Suppliers", path: "/suppliers", icon: <FaTruck /> },
//       ],
//     },

//     {
//       title: "WEB STORE",
//       items: [
//         {
//           name: "Banner & Promotion",
//           path: "/banner-promotion",
//           icon: <FaBullhorn />,
//         },
//         {
//           name: "Web Orders",
//           path: "/web-orders",
//           icon: <FaGlobe />,
//         },
//       ],
//     },

//     {
//       title: "SALES",
//       items: [
//         { name: "Sales", path: "/sales", icon: <FaShoppingCart /> },
//         { name: "Payment", path: "/payment", icon: <FaMoneyBillWave /> },
//         { name: "Reports", path: "/reports", icon: <FaChartBar /> },
//       ],
//     },

//     {
//       title: "ADMIN",
//       items: [
//         { name: "Users", path: "/users", icon: <FaUsers /> },
//       ],
//     },
//   ];

//   const cashierMenu = [
//     {
//       title: "MAIN",
//       items: [
//         { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
//       ],
//     },

//     {
//       title: "WEB STORE",
//       items: [
//         {
//           name: "Web Orders",
//           path: "/web-orders",
//           icon: <FaGlobe />,
//         },
//       ],
//     },

//     {
//       title: "SALES",
//       items: [
//         { name: "Sales", path: "/sales", icon: <FaShoppingCart /> },
//         { name: "Payment", path: "/payment", icon: <FaMoneyBillWave /> },
//       ],
//     },
//   ];

//   const menuGroups = isAdmin ? adminMenu : cashierMenu;
//   console.log("MENU:", isAdmin ? "ADMIN MENU" : "CASHIER MENU");

//   return (
//     <aside
//       className={`
//         fixed top-0 left-0 h-screen bg-[#2B2A28] shadow-lg z-40
//         transform transition-transform duration-300 font-sans

//         ${open ? "translate-x-0" : "-translate-x-full"}

//         md:translate-x-0 md:w-64 w-64

//         flex flex-col
//         overflow-hidden
//         border-r border-[#3A3835]
//       `}
//     >

//       {/* Brand */}
//       <div className="h-16 flex items-center px-6 border-b border-[#3A3835]">
//         <div
//           className="w-10 h-10 rounded-lg flex items-center justify-center font-bold font-[Georgia,serif] text-lg"
//           style={{ background: accentColor, color: accentTextColor }}
//         >
//           SM
//         </div>

//         <div className="ml-3">
//           <h2 className="font-bold text-[#F7F5F0] tracking-tight font-[Georgia,serif]">
//             Supermarket
//           </h2>
//           <p className="text-xs text-[#A39A8B]">
//             Management System
//           </p>
//         </div>
//       </div>

//       {/* Nav */}
//       <nav className="p-3 flex-1 overflow-y-auto">

//         {menuGroups.map((group) => (
//           <div key={group.title} className="mb-6">

//             <h3 className="px-3 mb-2 text-[11px] font-semibold text-[#8A8378] uppercase tracking-widest">
//               {group.title}
//             </h3>

//             <div className="space-y-1">

//               {group.items.map((item) => (
//                 <Link
//                   key={item.path}
//                   to={item.path}
//                   onClick={() => setOpen(false)}
//                   className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors font-semibold shadow-sm`}
//                   style={
//                     location.pathname === item.path
//                       ? { background: accentColor, color: accentTextColor }
//                       : { color: "#D9D3C7", fontWeight: 400 }
//                   }
//                   onMouseEnter={(e) => {
//                     if (location.pathname !== item.path) {
//                       e.currentTarget.style.background = "#3A3835";
//                       e.currentTarget.style.color = "#F7F5F0";
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     if (location.pathname !== item.path) {
//                       e.currentTarget.style.background = "transparent";
//                       e.currentTarget.style.color = "#D9D3C7";
//                     }
//                   }}
//                 >
//                   <span className="text-[15px]">{item.icon}</span>
//                   {item.name}
//                 </Link>
//               ))}

//             </div>

//           </div>
//         ))}

//       </nav>

//       {/* Footer */}
//       <div className="px-3 pb-4 pt-2 space-y-1 border-t border-[#3A3835]">

//         <Link
//           to="/settings"
//           className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#D9D3C7] hover:bg-[#3A3835] hover:text-[#F7F5F0] transition-colors"
//         >
//           <FaCog className="text-[15px]" />
//           Settings
//         </Link>

//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#D98E80] hover:bg-[#A14A3F] hover:text-white transition-colors"
//         >
//           <FaSignOutAlt className="text-[15px]" />
//           Logout
//         </button>

//       </div>

//     </aside>
//   );
// }

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt, FaBox, FaTags, FaTruck,
  FaShoppingCart, FaCog, FaSignOutAlt, FaChartBar,
  FaUsers, FaMoneyBillWave, FaBullhorn, FaGlobe,
} from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar({ open, setOpen, collapsed, setCollapsed }) {
  const location = useLocation();
  const navigate = useNavigate();

  let user = null;
  try { user = JSON.parse(localStorage.getItem("user")); } catch { user = null; }

  const userRole        = user?.role?.toLowerCase();
  const isAdmin         = userRole === "admin";
  const accentColor     = isAdmin ? "#C7A77B" : "#5B7FB5";
  const accentTextColor = isAdmin ? "#2B2A28" : "#FFFFFF";

  const handleLogout = () => { localStorage.clear(); navigate("/login"); };

  const adminMenu = [
    {
      title: "MAIN",
      items: [{ name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> }],
    },
    {
      title: "INVENTORY",
      items: [
        { name: "Products",   path: "/products",   icon: <FaBox /> },
        { name: "Categories", path: "/categories", icon: <FaTags /> },
        { name: "Suppliers",  path: "/suppliers",  icon: <FaTruck /> },
      ],
    },
    {
      title: "WEB STORE",
      items: [
        { name: "Banner & Promotion", path: "/banner-promotion", icon: <FaBullhorn /> },
        { name: "Web Orders",         path: "/web-orders",       icon: <FaGlobe /> },
      ],
    },
    {
      title: "SALES",
      items: [
        { name: "Sales",   path: "/sales",   icon: <FaShoppingCart /> },
        { name: "Payment", path: "/payment", icon: <FaMoneyBillWave /> },
        { name: "Reports", path: "/reports", icon: <FaChartBar /> },
      ],
    },
    {
      title: "ADMIN",
      items: [{ name: "Users", path: "/users", icon: <FaUsers /> }],
    },
  ];

  const cashierMenu = [
    {
      title: "MAIN",
      items: [{ name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> }],
    },
    {
      title: "WEB STORE",
      items: [{ name: "Web Orders", path: "/web-orders", icon: <FaGlobe /> }],
    },
    {
      title: "SALES",
      items: [
        { name: "Sales",   path: "/sales",   icon: <FaShoppingCart /> },
        { name: "Payment", path: "/payment", icon: <FaMoneyBillWave /> },
      ],
    },
  ];

  const menuGroups = isAdmin ? adminMenu : cashierMenu;

  return (
    <>
      {/* ── The sidebar panel ─────────────────────────────────────── */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-[#2B2A28] shadow-lg z-40
          flex flex-col border-r border-[#3A3835]
          font-sans transition-all duration-300
          overflow-y-auto overflow-x-hidden
          ${open ? "translate-x-0" : "-translate-x-full"}
          w-64
          md:translate-x-0
          ${collapsed ? "md:w-[68px]" : "md:w-64"}
        `}
      >
        {/* Brand */}
        <div className="h-16 flex items-center px-3 border-b border-[#3A3835] shrink-0">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold font-[Georgia,serif] text-lg shrink-0"
            style={{ background: accentColor, color: accentTextColor }}
          >
            SM
          </div>

          <div
            className="ml-3 overflow-hidden transition-all duration-300"
            style={{ maxWidth: collapsed ? 0 : 160, opacity: collapsed ? 0 : 1 }}
          >
            <h2 className="font-bold text-[#F7F5F0] tracking-tight font-[Georgia,serif] whitespace-nowrap">
              Supermarket
            </h2>
            <p className="text-xs text-[#A39A8B] whitespace-nowrap">Management System</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="p-2 flex-1">
          {menuGroups.map((group) => (
            <div key={group.title} className="mb-4">
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: collapsed ? 0 : 28, opacity: collapsed ? 0 : 1 }}
              >
                <h3 className="px-3 mb-1.5 text-[10px] font-semibold text-[#8A8378] uppercase tracking-widest">
                  {group.title}
                </h3>
              </div>
              {collapsed && <div className="mx-2 mb-2 border-t border-[#3A3835]" />}

              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      title={collapsed ? item.name : undefined}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
                      style={
                        isActive
                          ? { background: accentColor, color: accentTextColor, fontWeight: 600 }
                          : { color: "#D9D3C7", fontWeight: 400 }
                      }
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = "#3A3835";
                          e.currentTarget.style.color = "#F7F5F0";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "#D9D3C7";
                        }
                      }}
                    >
                      <span className="text-[15px] shrink-0">{item.icon}</span>
                      <span
                        className="overflow-hidden whitespace-nowrap transition-all duration-300"
                        style={{ maxWidth: collapsed ? 0 : 180, opacity: collapsed ? 0 : 1 }}
                      >
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-2 pb-4 pt-2 space-y-0.5 border-t border-[#3A3835] shrink-0">
          <Link
            to="/settings"
            title={collapsed ? "Settings" : undefined}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#D9D3C7] hover:bg-[#3A3835] hover:text-[#F7F5F0] transition-colors"
          >
            <FaCog className="text-[15px] shrink-0" />
            <span
              className="overflow-hidden whitespace-nowrap transition-all duration-300"
              style={{ maxWidth: collapsed ? 0 : 180, opacity: collapsed ? 0 : 1 }}
            >
              Settings
            </span>
          </Link>

          <button
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#D98E80] hover:bg-[#A14A3F] hover:text-white transition-colors"
          >
            <FaSignOutAlt className="text-[15px] shrink-0" />
            <span
              className="overflow-hidden whitespace-nowrap transition-all duration-300"
              style={{ maxWidth: collapsed ? 0 : 180, opacity: collapsed ? 0 : 1 }}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* ── Collapse toggle — rendered OUTSIDE aside so it's never clipped ── */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="
          fixed top-[26px] z-50
          hidden md:flex
          items-center justify-center
          w-6 h-6 rounded-full
          bg-[#3A3835] border border-[#4A4845]
          text-[#A39A8B] hover:text-[#F7F5F0] hover:bg-[#4A4845]
          transition-all duration-300 shadow-md
        "
        style={{ left: collapsed ? 55 : 253 }}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
      </button>
    </>
  );
}
