/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            "sans": ['Inter', 'sans-serif']
        },
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [{
            light: {
                ...require("daisyui/src/theming/themes")["[data-theme=light]"],
                "primary": "#1EAE98",
                "secondary": "#86efac",
                "accent": "#d9f99d"
            },
            dark: {
            ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
            "primary": "#0a756c",
            "secondary": "#86efac",
            "accent": "#d9f99d"
            },
        }],
        base: true
    },
};