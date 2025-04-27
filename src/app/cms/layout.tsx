import * as NextCMSComponents from 'NextCMS/components';

import '../global.css';

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<body className='bg-white text-cms-content-dark'>
			<NextCMSComponents.Toaster.Toast />

			{children}
		</body>
	);
};

export default RootLayout;
