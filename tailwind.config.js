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
        "special-grey-2": "#808080",
        "special-grey-3": "#C4C4C4",
        "shark-500": "#1F1F1F",
        "stormdust-500": "#676767",
        "manatee-500": "#92929D",
        "colonialwhite-500": "#FFEBB9",
        "tuatara-500": "#393939",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
