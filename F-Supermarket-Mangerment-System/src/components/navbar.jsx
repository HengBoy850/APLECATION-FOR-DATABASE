import { useState } from "react";
import {
  FaBars,
  FaBell,
} from "react-icons/fa";

import { useLocation } from "react-router-dom";

export default function Navbar({ toggleSidebar }) {

  const location = useLocation();

  // Get logged-in user
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const userName = user?.name || "Guest";
  const userRole = user?.role === "admin" ? "Super Admin" : "Cashier";
  const userImage = user?.image
    ? `http://172.20.10.14:8081/uploads/${user.image}`
    : "https://i.pravatar.cc/40";

  // Notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New low-stock alert", read: false },
  ]);
  const [showDropdown, setShowDropdown] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleBellClick = () => {
    setShowDropdown((prev) => !prev);
    // Mark all as read when opened
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const pageTitles = {
    "/dashboard": "Executive Dashboard",
    "/products": "Inventory Items",
    "/categories": "Product Categories",
    "/suppliers": "Vendor Directory",
    "/sales": "Sales Transactions",
    "/reports": "Analytics & Reports",
    "/settings": "Administration",
    "/users": "Admin & Users",
    "/payment": "Payments",
    "/banner-promotion": "Banner & Promotion",
    "/web-orders": "Web & Orders",
  };

  const currentPage =
    pageTitles[location.pathname] || "Dashboard";

  return (
    <nav className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-white border-b border-[#E7E2D8] z-50 font-sans">

      <div className="h-full flex items-center justify-between px-6">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg text-[#8A8378] hover:bg-[#F3F1EB] transition-colors"
          >
            <FaBars />
          </button>

          <div>
            <h1 className="text-lg md:text-2xl font-bold text-[#2B2A28] font-[Georgia,serif] tracking-tight">
              {currentPage}
            </h1>

            <p className="text-xs text-[#A39A8B]">
              Supermarket Management System
            </p>
          </div>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          <div className="relative">
            <button
              onClick={handleBellClick}
              className="relative p-2.5 rounded-full border border-[#E7E2D8] text-[#8A8378] hover:bg-[#F3F1EB] hover:text-[#2B2A28] transition-colors"
            >

              <FaBell className="text-sm" />

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 min-w-4.5 min-h-4.5 bg-[#A14A3F] text-white text-[10px] font-semibold rounded-full flex items-center justify-center border-2 border-white">
                  {unreadCount}
                </span>
              )}

            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-[#E7E2D8] rounded-lg shadow-lg overflow-hidden">
                <div className="px-4 py-2 border-b border-[#E7E2D8]">
                  <h4 className="text-sm font-semibold text-[#2B2A28]">Notifications</h4>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="px-4 py-4 text-sm text-[#A39A8B] text-center">No notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="px-4 py-3 text-sm text-[#2B2A28] border-b border-[#F3F1EB] last:border-0">
                        {n.message}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="h-8 w-px bg-[#E7E2D8]"></div>

          <div className="flex items-center gap-3">

            <img
              src={userImage}
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-[#C7A77B] object-cover"
            />

            <div className="hidden md:block">
              <h4 className="text-sm font-semibold text-[#2B2A28]">
                {userName}
              </h4>

              <p className="text-xs text-[#A39A8B]">
                {userRole}
              </p>
            </div>

          </div>

        </div>

      </div>

    </nav>
  );
}