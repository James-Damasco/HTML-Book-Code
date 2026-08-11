/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: '1rem',
        },
        extend: {
            colors: {
                background: { DEFAULT: 'var(--background)' },
                foreground: { DEFAULT: 'var(--foreground)' },
                primary: {
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-foreground)',
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    foreground: 'var(--secondary-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--accent)',
                    foreground: 'var(--accent-foreground)',
                },
                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)',
                },
                card: {
                    DEFAULT: 'var(--card)',
                    foreground: 'var(--card-foreground)',
                },
                border: { DEFAULT: 'var(--border)' },
                input: { DEFAULT: 'var(--input)' },
                ring: { DEFAULT: 'var(--ring)' },
                success: { DEFAULT: 'var(--success)' },
                warning: { DEFAULT: 'var(--warning)' },
                danger: { DEFAULT: 'var(--danger)' },
                info: { DEFAULT: 'var(--info)' },
            },
            borderRadius: {
                DEFAULT: 'var(--radius)',
                sm: 'calc(var(--radius) - 0.25rem)',
                lg: 'var(--radius)',
                xl: 'calc(var(--radius) + 0.25rem)',
                '2xl': 'calc(var(--radius) + 0.5rem)',
            },
            fontFamily: {
                sans: ['var(--font-dm-sans)', 'sans-serif'],
                mono: ['var(--font-jetbrains-mono)', 'Courier New', 'monospace'],
            },
            fontSize: {
                '2xs': ['0.625rem', { lineHeight: '1rem' }],
            },
            animation: {
                'fade-in': 'fadeIn 200ms ease forwards',
                'slide-up': 'slideUp 200ms ease forwards',
                'pulse-highlight': 'pulseHighlight 600ms ease',
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};