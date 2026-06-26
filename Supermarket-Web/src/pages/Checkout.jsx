

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { api, imageUrl } from "../api/client";
import LocationPicker from "../components/LocationPicker";
import { ArrowLeft, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

const PAYMENT_METHODS = [
  { id: "ABA",    label: "ABA Pay",  emoji: "💙", link: "https://pay.ababank.com/oRF8/cg0exqtf" },
  { id: "ACLEDA", label: "ACLEDA",   emoji: "🏦", link: "https://www.acledabank.com.kh/kh/eng/" },
];

export default function Checkout() {
  const { cart, subtotal, totalDiscount, totalPrice, clearCart, lineFinalPrice } = useCart();
  const { customer } = useAuth();
  const navigate = useNavigate();

  const [name, setName]             = useState(customer?.name    || "");
  const [phone, setPhone]           = useState(customer?.phone   || "");
  const [address, setAddress]       = useState(customer?.address || "");
  const [showPicker, setShowPicker] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [error, setError]           = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (cart.length === 0) {
    navigate("/cart", { replace: true });
    return null;
  }

  const handleLocationSelect = (loc) => { setAddress(loc.address); setShowPicker(false); };

  const handleSubmit = async () => {
    setError("");
    if (!name.trim())    return setError("Please enter your name.");
    if (!phone.trim())   return setError("Please enter your phone number.");
    if (!address.trim()) return setError("Please choose a delivery address.");
    if (!paymentMethod)  return setError("Please select a payment method.");

    setSubmitting(true);
    try {
      const stockCheck = await api.post("/api/products/check-stock", {
        items: cart.map((i) => ({ productID: i.productID, quantity: i.qty })),
      });
      if (!stockCheck.allInStock) {
        const names = stockCheck.unavailable.map((u) => u.productName).join(", ");
        setError(`Sorry, these items don't have enough stock: ${names}. Please update your cart.`);
        return;
      }
      const result = await api.post("/api/web-orders", {
        customerName:   name.trim(), phone: phone.trim(), address: address.trim(),
        paymentMethod,  subtotalAmount: subtotal, discountAmount: totalDiscount, totalAmount: totalPrice,
        items: cart.map((i) => ({ productID: i.productID, productName: i.productName, price: i.price, qty: i.qty })),
      }, { auth: true });

      const method = PAYMENT_METHODS.find((m) => m.id === paymentMethod);
      if (method) window.open(method.link, "_blank");
      clearCart();
      navigate("/order-payment", { state: { orderID: result.orderID, total: totalPrice } });
    } catch (err) {
      setError(err.message || "Could not place your order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-36 animate-fade-in">

      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-line/50 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-2xl bg-canvas border border-line/60 flex items-center justify-center text-ink hover:bg-brand-light hover:border-brand/30 transition-all"
          aria-label="Go back"
        >
          <ArrowLeft size={17} strokeWidth={2} />
        </button>
        <h1 className="font-display font-extrabold text-lg text-ink">Checkout</h1>
      </div>

      <div className="px-4 space-y-4 pt-4">

        {/* ── ORDER SUMMARY ──────────────────────────────────────── */}
        <section className="card-surface p-4">
          <p className="section-label">
            <span>📦</span> Order summary
          </p>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.productID} className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-canvas overflow-hidden shrink-0 border border-line/40">
                  {item.image
                    ? <img src={imageUrl(item.image)} alt={item.productName} className="h-full w-full object-cover" />
                    : <span className="text-xl flex items-center justify-center h-full" aria-hidden>🛒</span>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-ink truncate">{item.productName} × {item.qty}</p>
                  {item.promotionPercent
                    ? <span className="text-[10px] text-accent font-bold bg-accent-light px-2 py-0.5 rounded-full">-{item.promotionPercent}% off</span>
                    : null
                  }
                </div>
                <span className="text-sm font-extrabold text-ink tabular-nums">
                  ${(lineFinalPrice(item) * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-line/60 mt-3 pt-3 space-y-2">
            <div className="flex justify-between text-sm text-ink-muted">
              <span>Subtotal</span>
              <span className="tabular-nums font-medium text-ink">${subtotal.toFixed(2)}</span>
            </div>
            {totalDiscount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-accent font-semibold">Discount</span>
                <span className="tabular-nums font-bold text-accent">-${totalDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-extrabold text-base text-ink pt-1">
              <span>Total</span>
              <span className="tabular-nums text-brand">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </section>

        {/* ── DELIVERY INFO ──────────────────────────────────────── */}
        <section className="card-surface p-4">
          <p className="section-label"><span>📍</span> Delivery info</p>
          <div className="space-y-2.5">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-base"
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-base"
            />
            <button
              type="button"
              onClick={() => setShowPicker(true)}
              className={`
                w-full flex items-center gap-3 px-4 py-3.5
                border-2 rounded-2xl text-sm transition-all
                ${address
                  ? "border-brand bg-brand-light text-ink"
                  : "border-dashed border-line hover:border-brand/50 bg-white text-ink-faint"
                }
              `}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${address ? "bg-brand" : "bg-canvas"}`}>
                <MapPin size={13} className={address ? "text-white" : "text-ink-faint"} />
              </div>
              <span className="flex-1 text-left truncate font-medium">
                {address || "Tap to choose delivery location"}
              </span>
              {address && <CheckCircle2 size={16} className="text-brand shrink-0" />}
            </button>
          </div>
        </section>

        {/* ── PAYMENT METHOD ─────────────────────────────────────── */}
        <section className="card-surface p-4">
          <p className="section-label"><span>💳</span> Payment method</p>
          <div className="grid grid-cols-2 gap-3">
            {PAYMENT_METHODS.map((m) => {
              const selected = paymentMethod === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={`
                    flex flex-col items-center justify-center gap-2 py-5
                    rounded-2xl border-2 transition-all duration-200
                    ${selected
                      ? "border-brand bg-brand-light shadow-glow"
                      : "border-line bg-white hover:border-brand/40 hover:bg-brand-light/30"
                    }
                  `}
                >
                  <span className="text-3xl" aria-hidden>{m.emoji}</span>
                  <span className="text-sm font-bold text-ink">{m.label}</span>
                  {selected && (
                    <span className="flex items-center gap-1 text-[11px] text-brand font-bold">
                      <CheckCircle2 size={11} /> Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-ink-faint mt-3 leading-relaxed">
            You'll be taken to the payment app after confirming. Then upload your payment screenshot.
          </p>
        </section>

        {/* ── ERROR ──────────────────────────────────────────────── */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 text-sm text-danger font-medium animate-slide-up">
            {error}
          </div>
        )}
      </div>

      {/* ── STICKY SEND ORDER ──────────────────────────────────── */}
      <div className="fixed bottom-14 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-line/50 shadow-sticky z-30 px-4 py-3">
        <div className="max-w-3xl mx-auto ">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-coral disabled:opacity-60 font-display text-[15px] p-2"
          >
            {submitting ? "Placing order…" : (
              <>
                <CheckCircle2 size={17} strokeWidth={2.5} />
                Send order
                <span className="ml-auto font-mono tabular-nums">${totalPrice.toFixed(2)}</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </>
            )}
          </button>
        </div>
      </div>

      {showPicker && (
        <LocationPicker onSelect={handleLocationSelect} onClose={() => setShowPicker(false)} />
      )}
    </div>
  );
}
