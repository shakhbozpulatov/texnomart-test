/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      width: "1140px",
      padding: "1rem",
      // screens: ["100%"],
    },
    extend: {},
  },
  plugins: [],
};
