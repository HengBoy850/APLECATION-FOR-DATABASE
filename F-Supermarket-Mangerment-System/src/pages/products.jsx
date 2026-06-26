// import { useState, useEffect } from "react";

// const API_URL = "http://172.20.10.14:8081/api/products";

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [categories, setCategories] = useState([]);

//   const fetchProducts = () => {
//     fetch(API_URL)
//       .then((res) => res.json())
//       .then((data) => setProducts(Array.isArray(data) ? data : []))
//       .catch((err) => {
//         console.log(err);
//         setProducts([]);
//       });
//   };

//   useEffect(() => {
//     fetchProducts();

//     fetch("http://172.20.10.14:8081/api/categories")
//       .then((res) => res.json())
//       .then((data) => setCategories(data))
//       .catch((err) => console.log(err));
//   }, []);

//   const handleDelete = (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;

//     fetch(`${API_URL}/${id}`, { method: "DELETE" })
//       .then((res) => {
//         if (!res.ok) throw new Error("Delete failed");
//         return res.json();
//       })
//       .then(() => {
//         setProducts((prev) => prev.filter((p) => p.productID !== id));
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Failed to delete product.");
//       });
//   };

//   const handleAdd = () => {
//     setSelectedProduct({
//       productName: "",
//       categoryID: "",
//       price: "",
//       quantity: "",
//       image: "",
//     });
//     setPreviewImage(null);
//     setShowModal(true);
//   };

//   const handleEdit = (product) => {
//     setSelectedProduct(product);
//     setPreviewImage(
//       product.image ? `http://172.20.10.14:8081/uploads/${product.image}` : null
//     );
//     setShowModal(true);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setSelectedProduct((prev) => ({ ...prev, imageFile: file }));
//     setPreviewImage(URL.createObjectURL(file));
//   };

//   const handleSave = () => {
//     if (!selectedProduct.productName || !selectedProduct.categoryID) {
//       alert("Please fill in Product Name and Category ID");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("productName", selectedProduct.productName);
//     formData.append("categoryID", selectedProduct.categoryID);
//     formData.append("price", selectedProduct.price);
//     formData.append("quantity", selectedProduct.quantity);

//     if (selectedProduct.imageFile) {
//       formData.append("image", selectedProduct.imageFile);
//     }

//     const url = selectedProduct.productID
//       ? `${API_URL}/${selectedProduct.productID}`
//       : API_URL;

//     const method = selectedProduct.productID ? "PUT" : "POST";

//     fetch(url, { method, body: formData })
//       .then((res) => res.json())
//       .then(() => {
//         fetchProducts();
//         setShowModal(false);
//         setSelectedProduct(null);
//         setPreviewImage(null);
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleCancel = () => {
//     setShowModal(false);
//     setSelectedProduct(null);
//     setPreviewImage(null);
//   };

//   const filteredProducts = products.filter((p) =>
//     (p.productName || "").toLowerCase().includes(search.toLowerCase())
//   );

//   const getCategoryName = (id) => {
//     const cat = categories.find((c) => String(c.categoryID) === String(id));
//     return cat ? cat.categoryName : id;
//   };

//   return (
//     <div
//       className="min-h-screen p-8"
//       style={{ background: "#FAF7F2", fontFamily: "Inter, ui-sans-serif, system-ui" }}
//     >
//       <div className="max-w-6xl mx-auto">
//         {/* HEADER */}
//         <div className="flex justify-between items-end mb-8 pb-4" style={{ borderBottom: "2px solid #1F2A3D" }}>
//           <div>
//             <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#C9A227", letterSpacing: "0.2em" }}>
//               Inventory
//             </p>
//             <h1
//               className="text-3xl font-semibold"
//               style={{ fontFamily: "'Source Serif Pro', Georgia, serif", color: "#1F2A3D" }}
//             >
//               Products
//             </h1>
//           </div>
//           <button
//             onClick={handleAdd}
//             className="px-5 py-2.5 text-sm font-medium tracking-wide rounded transition-colors"
//             style={{ background: "#1F2A3D", color: "#FAF7F2" }}
//             onMouseEnter={(e) => (e.currentTarget.style.background = "#324158")}
//             onMouseLeave={(e) => (e.currentTarget.style.background = "#1F2A3D")}
//           >
//             + Add Product
//           </button>
//         </div>

//         {/* SEARCH */}
//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder="Search products by name…"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full px-4 py-2.5 rounded text-sm focus:outline-none transition-shadow"
//             style={{
//               border: "1px solid #E0DACE",
//               background: "#FFFFFF",
//               color: "#1F2A3D",
//             }}
//             onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
//             onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
//           />
//         </div>

//         {/* TABLE */}
//         <div className="rounded overflow-hidden" style={{ border: "1px solid #E0DACE", background: "#FFFFFF" }}>
//           <table className="w-full text-sm">
//             <thead>
//               <tr style={{ background: "#1F2A3D" }}>
//                 <th className="p-3 text-left font-medium tracking-wide" style={{ color: "#FAF7F2" }}>ID</th>
//                 <th className="p-3 text-left font-medium tracking-wide" style={{ color: "#FAF7F2" }}>Image</th>
//                 <th className="p-3 text-left font-medium tracking-wide" style={{ color: "#FAF7F2" }}>Product Name</th>
//                 <th className="p-3 text-left font-medium tracking-wide" style={{ color: "#FAF7F2" }}>Category</th>
//                 <th className="p-3 text-right font-medium tracking-wide" style={{ color: "#FAF7F2" }}>Price</th>
//                 <th className="p-3 text-right font-medium tracking-wide" style={{ color: "#FAF7F2" }}>Stock</th>
//                 <th className="p-3 text-center font-medium tracking-wide" style={{ color: "#FAF7F2" }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts.map((p, idx) => (
//                 <tr
//                   key={p.productID}
//                   style={{
//                     borderTop: "1px solid #E0DACE",
//                     background: idx % 2 === 0 ? "#FFFFFF" : "#FCFAF6",
//                   }}
//                 >
//                   <td className="p-3" style={{ color: "#8A8275", fontFamily: "'Courier New', monospace" }}>
//                     {String(p.productID).padStart(3, "0")}
//                   </td>
//                   <td className="p-3">
//                     {p.image ? (
//                       <img
//                         src={`http://172.20.10.14:8081/uploads/${p.image}`}
//                         alt={p.productName}
//                         width="44"
//                         height="44"
//                         className="rounded object-cover"
//                         style={{ border: "1px solid #E0DACE" }}
//                       />
//                     ) : (
//                       <div
//                         className="w-11 h-11 rounded flex items-center justify-center text-xs"
//                         style={{ border: "1px dashed #E0DACE", color: "#C7BFAF" }}
//                       >
//                         —
//                       </div>
//                     )}
//                   </td>
//                   <td className="p-3 font-medium" style={{ color: "#1F2A3D" }}>{p.productName}</td>
//                   <td className="p-3" style={{ color: "#6B6354" }}>{getCategoryName(p.categoryID)}</td>
//                   <td className="p-3 text-right" style={{ fontFamily: "'Courier New', monospace", color: "#1F2A3D" }}>
//                     ${Number(p.price).toFixed(2)}
//                   </td>
//                   <td className="p-3 text-right" style={{ fontFamily: "'Courier New', monospace", color: "#1F2A3D" }}>
//                     {p.quantity}
//                   </td>
//                   <td className="p-3 text-center whitespace-nowrap">
//                     <button
//                       onClick={() => handleEdit(p)}
//                       className="px-3 py-1 mr-2 text-xs font-medium rounded transition-colors"
//                       style={{ border: "1px solid #C9A227", color: "#1F2A3D", background: "transparent" }}
//                       onMouseEnter={(e) => (e.currentTarget.style.background = "#FBF4DD")}
//                       onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(p.productID)}
//                       className="px-3 py-1 text-xs font-medium rounded transition-colors"
//                       style={{ border: "1px solid #B5564B", color: "#B5564B", background: "transparent" }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background = "#B5564B";
//                         e.currentTarget.style.color = "#FFFFFF";
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background = "transparent";
//                         e.currentTarget.style.color = "#B5564B";
//                       }}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {filteredProducts.length === 0 && (
//                 <tr>
//                   <td colSpan="7" className="p-8 text-center" style={{ color: "#C7BFAF" }}>
//                     No products found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* MODAL */}
//       {showModal && selectedProduct && (
//         <div
//           className="fixed inset-0 flex justify-center items-center z-50 p-4"
//           style={{ background: "rgba(31,42,61,0.45)" }}
//         >
//           <div className="w-full max-w-sm rounded-lg overflow-hidden" style={{ background: "#FFFFFF" }}>
//             <div className="px-6 py-4" style={{ background: "#1F2A3D" }}>
//               <h2
//                 className="text-lg font-semibold"
//                 style={{ fontFamily: "'Source Serif Pro', Georgia, serif", color: "#FAF7F2" }}
//               >
//                 {selectedProduct.productID ? "Edit Product" : "Add Product"}
//               </h2>
//             </div>

//             <div className="p-6">
//               {/* IMAGE PREVIEW */}
//               <div className="flex justify-center mb-4">
//                 {previewImage ? (
//                   <img
//                     src={previewImage}
//                     alt="preview"
//                     className="w-24 h-24 object-cover rounded"
//                     style={{ border: "1px solid #E0DACE" }}
//                   />
//                 ) : (
//                   <div
//                     className="w-24 h-24 flex items-center justify-center rounded text-xs"
//                     style={{ border: "1px dashed #E0DACE", color: "#C7BFAF" }}
//                   >
//                     No image
//                   </div>
//                 )}
//               </div>

//               {/* IMAGE FILE INPUT */}
//               <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
//                 Product image
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="mb-4 w-full text-xs"
//               />

//               {/* NAME */}
//               <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
//                 Product name
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. Hand-poured candle"
//                 value={selectedProduct.productName}
//                 onChange={(e) =>
//                   setSelectedProduct({
//                     ...selectedProduct,
//                     productName: e.target.value,
//                   })
//                 }
//                 className="w-full p-2.5 mb-3 rounded text-sm focus:outline-none"
//                 style={{ border: "1px solid #E0DACE" }}
//                 onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
//                 onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
//               />

//               {/* CATEGORY */}
//               <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
//                 Category
//               </label>
//               <select
//                 value={selectedProduct.categoryID}
//                 onChange={(e) =>
//                   setSelectedProduct({
//                     ...selectedProduct,
//                     categoryID: e.target.value,
//                   })
//                 }
//                 className="w-full p-2.5 mb-3 rounded text-sm focus:outline-none"
//                 style={{ border: "1px solid #E0DACE" }}
//                 onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
//                 onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
//               >
//                 <option value="">Select category</option>
//                 {categories.map((category) => (
//                   <option key={category.categoryID} value={category.categoryID}>
//                     {category.categoryName}
//                   </option>
//                 ))}
//               </select>

//               {/* PRICE & STOCK */}
//               <div className="grid grid-cols-2 gap-3 mb-1">
//                 <div>
//                   <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
//                     Price
//                   </label>
//                   <input
//                     type="number"
//                     placeholder="0.00"
//                     value={selectedProduct.price}
//                     onChange={(e) =>
//                       setSelectedProduct({
//                         ...selectedProduct,
//                         price: e.target.value,
//                       })
//                     }
//                     className="w-full p-2.5 rounded text-sm focus:outline-none"
//                     style={{ border: "1px solid #E0DACE" }}
//                     onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
//                     onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
//                     Stock
//                   </label>
//                   <input
//                     type="number"
//                     placeholder="0"
//                     value={selectedProduct.quantity}
//                     onChange={(e) =>
//                       setSelectedProduct({
//                         ...selectedProduct,
//                         quantity: e.target.value,
//                       })
//                     }
//                     className="w-full p-2.5 rounded text-sm focus:outline-none"
//                     style={{ border: "1px solid #E0DACE" }}
//                     onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
//                     onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* BUTTONS */}
//             <div className="flex justify-end gap-2 px-6 py-4" style={{ borderTop: "1px solid #E0DACE" }}>
//               <button
//                 onClick={handleCancel}
//                 className="px-4 py-2 text-sm font-medium rounded transition-colors"
//                 style={{ border: "1px solid #E0DACE", color: "#6B6354", background: "#FFFFFF" }}
//                 onMouseEnter={(e) => (e.currentTarget.style.background = "#FAF7F2")}
//                 onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="px-4 py-2 text-sm font-medium rounded transition-colors"
//                 style={{ background: "#1F2A3D", color: "#FAF7F2" }}
//                 onMouseEnter={(e) => (e.currentTarget.style.background = "#324158")}
//                 onMouseLeave={(e) => (e.currentTarget.style.background = "#1F2A3D")}
//               >
//                 {selectedProduct.productID ? "Save changes" : "Add product"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect, useRef, useCallback } from "react";

const API_URL = "http://172.20.10.14:8081/api/products";
const POLL_INTERVAL = 5000;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [syncStatus, setSyncStatus] = useState("idle"); // "idle" | "syncing" | "error"
  const [newProductIds, setNewProductIds] = useState(new Set());
  const knownIdsRef = useRef(null);
  const pollRef = useRef(null);

  const fetchProducts = useCallback((isPolling = false) => {
    if (isPolling) setSyncStatus("syncing");

    return fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const incoming = Array.isArray(data) ? data : [];

        if (isPolling && knownIdsRef.current !== null) {
          const incomingIds = new Set(incoming.map((p) => p.productID));
          const added = [...incomingIds].filter((id) => !knownIdsRef.current.has(id));
          if (added.length > 0) {
            setNewProductIds((prev) => {
              const next = new Set([...prev, ...added]);
              return next;
            });
            setTimeout(() => {
              setNewProductIds((prev) => {
                const next = new Set(prev);
                added.forEach((id) => next.delete(id));
                return next;
              });
            }, 3000);
          }
        }

        knownIdsRef.current = new Set(incoming.map((p) => p.productID));
        setProducts(incoming);
        if (isPolling) setSyncStatus("idle");
      })
      .catch((err) => {
        console.error(err);
        if (isPolling) setSyncStatus("error");
        if (!isPolling) setProducts([]);
      });
  }, []);

  const startPolling = useCallback(() => {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(() => fetchProducts(true), POLL_INTERVAL);
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts(false).then(startPolling);

    fetch("http://172.20.10.14:8081/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [fetchProducts, startPolling]);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        return res.json();
      })
      .then(() => {
        setProducts((prev) => prev.filter((p) => p.productID !== id));
        knownIdsRef.current?.delete(id);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to delete product.");
      });
  };

  const handleAdd = () => {
    setSelectedProduct({ productName: "", categoryID: "", price: "", quantity: "", image: "" });
    setPreviewImage(null);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setPreviewImage(product.image ? `http://172.20.10.14:8081/uploads/${product.image}` : null);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedProduct((prev) => ({ ...prev, imageFile: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSave = () => {
    if (!selectedProduct.productName || !selectedProduct.categoryID) {
      alert("Please fill in Product Name and Category ID");
      return;
    }

    const formData = new FormData();
    formData.append("productName", selectedProduct.productName);
    formData.append("categoryID", selectedProduct.categoryID);
    formData.append("price", selectedProduct.price);
    formData.append("quantity", selectedProduct.quantity);
    if (selectedProduct.imageFile) formData.append("image", selectedProduct.imageFile);

    const url = selectedProduct.productID ? `${API_URL}/${selectedProduct.productID}` : API_URL;
    const method = selectedProduct.productID ? "PUT" : "POST";

    fetch(url, { method, body: formData })
      .then((res) => res.json())
      .then(() => {
        fetchProducts(false);
        setShowModal(false);
        setSelectedProduct(null);
        setPreviewImage(null);
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setPreviewImage(null);
  };

  const filteredProducts = products.filter((p) =>
    (p.productName || "").toLowerCase().includes(search.toLowerCase())
  );

  const getCategoryName = (id) => {
    const cat = categories.find((c) => String(c.categoryID) === String(id));
    return cat ? cat.categoryName : id;
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{ background: "#FAF7F2", fontFamily: "Inter, ui-sans-serif, system-ui" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-end mb-8 pb-4" style={{ borderBottom: "2px solid #1F2A3D" }}>
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#C9A227", letterSpacing: "0.2em" }}>
              Inventory
            </p>
            <h1
              className="text-3xl font-semibold"
              style={{ fontFamily: "'Source Serif Pro', Georgia, serif", color: "#1F2A3D" }}
            >
              Products
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* LIVE SYNC INDICATOR */}
            <div className="flex items-center gap-1.5">
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background:
                    syncStatus === "error"
                      ? "#B5564B"
                      : syncStatus === "syncing"
                      ? "#C9A227"
                      : "#4A9E6B",
                  boxShadow:
                    syncStatus === "idle"
                      ? "0 0 0 2px rgba(74,158,107,0.25)"
                      : "none",
                  transition: "background 0.3s",
                }}
              />
              <span className="text-xs" style={{ color: "#8A8275" }}>
                {syncStatus === "error"
                  ? "Sync error"
                  : syncStatus === "syncing"
                  ? "Syncing…"
                  : "Live"}
              </span>
            </div>

            <button
              onClick={handleAdd}
              className="px-5 py-2.5 text-sm font-medium tracking-wide rounded transition-colors"
              style={{ background: "#1F2A3D", color: "#FAF7F2" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#324158")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#1F2A3D")}
            >
              + Add Product
            </button>
          </div>
        </div>

        {/* SEARCH */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products by name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded text-sm focus:outline-none transition-shadow"
            style={{ border: "1px solid #E0DACE", background: "#FFFFFF", color: "#1F2A3D" }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />
        </div>

        {/* TABLE */}
        <div className="rounded overflow-hidden" style={{ border: "1px solid #E0DACE", background: "#FFFFFF" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "#1F2A3D" }}>
                <th className="p-3 text-left font-medium tracking-wide" style={{ color: "#FAF7F2" }}>ID</th>
                <th className="p-3 text-left font-medium tracking-wide" style={{ color: "#FAF7F2" }}>Image</th>
                <th className="p-3 text-left font-medium tracking-wide" style={{ color: "#FAF7F2" }}>Product Name</th>
                <th className="p-3 text-left font-medium tracking-wide" style={{ color: "#FAF7F2" }}>Category</th>
                <th className="p-3 text-right font-medium tracking-wide" style={{ color: "#FAF7F2" }}>Price</th>
                <th className="p-3 text-right font-medium tracking-wide" style={{ color: "#FAF7F2" }}>Stock</th>
                <th className="p-3 text-center font-medium tracking-wide" style={{ color: "#FAF7F2" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p, idx) => {
                const isNew = newProductIds.has(p.productID);
                return (
                  <tr
                    key={p.productID}
                    style={{
                      borderTop: "1px solid #E0DACE",
                      background: isNew
                        ? "#F0FAF4"
                        : idx % 2 === 0
                        ? "#FFFFFF"
                        : "#FCFAF6",
                      transition: "background 1s ease",
                    }}
                  >
                    <td className="p-3" style={{ color: "#8A8275", fontFamily: "'Courier New', monospace" }}>
                      {String(p.productID).padStart(3, "0")}
                      {isNew && (
                        <span
                          className="ml-2 text-xs font-medium px-1.5 py-0.5 rounded"
                          style={{ background: "#D1FAE5", color: "#065F46", fontSize: 10 }}
                        >
                          New
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      {p.image ? (
                        <img
                          src={`http://172.20.10.14:8081/uploads/${p.image}`}
                          alt={p.productName}
                          width="44"
                          height="44"
                          className="rounded object-cover"
                          style={{ border: "1px solid #E0DACE" }}
                        />
                      ) : (
                        <div
                          className="w-11 h-11 rounded flex items-center justify-center text-xs"
                          style={{ border: "1px dashed #E0DACE", color: "#C7BFAF" }}
                        >
                          —
                        </div>
                      )}
                    </td>
                    <td className="p-3 font-medium" style={{ color: "#1F2A3D" }}>{p.productName}</td>
                    <td className="p-3" style={{ color: "#6B6354" }}>{getCategoryName(p.categoryID)}</td>
                    <td className="p-3 text-right" style={{ fontFamily: "'Courier New', monospace", color: "#1F2A3D" }}>
                      ${Number(p.price).toFixed(2)}
                    </td>
                    <td className="p-3 text-right" style={{ fontFamily: "'Courier New', monospace", color: "#1F2A3D" }}>
                      {p.quantity}
                    </td>
                    <td className="p-3 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(p)}
                        className="px-3 py-1 mr-2 text-xs font-medium rounded transition-colors"
                        style={{ border: "1px solid #C9A227", color: "#1F2A3D", background: "transparent" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#FBF4DD")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.productID)}
                        className="px-3 py-1 text-xs font-medium rounded transition-colors"
                        style={{ border: "1px solid #B5564B", color: "#B5564B", background: "transparent" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#B5564B";
                          e.currentTarget.style.color = "#FFFFFF";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "#B5564B";
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-8 text-center" style={{ color: "#C7BFAF" }}>
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-right" style={{ color: "#C7BFAF" }}>
          Auto-syncs every {POLL_INTERVAL / 1000}s — new items appear automatically
        </p>
      </div>

      {/* MODAL */}
      {showModal && selectedProduct && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 p-4"
          style={{ background: "rgba(31,42,61,0.45)" }}
        >
          <div className="w-full max-w-sm rounded-lg overflow-hidden" style={{ background: "#FFFFFF" }}>
            <div className="px-6 py-4" style={{ background: "#1F2A3D" }}>
              <h2
                className="text-lg font-semibold"
                style={{ fontFamily: "'Source Serif Pro', Georgia, serif", color: "#FAF7F2" }}
              >
                {selectedProduct.productID ? "Edit Product" : "Add Product"}
              </h2>
            </div>

            <div className="p-6">
              <div className="flex justify-center mb-4">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded"
                    style={{ border: "1px solid #E0DACE" }}
                  />
                ) : (
                  <div
                    className="w-24 h-24 flex items-center justify-center rounded text-xs"
                    style={{ border: "1px dashed #E0DACE", color: "#C7BFAF" }}
                  >
                    No image
                  </div>
                )}
              </div>

              <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
                Product image
              </label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4 w-full text-xs" />

              <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
                Product name
              </label>
              <input
                type="text"
                placeholder="e.g. Hand-poured candle"
                value={selectedProduct.productName}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, productName: e.target.value })}
                className="w-full p-2.5 mb-3 rounded text-sm focus:outline-none"
                style={{ border: "1px solid #E0DACE" }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />

              <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>
                Category
              </label>
              <select
                value={selectedProduct.categoryID}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, categoryID: e.target.value })}
                className="w-full p-2.5 mb-3 rounded text-sm focus:outline-none"
                style={{ border: "1px solid #E0DACE" }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.categoryID} value={category.categoryID}>
                    {category.categoryName}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-3 mb-1">
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>Price</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={selectedProduct.price}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                    className="w-full p-2.5 rounded text-sm focus:outline-none"
                    style={{ border: "1px solid #E0DACE" }}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: "#6B6354" }}>Stock</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={selectedProduct.quantity}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, quantity: e.target.value })}
                    className="w-full p-2.5 rounded text-sm focus:outline-none"
                    style={{ border: "1px solid #E0DACE" }}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,162,39,0.25)")}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 px-6 py-4" style={{ borderTop: "1px solid #E0DACE" }}>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium rounded transition-colors"
                style={{ border: "1px solid #E0DACE", color: "#6B6354", background: "#FFFFFF" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FAF7F2")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#FFFFFF")}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium rounded transition-colors"
                style={{ background: "#1F2A3D", color: "#FAF7F2" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#324158")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1F2A3D")}
              >
                {selectedProduct.productID ? "Save changes" : "Add product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
