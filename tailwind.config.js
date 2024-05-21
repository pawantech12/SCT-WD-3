/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable dark mode based on the class applied to the html element
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#1A2A33",
          secondary: "#4a4a4a",
          // Add more dark mode colors here...
        },
        light: {
          primary: "#ffffff",
          secondary: "#f3f3f3",
          // Add more light mode colors here...
        },
      },
    },
  },
  plugins: [],
};
