


// import { useEffect, useState, useRef } from "react";
// import { api } from "../api/client";
// import ProductCard from "../components/ProductCard";
// import { Search, X } from "lucide-react";

// export default function Products() {
//   const [products, setProducts]     = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [search, setSearch]         = useState("");
//   const [categoryID, setCategoryID] = useState("");
//   const [loading, setLoading]       = useState(true);

//   const scrollRef     = useRef(null);
//   const autoScrollRef = useRef(null);
//   const isDragging    = useRef(false);
//   const startX        = useRef(0);
//   const scrollLeft    = useRef(0);

//   useEffect(() => {
//     Promise.allSettled([api.get("/api/products"), api.get("/api/categories")]).then(
//       ([p, c]) => {
//         if (p.status === "fulfilled") setProducts(Array.isArray(p.value) ? p.value : []);
//         if (c.status === "fulfilled") setCategories(Array.isArray(c.value) ? c.value : []);
//         setLoading(false);
//       }
//     );
//   }, []);

//   useEffect(() => {
//     const container = scrollRef.current;
//     if (!container || categories.length === 0) return;
//     autoScrollRef.current = setInterval(() => {
//       if (isDragging.current) return;
//       container.scrollLeft += 1;
//       if (container.scrollLeft >= container.scrollWidth - container.clientWidth)
//         container.scrollLeft = 0;
//     }, 20);
//     return () => clearInterval(autoScrollRef.current);
//   }, [categories]);

//   const filtered = products.filter((p) => {
//     const matchesSearch   = p.productName.toLowerCase().includes(search.toLowerCase());
//     const matchesCategory = !categoryID || String(p.categoryID) === categoryID;
//     return matchesSearch && matchesCategory;
//   });

//   const handleMouseDown = (e) => {
//     isDragging.current = true;
//     startX.current = e.pageX - scrollRef.current.offsetLeft;
//     scrollLeft.current = scrollRef.current.scrollLeft;
//   };
//   const handleMouseLeave = () => { isDragging.current = false; };
//   const handleMouseUp    = () => { isDragging.current = false; };
//   const handleMouseMove  = (e) => {
//     if (!isDragging.current) return;
//     e.preventDefault();
//     const x = e.pageX - scrollRef.current.offsetLeft;
//     scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 2;
//   };

//   return (
//     <div className="max-w-3xl mx-auto pb-28 animate-fade-in">

//       {/* ── STICKY SEARCH + FILTER ─────────────────────────────── */}
//       <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-line/50">
//         <div className="px-4 pt-3 pb-3 flex flex-col gap-2.5">

//           <div
//             className="
//               flex items-center gap-3
//               bg-white
//               rounded-2xl
//               px-4 py-3
//               shadow-sm
//               focus-within:ring-4
//               focus-within:ring-brand/10
//               transition-all
//             "
//           >
//             <Search size={18} className="text-gray-400" />

//             <input
//               type="text"
//               placeholder="Search products"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="
//                 flex-1
//                 bg-transparent
//                 border-none
//                 outline-none
//                 ring-0
//                 focus:outline-none
//                 focus:ring-0
//                 focus:border-none
//                 text-sm
//                 placeholder:text-gray-400
//               "
//             />

//             <div className="hidden sm:flex items-center justify-center px-2 py-1 text-[10px] font-medium text-gray-400 bg-gray-100 rounded-md">
//               ⌘K
//             </div>
//           </div>

//           {/* Category pills */}
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setCategoryID("")}
//               className={`shrink-0 text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
//                 categoryID === ""
//                   ? "bg-brand text-white border-brand shadow-badge"
//                   : "bg-white text-ink-muted border-line hover:border-brand/40"
//               }`}
//             >
//               All
//             </button>
//             <div
//               ref={scrollRef}
//               className="flex-1 overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing"
//               onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave}
//               onMouseUp={handleMouseUp}    onMouseMove={handleMouseMove}
//             >
//               <div className="flex gap-2 w-max pb-1">
//                 {categories.map((c) => (
//                   <button
//                     key={c.categoryID}
//                     onClick={() => setCategoryID(String(c.categoryID))}
//                     className={`shrink-0 text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
//                       categoryID === String(c.categoryID)
//                         ? "bg-brand text-white border-brand shadow-badge"
//                         : "bg-white text-ink-muted border-line hover:border-brand/40"
//                     }`}
//                   >
//                     {c.categoryName}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── RESULTS ────────────────────────────────────────────── */}
//       <div className="px-4 pt-4">
//         {!loading && filtered.length > 0 && (
//           <p className="text-xs font-semibold text-ink-faint mb-3 uppercase tracking-wide">
//             {filtered.length} product{filtered.length !== 1 ? "s" : ""}
//           </p>
//         )}

//         {loading ? (
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="rounded-3xl h-48 skeleton" />
//             ))}
//           </div>
//         ) : filtered.length === 0 ? (
//           <div className="text-center py-20 animate-fade-in">
//             <div className="w-20 h-20 rounded-full bg-canvas border border-line mx-auto flex items-center justify-center mb-4">
//               <Search size={28} className="text-ink-faint" />
//             </div>
//             <p className="font-display font-bold text-ink mb-1">No products found</p>
//             <p className="text-sm text-ink-muted">Try a different search or category.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//             {filtered.map((p) => (
//               <ProductCard key={p.productID} product={p} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState, useRef, useCallback } from "react";
import { api } from "../api/client";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";

const POLL_INTERVAL = 15_000; // 15 seconds

export default function Products() {
  const [products, setProducts]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch]         = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [loading, setLoading]       = useState(true);
  const [newProductIds, setNewProductIds] = useState(new Set());
  const knownIds = useRef(null);
  const pollRef  = useRef(null);

  const scrollRef     = useRef(null);
  const autoScrollRef = useRef(null);
  const isDragging    = useRef(false);
  const startX        = useRef(0);
  const scrollLeftVal = useRef(0);

  const fetchProducts = useCallback((silent = false) => {
    return api.get("/api/products").then((data) => {
      const incoming = Array.isArray(data) ? data : [];

      if (silent && knownIds.current !== null) {
        const incomingIds = new Set(incoming.map((p) => p.productID));
        const added = [...incomingIds].filter((id) => !knownIds.current.has(id));
        if (added.length > 0) {
          setNewProductIds((prev) => new Set([...prev, ...added]));
          setTimeout(() => {
            setNewProductIds((prev) => {
              const next = new Set(prev);
              added.forEach((id) => next.delete(id));
              return next;
            });
          }, 6000);
        }
      }

      knownIds.current = new Set(incoming.map((p) => p.productID));
      setProducts(incoming);
      if (!silent) setLoading(false);
    }).catch((err) => {
      console.error(err);
      if (!silent) setLoading(false);
    });
  }, []);

  useEffect(() => {
    Promise.allSettled([fetchProducts(false), api.get("/api/categories")]).then(([, c]) => {
      if (c.status === "fulfilled") setCategories(Array.isArray(c.value) ? c.value : []);
    });
    pollRef.current = setInterval(() => fetchProducts(true), POLL_INTERVAL);
    return () => clearInterval(pollRef.current);
  }, [fetchProducts]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || categories.length === 0) return;
    autoScrollRef.current = setInterval(() => {
      if (isDragging.current) return;
      container.scrollLeft += 1;
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth)
        container.scrollLeft = 0;
    }, 20);
    return () => clearInterval(autoScrollRef.current);
  }, [categories]);

  const filtered = products.filter((p) => {
    const matchesSearch   = p.productName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryID || String(p.categoryID) === categoryID;
    return matchesSearch && matchesCategory;
  });

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftVal.current = scrollRef.current.scrollLeft;
  };
  const handleMouseLeave = () => { isDragging.current = false; };
  const handleMouseUp    = () => { isDragging.current = false; };
  const handleMouseMove  = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeftVal.current - (x - startX.current) * 2;
  };

  return (
    <div className="max-w-3xl mx-auto pb-28 animate-fade-in">
      <style>{`
        @keyframes newGlow {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          50%  { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        .new-product-card { animation: newGlow 1.4s ease; outline: 2px solid #22c55e; border-radius: inherit; }
      `}</style>

      {/* ── STICKY SEARCH + FILTER ─────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-line/50">
        <div className="px-4 pt-3 pb-3 flex flex-col gap-2.5">
          <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm focus-within:ring-4 focus-within:ring-brand/10 transition-all">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none ring-0 focus:outline-none focus:ring-0 focus:border-none text-sm placeholder:text-gray-400"
            />
            <div className="hidden sm:flex items-center justify-center px-2 py-1 text-[10px] font-medium text-gray-400 bg-gray-100 rounded-md">
              ⌘K
            </div>
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCategoryID("")}
              className={`shrink-0 text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
                categoryID === "" ? "bg-brand text-white border-brand shadow-badge" : "bg-white text-ink-muted border-line hover:border-brand/40"
              }`}
            >
              All
            </button>
            <div
              ref={scrollRef}
              className="flex-1 overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}    onMouseMove={handleMouseMove}
            >
              <div className="flex gap-2 w-max pb-1">
                {categories.map((c) => (
                  <button
                    key={c.categoryID}
                    onClick={() => setCategoryID(String(c.categoryID))}
                    className={`shrink-0 text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
                      categoryID === String(c.categoryID)
                        ? "bg-brand text-white border-brand shadow-badge"
                        : "bg-white text-ink-muted border-line hover:border-brand/40"
                    }`}
                  >
                    {c.categoryName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RESULTS ────────────────────────────────────────────── */}
      <div className="px-4 pt-4">
        {!loading && filtered.length > 0 && (
          <p className="text-xs font-semibold text-ink-faint mb-3 uppercase tracking-wide">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
          </p>
        )}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-3xl h-48 skeleton" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-canvas border border-line mx-auto flex items-center justify-center mb-4">
              <Search size={28} className="text-ink-faint" />
            </div>
            <p className="font-display font-bold text-ink mb-1">No products found</p>
            <p className="text-sm text-ink-muted">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filtered.map((p) => (
              <div
                key={p.productID}
                className={newProductIds.has(p.productID) ? "new-product-card rounded-3xl" : ""}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
