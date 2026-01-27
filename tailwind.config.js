module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./providers/**/*.{js,jsx,ts,tsx}",
    "./stores/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./com"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        mainGreen: "#5CBD44",
        darkGreen: "#286917",
      },
    },
  },
  plugins: [],
}