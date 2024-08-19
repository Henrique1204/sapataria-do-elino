import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';

export const fontPrimary = Poppins({
	weight: ['700', '400'],
	subsets: ['latin'],
	variable: '--font-primary-poppins',
	display: 'swap',
});

export const fontSecondary = localFont({
	src: [
		{
			path: './Axiforma-Regular.woff2',
			weight: '400',
			style: 'normal',
		},
	],
	variable: '--font-secondary-axiforma',
	display: 'swap',
});
