import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        red: '#ff0900',
        blue: '#4296e4',
        mint: {
          700: '#8ddfcc',
          900: '#70d7bf',
        },
        midnight: {
          100: '#cdd0d2',
          900: '#05141f',
        },
        gray: {
          10: '#f8f8f8',
          50: '#f9fafb',
          100: '#e6e8e9',
          200: '#cdd0d2',
          300: '#b4b9bc',
          400: '#82898f',
          500: '#697278',
          700: '#37434c',
          800: '#333d4b',
          900: '#191f28',
        },
      },
      lineHeight: {
        sm: '1.4',
        md: '1.6',
        lg: '1.8',
      },
      fontFamily: {
        kia: ['var(--font-kia)', 'Kia Signature Fix', 'Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
