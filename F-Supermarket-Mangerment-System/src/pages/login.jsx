// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";

// // export default function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     try {
// //       const res = await axios.post(
// //         "http://172.20.10.14:8081/api/users/login",
// //         { email, password }
// //       );

// //       if (!res.data.user) {
// //         setError("Invalid response from server");
// //         return;
// //       }

// //       const user = res.data.user;

// //       localStorage.setItem(
// //         "user",
// //         JSON.stringify({
// //           userID: user.userID,
// //           name: user.name,
// //           email: user.email,
// //           role: user.role,
// //           image: user.image,
// //         })
// //       );

// //       navigate("/dashboard");
// //     } catch (err) {
// //       console.log(err.response?.data || err.message);
// //       setError(err.response?.data?.message || "Invalid email or password");
// //     }
// //   };

// //   return (
// //     <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gray-950">
// //       {/* Animated Background */}
// //       <div className="absolute inset-0">
// //         <div className="absolute w-72 h-72 bg-green-500 rounded-full blur-3xl opacity-30 animate-pulse top-10 left-10"></div>
// //         <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse bottom-10 right-10"></div>
// //         <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse top-1/2 left-1/2"></div>
// //       </div>

// //       <form
// //         onSubmit={handleLogin}
// //         className="relative z-10 w-96 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8"
// //       >
// //         <h1 className="text-2xl font-bold text-white text-center mb-2">
// //           Supermarket MS
// //         </h1>
// //         <p className="text-center text-gray-300 text-sm mb-6">
// //           Admin Login Panel
// //         </p>

// //         {error && (
// //           <p className="text-red-400 text-sm text-center mb-3">{error}</p>
// //         )}

// //         <input
// //           type="email"
// //           required
// //           className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
// //           placeholder="Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //         />

// //         <input
// //           type="password"
// //           required
// //           className="w-full p-3 mb-5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //         />

// //         <button
// //           type="submit"
// //           className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-lg transition"
// //         >
// //           Login
// //         </button>

// //         <p className="text-xs text-center text-gray-400 mt-5">
// //           Don't have an account?{" "}
// //           <span
// //             onClick={() => navigate("/register")}
// //             className="text-green-400 hover:text-green-300 cursor-pointer font-medium"
// //           >
// //             Sign up as Cashier
// //           </span>
// //         </p>
// //       </form>
// //     </div>
// //   );
// // }


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Login() {
//   const [email, setEmail]       = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError]       = useState("");
//   const [loading, setLoading]   = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://172.20.10.14:8081/api/users/login",
//         { email, password }
//       );
//       if (!res.data.user) { setError("Invalid response from server"); setLoading(false); return; }
//       const user = res.data.user;
//       localStorage.setItem("user", JSON.stringify({
//         userID: user.userID, name: user.name,
//         email: user.email, role: user.role, image: user.image,
//       }));
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid email or password");
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{
//       minHeight: "100vh", display: "flex",
//       background: "#F7F5F0", fontFamily: "Georgia, serif",
//     }}>
//       {/* Left panel */}
//       <div style={{
//         display: "none",
//         width: "45%", background: "#2B2A28",
//         flexDirection: "column", justifyContent: "space-between",
//         padding: "48px 52px",
//       }}
//         className="login-left-panel"
//       >
//         {/* Logo */}
//         <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
//           <div style={{
//             width: 44, height: 44, borderRadius: 10,
//             background: "#C7A77B", display: "flex",
//             alignItems: "center", justifyContent: "center",
//             fontWeight: 700, fontSize: 17, color: "#2B2A28",
//           }}>SM</div>
//           <div>
//             <div style={{ color: "#F7F5F0", fontWeight: 700, fontSize: 16, lineHeight: 1.2 }}>Supermarket</div>
//             <div style={{ color: "#A39A8B", fontSize: 12, fontFamily: "sans-serif" }}>Management System</div>
//           </div>
//         </div>

//         {/* Center text */}
//         <div>
//           <div style={{
//             display: "inline-block", background: "#3A3835",
//             color: "#C7A77B", fontSize: 11, fontFamily: "sans-serif",
//             fontWeight: 600, letterSpacing: "0.12em",
//             padding: "5px 14px", borderRadius: 20, marginBottom: 20,
//             textTransform: "uppercase",
//           }}>Point of Sale</div>
//           <h1 style={{
//             color: "#F7F5F0", fontSize: 36, fontWeight: 700,
//             lineHeight: 1.2, margin: "0 0 16px",
//           }}>
//             Your store,<br />fully in control.
//           </h1>
//           <p style={{
//             color: "#A39A8B", fontSize: 15, lineHeight: 1.7,
//             fontFamily: "sans-serif", fontWeight: 400, margin: 0,
//           }}>
//             Manage products, track sales, handle web orders,<br />
//             and view reports — all from one place.
//           </p>
//         </div>

//         {/* Stats row */}
//         <div style={{ display: "flex", gap: 32 }}>
//           {[
//             { label: "Live inventory", value: "Real-time" },
//             { label: "POS + Web", value: "Unified" },
//             { label: "Reports", value: "Daily" },
//           ].map((s) => (
//             <div key={s.label}>
//               <div style={{ color: "#C7A77B", fontWeight: 700, fontSize: 18 }}>{s.value}</div>
//               <div style={{ color: "#8A8378", fontSize: 12, fontFamily: "sans-serif", marginTop: 2 }}>{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right panel — form */}
//       <div style={{
//         flex: 1, display: "flex", alignItems: "center",
//         justifyContent: "center", padding: "24px 16px",
//       }}>
//         <div style={{ width: "100%", maxWidth: 400 }}>
//           {/* Mobile logo */}
//           <div style={{
//             display: "flex", alignItems: "center", gap: 12,
//             marginBottom: 36, justifyContent: "center",
//           }}
//             className="mobile-logo"
//           >
//             <div style={{
//               width: 40, height: 40, borderRadius: 9,
//               background: "#2B2A28", display: "flex",
//               alignItems: "center", justifyContent: "center",
//               fontWeight: 700, fontSize: 15, color: "#C7A77B",
//             }}>SM</div>
//             <div>
//               <div style={{ color: "#2B2A28", fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>Supermarket</div>
//               <div style={{ color: "#A39A8B", fontSize: 11, fontFamily: "sans-serif" }}>Management System</div>
//             </div>
//           </div>

//           <h2 style={{
//             color: "#2B2A28", fontSize: 26, fontWeight: 700,
//             margin: "0 0 6px", textAlign: "center",
//           }}>Welcome back</h2>
//           <p style={{
//             color: "#A39A8B", fontSize: 14, fontFamily: "sans-serif",
//             textAlign: "center", margin: "0 0 32px",
//           }}>Sign in to your account to continue</p>

//           <form onSubmit={handleLogin}>
//             {error && (
//               <div style={{
//                 background: "#FEF2F2", border: "1px solid #FCA5A5",
//                 color: "#B91C1C", borderRadius: 8,
//                 padding: "10px 14px", fontSize: 13,
//                 fontFamily: "sans-serif", marginBottom: 20,
//                 display: "flex", alignItems: "center", gap: 8,
//               }}>
//                 <span style={{ fontSize: 16 }}>⚠</span> {error}
//               </div>
//             )}

//             {/* Email */}
//             <div style={{ marginBottom: 16 }}>
//               <label style={{
//                 display: "block", fontSize: 13, fontWeight: 600,
//                 color: "#2B2A28", marginBottom: 6,
//                 fontFamily: "sans-serif",
//               }}>Email address</label>
//               <input
//                 type="email"
//                 required
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 style={{
//                   width: "100%", boxSizing: "border-box",
//                   padding: "11px 14px", borderRadius: 8,
//                   border: "1.5px solid #E7E2D8",
//                   background: "#FFFFFF", fontSize: 14,
//                   fontFamily: "sans-serif", color: "#2B2A28",
//                   outline: "none", transition: "border-color .15s",
//                 }}
//                 onFocus={(e) => e.target.style.borderColor = "#C7A77B"}
//                 onBlur={(e) => e.target.style.borderColor = "#E7E2D8"}
//               />
//             </div>

//             {/* Password */}
//             <div style={{ marginBottom: 24 }}>
//               <label style={{
//                 display: "block", fontSize: 13, fontWeight: 600,
//                 color: "#2B2A28", marginBottom: 6, fontFamily: "sans-serif",
//               }}>Password</label>
//               <input
//                 type="password"
//                 required
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 style={{
//                   width: "100%", boxSizing: "border-box",
//                   padding: "11px 14px", borderRadius: 8,
//                   border: "1.5px solid #E7E2D8",
//                   background: "#FFFFFF", fontSize: 14,
//                   fontFamily: "sans-serif", color: "#2B2A28",
//                   outline: "none", transition: "border-color .15s",
//                 }}
//                 onFocus={(e) => e.target.style.borderColor = "#C7A77B"}
//                 onBlur={(e) => e.target.style.borderColor = "#E7E2D8"}
//               />
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               style={{
//                 width: "100%", padding: "12px",
//                 background: loading ? "#A39A8B" : "#2B2A28",
//                 color: "#F7F5F0", border: "none",
//                 borderRadius: 8, fontSize: 15,
//                 fontWeight: 600, fontFamily: "sans-serif",
//                 cursor: loading ? "not-allowed" : "pointer",
//                 transition: "background .15s",
//                 letterSpacing: "0.01em",
//               }}
//               onMouseEnter={(e) => { if (!loading) e.target.style.background = "#3A3835"; }}
//               onMouseLeave={(e) => { if (!loading) e.target.style.background = "#2B2A28"; }}
//             >
//               {loading ? "Signing in…" : "Sign in"}
//             </button>
//           </form>

//           <p style={{
//             textAlign: "center", fontSize: 13,
//             color: "#A39A8B", fontFamily: "sans-serif", marginTop: 24,
//           }}>
//             Don't have an account?{" "}
//             <span
//               onClick={() => navigate("/register")}
//               style={{
//                 color: "#8A5A2B", fontWeight: 600,
//                 cursor: "pointer", textDecoration: "underline",
//               }}
//             >
//               Register as cashier
//             </span>
//           </p>

//           <div style={{
//             marginTop: 40, paddingTop: 20,
//             borderTop: "1px solid #E7E2D8",
//             display: "flex", justifyContent: "center", gap: 24,
//           }}>
//             {["POS Sales", "Web Orders", "Reports"].map((t) => (
//               <div key={t} style={{
//                 display: "flex", alignItems: "center", gap: 6,
//                 color: "#A39A8B", fontSize: 12, fontFamily: "sans-serif",
//               }}>
//                 <span style={{
//                   width: 6, height: 6, borderRadius: "50%",
//                   background: "#C7A77B", display: "inline-block",
//                 }} />
//                 {t}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @media (min-width: 768px) {
//           .login-left-panel { display: flex !important; }
//           .mobile-logo { display: none !important; }
//         }
//       `}</style>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://172.20.10.14:8081/api/users/login",
        { email, password }
      );
      if (!res.data.user) { setError("Invalid response from server"); setLoading(false); return; }
      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify({
        userID: user.userID, name: user.name,
        email: user.email, role: user.role, image: user.image,
      }));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Georgia, serif",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* ── Background image ── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.45)",
        zIndex: 0,
      }} />

      {/* ── Dark overlay for extra depth ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(43,42,40,0.6) 0%, rgba(43,42,40,0.3) 100%)",
        zIndex: 1,
      }} />

      {/* ── Branding bottom-left ── */}
      <div style={{
        position: "absolute", bottom: 36, left: 40,
        zIndex: 3, display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 9,
          background: "#C7A77B", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontWeight: 700, fontSize: 15, color: "#2B2A28",
        }}>SM</div>
        <div>
          <div style={{ color: "#F7F5F0", fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>Supermarket</div>
          <div style={{ color: "#C7A77B", fontSize: 11, fontFamily: "sans-serif" }}>Management System</div>
        </div>
      </div>

      {/* ── Login card ── */}
      <div style={{
        position: "relative", zIndex: 2,
        width: "100%", maxWidth: 420,
        margin: "0 16px",
        background: "rgba(255,255,255,0.97)",
        borderRadius: 16,
        padding: "40px 36px",
        boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
      }}>

        {/* Card header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 48, height: 48, borderRadius: 12,
            background: "#2B2A28", marginBottom: 16,
            fontWeight: 700, fontSize: 16, color: "#C7A77B",
          }}>SM</div>
          <h2 style={{
            color: "#2B2A28", fontSize: 24, fontWeight: 700,
            margin: "0 0 6px",
          }}>Welcome back</h2>
          <p style={{
            color: "#A39A8B", fontSize: 13, fontFamily: "sans-serif", margin: 0,
          }}>Sign in to your account to continue</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "#FEF2F2", border: "1px solid #FCA5A5",
            color: "#B91C1C", borderRadius: 8,
            padding: "10px 14px", fontSize: 13,
            fontFamily: "sans-serif", marginBottom: 20,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ fontSize: 16 }}>⚠</span> {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block", fontSize: 13, fontWeight: 600,
              color: "#2B2A28", marginBottom: 6, fontFamily: "sans-serif",
            }}>Email address</label>
            <input
              type="email" required placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%", boxSizing: "border-box",
                padding: "11px 14px", borderRadius: 8,
                border: "1.5px solid #E7E2D8",
                background: "#FAFAF8", fontSize: 14,
                fontFamily: "sans-serif", color: "#2B2A28",
                outline: "none", transition: "border-color .15s",
              }}
              onFocus={(e) => e.target.style.borderColor = "#C7A77B"}
              onBlur={(e) => e.target.style.borderColor = "#E7E2D8"}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "block", fontSize: 13, fontWeight: 600,
              color: "#2B2A28", marginBottom: 6, fontFamily: "sans-serif",
            }}>Password</label>
            <input
              type="password" required placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%", boxSizing: "border-box",
                padding: "11px 14px", borderRadius: 8,
                border: "1.5px solid #E7E2D8",
                background: "#FAFAF8", fontSize: 14,
                fontFamily: "sans-serif", color: "#2B2A28",
                outline: "none", transition: "border-color .15s",
              }}
              onFocus={(e) => e.target.style.borderColor = "#C7A77B"}
              onBlur={(e) => e.target.style.borderColor = "#E7E2D8"}
            />
          </div>

          {/* Submit */}
          <button
            type="submit" disabled={loading}
            style={{
              width: "100%", padding: "12px",
              background: loading ? "#A39A8B" : "#2B2A28",
              color: "#F7F5F0", border: "none",
              borderRadius: 8, fontSize: 15,
              fontWeight: 600, fontFamily: "sans-serif",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background .15s",
            }}
            onMouseEnter={(e) => { if (!loading) e.target.style.background = "#C7A77B"; e.target.style.color = "#2B2A28"; }}
            onMouseLeave={(e) => { if (!loading) e.target.style.background = "#2B2A28"; e.target.style.color = "#F7F5F0"; }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          margin: "24px 0 0",
          borderTop: "1px solid #E7E2D8",
          paddingTop: 20,
          display: "flex", justifyContent: "center", gap: 20,
        }}>
          {["POS Sales", "Web Orders", "Reports"].map((t) => (
            <div key={t} style={{
              display: "flex", alignItems: "center", gap: 5,
              color: "#A39A8B", fontSize: 11, fontFamily: "sans-serif",
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "#C7A77B", display: "inline-block",
              }} />
              {t}
            </div>
          ))}
        </div>

        <p style={{
          textAlign: "center", fontSize: 13,
          color: "#A39A8B", fontFamily: "sans-serif", marginTop: 16,
        }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "#8A5A2B", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
          >
            Register as cashier
          </span>
        </p>
      </div>
    </div>
  );
}