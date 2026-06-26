// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { imageUrl } from "../api/client";

// export default function Cart() {
//   const {
//     cart,
//     increaseQty,
//     decreaseQty,
//     removeItem,
//     subtotal,
//     totalDiscount,
//     totalPrice,
//     totalItems,
//     lineFinalPrice,
//   } = useCart();
//   const navigate = useNavigate();

//   if (cart.length === 0) {
//     return (
//       <div className="max-w-3xl mx-auto px-4 py-16 text-center">
//         <div className="text-5xl mb-3" aria-hidden>
//           🛒
//         </div>
//         <h1 className="font-display font-bold text-xl mb-2">Your cart is empty</h1>
//         <p className="text-market-ink/60 mb-5">Add something fresh to get started.</p>
//         <Link
//           to="/products"
//           className="inline-block bg-market-green text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-market-greenDark"
//         >
//           Browse products
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-6 pb-32">
//       <h1 className="font-display font-bold text-2xl mb-4">Your cart</h1>

//       <div className="space-y-3">
//         {cart.map((item) => {
//           const final = lineFinalPrice(item);
//           return (
//             <div
//               key={item.productID}
//               className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-card"
//             >
//               <div className="h-16 w-16 rounded-lg bg-market-sage overflow-hidden shrink-0">
//                 {item.image && (
//                   <img
//                     src={imageUrl(item.image)}
//                     alt={item.productName}
//                     className="h-full w-full object-cover"
//                   />
//                 )}
//               </div>

//               <div className="flex-1 min-w-0">
//                 <h2 className="font-semibold text-sm truncate">{item.productName}</h2>
//                 {item.promotionPercent ? (
//                   <p className="text-market-orangeDark text-xs font-semibold mt-0.5">
//                     -{item.promotionPercent}% off
//                   </p>
//                 ) : null}
//                 <p className="text-market-green font-bold text-sm mt-0.5 tabular-nums">
//                   ${final.toFixed(2)}
//                 </p>
//               </div>

//               <div className="flex items-center gap-2.5 shrink-0">
//                 <button
//                   onClick={() => decreaseQty(item.productID)}
//                   aria-label="Decrease quantity"
//                   className="h-7 w-7 rounded-full bg-market-sage text-market-green font-bold flex items-center justify-center hover:bg-market-line"
//                 >
//                   −
//                 </button>
//                 <span className="w-5 text-center font-semibold tabular-nums">
//                   {item.qty}
//                 </span>
//                 <button
//                   onClick={() => increaseQty(item.productID)}
//                   aria-label="Increase quantity"
//                   className="h-7 w-7 rounded-full bg-market-green text-white font-bold flex items-center justify-center hover:bg-market-greenDark"
//                 >
//                   +
//                 </button>
//               </div>

//               <button
//                 onClick={() => removeItem(item.productID)}
//                 aria-label="Remove item"
//                 className="text-market-ink/30 hover:text-market-orangeDark shrink-0 ml-1"
//               >
//                 ✕
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {/* INVOICE SUMMARY */}
//       <div className="mt-6 bg-white rounded-xl shadow-card p-4 space-y-2">
//         <div className="flex justify-between text-sm text-market-ink/70">
//           <span>Subtotal ({totalItems} items)</span>
//           <span className="tabular-nums">${subtotal.toFixed(2)}</span>
//         </div>
//         {totalDiscount > 0 && (
//           <div className="flex justify-between text-sm text-market-orangeDark font-medium">
//             <span>Discount</span>
//             <span className="tabular-nums">-${totalDiscount.toFixed(2)}</span>
//           </div>
//         )}
//         <div className="flex justify-between font-display font-bold text-base pt-2 border-t border-market-line">
//           <span>Total</span>
//           <span className="tabular-nums">${totalPrice.toFixed(2)}</span>
//         </div>
//       </div>

//       {/* STICKY BOTTOM BAR - signature layout element */}
//       <div className="fixed bottom-0 left-0 right-0 bg-market-ink text-white shadow-sticky z-30">
//         <div className="max-w-3xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
//           <div>
//             <p className="text-xs text-white/60">
//               {totalItems} item{totalItems !== 1 ? "s" : ""}
//             </p>
//             <p className="font-display font-bold text-lg tabular-nums">
//               ${totalPrice.toFixed(2)}
//             </p>
//           </div>
//           <button
//             onClick={() => navigate("/checkout")}
//             className="bg-market-orange hover:bg-market-orangeDark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
//           >
//             Order now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { imageUrl } from "../api/client";

// export default function Cart() {
//   const {
//     cart,
//     increaseQty,
//     decreaseQty,
//     removeItem,
//     subtotal,
//     totalDiscount,
//     totalPrice,
//     totalItems,
//     lineFinalPrice,
//   } = useCart();
//   const navigate = useNavigate();
//   const [promoCode, setPromoCode] = useState("");
//   const [promoOpen, setPromoOpen] = useState(false);

//   /* ── EMPTY STATE ─────────────────────────────────────────────── */
//   if (cart.length === 0) {
//     return (
//       <div className="max-w-3xl mx-auto px-4 py-24 text-center pb-28">
//         <p className="text-6xl mb-4" aria-hidden>🛒</p>
//         <h1 className="font-bold text-xl text-ink mb-2">Your cart is empty</h1>
//         <p className="text-ink-muted text-sm mb-6">Add something fresh to get started.</p>
//         <Link
//           to="/products"
//           className="inline-block bg-brand text-white font-semibold px-8 py-3 rounded-full hover:bg-brand-dark transition-colors"
//         >
//           Browse products
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto pb-32">

//       {/* ── PAGE TITLE ──────────────────────────────────────────── */}
//       <div className="px-4 pt-5 pb-2">
//         <h1 className="font-bold text-xl text-ink">
//           My Cart
//           <span className="ml-2 text-sm font-medium text-ink-muted">
//             ({totalItems} item{totalItems !== 1 ? "s" : ""})
//           </span>
//         </h1>
//       </div>

//       {/* ── CART ITEMS ──────────────────────────────────────────── */}
//       <div className="px-4 flex flex-col gap-3 mt-2">
//         {cart.map((item) => {
//           const lineTotal = lineFinalPrice(item) * item.qty;
//           return (
//             <div
//               key={item.productID}
//               className="flex items-center gap-3 bg-white rounded-2xl shadow-card p-3"
//             >
//               {/* Image */}
//               <div className="h-16 w-16 rounded-xl bg-white overflow-hidden shrink-0 flex items-center justify-center">
//                 {item.image ? (
//                   <img
//                     src={imageUrl(item.image)}
//                     alt={item.productName}
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-3xl" aria-hidden>🛒</span>
//                 )}
//               </div>

//               {/* Info */}
//               <div className="flex-1 min-w-0">
//                 <h2 className="font-medium text-sm text-ink truncate">{item.productName}</h2>
//                 {item.promotionPercent ? (
//                   <span className="text-[11px] text-brand font-semibold">
//                     -{item.promotionPercent}% off
//                   </span>
//                 ) : null}
//                 <p className="font-bold text-sm text-ink mt-0.5 tabular-nums">
//                   ${lineTotal.toFixed(2)}
//                 </p>
//               </div>

//               {/* Qty stepper */}
//               <div className="flex items-center gap-2 shrink-0">
//                 <button
//                   onClick={() => decreaseQty(item.productID)}
//                   aria-label="Decrease quantity"
//                   className="w-7 h-7 rounded-full border border-line bg-white text-ink font-bold flex items-center justify-center text-base leading-none"
//                 >
//                   −
//                 </button>
//                 <span className="w-5 text-center font-semibold text-sm tabular-nums">
//                   {item.qty}
//                 </span>
//                 <button
//                   onClick={() => increaseQty(item.productID)}
//                   aria-label="Increase quantity"
//                   className="w-7 h-7 rounded-full bg-brand text-white font-bold flex items-center justify-center text-base leading-none hover:bg-brand-dark transition-colors"
//                 >
//                   +
//                 </button>
//               </div>

//               {/* Remove */}
//               <button
//                 onClick={() => removeItem(item.productID)}
//                 aria-label="Remove item"
//                 className="text-ink-muted hover:text-brand transition-colors shrink-0 ml-1 text-lg leading-none"
//               >
//                 ✕
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {/* ── PROMO CODE ──────────────────────────────────────────── */}
//       <div className="px-4 mt-4">
//         {!promoOpen ? (
//           <button
//             onClick={() => setPromoOpen(true)}
//             className="w-full flex items-center gap-3 border-2 border-dashed border-accent rounded-2xl px-4 py-3 bg-accent-light text-sm text-accent font-medium hover:bg-green-50 transition-colors"
//           >
//             <span aria-hidden>🏷️</span>
//             Apply promo code
//             <span className="ml-auto text-accent/60">›</span>
//           </button>
//         ) : (
//           <div className="flex gap-2 border-2 border-dashed border-accent rounded-2xl px-4 py-3 bg-accent-light">
//             <input
//               type="text"
//               placeholder="Enter promo code"
//               value={promoCode}
//               onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
//               className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted font-medium"
//               autoFocus
//             />
//             <button
//               className="bg-accent text-white text-sm font-semibold px-4 py-1.5 rounded-full"
//               onClick={() => setPromoOpen(false)}
//             >
//               Apply
//             </button>
//           </div>
//         )}
//       </div>

//       {/* ── INVOICE SUMMARY ─────────────────────────────────────── */}
//       <div className="mx-4 mt-4 bg-white rounded-2xl shadow-card p-4 space-y-2.5">
//         <div className="flex justify-between text-sm text-ink-muted">
//           <span>Subtotal ({totalItems} items)</span>
//           <span className="tabular-nums">${subtotal.toFixed(2)}</span>
//         </div>
//         {totalDiscount > 0 && (
//           <div className="flex justify-between text-sm text-brand font-medium">
//             <span>Discount</span>
//             <span className="tabular-nums">-${totalDiscount.toFixed(2)}</span>
//           </div>
//         )}
//         <div className="flex justify-between text-sm text-accent font-medium">
//           <span>Delivery fee</span>
//           <span>Free</span>
//         </div>
//         <div className="flex justify-between font-bold text-base text-ink pt-2.5 border-t border-line">
//           <span>Total</span>
//           <span className="tabular-nums">${totalPrice.toFixed(2)}</span>
//         </div>
//       </div>

//       {/* ── STICKY CHECKOUT BAR ─────────────────────────────────── */}
//       <div className="fixed bottom-[56px] left-0 right-0 bg-white border-t border-line shadow-sticky z-30 px-4 py-3">
//         <div className="max-w-3xl mx-auto">
//           <button
//             onClick={() => navigate("/checkout")}
//             className="w-full bg-brand text-white font-bold text-base py-3.5 rounded-full hover:bg-brand-dark transition-colors flex items-center justify-center gap-2"
//           >
//             Checkout — ${totalPrice.toFixed(2)}
//             <span aria-hidden>›</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { imageUrl } from "../api/client";
import { Minus, Plus, X, Tag, ArrowRight } from "lucide-react";

export default function Cart() {
  const {
    cart, increaseQty, decreaseQty, removeItem,
    subtotal, totalDiscount, totalPrice, totalItems, lineFinalPrice,
  } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [promoOpen, setPromoOpen] = useState(false);

  /* ── EMPTY STATE ─────────────────────────────────────────────── */
  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center pb-28 animate-fade-in">
        <div className="w-24 h-24 rounded-full bg-brand-light mx-auto flex items-center justify-center mb-5">
          <span className="text-5xl" aria-hidden>🛒</span>
        </div>
        <h1 className="font-display font-bold text-xl text-ink mb-2">Your cart is empty</h1>
        <p className="text-ink-muted text-sm mb-8">Add something fresh to get started.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-brand text-white font-bold px-8 py-3.5 rounded-full shadow-btn hover:bg-brand-dark transition-all"
        >
          Browse products <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-36 animate-fade-in">

      {/* ── PAGE TITLE ──────────────────────────────────────────── */}
      <div className="px-4 pt-5 pb-3">
        <h1 className="font-display font-extrabold text-xl text-ink">
          My Cart
          <span className="ml-2 text-sm font-medium text-ink-muted">
            ({totalItems} item{totalItems !== 1 ? "s" : ""})
          </span>
        </h1>
      </div>

      {/* ── CART ITEMS ──────────────────────────────────────────── */}
      <div className="px-4 flex flex-col gap-2.5">
        {cart.map((item) => {
          const lineTotal = lineFinalPrice(item) * item.qty;
          return (
            <div
              key={item.productID}
              className="flex items-center gap-3 bg-white rounded-3xl border border-line/60 shadow-card p-3 animate-slide-up"
            >
              {/* Image */}
              <div className="h-[60px] w-[60px] rounded-2xl bg-canvas overflow-hidden shrink-0 flex items-center justify-center border border-line/40">
                {item.image ? (
                  <img src={imageUrl(item.image)} alt={item.productName} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-2xl" aria-hidden>🛒</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-sm text-ink truncate">{item.productName}</h2>
                {item.promotionPercent ? (
                  <span className="inline-block text-[10px] text-accent font-bold bg-accent-light px-2 py-0.5 rounded-full mt-0.5">
                    -{item.promotionPercent}% off
                  </span>
                ) : null}
                <p className="font-extrabold text-sm text-ink mt-1 tabular-nums">
                  ${lineTotal.toFixed(2)}
                </p>
              </div>

              {/* Qty stepper */}
              <div className="flex items-center gap-1.5 bg-brand-light rounded-full p-1 shrink-0">
                <button
                  onClick={() => decreaseQty(item.productID)}
                  aria-label="Decrease quantity"
                  className="w-7 h-7 rounded-full bg-white text-brand flex items-center justify-center shadow-sm border border-line/40 active:scale-90 transition-transform"
                >
                  <Minus size={13} strokeWidth={2.5} />
                </button>
                <span className="w-5 text-center font-bold text-sm text-brand tabular-nums">
                  {item.qty}
                </span>
                <button
                  onClick={() => increaseQty(item.productID)}
                  aria-label="Increase quantity"
                  className="w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center shadow-sm active:scale-90 transition-transform"
                >
                  <Plus size={13} strokeWidth={2.5} />
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item.productID)}
                aria-label="Remove item"
                className="w-7 h-7 rounded-full bg-canvas text-ink-faint hover:bg-red-50 hover:text-danger flex items-center justify-center ml-0.5 shrink-0 transition-colors"
              >
                <X size={14} strokeWidth={2} />
              </button>
            </div>
          );
        })}
      </div>

      {/* ── PROMO CODE ──────────────────────────────────────────── */}
      <div className="px-4 mt-4">
        {!promoOpen ? (
          <button
            onClick={() => setPromoOpen(true)}
            className="
              w-full flex items-center gap-3
              border-2 border-dashed border-accent/40 rounded-2xl
              px-4 py-3.5 bg-accent-light
              text-sm text-accent font-semibold
              hover:border-accent/60 hover:bg-orange-50
              transition-all
            "
          >
            <Tag size={16} />
            Apply promo code
            <span className="ml-auto text-accent/50 text-base">›</span>
          </button>
        ) : (
          <div className="flex gap-2 border-2 border-dashed border-accent/60 rounded-2xl px-4 py-3 bg-accent-light">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint font-semibold tracking-wider"
              autoFocus
            />
            <button
              className="bg-accent text-white text-sm font-bold px-5 py-2 rounded-full shadow-btn-coral hover:bg-accent-dark transition-all"
              onClick={() => setPromoOpen(false)}
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* ── INVOICE SUMMARY ─────────────────────────────────────── */}
      <div className="mx-4 mt-4 bg-white rounded-3xl border border-line/60 shadow-card p-4 space-y-3">
        <div className="flex justify-between items-center text-sm text-ink-muted">
          <span>Subtotal ({totalItems} items)</span>
          <span className="tabular-nums font-medium text-ink">${subtotal.toFixed(2)}</span>
        </div>

        {totalDiscount > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-1.5 text-accent font-semibold">
              <Tag size={13} />
              Discount saved
            </span>
            <span className="tabular-nums font-bold text-accent">-${totalDiscount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-sm">
          <span className="text-ink-muted">Delivery fee</span>
          <span className="font-bold text-brand bg-brand-light px-2.5 py-0.5 rounded-full text-xs">
            FREE
          </span>
        </div>

        <div className="flex justify-between items-center font-extrabold text-base text-ink pt-3 border-t border-line/60">
          <span>Total</span>
          <span className="tabular-nums text-brand">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* ── STICKY CHECKOUT BAR ─────────────────────────────────── */}
      <div className="fixed bottom-[56px] left-0 right-0 z-30 px-4 pb-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate("/checkout")}
            className="
              w-full
              bg-brand
              text-white
              rounded-3xl
              px-5 py-4
              shadow-xl
              transition-all
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-white/70">
                  Ready to checkout
                </p>
                <p className="font-bold text-lg">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  Continue
                </span>
                <ArrowRight size={18} />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

