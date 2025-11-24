import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(username, email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f4ec] text-[#2e2a27] font-['Lora'] px-4">
      <div className="w-full max-w-md bg-[#fffaf2] border border-[#d8cfc4] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-8 backdrop-blur-sm">
        <h2 className="text-center text-4xl font-['Playfair_Display'] font-semibold mb-8 text-[#2a2521]">
          Create Account
        </h2>

        {error && (
          <p className="text-center text-red-500 text-sm mb-4 bg-red-50 border border-red-200 py-2 rounded-md">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#5a514b] mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-b border-[#c4b7a6] bg-transparent focus:outline-none focus:border-[#5b4636] py-2 text-[1.05rem] placeholder-[#9a9187] transition-all"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#5a514b] mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-[#c4b7a6] bg-transparent focus:outline-none focus:border-[#5b4636] py-2 text-[1.05rem] placeholder-[#9a9187] transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#5a514b] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-[#c4b7a6] bg-transparent focus:outline-none focus:border-[#5b4636] py-2 text-[1.05rem] placeholder-[#9a9187] transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3e2f26] text-[#fffaf2] py-2 rounded-md font-semibold tracking-wide hover:bg-[#2a1f1b] transition-colors duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-[#5b5149]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#3e2f26] hover:underline hover:text-[#2a1f1b]"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
