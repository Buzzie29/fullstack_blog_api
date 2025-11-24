import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";

// 🌿 Techno Modern App Wrapper
function App() {
  return (
    // Global background and font setup
    <div className="min-h-screen bg-[#f8f4ec] text-[#2e2a27] font-['Lora'] selection:bg-[#d6c3a1] selection:text-[#2e2a27]">
      {/*  🧭 Global Navbar */}
      <Navbar />

      {/* Main content — each page will handle its own internal layout */}
      <main className="pt-6 sm:pt-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>

      {/* Optional: Global subtle footer */}
      <footer className="text-center text-sm text-[#6b625b] py-8">
        <p className="font-['Playfair_Display'] tracking-wide">
          © {new Date().getFullYear()} TechnoVerse ✦ Crafted with Coffee ☕
        </p>
      </footer>
    </div>
  );
}

export default App;
