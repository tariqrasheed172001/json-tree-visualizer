/** @type {import('tailwindcss').Config} */
module.exports = {
  // Note: darkMode is now configured via @custom-variant in globals.css (Tailwind v4)
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
