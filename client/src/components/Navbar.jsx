import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; // 💡 Fix: Added .jsx extension
import logo from "../assets/Emblem.svg"; // 1. Import the logo

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    // 🧭 Techno Navbar Wrapper
    <nav className="bg-[#fdfaf6] border-b border-[#d8c8a8]/60 shadow-sm shadow-[#00000015] font-['Lora'] text-[#2e2a27] sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        
        {/* ✴ Logo / Brand */}
        <Link
          to="/"
          // 💡 2. Make the Link a flex container
          className="flex items-center space-x-3 font-['Playfair_Display'] text-3xl sm:text-4xl text-[#2d2926] tracking-wide hover:text-[#5a4632] transition-colors duration-300"
        >
          {/* 💡 3. Add the img tag */}
          <img
            src={logo}
            alt="TechnoVerse Emblem"
            className="h-10 sm:h-12 w-auto" // Control the logo size
          />
          <span>TechnoVerse</span>
        </Link>

        {/* 🔗 Navigation Links */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {user ? (
            <>
              {/* Subtle welcome message */}
              <span className="hidden sm:block text-sm sm:text-base text-[#4a4036]">
                Welcome,{" "}
                <span className="font-semibold text-[#2e2a27]">
                  {user.username}
                </span>
              </span>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-[#5e5145] hover:text-[#a44a3f] border border-transparent hover:border-[#a44a3f]/40
                            px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login Link */}
              <Link
                to="/login"
                className="text-[#5e5145] hover:text-[#2e2a27] px-3 py-2 text-sm font-medium transition-colors duration-300"
              >
                Login
              </Link>

              {/* Register Button */}
              <Link
                to="/register"
                className="bg-[#3b2f2f] text-[#fdfaf6] px-4 py-2 rounded-md text-sm font-semibold
                            hover:bg-[#2e2624] transition-all duration-300 shadow-sm shadow-[#00000022]"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

