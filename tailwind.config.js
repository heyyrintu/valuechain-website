/** @type {import('tailwindcss').Config} */

// Brand palette — Drona Valuechain Pvt Ltd
// Logo swirl: Green #34C26E · Blue #3F6CC4 · Purple #7A3B9E
// Accent dots: Lime #9BCD0E · Teal #54B9D6 · Magenta #C13C9E
// Primary = blue (brand) · Secondary = green (sun, name kept for class compatibility)

// Blue — primary (token name kept as `brand`)
const brand = {
  50: '#eef3fb',
  100: '#d7e3f6',
  200: '#b3c8ec',
  300: '#86a5df',
  400: '#5b82d2',
  500: '#3F6CC4',
  600: '#3055a4',
  700: '#284684',
  800: '#243c6c',
  900: '#21355a',
  950: '#16223b',
};

// Green — secondary highlight (token name kept as `sun` for class compatibility)
const sun = {
  50: '#ecfdf3',
  100: '#d2f9e0',
  200: '#a6f0c6',
  300: '#6fe3a4',
  400: '#34C26E',
  500: '#22a85c',
  600: '#178a4b',
  700: '#156d3e',
  800: '#145734',
  900: '#11472c',
};

// Purple — tertiary accent
const grape = {
  50: '#f7f0fb',
  100: '#ecd9f4',
  200: '#dab6e9',
  300: '#c089d9',
  400: '#a05fc3',
  500: '#7A3B9E',
  600: '#663186',
  700: '#54286c',
  800: '#472458',
  900: '#3c204a',
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

// Logo accent dots
const lime = '#9BCD0E';
const teal = '#54B9D6';
const magenta = '#C13C9E';

module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand,
        sun,
        grape,
        ink,
        lime,
        teal,
        magenta,
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
