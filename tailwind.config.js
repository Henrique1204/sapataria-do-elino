/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

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
			backgroundImage: {
				'card-gradient': 'linear-gradient(to bottom, #0A0501 80%, #201C15)',
			},
			transitionProperty: {
				'max-height': 'max-height',
			},
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
				'slide-down': 'slideDown 0.5s ease-out forwards',
				'slide-up': 'slideUp 0.5s ease-out forwards',
			},
			fontSize: {
				'4.5xl': ['40px', '60px'],
			},
		},
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			const MD_BREAKPOINT = '@media (min-width: 768px)';
			const TOTAL_OF_COLUMNS = 8;

			const COL_WIDTH_SM = 28;
			const COL_WIDTH_MD = 151;

			const GAP_SM = 16;
			const GAP_MD = 24;

			const newUtilities = {
				'.container': {
					width: '1376px',
					marginLeft: 'auto',
					marginRight: 'auto',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'flex-start',
					gap: `${GAP_SM}px`,
					flexWrap: 'wrap',
				},
				'.grid-gap': {
					gap: `${GAP_SM}px`,
				},
				[MD_BREAKPOINT]: {
					'.grid-gap': {
						gap: `${GAP_MD}px!important`,
					},
				},
			};

			for (let i = 1; i <= TOTAL_OF_COLUMNS; i++) {
				newUtilities[`.col-${i}`] = {
					width: '100%',
					maxWidth: `calc(${i} * ${COL_WIDTH_SM}px + (${
						i - 1
					} * ${GAP_SM}px) )`,
				};

				newUtilities[MD_BREAKPOINT][`.col-${i}`] = {
					width: '100%',
					maxWidth: `calc(${i} * ${COL_WIDTH_MD}px + (${
						i - 1
					} * ${GAP_MD}px) )!important`,
				};
			}

			addUtilities(newUtilities, ['responsive']);
		}),
	],
};
