import forms from '@tailwindcss/forms';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 24px 60px rgba(15, 23, 42, 0.12)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top left, rgba(59,130,246,0.18), transparent 32%), radial-gradient(circle at bottom right, rgba(56,189,248,0.16), transparent 28%)',
      },
    },
  },
  plugins: [forms],
};
