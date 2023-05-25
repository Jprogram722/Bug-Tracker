/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bug-primary": "#00668A",
        "bug-secondary": "#004E71"
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    container: {
      padding: "10px",
      center: true,
    },
    screens:{
      sm: "640px",
      md: "768px",
    }
  },
  plugins: [require('@tailwindcss/typography'), require("daisyui")],
};

