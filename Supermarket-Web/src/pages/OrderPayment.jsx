// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { api } from "../api/client";

// export default function OrderPayment() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState("");

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
//     if (!file) {
//       setError("Please upload a screenshot of your payment confirmation.");
//       return;
//     }

//     setUploading(true);
//     try {
//       const formData = new FormData();
//       formData.append("orderID", state.orderID);
//       formData.append("image", file);

//       await api.postForm("/api/payment-proof", formData, { auth: true });

//       navigate("/order-success", { state: { orderID: state.orderID } });
//     } catch (err) {
//       setError(err.message || "Could not upload your payment proof. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto px-4 py-10">
//       <div className="text-center mb-6">
//         <div className="text-4xl mb-2" aria-hidden>
//           📸
//         </div>
//         <h1 className="font-display font-bold text-xl">Upload payment proof</h1>
//         <p className="text-market-ink/60 text-sm mt-1">
//           Order #{state.orderID} · Total ${state.total?.toFixed(2)}
//         </p>
//       </div>

//       <div className="bg-white rounded-xl shadow-card p-5">
//         <p className="text-sm text-market-ink/70 mb-3">
//           After completing payment in the app, take a screenshot of the confirmation
//           and upload it here so we can verify and process your order.
//         </p>

//         <label className="block">
//           <div className="border-2 border-dashed border-market-line rounded-xl h-44 flex items-center justify-center overflow-hidden cursor-pointer hover:border-market-green transition-colors">
//             {preview ? (
//               <img src={preview} alt="Payment proof preview" className="h-full w-full object-contain" />
//             ) : (
//               <span className="text-market-ink/40 text-sm">Tap to choose or take a photo</span>
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
//           <p className="text-sm text-market-orangeDark bg-market-orange/10 px-3 py-2 rounded-lg mt-3">
//             {error}
//           </p>
//         )}

//         <button
//           onClick={handleConfirm}
//           disabled={uploading}
//           className="mt-4 w-full bg-market-green text-white font-semibold py-3 rounded-lg hover:bg-market-greenDark disabled:opacity-60"
//         >
//           {uploading ? "Uploading..." : "Confirm order"}
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { Camera, Upload, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

export default function OrderPayment() {
  const { state } = useLocation();
  const navigate  = useNavigate();

  const [file, setFile]             = useState(null);
  const [preview, setPreview]       = useState(null);
  const [amountPaid, setAmountPaid] = useState("");
  const [uploading, setUploading]   = useState(false);
  const [error, setError]           = useState("");

  if (!state?.orderID) {
    navigate("/", { replace: true });
    return null;
  }

  const total = state.total || 0;
  const paid  = parseFloat(amountPaid) || 0;
  const isUnderpaid = amountPaid !== "" && paid < total;
  const isOverpaid  = amountPaid !== "" && paid > total;

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleConfirm = async () => {
    setError("");
    if (!file) return setError("Please upload a screenshot of your payment.");
    if (!amountPaid || paid <= 0) return setError("Please enter the amount you paid.");

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("orderID",    state.orderID);
      formData.append("image",      file);
      formData.append("amountPaid", amountPaid);

      await api.postForm("/api/payment-proof", formData, { auth: true });
      navigate("/order-success", { state: { orderID: state.orderID } });
    } catch (err) {
      setError(err.message || "Could not upload. Please try again.");
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
          <span className="font-bold text-brand">${total.toFixed(2)}</span> to pay
        </p>
      </div>

      <div className="card-surface p-5 space-y-4">

        {/* Step 1 — Pay via app */}
        <div>
          <p className="section-label"><span>1️⃣</span> Pay in your banking app</p>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://pay.ababank.com/oRF8/cg0exqtf"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex flex-col items-center gap-2 py-4
                bg-blue-50 border-2 border-blue-100 rounded-2xl
                hover:border-blue-300 transition-all active:scale-95
              "
            >
              <span className="text-3xl">💙</span>
              <span className="text-sm font-bold text-ink">ABA Pay</span>
              <span className="text-[10px] text-blue-500 font-semibold">Tap to open →</span>
            </a>
            <a
              href="https://www.acledabank.com.kh/kh/eng/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex flex-col items-center gap-2 py-4
                bg-purple-50 border-2 border-purple-100 rounded-2xl
                hover:border-purple-300 transition-all active:scale-95
              "
            >
              <span className="text-3xl">🏦</span>
              <span className="text-sm font-bold text-ink">ACLEDA</span>
              <span className="text-[10px] text-purple-500 font-semibold">Tap to open →</span>
            </a>
          </div>
        </div>

        {/* Step 2 — Enter amount */}
        <div>
          <p className="section-label"><span>2️⃣</span> Enter amount you paid</p>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-ink-muted">$</span>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder={total.toFixed(2)}
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              className={`
                input-base pl-8
                ${isUnderpaid ? "border-red-400 focus:border-red-400 bg-red-50" : ""}
                ${isOverpaid  ? "border-yellow/60 focus:border-yellow/60 bg-yellow-light" : ""}
              `}
            />
          </div>

          {/* Amount feedback */}
          {isUnderpaid && (
            <div className="flex items-center gap-2 mt-2 text-xs text-red-600 font-semibold bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              <AlertCircle size={13} />
              You entered ${paid.toFixed(2)} — that's ${(total - paid).toFixed(2)} short of the order total.
              Please pay the full amount.
            </div>
          )}
          {isOverpaid && (
            <div className="flex items-center gap-2 mt-2 text-xs text-yellow-700 font-semibold bg-yellow-light border border-yellow/30 rounded-xl px-3 py-2">
              <AlertCircle size={13} />
              You entered ${paid.toFixed(2)} — that's ${(paid - total).toFixed(2)} over. We'll refund the difference.
            </div>
          )}
          {amountPaid !== "" && !isUnderpaid && !isOverpaid && (
            <div className="flex items-center gap-2 mt-2 text-xs text-brand font-semibold bg-brand-light border border-brand/20 rounded-xl px-3 py-2">
              <CheckCircle2 size={13} />
              Amount matches order total ✓
            </div>
          )}
        </div>

        {/* Step 3 — Upload screenshot */}
        <div>
          <p className="section-label"><span>3️⃣</span> Upload payment screenshot</p>

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
                  <p className="text-xs text-ink-faint mt-1">Screenshot of your payment confirmation</p>
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
            <label className="mt-2 flex items-center justify-center gap-2 text-sm text-brand font-semibold cursor-pointer hover:underline">
              <Upload size={14} /> Change photo
              <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} className="hidden" />
            </label>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-sm text-danger font-medium flex items-center gap-2">
            <AlertCircle size={15} /> {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleConfirm}
          disabled={uploading || !file || !amountPaid}
          className="btn-primary disabled:opacity-50 font-display text-[15px]"
        >
          {uploading ? "Uploading…" : (
            <>Confirm payment <ArrowRight size={16} strokeWidth={2.5} /></>
          )}
        </button>

        <p className="text-xs text-ink-faint text-center leading-relaxed">
          Our team will verify your payment and start packing your order.
        </p>
      </div>
    </div>
  );
}

