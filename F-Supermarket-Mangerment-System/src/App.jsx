import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import PageLoader from "./components/PageLoader";

import Dashboard from "./pages/dashboard";
import Products from "./pages/products";
import Categories from "./pages/categories";
import Suppliers from "./pages/suppliers";
import Sales from "./pages/sales";
import Login from "./pages/login";
import CashierRegister from "./pages/cashierRegister";
import Reports from "./pages/reports";
import Settings from "./pages/settings";
import User from "./pages/user";
import Payment from "./pages/payment";
import BannerPromotion from "./pages/bannerPromotion";
import WebOrders from "./pages/webOrder";


const isAuth = () => localStorage.getItem("user");

function PrivateRoute({ children }) {
  return isAuth() ? children : <Navigate to="/login" />;
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (appLoading) {
    return <PageLoader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CashierRegister />} />

        {/* PROTECTED LAYOUT ROUTES */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <>
                <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

                {sidebarOpen && (
                  <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                  />
                )}

                <main className="pt-20 p-6 bg-gray-50 min-h-screen md:ml-64">
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/sales" element={<Sales />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/users" element={<User />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/banner-promotion" element={<BannerPromotion />} />
                    <Route path="/web-orders" element={<WebOrders />} />
                  </Routes>
                </main>
              </>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}