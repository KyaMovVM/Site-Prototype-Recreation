import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './components/ui/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        'neutral-light': 'var(--color-neutral-light)',
        'neutral-dark': 'var(--color-neutral-dark)'
      },
      fontFamily: {
        sans: ['var(--font-family-base)', 'sans-serif']
      },
      spacing: {
        unit: 'var(--spacing-unit)',
        gutter: 'var(--spacing-gutter)'
      },
      transitionTimingFunction: {
        DEFAULT: 'var(--transition-default)'
      }
    }
  },
  plugins: []
};

export default config;
