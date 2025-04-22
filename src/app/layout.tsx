import classNames from 'classnames';

import { fontPrimary, fontSecondary } from 'core/assets/font';

import './global.css';

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
			{children}
		</html>
	);
};

export default RootLayout;
