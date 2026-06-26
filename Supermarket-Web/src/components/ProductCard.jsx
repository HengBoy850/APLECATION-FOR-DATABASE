// import { useState } from "react";
// import { imageUrl } from "../api/client";
// import { useCart } from "../context/CartContext";

// export default function ProductCard({ product }) {
//   const { addToCart } = useCart();
//   const [justAdded, setJustAdded] = useState(false);

//   const outOfStock = product.quantity !== undefined && product.quantity <= 0;
//   // const hasDiscount = !!product.promotionPercent;
//   // const finalPrice = hasDiscount
//   //   ? product.price - product.price * (product.promotionPercent / 100)
//   //   : product.price;

//   const price = Number(product.price || 0);
//   const promotionPercent = Number(product.promotionPercent || 0);

//   const hasDiscount = promotionPercent > 0;

//   const finalPrice = hasDiscount
//     ? price - price * (promotionPercent / 100)
//     : price;

//   const handleAdd = () => {
//     if (outOfStock) return;
//     addToCart(product);
//     setJustAdded(true);
//     setTimeout(() => setJustAdded(false), 1200);
//   };

//   return (
//     <div
//       className={`bg-white rounded-xl shadow-card overflow-hidden flex flex-col ${
//         hasDiscount ? "ribbon" : ""
//       }`}
//       data-ribbon={hasDiscount ? `-${product.promotionPercent}%` : undefined}
//     >
//       <div className="h-28 sm:h-32 bg-market-sage relative">
//         {product.image && (
//           <img
//             src={imageUrl(product.image)}
//             alt={product.productName}
//             className="h-full w-full object-cover"
//           />
//         )}
//         {outOfStock && (
//           <div className="absolute inset-0 bg-market-ink/60 flex items-center justify-center">
//             <span className="text-white text-xs font-semibold tracking-wide">
//               OUT OF STOCK
//             </span>
//           </div>
//         )}
//       </div>

//       <div className="p-3 flex flex-col flex-1">
//         <h3 className="text-sm font-semibold text-market-ink line-clamp-2 flex-1">
//           {product.productName}
//         </h3>

//         <div className="mt-1.5 flex items-baseline gap-1.5">
//           <span className="text-market-green font-bold tabular-nums">
//             ${finalPrice.toFixed(2)}
//           </span>
//           {hasDiscount && (
//             <span className="text-xs text-market-ink/40 line-through tabular-nums">
//               ${Number(product.price).toFixed(2)}
//             </span>
//           )}
//         </div>

//         <button
//           onClick={handleAdd}
//           disabled={outOfStock}
//           className={`mt-2.5 w-full text-sm font-semibold py-1.5 rounded-lg transition-colors ${
//             outOfStock
//               ? "bg-market-line text-market-ink/40 cursor-not-allowed"
//               : justAdded
//               ? "bg-market-greenDark text-white"
//               : "bg-market-green text-white hover:bg-market-greenDark"
//           }`}
//         >
//           {outOfStock ? "Out of stock" : justAdded ? "Added ✓" : "Add to cart"}
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useState } from "react";
// import { imageUrl } from "../api/client";
// import { useCart } from "../context/CartContext";

// export default function ProductCard({ product }) {
//   const { addToCart, cart, increaseQty, decreaseQty } = useCart();
//   const [justAdded, setJustAdded] = useState(false);

//   const outOfStock = product.quantity !== undefined && product.quantity <= 0;

//   const price          = Number(product.price || 0);
//   const promoPercent   = Number(product.promotionPercent || 0);
//   const hasDiscount    = promoPercent > 0;
//   const finalPrice     = hasDiscount ? price - price * (promoPercent / 100) : price;

//   // Count already in cart
//   const cartItem = cart.find((i) => i.productID === product.productID);
//   const qtyInCart = cartItem?.qty || 0;

//   const handleAdd = () => {
//     if (outOfStock) return;
//     addToCart(product);
//     setJustAdded(true);
//     setTimeout(() => setJustAdded(false), 1000);
//   };

//   return (
//     <div
//       className={`bg-card rounded-2xl shadow-card overflow-hidden flex flex-col relative ${
//         hasDiscount ? "ribbon" : ""
//       }`}
//       data-ribbon={hasDiscount ? `-${promoPercent}%` : undefined}
//     >
//       {/* Image */}
//       <div className="h-28 sm:h-32 bg-white relative flex items-center justify-center">
//         {product.image ? (
//           <img
//             src={imageUrl(product.image)}
//             alt={product.productName}
//             className="h-full w-full object-cover"
//           />
//         ) : (
//           <span className="text-4xl" aria-hidden>🛒</span>
//         )}
//         {outOfStock && (
//           <div className="absolute inset-0 bg-ink/50 flex items-center justify-center">
//             <span className="text-white text-[11px] font-semibold tracking-wide bg-ink/70 px-3 py-1 rounded-full">
//               Out of stock
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Body */}
//       <div className="p-3 flex flex-col flex-1">
//         <h3 className="text-sm font-medium text-ink line-clamp-2 flex-1 leading-snug">
//           {product.productName}
//         </h3>

//         {/* Price block + add button */}
//         <div className="mt-2 flex items-end justify-between">
//           <div>
//             {hasDiscount && (
//               <span className="text-[11px] text-ink-muted line-through block tabular-nums">
//                 ${price.toFixed(2)}
//               </span>
//             )}
//             <span className="text-base font-bold text-ink tabular-nums">
//               ${finalPrice.toFixed(2)}
//             </span>
//           </div>

//           {outOfStock ? (
//             <span className="text-[11px] text-ink-muted">Unavailable</span>
//           ) : qtyInCart > 0 ? (
//             /* Inline qty stepper once something is in cart */
//             <div className="flex items-center gap-1.5">
//               <button
//                 onClick={() => decreaseQty(product.productID)}
//                 className="w-7 h-7 rounded-full border border-line bg-white text-ink font-bold flex items-center justify-center text-base leading-none"
//                 aria-label="Decrease"
//               >
//                 −
//               </button>
//               <span className="text-sm font-semibold text-ink w-4 text-center tabular-nums">
//                 {qtyInCart}
//               </span>
//               <button
//                 onClick={handleAdd}
//                 className="w-7 h-7 rounded-full bg-brand text-white font-bold flex items-center justify-center text-base leading-none hover:bg-brand-dark transition-colors"
//                 aria-label="Increase"
//               >
//                 +
//               </button>
//             </div>
//           ) : (
//             /* First-add circle button */
//             <button
//               onClick={handleAdd}
//               aria-label={`Add ${product.productName} to cart`}
//               className={`w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold transition-all ${
//                 justAdded
//                   ? "bg-accent text-white scale-95"
//                   : "bg-brand text-white hover:bg-brand-dark active:scale-95"
//               }`}
//             >
//               {justAdded ? "✓" : "+"}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { imageUrl } from "../api/client";
import { useCart } from "../context/CartContext";
import { Plus, Minus } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart, cart, increaseQty, decreaseQty } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const outOfStock   = product.quantity !== undefined && product.quantity <= 0;
  const price        = Number(product.price || 0);
  const promoPercent = Number(product.promotionPercent || 0);
  const hasDiscount  = promoPercent > 0;
  const finalPrice   = hasDiscount ? price - price * (promoPercent / 100) : price;

  const cartItem  = cart.find((i) => i.productID === product.productID);
  const qtyInCart = cartItem?.qty || 0;

  const handleAdd = () => {
    if (outOfStock) return;
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <div className={`
      bg-white rounded-3xl overflow-hidden flex flex-col relative
      border border-line/60
      shadow-card
      hover:shadow-lifted hover:-translate-y-0.5
      transition-all duration-200
      ${hasDiscount ? "ribbon" : ""}
    `}
      data-ribbon={hasDiscount ? `-${promoPercent}%` : undefined}
    >
      {/* Image */}
      <div className="h-28 sm:h-32 bg-canvas relative flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={imageUrl(product.image)}
            alt={product.productName}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <span className="text-4xl" aria-hidden>🛒</span>
        )}

        {outOfStock && (
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="text-white text-[11px] font-bold tracking-wide bg-ink/60 px-3 py-1.5 rounded-full">
              Out of stock
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-[13px] font-medium text-ink line-clamp-2 flex-1 leading-snug">
          {product.productName}
        </h3>

        {/* Price + action */}
        <div className="mt-2.5 flex items-end justify-between gap-1">
          <div>
            {hasDiscount && (
              <span className="text-[10px] text-ink-faint line-through block tabular-nums leading-none mb-0.5">
                ${price.toFixed(2)}
              </span>
            )}
            <span className="text-base font-extrabold text-ink tabular-nums leading-none">
              ${finalPrice.toFixed(2)}
            </span>
          </div>

          {outOfStock ? (
            <span className="text-[11px] text-ink-faint font-medium">Unavailable</span>
          ) : qtyInCart > 0 ? (
            /* Qty stepper */
            <div className="flex items-center gap-1 bg-brand-light rounded-full p-0.5">
              <button
                onClick={() => decreaseQty(product.productID)}
                className="
                  w-6 h-6 rounded-full bg-white text-brand
                  flex items-center justify-center
                  shadow-sm border border-line/60
                  active:scale-90 transition-transform
                "
                aria-label="Decrease"
              >
                <Minus size={11} strokeWidth={2.5} />
              </button>
              <span className="text-sm font-bold text-brand w-5 text-center tabular-nums">
                {qtyInCart}
              </span>
              <button
                onClick={handleAdd}
                className="
                  w-6 h-6 rounded-full bg-brand text-white
                  flex items-center justify-center
                  shadow-sm
                  active:scale-90 transition-transform
                "
                aria-label="Increase"
              >
                <Plus size={11} strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            /* Add button */
            <button
              onClick={handleAdd}
              aria-label={`Add ${product.productName} to cart`}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center
                transition-all duration-200 active:scale-90
                ${justAdded
                  ? "bg-accent text-white shadow-btn-coral scale-95"
                  : "bg-brand text-white shadow-btn hover:bg-brand-dark"
                }
              `}
            >
              {justAdded
                ? <span className="text-sm">✓</span>
                : <Plus size={16} strokeWidth={2.5} />
              }
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
