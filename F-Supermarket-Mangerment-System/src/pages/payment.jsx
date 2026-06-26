// import { useEffect, useState } from "react";
// import { khqrData, BakongKHQR, IndividualInfo } from "bakong-khqr";

// const API_SALES = "http://172.20.10.14:8081/api/sales";

// // Your merchant/individual info from Bakong
// const BAKONG_ACCOUNT_ID = ""; // from your bank app/portal
// const MERCHANT_NAME = "Heng Supermarket";
// const MERCHANT_CITY = "Phnom Penh";

// export default function Payment() {
//   const [sale, setSale] = useState(null);
//   const [qrImage, setQrImage] = useState(null);

//   useEffect(() => {
//     const interval = setInterval(fetchPending, 2000);
//     fetchPending();
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (sale) {
//       generateKHQR(sale.sale);
//     } else {
//       setQrImage(null);
//     }
//   }, [sale]);

//   const fetchPending = () => {
//     fetch(`${API_SALES}/pending`)
//       .then((res) => res.json())
//       .then((data) => setSale(data))
//       .catch((err) => console.log(err));
//   };

//   const generateKHQR = (s) => {
//     try {
//       const optionalData = {
//         currency: khqrData.currency.usd, // or khqrData.currency.khr
//         amount: Number(s.totalAmount),
//         billNumber: `INV-${s.saleID}`,
//         storeLabel: MERCHANT_NAME,
//         terminalLabel: "POS-01",
//       };

//       const individualInfo = new IndividualInfo(
//         BAKONG_ACCOUNT_ID,
//         MERCHANT_NAME,
//         MERCHANT_CITY,
//         optionalData
//       );

//       const khqr = new BakongKHQR();
//       const response = khqr.generateIndividual(individualInfo);

//       if (response.status.code === 0) {
//         // response.data.qr = the EMV string to encode as QR image
//         const qrString = encodeURIComponent(response.data.qr);
//         setQrImage(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qrString}`);
//       } else {
//         console.log("KHQR error:", response.status);
//       }
//     } catch (err) {
//       console.log("KHQR generation failed:", err);
//     }
//   };

//   const handleMarkPaid = (method) => {
//     fetch(`${API_SALES}/${sale.sale.saleID}/complete`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ paymentMethod: method }),
//     })
//       .then((res) => res.json())
//       .then(() => setSale(null))
//       .catch((err) => console.log(err));
//   };

//   if (!sale) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{ background: "#1F2A3D" }}>
//         <p className="text-white text-2xl">Waiting for next order...</p>
//       </div>
//     );
//   }

//   const { sale: s, items } = sale;

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#1F2A3D" }}>
//       <div className="bg-white rounded-lg p-8 w-full max-w-md text-center">
//         <h1 className="text-xl font-semibold mb-1">Order #{s.saleID}</h1>
//         <p className="text-sm text-gray-500 mb-4">{s.customerName}</p>

//         <div className="text-left mb-4 max-h-48 overflow-y-auto">
//           {items.map((item) => (
//             <div key={item.saleItemID} className="flex justify-between text-sm py-1 border-b border-gray-100">
//               <span>{item.productName} x{item.quantity}</span>
//               <span>${Number(item.subtotal).toFixed(2)}</span>
//             </div>
//           ))}
//         </div>

//         <p className="text-3xl font-bold mb-4">${Number(s.totalAmount).toFixed(2)}</p>

//         {qrImage ? (
//           <img src={qrImage} alt="KHQR Code" className="mx-auto mb-4" />
//         ) : (
//           <p className="text-sm text-gray-400 mb-4">Generating QR...</p>
//         )}

//         <div className="flex gap-2">
//           <button onClick={() => handleMarkPaid("cash")} className="flex-1 py-3 rounded text-white" style={{ background: "#22C55E" }}>
//             Cash
//           </button>
//           <button onClick={() => handleMarkPaid("card")} className="flex-1 py-3 rounded text-white" style={{ background: "#6366F1" }}>
//             KHQR Paid
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useEffect, useState } from "react";

// const API_SALES = "http://172.20.10.14:8081/api/sales";

// export default function Payment() {
//   const [sale, setSale] = useState(null);

//   useEffect(() => {
//     const interval = setInterval(fetchPending, 2000);
//     fetchPending();
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (!sale?.sale?.khqrMd5) return;
//     const interval = setInterval(() => {
//       fetch(`${API_SALES}/check-payment/${sale.sale.khqrMd5}`)
//         .then((res) => res.json())
//         .then((data) => { if (data.paid) handleMarkPaid("khqr"); })
//         .catch(console.log);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [sale]);

//   const fetchPending = () => {
//     fetch(`${API_SALES}/pending`)
//       .then((res) => res.json())
//       .then((data) => setSale(data))
//       .catch(console.log);
//   };

//   const handleMarkPaid = (method) => {
//     fetch(`${API_SALES}/${sale.sale.saleID}/complete`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ paymentMethod: method }),
//     })
//       .then((res) => res.json())
//       .then(() => setSale(null))
//       .catch(console.log);
//   };

//   if (!sale) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{ background: "#1F2A3D" }}>
//         <p className="text-white text-2xl">Waiting for next order...</p>
//       </div>
//     );
//   }

//   const { sale: s, items } = sale;

//   // QR image: prefer stored file path, fall back to QR API from khqrString
// //   const qrImage = s.khqrImagePath
// //     ? `http://172.20.10.14:8081${s.khqrImagePath}`       // ← stored image
// //     : s.khqrString
// //     ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(s.khqrString)}`
// //     : null;

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#1F2A3D" }}>
//       <div className="flex w-full max-w-2xl rounded-xl overflow-hidden shadow-lg" style={{ background: "#fff" }}>

//         {/* LEFT — QR Code */}
// <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8" style={{ background: "#F8F9FA", borderRight: "1px solid #E5E7EB" }}>
//   <p className="text-base font-semibold text-gray-700">Scan to Pay</p>

//   {s.khqrImagePath ? (
//     <img
//       src={`http://172.20.10.14:8081${s.khqrImagePath}`}
//       alt="KHQR Code"
//       className="w-52 h-52 rounded-lg border border-gray-200 object-contain bg-white"
//     />
//   ) : (
//     <div className="w-52 h-52 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 text-sm text-center">
//       QR not available
//     </div>
//   )}

//   <p className="text-xs text-gray-400">Scan with your banking app</p>
//   <p className="text-xs text-gray-500 font-medium">KHQR Payment</p>
// </div>

//         {/* RIGHT — Invoice */}
//         <div className="flex-1 flex flex-col p-6">
//           <div className="mb-4">
//             <h1 className="text-lg font-semibold">Order #{s.saleID}</h1>
//             <p className="text-sm text-gray-500">{s.customerName}</p>
//           </div>

//           <div className="flex-1 border-t border-gray-100 pt-3 mb-3 overflow-y-auto max-h-48">
//             {items.map((item) => (
//               <div key={item.saleItemID} className="flex justify-between text-sm py-1.5 border-b border-gray-100">
//                 <span className="text-gray-600">{item.productName} x{item.quantity}</span>
//                 <span>${Number(item.subtotal).toFixed(2)}</span>
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-between items-baseline border-t border-gray-300 py-3">
//             <span className="text-sm font-medium text-gray-500">Total</span>
//             <span className="text-3xl font-bold">${Number(s.totalAmount).toFixed(2)}</span>
//           </div>

//           <div className="grid grid-cols-2 gap-2 mt-auto">
//             <button onClick={() => handleMarkPaid("cash")} className="py-3 rounded-lg text-white font-medium" style={{ background: "#22C55E" }}>
//               Cash
//             </button>
//             <button onClick={() => handleMarkPaid("khqr")} className="py-3 rounded-lg text-white font-medium" style={{ background: "#6366F1" }}>
//               KHQR (manual)
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


// import { useEffect, useState, useRef } from "react";

// const API_SALES = "http://172.20.10.14:8081/api/sales";

// export default function Payment() {
//   const [sale, setSale] = useState(null);
//   const [qrPreview, setQrPreview] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     fetchLatest();
//   }, []);

//   const fetchLatest = () => {
//     fetch(`${API_SALES}/pending`)
//       .then((res) => res.json())
//       .then((data) => {
//         setSale(data);
//         setQrPreview(null);
//       })
//       .catch(console.log);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file || !sale) return;

//     // Show local preview immediately
//     setQrPreview(URL.createObjectURL(file));

//     const formData = new FormData();
//     formData.append("qrImage", file);

//     setUploading(true);
//     fetch(`${API_SALES}/${sale.sale.saleID}/upload-qr`, {
//       method: "POST",
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setSale((prev) => ({
//           ...prev,
//           sale: { ...prev.sale, khqrImagePath: data.khqrImagePath },
//         }));
//       })
//       .catch(console.log)
//       .finally(() => setUploading(false));
//   };

//   const handleMarkPaid = (method) => {
//     fetch(`${API_SALES}/${sale.sale.saleID}/complete`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ paymentMethod: method }),
//     })
//       .then((res) => res.json())
//       .then(() => fetchLatest())
//       .catch(console.log);
//   };

//   if (!sale) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" style={{ background: "#1F2A3D" }}>
//         <p className="text-white text-2xl">No orders yet</p>
//       </div>
//     );
//   }

//   const { sale: s, items } = sale;
//   const displayQr = qrPreview || (s.khqrImagePath ? `http://172.20.10.14:8081${s.khqrImagePath}` : null);

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#1F2A3D" }}>
//       <div className="flex w-full max-w-2xl rounded-xl overflow-hidden shadow-lg" style={{ background: "#fff" }}>

//         {/* LEFT — Invoice (always visible) */}
//         <div className="flex-1 flex flex-col p-6">
//           <div className="mb-4">
//             <h1 className="text-lg font-semibold">Order #{s.saleID}</h1>
//             <p className="text-sm text-gray-500">{s.customerName}</p>
//           </div>

//           <div className="flex-1 border-t border-gray-100 pt-3 mb-3 overflow-y-auto max-h-48">
//             {items.map((item) => (
//               <div key={item.saleItemID} className="flex justify-between text-sm py-1.5 border-b border-gray-100">
//                 <span className="text-gray-600">{item.productName} x{item.quantity}</span>
//                 <span>${Number(item.subtotal).toFixed(2)}</span>
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-between items-baseline border-t border-gray-300 py-3">
//             <span className="text-sm font-medium text-gray-500">Total</span>
//             <span className="text-3xl font-bold">${Number(s.totalAmount).toFixed(2)}</span>
//           </div>

//           <div className="grid grid-cols-2 gap-2 mt-auto">
//             <button onClick={() => handleMarkPaid("cash")} className="py-3 rounded-lg text-white font-medium" style={{ background: "#22C55E" }}>
//               Cash
//             </button>
//             <button onClick={() => handleMarkPaid("khqr")} className="py-3 rounded-lg text-white font-medium" style={{ background: "#6366F1" }}>
//               KHQR
//             </button>
//           </div>
//         </div>

//         {/* RIGHT — QR upload (manual, from file folder, like add product) */}
//         <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8" style={{ background: "#F8F9FA", borderLeft: "1px solid #E5E7EB" }}>
//           <p className="text-base font-semibold text-gray-700">QR Receipt</p>

//           {displayQr ? (
//             <img
//               src={displayQr}
//               alt="KHQR Code"
//               className="w-52 h-52 rounded-lg border border-gray-200 object-contain bg-white"
//             />
//           ) : (
//             <div className="w-52 h-52 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 text-sm text-center">
//               No QR uploaded
//             </div>
//           )}

//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="hidden"
//           />
//           <button
//             onClick={() => fileInputRef.current.click()}
//             disabled={uploading}
//             className="px-4 py-2 text-sm font-medium rounded text-white"
//             style={{ background: "#1F2A3D" }}
//           >
//             {uploading ? "Uploading..." : displayQr ? "Change QR Image" : "Upload QR Image"}
//           </button>

//           <p className="text-xs text-gray-400">Upload a QR screenshot for this order</p>
//         </div>

//       </div>
//     </div>
//   );
// }

import { useEffect, useState, useRef } from "react";

const API_SALES = "http://172.20.10.14:8081/api/sales";
const API_SETTINGS = "http://172.20.10.14:8081/api/settings";

export default function Payment() {
  const [sale, setSale] = useState(null);
  const [qrPath, setQrPath] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Poll latest sale every 2s so this page live-updates when another device confirms an order
  useEffect(() => {
    fetchLatestSale();
    const interval = setInterval(fetchLatestSale, 2000);
    return () => clearInterval(interval);
  }, []);

  // Fetch the global store QR once, and poll it too in case it's changed from another device
  useEffect(() => {
    fetchStoreQr();
    const interval = setInterval(fetchStoreQr, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchLatestSale = () => {
    fetch(`${API_SALES}/pending`)
      .then((res) => res.json())
      .then((data) => setSale(data))
      .catch(console.log);
  };

  const fetchStoreQr = () => {
    fetch(`${API_SETTINGS}/store-qr`)
      .then((res) => res.json())
      .then((data) => setQrPath(data.qrImagePath))
      .catch(console.log);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("qrImage", file);

    setUploading(true);
    fetch(`${API_SETTINGS}/store-qr`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => setQrPath(data.qrImagePath))
      .catch(console.log)
      .finally(() => setUploading(false));
  };

  const qrImageUrl = qrPath ? `http://172.20.10.14:8081${qrPath}?t=${Date.now()}` : null;

  if (!sale) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#1F2A3D" }}>
        <p className="text-white text-2xl">No orders yet</p>
      </div>
    );
  }

  const { sale: s, items } = sale;

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "#1F2A3D" }}>
      <div className="flex w-full max-w-2xl rounded-xl overflow-hidden shadow-lg" style={{ background: "#fff" }}>

        {/* LEFT — Invoice (always visible, live-updates from any device) */}
        <div className="flex-1 flex flex-col p-6">
          <div className="mb-4">
            <h1 className="text-lg font-semibold">Order #{s.saleID}</h1>
            <p className="text-sm text-gray-500">{s.customerName}</p>
          </div>

          <div className="flex-1 border-t border-gray-100 pt-3 mb-3 overflow-y-auto max-h-48">
            {items.map((item) => (
              <div key={item.saleItemID} className="flex justify-between text-sm py-1.5 border-b border-gray-100">
                <span className="text-gray-600">{item.productName} x{item.quantity}</span>
                <span>${Number(item.subtotal).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-baseline border-t border-gray-300 py-3">
            <span className="text-sm font-medium text-gray-500">Total</span>
            <span className="text-3xl font-bold">${Number(s.totalAmount).toFixed(2)}</span>
          </div>
        </div>

        {/* RIGHT — One persistent store QR, uploaded once, reused for every order */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8" style={{ background: "#F8F9FA", borderLeft: "1px solid #E5E7EB" }}>
          <p className="text-base font-semibold text-gray-700">Scan to Pay</p>

          {qrImageUrl ? (
            <img
              src={qrImageUrl}
              alt="Store QR Code"
              className="w-52 h-52 rounded-lg border border-gray-200 object-contain bg-white"
            />
          ) : (
            <div className="w-52 h-52 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 text-sm text-center">
              No QR uploaded
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            disabled={uploading}
            className="px-4 py-2 text-sm font-medium rounded text-white"
            style={{ background: "#1F2A3D" }}
          >
            {uploading ? "Uploading..." : qrImageUrl ? "Change QR Image" : "Upload QR Image"}
          </button>

          <p className="text-xs text-gray-400">This QR is shared for all orders</p>
        </div>

      </div>
    </div>
  );
}

