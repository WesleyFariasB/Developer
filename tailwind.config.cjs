module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"] ,
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        graphite: "#4b4b4b",
        mist: "#f4f4f4",
        fog: "#e9e9e9",
        lavender: "#6f6ce6",
        midnight: "#0b0b0b"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        card: "0 0 0 1px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
