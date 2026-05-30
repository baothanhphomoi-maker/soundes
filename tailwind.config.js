/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0057B8',
          dark: '#003A8C',
          light: '#EBF3FF',
          glow: '#2979FF',
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#3B82F6',
          600: '#0057B8',
          700: '#1D4ED8',
          900: '#1E3A5F',
          950: '#0D1B2E',
        },
        accent: {
          red: '#FF2D55',
          gold: '#FFB800',
          teal: '#00D4B4',
          purple: '#7C3AED',
          silver: '#C0C0C0',
          bronze: '#CD7F32',
        },
        neutral: {
          dark: '#0D1117',
          mid: '#4A5568',
          light: '#F0F4F8',
        },
        ink: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          300: '#CBD5E1',
          500: '#64748B',
          700: '#334155',
          900: '#0F172A',
        },
      },
      fontFamily: {
        headline: ['Space Grotesk', 'sans-serif'],
        body: ['Be Vietnam Pro', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'ticker-scroll': 'tickerScroll 40s linear infinite',
        'slide-in': 'slideIn 1s ease-in-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        tickerScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
