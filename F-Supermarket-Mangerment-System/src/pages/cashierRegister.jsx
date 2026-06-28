

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function CashierRegister() {
//   const [form, setForm] = useState({
//     name: "", email: "", password: "", confirmPassword: "",
//   });
//   const [error, setError]     = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleRegister = (e) => {
//     e.preventDefault();
//     if (!form.name || !form.email || !form.password || !form.confirmPassword) {
//       setError("All fields are required"); return;
//     }
//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match"); return;
//     }
//     setLoading(true);
//     axios.post("http://172.20.10.14:8081/api/users/register", {
//       name: form.name, email: form.email, password: form.password,
//     })
//       .then(() => navigate("/login"))
//       .catch((err) => {
//         setError(err.response?.data?.message || "Registration failed");
//         setLoading(false);
//       });
//   };

//   const field = (label, name, type, placeholder) => (
//     <div style={{ marginBottom: 16 }}>
//       <label style={{
//         display: "block", fontSize: 13, fontWeight: 600,
//         color: "#2B2A28", marginBottom: 6, fontFamily: "sans-serif",
//       }}>{label}</label>
//       <input
//         type={type}
//         name={name}
//         required
//         placeholder={placeholder}
//         value={form[name]}
//         onChange={handleChange}
//         style={{
//           width: "100%", boxSizing: "border-box",
//           padding: "11px 14px", borderRadius: 8,
//           border: "1.5px solid #E7E2D8",
//           background: "#FFFFFF", fontSize: 14,
//           fontFamily: "sans-serif", color: "#2B2A28",
//           outline: "none", transition: "border-color .15s",
//         }}
//         onFocus={(e) => e.target.style.borderColor = "#C7A77B"}
//         onBlur={(e) => e.target.style.borderColor = "#E7E2D8"}
//       />
//     </div>
//   );

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
//       }} className="reg-left-panel">
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

//         <div>
//           <div style={{
//             display: "inline-block", background: "#3A3835",
//             color: "#C7A77B", fontSize: 11, fontFamily: "sans-serif",
//             fontWeight: 600, letterSpacing: "0.12em",
//             padding: "5px 14px", borderRadius: 20, marginBottom: 20,
//             textTransform: "uppercase",
//           }}>Cashier Registration</div>
//           <h1 style={{
//             color: "#F7F5F0", fontSize: 36, fontWeight: 700,
//             lineHeight: 1.2, margin: "0 0 16px",
//           }}>
//             Join the team<br />as a cashier.
//           </h1>
//           <p style={{
//             color: "#A39A8B", fontSize: 15, lineHeight: 1.7,
//             fontFamily: "sans-serif", fontWeight: 400, margin: 0,
//           }}>
//             Create your cashier account to access<br />
//             the POS system and web order management.
//           </p>
//         </div>

//         <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//           {[
//             { icon: "✓", text: "Process sales at the counter" },
//             { icon: "✓", text: "View and confirm web orders" },
//             { icon: "✓", text: "Real-time inventory updates" },
//           ].map((item) => (
//             <div key={item.text} style={{
//               display: "flex", alignItems: "center", gap: 12,
//               color: "#A39A8B", fontSize: 14, fontFamily: "sans-serif",
//             }}>
//               <span style={{
//                 width: 22, height: 22, borderRadius: "50%",
//                 background: "#3A3835", color: "#C7A77B",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 fontSize: 11, fontWeight: 700, flexShrink: 0,
//               }}>{item.icon}</span>
//               {item.text}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right panel */}
//       <div style={{
//         flex: 1, display: "flex", alignItems: "center",
//         justifyContent: "center", padding: "24px 16px",
//       }}>
//         <div style={{ width: "100%", maxWidth: 400 }}>
//           {/* Mobile logo */}
//           <div style={{
//             display: "flex", alignItems: "center", gap: 12,
//             marginBottom: 32, justifyContent: "center",
//           }} className="mobile-logo">
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
//           }}>Create account</h2>
//           <p style={{
//             color: "#A39A8B", fontSize: 14, fontFamily: "sans-serif",
//             textAlign: "center", margin: "0 0 28px",
//           }}>Fill in your details to register as cashier</p>

//           <form onSubmit={handleRegister}>
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

//             {field("Full name", "name", "text", "Your full name")}
//             {field("Email address", "email", "email", "you@example.com")}
//             {field("Password", "password", "password", "••••••••")}
//             {field("Confirm password", "confirmPassword", "password", "••••••••")}

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
//                 marginTop: 4,
//               }}
//               onMouseEnter={(e) => { if (!loading) e.target.style.background = "#3A3835"; }}
//               onMouseLeave={(e) => { if (!loading) e.target.style.background = "#2B2A28"; }}
//             >
//               {loading ? "Creating account…" : "Create account"}
//             </button>
//           </form>

//           <p style={{
//             textAlign: "center", fontSize: 13,
//             color: "#A39A8B", fontFamily: "sans-serif", marginTop: 24,
//           }}>
//             Already have an account?{" "}
//             <span
//               onClick={() => navigate("/login")}
//               style={{
//                 color: "#8A5A2B", fontWeight: 600,
//                 cursor: "pointer", textDecoration: "underline",
//               }}
//             >
//               Sign in
//             </span>
//           </p>
//         </div>
//       </div>

//       <style>{`
//         @media (min-width: 768px) {
//           .reg-left-panel { display: flex !important; }
//           .mobile-logo { display: none !important; }
//         }
//       `}</style>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CashierRegister() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "",
  });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required"); return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match"); return;
    }
    setLoading(true);
    axios.post("http://172.20.10.14:8081/api/users/register", {
      name: form.name, email: form.email, password: form.password,
    })
      .then(() => navigate("/login"))
      .catch((err) => {
        setError(err.response?.data?.message || "Registration failed");
        setLoading(false);
      });
  };

  const field = (label, name, type, placeholder) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{
        display: "block", fontSize: 13, fontWeight: 600,
        color: "#2B2A28", marginBottom: 6, fontFamily: "sans-serif",
      }}>{label}</label>
      <input
        type={type} name={name} required
        placeholder={placeholder} value={form[name]}
        onChange={handleChange}
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
  );

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

      {/* Background image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.45)",
        zIndex: 0,
      }} />

      {/* Dark overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(43,42,40,0.6) 0%, rgba(43,42,40,0.3) 100%)",
        zIndex: 1,
      }} />

      {/* Branding bottom-left */}
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

      {/* Register card */}
      <div style={{
        position: "relative", zIndex: 2,
        width: "100%", maxWidth: 420,
        margin: "24px 16px",
        background: "rgba(255,255,255,0.97)",
        borderRadius: 16,
        padding: "36px 36px 28px",
        boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
      }}>

        {/* Card header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 48, height: 48, borderRadius: 12,
            background: "#2B2A28", marginBottom: 14,
            fontWeight: 700, fontSize: 16, color: "#C7A77B",
          }}>SM</div>
          <h2 style={{
            color: "#2B2A28", fontSize: 24, fontWeight: 700,
            margin: "0 0 6px",
          }}>Create account</h2>
          <p style={{
            color: "#A39A8B", fontSize: 13,
            fontFamily: "sans-serif", margin: 0,
          }}>Fill in your details to register as cashier</p>
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

        <form onSubmit={handleRegister}>
          {field("Full name",        "name",            "text",     "Your full name")}
          {field("Email address",    "email",           "email",    "you@example.com")}
          {field("Password",         "password",        "password", "••••••••")}
          {field("Confirm password", "confirmPassword", "password", "••••••••")}

          <button
            type="submit" disabled={loading}
            style={{
              width: "100%", padding: "12px",
              background: loading ? "#A39A8B" : "#2B2A28",
              color: "#F7F5F0", border: "none",
              borderRadius: 8, fontSize: 15,
              fontWeight: 600, fontFamily: "sans-serif",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background .15s", marginTop: 4,
            }}
            onMouseEnter={(e) => { if (!loading) { e.target.style.background = "#C7A77B"; e.target.style.color = "#2B2A28"; }}}
            onMouseLeave={(e) => { if (!loading) { e.target.style.background = "#2B2A28"; e.target.style.color = "#F7F5F0"; }}}
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        {/* Features */}
        <div style={{
          margin: "20px 0 0",
          borderTop: "1px solid #E7E2D8",
          paddingTop: 16,
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
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#8A5A2B", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}