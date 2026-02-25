/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
        "./index.html"
    ],
    theme: {
        extend: {
            colors: {
                offwhite: '#FDFBF7',
                navy: '#0A1D37',
                gold: '#C5A059',
                darkgray: '#374151',
            }
        },
    },
    plugins: [],
}
