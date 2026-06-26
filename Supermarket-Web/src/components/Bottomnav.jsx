// import { Link, useLocation } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";

// const TABS = [
//   { to: "/",        label: "Home",    icon: "🏠" },
//   { to: "/products",label: "Shop",    icon: "🛍" },
//   { to: "/cart",    label: "Cart",    icon: "🛒", badge: true },
//   { to: "/orders",  label: "Orders",  icon: "📋", auth: true },
//   { to: "/account", label: "Account", icon: "👤" },
// ];

// export default function BottomNav() {
//   const { pathname } = useLocation();
//   const { totalItems } = useCart();
//   const { isLoggedIn } = useAuth();

//   return (
//     <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-line z-40 safe-area-inset-bottom">
//       <div className="max-w-3xl mx-auto flex">
//         {TABS.map((tab) => {
//           // Don't show Orders tab when not logged in
//           if (tab.auth && !isLoggedIn) return null;

//           const isActive =
//             tab.to === "/"
//               ? pathname === "/"
//               : pathname.startsWith(tab.to);

//           return (
//             <Link
//               key={tab.to}
//               to={tab.label === "Account" && !isLoggedIn ? "/login" : tab.to}
//               className={`relative flex flex-col items-center justify-center gap-0.5 flex-1 py-2.5 transition-colors ${
//                 isActive ? "text-brand" : "text-ink-muted"
//               }`}
//             >
//               <span className="text-xl leading-none relative" aria-hidden>
//                 {tab.icon}
//                 {tab.badge && totalItems > 0 && (
//                   <span className="absolute -top-1.5 -right-2 bg-brand text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
//                     {totalItems > 9 ? "9+" : totalItems}
//                   </span>
//                 )}
//               </span>
//               <span className={`text-[10px] font-medium ${isActive ? "text-brand" : "text-ink-muted"}`}>
//                 {tab.label}
//               </span>
//               {isActive && (
//                 <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-brand rounded-full" />
//               )}
//             </Link>
//           );
//         })}
//       </div>
//     </nav>
//   );
// }


// import { Link, useLocation } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import {
//   Home,
//   ShoppingBag,
//   ShoppingCart,
//   Receipt,
//   User,
// } from "lucide-react";

// const TABS = [
//   {
//     to: "/",
//     label: "Home",
//     icon: Home,
//   },
//   {
//     to: "/products",
//     label: "Shop",
//     icon: ShoppingBag,
//   },
//   {
//     to: "/cart",
//     label: "Cart",
//     icon: ShoppingCart,
//     badge: true,
//   },
//   {
//     to: "/orders",
//     label: "Orders",
//     icon: Receipt,
//     auth: true,
//   },
//   {
//     to: "/account",
//     label: "Account",
//     icon: User,
//   },
// ];

// export default function BottomNav() {
//   const { pathname } = useLocation();
//   const { totalItems } = useCart();
//   const { isLoggedIn } = useAuth();

//   return (
//     <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-line shadow-sticky z-40">
//       <div className="max-w-3xl mx-auto flex">
//         {TABS.map((tab) => {
//           if (tab.auth && !isLoggedIn) return null;

//           const isActive =
//             tab.to === "/"
//               ? pathname === "/"
//               : pathname.startsWith(tab.to);

//           const Icon = tab.icon;

//           return (
//             <Link
//               key={tab.to}
//               to={
//                 tab.label === "Account" && !isLoggedIn
//                   ? "/login"
//                   : tab.to
//               }
//               className={`
//                 relative
//                 flex
//                 flex-col
//                 items-center
//                 justify-center
//                 gap-1
//                 flex-1
//                 py-2.5
//                 transition-all
//                 ${
//                   isActive
//                     ? "text-brand"
//                     : "text-ink-muted hover:text-brand"
//                 }
//               `}
//             >
//               <div className="relative">
//                 <Icon size={22} strokeWidth={2} />

//                 {tab.badge && totalItems > 0 && (
//                   <span className="
//                     absolute
//                     -top-1.5
//                     -right-2
//                     bg-brand
//                     text-white
//                     text-[9px]
//                     font-bold
//                     rounded-full
//                     h-4
//                     min-w-4
//                     px-1
//                     flex
//                     items-center
//                     justify-center
//                   ">
//                     {totalItems > 9 ? "9+" : totalItems}
//                   </span>
//                 )}
//               </div>

//               <span
//                 className={`
//                   text-[10px]
//                   font-medium
//                   ${
//                     isActive
//                       ? "text-brand"
//                       : "text-ink-muted"
//                   }
//                 `}
//               >
//                 {tab.label}
//               </span>

//               {isActive && (
//                 <span
//                   className="
//                     absolute
//                     bottom-0
//                     left-1/2
//                     -translate-x-1/2
//                     w-6
//                     h-0.5
//                     bg-brand
//                     rounded-full
//                   "
//                 />
//               )}
//             </Link>
//           );
//         })}
//       </div>
//     </nav>
//   );
// }

import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Home, ShoppingBag, ShoppingCart, Receipt, User, Phone } from "lucide-react";

const TABS = [
  { to: "/",        label: "Home",    icon: Home },
  { to: "/products",label: "Shop",    icon: ShoppingBag },
  { to: "/cart",    label: "Cart",    icon: ShoppingCart, badge: true },
  { to: "/orders",  label: "Orders",  icon: Receipt, auth: true },
  { to: "/account", label: "Account", icon: User },
  { to: "/contact", label: "Contact", icon: Phone },
];

export default function BottomNav() {
  const { pathname } = useLocation();
  const { totalItems } = useCart();
  const { isLoggedIn } = useAuth();

  return (
    <nav className="
      fixed bottom-0 left-0 right-0 z-40
      bg-white/95 backdrop-blur-xl
      border-t border-line/50
      shadow-sticky
      safe-area-bottom
    ">
      <div className="max-w-3xl mx-auto flex">
        {TABS.map((tab) => {
          if (tab.auth && !isLoggedIn) return null;

          const isActive = tab.to === "/" ? pathname === "/" : pathname.startsWith(tab.to);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.to}
              to={tab.label === "Account" && !isLoggedIn ? "/login" : tab.to}
              className={`
                relative flex flex-col items-center justify-center gap-1
                flex-1 py-2.5 px-1
                transition-all duration-200
                ${isActive ? "text-brand" : "text-ink-faint hover:text-ink-muted"}
              `}
            >
              {/* Active background pill */}
              {isActive && (
                <span className="
                  absolute top-1.5 left-1/2 -translate-x-1/2
                  w-10 h-8
                  bg-brand-light
                  rounded-2xl
                  -z-0
                " />
              )}

              <div className="relative z-10">
                <Icon
                  size={21}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className="transition-all duration-200"
                />
                {tab.badge && totalItems > 0 && (
                  <span className="
                    absolute -top-1.5 -right-2
                    bg-accent text-white
                    text-[9px] font-bold
                    rounded-full h-4 min-w-4 px-1
                    flex items-center justify-center
                    shadow-badge
                  ">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </div>

              <span className={`
                text-[10px] font-semibold z-10 relative
                transition-all duration-200
                ${isActive ? "text-brand" : "text-ink-faint"}
              `}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
