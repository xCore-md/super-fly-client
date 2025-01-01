import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  prefix: '',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        brand: {
          blue: '#3F4ED6',
          'light-blue': '#F0F2FF',
          yellow: '#FFE959',
          gray: '#F4F4F4',
          green: '#11D2A4',
        },
      },
      fontSize: {
        xxs: '10px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        waveShadow: {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(59, 130, 246, 0.3)',
            scale: '1.04',
          }, // Small, faint shadow
          '25%': { boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' }, // Medium shadow
          '50%': { boxShadow: '0 0 25px rgba(59, 130, 246, 0.7)' }, // Largest, most intense shadow
          '75%': { boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)', scale: '1' }, // Back to medium shadow
        },
        greenWaveShadow: {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(17, 210, 164, 0.3)',
            scale: '1.01',
          }, // Small, faint shadow
          '25%': { boxShadow: '0 0 15px rgba(17, 210, 164, 0.5)' }, // Medium shadow
          '50%': { boxShadow: '0 0 25px rgba(17, 210, 164, 0.7)' }, // Largest, most intense shadow
          '75%': { boxShadow: '0 0 15px rgba(17, 210, 164, 0.5)', scale: '1' }, // Back to medium shadow
        },
        phoneInputPulsing: {
          // white shadow pulse
          '0%': { boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(255, 255, 255, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)' },
        },
        opacityBlock: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        calendarDropdown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        waveShadow: 'waveShadow 1.5s ease-in-out infinite',
        phoneInputPulsing: 'phoneInputPulsing 1s ease-in-out infinite',
        greenWaveShadow: 'greenWaveShadow 1.5s ease-in-out infinite',
        opacityBlock: 'opacityBlock 1s ease-out forwards',
        calendarDropdown: 'calendarDropdown 0.5s ease-out forwards',
      },
      flexBasis: {
        '1/7': '14.2857143%',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwindcss-animated')],
} satisfies Config

export default config
