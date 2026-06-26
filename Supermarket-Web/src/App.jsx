// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";
// import { AuthProvider } from "./context/AuthContext";
// import Navbar from "./components/navbar";
// import ProtectedRoute from "./components/ProtectedRoute";

// import Home from "./pages/Home";
// import Products from "./pages/Products";
// import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Checkout from "./pages/Checkout";
// import OrderPayment from "./pages/OrderPayment";
// import OrderSuccess from "./pages/OrderSuccess";
// import Orders from "./pages/Orders";

// function App() {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <BrowserRouter>
//           <div className="min-h-screen flex flex-col font-body">
//             <Navbar />
//             <main className="flex-1">
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/products" element={<Products />} />
//                 <Route path="/cart" element={<Cart />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />

//                 <Route
//                   path="/checkout"
//                   element={
//                     <ProtectedRoute>
//                       <Checkout />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/order-payment"
//                   element={
//                     <ProtectedRoute>
//                       <OrderPayment />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route path="/order-success" element={<OrderSuccess />} />
//                 <Route
//                   path="/orders"
//                   element={
//                     <ProtectedRoute>
//                       <Orders />
//                     </ProtectedRoute>
//                   }
//                 />
//               </Routes>
//             </main>
//           </div>
//         </BrowserRouter>
//       </CartProvider>
//     </AuthProvider>
//   );
// }

// export default App;





/**
 * App.jsx — Drop-in replacement.
 * Adds BottomNav to the layout; removes Navbar dropdown account menu
 * (account actions now live in the BottomNav Account tab → /account or /login).
 *
 * Keep your existing:
 *   - AuthProvider, CartProvider, ProtectedRoute
 *   - api/client
 *   - LocationPicker
 *
 * Route /account can be a simple profile page; for now it redirects to /login
 * when the user is logged out (BottomNav handles that).
 */

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider }    from "./context/AuthContext";
// import { CartProvider }    from "./context/CartContext";
// import Navbar              from "./components/Navbar";
// import BottomNav           from "./components/BottomNav";
// import ProtectedRoute      from "./components/ProtectedRoute";

// import Home                from "./pages/Home";
// import Products            from "./pages/Products";
// import Cart                from "./pages/Cart";
// import Checkout            from "./pages/Checkout";
// import Orders              from "./pages/Orders";
// import Login               from "./pages/Login";
// import Register            from "./pages/Register";
// import { OrderPayment, OrderSuccess } from "./pages/OrderPages";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <CartProvider>
//           {/* Top sticky navbar (logo + location + cart pill) */}
//           <Navbar />

//           {/* Page content */}
//           <Routes>
//             <Route path="/"              element={<Home />} />
//             <Route path="/products"      element={<Products />} />
//             <Route path="/cart"          element={<Cart />} />
//             <Route path="/login"         element={<Login />} />
//             <Route path="/register"      element={<Register />} />

//             {/* Protected routes */}
//             <Route path="/checkout"      element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
//             <Route path="/orders"        element={<ProtectedRoute><Orders /></ProtectedRoute>} />
//             <Route path="/order-payment" element={<ProtectedRoute><OrderPayment /></ProtectedRoute>} />
//             <Route path="/order-success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
//           </Routes>

//           {/* Fixed 5-tab bottom navigation */}
//           <BottomNav />
//         </CartProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider }    from "./context/AuthContext";
import { CartProvider }    from "./context/CartContext";
import Navbar              from "./components/Navbar";
import BottomNav           from "./components/BottomNav";
import ProtectedRoute      from "./components/ProtectedRoute";

import Home                from "./pages/Home";
import Products            from "./pages/Products";
import Cart                from "./pages/Cart";
import Checkout            from "./pages/Checkout";
import Orders              from "./pages/Orders";
import Login               from "./pages/Login";
import Register            from "./pages/Register";
import OrderPayment        from "./pages/OrderPayment";
import OrderSuccess        from "./pages/OrderSuccess";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar />

          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart"     element={<Cart />} />
            <Route path="/login"    element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />

            {/* Protected */}
            <Route path="/checkout"      element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/orders"        element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/order-payment" element={<ProtectedRoute><OrderPayment /></ProtectedRoute>} />
            <Route path="/order-success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
          </Routes>

          <BottomNav />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
