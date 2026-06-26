// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { api } from "../api/client";

// export function OrderPayment() {
//   const { state } = useLocation();
//   const navigate  = useNavigate();

//   const [file, setFile]         = useState(null);
//   const [preview, setPreview]   = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError]       = useState("");

//   if (!state?.orderID) {
//     navigate("/", { replace: true });
//     return null;
//   }

//   const handleFileChange = (e) => {
//     const f = e.target.files[0];
//     if (!f) return;
//     setFile(f);
//     setPreview(URL.createObjectURL(f));
//   };

//   const handleConfirm = async () => {
//     setError("");
//     if (!file) return setError("Please upload a screenshot of your payment confirmation.");
//     setUploading(true);
//     try {
//       const form = new FormData();
//       form.append("orderID", state.orderID);
//       form.append("image", file);
//       await api.postForm("/api/payment-proof", form, { auth: true });
//       navigate("/order-success", { state: { orderID: state.orderID } });
//     } catch (err) {
//       setError(err.message || "Could not upload your payment proof. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="max-w-sm mx-auto px-4 py-10 pb-28">
//       <div className="text-center mb-6">
//         <p className="text-5xl mb-3" aria-hidden>📸</p>
//         <h1 className="font-bold text-xl text-ink">Upload payment proof</h1>
//         <p className="text-ink-muted text-sm mt-1">
//           Order #{state.orderID} · Total ${state.total?.toFixed(2)}
//         </p>
//       </div>

//       <div className="bg-white rounded-2xl shadow-card p-5">
//         <p className="text-sm text-ink-muted mb-4 leading-relaxed">
//           After completing payment, take a screenshot of the confirmation and upload it here.
//         </p>

//         <label className="block cursor-pointer">
//           <div className={`border-2 border-dashed rounded-2xl h-48 flex items-center justify-center overflow-hidden transition-colors ${
//             preview ? "border-accent" : "border-line hover:border-brand"
//           }`}>
//             {preview ? (
//               <img src={preview} alt="Payment proof" className="h-full w-full object-contain" />
//             ) : (
//               <div className="text-center">
//                 <p className="text-3xl mb-2" aria-hidden>📁</p>
//                 <p className="text-sm text-ink-muted">Tap to choose or take a photo</p>
//               </div>
//             )}
//           </div>
//           <input
//             type="file"
//             accept="image/*"
//             capture="environment"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//         </label>

//         {error && (
//           <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-600 mt-3">
//             {error}
//           </div>
//         )}

//         <button
//           onClick={handleConfirm}
//           disabled={uploading || !file}
//           className="mt-4 w-full bg-brand text-white font-bold py-3.5 rounded-full hover:bg-brand-dark transition-colors disabled:opacity-60 text-sm"
//         >
//           {uploading ? "Uploading…" : "Confirm order"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export function OrderSuccess() {
//   const { state } = useLocation();

//   return (
//     <div className="max-w-sm mx-auto px-4 py-20 text-center pb-28">
//       <div className="w-20 h-20 rounded-full bg-accent-light flex items-center justify-center text-4xl mx-auto mb-5">
//         ✅
//       </div>
//       <h1 className="font-bold text-2xl text-ink mb-2">Order received!</h1>
//       <p className="text-ink-muted mb-1">
//         {state?.orderID ? `Order #${state.orderID}` : "Your order"} has been sent for review.
//       </p>
//       <p className="text-ink-muted text-sm mb-8 leading-relaxed">
//         We'll confirm your payment and start preparing your order shortly.
//       </p>

//       <div className="flex flex-col gap-3">
//         <a
//           href="/orders"
//           className="bg-brand text-white font-bold py-3.5 rounded-full hover:bg-brand-dark transition-colors text-sm"
//         >
//           View my orders
//         </a>
//         <a
//           href="/products"
//           className="text-brand font-semibold py-2.5 text-sm hover:underline"
//         >
//           Continue shopping
//         </a>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { Camera, Upload, ArrowRight, CheckCircle2 } from "lucide-react";

/* ── ORDER PAYMENT ────────────────────────────────────────────────── */
export function OrderPayment() {
  const { state } = useLocation();
  const navigate  = useNavigate();

  const [file, setFile]           = useState(null);
  const [preview, setPreview]     = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError]         = useState("");

  if (!state?.orderID) { navigate("/", { replace: true }); return null; }

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleConfirm = async () => {
    setError("");
    if (!file) return setError("Please upload a screenshot of your payment confirmation.");
    setUploading(true);
    try {
      const form = new FormData();
      form.append("orderID", state.orderID);
      form.append("image", file);
      await api.postForm("/api/payment-proof", form, { auth: true });
      navigate("/order-success", { state: { orderID: state.orderID } });
    } catch (err) {
      setError(err.message || "Could not upload your payment proof. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-10 pb-28 animate-fade-in">

      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-18 h-18 rounded-3xl bg-brand-light border border-brand/20 flex items-center justify-center text-4xl mx-auto mb-4 shadow-card">
          📸
        </div>
        <h1 className="font-display font-extrabold text-xl text-ink">Upload payment proof</h1>
        <p className="text-ink-muted text-sm mt-1.5">
          Order <span className="font-bold text-ink">#{state.orderID}</span>
          {" · "}
          <span className="font-bold text-brand">${state.total?.toFixed(2)}</span>
        </p>
      </div>

      <div className="card-surface p-5">
        <p className="text-sm text-ink-muted mb-4 leading-relaxed">
          After completing payment, take a screenshot of the confirmation and upload it here.
        </p>

        <label className="block cursor-pointer group">
          <div className={`
            border-2 rounded-3xl h-52 flex items-center justify-center overflow-hidden
            transition-all duration-200
            ${preview
              ? "border-brand shadow-glow"
              : "border-dashed border-line group-hover:border-brand/50 bg-canvas"
            }
          `}>
            {preview ? (
              <img src={preview} alt="Payment proof" className="h-full w-full object-contain" />
            ) : (
              <div className="text-center px-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-light border border-brand/20 flex items-center justify-center mx-auto mb-3">
                  <Camera size={24} className="text-brand" />
                </div>
                <p className="text-sm font-semibold text-ink-muted">Tap to take or choose a photo</p>
                <p className="text-xs text-ink-faint mt-1">JPG, PNG up to 10MB</p>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {preview && (
          <label className="
            mt-3 flex items-center justify-center gap-2
            text-sm text-brand font-semibold cursor-pointer
            hover:underline
          ">
            <Upload size={14} />
            Change photo
            <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} className="hidden" />
          </label>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-sm text-danger font-medium mt-3 animate-slide-up">
            {error}
          </div>
        )}

        <button
          onClick={handleConfirm}
          disabled={uploading || !file}
          className="btn-primary mt-4 disabled:opacity-60 font-display text-[15px]"
        >
          {uploading ? "Uploading…" : (
            <>Confirm order <ArrowRight size={16} strokeWidth={2.5} /></>
          )}
        </button>
      </div>
    </div>
  );
}

/* ── ORDER SUCCESS ────────────────────────────────────────────────── */
export function OrderSuccess() {
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

      <h1 className="font-display font-extrabold text-2xl text-ink mb-2">Order received!</h1>
      <p className="text-ink-muted mb-1">
        {state?.orderID
          ? <><span className="font-bold text-ink">Order #{state.orderID}</span> has been sent for review.</>
          : "Your order has been sent for review."
        }
      </p>
      <p className="text-ink-faint text-sm mb-10 leading-relaxed">
        We'll confirm your payment and start preparing your order shortly.
      </p>

      <div className="flex flex-col gap-3">
        <a
          href="/orders"
          className="btn-primary font-display text-[15px]"
        >
          View my orders <ArrowRight size={16} strokeWidth={2.5} />
        </a>
        <a
          href="/products"
          className="text-brand font-bold py-2.5 text-sm hover:underline"
        >
          Continue shopping
        </a>
      </div>
    </div>
  );
}
