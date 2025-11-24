// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fdfaf6",
          100: "#f9f4ef",
          200: "#f3ebe0",
        },
        ink: {
          700: "#2d2b28",
          800: "#252320",
          900: "#1b1a17",
        },
        parchment: "#f7efe8",
      },
      fontFamily: {
        lora: ["Lora", "serif"],
        playfair: ["Playfair Display", "serif"],
        patrick: ["Patrick Hand", "cursive"], // Already referenced in your JSX
      },
      boxShadow: {
        Techno: "0 6px 16px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
