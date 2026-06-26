// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Register() {
//   const { register } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const redirectTo = location.state?.from?.pathname || "/";

//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!name || !phone || !password) {
//       setError("Please fill in all required fields.");
//       return;
//     }
//     if (password.length < 6) {
//       setError("Password must be at least 6 characters.");
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError("Passwords don't match.");
//       return;
//     }

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
//     <div className="max-w-sm mx-auto px-4 py-12">
//       <h1 className="font-display font-bold text-2xl mb-1">Create your account</h1>
//       <p className="text-market-ink/60 mb-6 text-sm">
//         Takes less than a minute. You'll only need to do this once on this device.
//       </p>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1.5" htmlFor="name">
//             Full name
//           </label>
//           <input
//             id="name"
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Sokha Chan"
//             className="w-full px-4 py-2.5 border border-market-line rounded-lg bg-white focus:border-market-green outline-none"
//             autoComplete="name"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1.5" htmlFor="phone">
//             Phone number
//           </label>
//           <input
//             id="phone"
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="012 345 678"
//             className="w-full px-4 py-2.5 border border-market-line rounded-lg bg-white focus:border-market-green outline-none"
//             autoComplete="tel"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1.5" htmlFor="password">
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="At least 6 characters"
//             className="w-full px-4 py-2.5 border border-market-line rounded-lg bg-white focus:border-market-green outline-none"
//             autoComplete="new-password"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium mb-1.5" htmlFor="confirmPassword">
//             Confirm password
//           </label>
//           <input
//             id="confirmPassword"
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             placeholder="Repeat your password"
//             className="w-full px-4 py-2.5 border border-market-line rounded-lg bg-white focus:border-market-green outline-none"
//             autoComplete="new-password"
//           />
//         </div>

//         {error && (
//           <p className="text-sm text-market-orangeDark bg-market-orange/10 px-3 py-2 rounded-lg">
//             {error}
//           </p>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-market-green text-white font-semibold py-2.5 rounded-lg hover:bg-market-greenDark disabled:opacity-60"
//         >
//           {loading ? "Creating account..." : "Create account"}
//         </button>
//       </form>

//       <p className="text-sm text-market-ink/60 mt-5 text-center">
//         Already have an account?{" "}
//         <Link to="/login" className="text-market-green font-medium hover:underline">
//           Log in
//         </Link>
//       </p>
//     </div>
//   );
// }


// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Register() {
//   const { register } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const redirectTo = location.state?.from?.pathname || "/";

//   const [name, setName]                     = useState("");
//   const [phone, setPhone]                   = useState("");
//   const [password, setPassword]             = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError]                   = useState("");
//   const [loading, setLoading]               = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (!name || !phone || !password) return setError("Please fill in all required fields.");
//     if (password.length < 6)           return setError("Password must be at least 6 characters.");
//     if (password !== confirmPassword)   return setError("Passwords don't match.");

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
//     <div className="max-w-sm mx-auto px-4 py-14 pb-28">
//       {/* Brand mark */}
//       <div className="text-center mb-8">
//         <div className="w-16 h-16 rounded-2xl bg-brand flex items-center justify-center text-3xl mx-auto mb-4">
//           🛒
//         </div>
//         <h1 className="font-bold text-2xl text-ink">Create your account</h1>
//         <p className="text-ink-muted text-sm mt-1">Takes less than a minute.</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-3">
//         {[
//           { id: "name",            label: "Full name",        type: "text",     val: name,            set: setName,            ph: "Sokha Chan",       ac: "name" },
//           { id: "phone",           label: "Phone number",     type: "tel",      val: phone,           set: setPhone,           ph: "012 345 678",      ac: "tel" },
//           { id: "password",        label: "Password",         type: "password", val: password,        set: setPassword,        ph: "At least 6 characters", ac: "new-password" },
//           { id: "confirmPassword", label: "Confirm password", type: "password", val: confirmPassword, set: setConfirmPassword, ph: "Repeat your password",  ac: "new-password" },
//         ].map((f) => (
//           <div key={f.id}>
//             <label className="block text-sm font-medium text-ink mb-1.5" htmlFor={f.id}>
//               {f.label}
//             </label>
//             <input
//               id={f.id}
//               type={f.type}
//               value={f.val}
//               onChange={(e) => f.set(e.target.value)}
//               placeholder={f.ph}
//               autoComplete={f.ac}
//               className="w-full px-4 py-3 border border-line rounded-xl bg-white text-sm text-ink focus:border-brand focus:bg-white outline-none transition-colors"
//             />
//           </div>
//         ))}

//         {error && (
//           <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-600">
//             {error}
//           </div>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-brand text-white font-bold py-3.5 rounded-full hover:bg-brand-dark transition-colors disabled:opacity-60 text-sm"
//         >
//           {loading ? "Creating account…" : "Create account"}
//         </button>
//       </form>

//       <p className="text-sm text-ink-muted mt-6 text-center">
//         Already have an account?{" "}
//         <Link to="/login" className="text-brand font-semibold hover:underline">
//           Log in
//         </Link>
//       </p>
//     </div>
//   );
// }


import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User, Phone, Lock, ArrowRight } from "lucide-react";

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

  const [values, setValues] = useState({ name: "", phone: "", password: "", confirmPassword: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

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
                      type={f.type}
                      value={values[f.id]}
                      onChange={set(f.id)}
                      placeholder={f.ph}
                      autoComplete={f.ac}
                      className="input-base pl-10"
                    />
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
