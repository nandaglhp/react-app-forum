/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';
import { fontFamily } from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                body: ['Nunito', ...fontFamily.serif],
                display: ['Poetsen One', ...fontFamily.serif],
            },
        },
    },
    plugins: [typography, daisyui],
    daisyui: {
        themes: ['cupcake'],
    },
};
