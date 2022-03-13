const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Century Gothic", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "special-grey": "#1f1f1f",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
