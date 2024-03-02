/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#40A9E8",
        secondary: "#4DB571",
        tertiary: "#E5E9EA",
        background: "#F9FDFE",
        generateBackground: "#E5E9EA",
      },
    },
  },
  plugins: [],

  corePlugins: {
    preflight: false,
  },  
};
