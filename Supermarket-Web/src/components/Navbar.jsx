// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";

// export default function Navbar() {
//   const { totalItems } = useCart();
//   const { customer, isLoggedIn, logout } = useAuth();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     setMenuOpen(false);
//     navigate("/");
//   };

//   return (
//     <div className="bg-market-cream/95 backdrop-blur border-b border-market-line sticky top-0 z-40">
//       <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
//         <Link to="/" className="font-display font-extrabold text-xl text-market-green flex items-center gap-2">
//           <span aria-hidden>🛒</span> Market Express
//         </Link>

//         <div className="flex items-center gap-1 sm:gap-2">
//           <Link
//             to="/products"
//             className="px-3 py-2 rounded-lg text-sm font-medium text-market-ink/80 hover:bg-market-sage transition-colors hidden sm:block"
//           >
//             Products
//           </Link>

//           <Link
//             to="/cart"
//             className="relative px-3 py-2 rounded-lg text-sm font-semibold bg-market-green text-white hover:bg-market-greenDark transition-colors flex items-center gap-1.5"
//           >
//             <span aria-hidden>🛍️</span>
//             <span className="hidden sm:inline">Cart</span>
//             {totalItems > 0 && (
//               <span className="absolute -top-1.5 -right-1.5 bg-market-orange text-white text-[11px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                 {totalItems}
//               </span>
//             )}
//           </Link>

//           <div className="relative">
//             <button
//               onClick={() => setMenuOpen((v) => !v)}
//               className="px-3 py-2 rounded-lg text-sm font-medium text-market-ink/80 hover:bg-market-sage transition-colors"
//               aria-haspopup="true"
//               aria-expanded={menuOpen}
//             >
//               {isLoggedIn ? `Hi, ${customer.name?.split(" ")[0] || "there"}` : "Account"}
//             </button>

//             {menuOpen && (
//               <div
//                 className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-card border border-market-line py-1 overflow-hidden"
//                 onMouseLeave={() => setMenuOpen(false)}
//               >
//                 {isLoggedIn ? (
//                   <>
//                     <Link
//                       to="/orders"
//                       onClick={() => setMenuOpen(false)}
//                       className="block px-4 py-2.5 text-sm hover:bg-market-sage"
//                     >
//                       My orders
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left px-4 py-2.5 text-sm text-market-orangeDark hover:bg-market-sage"
//                     >
//                       Log out
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <Link
//                       to="/login"
//                       onClick={() => setMenuOpen(false)}
//                       className="block px-4 py-2.5 text-sm hover:bg-market-sage"
//                     >
//                       Log in
//                     </Link>
//                     <Link
//                       to="/register"
//                       onClick={() => setMenuOpen(false)}
//                       className="block px-4 py-2.5 text-sm hover:bg-market-sage"
//                     >
//                       Create account
//                     </Link>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";

// export default function Navbar() {
//   const { totalItems } = useCart();
//   const { customer } = useAuth();

//   return (
//     <div className="bg-white border-b border-line sticky top-0 z-40">
//       <div className="max-w-3xl mx-auto px-4 pt-3 pb-2.5">
//         {/* Top row: logo + cart */}
//         <div className="flex items-center justify-between">
//           <Link
//             to="/"
//             className="font-display font-bold text-xl text-brand flex items-center gap-2"
//           >
//             <span
//               className="bg-brand text-white w-8 h-8 rounded-xl flex items-center justify-center text-sm"
//               aria-hidden
//             >
//               🛒
//             </span>
//             FreshGo
//           </Link>

//           <Link
//             to="/cart"
//             className="relative flex items-center gap-2 bg-brand text-white font-semibold text-sm px-4 py-2 rounded-full hover:bg-brand-dark transition-colors"
//           >
//             <span aria-hidden>🛍️</span>
//             <span>Cart</span>
//             {totalItems > 0 && (
//               <span className="bg-ink text-white text-[10px] font-bold rounded-full h-[18px] w-[18px] flex items-center justify-center">
//                 {totalItems > 99 ? "99+" : totalItems}
//               </span>
//             )}
//           </Link>
//         </div>

//         {/* Location row */}
//         <div className="flex items-center gap-1.5 mt-2">
//           <span className="text-brand text-sm" aria-hidden>📍</span>
//           <span className="text-ink-muted text-xs">Deliver to</span>
//           <span className="text-ink font-semibold text-xs truncate max-w-[160px]">
//             {customer?.address || "Phnom Penh, BKK1"}
//           </span>
//           <span className="text-ink-muted text-xs" aria-hidden>›</span>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import {
//   ShoppingBag,
//   ShoppingCart,
//   MapPin,
//   ChevronDown,
// } from "lucide-react";

// export default function Navbar() {
//   const { totalItems } = useCart();
//   const { customer } = useAuth();

//   return (
//     <div className="bg-white border-b border-line sticky top-0 z-40">
//       <div className="max-w-3xl mx-auto px-4 pt-3 pb-2.5">

//         {/* Top Row */}
//         <div className="flex items-center justify-between">

//           {/* Logo */}
//           <Link
//             to="/"
//             className="flex items-center gap-2 font-display font-bold text-xl text-brand"
//           >
//             <div
//               className="
//                 w-8 h-8
//                 bg-brand
//                 rounded-xl
//                 flex
//                 items-center
//                 justify-center
//                 text-white
//               "
//             >
//               <ShoppingBag size={16} />
//             </div>

//             <span>FreshGo</span>
//           </Link>

//           {/* Cart Button */}
//           <Link
//             to="/cart"
//             className="
//               relative
//               flex
//               items-center
//               gap-2
//               bg-brand
//               text-white
//               font-semibold
//               text-sm
//               px-4
//               py-2
//               rounded-full
//               hover:bg-brand-dark
//               transition-colors
//             "
//           >
//             <ShoppingCart size={16} />

//             <span>Cart</span>

//             {totalItems > 0 && (
//               <span
//                 className="
//                   bg-ink
//                   text-white
//                   text-[10px]
//                   font-bold
//                   rounded-full
//                   h-4.5
//                   min-w-4.5
//                   px-1
//                   flex
//                   items-center
//                   justify-center
//                 "
//               >
//                 {totalItems > 99 ? "99+" : totalItems}
//               </span>
//             )}
//           </Link>
//         </div>

//         {/* Location Row */}
//         <div className="flex items-center gap-1.5 mt-2">
//           <MapPin
//             size={14}
//             className="text-brand shrink-0"
//           />

//           <span className="text-ink-muted text-xs">
//             Deliver to
//           </span>

//           <span className="text-ink font-semibold text-xs truncate max-w-45">
//             {customer?.address || "Phnom Penh, BKK1"}
//           </span>

//           <ChevronDown
//             size={12}
//             className="text-ink-muted shrink-0"
//           />
//         </div>

//       </div>
//     </div>
//   );
// }


import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ShoppingBag, ShoppingCart, MapPin, ChevronDown, Phone } from "lucide-react";

export default function Navbar() {
  const { totalItems } = useCart();
  const { customer } = useAuth();

  return (
    <div className="bg-white/90 backdrop-blur-md border-b border-line/60 sticky top-0 z-40 shadow-[0_1px_0_0_#DDE8E1]">
      <div className="max-w-3xl mx-auto px-4 pt-3.5 pb-3">

        {/* Top Row */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center">
              <ShoppingBag
                size={18}
                strokeWidth={2.3}
                className="text-white"
              />
            </div>

            <h1 className="font-extrabold text-2xl text-ink">
              Fresh<span className="text-brand">Go</span>
            </h1>
          </Link>

          {/* Cart Button */}
          <Link
            to="/cart"
            className="
              relative
              flex items-center gap-2
              bg-brand text-white
              font-semibold text-sm
              px-4 py-2.5
              rounded-full
              shadow-btn
              hover:bg-brand-dark
              active:scale-95
              transition-all duration-200
            "
          >
            <ShoppingCart size={15} strokeWidth={2.5} />
            <span>Cart</span>

            {totalItems > 0 && (
              <span className="
                bg-accent text-white
                text-[10px] font-bold
                rounded-full h-5 min-w-5 px-1
                flex items-center justify-center
                shadow-badge
                animate-pop
              ">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          
        </div>

        {/* Location Row */}
        <button className="flex items-center gap-1.5 mt-2.5 group">
          <div className="w-5 h-5 rounded-full bg-brand-light flex items-center justify-center shrink-0">
            <MapPin size={11} className="text-brand" />
          </div>
          <span className="text-ink-muted text-xs">Deliver to</span>
          <span className="text-ink font-semibold text-xs truncate max-w-45 group-hover:text-brand transition-colors">
            {customer?.address || "Phnom Penh, BKK1"}
          </span>
          <ChevronDown size={12} className="text-ink-faint shrink-0" />
        </button>

      </div>
    </div>
  );
}
