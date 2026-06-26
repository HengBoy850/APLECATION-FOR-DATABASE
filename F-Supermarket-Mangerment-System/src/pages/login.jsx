import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://172.20.10.14:8081/api/users/login",
        { email, password }
      );

      if (!res.data.user) {
        setError("Invalid response from server");
        return;
      }

      const user = res.data.user;

      localStorage.setItem(
        "user",
        JSON.stringify({
          userID: user.userID,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        })
      );

      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gray-950">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-green-500 rounded-full blur-3xl opacity-30 animate-pulse top-10 left-10"></div>
        <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse bottom-10 right-10"></div>
        <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse top-1/2 left-1/2"></div>
      </div>

      <form
        onSubmit={handleLogin}
        className="relative z-10 w-96 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8"
      >
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Supermarket MS
        </h1>
        <p className="text-center text-gray-300 text-sm mb-6">
          Admin Login Panel
        </p>

        {error && (
          <p className="text-red-400 text-sm text-center mb-3">{error}</p>
        )}

        <input
          type="email"
          required
          className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          required
          className="w-full p-3 mb-5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-lg transition"
        >
          Login
        </button>

        <p className="text-xs text-center text-gray-400 mt-5">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-400 hover:text-green-300 cursor-pointer font-medium"
          >
            Sign up as Cashier
          </span>
        </p>
      </form>
    </div>
  );
}

