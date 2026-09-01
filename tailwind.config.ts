import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
          // Editorial Cool Minimal palette (Option B - Navy/Beige/Gold)
          'bg-light': '#E8DCC8',
          'bg-card': '#FFFFFF',
          'panel-light': '#F0E6D2',
          'text-dark': '#1F2A44',
          'text-muted': '#6B7A8C',
          'border-light': '#D0C0A0',
          'bg-dark': '#1F2A44',
          'bg-dark-card': '#1F2A44',
          'panel-dark': '#2C3A51',
          'text-light': '#2F3B52',
          'text-light-muted': '#7A8A9E',
          'accent': '#C6A75E',
          'accent-hover': '#B59955',
          'accent-soft': 'rgba(198, 167, 94, 0.15)',
          'accent-gold': '#C6A75E',
        },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        script: ['Sacramento', 'cursive'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.2em',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.3' } },
        rotateStamp: { to: { transform: 'rotate(360deg)' } },
        mascotPopBounce: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '35%': { transform: 'translateY(-28px) scale(1.08) rotate(-2deg)' },
          '65%': { transform: 'translateY(-14px) scale(1.04) rotate(1deg)' },
          '100%': { transform: 'translateY(0) scale(1) rotate(0)' },
        },
        badgeFloat: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        borderBeam: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        blink: 'blink 1.8s infinite',
        rotateStamp: 'rotateStamp 22s linear infinite',
        badgeFloat: 'badgeFloat 4s ease-in-out infinite',
        borderBeam: 'borderBeam 3s ease infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
