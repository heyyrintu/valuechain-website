/** @type {import('tailwindcss').Config} */

// Brand palette — Drona Logitech
// Red    #DE1C1C (primary)
// Yellow #FEA418 (accent)
// Ink    — near-black neutrals for premium dark surfaces

const brand = {
  50: '#fdf2f2',
  100: '#fbdada',
  200: '#f7b2b2',
  300: '#ef7d7d',
  400: '#e74a4a',
  500: '#DE1C1C',
  600: '#c01414',
  700: '#9d1212',
  800: '#7f1414',
  900: '#671414',
  950: '#3f0808',
};

const sun = {
  50: '#fff9eb',
  100: '#feefc7',
  200: '#fdde8a',
  300: '#fec64d',
  400: '#FEA418',
  500: '#f8900b',
  600: '#dc6c06',
  700: '#b64b09',
  800: '#94390e',
  900: '#7a300f',
};

const ink = {
  50: '#f6f6f7',
  100: '#e7e7ea',
  200: '#d2d2d8',
  300: '#b2b3bc',
  400: '#8b8c99',
  500: '#6f707e',
  600: '#5f5f6b',
  700: '#515058',
  800: '#46454c',
  900: '#3d3c42',
  950: '#0d0d10',
};

module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand,
        sun,
        ink,
        // legacy aliases so earlier class names keep working
        navy: ink,
        accent: brand,
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
