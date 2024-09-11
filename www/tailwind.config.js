/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'darker': '0 5px 5px rgba(0,0,0,0.5)'
      }
    },
  },
  plugins: [],
}

