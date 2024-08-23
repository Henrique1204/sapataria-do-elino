/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./src/Components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		fontFamily: {
			title: ['var(--font-primary-poppins)', 'sans-serif'],
			body: ['var(--font-secondary-axiforma)', 'sans-serif'],
		},
		colors: {
			transparent: 'transparent',
			primary: {
				light: '#F0C23C',
				main: '#F0AC3C',
				dark: '#A87715',
			},
			secondary: {
				light: '#56342E',
				main: '#462521',
				dark: '#130A02',
				darker: '#0A0501',
			},
			success: {
				darker: '#008C38',
				dark: '#00AE48',
				main: '#28C76F',
				light: '#93FBC0',
				lighter: '#EEF8F7',
			},
			warning: {
				darker: '#BA7308',
				dark: '#DD8922',
				main: '#FF9F43',
				light: '#FFDEAA',
				lighter: '#FBF5F0',
			},
			danger: {
				darker: '#9C1717',
				dark: '#C72E37',
				main: '#EA5455',
				light: '#FF9E9E',
				lighter: '#FAF1F1',
			},
			info: {
				darker: '#00A3A3',
				dark: '#00C4C6',
				main: '#00CFE8',
				light: '#54F3FF',
				lighter: '#ECF8FA',
			},
			content: {
				lighter: '#EAE8E6',
				light: '#D6D1CD',
				main: '#ACA39B',
				dark: '#0A0501',
			},
		},
		extend: {
			boxShadow: {
				['button-primary']: '0 0 0 3px #0A0501, 0 0 0 4px #F0AC3C',
				['button-secondary']: '0 0 0 3px #F0AC3C, 0 0 0 4px #0A0501',
			},
			keyframes: {
				slideDown: {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(0)' },
				},
				slideUp: {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(-100%)' },
				},
			},
			animation: {
				['slide-down']: 'slideDown 0.5s ease-out forwards',
				['slide-up']: 'slideUp 0.5s ease-out forwards',
			},
		},
	},
	plugins: [],
};
