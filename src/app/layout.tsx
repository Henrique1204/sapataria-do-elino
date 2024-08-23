import type { Metadata } from 'next';

import { fontPrimary, fontSecondary } from 'core/assets/font';

import Header from 'components/Header';

import './global.css';

export const metadata: Metadata = {
	title: 'Sapataria do Elino',
	description: '',
};

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html
			className={`${fontPrimary.variable} ${fontSecondary.variable}`}
			lang='pt-BR'
		>
			<body className='bg-secondary-dark text-content-light'>
				<Header />

				{children}
			</body>
		</html>
	);
};

export default RootLayout;
