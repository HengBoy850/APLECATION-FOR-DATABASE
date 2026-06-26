import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CashierRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.password || !form.confirmPassword) {
    setError("All fields are required");
    return;
  }

  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  axios.post(
    "http://172.20.10.14:8081/api/users/register",
    {
      name: form.name,
      email: form.email,
      password: form.password
    }
  )
  .then(() => {
    navigate("/login");
  })
  .catch((err) => {
    setError(
      err.response?.data?.message ||
      "Registration failed"
    );
  });
};

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gray-950">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-green-500 rounded-full blur-3xl opacity-30 animate-pulse top-10 left-10"></div>
        <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse bottom-10 right-10"></div>
        <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse top-1/2 left-1/2"></div>
      </div>

      {/* REGISTER CARD */}
      <form
        onSubmit={handleRegister}
        className="relative z-10 w-96 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8"
      >
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Supermarket MS
        </h1>
        <p className="text-center text-gray-300 text-sm mb-6">
          Cashier Registration
        </p>

        {error && (
          <p className="text-red-400 text-sm text-center mb-3">{error}</p>
        )}

        <input
          type="text"
          name="name"
          required
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="password"
          name="confirmPassword"
          required
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full p-3 mb-5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-lg transition"
        >
          Register
        </button>

        <p className="text-xs text-center text-gray-400 mt-5">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-400 hover:text-green-300 cursor-pointer font-medium"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}