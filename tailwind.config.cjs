
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        graphite: "#4b4b4b",
        mist: "#f4f4f4",
        fog: "#e9e9e9"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Montserrat", "Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 45px rgba(17,17,17,0.06)",
      },
    },
  },
  plugins: [],
};
