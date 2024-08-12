import type { Metadata } from 'next';

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
		<html lang='pt-BR'>
			<body>{children}</body>
		</html>
	);
};

export default RootLayout;
