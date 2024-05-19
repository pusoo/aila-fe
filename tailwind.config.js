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
  boxShadow: {
    left: "-4px 0 6px -1px rgba(0, 0, 0, 0.1), -2px 0 4px -1px rgba(0, 0, 0, 0.06)",
  },
  plugins: [],

  corePlugins: {
    preflight: false,
  },
};
