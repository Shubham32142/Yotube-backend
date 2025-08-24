/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        skin: {
          base: "var(--color-bg)",
          muted: "var(--color-bg-muted)",
          text: "var(--color-text)",
          sub: "var(--color-text-muted)",
        },
      },
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
