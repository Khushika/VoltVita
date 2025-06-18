
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#1e40af',
					foreground: '#ffffff',
					50: '#eff6ff',
					100: '#dbeafe',
					500: '#1e40af',
					600: '#1d4ed8',
					700: '#1e3a8a',
				},
				secondary: {
					DEFAULT: '#059669',
					foreground: '#ffffff',
					50: '#ecfdf5',
					100: '#d1fae5',
					500: '#059669',
					600: '#047857',
					700: '#065f46',
				},
				accent: {
					DEFAULT: '#ea580c',
					foreground: '#ffffff',
					50: '#fff7ed',
					100: '#ffedd5',
					500: '#ea580c',
					600: '#dc2626',
					700: '#b91c1c',
				},
				destructive: {
					DEFAULT: '#dc2626',
					foreground: '#ffffff',
				},
				muted: {
					DEFAULT: '#f8fafc',
					foreground: '#64748b',
				},
				popover: {
					DEFAULT: '#ffffff',
					foreground: '#020617',
				},
				card: {
					DEFAULT: '#ffffff',
					foreground: '#020617',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				inter: ['Inter', 'system-ui', 'sans-serif'],
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
