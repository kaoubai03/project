
export const content = [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
    extend: {
        colors: {
            // Vous pouvez ajouter des couleurs personnalisées si besoin
        },
        animation: {
            'fade-in': 'fade-in 0.6s ease-out forwards',
            'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
            'float': 'float 6s ease-in-out infinite',
            'float-delay': 'float 6s ease-in-out infinite 1s',
            'pulse': 'pulse 4s ease-in-out infinite',
        },
        keyframes: {
            'fade-in': {
                from: { opacity: '0' },
                to: { opacity: '1' },
            },
            'fade-in-up': {
                from: {
                    opacity: '0',
                    transform: 'translateY(10px)',
                },
                to: {
                    opacity: '1',
                    transform: 'translateY(0)',
                },
            },
            'float': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-20px)' },
            },
            'pulse': {
                '0%, 100%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.1)' },
            },
        },
        // Extension pour les délais d'animation personnalisés
        animationDelay: {
            '100': '100ms',
            '200': '200ms',
            '300': '300ms',
            '400': '400ms',
            '500': '500ms',
            '600': '600ms',
            '1000': '1000ms',
        },
    },
};
export const plugins = [
    // Plugin pour les délais d'animation (si vous voulez utiliser animation-delay-{ms})
    require('tailwindcss-animation-delay'),
];