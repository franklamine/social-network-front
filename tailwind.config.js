/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        facebookBg: '#f0f2f5',
        facebookText: '#050505',
        facebookSubtext: '#65676b',
        fbPlaceholder: '#bcc0c8',
      }
    },
  },
  plugins: [],
}

