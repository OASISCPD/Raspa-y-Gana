/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellowMain: "#ffff00",
        redMain: "#FF0000",
        grayMain: "#b5b1b1",
        greenMain: "#29FD2F",
        greenDark: "#1D9D22",
        blueMain: "#023e8a",
        roseMain: '#fd27f1'
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-gradient': {
          background: 'linear-gradient(to right, #ff7e5f, #feb47b)', // Cambia los colores aquí
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        }
      });
    }
  ],
}