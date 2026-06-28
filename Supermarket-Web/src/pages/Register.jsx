


// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { User, Phone, Lock, ArrowRight } from "lucide-react";

// const FIELDS = [
//   { id: "name",            label: "Full name",        type: "text",     icon: User,  ph: "Sokha Chan",            ac: "name" },
//   { id: "phone",           label: "Phone number",     type: "tel",      icon: Phone, ph: "012 345 678",           ac: "tel" },
//   { id: "password",        label: "Password",         type: "password", icon: Lock,  ph: "At least 6 characters", ac: "new-password" },
//   { id: "confirmPassword", label: "Confirm password", type: "password", icon: Lock,  ph: "Repeat your password",  ac: "new-password" },
// ];

// export default function Register() {
//   const { register } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const redirectTo = location.state?.from?.pathname || "/";

//   const [values, setValues] = useState({ name: "", phone: "", password: "", confirmPassword: "" });
//   const [error, setError]   = useState("");
//   const [loading, setLoading] = useState(false);

//   const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     const { name, phone, password, confirmPassword } = values;
//     if (!name || !phone || !password) return setError("Please fill in all required fields.");
//     if (password.length < 6)          return setError("Password must be at least 6 characters.");
//     if (password !== confirmPassword)  return setError("Passwords don't match.");
//     setLoading(true);
//     try {
//       await register({ name: name.trim(), phone: phone.trim(), password });
//       navigate(redirectTo, { replace: true });
//     } catch (err) {
//       setError(
//         err.status === 409
//           ? "An account with this phone number already exists."
//           : err.message || "Could not create account. Try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[100dvh] bg-canvas flex flex-col">

//       {/* Hero */}
//       <div className="bg-hero-gradient px-6 pt-14 pb-10 text-white text-center">
//         <div className="
//           w-16 h-16 rounded-3xl bg-white/15 border border-white/25
//           flex items-center justify-center text-3xl mx-auto mb-5
//           shadow-[0_4px_20px_rgba(0,0,0,0.15)]
//         ">
//           🛒
//         </div>
//         <h1 className="font-display font-extrabold text-2xl">Create your account</h1>
//         <p className="text-white/70 text-sm mt-1">Takes less than a minute.</p>
//       </div>

//       {/* Form */}
//       <div className="flex-1 px-4 -mt-5 pb-12">
//         <div className="bg-white rounded-3xl border border-line/60 shadow-lifted p-6 max-w-sm mx-auto">

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {FIELDS.map((f) => {
//               const Icon = f.icon;
//               return (
//                 <div key={f.id}>
//                   <label
//                     className="block text-xs font-bold text-ink-muted uppercase tracking-wider mb-2"
//                     htmlFor={f.id}
//                   >
//                     {f.label}
//                   </label>
//                   <div className="relative">
//                     <Icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
//                     <input
//                       id={f.id}
//                       type={f.type}
//                       value={values[f.id]}
//                       onChange={set(f.id)}
//                       placeholder={f.ph}
//                       autoComplete={f.ac}
//                       className="input-base pl-10"
//                     />
//                   </div>
//                 </div>
//               );
//             })}

//             {error && (
//               <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-sm text-danger font-medium animate-slide-up">
//                 {error}
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="btn-primary mt-2 disabled:opacity-60 font-display text-[15px]"
//             >
//               {loading ? "Creating account…" : (
//                 <>Create account <ArrowRight size={16} strokeWidth={2.5} /></>
//               )}
//             </button>
//           </form>

//           <p className="text-sm text-ink-muted mt-5 text-center">
//             Already have an account?{" "}
//             <Link to="/login" className="text-brand font-bold hover:underline">
//               Log in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Phone, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";

const FIELDS = [
  { id: "name",            label: "Full name",        type: "text",     icon: User,  ph: "Sokha Chan",            ac: "name" },
  { id: "phone",           label: "Phone number",     type: "tel",      icon: Phone, ph: "012 345 678",           ac: "tel" },
  { id: "password",        label: "Password",         type: "password", icon: Lock,  ph: "At least 6 characters", ac: "new-password" },
  { id: "confirmPassword", label: "Confirm password", type: "password", icon: Lock,  ph: "Repeat your password",  ac: "new-password" },
];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";

  const [values, setValues]   = useState({ name: "", phone: "", password: "", confirmPassword: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  // track visibility per password field
  const [showPassword, setShowPassword]        = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { name, phone, password, confirmPassword } = values;
    if (!name || !phone || !password) return setError("Please fill in all required fields.");
    if (password.length < 6)          return setError("Password must be at least 6 characters.");
    if (password !== confirmPassword)  return setError("Passwords don't match.");
    setLoading(true);
    try {
      await register({ name: name.trim(), phone: phone.trim(), password });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(
        err.status === 409
          ? "An account with this phone number already exists."
          : err.message || "Could not create account. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // resolve actual input type for password fields
  const resolveType = (field) => {
    if (field.id === "password")        return showPassword        ? "text" : "password";
    if (field.id === "confirmPassword") return showConfirmPassword ? "text" : "password";
    return field.type;
  };

  const toggleVisible = (fieldId) => {
    if (fieldId === "password")        setShowPassword((v) => !v);
    if (fieldId === "confirmPassword") setShowConfirmPassword((v) => !v);
  };

  const isVisible = (fieldId) => {
    if (fieldId === "password")        return showPassword;
    if (fieldId === "confirmPassword") return showConfirmPassword;
    return false;
  };

  return (
    <div className="min-h-[100dvh] bg-canvas flex flex-col">

      {/* Hero */}
      <div className="bg-hero-gradient px-6 pt-14 pb-10 text-white text-center">
        <div className="
          w-16 h-16 rounded-3xl bg-white/15 border border-white/25
          flex items-center justify-center text-3xl mx-auto mb-5
          shadow-[0_4px_20px_rgba(0,0,0,0.15)]
        ">
          🛒
        </div>
        <h1 className="font-display font-extrabold text-2xl">Create your account</h1>
        <p className="text-white/70 text-sm mt-1">Takes less than a minute.</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-4 -mt-5 pb-12">
        <div className="bg-white rounded-3xl border border-line/60 shadow-lifted p-6 max-w-sm mx-auto">

          <form onSubmit={handleSubmit} className="space-y-4">
            {FIELDS.map((f) => {
              const Icon = f.icon;
              const isPassword = f.id === "password" || f.id === "confirmPassword";
              const visible = isVisible(f.id);

              return (
                <div key={f.id}>
                  <label
                    className="block text-xs font-bold text-ink-muted uppercase tracking-wider mb-2"
                    htmlFor={f.id}
                  >
                    {f.label}
                  </label>
                  <div className="relative">
                    <Icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
                    <input
                      id={f.id}
                      type={resolveType(f)}
                      value={values[f.id]}
                      onChange={set(f.id)}
                      placeholder={f.ph}
                      autoComplete={f.ac}
                      className={`input-base pl-10 ${isPassword ? "pr-11" : ""}`}
                    />
                    {/* Eye toggle — only for password fields */}
                    {isPassword && (
                      <button
                        type="button"
                        onClick={() => toggleVisible(f.id)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink-muted transition-colors p-1"
                        tabIndex={-1}
                        aria-label={visible ? "Hide password" : "Show password"}
                      >
                        {visible
                          ? <EyeOff size={16} strokeWidth={2} />
                          : <Eye    size={16} strokeWidth={2} />
                        }
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-sm text-danger font-medium animate-slide-up">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary mt-2 disabled:opacity-60 font-display text-[15px]"
            >
              {loading ? "Creating account…" : (
                <>Create account <ArrowRight size={16} strokeWidth={2.5} /></>
              )}
            </button>
          </form>

          <p className="text-sm text-ink-muted mt-5 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-brand font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
