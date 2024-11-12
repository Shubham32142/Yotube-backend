/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        "custom-width": "30vw",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scroll-smooth": {
          overflow: "auto",
          "--webkit-overflow-scrolling": "touch",
        },
      });
    },
  ],
};
