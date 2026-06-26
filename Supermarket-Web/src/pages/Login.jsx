



import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Phone, Lock, ArrowRight } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";

  const [phone, setPhone]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!phone || !password) return setError("Enter your phone number and password.");
    setLoading(true);
    try {
      await login(phone.trim(), password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(
        err.status === 401
          ? "Incorrect phone number or password."
          : err.message || "Could not log in. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-canvas flex flex-col">

      {/* Hero top band */}
      <div className="bg-hero-gradient px-6 pt-16 pb-10 text-white text-center">
        <div className="
          w-16 h-16 rounded-3xl bg-white/15 border border-white/25
          flex items-center justify-center text-3xl mx-auto mb-5
          shadow-[0_4px_20px_rgba(0,0,0,0.15)]
        ">
          🛒
        </div>
        <h1 className="font-display font-extrabold text-2xl text-black">Welcome back</h1>
        <p className="text-white/70 text-sm mt-1 text-black ">Log in to continue shopping.</p>
      </div>

      {/* Form card */}
      <div className="flex-1 px-4 -mt-5">
        <div className="bg-white rounded-3xl border border-line/60 shadow-lifted p-6 max-w-sm mx-auto">

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-ink-muted uppercase tracking-wider mb-2" htmlFor="phone">
                Phone number
              </label>
              <div className="relative">
                <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="012 345 678"
                  className="input-base pl-10"
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-ink-muted uppercase tracking-wider mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-base pl-10"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Error */}
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
              {loading ? "Logging in…" : (
                <>Log in <ArrowRight size={16} strokeWidth={2.5} /></>
              )}
            </button>
          </form>

          <p className="text-sm text-ink-muted mt-5 text-center">
            New here?{" "}
            <Link to="/register" className="text-brand font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
}
