// import { Link, useLocation } from "react-router-dom";

// export default function OrderSuccess() {
//   const { state } = useLocation();

//   return (
//     <div className="max-w-md mx-auto px-4 py-16 text-center">
//       <div className="text-5xl mb-4" aria-hidden>
//         ✅
//       </div>
//       <h1 className="font-display font-bold text-2xl mb-2">Order received</h1>
//       <p className="text-market-ink/60 mb-1">
//         {state?.orderID ? `Order #${state.orderID}` : "Your order"} has been sent for review.
//       </p>
//       <p className="text-market-ink/60 mb-8 text-sm">
//         We'll confirm your payment and start preparing your order shortly.
//       </p>

//       <div className="flex flex-col gap-2.5">
//         <Link
//           to="/orders"
//           className="bg-market-green text-white font-semibold py-2.5 rounded-lg hover:bg-market-greenDark"
//         >
//           View my orders
//         </Link>
//         <Link
//           to="/products"
//           className="text-market-green font-medium py-2.5 hover:underline"
//         >
//           Continue shopping
//         </Link>
//       </div>
//     </div>
//   );
// }

import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function OrderSuccess() {
  const { state } = useLocation();

  return (
    <div className="max-w-sm mx-auto px-4 py-20 text-center pb-28 animate-fade-in">

      {/* Animated success ring */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-brand-light animate-pulse-brand" />
        <div className="relative w-24 h-24 rounded-full bg-brand-light border-2 border-brand/20 flex items-center justify-center">
          <CheckCircle2 size={40} className="text-brand" strokeWidth={1.5} />
        </div>
      </div>

      <h1 className="font-display font-extrabold text-2xl text-ink mb-2">
        Order received!
      </h1>
      <p className="text-ink-muted mb-1">
        {state?.orderID
          ? <><span className="font-bold text-ink">Order #{state.orderID}</span> has been sent for review.</>
          : "Your order has been sent for review."
        }
      </p>
      <p className="text-ink-faint text-sm mb-10 leading-relaxed">
        We'll verify your payment and start preparing your order shortly.
      </p>

      <div className="flex flex-col gap-3">
        <Link
          to="/orders"
          className="btn-primary font-display text-[15px]"
        >
          View my orders <ArrowRight size={16} strokeWidth={2.5} />
        </Link>
        <Link
          to="/products"
          className="text-brand font-bold py-2.5 text-sm hover:underline"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
