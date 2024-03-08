/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        "60": "repeat(60, 1vh)",
      },
    },
  },
  plugins: [],
};
