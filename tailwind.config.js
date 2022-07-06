/** @type {import('tailwindcss').Config} */
module.exports = {
   darkMode: 'class',
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {
         colors: {
            mainColor: '#4255ff',
            subColor: '#423ed8',
            lightBg: '#fff',
            lightBg1: '#f6f7fb',
            darkBg: '#0a092d',
            lightTextGray: '#282e3e',
            lightTextWhite: '#fff',
            lightTextGrayMint: '#939bb4',
            darkBgCard: '#2e3856',
         },
         boxShadow: {
            card: '0 0.125rem 0.25rem rgb(0 0 0 / 8%)',
         },
         spacing: {
            header: '63px',
         },
      },
   },
   plugins: [require('@tailwindcss/aspect-ratio')],
};
