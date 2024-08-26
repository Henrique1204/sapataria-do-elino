import type { Metadata } from 'next';

import classNames from 'classnames';

import { fontPrimary, fontSecondary } from 'core/assets/font';

import Header from 'components/Header';
import Footer from 'components/Footer';

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
	const rootClassNames = classNames(
		fontPrimary.variable,
		fontSecondary.variable
	);

	return (
		<html className={rootClassNames} lang='pt-BR'>
			<body className='bg-secondary-darker text-content-light'>
				<Header />

				{children}

				<Footer />
			</body>
		</html>
	);
};

export default RootLayout;
