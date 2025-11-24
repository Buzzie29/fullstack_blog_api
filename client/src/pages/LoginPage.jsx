import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="font-lora text-ink-700 bg-cream-100 min-h-screen flex items-center justify-center p-4 md:p-6">
      {/* Card */}
      <div className="w-full max-w-md bg-parchment p-8 rounded-2xl shadow-vintage border border-cream-200 transition-all hover:shadow-lg hover:-translate-y-1">
        {/* Title */}
        <h2 className="font-playfair text-4xl text-ink-900 text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-8 text-sm tracking-wide">
          Sign in to continue your story ✍️
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-md border border-red-100">
              {error}
            </p>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-ink-800 text-[1.05rem] placeholder-gray-400 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-ink-800 text-[1.05rem] placeholder-gray-400 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#3e2f26] text-[#fffaf2] py-2 rounded-md font-semibold tracking-wide hover:bg-[#2a1f1b] transition-colors duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Bottom text */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-ink-800 font-semibold hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
