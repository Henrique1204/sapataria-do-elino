import Image from 'next/image';
import Link from 'next/link';

import { generateImageSrc } from 'core/utils/images';

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

			<div className='flex w-full justify-center h-[100vh]'>
				<div className='py-10 px-20 max-w-[1152px] w-full mx-auto box-content'>
					<Link
						href='/'
						className='w-fit inline-block p-2 mb-8 text-cms-content-dark'
					>
						<NextCMSComponents.Icon name='House' className='w-fit' />
					</Link>

					<section className='flex gap-14 w-full'>
						<div className='w-full max-w-[648px]'>
							<Image
								alt=''
								src={generateImageSrc('login-banner.png')}
								className='rounded-xl'
								width={648}
								height={780}
								priority
							/>
						</div>

						<main className='w-full max-w-96'>{children}</main>
					</section>
				</div>
			</div>
		</body>
	);
};

export default RootLayout;
