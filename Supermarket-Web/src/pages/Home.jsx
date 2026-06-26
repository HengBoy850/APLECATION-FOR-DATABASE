


// import { useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import { api, imageUrl } from "../api/client";
// import ProductCard from "../components/ProductCard";
// import { Search, Zap, ArrowRight } from "lucide-react";

// export default function Home() {
//   const [products, setProducts]       = useState([]);
//   const [banners, setBanners]         = useState([]);
//   const [promotions, setPromotions]   = useState([]);
//   const [categories, setCategories]   = useState([]);
//   const [bannerIndex, setBannerIndex] = useState(0);
//   const [activeCat, setActiveCat]     = useState("");
//   const [loading, setLoading]         = useState(true);

//   const scrollRef     = useRef(null);
//   const autoScrollRef = useRef(null);
//   const isDragging    = useRef(false);
//   const startX        = useRef(0);
//   const scrollLeft    = useRef(0);

//   useEffect(() => {
//     Promise.allSettled([
//       api.get("/api/products"),
//       api.get("/api/banners?status=active"),
//       api.get("/api/promotions?activeOnly=true"),
//       api.get("/api/categories"),
//     ]).then(([p, b, promo, c]) => {
//       if (p.status    === "fulfilled") setProducts(Array.isArray(p.value)      ? p.value      : []);
//       if (b.status    === "fulfilled") setBanners(Array.isArray(b.value)       ? b.value      : []);
//       if (promo.status=== "fulfilled") setPromotions(Array.isArray(promo.value)? promo.value  : []);
//       if (c.status    === "fulfilled") setCategories(Array.isArray(c.value)    ? c.value      : []);
//       setLoading(false);
//     });
//   }, []);

//   useEffect(() => {
//     if (banners.length <= 1) return;
//     const t = setInterval(() => setBannerIndex((i) => (i + 1) % banners.length), 3500);
//     return () => clearInterval(t);
//   }, [banners]);

//   useEffect(() => {
//     const container = scrollRef.current;
//     if (!container) return;
//     autoScrollRef.current = setInterval(() => {
//       if (isDragging.current) return;
//       container.scrollLeft += 1;
//       if (container.scrollLeft >= container.scrollWidth - container.clientWidth)
//         container.scrollLeft = 0;
//     }, 20);
//     return () => clearInterval(autoScrollRef.current);
//   }, [categories]);

//   const featured = products
//     .filter((p) => !activeCat || String(p.categoryID) === activeCat)
//     .slice(0, 10);

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
//     <div className="max-w-3xl mx-auto pb-24 animate-fade-in">

//       {/* ── SEARCH BAR ─────────────────────────────────────────── */}
//       <div className="px-4 pt-4 pb-2">
//         <Link
//           to="/products"
//           className="
//             flex items-center gap-3
//             bg-white border border-line/60 rounded-full
//             px-4 py-2.5 shadow-card
//             hover:border-brand/40 hover:shadow-lifted
//             transition-all duration-200
//           "
//         >
//           <Search size={16} className="text-ink-faint" />
//           <span className="text-ink-faint text-sm">Search for groceries…</span>
//         </Link>
//       </div>

//       {/* ── HERO BANNER ────────────────────────────────────────── */}
//       <div className="px-4 pt-2 pb-5">
//          <div className="relative w-full h-52 sm:h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden">

//            {/* Gradient fallback */}
//            <div className="absolute inset-0 bg-gradient-to-br from-brand to-orange-400" />

//            {/* Slides */}
//            {banners.map((b, i) => (
//             <img
//               key={b.bannerID}
//               src={imageUrl(b.image)}
//               alt={b.title || "Promotion"}
//               className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
//                 i === bannerIndex ? "opacity-100" : "opacity-0"
//               }`}
//             />
//           ))}

//           {/* Default Banner */}
//           {banners.length === 0 && !loading && (
//             <div className="absolute inset-0 flex flex-col justify-center px-6">
//               <span className="bg-white/25 text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2">
//                 Flash Sale
//               </span>

//               <h2 className="text-white font-bold text-2xl leading-snug">
//                 Get 30% off
//                 <br />
//                 fresh produce
//               </h2>

//               <p className="text-white/80 text-sm mt-1 mb-4">
//                 Today only — limited stock
//               </p>

//               <Link
//                 to="/products"
//                 className="
//                   bg-white
//                   text-brand
//                   font-semibold
//                   text-sm
//                   px-5
//                   py-2
//                   rounded-full
//                   w-fit
//                   hover:bg-brand-light
//                   transition-colors
//                 "
//               >
//                 Shop now
//               </Link>
//             </div>
//           )}

//           {/* Indicators */}
//           {banners.length > 1 && (
//             <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
//               {banners.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setBannerIndex(i)}
//                   className={`h-1.5 rounded-full transition-all ${
//                     i === bannerIndex
//                       ? "w-5 bg-white"
//                       : "w-1.5 bg-white/50"
//                   }`}
//                   aria-label={`Banner ${i + 1}`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── CATEGORIES ─────────────────────────────────────────── */}
//       <div className="mb-6">
//         <div className="px-4 flex items-center justify-between mb-3">
//           <h2 className="font-display font-bold text-base text-ink">Categories</h2>
//         </div>
//         <div className="flex items-center gap-2 px-4">
//           <button
//             onClick={() => setActiveCat("")}
//             className={`shrink-0 px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
//               activeCat === ""
//                 ? "bg-brand text-white border-brand shadow-btn"
//                 : "bg-white text-ink-muted border-line hover:border-brand/40"
//             }`}
//           >
//             All
//           </button>
//           <div
//             ref={scrollRef}
//             className="flex-1 overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing"
//             onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave}
//             onMouseUp={handleMouseUp}    onMouseMove={handleMouseMove}
//           >
//             <div className="flex gap-2 w-max pb-1">
//               {categories.map((cat) => (
//                 <button
//                   key={cat.categoryID}
//                   onClick={() => setActiveCat(String(cat.categoryID))}
//                   className={`
//                     shrink-0 px-4 py-2 rounded-full border text-sm font-semibold transition-all
//                     ${activeCat === String(cat.categoryID)
//                       ? "bg-brand text-white border-brand shadow-btn"
//                       : "bg-white text-ink-muted border-line hover:border-brand/40"
//                     }
//                   `}
//                 >
//                   {cat.categoryName}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── TODAY'S DEALS ──────────────────────────────────────── */}
//       {promotions.length > 0 && (
//         <div className="mb-6">
//           <div className="px-4 flex items-center justify-between mb-3">
//             <h2 className="font-display font-bold text-base text-ink">
//               Today's deals
//             </h2>
//           </div>

//           <div className="flex gap-3 px-4 overflow-x-auto scrollbar-none pb-2">
//             {promotions.map((promo) => (
//               <div
//                 key={promo.promotionID}
//                 className="
//                   shrink-0 w-32
//                   bg-white
//                   rounded-[22px]
//                   border border-line/60
//                   shadow-card
//                   overflow-hidden
//                   hover:shadow-lifted
//                   hover:-translate-y-0.5
//                   transition-all
//                 "
//               >
//                 <div className="relative h-20 bg-[#F4F6F5] flex items-center justify-center">
//                   {promo.image ? (
//                     <img
//                       src={imageUrl(promo.image)}
//                       alt={promo.title}
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-5xl" aria-hidden>
//                       🏷
//                     </span>
//                   )}

//                   <span
//                       className="
//                         absolute top-2 right-2
//                         bg-gradient-to-r
//                         from-[#F4A261]
//                         to-[#E76F51]
//                         text-white
//                         text-[10px]
//                         font-bold
//                         px-2 py-1
//                         rounded-full
//                         shadow-md
//                       "
//                     >
//                     -{promo.discountPercent}%
//                   </span>
//                 </div>

//                 <div className="p-2.5">
//                   <p className="text-xs font-bold text-ink truncate">
//                     {promo.title}
//                   </p>

//                   <p className="text-[11px] text-ink-faint mt-0.5 truncate">
//                     {promo.productName || promo.categoryName}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//         {/* ── FREE DELIVERY BANNER ────────────────────────────────── */}
//         <div className="px-4 mb-6">
//           <div
//             className="
//               flex items-center gap-3
//               bg-[#F7F0E4]
//               border border-[#E7D8B8]
//               rounded-[24px]
//               px-4 py-3
//               shadow-sm
//             "
//           >
//             <div
//               className="
//                 w-12 h-12
//                 rounded-2xl
//                 bg-[#F3E7CE]
//                 border border-[#E7D8B8]
//                 flex items-center justify-center
//                 shrink-0
//               "
//             >
//               <Zap
//                 size={20}
//                 className="text-[#D49A1E]"
//               />
//             </div>

//             <div className="flex-1">
//               <p className="font-bold text-base text-[#2F3A33]">
//                 Free delivery today
//               </p>

//               <p className="text-sm text-[#8C8C8C]">
//                 On orders above $15
//               </p>
//             </div>

//             <Link
//               to="/products"
//               className="
//                 bg-[#E8AA45]
//                 text-white
//                 font-semibold
//                 px-4 py-2
//                 rounded-full
//                 text-sm
//                 shadow-md
//                 whitespace-nowrap
//               "
//             >
//               Shop now
//             </Link>
//           </div>
//         </div>

//       {/* ── FEATURED PRODUCTS ──────────────────────────────────── */}
//       <div className="px-4">
//         <div className="flex items-center justify-between mb-3">
//           <h2 className="font-display font-bold text-base text-ink">Featured products</h2>
//           <Link to="/products" className="text-brand text-sm font-bold hover:underline flex items-center gap-1">
//             See all <ArrowRight size={13} strokeWidth={2.5} />
//           </Link>
//         </div>

//         {loading ? (
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="rounded-3xl h-48 skeleton" />
//             ))}
//           </div>
//         ) : featured.length === 0 ? (
//           <p className="text-center text-ink-muted py-10 text-sm">No products found.</p>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//             {featured.map((p) => (
//               <ProductCard key={p.productID} product={p} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { api, imageUrl } from "../api/client";
import ProductCard from "../components/ProductCard";
import { Search, Zap, ArrowRight } from "lucide-react";

const POLL_INTERVAL = 20_000; // 20 seconds

export default function Home() {
  const [products, setProducts]       = useState([]);
  const [banners, setBanners]         = useState([]);
  const [promotions, setPromotions]   = useState([]);
  const [categories, setCategories]   = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [activeCat, setActiveCat]     = useState("");
  const [loading, setLoading]         = useState(true);
  const [newProductIds, setNewProductIds] = useState(new Set());
  const knownProductIds = useRef(null);
  const pollRef = useRef(null);

  const scrollRef     = useRef(null);
  const autoScrollRef = useRef(null);
  const isDragging    = useRef(false);
  const startX        = useRef(0);
  const scrollLeftVal = useRef(0);

  const fetchAll = useCallback((silent = false) => {
    return Promise.allSettled([
      api.get("/api/products"),
      api.get("/api/banners?status=active"),
      api.get("/api/promotions?activeOnly=true"),
      api.get("/api/categories"),
    ]).then(([p, b, promo, c]) => {
      const incoming = p.status === "fulfilled" && Array.isArray(p.value) ? p.value : null;

      if (incoming !== null) {
        // Detect new products on silent polls
        if (silent && knownProductIds.current !== null) {
          const incomingIds = new Set(incoming.map((pr) => pr.productID));
          const added = [...incomingIds].filter((id) => !knownProductIds.current.has(id));
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
        knownProductIds.current = new Set(incoming.map((pr) => pr.productID));
        setProducts(incoming);
      }

      if (b.status     === "fulfilled") setBanners(Array.isArray(b.value)        ? b.value       : []);
      if (promo.status === "fulfilled") setPromotions(Array.isArray(promo.value) ? promo.value   : []);
      if (c.status     === "fulfilled") setCategories(Array.isArray(c.value)     ? c.value       : []);

      if (!silent) setLoading(false);
    });
  }, []);

  // Initial load + polling
  useEffect(() => {
    fetchAll(false);
    pollRef.current = setInterval(() => fetchAll(true), POLL_INTERVAL);
    return () => clearInterval(pollRef.current);
  }, [fetchAll]);

  // Banner auto-advance
  useEffect(() => {
    if (banners.length <= 1) return;
    const t = setInterval(() => setBannerIndex((i) => (i + 1) % banners.length), 3500);
    return () => clearInterval(t);
  }, [banners]);

  // Category scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    autoScrollRef.current = setInterval(() => {
      if (isDragging.current) return;
      container.scrollLeft += 1;
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth)
        container.scrollLeft = 0;
    }, 20);
    return () => clearInterval(autoScrollRef.current);
  }, [categories]);

  const featured = products
    .filter((p) => !activeCat || String(p.categoryID) === activeCat)
    .slice(0, 10);

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
    <div className="max-w-3xl mx-auto pb-24 animate-fade-in">
      <style>{`
        @keyframes newGlow {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
          50%  { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
        .new-product-card { animation: newGlow 1.4s ease; outline: 2px solid #22c55e; border-radius: inherit; }
      `}</style>

      {/* ── SEARCH BAR ─────────────────────────────────────────── */}
      <div className="px-4 pt-4 pb-2">
        <Link
          to="/products"
          className="
            flex items-center gap-3
            bg-white border border-line/60 rounded-full
            px-4 py-2.5 shadow-card
            hover:border-brand/40 hover:shadow-lifted
            transition-all duration-200
          "
        >
          <Search size={16} className="text-ink-faint" />
          <span className="text-ink-faint text-sm">Search for groceries…</span>
        </Link>
      </div>

      {/* ── HERO BANNER ────────────────────────────────────────── */}
      <div className="px-4 pt-2 pb-5">
        <div className="relative w-full h-52 sm:h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-brand to-orange-400" />
          {banners.map((b, i) => (
            <img
              key={b.bannerID}
              src={imageUrl(b.image)}
              alt={b.title || "Promotion"}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                i === bannerIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {banners.length === 0 && !loading && (
            <div className="absolute inset-0 flex flex-col justify-center px-6">
              <span className="bg-white/25 text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2">Flash Sale</span>
              <h2 className="text-white font-bold text-2xl leading-snug">Get 30% off<br />fresh produce</h2>
              <p className="text-white/80 text-sm mt-1 mb-4">Today only — limited stock</p>
              <Link to="/products" className="bg-white text-brand font-semibold text-sm px-5 py-2 rounded-full w-fit hover:bg-brand-light transition-colors">Shop now</Link>
            </div>
          )}
          {banners.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setBannerIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === bannerIndex ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
                  aria-label={`Banner ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── CATEGORIES ─────────────────────────────────────────── */}
      <div className="mb-6">
        <div className="px-4 flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-base text-ink">Categories</h2>
        </div>
        <div className="flex items-center gap-2 px-4">
          <button
            onClick={() => setActiveCat("")}
            className={`shrink-0 px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
              activeCat === "" ? "bg-brand text-white border-brand shadow-btn" : "bg-white text-ink-muted border-line hover:border-brand/40"
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
              {categories.map((cat) => (
                <button
                  key={cat.categoryID}
                  onClick={() => setActiveCat(String(cat.categoryID))}
                  className={`shrink-0 px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
                    activeCat === String(cat.categoryID)
                      ? "bg-brand text-white border-brand shadow-btn"
                      : "bg-white text-ink-muted border-line hover:border-brand/40"
                  }`}
                >
                  {cat.categoryName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TODAY'S DEALS ──────────────────────────────────────── */}
      {promotions.length > 0 && (
        <div className="mb-6">
          <div className="px-4 flex items-center justify-between mb-3">
            <h2 className="font-display font-bold text-base text-ink">Today's deals</h2>
          </div>
          <div className="flex gap-3 px-4 overflow-x-auto scrollbar-none pb-2">
            {promotions.map((promo) => (
              <div
                key={promo.promotionID}
                className="shrink-0 w-32 bg-white rounded-[22px] border border-line/60 shadow-card overflow-hidden hover:shadow-lifted hover:-translate-y-0.5 transition-all"
              >
                <div className="relative h-20 bg-[#F4F6F5] flex items-center justify-center">
                  {promo.image ? (
                    <img src={imageUrl(promo.image)} alt={promo.title} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-5xl" aria-hidden>🏷</span>
                  )}
                  <span className="absolute top-2 right-2 bg-linear-to-r from-[#F4A261] to-[#E76F51] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                    -{promo.discountPercent}%
                  </span>
                </div>
                <div className="p-2.5">
                  <p className="text-xs font-bold text-ink truncate">{promo.title}</p>
                  <p className="text-[11px] text-ink-faint mt-0.5 truncate">{promo.productName || promo.categoryName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── FREE DELIVERY BANNER ───────────────────────────────── */}
      <div className="px-4 mb-6">
        <div className="flex items-center gap-3 bg-[#F7F0E4] border border-[#E7D8B8] rounded-3xl px-4 py-3 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#F3E7CE] border border-[#E7D8B8] flex items-center justify-center shrink-0">
            <Zap size={20} className="text-[#D49A1E]" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-base text-[#2F3A33]">Free delivery today</p>
            <p className="text-sm text-[#8C8C8C]">On orders above $15</p>
          </div>
          <Link to="/products" className="bg-[#E8AA45] text-white font-semibold px-4 py-2 rounded-full text-sm shadow-md whitespace-nowrap">
            Shop now
          </Link>
        </div>
      </div>

      {/* ── FEATURED PRODUCTS ──────────────────────────────────── */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-base text-ink">Featured products</h2>
          <Link to="/products" className="text-brand text-sm font-bold hover:underline flex items-center gap-1">
            See all <ArrowRight size={13} strokeWidth={2.5} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-3xl h-48 skeleton" />
            ))}
          </div>
        ) : featured.length === 0 ? (
          <p className="text-center text-ink-muted py-10 text-sm">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {featured.map((p) => (
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

